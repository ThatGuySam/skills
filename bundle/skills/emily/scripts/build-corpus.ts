#!/usr/bin/env node

import { createHash, randomUUID } from "node:crypto"
import { existsSync } from "node:fs"
import { lstat, mkdir, readFile, rename, unlink, writeFile } from "node:fs/promises"
import { basename, dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"

type CorpusRole = "primary-advice" | "adjacent-advice" | "style-only"
type Modernity = "durable" | "contextual" | "historical-only"

type SourceSpec = {
  id: string
  title: string
  author: string
  year: number
  role: CorpusRole
  landingUrl: string
  textUrl: string
  sha256: string
  parser: "gutenberg" | "personality-house"
  startTitle: string
  endPattern?: RegExp
}

type ModernityProfile = {
  modernity: Modernity
  risks: string[]
  topics: string[]
}

export type CorpusChunk = {
  id: string
  source_id: string
  title: string
  author: string
  year: number
  role: CorpusRole
  chapter: string
  section: string
  modernity: Modernity
  modernity_basis: "chapter-default"
  risks: string[]
  topics: string[]
  source_url: string
  word_count: number
  text_sha256: string
  text: string
}

const scriptPath = fileURLToPath(import.meta.url)
const skillRoot = resolve(dirname(scriptPath), "..")
const corpusDir = resolve(skillRoot, "references/corpus")
const textDir = resolve(corpusDir, "text")
const manifestPath = resolve(corpusDir, "manifest.json")
const chunksPath = resolve(corpusDir, "chunks.jsonl")
const lockPath = resolve(corpusDir, "lock.json")
const argumentsSet = new Set(process.argv.slice(2))
for (const argument of argumentsSet) {
  if (argument !== "--refresh" && argument !== "--check") {
    throw new Error(`Unknown option: ${argument}`)
  }
}
const refresh = argumentsSet.has("--refresh")
const checkOnly = argumentsSet.has("--check")
if (refresh && checkOnly) throw new Error("Use either --refresh or --check, not both")
const targetChunkWords = 620
const minimumChunkWords = 260

const sources: SourceSpec[] = [
  {
    id: "etiquette-1922",
    title: "Etiquette: In Society, in Business, in Politics and at Home",
    author: "Emily Post",
    year: 1922,
    role: "primary-advice",
    landingUrl: "https://www.gutenberg.org/ebooks/14314",
    textUrl: "https://www.gutenberg.org/cache/epub/14314/pg14314.txt",
    sha256: "e8a6668eafc4177158621a205c34f22db6d509508195aca74e65157a1911ccc3",
    parser: "gutenberg",
    startTitle: "CHAPTER I",
    endPattern: /\n\s*=?INDEX=?\s*\n/,
  },
  {
    id: "personality-house-1930",
    title: "The Personality of a House",
    author: "Emily Post",
    year: 1930,
    role: "adjacent-advice",
    landingUrl: "https://archive.org/details/personalityofhou0000post",
    textUrl:
      "https://archive.org/download/personalityofhou0000post/personalityofhou0000post_djvu.txt",
    sha256: "bd567f5c6af97d5f4166237833d68a3f43e16c4da8d7ba39774ffcd5ea483fab",
    parser: "personality-house",
    startTitle: "T^he  Personality  of  a  fCouse",
    endPattern: /\n\s*=?INDEX=?\s*\n/,
  },
  {
    id: "by-motor-1916",
    title: "By Motor to the Golden Gate",
    author: "Emily Post",
    year: 1916,
    role: "style-only",
    landingUrl: "https://www.gutenberg.org/ebooks/73784",
    textUrl: "https://www.gutenberg.org/cache/epub/73784/pg73784.txt",
    sha256: "6aad6ca9908b5a2a71f99eec539e24568f724b1f955124ff45d602ee616b3649",
    parser: "gutenberg",
    startTitle: "CHAPTER I",
  },
  {
    id: "title-market-1909",
    title: "The Title Market",
    author: "Emily Post",
    year: 1909,
    role: "style-only",
    landingUrl: "https://www.gutenberg.org/ebooks/17680",
    textUrl: "https://www.gutenberg.org/cache/epub/17680/pg17680.txt",
    sha256: "23d23539bd8a697ebaf31d497216e7a6ed3623c1e677d884c787cd55db8742b0",
    parser: "gutenberg",
    startTitle: "CHAPTER I",
    endPattern: /\n\s*THE END\s*\n/,
  },
]

const etiquetteProfiles: Record<string, ModernityProfile> = {
  I: profile(
    "contextual",
    ["class-bound", "social-rank"],
    ["manners", "character", "consideration", "society"],
  ),
  II: profile(
    "contextual",
    ["rank-precedence", "gendered-forms"],
    ["introductions", "referrals", "names"],
  ),
  III: profile("contextual", ["gendered-forms"], ["greetings", "handshakes", "recognition"]),
  IV: profile(
    "contextual",
    ["rank-precedence", "gendered-titles"],
    ["salutations", "titles", "forms-of-address"],
  ),
  V: profile(
    "contextual",
    ["gendered-forms", "ability-assumptions"],
    ["public-space", "street", "transportation"],
  ),
  VI: profile("contextual", ["class-bound"], ["public-gatherings", "theater", "audience"]),
  VII: profile("durable", ["class-language"], ["conversation", "listening", "tact", "gossip"]),
  VIII: profile(
    "historical-only",
    ["linguistic-prejudice", "class-signaling"],
    ["pronunciation", "language", "speech"],
  ),
  IX: profile(
    "historical-only",
    ["class-bound", "social-rank", "exclusion"],
    ["community", "position", "reputation"],
  ),
  X: profile(
    "historical-only",
    ["calling-card-system", "gendered-forms"],
    ["visits", "calls", "cards", "hospitality"],
  ),
  XI: profile(
    "contextual",
    ["formal-social-system"],
    ["invitations", "rsvp", "acceptance", "regrets", "guests"],
  ),
  XII: profile(
    "historical-only",
    ["class-bound", "domestic-labor", "servant-hierarchy"],
    ["home", "household", "service", "hospitality"],
  ),
  XIII: profile(
    "contextual",
    ["class-bound", "domestic-labor"],
    ["tea", "afternoon-party", "hosting"],
  ),
  XIV: profile(
    "contextual",
    ["class-bound", "domestic-labor", "gendered-seating"],
    ["formal-dinner", "seating", "hosting"],
  ),
  XV: profile(
    "contextual",
    ["domestic-labor"],
    ["dinner", "limited-equipment", "hosting", "simplicity"],
  ),
  XVI: profile("contextual", ["class-bound"], ["luncheon", "breakfast", "supper", "meals"]),
  XVII: profile(
    "contextual",
    ["gendered-forms", "ability-assumptions"],
    ["dance", "ball", "invitations"],
  ),
  XVIII: profile(
    "historical-only",
    ["class-bound", "binary-gender", "debutante-system"],
    ["debutante", "coming-out", "youth"],
  ),
  XIX: profile(
    "historical-only",
    ["paternalism", "binary-gender", "sexual-double-standard"],
    ["chaperon", "courtship", "safety"],
  ),
  XX: profile(
    "historical-only",
    ["binary-gender", "heteronormative", "paternalism"],
    ["engagement", "courtship", "gifts", "boundaries"],
  ),
  XXI: profile(
    "contextual",
    ["heteronormative", "binary-gender", "religion-assumptions"],
    ["wedding", "planning", "invitations"],
  ),
  XXII: profile(
    "contextual",
    ["heteronormative", "binary-gender", "religion-assumptions"],
    ["wedding", "ceremony", "reception"],
  ),
  XXIII: profile(
    "contextual",
    ["christian-assumption", "binary-gender"],
    ["christening", "baby", "religion", "family"],
  ),
  XXIV: profile(
    "contextual",
    ["religion-assumptions", "rigid-mourning-forms"],
    ["funeral", "death", "grief", "condolence", "mourning"],
  ),
  XXV: profile(
    "contextual",
    ["class-bound", "domestic-labor"],
    ["houseguest", "country-house", "hospitality", "hosting", "visit"],
  ),
  XXVI: profile(
    "contextual",
    ["class-bound", "gendered-forms"],
    ["house-party", "camp", "group-trip", "guest"],
  ),
  XXVII: profile(
    "durable",
    ["channel-specific"],
    ["notes", "letters", "thanks", "condolence", "reply"],
  ),
  XXVIII: profile(
    "contextual",
    ["channel-specific"],
    ["letters", "correspondence", "introductions", "thanks"],
  ),
  XXIX: profile("durable", [], ["good-behavior", "consideration", "respect", "character", "home"]),
  XXX: profile(
    "historical-only",
    ["exclusion", "class-bound", "gendered-clubs"],
    ["clubs", "membership", "guests"],
  ),
  XXXI: profile(
    "contextual",
    ["binary-gender", "ability-assumptions"],
    ["games", "sports", "fair-play"],
  ),
  XXXII: profile(
    "contextual",
    ["male-workplace", "rank-precedence", "dated-business"],
    ["business", "workplace", "politics", "introductions"],
  ),
  XXXIII: profile(
    "historical-only",
    ["class-signaling", "binary-gender", "body-norms"],
    ["dress", "clothing", "occasion"],
  ),
  XXXIV: profile(
    "historical-only",
    ["class-signaling", "binary-gender"],
    ["menswear", "dress", "formalwear"],
  ),
  XXXV: profile(
    "contextual",
    ["paternalism", "dated-child-development"],
    ["children", "teaching", "manners"],
  ),
  XXXVI: profile(
    "durable",
    ["dated-household-roles"],
    ["home", "family", "everyday-manners", "consideration"],
  ),
  XXXVII: profile(
    "contextual",
    ["national-stereotypes", "colonial-gaze", "ability-assumptions"],
    ["travel", "hotel", "train", "abroad"],
  ),
  XXXVIII: profile(
    "historical-only",
    ["class-bound", "cultural-prejudice", "social-rank"],
    ["taste", "america", "society"],
  ),
}

const personalityChapters: Array<{ roman: string; title: string; pattern: RegExp }> = [
  { roman: "I", title: "What Is Meant by Personality", pattern: /WHAT IS MEANT BY PERSONALITY/i },
  { roman: "II", title: "Architecture at a Glance", pattern: /ARCHITECTURE AT A GLANCE/i },
  { roman: "III", title: "The Story of Houses in America", pattern: /STORY OF HOUSES IN AMERICA/i },
  {
    roman: "IV",
    title: "The Fundamental Principles of Architectural Beauty",
    pattern: /FUNDAMENTAL PRINCIPLES OF ARCHITECTURAL/i,
  },
  { roman: "V", title: "If You Are Going to Build", pattern: /IF YOU ARE GOING TO BUILD/i },
  { roman: "VI", title: "The House That You Remodel", pattern: /HOUSE THAT YOU REMODEL/i },
  { roman: "VII", title: "If You Buy Ready-Made", pattern: /IF YOU BUY READY[- ]MADE/i },
  { roman: "VIII", title: "The Cooperative Apartment", pattern: /COOPERATIVE APARTMENT/i },
  { roman: "IX", title: "Interior Architecture", pattern: /INTERIOR ARCHITECTURE/i },
  { roman: "X", title: "The Principles of Color Harmony", pattern: /PRINCIPLES OF COLOR HARMONY/i },
  {
    roman: "XI",
    title: "The Emotional Behavior of Color",
    pattern: /EMOTIONAL BEHAVIOR OF COLOR/i,
  },
  { roman: "XII", title: "How to Use Color Charts", pattern: /HOW TO USE COLOR CHARTS/i },
  { roman: "XIII", title: "The Period Styles", pattern: /(?:PERIOD STYLES|THE PERIODS)/i },
  {
    roman: "XIV",
    title: "Decoration in Preparation for Furnishing",
    pattern: /DECORATION IN PREPARATION FOR FURNISHING/i,
  },
  {
    roman: "XV",
    title: "General Principles of Interior Furnishing",
    pattern: /GENERAL PRINCIPLES OF INTERIOR FURNISHING/i,
  },
  { roman: "XVI", title: "Each Room in Detail", pattern: /EACH ROOM IN DETAIL/i },
  {
    roman: "XVII",
    title: "For the Children of the House",
    pattern: /FOR THE CHILDREN OF THE HOUSE/i,
  },
  { roman: "XVIII", title: "A House—or a Room—for a Man", pattern: /A HOUSE.*ROOM.*FOR A MAN/i },
  {
    roman: "XIX",
    title: "The House of Charm at Least Expense",
    pattern: /HOUSE OF CHARM AT LEAST EXPENSE/i,
  },
  {
    roman: "XX",
    title: "The Little House of Comfort and Convenience",
    pattern: /LITTLE HOUSE OF COMFORT AND CONVENIENCE/i,
  },
  {
    roman: "XXI",
    title: "The Garden's Decoration of the House",
    pattern: /GARDEN.*DECORATION OF THE HOUSE/i,
  },
  { roman: "XXII", title: "The Style We Know as Modern", pattern: /STYLE WE KNOW AS MODERN/i },
]

function profile(modernity: Modernity, risks: string[], topics: string[]): ModernityProfile {
  return { modernity, risks, topics }
}

function sha256(value: string | Uint8Array): string {
  return createHash("sha256").update(value).digest("hex")
}

function buildTimestamp(): string {
  const sourceDateEpoch = process.env.SOURCE_DATE_EPOCH
  if (!sourceDateEpoch) return new Date().toISOString()
  if (!/^\d+$/.test(sourceDateEpoch)) throw new Error("SOURCE_DATE_EPOCH must be whole seconds")
  const date = new Date(Number(sourceDateEpoch) * 1_000)
  if (!Number.isFinite(date.valueOf())) throw new Error("SOURCE_DATE_EPOCH is out of range")
  return date.toISOString()
}

function wordCount(value: string): number {
  return value.match(/[\p{L}\p{N}]+(?:[’'-][\p{L}\p{N}]+)*/gu)?.length ?? 0
}

function cleanHeading(value: string): string {
  return value
    .replace(/^=+|=+$/g, "")
    .replace(/[_*]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
}

function romanToNumber(roman: string): number {
  const values: Record<string, number> = { I: 1, V: 5, X: 10, L: 50, C: 100 }
  let total = 0
  let previous = 0
  for (const character of [...roman.toUpperCase()].reverse()) {
    const current = values[character] ?? 0
    total += current < previous ? -current : current
    previous = current
  }
  return total
}

function normalizeText(raw: string, source: SourceSpec): string {
  let text = raw
    .replace(/^\uFEFF/, "")
    .replace(/\r\n?/g, "\n")
    .normalize("NFC")

  if (source.parser === "gutenberg") {
    const startMarker = text.search(/\*\*\* START OF (?:THE|THIS) PROJECT GUTENBERG EBOOK/i)
    if (startMarker < 0) {
      throw new Error(`${source.id}: Project Gutenberg start marker not found`)
    }
    text = text.slice(startMarker)
    const start = text.indexOf(`\n${source.startTitle}\n`)
    if (start < 0) {
      throw new Error(`${source.id}: content start ${source.startTitle} not found`)
    }
    text = text.slice(start + 1)
    const end = text.search(/\*\*\* END OF (?:THE|THIS) PROJECT GUTENBERG EBOOK/i)
    if (end >= 0) text = text.slice(0, end)
  } else {
    const start = text.indexOf(source.startTitle)
    if (start < 0) {
      throw new Error(`${source.id}: OCR content start not found`)
    }
    text = text.slice(start)
  }

  if (source.endPattern) {
    const end = text.search(source.endPattern)
    if (end < 0) throw new Error(`${source.id}: authentic content end marker not found`)
    text = text.slice(0, end)
  }

  text = text
    .replace(/\u00ad/g, "")
    .replace(/([\p{L}])¬\s*\n\s*([\p{Ll}])/gu, "$1$2")
    .replace(/([\p{L}])-\s*\n\s*([\p{Ll}])/gu, "$1$2")

  if (source.parser === "personality-house") {
    text = text
      .split("\n")
      .map((line) => line.replace(/[ \t]{2,}/g, " ").trimEnd())
      .join("\n")
      .replace(/^T\^he Personality of a fCouse\s*/i, "")
  }

  const paragraphs = text
    .split(/\n\s*\n+/)
    .map((paragraph) =>
      paragraph
        .replace(/\s*\n\s*/g, " ")
        .replace(/\s+/g, " ")
        .trim(),
    )
    .filter(Boolean)
    .filter((paragraph) => !/^\d{1,3}$/.test(paragraph))
    .filter((paragraph) => !/^\[(?:illustration|plate|figure)\b/i.test(paragraph))
    .filter((paragraph) => !/^(?:fig(?:ure)?|plate)\.?\s*\d+\b/i.test(paragraph))
    .filter((paragraph) => paragraph.toUpperCase() !== "THE PERSONALITY OF A HOUSE")

  return `${paragraphs.join("\n\n")}\n`
}

function isSectionHeading(paragraph: string): boolean {
  if (paragraph.length > 115 || /[.!?][”'"]?$/.test(paragraph)) return false
  if (/^=.+=$/.test(paragraph)) return true
  const letters = paragraph.match(/[\p{L}]/gu) ?? []
  if (letters.length < 3) return false
  const uppercase = letters.filter((letter) => letter === letter.toUpperCase()).length
  return uppercase / letters.length > 0.88
}

function profileFor(source: SourceSpec, chapterRoman: string): ModernityProfile {
  if (source.role === "style-only") {
    return profile(
      "historical-only",
      ["style-only", "not-etiquette-authority"],
      ["voice", "social-observation"],
    )
  }
  if (source.role === "adjacent-advice") {
    return profile(
      "contextual",
      ["class-bound", "historical-design", "ability-assumptions"],
      ["home", "hospitality", "comfort", "suitability", "taste"],
    )
  }
  return (
    etiquetteProfiles[chapterRoman] ??
    profile("historical-only", ["unclassified-historical-rule"], [])
  )
}

function makeChunks(source: SourceSpec, text: string): CorpusChunk[] {
  const paragraphs = text
    .split(/\n\n+/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
  const chunks: CorpusChunk[] = []
  const chapterCounts = new Map<string, number>()
  let chapterRoman = "I"
  let chapter = "Chapter I"
  let chapterNumber = source.parser === "personality-house" ? 0 : 1
  let section = source.title
  let awaitingChapterTitle = false
  let buffer: string[] = []
  let bufferWords = 0

  const flush = () => {
    if (buffer.length === 0) return
    const textValue = buffer.join("\n\n").trim()
    const textWords = wordCount(textValue)
    const previous = chunks.at(-1)
    if (textWords < 120 && previous?.chapter === chapter && previous.section === section) {
      previous.text = `${previous.text}\n\n${textValue}`
      previous.word_count = wordCount(previous.text)
      previous.text_sha256 = sha256(previous.text)
      buffer = []
      bufferWords = 0
      return
    }
    const chapterNumber = romanToNumber(chapterRoman) || 0
    const chapterKey = `c${String(chapterNumber).padStart(2, "0")}`
    const next = (chapterCounts.get(chapterKey) ?? 0) + 1
    chapterCounts.set(chapterKey, next)
    const profileValue = profileFor(source, chapterRoman)
    const id = `${source.id}-${chapterKey}-${String(next).padStart(3, "0")}`
    chunks.push({
      id,
      source_id: source.id,
      title: source.title,
      author: source.author,
      year: source.year,
      role: source.role,
      chapter,
      section,
      modernity: profileValue.modernity,
      modernity_basis: "chapter-default",
      risks: profileValue.risks,
      topics: profileValue.topics,
      source_url: source.landingUrl,
      word_count: textWords,
      text_sha256: sha256(textValue),
      text: textValue,
    })
    buffer = []
    bufferWords = 0
  }

  for (const paragraph of paragraphs) {
    if (source.parser === "personality-house") {
      const nextChapter = personalityChapters[chapterNumber]
      if (nextChapter?.pattern.test(paragraph)) {
        flush()
        chapterRoman = nextChapter.roman
        chapterNumber += 1
        chapter = `Chapter ${chapterRoman} — ${nextChapter.title}`
        section = nextChapter.title
        awaitingChapterTitle = false
        continue
      }
      if (/^[IVXLC]{1,5}$/.test(paragraph)) continue
    }

    const chapterMatch =
      source.parser === "gutenberg" ? paragraph.match(/^CHAPTER\s+([IVXLC]+|\d+)$/i) : null
    const rawChapter = chapterMatch?.[1]

    if (rawChapter) {
      flush()
      chapterRoman = /^\d+$/.test(rawChapter)
        ? numberToRoman(Number.parseInt(rawChapter, 10))
        : rawChapter.toUpperCase()
      chapterNumber = romanToNumber(chapterRoman)
      chapter = `Chapter ${chapterRoman}`
      section = chapter
      awaitingChapterTitle = true
      continue
    }

    if (awaitingChapterTitle && paragraph.length <= 160) {
      const title = cleanHeading(paragraph)
      chapter = `Chapter ${chapterRoman} — ${title}`
      section = title
      awaitingChapterTitle = false
      continue
    }

    if (isSectionHeading(paragraph)) {
      const nextSection = cleanHeading(paragraph)
      const chapterTitle = chapter.includes(" — ") ? chapter.split(" — ").slice(1).join(" — ") : ""
      if (
        nextSection.toLowerCase() === chapterTitle.toLowerCase() ||
        nextSection.toLowerCase() === source.title.toLowerCase()
      ) {
        continue
      }
      flush()
      section = nextSection
      continue
    }

    const paragraphWords = wordCount(paragraph)
    if (bufferWords >= minimumChunkWords && bufferWords + paragraphWords > targetChunkWords) {
      flush()
    }
    buffer.push(paragraph)
    bufferWords += paragraphWords
  }
  flush()
  return chunks
}

function numberToRoman(value: number): string {
  const entries: Array<[number, string]> = [
    [100, "C"],
    [90, "XC"],
    [50, "L"],
    [40, "XL"],
    [10, "X"],
    [9, "IX"],
    [5, "V"],
    [4, "IV"],
    [1, "I"],
  ]
  let remaining = value
  let result = ""
  for (const [amount, token] of entries) {
    while (remaining >= amount) {
      result += token
      remaining -= amount
    }
  }
  return result
}

async function atomicWrite(path: string, content: string): Promise<void> {
  const temporary = `${path}.${process.pid}.${randomUUID()}.tmp`
  try {
    await writeFile(temporary, content, { encoding: "utf8", flag: "wx" })
    await rename(temporary, path)
  } catch (error) {
    await unlink(temporary).catch(() => undefined)
    throw error
  }
}

async function download(source: SourceSpec): Promise<string> {
  const response = await fetch(source.textUrl, {
    headers: { "user-agent": "Emily skill corpus builder/1.0 (source preservation)" },
    redirect: "follow",
    signal: AbortSignal.timeout(45_000),
  })
  if (!response.ok) {
    throw new Error(`${source.id}: download failed with HTTP ${response.status}`)
  }
  const bytes = new Uint8Array(await response.arrayBuffer())
  if (bytes.byteLength > 12_000_000) throw new Error(`${source.id}: source exceeds 12 MB limit`)
  const finalUrl = new URL(response.url)
  const allowedHost =
    finalUrl.hostname === "www.gutenberg.org" ||
    finalUrl.hostname === "archive.org" ||
    finalUrl.hostname.endsWith(".archive.org")
  if (finalUrl.protocol !== "https:" || !allowedHost) {
    throw new Error(`${source.id}: unexpected download origin ${finalUrl.origin}`)
  }
  const actualHash = sha256(bytes)
  if (actualHash !== source.sha256) {
    throw new Error(
      `${source.id}: upstream hash changed; expected ${source.sha256}, received ${actualHash}`,
    )
  }
  return new TextDecoder("utf-8").decode(bytes)
}

type ManifestSource = {
  id: string
  title: string
  author: string
  year: number
  role: CorpusRole
  upstream_sha256: string
  clean_sha256: string
  text_file: string
  chunks: number
}

type CorpusManifest = {
  schema_version: number
  generator_sha256: string
  content_identity_sha256: string
  sources: ManifestSource[]
  chunks: number
  chunks_sha256: string
}

type CorpusLock = {
  schema_version: number
  generator_sha256: string
  content_identity_sha256: string
  source_clean_sha256: Record<string, string>
  chunks: number
  chunks_sha256: string
}

function recordValue(value: unknown, label: string): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error(`${label} must be an object`)
  }
  return value as Record<string, unknown>
}

async function verifyExisting(): Promise<void> {
  if (!existsSync(manifestPath) || !existsSync(chunksPath) || !existsSync(lockPath)) {
    throw new Error("Corpus is missing its manifest, index, or lock. Run a reviewed refresh.")
  }
  const manifest = recordValue(
    JSON.parse(await readFile(manifestPath, "utf8")) as unknown,
    "Corpus manifest",
  ) as unknown as CorpusManifest
  const lock = recordValue(
    JSON.parse(await readFile(lockPath, "utf8")) as unknown,
    "Corpus lock",
  ) as unknown as CorpusLock
  if (manifest.schema_version !== 1 || lock.schema_version !== 1) {
    throw new Error("Unsupported corpus manifest or lock schema")
  }
  if (!Array.isArray(manifest.sources) || manifest.sources.length !== sources.length) {
    throw new Error("Corpus manifest source set is incomplete")
  }
  const generatorHash = sha256(await readFile(scriptPath))
  if (manifest.generator_sha256 !== generatorHash || lock.generator_sha256 !== generatorHash) {
    throw new Error("Corpus generator does not match the reviewed lock")
  }
  if (
    typeof manifest.content_identity_sha256 !== "string" ||
    manifest.content_identity_sha256 !== lock.content_identity_sha256
  ) {
    throw new Error("Corpus content identity does not match the reviewed lock")
  }

  const sourceCounts = new Map<string, number>()
  for (const specification of sources) {
    const source = manifest.sources.find((candidate) => candidate.id === specification.id)
    if (!source) throw new Error(`${specification.id}: missing manifest source`)
    if (
      source.title !== specification.title ||
      source.author !== specification.author ||
      source.year !== specification.year ||
      source.role !== specification.role ||
      source.upstream_sha256 !== specification.sha256 ||
      source.text_file !== `text/${specification.id}.txt`
    ) {
      throw new Error(`${specification.id}: manifest metadata differs from source specification`)
    }
    const path = resolve(textDir, `${specification.id}.txt`)
    const state = await lstat(path)
    if (!state.isFile() || state.isSymbolicLink()) {
      throw new Error(`${specification.id}: bundled text must be a regular file`)
    }
    const text = await readFile(path, "utf8")
    const actual = sha256(text)
    if (actual !== source.clean_sha256 || actual !== lock.source_clean_sha256?.[specification.id]) {
      throw new Error(`${specification.id}: bundled text hash mismatch`)
    }
    assertAuthoredBoundary(specification.id, text)
    sourceCounts.set(specification.id, 0)
  }

  const chunksRaw = await readFile(chunksPath, "utf8")
  const chunksHash = sha256(chunksRaw)
  if (chunksHash !== manifest.chunks_sha256 || chunksHash !== lock.chunks_sha256) {
    throw new Error("Corpus chunk index does not match its manifest and reviewed lock")
  }
  const ids = new Set<string>()
  const lines = chunksRaw.split("\n").filter(Boolean)
  for (const [index, line] of lines.entries()) {
    const chunk = recordValue(JSON.parse(line) as unknown, `Chunk line ${index + 1}`)
    const sourceId = chunk.source_id
    const specification = sources.find((candidate) => candidate.id === sourceId)
    if (!specification) throw new Error(`Chunk line ${index + 1}: unknown source`)
    if (
      chunk.author !== specification.author ||
      chunk.title !== specification.title ||
      chunk.year !== specification.year ||
      chunk.role !== specification.role ||
      chunk.modernity_basis !== "chapter-default" ||
      typeof chunk.id !== "string" ||
      !chunk.id.startsWith(`${specification.id}-c`) ||
      typeof chunk.text !== "string" ||
      chunk.text_sha256 !== sha256(chunk.text) ||
      chunk.word_count !== wordCount(chunk.text)
    ) {
      throw new Error(`Chunk line ${index + 1}: schema or content integrity failure`)
    }
    if (ids.has(chunk.id)) throw new Error(`Duplicate chunk ID: ${chunk.id}`)
    ids.add(chunk.id)
    sourceCounts.set(specification.id, (sourceCounts.get(specification.id) ?? 0) + 1)
  }
  if (lines.length !== manifest.chunks || lines.length !== lock.chunks) {
    throw new Error("Corpus chunk count mismatch")
  }
  for (const source of manifest.sources) {
    if (source.chunks !== sourceCounts.get(source.id)) {
      throw new Error(`${source.id}: manifest chunk count mismatch`)
    }
  }
  const expectedIdentity = sha256(
    JSON.stringify({
      generator_sha256: generatorHash,
      chunking: { target_words: targetChunkWords, minimum_words: minimumChunkWords },
      source_clean_sha256: Object.fromEntries(
        sources.map((source) => [source.id, lock.source_clean_sha256[source.id]]),
      ),
      chunks: lines.length,
      chunks_sha256: chunksHash,
    }),
  )
  if (manifest.content_identity_sha256 !== expectedIdentity) {
    throw new Error("Corpus content identity is invalid")
  }
  console.log(`Corpus verified: ${manifest.sources.length} sources, ${lines.length} chunks`)
}

function assertAuthoredBoundary(sourceId: string, text: string): void {
  const forbiddenBySource: Record<string, string[]> = {
    "personality-house-1930": [
      "CODE OF CORRECT CONDUCT",
      "A. L. CHURCHILL",
      "LEONARD WICKENDEN",
      "MARGARET STORY",
    ],
    "title-market-1909": ["Transcriber's Notes:"],
  }
  for (const marker of forbiddenBySource[sourceId] ?? []) {
    if (text.includes(marker))
      throw new Error(`${sourceId}: non-author back matter found: ${marker}`)
  }
  if (
    new Set(["etiquette-1922", "personality-house-1930"]).has(sourceId) &&
    /\nINDEX\n/.test(text)
  ) {
    throw new Error(`${sourceId}: index back matter found`)
  }
}

async function main(): Promise<void> {
  if (checkOnly && !refresh) {
    await verifyExisting()
    return
  }
  if (!refresh && existsSync(manifestPath) && existsSync(chunksPath)) {
    await verifyExisting()
    return
  }

  await mkdir(textDir, { recursive: true })
  const allChunks: CorpusChunk[] = []
  const sourceResults: Array<Record<string, unknown>> = []
  const textOutputs = new Map<string, string>()
  const timestamp = buildTimestamp()
  const generatorHash = sha256(await readFile(scriptPath))

  for (const source of sources) {
    const raw = await download(source)
    const cleaned = normalizeText(raw, source)
    assertAuthoredBoundary(source.id, cleaned)
    const chunks = makeChunks(source, cleaned)
    if (chunks.length === 0) throw new Error(`${source.id}: generated no chunks`)
    const fileName = `${source.id}.txt`
    textOutputs.set(fileName, cleaned)
    allChunks.push(...chunks)
    sourceResults.push({
      id: source.id,
      title: source.title,
      author: source.author,
      year: source.year,
      role: source.role,
      landing_url: source.landingUrl,
      text_url: source.textUrl,
      retrieved_at: timestamp,
      upstream_sha256: source.sha256,
      clean_sha256: sha256(cleaned),
      text_file: `text/${fileName}`,
      bytes: Buffer.byteLength(cleaned),
      words: wordCount(cleaned),
      chunks: chunks.length,
    })
  }

  const jsonl = `${allChunks.map((chunk) => JSON.stringify(chunk)).join("\n")}\n`
  const chunksHash = sha256(jsonl)
  const sourceCleanHashes = Object.fromEntries(
    sources.map((source) => {
      const result = sourceResults.find((candidate) => candidate.id === source.id)
      if (!result || typeof result.clean_sha256 !== "string") {
        throw new Error(`${source.id}: missing clean source hash`)
      }
      return [source.id, result.clean_sha256]
    }),
  )
  const contentIdentity = sha256(
    JSON.stringify({
      generator_sha256: generatorHash,
      chunking: { target_words: targetChunkWords, minimum_words: minimumChunkWords },
      source_clean_sha256: sourceCleanHashes,
      chunks: allChunks.length,
      chunks_sha256: chunksHash,
    }),
  )
  const manifest = {
    schema_version: 1,
    generated_at: timestamp,
    generator: basename(scriptPath),
    generator_sha256: generatorHash,
    content_identity_sha256: contentIdentity,
    chunking: { target_words: targetChunkWords, minimum_words: minimumChunkWords },
    rights_scope:
      "U.S. public-domain original publications through 1930; verify other jurisdictions",
    attribution_note:
      "Richard Duffy's introduction to Etiquette (1922) is excluded; the text begins at Chapter I.",
    authorship_boundary_note:
      "Indexes, publisher advertisements, and Project Gutenberg transcriber notes are excluded before chunking.",
    modernity_metadata_note:
      "Chunk modernity values are chapter-level defaults for triage, not passage-level judgments.",
    sources: sourceResults,
    chunks: allChunks.length,
    chunks_sha256: chunksHash,
  }
  // Validate every source and chunk before replacing any bundled artifact.
  for (const [fileName, cleaned] of textOutputs) {
    await atomicWrite(resolve(textDir, fileName), cleaned)
  }
  await atomicWrite(chunksPath, jsonl)
  await atomicWrite(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`)
  console.log(
    `Built ${allChunks.length} chunks from ${sources.length} sources (${wordCount(allChunks.map((chunk) => chunk.text).join(" ")).toString()} indexed words; content ${contentIdentity})`,
  )
}

await main()

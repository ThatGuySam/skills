#!/usr/bin/env node

import { createHash } from "node:crypto"
import { realpathSync } from "node:fs"
import { readFile } from "node:fs/promises"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import type { CorpusChunk } from "./build-corpus.ts"

export type SearchMode = "advice" | "voice" | "all"

export type SearchResult = CorpusChunk & {
  rank: number
  score: number
  snippet: string
}

type IndexedDocument = {
  chunk: CorpusChunk
  frequencies: Map<string, number>
  length: number
  searchableText: string
}

const scriptDir = dirname(fileURLToPath(import.meta.url))
const defaultIndexPath = resolve(scriptDir, "../references/corpus/chunks.jsonl")
const defaultManifestPath = resolve(scriptDir, "../references/corpus/manifest.json")
const defaultLockPath = resolve(scriptDir, "../references/corpus/lock.json")
const builderPath = resolve(scriptDir, "build-corpus.ts")

const expectedSources = {
  "etiquette-1922": {
    role: "primary-advice",
    year: 1922,
    title: "Etiquette: In Society, in Business, in Politics and at Home",
    sourceUrl: "https://www.gutenberg.org/ebooks/14314",
  },
  "personality-house-1930": {
    role: "adjacent-advice",
    year: 1930,
    title: "The Personality of a House",
    sourceUrl: "https://archive.org/details/personalityofhou0000post",
  },
  "by-motor-1916": {
    role: "style-only",
    year: 1916,
    title: "By Motor to the Golden Gate",
    sourceUrl: "https://www.gutenberg.org/ebooks/73784",
  },
  "title-market-1909": {
    role: "style-only",
    year: 1909,
    title: "The Title Market",
    sourceUrl: "https://www.gutenberg.org/ebooks/17680",
  },
} as const

const stopwords = new Set([
  "a",
  "about",
  "after",
  "all",
  "also",
  "am",
  "an",
  "and",
  "are",
  "as",
  "at",
  "be",
  "because",
  "been",
  "before",
  "being",
  "but",
  "by",
  "can",
  "could",
  "did",
  "do",
  "does",
  "for",
  "from",
  "had",
  "has",
  "have",
  "he",
  "her",
  "hers",
  "him",
  "his",
  "how",
  "i",
  "if",
  "in",
  "into",
  "is",
  "it",
  "its",
  "me",
  "my",
  "of",
  "on",
  "or",
  "our",
  "she",
  "should",
  "so",
  "some",
  "than",
  "that",
  "the",
  "their",
  "them",
  "there",
  "they",
  "this",
  "to",
  "us",
  "was",
  "we",
  "were",
  "what",
  "when",
  "where",
  "which",
  "who",
  "why",
  "will",
  "with",
  "would",
  "you",
  "your",
])

const expansions: Record<string, string[]> = {
  accessibility: ["comfort", "guest", "house", "host", "consideration"],
  accessible: ["comfort", "guest", "house", "host", "consideration"],
  alcohol: ["dinner", "drink", "host", "guest"],
  apology: ["apology", "regret", "forgive", "excuse"],
  ask: ["request", "invitation", "visit"],
  boundary: ["refusal", "regret", "decline", "consideration"],
  brother: ["guest", "invitation", "houseguest"],
  chat: ["conversation", "correspondence", "letter", "note"],
  colleague: ["business", "workplace", "introduction"],
  condolence: ["funeral", "mourning", "grief", "death", "letter"],
  coworker: ["business", "workplace", "introduction"],
  decline: ["regret", "refusal", "invitation", "answer"],
  dm: ["letter", "note", "correspondence", "introduction"],
  email: ["letter", "note", "correspondence", "business"],
  funeral: ["death", "mourning", "condolence", "grief"],
  guest: ["houseguest", "hospitality", "host", "visit", "invitation"],
  group: ["party", "conversation", "gathering"],
  host: ["hospitality", "guest", "invitation", "house"],
  houseguest: ["guest", "hospitality", "country", "visit", "invitation"],
  introduction: ["introduce", "present", "letter", "business"],
  invite: ["invitation", "acceptance", "regret", "reply"],
  invitation: ["acceptance", "regret", "answer", "guest"],
  linkedin: ["introduction", "business", "letter", "correspondence"],
  lodging: ["houseguest", "hospitality", "visit", "country"],
  mentor: ["introduction", "business", "letter"],
  no: ["refusal", "decline", "regret"],
  overnight: ["houseguest", "guest", "hospitality", "visit", "country"],
  pronoun: ["name", "title", "salutation", "address", "correspondence"],
  pronouns: ["name", "title", "salutation", "address", "correspondence"],
  refuse: ["refusal", "decline", "regret"],
  reply: ["answer", "acceptance", "regret", "letter"],
  rsvp: ["invitation", "acceptance", "regret", "answer"],
  slack: ["introduction", "business", "conversation", "correspondence"],
  stay: ["houseguest", "guest", "hospitality", "visit", "country"],
  text: ["note", "letter", "correspondence", "invitation"],
  wheelchair: ["comfort", "guest", "host", "house", "dinner"],
  wine: ["dinner", "drink", "host", "guest"],
  work: ["business", "workplace", "office"],
}

// Modern phrasing often names an object or relationship that the historical text
// describes indirectly. These bridges connect concepts, not specific passages.
const conceptBridges: Record<string, string[]> = {
  bag: ["belongings", "seat", "chair", "share", "public"],
  battery: ["breakdown", "engine", "motor", "mechanical"],
  bed: ["bedroom", "comfort", "room"],
  commute: ["travel", "road", "motor", "trip"],
  commuter: ["train", "travel", "public", "seat"],
  companionship: ["companion", "travel", "cheerful", "consideration"],
  complains: ["complain", "temper", "cheerful"],
  complainer: ["complain", "temper", "cheerful"],
  compliment: ["politeness", "conversation", "praise"],
  confided: ["confidence", "secret", "private", "family", "affair"],
  confidence: ["secret", "private", "trust"],
  crowded: ["share", "seat", "public", "consideration"],
  dead: ["breakdown", "engine"],
  decoration: ["furniture", "room", "comfort", "convenience"],
  epic: ["fate", "tragedy"],
  farewell: ["leave", "conge", "visiting", "card"],
  game: ["sport", "playing", "winner", "loser"],
  gloats: ["winner", "quiet"],
  gracious: ["sportsmanship", "cheerful", "quiet"],
  indiscreet: ["confidence", "secret", "private", "discuss"],
  lamp: ["light", "comfort", "furniture"],
  layout: ["place", "position", "furniture", "comfort", "convenience"],
  mishap: ["breakdown", "misfortune", "trouble"],
  nook: ["room", "furniture", "chair", "light", "comfort"],
  partner: ["occupant", "people", "preference"],
  phone: ["machine", "mechanical", "breakdown"],
  positions: ["place", "position", "arrangement"],
  ppc: ["visiting", "card", "leave", "conge"],
  priority: ["requirement", "important", "comfort"],
  private: ["confidence", "secret", "family", "affair", "letter"],
  retells: ["tell", "discuss", "confidence", "secret"],
  rival: ["antagonism", "competition", "politeness"],
  rivalry: ["antagonism", "competition"],
  seat: ["chair", "share", "train", "public"],
  shared: ["occupant", "people", "comfort"],
  spare: ["guestroom", "guest", "room", "hospitality"],
  spouse: ["wife", "husband", "family"],
  stop: ["quiet", "hear", "usher"],
  sulks: ["loser", "cheerful", "temper"],
  talking: ["talk", "chatter", "hear", "usher"],
  talkers: ["talk", "chatter", "hear", "usher"],
  theater: ["play", "performance", "audience"],
  tote: ["bag", "belongings", "seat", "chair", "share", "public"],
  tragedy: ["fate", "disaster", "gloom"],
  trip: ["travel", "journey"],
  trustee: ["society", "conversation"],
  undermining: ["antagonism", "destroy", "rival"],
  witty: ["wit", "conversation", "social"],
}

function stem(token: string): string {
  if (token.length > 5 && token.endsWith("ies")) return `${token.slice(0, -3)}y`
  if (token.length > 6 && token.endsWith("ing")) return token.slice(0, -3)
  if (token.length > 5 && token.endsWith("ed")) return token.slice(0, -2)
  if (token.length > 4 && token.endsWith("es")) return token.slice(0, -2)
  if (token.length > 3 && token.endsWith("s")) return token.slice(0, -1)
  return token
}

const normalizedConceptBridges = new Map<string, string[]>()
for (const [key, values] of Object.entries(conceptBridges)) {
  const normalizedKey = stem(key)
  const existing = normalizedConceptBridges.get(normalizedKey) ?? []
  normalizedConceptBridges.set(normalizedKey, [...new Set([...existing, ...values])])
}

export function tokenize(value: string): string[] {
  return (value.toLowerCase().match(/[\p{L}\p{N}]+(?:[’'-][\p{L}\p{N}]+)*/gu) ?? [])
    .map((token) => token.replace(/[’']/g, ""))
    .filter((token) => token.length > 1 && !stopwords.has(token))
    .map(stem)
}

function queryTerms(query: string): Map<string, number> {
  const terms = new Map<string, number>()
  const rawTokens = tokenize(query)
  for (const token of rawTokens) {
    terms.set(token, Math.max(terms.get(token) ?? 0, 1.5))
    for (const expansion of expansions[token] ?? []) {
      const normalized = stem(expansion)
      terms.set(normalized, Math.max(terms.get(normalized) ?? 0, 0.65))
    }
    for (const bridge of normalizedConceptBridges.get(token) ?? []) {
      const normalized = stem(bridge)
      terms.set(normalized, Math.max(terms.get(normalized) ?? 0, 1.1))
    }
  }
  return terms
}

function roleAllowed(role: CorpusChunk["role"], mode: SearchMode): boolean {
  if (mode === "advice") return role === "primary-advice" || role === "adjacent-advice"
  if (mode === "voice") return true
  return true
}

function roleWeight(role: CorpusChunk["role"], mode: SearchMode): number {
  if (mode === "voice") {
    if (role === "style-only") return 1.2
    if (role === "primary-advice") return 0.78
    return 0.55
  }
  if (mode === "advice") return role === "primary-advice" ? 1 : 0.88
  return 1
}

function indexChunk(chunk: CorpusChunk): IndexedDocument {
  const metadata = [
    chunk.chapter,
    chunk.chapter,
    chunk.section,
    chunk.section,
    chunk.topics.join(" "),
    chunk.topics.join(" "),
    chunk.risks.join(" "),
  ].join(" ")
  const tokens = tokenize(`${metadata} ${chunk.text}`)
  const frequencies = new Map<string, number>()
  for (const token of tokens) frequencies.set(token, (frequencies.get(token) ?? 0) + 1)
  return {
    chunk,
    frequencies,
    length: tokens.length,
    searchableText: `${chunk.chapter} ${chunk.section} ${chunk.text}`.toLowerCase(),
  }
}

function sha256(value: string): string {
  return createHash("sha256").update(value).digest("hex")
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value)
}

function stringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string")
}

function wordCount(value: string): number {
  return value.match(/[\p{L}\p{N}]+(?:[’'-][\p{L}\p{N}]+)*/gu)?.length ?? 0
}

function parseChunk(value: unknown, line: number): CorpusChunk {
  if (!isRecord(value)) throw new Error(`Corpus line ${line}: chunk must be an object`)
  const role = value.role
  const modernity = value.modernity
  const sourceId = value.source_id
  if (typeof sourceId !== "string" || !(sourceId in expectedSources)) {
    throw new Error(`Corpus line ${line}: unknown source_id`)
  }
  const expected = expectedSources[sourceId as keyof typeof expectedSources]
  if (role !== expected.role) throw new Error(`Corpus line ${line}: invalid role for ${sourceId}`)
  if (!new Set(["durable", "contextual", "historical-only"]).has(String(modernity))) {
    throw new Error(`Corpus line ${line}: invalid modernity`)
  }
  const requiredStrings = [
    "id",
    "title",
    "author",
    "chapter",
    "section",
    "source_url",
    "text_sha256",
    "text",
  ] as const
  for (const key of requiredStrings) {
    if (typeof value[key] !== "string" || value[key].length === 0) {
      throw new Error(`Corpus line ${line}: ${key} must be a non-empty string`)
    }
  }
  if (
    value.author !== "Emily Post" ||
    value.year !== expected.year ||
    value.title !== expected.title ||
    value.source_url !== expected.sourceUrl
  ) {
    throw new Error(`Corpus line ${line}: invalid source metadata for ${sourceId}`)
  }
  if (value.modernity_basis !== "chapter-default") {
    throw new Error(`Corpus line ${line}: modernity_basis must be chapter-default`)
  }
  if (!stringArray(value.risks) || !stringArray(value.topics)) {
    throw new Error(`Corpus line ${line}: risks and topics must be string arrays`)
  }
  if (!Number.isInteger(value.word_count) || Number(value.word_count) < 1) {
    throw new Error(`Corpus line ${line}: invalid word_count`)
  }
  const text = value.text as string
  if (value.word_count !== wordCount(text) || value.text_sha256 !== sha256(text)) {
    throw new Error(`Corpus line ${line}: text hash or word count mismatch`)
  }
  if (!(value.id as string).startsWith(`${sourceId}-c`)) {
    throw new Error(`Corpus line ${line}: ID does not match source`)
  }
  return value as unknown as CorpusChunk
}

async function verifyDefaultIndex(content: string, count: number): Promise<void> {
  const [manifestValue, lockValue, builder] = await Promise.all([
    readFile(defaultManifestPath, "utf8").then((value) => JSON.parse(value) as unknown),
    readFile(defaultLockPath, "utf8").then((value) => JSON.parse(value) as unknown),
    readFile(builderPath, "utf8"),
  ])
  if (!isRecord(manifestValue) || !isRecord(lockValue)) {
    throw new Error("Corpus manifest or lock is invalid")
  }
  const digest = sha256(content)
  if (manifestValue.chunks_sha256 !== digest || lockValue.chunks_sha256 !== digest) {
    throw new Error("Corpus index does not match its manifest and independent lock")
  }
  if (manifestValue.chunks !== count || lockValue.chunks !== count) {
    throw new Error("Corpus chunk count does not match its manifest and independent lock")
  }
  const generatorHash = sha256(builder)
  if (
    manifestValue.schema_version !== 1 ||
    lockValue.schema_version !== 1 ||
    manifestValue.generator_sha256 !== generatorHash ||
    lockValue.generator_sha256 !== generatorHash ||
    typeof manifestValue.content_identity_sha256 !== "string" ||
    manifestValue.content_identity_sha256 !== lockValue.content_identity_sha256
  ) {
    throw new Error("Corpus provenance does not match its reviewed lock")
  }
  const manifestSources = manifestValue.sources
  if (!Array.isArray(manifestSources)) throw new Error("Corpus manifest sources are invalid")
  const sourceIds = manifestSources
    .map((source) => (isRecord(source) ? source.id : undefined))
    .sort()
  if (JSON.stringify(sourceIds) !== JSON.stringify(Object.keys(expectedSources).sort())) {
    throw new Error("Corpus manifest source set is invalid")
  }
}

export async function loadChunks(indexPath = defaultIndexPath): Promise<CorpusChunk[]> {
  let content: string
  try {
    content = await readFile(indexPath, "utf8")
  } catch (error) {
    throw new Error(
      `Cannot read corpus index at ${indexPath}. Run build-corpus.ts --refresh first. ${(error as Error).message}`,
    )
  }
  const chunks = content
    .split("\n")
    .filter(Boolean)
    .map((line, index) => {
      try {
        return parseChunk(JSON.parse(line) as unknown, index + 1)
      } catch (error) {
        throw new Error(`Invalid JSONL at line ${index + 1}: ${(error as Error).message}`)
      }
    })
  const ids = new Set(chunks.map((chunk) => chunk.id))
  if (ids.size !== chunks.length) throw new Error("Corpus contains duplicate chunk IDs")
  if (resolve(indexPath) === defaultIndexPath) await verifyDefaultIndex(content, chunks.length)
  return chunks
}

function chooseSnippet(chunk: CorpusChunk, terms: string[]): string {
  const sentences = chunk.text.split(/(?<=[.!?])\s+/)
  let best = sentences[0] ?? chunk.text
  let bestScore = -1
  for (let index = 0; index < sentences.length; index += 1) {
    const candidate = [sentences[index - 1], sentences[index], sentences[index + 1]]
      .filter(Boolean)
      .join(" ")
    const normalized = candidate.toLowerCase()
    const score = terms.reduce((sum, term) => sum + (normalized.includes(term) ? 1 : 0), 0)
    if (score > bestScore) {
      best = candidate
      bestScore = score
    }
  }
  const compact = best.replace(/\s+/g, " ").trim()
  return compact.length <= 360 ? compact : `${compact.slice(0, 357).trimEnd()}…`
}

export async function search(
  query: string,
  options: { mode?: SearchMode; top?: number; indexPath?: string } = {},
): Promise<SearchResult[]> {
  const mode = options.mode ?? "advice"
  const top = options.top ?? 6
  if (mode !== "advice" && mode !== "voice" && mode !== "all") {
    throw new Error("Search mode must be advice, voice, or all")
  }
  if (!query.trim()) throw new Error("Search query cannot be empty")
  if (!Number.isInteger(top) || top < 1 || top > 50) {
    throw new Error("--top must be an integer from 1 to 50")
  }
  const chunks = (await loadChunks(options.indexPath)).filter((chunk) =>
    roleAllowed(chunk.role, mode),
  )
  const documents = chunks.map(indexChunk)
  const terms = queryTerms(query)
  const documentFrequency = new Map<string, number>()
  for (const term of terms.keys()) {
    documentFrequency.set(
      term,
      documents.reduce((count, document) => count + (document.frequencies.has(term) ? 1 : 0), 0),
    )
  }
  const averageLength =
    documents.reduce((sum, document) => sum + document.length, 0) / Math.max(documents.length, 1)
  const k1 = 1.4
  const b = 0.72
  const originalTokens = tokenize(query)

  return documents
    .map((document) => {
      let score = 0
      for (const [term, boost] of terms) {
        const frequency = document.frequencies.get(term) ?? 0
        if (frequency === 0) continue
        const df = documentFrequency.get(term) ?? 0
        const idf = Math.log(1 + (documents.length - df + 0.5) / (df + 0.5))
        const denominator =
          frequency + k1 * (1 - b + b * (document.length / Math.max(averageLength, 1)))
        score += boost * idf * ((frequency * (k1 + 1)) / denominator)
      }
      const exactPhrase = query.trim().toLowerCase()
      if (exactPhrase.length > 6 && document.searchableText.includes(exactPhrase)) score += 4
      score *= roleWeight(document.chunk.role, mode)
      return { document, score }
    })
    .filter(({ score }) => score > 0)
    .sort((left, right) => {
      const scoreDifference = right.score - left.score
      if (scoreDifference !== 0) return scoreDifference
      return left.document.chunk.id < right.document.chunk.id ? -1 : 1
    })
    .slice(0, top)
    .map(({ document, score }, index) => ({
      ...document.chunk,
      rank: index + 1,
      score: Number(score.toFixed(6)),
      snippet: chooseSnippet(document.chunk, originalTokens),
    }))
}

type CliOptions = {
  query: string
  ids: string[]
  mode: SearchMode
  top: number
  json: boolean
  full: boolean
  indexPath?: string
}

function parseCli(argv: string[]): CliOptions {
  const positional: string[] = []
  const ids: string[] = []
  let mode: SearchMode = "advice"
  let top = 6
  let json = false
  let full = false
  let indexPath: string | undefined

  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index]
    if (argument === "--mode") {
      const value = argv[++index]
      if (value !== "advice" && value !== "voice" && value !== "all") {
        throw new Error("--mode must be advice, voice, or all")
      }
      mode = value
    } else if (argument === "--top") {
      const value = argv[++index]
      if (!value || !/^\d+$/.test(value)) throw new Error("--top requires an integer")
      top = Number.parseInt(value, 10)
    } else if (argument === "--id") {
      const value = argv[++index]
      if (!value || value.startsWith("--")) throw new Error("--id requires a chunk ID")
      ids.push(value)
    } else if (argument === "--index") {
      const value = argv[++index]
      if (!value || value.startsWith("--")) throw new Error("--index requires a path")
      indexPath = resolve(value)
    } else if (argument === "--json") {
      json = true
    } else if (argument === "--full") {
      full = true
    } else if (argument === "--help" || argument === "-h") {
      console.log(
        'Usage: node scripts/search.ts "query" [--mode advice|voice|all] [--top 6] [--json] [--full]\n       node scripts/search.ts --id CHUNK_ID [--json]',
      )
      process.exit(0)
    } else if (argument?.startsWith("--")) {
      throw new Error(`Unknown option: ${argument}`)
    } else if (argument) {
      positional.push(argument)
    }
  }
  if (ids.length > 0 && positional.length > 0) {
    throw new Error("Use either a search query or --id, not both")
  }
  if (ids.length === 0 && positional.length === 0) {
    throw new Error("Provide a search query or --id")
  }
  return { query: positional.join(" "), ids, mode, top, json, full, indexPath }
}

function formatResult(result: SearchResult, full: boolean): string {
  const lines = [
    `${result.rank}. ${result.id} | score ${result.score.toFixed(3)} | ${result.role} | chapter-default ${result.modernity}`,
    `   ${result.title} (${result.year}) — ${result.chapter}`,
    `   Section: ${result.section}`,
    `   Risks: ${result.risks.length > 0 ? result.risks.join(", ") : "none tagged"}`,
    `   ${full ? result.text : result.snippet}`,
  ]
  return lines.join("\n")
}

async function main(): Promise<void> {
  const options = parseCli(process.argv.slice(2))
  if (options.ids.length > 0) {
    const chunks = await loadChunks(options.indexPath)
    const selected = options.ids.map((id) => {
      const chunk = chunks.find((candidate) => candidate.id === id)
      if (!chunk) throw new Error(`Unknown chunk ID: ${id}`)
      return chunk
    })
    if (options.json) console.log(JSON.stringify(selected, null, 2))
    else {
      console.log(
        selected
          .map((chunk) =>
            [
              `${chunk.id} | ${chunk.role} | ${chunk.modernity}`,
              `${chunk.title} (${chunk.year}) — ${chunk.chapter}`,
              `Section: ${chunk.section}`,
              `Risks: ${chunk.risks.length > 0 ? chunk.risks.join(", ") : "none tagged"}`,
              chunk.text,
            ].join("\n"),
          )
          .join("\n\n---\n\n"),
      )
    }
    return
  }
  const results = await search(options.query, {
    mode: options.mode,
    top: options.top,
    indexPath: options.indexPath,
  })
  if (options.json) console.log(JSON.stringify(results, null, 2))
  else console.log(results.map((result) => formatResult(result, options.full)).join("\n\n"))
}

let isMain = false
if (process.argv[1]) {
  try {
    isMain = realpathSync(resolve(process.argv[1])) === realpathSync(fileURLToPath(import.meta.url))
  } catch {
    isMain = false
  }
}
if (isMain) await main()

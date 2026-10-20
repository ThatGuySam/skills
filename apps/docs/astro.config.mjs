// @ts-check
import starlight from "@astrojs/starlight"
import { defineConfig } from "astro/config"
import starlightLlmsTxt from "starlight-llms-txt"
import { readFileSync } from "node:fs"

const catalog = JSON.parse(readFileSync(new URL("../../skill-catalog.json", import.meta.url), "utf8"))
const skillNavigation = catalog.navigationGroups.map(group => ({
  label: group.label ?? catalog.skills.find(skill => skill.id === group.skills[0]).title,
  items: group.items,
}))

export default defineConfig({
  site: "https://skills.samcarlton.com",
  redirects: {
    "/research/instruction-system-audit-2026-07-17":
      "https://harness.docs.samcarlton.com/research/instruction-system-audit-2026-07-17/",
  },
  integrations: [
    starlight({
      title: "Sam's Skills",
      components: { Footer: "./src/components/Footer.astro" },
      description: "The portable agent skills Sam uses and shares.",
      plugins: [starlightLlmsTxt()],
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/ThatGuySam/skills",
        },
      ],
      customCss: [
        "@fontsource-variable/geist",
        "@fontsource-variable/geist-mono",
        "./src/styles/custom.css",
      ],
      editLink: {
        baseUrl: "https://github.com/ThatGuySam/skills/edit/main/apps/docs/",
      },
      lastUpdated: true,
      sidebar: [
        ...skillNavigation,
        {
          label: "Collection",
          items: [
            { label: "About Sam's Skills", slug: "collection/about" },
            { label: "Installation", slug: "collection/installation" },
            { label: "Compatibility", slug: "reference/compatibility" },
            { label: "Repository layout", slug: "reference/repository-layout" },
            { label: "Distribution model", slug: "architecture/distribution-model" },
          ],
        },
        {
          label: "HTMA features",
          badge: { text: "Available", variant: "tip" },
          items: [
            { label: "Calibrated estimates", slug: "features/calibrated-estimates" },
            { label: "Measurement memos", slug: "features/measurement-memos" },
            { label: "Sources & value of information", slug: "features/sources-and-voi" },
          ],
        },
        {
          label: "HTMA design",
          items: [
            { label: "Motivation", slug: "design/motivation" },
            { label: "Design principles", slug: "design/principles" },
          ],
        },
        {
          label: "HTMA reference",
          items: [{ label: "Output contract", slug: "reference/output-contract" }],
        },
        {
          label: "HTMA architecture",
          items: [{ label: "Data model", slug: "architecture/data-model" }],
        },
        {
          label: "Project",
          items: [
            { label: "Roadmap", slug: "project/roadmap" },
            { label: "Open questions & decisions", slug: "project/open-questions" },
            { label: "Changelog", slug: "project/changelog" },
          ],
        },
        {
          label: "Research",
          collapsed: true,
          items: [
            { label: "Overview", link: "/research/" },
            { label: "Developer docs and catalog", slug: "research/developer-docs-and-skill-catalog-2026-10-20" },
            {
              label: "Concise env examples",
              slug: "research/concise-env-example-writing-2026-10-09",
            },

            { label: "Andrej Explain research", slug: "research/andrej-explain-2026-10-01" },
          ],
        },
      ],
    }),
  ],
})

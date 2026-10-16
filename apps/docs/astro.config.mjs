// @ts-check
import starlight from "@astrojs/starlight"
import { defineConfig } from "astro/config"
import starlightLlmsTxt from "starlight-llms-txt"

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
        {
          label: "Phone Size",
          items: [{ label: "Install and use", slug: "phone-size/introduction" }],
        },
        {
          label: "Tree and Status",
          items: [
            { label: "Install and use", slug: "tree-status/introduction" },
            { label: "Design", slug: "tree-status/design" },
            { label: "Glossary", slug: "tree-status/glossary" },
            { label: "Verification", slug: "tree-status/verification" },
          ],
        },
        {
          label: "Env Example",
          items: [
            { label: "Draft and example", slug: "env-example/introduction" },
            { label: "Verification", slug: "env-example/verification" },
            { label: "Agent checker", slug: "env-example/checker" },
          ],
        },
        {
          label: "Andrej Explain",
          badge: { text: "New", variant: "tip" },
          items: [
            { label: "Install and use", slug: "andrej-explain/introduction" },
            { label: "Examples", slug: "andrej-explain/examples" },
            { label: "Behavior and formats", slug: "andrej-explain/reference" },
            { label: "Testing and troubleshooting", slug: "andrej-explain/verification" },
          ],
        },
        {
          label: "Sales Research",
          items: [
            { label: "Install and use", slug: "sales-research/introduction" },
            { label: "Examples", slug: "sales-research/examples" },
            { label: "Sources", slug: "sales-research/sources" },
            { label: "Testing and verification", slug: "sales-research/verification" },
          ],
        },
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
          label: "Migrate Custom GPTs",
          items: [
            { label: "Introduction", slug: "migrate-cgpt/introduction" },
            { label: "Backup and install", slug: "migrate-cgpt/backup-and-install" },
            { label: "Verification", slug: "migrate-cgpt/verification" },
          ],
        },
        {
          label: "Sam's Gen Writing",
          badge: { text: "New", variant: "tip" },
          items: [
            { label: "Install and use", slug: "sams-gen-writing/introduction" },
            { label: "Verification", slug: "sams-gen-writing/verification" },
          ],
        },
        {
          label: "Sam's Skill Creator",
          items: [{ label: "Install and use", slug: "sams-skill-creator/introduction" }],
        },
        {
          label: "Sam UX Audit",
          items: [
            { label: "Introduction", slug: "sam-ux-audit/introduction" },
            { label: "Verification", slug: "sam-ux-audit/verification" },
          ],
        },
        {
          label: "Zach Prompting",
          badge: { text: "New", variant: "tip" },
          items: [
            { label: "Introduction", slug: "zach-prompting/introduction" },
            { label: "Verification", slug: "zach-prompting/verification" },
          ],
        },
        {
          label: "HTMA Measure",
          items: [
            { label: "Introduction", slug: "overview/introduction" },
            { label: "Who it's for", slug: "overview/who-its-for" },
            { label: "Problems it solves", slug: "overview/problems-it-solves" },
            { label: "How it works", slug: "overview/how-it-works" },
            { label: "Installation", slug: "guides/installation" },
            { label: "Your first measurement", slug: "guides/first-measurement" },
            { label: "Prompt recipes", slug: "guides/prompt-recipes" },
            { label: "Command reference", slug: "guides/command-reference" },
            { label: "Troubleshooting", slug: "guides/troubleshooting" },
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

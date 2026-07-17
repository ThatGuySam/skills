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
      description:
        "The portable agent skills Sam uses and shares.",
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
          items: [
            { label: "Output contract", slug: "reference/output-contract" },
          ],
        },
        {
          label: "HTMA architecture",
          items: [
            { label: "Data model", slug: "architecture/data-model" },
          ],
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
          ],
        },
      ],
    }),
  ],
})

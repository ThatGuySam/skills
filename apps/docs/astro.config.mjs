// @ts-check
import starlight from "@astrojs/starlight"
import { defineConfig } from "astro/config"
import starlightLlmsTxt from "starlight-llms-txt"

export default defineConfig({
  site: "https://skills.samcarlton.com",
  integrations: [
    starlight({
      title: "HTMA Measure",
      description:
        "Install and use the HTMA Measure agent skill to create calibrated, decision-ready estimates.",
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
          label: "Overview",
          items: [
            { label: "Introduction", slug: "overview/introduction" },
            { label: "Who it's for", slug: "overview/who-its-for" },
            { label: "How it works", slug: "overview/how-it-works" },
          ],
        },
        {
          label: "Install & use",
          items: [
            { label: "Installation", slug: "guides/installation" },
            { label: "Your first measurement", slug: "guides/first-measurement" },
            { label: "Prompt recipes", slug: "guides/prompt-recipes" },
            { label: "Command reference", slug: "guides/command-reference" },
            { label: "Troubleshooting", slug: "guides/troubleshooting" },
          ],
        },
        {
          label: "Features",
          badge: { text: "Available", variant: "tip" },
          items: [
            { label: "Calibrated estimates", slug: "features/calibrated-estimates" },
            { label: "Measurement memos", slug: "features/measurement-memos" },
            { label: "Sources & value of information", slug: "features/sources-and-voi" },
          ],
        },
        {
          label: "Design",
          items: [
            { label: "Motivation", slug: "design/motivation" },
            { label: "Design principles", slug: "design/principles" },
          ],
        },
        {
          label: "Reference",
          items: [
            { label: "Output contract", slug: "reference/output-contract" },
            { label: "Repository layout", slug: "reference/repository-layout" },
            { label: "Compatibility", slug: "reference/compatibility" },
          ],
        },
        {
          label: "Architecture",
          items: [
            { label: "Distribution model", slug: "architecture/distribution-model" },
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
          items: [{ label: "Overview", link: "/research/" }],
        },
      ],
    }),
  ],
})

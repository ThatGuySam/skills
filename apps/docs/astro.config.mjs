// @ts-check
import starlight from "@astrojs/starlight"
import { defineConfig } from "astro/config"
import starlightLlmsTxt from "starlight-llms-txt"

export default defineConfig({
  site: "https://skills.samcarlton.com",
  integrations: [
    starlight({
      title: "ThatGuySam Skills",
      description:
        "Install and use portable agent skills for clearer instructions and better decisions.",
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
          label: "HTMA overview",
          items: [
            { label: "Introduction", slug: "overview/introduction" },
            { label: "Who it's for", slug: "overview/who-its-for" },
            { label: "How it works", slug: "overview/how-it-works" },
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
          label: "Collection",
          items: [
            { label: "Repository layout", slug: "reference/repository-layout" },
            { label: "Compatibility", slug: "reference/compatibility" },
            { label: "Distribution model", slug: "architecture/distribution-model" },
          ],
        },
        {
          label: "HTMA install & use",
          items: [
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
          items: [{ label: "Overview", link: "/research/" }],
        },
      ],
    }),
  ],
})

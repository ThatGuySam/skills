# Research and maintenance

Checked 2026-10-01. Recheck vendor facts before relying on dates, eligibility, UI steps, or runtime installation paths. These links support decisions; they are not prerequisites for offline conversion of supplied instructions.

## Migration facts

[Agent Skills specification](https://agentskills.io/specification) defines the portable folder and frontmatter contract. The private backup manifest in this skill is an independent capture record, not part of that standard.

[OpenAI: Moving custom GPT workflows to plugins](https://learn.chatgpt.com/docs/migrate-custom-gpts) documents the current creator/admin flow and its read-only effect on the original. Back up before invoking it; Actions require separate rebuilding.

[OpenAI: Package your plugin](https://developers.openai.com/plugins/build/plugins) defines the portable root manifest and supported compatibility overlay.

[OpenAI: Enterprise plugin management](https://learn.chatgpt.com/docs/enterprise/plugin-management) documents admin marketplace import. This does not establish availability for personal accounts.

[OpenAI: Custom GPT retirement and migration FAQ](https://help.openai.com/en/articles/20001519-custom-gpt-retirement-and-migration-faq)

Check the current FAQ and the actual account/workspace notice for rollout and retirement dates; do not apply one workspace's schedule to every plan. Instructions become a plugin skill, connected apps can carry over, and Actions require rebuilding. Model selection and starters do not transfer one-to-one. Verify knowledge files and runtime capabilities. Built-in migration requires an eligible published GPT and creator/admin access. The original becomes read-only; the replacement starts private. Portable conversion from authorized files does not invoke that flow.

[OpenAI: Build skills](https://learn.chatgpt.com/docs/build-skills)

Defines SKILL.md packaging, progressive loading, runtime discovery locations, and metadata. Verify paths against the target runtime. Standalone desktop/CLI/IDE discovery and plugin distribution to ChatGPT Web are separate delivery modes. Confirm availability in the actual target account.

[OpenAI: Skills and plugins](https://learn.chatgpt.com/docs/skills-and-plugins)

Skills carry workflow guidance and resources; plugins can package skills with MCP tools. A text conversion cannot supply an absent service connection.

## Writing principles used here

[Matt Pocock: The /writing-for-agents Skill](https://www.aihero.dev/skills-writing-for-agents), updated 2026-08-24. Formerly named writing-great-skills. Apply his behavioral deletion test, precise reference pointers, conditional detail, and explicit completion checks. Abstract beyond one example. His emphasis on pruning does not justify deleting required behavior to meet a length target.

[Sam's Zach Prompting](https://github.com/ThatGuySam/skills/tree/main/skills/zach-prompting), also available as the installed `zach-prompting` skill. Recover the behavior contract before editing. Preserve evidence and authorization requirements. Separate necessary adaptations from optional rewrites and distinguish structural validation from behavioral proof.

This skill's component mapping and destination workflow synthesize those principles for Custom GPT migration. They are implementation guidance, not claims that OpenAI's built-in importer performs every step.

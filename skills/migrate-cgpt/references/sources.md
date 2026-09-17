# Research and maintenance

Checked 2026-09-17. Recheck vendor facts before relying on dates, eligibility, UI steps, or runtime installation paths. These links support decisions; they are not prerequisites for offline conversion of supplied instructions.

## Migration facts

[OpenAI: Custom GPT retirement and migration FAQ](https://help.openai.com/en/articles/20001519-custom-gpt-retirement-and-migration-faq)

The published Enterprise schedule targets migration availability on September 17, ends new creation on September 25, and schedules retirement for December 11, 2026. Dates and availability can change; other plans require their own notices. Instructions become a plugin skill, connected apps carry over, and Actions require rebuilding. Model choice does not carry over; chats and starters may not copy. Check reference material. Built-in migration requires a published GPT and creator/admin access in the described Enterprise flow. The original becomes read-only; the replacement starts private. Portable conversion from authorized files does not invoke that flow.

[OpenAI: Build skills](https://learn.chatgpt.com/docs/build-skills)

Defines SKILL.md packaging, progressive loading, runtime discovery locations, and metadata. Verify paths against the target runtime. Local discovery and plugin distribution are separate delivery modes.

[OpenAI: Skills and plugins](https://learn.chatgpt.com/docs/skills-and-plugins)

Skills carry workflow guidance and resources; plugins can package skills with MCP tools. A text conversion cannot supply an absent service connection.

## Writing principles used here

[Matt Pocock: The /writing-for-agents Skill](https://www.aihero.dev/skills-writing-for-agents), updated 2026-08-24. Formerly named writing-great-skills. Apply his behavioral deletion test, precise reference pointers, conditional detail, and explicit completion checks. Abstract beyond one example. His emphasis on pruning does not justify deleting required behavior to meet a length target.

[Sam's Zach Prompting](https://github.com/ThatGuySam/skills/tree/main/skills/zach-prompting), also available as the installed `zach-prompting` skill. Recover the behavior contract before editing. Preserve evidence and authorization requirements. Separate necessary adaptations from optional rewrites and distinguish structural validation from behavioral proof.

This skill's component mapping and destination workflow synthesize those principles for Custom GPT migration. They are implementation guidance, not claims that OpenAI's built-in importer performs every step.

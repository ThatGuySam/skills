# Editing an agent-skill demo for X

Date: 2026-11-05.

Show a concrete question, compress the waiting, and leave the answer visible long enough to read. This memo supports Sam's Activity Monitor video post. It is personal editorial research, not a change to the published skill or its product documentation.

## Scope and local evidence

The supplied recording is 74.122 seconds, 1622 by 1284 pixels, with no audio stream. It shows `$activity-monitor Why is my computer slow?`, tool activity, and a final answer. The complete answer appears around 53 seconds. The local [skill](../../skills/activity-monitor/SKILL.md) describes bounded macOS resource inspection and separates observations from possible causes. No existing memo in `docs/research/` covered social video demos.

The recorded answer identifies memory load as the strongest suspect, while explicitly saying the capture did not establish the cause. It reports spare CPU capacity and little observed swapping. A tweet claiming a proven diagnosis or automatic fix would overstate this demonstration.

## What the evidence says

- X's [current creative specifications](https://help.x.com/en/business-and-advertising/creative-ad-specifications) recommend short videos, text overlays, H.264, 4:2:0 color, and 30 fps. These are advertising recommendations. They do not establish the best duration for an organic, text-heavy agent demo.
- X's older [Twitter/Omnicom study](https://marketing.x.com/en_apac/insights/how-to-create-video-with-thumb-stopping-power-on-twitter) supports a clear opening that works without audio. It studied brand advertising and memory measures, not organic developer posts. Do not treat its engagement claims as a current algorithm rule.
- Aurora Harley's [NN/g instructional-video research](https://www.nngroup.com/articles/instructional-video-guidelines/), dated January 19, 2020, reports that viewers pause and replay complex steps, dislike long introductions, and appreciate text when sound is unavailable. The recent study described eight participants and drew on earlier research. It supports readable pacing, but does not measure tweet performance.
- X's [upload help](https://help.x.com/en/using-x/x-videos) currently allows non-Premium uploads up to 140 seconds and 512 MB. The export is comfortably below both limits. Actual X transcoding and playback have not been tested by uploading it.

HN, Lobsters, named-practitioner, and GitHub discovery searches did not produce strong, directly applicable evidence about organic agent-demo pacing. Generic recorder promotions and unsupported social-marketing claims were excluded. No claim of community consensus or reach improvement follows from this research.

## Do

- Put the viewer's question and skill name in the opening frame. Recommendation inferred from the attention and introduction evidence.
- Demonstrate one actual request and its output. Keep the post understandable without watching every tool call.
- Label accelerated activity. Viewers should understand that the edit does not represent wall-clock execution time.
- Keep the result at normal speed and hold it. This edit allocates roughly 31 seconds after the result segment begins, including an 18-second added freeze.
- Keep the caveat next to the finding. Say that memory load is the strongest suspect.
- Supply a useful text summary in the post. Use an actual result frame as the thumbnail when the posting interface supports one.

## Avoid

- Long introductions, login screens, or watching every unchanged waiting frame.
- Speeding the output at the same rate as the search. The two phases have different reading demands.
- Cropping away qualifiers, process names, or the recommended next step to make the answer look stronger.
- Claims that the skill proved the cause, repaired the Mac, or ran in six seconds.
- Unproven rules about hashtags, link placement, posting hour, or guaranteed reach.
- Forcing a widescreen desktop into a narrow vertical crop that removes long lines of output.

The source uses long terminal lines. Holding the output helps reading time, but cannot make that text large in a narrow phone feed. The full answer is best read expanded. For a future recording, use a narrower terminal and larger font so lines wrap naturally before recording.

## Delivered edit

The [MP4](../../exports/activity-monitor-x-2026-11-05/activity-monitor-x.mp4) preserves the source window and adds a small banner above it. Its data model is a sequence of source intervals with playback rates and an optional final hold:

| Source interval | Playback | Purpose |
| --- | --- | --- |
| 0–3 seconds | 1x | Read the prompt |
| 3–51 seconds | 8x | Compress searching and tool activity |
| 51–56 seconds | 1x | Watch the answer appear |
| 56–69 seconds | 1x, then an 18-second freeze | Read the complete answer |

Measured export: 45.133 seconds, 2,634,370 bytes, 1440 by 1200 pixels, H.264, yuv420p, 30 fps, no audio. Small frame-timing differences arise from converting the variable-frame-rate source to 30 fps. Playback speed is labeled in the video. The original file is unchanged.

FFmpeg's installed `-h filter=setpts`, `-h filter=tpad`, and `-h filter=concat` documentation verified the filters. The online [filter documentation](https://ffmpeg.org/ffmpeg-filters.html) was discoverable but timed out during direct retrieval. The [render script](../../exports/activity-monitor-x-2026-11-05/render.sh) is retained with its banner assets.

Verification used a full FFmpeg decode with no reported errors, ffprobe metadata, and extracted frames spanning the opening, activity, answer, and final hold. This applies the Prove It Works principle to the exported artifact. Model the Domain shaped the explicit source-interval timeline instead of scattered timing expressions. No live X upload was performed.

## Tweet draft

Made an Activity Monitor skill for agents.

Ask "Why is my Mac slow?" and get a plain-English readout of what's using resources and what to check next.

Here, memory load was the strongest suspect.

Demo sped up while it checks; slowed down so you can read the result.

## Publication scope

Kept local with the edit. The repository's public docs site is a skill reference, while this memo concerns a personal social post and source-recording edit. No site, skill, bundle, remote repository, or social account was changed.

## Follow-up: practitioner sources for post copy

Added November 5, 2026 after Sam requested practitioner attribution for each recommendation. These sources were collected in the follow-up. They did not inform the original draft. The initial research primarily supported video pacing and export decisions, and the draft's wording was editorial judgment based on the recording.

The following are durable writing principles, mainly from essays and technical blogging. Applying them to an X launch post is an inference, not evidence of a particular reach or conversion result.

| Do | Don't | Practitioner and direct source | Application to this post |
| --- | --- | --- | --- |
| Lead with the important information. | Bury what the tool does below a long announcement preamble. | Paul Graham, [Writing, Briefly](https://www.paulgraham.com/writing44.html), March 2005. | Open with the slow-Mac question and the skill's job. |
| Use familiar words and conversational sentences. | Use impressive-sounding jargon in place of an explanation. | Paul Graham, [Write Simply](https://paulgraham.com/simply.html), March 2021. | Say it checks CPU, memory, and disk and explains what it finds. |
| Use an actual example. | Substitute vague benefit claims or a contrived scenario. | Julia Evans, [Write good examples by starting with real code](https://jvns.ca/blog/2021/07/08/writing-great-examples/), July 2021. | Quote the real prompt and mention the observed memory finding. Her advice concerns code examples; the demo application is mine. |
| State what you know and acknowledge uncertainty. | Turn a suspected cause into a proven diagnosis. | Julia Evans, [Some tactics for writing in public](https://jvns.ca/blog/2023/08/07/tactics-for-writing-in-public/), August 2023. | Keep "strongest suspect" or "possible culprit." The exact diagnostic caveat comes from the recording. |
| Explain the project and include visual evidence. | Assume the reader understands the skill name, or omit evidence of what it does. | Simon Willison, [What to blog about](https://simonwillison.net/2022/Nov/6/what-to-blog-about/), November 2022. | Pair a brief description with the actual video. His advice is about project blogging, extended here to the post. |
| If asking a question, request specific experiences or examples. | Add a generic opinion prompt or controversy solely to attract replies. | Julia Evans, [Some tactics for writing in public](https://jvns.ca/blog/2023/08/07/tactics-for-writing-in-public/), August 2023. | Optional question: "What do you check first when your Mac slows down?" An invitation is optional, not required for the launch post. |

The sources do not justify rules about current X algorithms, hashtag counts, external-link penalties, or the best posting hour. The "8x speed" disclosure is an accuracy decision based on the actual edit, not a practitioner-attributed tweet tactic. It is already visible in the video, so repeating the whole editing explanation in the post is optional.

Also checked [swyx's launch-cheatsheet](https://github.com/swyxio/launch-cheatsheet). It is an archived 2021 compilation with launch examples and links to other people's advice. It was not treated as an independently verified current-X playbook or used to attribute its contributors' claims directly to swyx.

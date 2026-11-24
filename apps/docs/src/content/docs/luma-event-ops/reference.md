---
title: Luma Event Operations reference
description: Event identity, organizer authorization, visibility, guest notifications, and what a change receipt records.
---

## Behavior

1. Identify the exact event, its managing calendar, and the organizer access available. Read the current fields before drafting a change.
2. Confirm the action, audience, and notification effects before writing to Luma or another external destination. Remote drafts, promotions, and announcements also need explicit scope.
3. Apply the authorized changes on the same listing. For a reschedule, check the save prompt for automatic updates and ask for approval if the user has yet to authorize them.
4. Read back the saved fields or send record and report the result. If access or approval is pending, prepare paste-ready copy and name the affected fields and decisions.

## Inputs & outputs

Provide the event link or ID and the desired outcome. For a new event, provide its managing calendar and confirmed logistics. For a send, provide the recipient group, content, and timing.

A local draft includes the observed listing state, proposed copy or field values, and decisions still needed. For an external action or attempt, the skill returns a dated receipt.

## States & edge cases

| Situation | What the skill checks |
| --- | --- |
| A listing is being staged | Private keeps it off calendars. Member-Only shows it to active members on a calendar with memberships enabled. A direct link can reach either listing. Registration and access rules need their own checks. |
| An event is moving to a different date | Check the automatic calendar update, keep the existing listing, and review date references in queued notices and partner listings. |
| Invitations, blasts, or announcements are requested | Confirm the recipients or destination, content, timing, and authorization. Inspect the send record if the outcome of a send is uncertain. |
| The organizer view is unavailable | Use visible fields and dated evidence. Provide a local draft and identify what still needs a host-side check. |
| The event has a public stream and a separate interactive room | Check what signed-out visitors see and what approved guests can access before sharing the links. |

See Luma’s guidance for the available visibility settings and the effects of updating an event. [Event visibility](https://help.luma.com/p/setting-your-event-visibility) · [Updating event information](https://help.luma.com/p/updating-event-information)

## Data shape

The receipt is a human-readable record. It includes the check time and time zone, event link or ID and calendar, authorized fields and audience, attempted change, observed state, checks run, and what remains pending. Message receipts include the send or scheduling record and observed audience when available. Guest identities and private join links stay in the organizer’s tools.

The installed skill includes procedures for listing and admission, communications and feedback, and access and verification. [Skill files](https://github.com/ThatGuySam/skills/tree/main/skills/luma-event-ops)

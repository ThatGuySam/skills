# Inventory integration contract

Both operations are unavailable in this project. This contract preserves the source Actions for future authorized integration work; it does not install them. Adapter work is outside this migration.

Base URL from the source schema: `https://inventory.example.invalid/v1`. This synthetic address is not a verified live service.

| Operation | Request and effect | Success | Failure behavior |
| --- | --- | --- | --- |
| `getStock` | Read inventory with `GET /stock/{sku}`. The required `sku` path parameter is a string. | HTTP 200, JSON containing `sku` string and `available` integer. | HTTP 401 requires authentication. Do not invent availability when lookup is unavailable or fails. |
| `reserveStock` | Write a reservation with `POST /reservations`. The required JSON object contains `sku` string and `quantity` integer, minimum 1. Display this exact payload and obtain confirmation before sending. | HTTP 201, JSON containing `reservation_id` string. Require this confirmed response before claiming a reservation. | HTTP 401 requires authentication. HTTP 409 means stock changed; explain and request a new lookup. A timeout leaves the outcome unknown; never retry because it may have succeeded. |

The schema uses global API-key authentication named `inventoryKey`, passed in the `X-Inventory-Key` header. It specifies no OAuth scopes. No key or authentication configuration was supplied. A future integration must obtain credentials through a supported secret store or authentication flow. Never embed a key in these files or draft output.

For the current target, complete the draft fallback in SKILL.md. Do not contact the endpoint, prompt for an API key, or imply that confirmation supplies an integration.

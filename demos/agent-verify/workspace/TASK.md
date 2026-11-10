# Task (synthetic demo input)

This small project is invented for a skill demo.

Update `slugify` so that:
1. Accented letters become plain ASCII (`Café` -> `cafe`).
2. Runs of spaces or punctuation become a single dash.
3. The result never starts or ends with a dash.
4. Existing behavior for plain ASCII titles stays the same.

Run the tests with `node --test`.

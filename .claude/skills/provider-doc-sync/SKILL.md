# Provider Doc Sync Skill

## Purpose

Keep provider catalogs in `providers/*.js` synchronized with the latest public CLI documentation.

## Inputs

- Provider modules in `providers/`
- Documentation links from each provider's `reference` array

## Required Output

- Updated provider files when commands, flags, args, or slash commands drift from docs
- No schema or style regressions in provider exports

## Procedure

1. Read all provider files in `providers/`.
2. For each provider, collect `reference` URLs.
3. Fetch and inspect all referenced documentation pages.
4. Compare docs against provider sections:
   - `commands`
   - `flags`
   - `slashCommands`
5. Apply minimal edits only where drift is verified.
6. Preserve existing data shape and tone:
   - each item keeps `name`, `args`, `desc`, `detail`, `example`
   - maintain concise, practical examples
7. Avoid speculative additions:
   - do not add entries that are not clearly documented
   - remove entries only when docs clearly indicate deprecation/removal
8. Validate JavaScript syntax for changed files.

## Constraints

- Edit only files under `providers/` unless explicitly asked otherwise.
- Keep changes minimal and deterministic.
- Do not rename provider IDs or exported object keys.
- Preserve theme objects unless a docs-backed reason exists (normally none).

## Done Criteria

- Every provider file has been checked against its `reference` docs.
- Drift has been corrected in changed provider files.
- No syntax errors introduced.

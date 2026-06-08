Run the add-provider skill for this repository.

Args: {{args}}

Task:

1. Parse the args to extract the provider name and one or more documentation URLs.
   - If args is a plain string, treat the first word as the provider name and the rest as space-separated URLs.
   - If no args are provided, ask the user for the provider name and documentation links before proceeding.

2. Follow the add-provider SKILL.md procedure exactly:
   a. Read providers/template.js and at least one existing provider for reference.
   b. Fetch each documentation URL and extract commands, flags, and slash commands.
   c. Choose a brand-appropriate color theme.
   d. Write providers/<name>.js with the full provider export.
   e. Update tuai (import + PROVIDERS entry).
   f. Update README.md (Supported providers list, Data source list, Usage examples).
   g. Update docs/index.html (provider card in #providers grid).

3. After all edits, print a short summary:
   - Provider name and binary
   - Number of commands, flags, and slash commands added
   - Files changed

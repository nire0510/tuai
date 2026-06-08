Run the provider-doc-sync skill for this repository.

Task:

1. Inspect every provider file in providers/.
2. For each provider, use the URLs in its reference field to verify whether commands, flags, and slashCommands are current.
3. If drift is found, update only the affected provider file(s) with minimal edits.
4. Keep entry schema and style consistent with existing repository conventions.
5. Do not edit files outside providers/.

After edits:

- Ensure changed provider JavaScript files are syntactically valid.
- Print a short summary of what was updated and why.

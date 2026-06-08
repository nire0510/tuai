---
name: add-provider
description: Add a new provider to tuai. Accepts a provider name and documentation links, scaffolds the provider file from template, populates commands/flags/slashCommands by reading the docs, and updates tuai, README.md, and docs/index.html.
---

# Add Provider Skill

## Purpose

Scaffold and register a new provider in the tuai project end-to-end.

## Inputs

- Provider name (e.g. `gemini`)
- One or more documentation URLs to fetch commands, flags, and slash commands from

## Required Output

- `providers/<name>.js` — fully populated provider module
- `tuai` — import and registration added
- `README.md` — provider listed in the Supported providers section and in the Data source section
- `docs/index.html` — provider card added to the `#providers` grid

## Procedure

### 1. Gather context

1. Read `providers/template.js` to understand the required export shape.
2. Read one or two existing provider files (e.g. `providers/claude.js`, `providers/cursor.js`) to calibrate tone, entry verbosity, and field conventions:
   - `name` — command/flag/slash name exactly as typed
   - `args` — argument signature string, empty string if none
   - `desc` — one short sentence (no period)
   - `detail` — 1–3 sentences with usage context, available flags/subcommands, and behaviour notes
   - `example` — one or two realistic invocations, newline-separated if multiple

### 2. Fetch documentation

Fetch every provided documentation URL.
For each page:
- Extract all commands, flags (options), and slash commands the CLI supports.
- Map each entry to the provider schema above.
- Do not invent entries not found in the documentation.

**Handling subcommands:** When a command has subcommands (e.g., `claude auth` → `login`, `logout`, `status`), create **both** a parent entry and individual entries for each subcommand:

1. Parent entry — use the group name as `name`, describe it as a command group, list available subcommands in `detail`, and leave `args` empty. Example:
   ```js
   { name: 'claude auth', args: '', desc: 'Authentication commands', detail: 'Subcommand group for authentication. Subcommands: login, logout, status.', example: 'claude auth login\nclaude auth status' }
   ```

2. Subcommand entries — use the **full path** as `name` (e.g., `claude auth login`, not just `login`), describe the specific subcommand, and populate `args`, `detail`, and `example` for each. Example:
   ```js
   { name: 'claude auth login', args: '', desc: 'Sign in to your account', detail: '...', example: 'claude auth login' }
   ```

Subcommands at any depth follow the same rule — `claude mcp add` would have both a `claude mcp` entry and a `claude mcp add` entry. Check `providers/cursor.js` and `providers/claude.js` for reference implementations.

### 3. Choose a theme

Pick a cohesive color theme that reflects the provider's brand identity (website colors, logo palette). The theme object requires these keys — all RGB triples `[r, g, b]`:

```
bg, bgPanel, bgSelected, bgTooltip, bgHeader,
fgBase, fgDim, fgAccent, fgAccent2, fgSelected, fgHeader,
fgCmd, fgFlag, fgExample,
fgTooltipHd, fgTooltipBdy, fgTooltipEx,
fgSearch, fgBorder
```

Follow the same contrast conventions as existing providers:
- `bgSelected` / `bgHeader` — the brand's primary color
- `fgHeader` — dark text readable on `bgHeader`
- `fgSelected` — high contrast on `bgSelected` (usually white)
- dim/border colors should be muted versions of the primary

### 4. Create the provider file

Write `providers/<name>.js` using the template shape:

```js
const commands = [ /* ... */ ];
const flags = [ /* ... */ ];
const slashCommands = [ /* ... */ ];

const theme = { /* ... */ };

export default {
  id: '<name>',
  displayName: '<Human Name>',
  bin: '<cli-binary-name>',
  reference: [<doc urls>],
  commands,
  flags,
  slashCommands,
  theme,
};
```

### 5. Update `tuai`

In the `tuai` file:
1. Add an import after the last provider import:
   ```js
   import <name> from './providers/<name>.js';
   ```
2. Add the provider to the `PROVIDERS` object:
   ```js
   const PROVIDERS = { ..., <name> };
   ```

### 6. Update `README.md`

1. In the **Supported providers** list, append:
   ```
   - `<name>`
   ```
2. In the **Data source** list, append:
   ```
   - `providers/<name>.js`
   ```
3. In the **Usage** section (where launch examples live), add:
   ```bash
   tuai <name>
   ```

### 7. Update `docs/index.html`

Inside the `<div class="provider-grid">` in the `#providers` section, add a new card:

```html
<article>
  <h3><Human Name></h3>
  <p><One-sentence description of what the provider covers in tuai.></p>
</article>
```

Also update the hero `<p class="lead">` and the features section if the provider name appears explicitly in those sentences. Only touch those sentences if the new provider name fits naturally; otherwise leave them.

### 8. Validate

- Check that `providers/<name>.js` is syntactically valid JavaScript (no missing commas, unmatched brackets, etc.).
- Verify all four changed files are consistent: the same `id` used in the import, the PROVIDERS key, the README list, and the HTML card.

## Constraints

- Do not modify existing provider files.
- Do not alter the `tuai` TUI rendering logic — only touch imports and the `PROVIDERS` object.
- Keep `README.md` and `docs/index.html` edits minimal and in the style of surrounding content.
- Preserve existing formatting (indentation, blank lines) in all edited files.

## Done Criteria

- `providers/<name>.js` exists and exports a valid provider object with non-empty `commands` and/or `flags` arrays sourced from the documentation.
- `tuai` imports and registers the new provider.
- `README.md` lists the new provider in both relevant sections.
- `docs/index.html` contains a card for the new provider in the `#providers` grid.
- No syntax errors in changed files.

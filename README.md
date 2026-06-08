# tuai — One Command Palette for AI CLIs

`tuai` is a terminal UI helper for people who switch between multiple AI command-line tools.

Instead of memorizing different commands, flags, and slash commands per tool, run:

```bash
tuai <provider>
```

and browse everything in one searchable interface.

Supported providers:

- `claude`
- `cursor`
- `antigravity`
- `copilot`

## Features

- **Single bridge across providers** — same UX for different AI CLIs
- **Three tabs**: Commands · Flags · Slash `/` commands
- **Live search** — quickly filter by name or description
- **Tooltip details** — description, argument signature, and usage example
- **Command builder** — compose full commands without leaving the TUI
- **One-key execution** — run the built command instantly with `X`
- **Zero runtime dependencies** — pure Node.js built-ins only

## Requirements

- Node.js ≥ 22
- A *nix terminal with true-color support (most modern terminals: iTerm2, Alacritty, Ghostty, Wezterm, Kitty, Gnome Terminal, etc.)

## Install

### Global install (recommended)

From npm:

```bash
npm install -g @nire0510/tuai
```

From this repository folder:

```bash
npm install -g .
```

Verify install:

```bash
tuai claude
```

### Local run (no global install)

```bash
npx tuai claude
```

### Legacy symlink installer

If you prefer symlinking manually:

```bash
chmod +x install.sh
./install.sh
```

## Usage

Open a provider catalog:

```bash
tuai claude
```

You can also launch:

```bash
tuai cursor
tuai antigravity
tuai copilot
```

## Why tuai

If you use more than one AI CLI, context switching gets expensive:

- command names vary
- flags differ
- slash command sets are tool-specific

`tuai` gives you one place to discover what each tool supports, build commands confidently, and execute them fast.

## GitHub Pages

This repository includes a project website in `docs/`, deployed automatically via GitHub Actions.

- Workflow: `.github/workflows/pages.yml`
- Source: `docs/index.html` and `docs/styles.css`

After pushing to `main` or `master`, GitHub will publish the site from the workflow run.

## Quick workflow

1. Launch a provider (`tuai claude`, `tuai cursor`, `tuai copilot`, etc.).
2. Use `/` to search commands or flags.
3. Press `Enter` to append selected items to the command buffer.
4. Type any extra arguments.
5. Press `X` to run.

### Keyboard controls

| Key            | Action                                    |
|----------------|-------------------------------------------|
| `↑` / `↓`      | Navigate the list                         |
| `j` / `k`      | Vim-style up/down                         |
| `Tab`          | Switch to next tab (Commands → Flags → /) |
| `Shift+Tab`    | Switch to previous tab                    |
| `/`            | Enter search mode                         |
| `Esc`          | Exit search / clear command buffer        |
| `Enter`        | Append selected item to command buffer    |
| `X`            | Execute the command buffer                |
| `Backspace`    | Delete last char from command buffer      |
| `q` / `Ctrl+C` | Quit tuai                                 |

### Building commands

1. Select a command with `↑↓` → press `Enter` → it appears in the `$` buffer at the bottom.
2. Switch to **Flags** tab → navigate to a flag → press `Enter` → it's appended.
3. Type any literal arguments (e.g. a query string) directly.
4. Press `X` to execute.

## Data source

Provider data is loaded from:

- `providers/claude.js`
- `providers/cursor.js`
- `providers/antigravity.js`
- `providers/copilot.js`

## Provider Docs Auto-Sync Skill

This repository includes a Claude Code skill at `.claude/skills/provider-doc-sync/SKILL.md`.

The skill's purpose:

- read each provider file in `providers/`
- follow the URLs in each provider's `reference` field
- verify commands, flags, and slash commands are still aligned with current docs
- update provider files when drift is found

Automation workflow:

- `.github/workflows/provider-doc-sync.yml` runs weekly and on manual dispatch
- it executes Claude Code with the provider-doc-sync skill prompt
- if provider files changed, it opens a PR automatically

Required secret for automation:

- `CLAUDE_CODE_OAUTH_TOKEN` (generate with `claude setup-token`)

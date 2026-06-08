const commands = [
  {
    name: 'claude',
    args: '',
    desc: 'Start interactive session',
    detail: 'Opens a full interactive REPL session in the current directory. Claude reads your CLAUDE.md, loads MCP servers, hooks, and skills automatically.',
    example: 'claude'
  },
  {
    name: 'claude',
    args: '"<query>"',
    desc: 'Start interactive session with initial prompt',
    detail: 'Starts an interactive session and pre-fills Claude with the given prompt. Useful for jumping straight into a specific task.',
    example: 'claude "explain this project structure"'
  },
  {
    name: 'claude -p',
    args: '"<query>"',
    desc: 'One-shot query via SDK, then exit',
    detail: 'Non-interactive print mode. Runs the query, prints the response to stdout, and exits. The workhorse for scripting and CI/CD pipelines. Pipe input via stdin.',
    example: 'claude -p "explain config.yaml"\ncat logs.txt | claude -p "find errors"'
  },
  {
    name: 'claude -c',
    args: '',
    desc: 'Continue most recent conversation',
    detail: 'Resumes the last session in the current directory, preserving full context. Use -r for a specific session ID. Combine with -p for non-interactive continuation.',
    example: 'claude -c\nclaude -c -p "Check for type errors"'
  },
  {
    name: 'claude -r',
    args: '"<id>" "<q>"',
    desc: 'Resume session by ID or name',
    detail: 'Resumes a named or ID-keyed session from any directory. You can refer to sessions by the short hash shown in agent view or by a human-readable name.',
    example: 'claude -r "auth-refactor" "Finish this PR"'
  },
  {
    name: 'claude update',
    args: '',
    desc: 'Update to latest version',
    detail: 'Updates the Claude Code CLI to the latest stable release. Equivalent to npm install -g @anthropic-ai/claude-code@latest.',
    example: 'claude update'
  },
  {
    name: 'claude install',
    args: '[version]',
    desc: 'Install or reinstall native binary',
    detail: 'Installs or reinstalls the native binary. Accepts a semver like 2.1.118, or the keywords "stable" or "latest".',
    example: 'claude install stable\nclaude install 2.1.118'
  },
  {
    name: 'claude auth login',
    args: '',
    desc: 'Sign in to your Anthropic account',
    detail: 'Opens browser auth flow. Flags: --email to pre-fill email, --sso to force SSO, --console for API usage billing via Anthropic Console.',
    example: 'claude auth login\nclaude auth login --console'
  },
  {
    name: 'claude auth logout',
    args: '',
    desc: 'Log out from Anthropic account',
    detail: 'Clears the stored OAuth token and ends the authenticated session.',
    example: 'claude auth logout'
  },
  {
    name: 'claude auth status',
    args: '',
    desc: 'Show authentication status as JSON',
    detail: 'Prints auth state as JSON. Use --text for human-readable output. Exits 0 if logged in, 1 if not - useful in CI health checks.',
    example: 'claude auth status --text'
  },
  {
    name: 'claude agents',
    args: '',
    desc: 'Open agent view for background sessions',
    detail: 'Interactive dashboard to monitor and dispatch parallel background sessions. Flags: --cwd to filter by directory, --json to emit live sessions as JSON array, --permission-mode/--model/--effort to set defaults.',
    example: 'claude agents\nclaude agents --json'
  },
  {
    name: 'claude attach',
    args: '<id>',
    desc: 'Attach terminal to a background session',
    detail: 'Connects your current terminal to a running background session, giving you interactive control.',
    example: 'claude attach 7c5dcf5d'
  },
  {
    name: 'claude auto-mode defaults',
    args: '',
    desc: 'Print built-in auto-mode classifier rules',
    detail: 'Outputs the built-in auto-mode permission classifier rules (environment, allow, soft_deny, hard_deny) as JSON. Use "auto-mode config" to see effective config with your settings applied on top.',
    example: 'claude auto-mode defaults > rules.json'
  },
  {
    name: 'claude auto-mode config',
    args: '',
    desc: 'Show effective auto-mode config with your settings applied',
    detail: 'Prints what the auto-mode classifier actually uses as JSON, with your settings applied where set and built-in defaults otherwise. "$defaults" is expanded in place. Run after saving settings to confirm the effective rules.',
    example: 'claude auto-mode config'
  },
  {
    name: 'claude auto-mode critique',
    args: '',
    desc: 'Get AI feedback on your custom auto-mode rules',
    detail: 'Reviews your custom allow, soft_deny, and hard_deny rules and flags entries that are ambiguous, redundant, or likely to cause false positives.',
    example: 'claude auto-mode critique'
  },
  {
    name: 'claude daemon status',
    args: '',
    desc: 'Print supervisor process state',
    detail: 'Shows the background session supervisor\'s state, version, socket directory, and worker count. Exits 1 if supervisor is not running.',
    example: 'claude daemon status'
  },
  {
    name: 'claude daemon stop',
    args: '',
    desc: 'Stop background session supervisor',
    detail: 'Stops the supervisor and the sessions it hosts. Use --keep-workers to leave sessions running so the next supervisor reconnects. --any confirms stopping an on-demand supervisor.',
    example: 'claude daemon stop --any --keep-workers'
  },
  {
    name: 'claude logs',
    args: '<id>',
    desc: 'Print output from a background session',
    detail: 'Tails recent stdout output from the specified background session without attaching interactively.',
    example: 'claude logs 7c5dcf5d'
  },
  {
    name: 'claude mcp',
    args: '',
    desc: 'Configure MCP servers',
    detail: 'Subcommand group for managing Model Context Protocol servers. Use "mcp add" for guided setup, "mcp list" to see servers, "mcp remove" to delete one.',
    example: 'claude mcp add\nclaude mcp list'
  },
  {
    name: 'claude mcp add',
    args: '[options] <name> [-- <cmd> [args...]]',
    desc: 'Add an MCP server',
    detail: 'Add an MCP server by transport type. Use --transport http|sse|stdio (default: stdio). Use --scope local|project|user to control where it is saved. Use --env KEY=value for environment variables. For stdio servers, separate server args with --.',
    example: 'claude mcp add --transport http notion https://mcp.notion.com/mcp\nclaude mcp add --transport stdio airtable -- npx -y airtable-mcp-server'
  },
  {
    name: 'claude mcp add-json',
    args: '<name> \'<json>\'',
    desc: 'Add an MCP server from a JSON config string',
    detail: 'Add an MCP server by passing its full configuration as a JSON string. Useful for WebSocket servers and complex configs that the --transport flag does not cover.',
    example: 'claude mcp add-json weather-api \'{"type":"http","url":"https://api.weather.com/mcp"}\''
  },
  {
    name: 'claude mcp list',
    args: '',
    desc: 'List configured MCP servers',
    detail: 'Prints all configured MCP servers and their status. Servers awaiting approval from .mcp.json appear as "Pending approval".',
    example: 'claude mcp list'
  },
  {
    name: 'claude mcp get',
    args: '<name>',
    desc: 'Get details for one MCP server',
    detail: 'Shows the full configuration and current status of a specific MCP server. Pending and rejected project-scoped servers are also shown.',
    example: 'claude mcp get github'
  },
  {
    name: 'claude mcp remove',
    args: '<name>',
    desc: 'Remove an MCP server',
    detail: 'Deletes the named MCP server from configuration. Use --scope to target the correct scope when the same name exists in multiple scopes.',
    example: 'claude mcp remove github'
  },
  {
    name: 'claude mcp serve',
    args: '',
    desc: 'Start Claude Code as a stdio MCP server',
    detail: 'Exposes Claude Code itself as an MCP server over stdio. Use this to connect Claude Code as a tool inside Claude Desktop or other MCP clients.',
    example: 'claude mcp serve'
  },
  {
    name: 'claude plugin',
    args: '',
    desc: 'Manage Claude Code plugins',
    detail: 'Install, remove, and list plugins from the official marketplace or custom registries. Alias: "claude plugins". Run with no argument to open the interactive plugin menu.',
    example: 'claude plugin install code-review@claude-plugins-official'
  },
  {
    name: 'claude plugin install',
    args: '<plugin> [options]',
    desc: 'Install a plugin from a marketplace',
    detail: 'Install a plugin by name, optionally qualified as "name@marketplace". Use --scope user|project|local to control where it is installed (default: user).',
    example: 'claude plugin install code-review@claude-plugins-official\nclaude plugin install formatter@my-marketplace --scope project'
  },
  {
    name: 'claude plugin uninstall',
    args: '<plugin> [options]',
    desc: 'Uninstall a plugin',
    detail: 'Remove an installed plugin. Aliases: remove, rm. Use --keep-data to preserve the plugin\'s persistent data directory. Use --prune to also remove auto-installed dependencies.',
    example: 'claude plugin uninstall formatter@my-marketplace\nclaude plugin remove my-tool --keep-data'
  },
  {
    name: 'claude plugin list',
    args: '[options]',
    desc: 'List installed plugins',
    detail: 'Prints installed plugins with their version, source marketplace, and enable status. Use --json for machine-readable output, --available to also show plugins available from marketplaces.',
    example: 'claude plugin list\nclaude plugin list --json'
  },
  {
    name: 'claude plugin enable',
    args: '<plugin> [options]',
    desc: 'Enable a disabled plugin',
    detail: 'Enable a plugin that was previously disabled. Also enables any declared dependencies transitively. Use --scope to target the correct scope.',
    example: 'claude plugin enable my-tool@my-marketplace'
  },
  {
    name: 'claude plugin disable',
    args: '<plugin> [options]',
    desc: 'Disable a plugin without uninstalling it',
    detail: 'Disable a plugin so it no longer loads, without removing it. Fails if another enabled plugin depends on it. Use --scope to target the correct scope.',
    example: 'claude plugin disable my-tool@my-marketplace'
  },
  {
    name: 'claude project purge',
    args: '[path]',
    desc: 'Delete all local project state',
    detail: 'Removes transcripts, task lists, debug logs, file-edit history, and prompt history for a project. Omit path for interactive picker. Flags: --dry-run, -y/--yes, --all.',
    example: 'claude project purge ~/work/repo --dry-run'
  },
  {
    name: 'claude remote-control',
    args: '',
    desc: 'Start Remote Control server',
    detail: 'Starts a server so Claude.ai or the mobile app can control this Claude Code instance. Runs in server mode (no local interactive session).',
    example: 'claude remote-control --name "My Project"'
  },
  {
    name: 'claude respawn',
    args: '<id>',
    desc: 'Restart a background session',
    detail: 'Restarts a running or stopped background session with its conversation context intact. Use --all to restart every running session.',
    example: 'claude respawn 7c5dcf5d\nclaude respawn --all'
  },
  {
    name: 'claude rm',
    args: '<id>',
    desc: 'Remove a background session from list',
    detail: 'Removes the session from the agent view list. The transcript stays on disk, still accessible via --resume.',
    example: 'claude rm 7c5dcf5d'
  },
  {
    name: 'claude setup-token',
    args: '',
    desc: 'Generate long-lived OAuth token for CI',
    detail: 'Generates a long-lived OAuth token for use in CI scripts and automation. Prints the token to terminal without saving it. Requires a Claude subscription.',
    example: 'claude setup-token'
  },
  {
    name: 'claude stop',
    args: '<id>',
    desc: 'Stop a background session',
    detail: 'Gracefully stops the specified background session. Also accepted as "claude kill <id>".',
    example: 'claude stop 7c5dcf5d'
  },
  {
    name: 'claude ultrareview',
    args: '[target]',
    desc: 'Run ultrareview non-interactively',
    detail: 'Runs the ultrareview deep-analysis tool on a PR or codebase. Prints findings to stdout. Exits 0 on success, 1 on failure. Flags: --json for raw payload, --timeout <min>.',
    example: 'claude ultrareview 1234 --json'
  },
];

const flags = [
  {
    name: '--add-dir',
    args: '<path...>',
    desc: 'Add extra working directories',
    detail: 'Grants Claude read/edit access to additional directories beyond cwd. Validates each path. To persist across sessions, set permissions.additionalDirectories in settings.',
    example: 'claude --add-dir ../apps ../lib'
  },
  {
    name: '--agent',
    args: '<name>',
    desc: 'Specify agent for this session',
    detail: 'Overrides the "agent" setting in settings.json for this session only.',
    example: 'claude --agent my-custom-agent'
  },
  {
    name: '--agents',
    args: '<json>',
    desc: 'Define subagents dynamically via JSON',
    detail: 'Pass a JSON object defining custom subagents inline. Uses same frontmatter fields as .claude/agents/, plus a "prompt" field for the agent\'s instructions.',
    example: 'claude --agents \'{"reviewer":{"description":"Reviews code","prompt":"You are a code reviewer"}}\''
  },
  {
    name: '--allow-dangerously-skip-permissions',
    args: '',
    desc: 'Add bypassPermissions to Shift+Tab cycle',
    detail: 'Adds bypassPermissions to the permission mode cycle (Shift+Tab) without starting in it. Allows switching to it later during a session.',
    example: 'claude --permission-mode plan --allow-dangerously-skip-permissions'
  },
  {
    name: '--allowedTools',
    args: '<tools...>',
    desc: 'Tools that run without permission prompt',
    detail: 'Specify tools that execute without prompting. Supports pattern syntax like Bash(git log *). For restricting available tools, use --tools instead.',
    example: '"Bash(git log *)" "Bash(git diff *)" "Read"'
  },
  {
    name: '--append-system-prompt',
    args: '<text>',
    desc: 'Append text to default system prompt',
    detail: 'Adds custom instructions to the end of Claude\'s default system prompt. The safe choice for customization - preserves default capabilities.',
    example: 'claude --append-system-prompt "Always use TypeScript"'
  },
  {
    name: '--append-system-prompt-file',
    args: '<file>',
    desc: 'Append system prompt from file',
    detail: 'Loads additional system prompt text from a file and appends it to the default prompt. Use with large instruction sets that do not fit on the command line.',
    example: 'claude --append-system-prompt-file ./extra-rules.txt'
  },
  {
    name: '--bare',
    args: '',
    desc: 'Minimal mode: skip auto-discovery',
    detail: 'Skips auto-discovery of hooks, skills, plugins, MCP servers, auto memory, and CLAUDE.md for faster scripted calls. Claude retains Bash, file read, and file edit tools. Sets CLAUDE_CODE_SIMPLE.',
    example: 'claude --bare -p "query"'
  },
  {
    name: '--betas',
    args: '<headers...>',
    desc: 'Beta headers for API requests',
    detail: 'Include experimental API beta headers. Only available with API key authentication (not subscription).',
    example: 'claude --betas interleaved-thinking'
  },
  {
    name: '--bg',
    args: '',
    desc: 'Start as background session',
    detail: 'Launches the session as a background agent and returns immediately. Prints the session ID and management commands. Combine with --exec for shell background jobs or --agent for a subagent.',
    example: 'claude --bg "investigate the flaky test"'
  },
  {
    name: '--chrome',
    args: '',
    desc: 'Enable Chrome browser integration',
    detail: 'Enables the Chrome browser integration for web automation, testing, and screenshot tasks.',
    example: 'claude --chrome'
  },
  {
    name: '--cwd',
    args: '<path>',
    desc: 'Override working directory',
    detail: 'Sets the working directory for the session. Useful when launching Claude from a different location than the project root.',
    example: 'claude --cwd /path/to/project'
  },
  {
    name: '--dangerously-skip-permissions',
    args: '',
    desc: 'Skip all permission prompts (DANGEROUS)',
    detail: 'Bypasses ALL permission prompts. Only use in isolated/sandboxed CI environments. Never use on developer machines with important data.',
    example: 'claude --dangerously-skip-permissions -p "query"'
  },
  {
    name: '--debug',
    args: '',
    desc: 'Enable debug/verbose logging',
    detail: 'Prints detailed internal logging to stderr. Useful for diagnosing MCP connection issues, hook failures, or unexpected behavior.',
    example: 'claude --debug'
  },
  {
    name: '--effort',
    args: '<level>',
    desc: 'Set reasoning effort level',
    detail: 'Controls the extended thinking budget. Levels: low, medium, high, xhigh, max. Higher effort increases quality and cost.',
    example: 'claude --effort high "architect this service"'
  },
  {
    name: '--exec',
    args: '<cmd>',
    desc: 'Run shell command as background job',
    detail: 'When combined with --bg, runs a shell command as a managed background job instead of a Claude session.',
    example: 'claude --bg --exec "npm test"'
  },
  {
    name: '--from-pr',
    args: '<pr>',
    desc: 'Resume session linked to a PR',
    detail: 'Directly resumes a session linked to the specified GitHub Pull Request. Requires GitHub MCP integration.',
    example: 'claude -c --from-pr 456'
  },
  {
    name: '--max-turns',
    args: '<n>',
    desc: 'Limit agentic turns in a session',
    detail: 'Caps the number of agentic turns (tool call rounds) before Claude stops. Useful for cost control in automated scripts.',
    example: 'claude -p "review" --max-turns 5'
  },
  {
    name: '--mcp-config',
    args: '<file>',
    desc: 'Load MCP config from file',
    detail: 'Points Claude at an alternate MCP configuration JSON file instead of the default ~/.claude/mcp.json.',
    example: 'claude --mcp-config ./custom-mcp.json'
  },
  {
    name: '--model',
    args: '<model>',
    desc: 'Select model for this session',
    detail: 'Overrides the default model. Common values: claude-sonnet-4-6 (default), claude-opus-4-6, claude-haiku-4-5. Affects cost and quality.',
    example: 'claude --model claude-opus-4-6'
  },
  {
    name: '--output-format',
    args: '<format>',
    desc: 'Set output format (print mode only)',
    detail: 'Controls output format in -p mode. Options: text (default), json. JSON output includes cost, duration, turn count, and structured content - essential for CI monitoring.',
    example: 'claude -p "list endpoints" --output-format json'
  },
  {
    name: '--permission-mode',
    args: '<mode>',
    desc: 'Set permission enforcement mode',
    detail: 'Modes: default (prompt for all), acceptEdits (auto-accept file edits), auto (smart auto-classification), bypassPermissions (skip all - DANGEROUS). Use auto or acceptEdits for semi-automated runs.',
    example: 'claude --permission-mode acceptEdits'
  },
  {
    name: '--plugin-dir',
    args: '<path>',
    desc: 'Load plugins from a custom directory',
    detail: 'Points Claude at a custom plugin directory instead of or in addition to the default ~/.claude/plugins/.',
    example: 'claude --plugin-dir ./my-plugins'
  },
  {
    name: '--print / -p',
    args: '"<query>"',
    desc: 'Non-interactive print mode',
    detail: 'The foundational scripting flag. Runs the query, prints response to stdout, exits. Combine with --output-format json for structured data, pipe stdin for context.',
    example: 'claude -p "summarize"\ncat file | claude -p "analyze"'
  },
  {
    name: '--resume / -r',
    args: '<id>',
    desc: 'Resume session by ID or name',
    detail: 'Resumes a specific session by its short hash ID or human-readable name. Works across directories.',
    example: 'claude -r "auth-refactor" "Continue"'
  },
  {
    name: '--session-id',
    args: '<id>',
    desc: 'Set explicit session ID',
    detail: 'Assigns a custom session identifier. Useful for multi-step workflows where you need stable session references.',
    example: 'claude --session-id my-review-session'
  },
  {
    name: '--settings',
    args: '<file>',
    desc: 'Load settings from alternate file',
    detail: 'Overrides the default settings.json path. Useful for project-specific or CI-specific configuration profiles.',
    example: 'claude --settings ./ci-settings.json'
  },
  {
    name: '--system-prompt',
    args: '<text>',
    desc: 'Replace default system prompt entirely',
    detail: 'Replaces Claude\'s entire default system prompt. Use with care - removes all default instructions. Cannot be combined with --system-prompt-file.',
    example: 'claude --system-prompt "You are a strict code reviewer"'
  },
  {
    name: '--system-prompt-file',
    args: '<file>',
    desc: 'Replace system prompt from file',
    detail: 'Loads a complete replacement system prompt from a file. Mutually exclusive with --system-prompt. Both replacement flags can be combined with append flags.',
    example: 'claude --system-prompt-file ./my-prompt.txt'
  },
  {
    name: '--tools',
    args: '<tools...>',
    desc: 'Restrict which tools are available',
    detail: 'Limits Claude to only the specified tools. Use to sandbox capabilities. Different from --allowedTools which controls prompting, not availability.',
    example: 'claude --tools Read Bash'
  },
  {
    name: '--verbose',
    args: '',
    desc: 'Verbose output mode',
    detail: 'Enables verbose output, showing more internal detail about tool calls, file reads, and decision steps.',
    example: 'claude --verbose'
  },
  {
    name: '--worktree',
    args: '',
    desc: 'Work in isolated git worktree',
    detail: 'Creates or attaches to an isolated git worktree for the session. Keeps changes isolated from your main working tree until explicitly merged.',
    example: 'claude --worktree "refactor auth module"'
  },
  {
    name: '--version',
    args: '',
    desc: 'Print Claude Code version',
    detail: 'Prints the installed Claude Code version string to stdout and exits.',
    example: 'claude --version'
  },
  {
    name: '--help',
    args: '',
    desc: 'Show help (partial - not all flags listed)',
    detail: 'Displays built-in help text. Note: --help does NOT list every available flag. A flag\'s absence from --help does not mean it is unavailable.',
    example: 'claude --help'
  },
];

const slashCommands = [
  {
    name: '/compact',
    desc: 'Compact conversation to save context',
    detail: 'Summarizes the conversation history to reduce token usage, preserving key context while freeing window space.',
    example: '/compact'
  },
  {
    name: '/clear',
    desc: 'Clear conversation history',
    detail: 'Wipes the current conversation history. Claude starts fresh but retains CLAUDE.md and skill context.',
    example: '/clear'
  },
  {
    name: '/plan',
    desc: 'Enter plan mode',
    detail: 'Switches to plan-only mode: Claude describes what it would do without executing. Useful for review before committing to changes.',
    example: '/plan'
  },
  {
    name: '/fast',
    desc: 'Switch to fast/Haiku model',
    detail: 'Switches the current session to a faster, cheaper model (claude-haiku). Good for simple tasks mid-session.',
    example: '/fast'
  },
  {
    name: '/diff',
    desc: 'Show pending file changes as diff',
    detail: 'Outputs a unified diff of all files Claude has modified in the current session.',
    example: '/diff'
  },
  {
    name: '/color',
    desc: 'Toggle syntax highlighting',
    detail: 'Toggles colored syntax highlighting on or off for code blocks in Claude\'s responses.',
    example: '/color'
  },
  {
    name: '/voice',
    desc: 'Enable voice input mode',
    detail: 'Activates microphone input so you can dictate prompts to Claude instead of typing.',
    example: '/voice'
  },
  {
    name: '/effort',
    desc: 'Set reasoning effort level',
    detail: 'Changes the extended thinking budget mid-session. Levels: low, medium, high, xhigh, max.',
    example: '/effort high'
  },
  {
    name: '/batch',
    desc: 'Run batch operations (skill)',
    detail: 'Bundled skill for running multiple tasks in batch. Useful for processing lists of files or items.',
    example: '/batch'
  },
  {
    name: '/debug',
    desc: 'Enable debug mode (skill)',
    detail: 'Activates the bundled debug skill for systematic issue diagnosis workflows.',
    example: '/debug'
  },
  {
    name: '/simplify',
    desc: 'Simplify code or content (skill)',
    detail: 'Bundled skill that refactors code or content for simplicity and readability.',
    example: '/simplify'
  },
  {
    name: '/loop',
    desc: 'Run in a loop until done (skill)',
    detail: 'Bundled skill for repeating an operation until a condition is met or Claude determines completion.',
    example: '/loop'
  },
  {
    name: '/model',
    desc: 'Switch model mid-session',
    detail: 'Opens model picker to switch between available Claude models without restarting the session.',
    example: '/model'
  },
  {
    name: '/help',
    desc: 'Show in-session help',
    detail: 'Shows a list of available slash commands and keyboard shortcuts within the active session.',
    example: '/help'
  },
  {
    name: '/exit',
    desc: 'Exit the session',
    detail: 'Gracefully ends the Claude Code interactive session.',
    example: '/exit'
  },
];

// Anthropic / Claude brand — warm coral-orange on dark warm backgrounds
// Primary: #D46E46 (coral orange), inspired by claude.ai's brand identity
const theme = {
  bg: [22, 14, 10],   // very dark warm brown
  bgPanel: [32, 20, 14],   // dark warm panel
  bgSelected: [209, 110, 70],  // Claude coral-orange
  bgTooltip: [28, 17, 12],   // dark warm tooltip
  bgHeader: [209, 110, 70],  // Claude coral-orange header
  fgBase: [240, 220, 200],  // warm white
  fgDim: [130, 100, 80],  // muted warm brown
  fgAccent: [230, 130, 80],  // warm orange accent
  fgAccent2: [255, 175, 100],  // lighter warm orange
  fgSelected: [255, 255, 255],  // white on selection
  fgHeader: [30, 15, 8],  // very dark text on orange header
  fgCmd: [240, 155, 90],  // orange-warm command
  fgFlag: [210, 140, 95],  // warm flag color
  fgExample: [255, 200, 110],  // warm golden example
  fgTooltipHd: [230, 130, 80],
  fgTooltipBdy: [215, 195, 175],
  fgTooltipEx: [255, 200, 110],
  fgSearch: [255, 215, 80],  // warm yellow search highlight
  fgBorder: [80, 50, 35],  // dark warm border
};

export default {
  id: 'claude',
  displayName: 'Claude Code',
  bin: 'claude',
  reference: [
    'https://code.claude.com/docs/en/cli-reference',
    'https://code.claude.com/docs/en/commands',
  ],
  commands,
  flags,
  slashCommands,
  theme,
};

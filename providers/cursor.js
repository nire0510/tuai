const commands = [
  {
    name: 'agent',
    args: '[prompt]',
    desc: 'Start interactive agent session (default mode)',
    detail: 'Starts Cursor Agent in interactive mode. If a prompt is provided, it is used as the initial message. Agent mode is the default when no --mode is specified.',
    example: 'agent\nagent "implement OAuth login flow"'
  },
  {
    name: 'agent agent',
    args: '[prompt]',
    desc: 'Explicitly start in agent mode',
    detail: 'Equivalent to running agent without a subcommand. Useful in scripts where explicit subcommand usage is preferred.',
    example: 'agent agent "review this codebase"'
  },
  {
    name: 'agent login',
    args: '',
    desc: 'Authenticate with Cursor',
    detail: 'Opens browser-based authentication flow and stores credentials locally. Recommended for interactive developer usage.',
    example: 'agent login'
  },
  {
    name: 'agent logout',
    args: '',
    desc: 'Sign out and clear local authentication',
    detail: 'Clears locally stored authentication tokens and signs the CLI out from your Cursor account.',
    example: 'agent logout'
  },
  {
    name: 'agent status',
    args: '',
    desc: 'Show authentication status (whoami)',
    detail: 'Displays whether authentication is active, account information, and endpoint configuration.',
    example: 'agent status'
  },
  {
    name: 'agent about',
    args: '',
    desc: 'Show environment and account details',
    detail: 'Prints version, platform/system information, and account/runtime details for diagnostics.',
    example: 'agent about'
  },
  {
    name: 'agent models',
    args: '',
    desc: 'List available models',
    detail: 'Prints all models available to the current account/workspace.',
    example: 'agent models'
  },
  {
    name: 'agent mcp',
    args: '',
    desc: 'Manage MCP servers',
    detail: 'Parent command for managing configured MCP servers and inspecting available MCP tools.',
    example: 'agent mcp list\nagent mcp list-tools github'
  },
  {
    name: 'agent mcp login',
    args: '<identifier>',
    desc: 'Authenticate with an MCP server',
    detail: 'Authenticates with an MCP server configured in .cursor/mcp.json by server identifier.',
    example: 'agent mcp login github'
  },
  {
    name: 'agent mcp list',
    args: '',
    desc: 'List MCP servers and status',
    detail: 'Shows configured MCP servers and whether each one is enabled and reachable.',
    example: 'agent mcp list'
  },
  {
    name: 'agent mcp list-tools',
    args: '<identifier>',
    desc: 'List tools for one MCP server',
    detail: 'Prints available tools and argument names for the specified MCP server.',
    example: 'agent mcp list-tools github'
  },
  {
    name: 'agent mcp enable',
    args: '<identifier>',
    desc: 'Enable an MCP server',
    detail: 'Enables a configured MCP server so its tools can be used by Agent.',
    example: 'agent mcp enable github'
  },
  {
    name: 'agent mcp disable',
    args: '<identifier>',
    desc: 'Disable an MCP server',
    detail: 'Disables a configured MCP server without removing its configuration.',
    example: 'agent mcp disable github'
  },
  {
    name: 'agent acp',
    args: '',
    desc: 'Start ACP server mode (advanced)',
    detail: 'Starts ACP server mode for advanced integrations and custom ACP clients. Hidden from normal help output.',
    example: 'agent acp'
  },
  {
    name: 'agent update',
    args: '',
    desc: 'Update Cursor Agent',
    detail: 'Updates Cursor Agent to the latest available version.',
    example: 'agent update'
  },
  {
    name: 'agent ls',
    args: '',
    desc: 'List previous chat sessions',
    detail: 'Lists recent/previous chat sessions so you can inspect and resume them.',
    example: 'agent ls'
  },
  {
    name: 'agent resume',
    args: '[chatId]',
    desc: 'Resume a previous chat session',
    detail: 'Resumes the latest chat by default, or a specific session when chatId is provided.',
    example: 'agent resume\nagent resume 3f2d1c9a'
  },
  {
    name: 'agent create-chat',
    args: '',
    desc: 'Create a new empty chat and print its ID',
    detail: 'Creates a new empty chat programmatically and returns the generated chat identifier.',
    example: 'agent create-chat'
  },
  {
    name: 'agent generate-rule',
    args: '',
    desc: 'Generate a Cursor rule interactively',
    detail: 'Interactive helper to create a new Cursor rule. Alias: rule.',
    example: 'agent generate-rule'
  },
  {
    name: 'agent rule',
    args: '',
    desc: 'Alias for generate-rule',
    detail: 'Alias command for rule generation workflow.',
    example: 'agent rule'
  },
  {
    name: 'agent install-shell-integration',
    args: '',
    desc: 'Install shell integration',
    detail: 'Installs Cursor Agent shell integration into ~/.zshrc for richer terminal workflow support.',
    example: 'agent install-shell-integration'
  },
  {
    name: 'agent uninstall-shell-integration',
    args: '',
    desc: 'Uninstall shell integration',
    detail: 'Removes Cursor Agent shell integration from ~/.zshrc.',
    example: 'agent uninstall-shell-integration'
  },
  {
    name: 'agent help',
    args: '[command]',
    desc: 'Show help for a command',
    detail: 'Displays command-specific help text. Also available globally via -h/--help.',
    example: 'agent help\nagent help mcp'
  },
];

const flags = [
  {
    name: '-v, --version',
    args: '',
    desc: 'Show version',
    detail: 'Outputs the installed Cursor Agent CLI version and exits.',
    example: 'agent --version'
  },
  {
    name: '--api-key',
    args: '<key>',
    desc: 'Set API key for authentication',
    detail: 'Supplies a Cursor API key directly. Equivalent environment variable: CURSOR_API_KEY.',
    example: 'agent --api-key "$CURSOR_API_KEY" "summarize this file"'
  },
  {
    name: '-H, --header',
    args: '"Name: Value"',
    desc: 'Add custom request header',
    detail: 'Adds a custom header to agent requests. Can be provided multiple times.',
    example: 'agent -H "X-Trace-Id: abc123" -H "X-Team: platform" "analyze logs"'
  },
  {
    name: '-p, --print',
    args: '',
    desc: 'Non-interactive print mode',
    detail: 'Runs in non-interactive mode and prints the response to stdout, useful for scripting and CI.',
    example: 'agent -p "list todos in this repo"'
  },
  {
    name: '--output-format',
    args: '<text|json|stream-json>',
    desc: 'Output format for --print',
    detail: 'Controls response format in print mode. Supports text, json, or stream-json.',
    example: 'agent -p "list endpoints" --output-format json'
  },
  {
    name: '--stream-partial-output',
    args: '',
    desc: 'Stream partial deltas',
    detail: 'Streams incremental text deltas. Only works with --print and --output-format stream-json.',
    example: 'agent -p "write release notes" --output-format stream-json --stream-partial-output'
  },
  {
    name: '--resume',
    args: '[chatId]',
    desc: 'Resume chat session',
    detail: 'Resumes a chat session by ID, or latest when used without an explicit chatId.',
    example: 'agent --resume\nagent --resume 3f2d1c9a'
  },
  {
    name: '--continue',
    args: '',
    desc: 'Continue previous session',
    detail: 'Alias for --resume=-1 to continue the most recent session quickly.',
    example: 'agent --continue'
  },
  {
    name: '--model',
    args: '<model>',
    desc: 'Select model',
    detail: 'Overrides the model used for this run/session.',
    example: 'agent --model gpt-5.2 "explain this architecture"'
  },
  {
    name: '--mode',
    args: '<agent|plan|ask>',
    desc: 'Set run mode',
    detail: 'Sets interaction mode. plan gives planning-only flow, ask is read-oriented exploration, agent is default full mode.',
    example: 'agent --mode plan "refactor auth service"'
  },
  {
    name: '--plan',
    args: '',
    desc: 'Shorthand for --mode=plan',
    detail: 'Starts directly in plan mode.',
    example: 'agent --plan "migration strategy"'
  },
  {
    name: '--list-models',
    args: '',
    desc: 'List available models',
    detail: 'Prints available models without entering an interactive session.',
    example: 'agent --list-models'
  },
  {
    name: '-f, --force',
    args: '',
    desc: 'Auto-allow commands unless denied',
    detail: 'Forces allow behavior for actions except those explicitly denied by permissions.',
    example: 'agent -f -p "fix lints in src"'
  },
  {
    name: '--yolo',
    args: '',
    desc: 'Alias for --force',
    detail: 'Equivalent to --force.',
    example: 'agent --yolo "apply formatting"'
  },
  {
    name: '--sandbox',
    args: '<enabled|disabled>',
    desc: 'Set sandbox mode',
    detail: 'Controls whether sandbox restrictions are enabled for command/tool execution.',
    example: 'agent --sandbox enabled "inspect repo"'
  },
  {
    name: '--approve-mcps',
    args: '',
    desc: 'Auto-approve MCP servers',
    detail: 'Automatically approves all MCP servers for the session.',
    example: 'agent --approve-mcps "list connected MCP tools"'
  },
  {
    name: '--trust',
    args: '',
    desc: 'Trust workspace (headless mode)',
    detail: 'Trusts the workspace without prompting, intended for headless automation runs.',
    example: 'agent --trust -p "summarize changes"'
  },
  {
    name: '--workspace',
    args: '<path>',
    desc: 'Set workspace path',
    detail: 'Uses the specified directory as workspace instead of current working directory.',
    example: 'agent --workspace /path/to/repo "review package scripts"'
  },
  {
    name: '--plugin-dir',
    args: '<path>',
    desc: 'Load local plugin directory',
    detail: 'Loads one plugin directory. Can be passed multiple times to load multiple plugin roots.',
    example: 'agent --plugin-dir ./plugins --plugin-dir ../shared-plugins'
  },
  {
    name: '--worktree',
    args: '',
    desc: 'Run in a new Git worktree',
    detail: 'Creates/uses an isolated Git worktree under ~/.cursor/worktrees for safer task isolation.',
    example: 'agent --worktree "investigate flaky tests"'
  },
  {
    name: '--endpoint',
    args: '<url>',
    desc: 'Use custom API endpoint',
    detail: 'Overrides the default Cursor API endpoint (commonly used in enterprise/self-hosted setups).',
    example: 'agent --endpoint https://your-endpoint.example.com "status"'
  },
  {
    name: '--insecure',
    args: '',
    desc: 'Disable TLS verification (development only)',
    detail: 'Bypasses TLS certificate validation. Use only in controlled development environments.',
    example: 'agent --insecure status'
  },
  {
    name: '-h, --help',
    args: '',
    desc: 'Show help',
    detail: 'Displays help for the current command or subcommand.',
    example: 'agent --help\nagent mcp --help'
  },
];

const slashCommands = [
  {
    name: '/plan',
    args: '',
    desc: 'Switch to Plan mode',
    detail: 'Switches the conversation to planning mode before implementation.',
    example: '/plan'
  },
  {
    name: '/ask',
    args: '',
    desc: 'Switch to Ask mode',
    detail: 'Switches to read-only exploration mode.',
    example: '/ask'
  },
  {
    name: '/model',
    args: '<model>',
    desc: 'Set or list models',
    detail: 'Lists available models or switches to a specified model.',
    example: '/model\n/model gpt-5.2'
  },
  {
    name: '/auto-run',
    args: '[on|off|status]',
    desc: 'Toggle or inspect auto-run',
    detail: 'Toggles auto-run behavior or sets/checks explicit state.',
    example: '/auto-run\n/auto-run off'
  },
  {
    name: '/sandbox',
    args: '',
    desc: 'Configure sandbox and network access',
    detail: 'Opens sandbox-related configuration flow in session.',
    example: '/sandbox'
  },
  {
    name: '/max-mode',
    args: '[on|off]',
    desc: 'Toggle max mode',
    detail: 'Toggles max mode on models that support it.',
    example: '/max-mode on'
  },
  {
    name: '/new-chat',
    args: '',
    desc: 'Start a new chat',
    detail: 'Creates and switches to a fresh chat session.',
    example: '/new-chat'
  },
  {
    name: '/vim',
    args: '',
    desc: 'Toggle Vim keybindings',
    detail: 'Enables or disables Vim keys inside the CLI.',
    example: '/vim'
  },
  {
    name: '/help',
    args: '[command]',
    desc: 'Show slash command help',
    detail: 'Shows slash command help, optionally for a specific command.',
    example: '/help\n/help model'
  },
  {
    name: '/feedback',
    args: '<message>',
    desc: 'Send feedback to Cursor team',
    detail: 'Submits a feedback message directly from the CLI session.',
    example: '/feedback Better diagnostics for MCP errors'
  },
  {
    name: '/resume',
    args: '<chat>',
    desc: 'Resume chat by folder/session name',
    detail: 'Resumes a previous chat using its folder/session identifier.',
    example: '/resume my-previous-chat'
  },
  {
    name: '/usage',
    args: '',
    desc: 'Show usage and streak stats',
    detail: 'Displays usage metrics and streak information.',
    example: '/usage'
  },
  {
    name: '/about',
    args: '',
    desc: 'Show runtime/environment details',
    detail: 'Prints environment and CLI setup details.',
    example: '/about'
  },
  {
    name: '/copy-request-id',
    args: '',
    desc: 'Copy last request ID',
    detail: 'Copies the latest request ID to clipboard for support/debugging.',
    example: '/copy-request-id'
  },
  {
    name: '/copy-conversation-id',
    args: '',
    desc: 'Copy current conversation ID',
    detail: 'Copies the active conversation ID to clipboard.',
    example: '/copy-conversation-id'
  },
  {
    name: '/logout',
    args: '',
    desc: 'Sign out from Cursor',
    detail: 'Logs out from your Cursor account in the current CLI environment.',
    example: '/logout'
  },
  {
    name: '/quit',
    args: '',
    desc: 'Exit CLI session',
    detail: 'Closes the current Cursor Agent CLI session.',
    example: '/quit'
  },
  {
    name: '/setup-terminal',
    args: '',
    desc: 'Auto-configure terminal keybindings',
    detail: 'Runs terminal setup flow for recommended keybindings.',
    example: '/setup-terminal'
  },
  {
    name: '/mcp list',
    args: '',
    desc: 'Browse and configure MCP servers',
    detail: 'Shows MCP servers and allows enable/configure actions.',
    example: '/mcp list'
  },
  {
    name: '/mcp enable',
    args: '<name>',
    desc: 'Enable an MCP server',
    detail: 'Enables an MCP server by name from within session.',
    example: '/mcp enable github'
  },
  {
    name: '/mcp disable',
    args: '<name>',
    desc: 'Disable an MCP server',
    detail: 'Disables an MCP server by name from within session.',
    example: '/mcp disable github'
  },
  {
    name: '/rules',
    args: '',
    desc: 'Create or edit rules',
    detail: 'Opens rule-management flow for creating or editing Cursor rules.',
    example: '/rules'
  },
  {
    name: '/commands',
    args: '',
    desc: 'Create or edit custom commands',
    detail: 'Opens command-management flow for custom commands.',
    example: '/commands'
  },
  {
    name: '/compress',
    args: '',
    desc: 'Compress conversation context',
    detail: 'Summarizes conversation to reduce context usage while preserving intent.',
    example: '/compress'
  },
];

// Cursor brand — near-black with clean neutral gray, ultra-minimal aesthetic
// Inspired by cursor.com's dark, no-nonsense design language
const theme = {
  bg: [10, 10, 10],   // near-black
  bgPanel: [18, 18, 20],   // very dark gray panel
  bgSelected: [55, 55, 65],   // dark blue-gray selection
  bgTooltip: [14, 14, 16],   // almost-black tooltip
  bgHeader: [28, 28, 30],   // dark gray header
  fgBase: [210, 210, 215],  // light gray
  fgDim: [80, 80, 90],  // muted gray
  fgAccent: [160, 163, 180],  // blue-tinted gray accent
  fgAccent2: [205, 207, 220],  // lighter blue-gray
  fgSelected: [255, 255, 255],  // white on selection
  fgHeader: [195, 195, 200],  // light gray on dark header
  fgCmd: [175, 178, 195],  // cool gray command
  fgFlag: [145, 148, 165],  // muted gray flag
  fgExample: [165, 168, 185],  // gray example
  fgTooltipHd: [200, 202, 215],
  fgTooltipBdy: [155, 157, 170],
  fgTooltipEx: [175, 178, 195],
  fgSearch: [240, 240, 245],  // near-white search highlight
  fgBorder: [45, 45, 50],  // very dark border
};

export default {
  id: 'cursor',
  displayName: 'Cursor Agent CLI',
  bin: 'agent',
  reference: [
    'https://cursor.com/docs/cli/reference/slash-commands',
    'https://cursor.com/docs/cli/reference/parameters',
    'https://cursor.com/docs/cli/reference/authentication',
    'https://cursor.com/docs/cli/reference/permissions',
    'https://cursor.com/docs/cli/reference/configuration',
  ],
  commands,
  flags,
  slashCommands,
  theme,
};

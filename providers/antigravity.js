const commands = [
  {
    name: 'agy',
    args: '',
    desc: 'Start interactive Antigravity TUI session',
    detail: 'Launches Antigravity CLI in the current working directory and starts a new conversation context scoped to this workspace.',
    example: 'agy',
  },
  {
    name: 'agy --continue',
    args: '',
    desc: 'Resume the most recent session in this workspace',
    detail: 'Quick-resume shortcut that reopens the latest local conversation without entering the session picker.',
    example: 'agy --continue',
  },
  {
    name: 'agy --conversation',
    args: '<uuid>',
    desc: 'Resume a specific conversation by ID',
    detail: 'Directly loads the conversation matching the provided UUID. Useful for automation and exact session targeting.',
    example: 'agy --conversation 9a8b7c6d-5e4f-3a2b-1c0d-ef1234567890',
  },
  {
    name: 'agy ? ',
    args: '',
    desc: 'Open inline help and slash command guide',
    detail: 'Inside the prompt, typing ? opens the help panel that lists guidance and available slash commands.',
    example: '?',
  },
  {
    name: 'prompt !<shell command>',
    args: '<command>',
    desc: 'Run terminal command directly from prompt',
    detail: 'In prompt mode, prefix a shell command with ! to execute it directly via the CLI terminal command flow.',
    example: '!npm test',
  },
];

const flags = [
  {
    name: '--continue',
    args: '',
    desc: 'Resume latest workspace conversation',
    detail: 'Starts AGY and immediately restores the most recent local session context in the current directory.',
    example: 'agy --continue',
  },
  {
    name: '--conversation',
    args: '<uuid>',
    desc: 'Open conversation by UUID',
    detail: 'Loads an exact conversation thread by ID instead of opening the picker or latest session.',
    example: 'agy --conversation 9a8b7c6d-5e4f-3a2b-1c0d-ef1234567890',
  },
  {
    name: '--sandbox',
    args: '',
    desc: 'Override sandbox mode for current launch',
    detail: 'Documented launch override for terminal sandbox behavior in the current session, independent of persistent settings.json defaults.',
    example: 'agy --sandbox',
  },
  {
    name: '--dangerously-skip-permissions',
    args: '',
    desc: 'Bypass permission prompts for current launch',
    detail: 'Launch-level permission override that disables interactive permission reviews. Use only in trusted, isolated environments.',
    example: 'agy --dangerously-skip-permissions',
  },
  {
    name: '--help',
    args: '',
    desc: 'Show CLI help output',
    detail: 'Prints available AGY command-line help from the installed binary.',
    example: 'agy --help',
  },
];

const slashCommands = [
  {
    name: '/add-dir <path>',
    desc: 'Add a directory path to the active workspace',
    detail: 'Adds an additional directory to the active workspace context for the current session.',
    example: '/add-dir ../shared-lib',
  },
  {
    name: '/agents',
    desc: 'Open Agent Manager panel',
    detail: 'Opens the panel used to monitor active and completed background subagents and approvals.',
    example: '/agents',
  },
  {
    name: '/btw <query>',
    desc: 'Ask side question in background',
    detail: 'Runs a side query asynchronously so your main conversation flow remains uninterrupted.',
    example: '/btw summarize the migration risk',
  },
  {
    name: '/clear',
    desc: 'Clear terminal and reset active context view',
    detail: 'Clears the screen and resets the active conversation display state.',
    example: '/clear',
  },
  {
    name: '/config',
    desc: 'Open settings editor overlay',
    detail: 'Opens the interactive settings UI for configuring CLI behavior and preferences. Alias: /settings.',
    example: '/config',
  },
  {
    name: '/settings',
    desc: 'Alias for /config',
    detail: 'Equivalent to /config and opens the interactive settings editor overlay.',
    example: '/settings',
  },
  {
    name: '/diff',
    desc: 'Show unified diff of modified files',
    detail: 'Displays unified diffs for currently modified workspace files in the active task flow.',
    example: '/diff',
  },
  {
    name: '/exit',
    desc: 'Exit the TUI session',
    detail: 'Closes the AGY terminal UI and returns control to your host shell.',
    example: '/exit',
  },
  {
    name: '/fast',
    desc: 'Enable fast mode',
    detail: 'Switches to a faster interaction mode that bypasses heavier planning behavior for quick tasks.',
    example: '/fast',
  },
  {
    name: '/fork',
    desc: 'Fork current conversation thread',
    detail: 'Creates a new session branch cloned from the current conversation history. Alias: /branch.',
    example: '/fork',
  },
  {
    name: '/branch',
    desc: 'Alias for /fork',
    detail: 'Equivalent to /fork and creates a parallel conversation branch.',
    example: '/branch',
  },
  {
    name: '/hooks',
    desc: 'Browse configured hooks',
    detail: 'Opens a browser for active pre-flight and post-format hooks.',
    example: '/hooks',
  },
  {
    name: '/keybindings',
    desc: 'Open keyboard shortcut editor',
    detail: 'Launches the interactive keybinding editor for AGY shortcut customization.',
    example: '/keybindings',
  },
  {
    name: '/logout',
    desc: 'Log out and clear credentials',
    detail: 'Disconnects your account and removes stored authentication tokens from secure keyring storage.',
    example: '/logout',
  },
  {
    name: '/mcp',
    desc: 'Open MCP server manager',
    detail: 'Launches the Model Context Protocol server management panel.',
    example: '/mcp',
  },
  {
    name: '/model',
    desc: 'Choose default reasoning model',
    detail: 'Opens model selection and persists your preferred default model across sessions.',
    example: '/model',
  },
  {
    name: '/open <path>',
    desc: 'Open path in external editor',
    detail: 'Forces a file or path to open with your configured system editor.',
    example: '/open src/index.js',
  },
  {
    name: '/permissions',
    desc: 'Switch global permission preset',
    detail: 'Switches between permission modes such as request-review, always-proceed, and strict.',
    example: '/permissions',
  },
  {
    name: '/planning',
    desc: 'Enable multi-turn planning mode',
    detail: 'Turns on plan-generation-first behavior for complex engineering tasks.',
    example: '/planning',
  },
  {
    name: '/rename <name>',
    desc: 'Rename active conversation',
    detail: 'Renames the current conversation thread for easier identification in the session picker.',
    example: '/rename auth-refactor-v2',
  },
  {
    name: '/resume',
    desc: 'Open conversation picker',
    detail: 'Opens the conversation/session picker overlay to restore previous threads. Aliases: /switch, /conversation.',
    example: '/resume',
  },
  {
    name: '/switch',
    desc: 'Alias for /resume',
    detail: 'Equivalent to /resume and opens the conversation picker overlay.',
    example: '/switch',
  },
  {
    name: '/conversation',
    desc: 'Alias for /resume',
    detail: 'Equivalent to /resume and opens the conversation picker overlay.',
    example: '/conversation',
  },
  {
    name: '/rewind',
    desc: 'Rewind conversation history',
    detail: 'Rolls conversation history back to an earlier checkpoint. Alias: /undo.',
    example: '/rewind',
  },
  {
    name: '/undo',
    desc: 'Alias for /rewind',
    detail: 'Equivalent to /rewind and restores an earlier conversation checkpoint.',
    example: '/undo',
  },
  {
    name: '/skills',
    desc: 'Browse loaded agent skills',
    detail: 'Shows available local and global skills loaded into the current AGY environment.',
    example: '/skills',
  },
  {
    name: '/statusline',
    desc: 'Customize status bar overlay',
    detail: 'Opens status line customization for live model/task indicators.',
    example: '/statusline',
  },
  {
    name: '/tasks',
    desc: 'Open task manager panel',
    detail: 'Shows active background tasks and execution logs, with task monitoring controls.',
    example: '/tasks',
  },
  {
    name: '/title [on/off]',
    desc: 'Toggle terminal title updates',
    detail: 'Enables, disables, or sets terminal window title update behavior.',
    example: '/title on',
  },
  {
    name: '/usage',
    desc: 'Open offline help manual',
    detail: 'Launches the built-in offline usage manual inside the terminal interface.',
    example: '/usage',
  },
];

// Google Antigravity brand — Google Blue #4285F4 with violet/pink accents
// Inspired by antigravity.google's space/liftoff aesthetic and Google brand palette
const theme = {
  bg:           [ 8,   8,  20],   // very dark blue-black
  bgPanel:      [12,  15,  35],   // dark navy panel
  bgSelected:   [66, 133, 244],   // Google Blue
  bgTooltip:    [10,  12,  30],   // deep navy tooltip
  bgHeader:     [55,  40, 175],   // Google indigo/deep blue header
  fgBase:       [200, 215, 255],  // cool blue-white
  fgDim:        [ 80,  90, 145],  // muted blue-purple
  fgAccent:     [130, 170, 255],  // light Google Blue accent
  fgAccent2:    [210, 130, 255],  // pink-violet accent
  fgSelected:   [255, 255, 255],  // white on selection
  fgHeader:     [230, 235, 255],  // pale blue text on indigo header
  fgCmd:        [130, 200, 255],  // sky-blue command
  fgFlag:       [200, 150, 255],  // violet flag
  fgExample:    [255, 170, 210],  // pinkish example
  fgTooltipHd:  [130, 180, 255],
  fgTooltipBdy: [175, 200, 240],
  fgTooltipEx:  [255, 170, 210],
  fgSearch:     [255, 225, 100],  // warm yellow search highlight
  fgBorder:     [ 40,  55, 120],  // dark blue border
};

export default {
  id: 'antigravity',
  displayName: 'Antigravity CLI',
  bin: 'antigravity',
  reference: ['https://antigravity.google/docs/cli-reference'],
  commands,
  flags,
  slashCommands,
  theme,
};

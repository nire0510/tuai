const commands = [];

const flags = [];

const slashCommands = [];

const theme = {
  bg: [0, 0, 0],
  bgPanel: [0, 0, 0],
  bgSelected: [0, 0, 0],
  bgTooltip: [0, 0, 0],
  bgHeader: [0, 0, 0],
  fgBase: [0, 0, 0],
  fgDim: [0, 0, 0],
  fgAccent: [0, 0, 0],
  fgAccent2: [0, 0, 0],
  fgSelected: [0, 0, 0],
  fgHeader: [0, 0, 0],
  fgCmd: [0, 0, 0],
  fgFlag: [0, 0, 0],
  fgExample: [0, 0, 0],
  fgTooltipHd: [0, 0, 0],
  fgTooltipBdy: [0, 0, 0],
  fgTooltipEx: [0, 0, 0],
  fgSearch: [0, 0, 0],
  fgBorder: [0, 0, 0],
};

export default {
  id: '',
  displayName: '',
  bin: '',
  reference: [],
  commands,
  flags,
  slashCommands,
  theme,
};

const rows = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
];

const vimDetails = {
  a: 'Insert after cursor',
  A: 'Insert at end of line',
  b: 'Back to previous word',
  B: 'Back to previous WORD',
  c: 'Change with motion',
  C: 'Change to end of line',
  d: 'Delete with motion',
  D: 'Delete to end of line',
  e: 'End of word',
  E: 'End of WORD',
  f: 'Find character right',
  F: 'Find character left',
  g: 'Prefix for goto commands',
  G: 'Go to end of file',
  h: 'Left',
  H: 'Top of screen',
  i: 'Insert before cursor',
  I: 'Insert at start of line',
  j: 'Down',
  J: 'Join lines',
  k: 'Up',
  K: 'Keyword help',
  l: 'Right',
  L: 'Bottom of screen',
  m: 'Set mark',
  M: 'Move cursor to middle of screen',
  n: 'Next search result',
  N: 'Previous search result',
  o: 'Open line below',
  O: 'Open line above',
  p: 'Paste after cursor',
  P: 'Paste before cursor',
  q: 'Record macro',
  Q: 'Ex mode',
  r: 'Replace one character',
  R: 'Replace mode',
  s: 'Substitute character',
  S: 'Substitute line',
  t: 'Till character right',
  T: 'Till character left',
  u: 'Undo',
  U: 'Restore line',
  v: 'Visual mode',
  V: 'Visual line mode',
  w: 'Next word',
  W: 'Next WORD',
  x: 'Delete character under cursor',
  X: 'Delete character before cursor',
  y: 'Yank with motion',
  Y: 'Yank line',
  z: 'Scroll and screen commands',
  Z: 'Prefix for ZZ or ZQ',
  'C-a': 'Increment number under cursor',
  'C-b': 'Page up',
  'C-c': 'Interrupt current command',
  'C-d': 'Scroll half page down',
  'C-e': 'Scroll down one line',
  'C-f': 'Page down',
  'C-g': 'Show file information',
  'C-h': 'Backspace',
  'C-i': 'Jump to newer cursor position',
  'C-j': 'Move down',
  'C-k': 'Digraph entry',
  'C-l': 'Redraw screen',
  'C-m': 'Enter',
  'C-n': 'Next autocomplete suggestion',
  'C-o': 'Jump to older cursor position',
  'C-p': 'Previous autocomplete suggestion',
  'C-q': 'Visual block mode in some terminals',
  'C-r': 'Redo',
  'C-s': 'Stop output in terminal flow control',
  'C-t': 'Jump to older tag position',
  'C-u': 'Scroll half page up',
  'C-v': 'Visual block mode',
  'C-w': 'Window commands prefix',
  'C-x': 'Decrement number under cursor',
  'C-y': 'Scroll up one line',
  'C-z': 'Suspend Vim',
};

const vimHints = {
  h: 'left',
  j: 'down',
  k: 'up',
  l: 'right',
  w: 'word ->',
  b: '<- word',
  e: 'end ->',
  g: 'goto',
  f: 'find',
  t: 'till',
  x: 'del',
  d: 'delete',
  c: 'change',
  y: 'yank',
  p: 'paste',
  u: 'undo',
  o: 'open',
  i: 'insert',
  a: 'append',
  n: 'next',
  m: 'mark',
  s: 'sub',
  r: 'replace',
  q: 'record',
  z: 'screen',
  v: 'visual',
};

const shiftVimHints = {
  H: 'top',
  J: 'join',
  K: 'help',
  L: 'bottom',
  W: 'WORD ->',
  B: '<- WORD',
  E: 'END ->',
  G: 'bottom',
  F: 'find left',
  T: 'till left',
  X: 'del before',
  D: 'del to end',
  C: 'change end',
  Y: 'yank line',
  P: 'paste before',
  U: 'restore',
  O: 'open above',
  I: 'insert line',
  A: 'append line',
  N: 'prev search',
  M: 'middle',
  S: 'sub line',
  R: 'replace',
  Q: '',
  Z: 'save/quit',
  V: 'visual line',
};

const ctrlVimHints = {
  R: 'redo',
  F: 'page down',
  D: 'half down',
  U: 'half up',
  O: 'older pos',
  G: 'file info',
  E: 'scroll down',
  Y: 'scroll up',
  P: 'prev auto',
  N: 'next auto',
  L: 'redraw',
  C: 'interrupt',
  A: 'incr num',
  X: 'decr num',
  T: 'tag jump',
  S: '',
  Q: '',
  V: 'visual block',
  J: '',
  K: '',
  B: 'page up',
  W: 'window',
  Z: 'suspend',
  M: 'newline',
  I: 'newer pos',
  H: 'backspace',
};

const initialLines = [
  "  const motions = ['h', 'j', 'k', 'l'];",
  'let target = findNextWord(buffer, cursor);',
  'const quote = "inner word target";',
  'const pair = { value: [alpha, beta] };',
  '',
  '<span>tag body</span>',
  'return practice.motions.withIntent();',
  '',
  '{',
  'section body target',
  '}',
  '',
  'First sentence. Next target sentence. `tick target`',
];

const keyboard = document.getElementById('keyboard');
const modifierControls = document.getElementById('modifier-controls');
const commandStream = document.getElementById('command-stream');
const commandName = document.getElementById('command-name');
const commandDetail = document.getElementById('command-detail');
const miniEditor = document.getElementById('mini-editor');
const miniCommandline = document.getElementById('mini-commandline');
const editorStatus = document.getElementById('editor-status');
const resetEditorButton = document.getElementById('reset-editor');

const keyRefs = {};
const pressedKeys = new Set();
const commandLog = [];
const undoStack = [];
const redoStack = [];
const streamTokens = [];
const COMMAND_STREAM_LIMIT = 8;
const COMMAND_STREAM_IDLE_MS = 1400;

let lines = initialLines.slice();
let cursor = { line: 1, col: 4 };
let mode = 'NORMAL';
let registerValue = '';
let pendingTokens = [];
let commandEntry = null;
let shiftDown = false;
let ctrlDown = false;
let visualAnchor = null;
let previousVisualSelection = null;
let lastChangeCommand = '';
let lastCharSearch = null;
let lastSearch = null;
let lastCommandLineDisplay = '';
let commandStreamClearTimer = null;

const singleOperators = new Set(['d', 'c', 'y', '>', '<']);
const textObjectTargets = new Set(['w', 'W', 's', 'p', '"', "'", '`', '(', ')', 'b', '[', ']', '{', '}', 'B', '<', '>', 't']);
const motionDetails = {
  h: 'Move left',
  j: 'Move down',
  k: 'Move up',
  l: 'Move right',
  w: 'Jump to the next word',
  W: 'Jump to the next WORD',
  b: 'Jump back to the previous word',
  B: 'Jump back to the previous WORD',
  e: 'Jump to the end of the word',
  E: 'Jump to the end of the WORD',
  ge: 'Jump back to the end of the previous word',
  gE: 'Jump back to the end of the previous WORD',
  '0': 'Move to the start of the current line',
  g0: 'Move to the start of the screen line',
  '^': 'Move to the first non-blank character',
  'g^': 'Move to the first non-blank character of the screen line',
  _: 'Move to the first non-blank character',
  g_: 'Move to the last non-blank character',
  '$': 'Move to the end of the line',
  'g$': 'Move to the end of the screen line',
  gm: 'Move to the middle of the screen line',
  gM: 'Move to the middle of the line',
  '+': 'Move to the first non-blank character of the next line',
  '-': 'Move to the first non-blank character of the previous line',
  '|': 'Move to a target column',
  gg: 'Go to the first line',
  G: 'Go to the last line',
  gj: 'Move down a screen line',
  gk: 'Move up a screen line',
  H: 'Move to the top of the visible buffer',
  M: 'Move to the middle of the visible buffer',
  L: 'Move to the bottom of the visible buffer',
  '%': 'Jump between matching braces or to a file percentage',
  go: 'Go to a byte offset',
  '[[': 'Move back to the previous section start',
  ']]': 'Move forward to the next section start',
  '[]': 'Move back to the previous section end',
  '][': 'Move forward to the next section end',
  '(': 'Move back by sentence',
  ')': 'Move forward by sentence',
  '{': 'Move back by paragraph',
  '}': 'Move forward by paragraph',
  f: 'Find a character to the right',
  F: 'Find a character to the left',
  t: 'Move till before a character to the right',
  T: 'Move till after a character to the left',
  ';': 'Repeat the last character search',
  ',': 'Repeat the last character search in the opposite direction',
  n: 'Repeat the last search',
  N: 'Repeat the last search in the opposite direction',
  '*': 'Search forward for the word under the cursor',
  '#': 'Search backward for the word under the cursor',
  'g*': 'Search forward for the text under the cursor',
  'g#': 'Search backward for the text under the cursor',
  gn: 'Select the next search match',
  gN: 'Select the previous search match',
};

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function currentLine() {
  return lines[cursor.line] ?? '';
}

function setCurrentLine(value) {
  lines[cursor.line] = value;
}

function maxColumnForLine(lineIndex, allowEnd = mode === 'INSERT') {
  const line = lines[lineIndex] ?? '';
  if (allowEnd) return line.length;
  return Math.max(0, line.length - 1);
}

function clampCursor(allowEnd = mode === 'INSERT') {
  cursor.line = clamp(cursor.line, 0, Math.max(0, lines.length - 1));
  cursor.col = clamp(cursor.col, 0, maxColumnForLine(cursor.line, allowEnd));
}

function createSnapshot() {
  return {
    lines: lines.slice(),
    cursor: { ...cursor },
    registerValue,
    mode,
    visualAnchor: visualAnchor ? { ...visualAnchor } : null,
    previousVisualSelection: previousVisualSelection ? {
      mode: previousVisualSelection.mode,
      anchor: { ...previousVisualSelection.anchor },
      cursor: { ...previousVisualSelection.cursor },
    } : null,
  };
}

function snapshotBuffer({ clearRedo = true } = {}) {
  undoStack.push(createSnapshot());
  if (undoStack.length > 40) undoStack.shift();
  if (clearRedo) redoStack.length = 0;
}

function restoreSnapshot(snapshot) {
  lines = snapshot.lines.slice();
  cursor = { ...snapshot.cursor };
  registerValue = snapshot.registerValue;
  mode = isVisualMode(snapshot.mode) ? 'NORMAL' : snapshot.mode;
  visualAnchor = snapshot.visualAnchor ? { ...snapshot.visualAnchor } : null;
  previousVisualSelection = snapshot.previousVisualSelection ? {
    mode: snapshot.previousVisualSelection.mode,
    anchor: { ...snapshot.previousVisualSelection.anchor },
    cursor: { ...snapshot.previousVisualSelection.cursor },
  } : null;
  leaveVisualMode();
  clampCursor();
}

function moveHorizontal(delta) {
  cursor.col += delta;
  clampCursor();
}

function moveVertical(delta) {
  cursor.line += delta;
  clampCursor();
}

function moveLineEnd() {
  cursor.col = maxColumnForLine(cursor.line, false);
}

function wordMatches(line) {
  return [...line.matchAll(/[A-Za-z0-9_]+/g)].map((match) => ({
    start: match.index,
    end: match.index + match[0].length - 1,
  }));
}

function moveWordForward() {
  for (let lineIndex = cursor.line; lineIndex < lines.length; lineIndex += 1) {
    const startAt = lineIndex === cursor.line ? cursor.col + 1 : 0;
    const next = wordMatches(lines[lineIndex]).find((word) => word.start >= startAt);
    if (next) {
      cursor.line = lineIndex;
      cursor.col = next.start;
      clampCursor();
      return;
    }
  }
  cursor.line = lines.length - 1;
  moveLineEnd();
}

function moveWordBackward() {
  for (let lineIndex = cursor.line; lineIndex >= 0; lineIndex -= 1) {
    const before = lineIndex === cursor.line ? cursor.col : lines[lineIndex].length;
    const previousWords = wordMatches(lines[lineIndex]).filter((word) => word.start < before);
    const previous = previousWords.at(-1);
    if (previous) {
      cursor.line = lineIndex;
      cursor.col = previous.start;
      clampCursor();
      return;
    }
  }
  cursor.line = 0;
  cursor.col = 0;
}

function moveWordEnd() {
  for (let lineIndex = cursor.line; lineIndex < lines.length; lineIndex += 1) {
    const startAt = lineIndex === cursor.line ? cursor.col : 0;
    const next = wordMatches(lines[lineIndex]).find((word) => word.end >= startAt);
    if (next) {
      cursor.line = lineIndex;
      cursor.col = next.end;
      clampCursor();
      return;
    }
  }
  cursor.line = lines.length - 1;
  moveLineEnd();
}

function deleteCharacter() {
  const line = currentLine();
  if (!line.length) return;
  snapshotBuffer();
  registerValue = line[cursor.col] ?? '';
  setCurrentLine(line.slice(0, cursor.col) + line.slice(cursor.col + 1));
  clampCursor();
}

function deleteLine() {
  snapshotBuffer();
  registerValue = `${currentLine()}\n`;
  lines.splice(cursor.line, 1);
  if (!lines.length) lines.push('');
  cursor.line = Math.min(cursor.line, lines.length - 1);
  cursor.col = 0;
  clampCursor();
}

function nextWordDeleteEnd(line, start) {
  const after = line.slice(start);
  const currentWord = after.match(/^[A-Za-z0-9_]+/);
  if (currentWord) {
    const trailingSpace = line.slice(start + currentWord[0].length).match(/^\s+/);
    return start + currentWord[0].length + (trailingSpace ? trailingSpace[0].length : 0);
  }

  const leadingSpace = after.match(/^\s+/);
  if (leadingSpace) {
    const nextWord = line.slice(start + leadingSpace[0].length).match(/^[A-Za-z0-9_]+/);
    if (nextWord) return start + leadingSpace[0].length + nextWord[0].length;
  }

  const nextBoundary = after.search(/\s/);
  return nextBoundary === -1 ? line.length : start + nextBoundary;
}

function deleteWord() {
  const line = currentLine();
  if (!line.length) return;
  snapshotBuffer();
  const end = nextWordDeleteEnd(line, cursor.col);
  registerValue = line.slice(cursor.col, end);
  setCurrentLine(line.slice(0, cursor.col) + line.slice(end));
  clampCursor();
}

function currentWordRange() {
  const line = currentLine();
  const range = wordMatches(line).find((word) => cursor.col >= word.start && cursor.col <= word.end);
  if (range) return range;

  const next = wordMatches(line).find((word) => word.start > cursor.col);
  return next ?? null;
}

function deleteInnerWord() {
  const range = currentWordRange();
  if (!range) return;
  snapshotBuffer();
  const line = currentLine();
  registerValue = line.slice(range.start, range.end + 1);
  setCurrentLine(line.slice(0, range.start) + line.slice(range.end + 1));
  cursor.col = range.start;
  clampCursor();
}

function yankLine() {
  registerValue = `${currentLine()}\n`;
}

function pasteRegister() {
  if (!registerValue) return;
  snapshotBuffer();

  if (registerValue.endsWith('\n')) {
    lines.splice(cursor.line + 1, 0, registerValue.slice(0, -1));
    cursor.line += 1;
    cursor.col = 0;
    clampCursor();
    return;
  }

  const line = currentLine();
  const insertAt = Math.min(line.length, cursor.col + 1);
  setCurrentLine(line.slice(0, insertAt) + registerValue + line.slice(insertAt));
  cursor.col = insertAt + registerValue.length - 1;
  clampCursor();
}

function undoBuffer() {
  const snapshot = undoStack.pop();
  if (!snapshot) return false;
  redoStack.push(createSnapshot());
  if (redoStack.length > 40) redoStack.shift();
  restoreSnapshot(snapshot);
  return true;
}

function redoBuffer() {
  const snapshot = redoStack.pop();
  if (!snapshot) return false;
  undoStack.push(createSnapshot());
  if (undoStack.length > 40) undoStack.shift();
  restoreSnapshot(snapshot);
  return true;
}

function enterInsertMode() {
  leaveVisualMode();
  mode = 'INSERT';
  clampCursor(true);
}

function openLine(offset) {
  snapshotBuffer();
  lines.splice(cursor.line + offset, 0, '');
  cursor.line += offset;
  cursor.col = 0;
  enterInsertMode();
}

function enterVisualMode() {
  mode = 'VISUAL';
  visualAnchor = { ...cursor };
}

function enterVisualLineMode() {
  mode = 'VISUAL LINE';
  visualAnchor = { ...cursor };
}

function enterVisualBlockMode() {
  mode = 'VISUAL BLOCK';
  visualAnchor = { ...cursor };
}

function isVisualMode(value = mode) {
  return value === 'VISUAL' || value === 'VISUAL LINE' || value === 'VISUAL BLOCK';
}

function switchVisualMode(nextMode) {
  if (!visualAnchor) visualAnchor = { ...cursor };
  mode = nextMode;
}

function leaveVisualMode() {
  if (isVisualMode()) {
    rememberVisualSelection();
    mode = 'NORMAL';
  }
  visualAnchor = null;
}

function comparePositions(a, b) {
  if (a.line !== b.line) return a.line - b.line;
  return a.col - b.col;
}

function orderedSelection() {
  if (!visualAnchor) return null;
  const start = comparePositions(visualAnchor, cursor) <= 0 ? visualAnchor : cursor;
  const end = start === visualAnchor ? cursor : visualAnchor;
  return { start, end };
}

function orderedLineSelection() {
  if (!visualAnchor) return null;
  return {
    startLine: Math.min(visualAnchor.line, cursor.line),
    endLine: Math.max(visualAnchor.line, cursor.line),
  };
}

function orderedBlockSelection() {
  if (!visualAnchor) return null;
  return {
    startLine: Math.min(visualAnchor.line, cursor.line),
    endLine: Math.max(visualAnchor.line, cursor.line),
    startCol: Math.min(visualAnchor.col, cursor.col),
    endCol: Math.max(visualAnchor.col, cursor.col),
  };
}

function swapVisualEndpoint() {
  if (!visualAnchor) return false;
  const previousCursor = { ...cursor };
  cursor = { ...visualAnchor };
  visualAnchor = previousCursor;
  clampCursor();
  return true;
}

function swapVisualBlockColumnCorner() {
  if (mode !== 'VISUAL BLOCK' || !visualAnchor) return swapVisualEndpoint();
  const previousCursor = { ...cursor };
  const previousAnchor = { ...visualAnchor };
  visualAnchor = position(previousAnchor.line, previousCursor.col);
  cursor = position(previousCursor.line, previousAnchor.col);
  clampCursor();
  return true;
}

function rememberVisualSelection() {
  if (!isVisualMode() || !visualAnchor) return;
  previousVisualSelection = {
    mode,
    anchor: { ...visualAnchor },
    cursor: { ...cursor },
  };
}

function positionIsSelected(lineIndex, colIndex) {
  if (mode === 'VISUAL BLOCK') {
    const selection = orderedBlockSelection();
    return selection
      ? lineIndex >= selection.startLine
        && lineIndex <= selection.endLine
        && colIndex >= selection.startCol
        && colIndex <= selection.endCol
      : false;
  }

  if (mode === 'VISUAL LINE') {
    const selection = orderedLineSelection();
    return selection ? lineIndex >= selection.startLine && lineIndex <= selection.endLine : false;
  }

  const selection = orderedSelection();
  if (!selection) return false;
  return comparePositions({ line: lineIndex, col: colIndex }, selection.start) >= 0
    && comparePositions({ line: lineIndex, col: colIndex }, selection.end) <= 0;
}

function selectedText() {
  if (mode === 'VISUAL BLOCK') {
    const selection = orderedBlockSelection();
    if (!selection) return '';
    const chunks = [];
    for (let lineIndex = selection.startLine; lineIndex <= selection.endLine; lineIndex += 1) {
      chunks.push((lines[lineIndex] ?? '').slice(selection.startCol, selection.endCol + 1));
    }
    return chunks.join('\n');
  }

  if (mode === 'VISUAL LINE') {
    const selection = orderedLineSelection();
    if (!selection) return '';
    return `${lines.slice(selection.startLine, selection.endLine + 1).join('\n')}\n`;
  }

  const selection = orderedSelection();
  if (!selection) return '';

  if (selection.start.line === selection.end.line) {
    const line = lines[selection.start.line];
    return line.slice(selection.start.col, selection.end.col + 1);
  }

  const chunks = [];
  for (let lineIndex = selection.start.line; lineIndex <= selection.end.line; lineIndex += 1) {
    const line = lines[lineIndex];
    if (lineIndex === selection.start.line) {
      chunks.push(line.slice(selection.start.col));
    } else if (lineIndex === selection.end.line) {
      chunks.push(line.slice(0, selection.end.col + 1));
    } else {
      chunks.push(line);
    }
  }
  return chunks.join('\n');
}

function firstNonBlankColumn(lineIndex = cursor.line) {
  const line = lines[lineIndex] ?? '';
  const match = line.match(/\S/);
  return match ? match.index : 0;
}

function position(line = cursor.line, col = cursor.col) {
  return { line, col };
}

function clonePosition(pos) {
  return { line: pos.line, col: pos.col };
}

function normalizePosition(pos, allowEnd = true) {
  const line = clamp(pos.line, 0, Math.max(0, lines.length - 1));
  const maxCol = allowEnd ? (lines[line] ?? '').length : maxColumnForLine(line, false);
  return { line, col: clamp(pos.col, 0, maxCol) };
}

function bufferText() {
  return lines.join('\n');
}

function offsetFromPosition(pos) {
  const normalized = normalizePosition(pos, true);
  let offset = 0;
  for (let lineIndex = 0; lineIndex < normalized.line; lineIndex += 1) {
    offset += (lines[lineIndex] ?? '').length + 1;
  }
  return offset + normalized.col;
}

function positionFromOffset(offset, allowEnd = true) {
  let remaining = clamp(offset, 0, bufferText().length);

  for (let lineIndex = 0; lineIndex < lines.length; lineIndex += 1) {
    const length = (lines[lineIndex] ?? '').length;
    if (remaining <= length) return normalizePosition(position(lineIndex, remaining), allowEnd);
    remaining -= length + 1;
  }

  return normalizePosition(position(lines.length - 1, (lines.at(-1) ?? '').length), allowEnd);
}

function advancePosition(pos, amount) {
  let next = normalizePosition(pos, true);
  let remaining = amount;

  while (remaining > 0) {
    const lineLength = (lines[next.line] ?? '').length;
    if (next.col < lineLength) {
      next.col += 1;
      remaining -= 1;
    } else if (next.line < lines.length - 1) {
      next.line += 1;
      next.col = 0;
      remaining -= 1;
    } else {
      break;
    }
  }

  return normalizePosition(next, true);
}

function retreatPosition(pos, amount) {
  let next = normalizePosition(pos, true);
  let remaining = amount;

  while (remaining > 0) {
    if (next.col > 0) {
      next.col -= 1;
      remaining -= 1;
    } else if (next.line > 0) {
      next.line -= 1;
      next.col = (lines[next.line] ?? '').length;
      remaining -= 1;
    } else {
      break;
    }
  }

  return normalizePosition(next, false);
}

function rangeFromPositions(start, end, { inclusive = false, linewise = false } = {}) {
  if (linewise) {
    const startLine = Math.min(start.line, end.line);
    const endLine = Math.max(start.line, end.line);
    return { type: 'line', startLine, endLine };
  }

  const from = normalizePosition(start, true);
  let to = normalizePosition(end, true);
  const forward = comparePositions(from, to) <= 0;

  if (forward && inclusive) {
    to = advancePosition(to, 1);
  }

  if (forward) {
    return { type: 'char', start: from, end: to };
  }

  return {
    type: 'char',
    start: to,
    end: advancePosition(from, 1),
  };
}

function blockRangeFromPositions(start, end) {
  const from = normalizePosition(start, false);
  const to = normalizePosition(end, false);
  return {
    type: 'block',
    startLine: Math.min(from.line, to.line),
    endLine: Math.max(from.line, to.line),
    startCol: Math.min(from.col, to.col),
    endCol: Math.max(from.col, to.col),
  };
}

function rangeIsEmpty(range) {
  if (!range) return true;
  if (range.type === 'line') return range.startLine > range.endLine;
  if (range.type === 'block') return range.startLine > range.endLine || range.startCol > range.endCol;
  return comparePositions(range.start, range.end) >= 0;
}

function setVisualSelectionFromRange(range) {
  if (!range || rangeIsEmpty(range)) return false;

  if (range.type === 'line') {
    mode = 'VISUAL LINE';
    visualAnchor = position(range.startLine, 0);
    cursor = position(range.endLine, maxColumnForLine(range.endLine, false));
    clampCursor();
    return true;
  }

  mode = 'VISUAL';
  visualAnchor = clonePosition(range.start);
  cursor = retreatPosition(range.end, 1);
  clampCursor();
  return true;
}

function restorePreviousVisualSelection() {
  if (!previousVisualSelection) return false;
  mode = previousVisualSelection.mode;
  visualAnchor = { ...previousVisualSelection.anchor };
  cursor = { ...previousVisualSelection.cursor };
  clampCursor();
  return true;
}

function textFromRange(range) {
  if (!range || rangeIsEmpty(range)) return '';

  if (range.type === 'line') {
    return `${lines.slice(range.startLine, range.endLine + 1).join('\n')}\n`;
  }

  if (range.type === 'block') {
    const chunks = [];
    for (let lineIndex = range.startLine; lineIndex <= range.endLine; lineIndex += 1) {
      chunks.push((lines[lineIndex] ?? '').slice(range.startCol, range.endCol + 1));
    }
    return chunks.join('\n');
  }

  if (range.start.line === range.end.line) {
    return (lines[range.start.line] ?? '').slice(range.start.col, range.end.col);
  }

  const chunks = [];
  for (let lineIndex = range.start.line; lineIndex <= range.end.line; lineIndex += 1) {
    const line = lines[lineIndex] ?? '';
    if (lineIndex === range.start.line) {
      chunks.push(line.slice(range.start.col));
    } else if (lineIndex === range.end.line) {
      chunks.push(line.slice(0, range.end.col));
    } else {
      chunks.push(line);
    }
  }
  return chunks.join('\n');
}

function deleteRange(range, { preserveLine = false } = {}) {
  if (!range || rangeIsEmpty(range)) return false;
  snapshotBuffer();
  registerValue = textFromRange(range);

  if (range.type === 'line') {
    const removedCount = range.endLine - range.startLine + 1;
    const replacement = preserveLine ? [''] : [];
    lines.splice(range.startLine, removedCount, ...replacement);
    if (!lines.length) lines.push('');
    cursor.line = Math.min(range.startLine, lines.length - 1);
    cursor.col = preserveLine ? 0 : firstNonBlankColumn(cursor.line);
    clampCursor(preserveLine);
    return true;
  }

  if (range.type === 'block') {
    for (let lineIndex = range.startLine; lineIndex <= range.endLine; lineIndex += 1) {
      const line = lines[lineIndex] ?? '';
      lines[lineIndex] = line.slice(0, range.startCol) + line.slice(range.endCol + 1);
    }
    cursor = position(range.startLine, range.startCol);
    clampCursor();
    return true;
  }

  if (range.start.line === range.end.line) {
    const line = lines[range.start.line] ?? '';
    lines[range.start.line] = line.slice(0, range.start.col) + line.slice(range.end.col);
  } else {
    const first = (lines[range.start.line] ?? '').slice(0, range.start.col);
    const last = (lines[range.end.line] ?? '').slice(range.end.col);
    lines.splice(range.start.line, range.end.line - range.start.line + 1, first + last);
  }

  if (!lines.length) lines.push('');
  cursor = clonePosition(range.start);
  clampCursor(preserveLine);
  return true;
}

function yankRange(range) {
  if (!range || rangeIsEmpty(range)) return false;
  registerValue = textFromRange(range);
  return true;
}

function indentRange(range, direction) {
  if (!range || rangeIsEmpty(range)) return false;
  snapshotBuffer();
  const startLine = range.type === 'line' || range.type === 'block' ? range.startLine : range.start.line;
  const endLine = range.type === 'line' || range.type === 'block' ? range.endLine : range.end.line;

  for (let lineIndex = startLine; lineIndex <= endLine; lineIndex += 1) {
    if (direction > 0) {
      lines[lineIndex] = `  ${lines[lineIndex] ?? ''}`;
    } else {
      lines[lineIndex] = (lines[lineIndex] ?? '').replace(/^ {1,2}/, '');
    }
  }

  cursor.line = startLine;
  cursor.col = firstNonBlankColumn(startLine);
  clampCursor();
  return true;
}

function replaceRangeText(range, transform) {
  if (!range || rangeIsEmpty(range)) return false;
  snapshotBuffer();

  if (range.type === 'block') {
    for (let lineIndex = range.startLine; lineIndex <= range.endLine; lineIndex += 1) {
      const line = lines[lineIndex] ?? '';
      lines[lineIndex] = line.slice(0, range.startCol)
        + transform(line.slice(range.startCol, range.endCol + 1))
        + line.slice(range.endCol + 1);
    }
    cursor = position(range.startLine, range.startCol);
    clampCursor();
    return true;
  }

  if (range.type === 'line') {
    for (let lineIndex = range.startLine; lineIndex <= range.endLine; lineIndex += 1) {
      lines[lineIndex] = transform(lines[lineIndex] ?? '');
    }
    cursor.line = range.startLine;
    cursor.col = firstNonBlankColumn(range.startLine);
    clampCursor();
    return true;
  }

  if (range.start.line === range.end.line) {
    const line = lines[range.start.line] ?? '';
    lines[range.start.line] = line.slice(0, range.start.col)
      + transform(line.slice(range.start.col, range.end.col))
      + line.slice(range.end.col);
    cursor = clonePosition(range.start);
    clampCursor();
    return true;
  }

  const before = (lines[range.start.line] ?? '').slice(0, range.start.col);
  const firstBody = (lines[range.start.line] ?? '').slice(range.start.col);
  const lastBody = (lines[range.end.line] ?? '').slice(0, range.end.col);
  const after = (lines[range.end.line] ?? '').slice(range.end.col);
  lines[range.start.line] = before + transform(firstBody);
  for (let lineIndex = range.start.line + 1; lineIndex < range.end.line; lineIndex += 1) {
    lines[lineIndex] = transform(lines[lineIndex] ?? '');
  }
  lines[range.end.line] = transform(lastBody) + after;
  cursor = clonePosition(range.start);
  clampCursor();
  return true;
}

function changeRange(range) {
  const changed = deleteRange(range, { preserveLine: range?.type === 'line' });
  if (!changed) return false;
  enterInsertMode();
  return true;
}

function wordPattern(kind) {
  return kind === 'W' ? /\S+/g : /[A-Za-z0-9_]+/g;
}

function tokenMatches(line, kind = 'w') {
  return [...line.matchAll(wordPattern(kind))].map((match) => ({
    start: match.index,
    end: match.index + match[0].length,
  }));
}

function currentTokenRange(kind = 'w') {
  const line = currentLine();
  const tokens = tokenMatches(line, kind);
  return tokens.find((word) => cursor.col >= word.start && cursor.col < word.end)
    ?? tokens.find((word) => word.start > cursor.col)
    ?? null;
}

function wordTextObject(kind, around) {
  const token = currentTokenRange(kind);
  if (!token) return null;

  let start = token.start;
  let end = token.end;
  const line = currentLine();

  if (around) {
    const trailing = line.slice(end).match(/^\s+/);
    if (trailing) {
      end += trailing[0].length;
    } else {
      const leading = line.slice(0, start).match(/\s+$/);
      if (leading) start -= leading[0].length;
    }
  }

  return {
    type: 'char',
    start: position(cursor.line, start),
    end: position(cursor.line, end),
  };
}

function sentenceStartOffsets() {
  const text = bufferText();
  const starts = [0];
  let lineOffset = 0;

  lines.forEach((line, lineIndex) => {
    if ((line ?? '').trim() && (lineIndex === 0 || !(lines[lineIndex - 1] ?? '').trim())) {
      starts.push(lineOffset + firstNonBlankColumn(lineIndex));
    }
    lineOffset += (line ?? '').length + 1;
  });

  const sentenceEnd = /[.!?]["')\]]*\s+/g;
  let match = sentenceEnd.exec(text);

  while (match) {
    let start = match.index + match[0].length;
    while (start < text.length && /\s/.test(text[start])) start += 1;
    if (start < text.length) starts.push(start);
    match = sentenceEnd.exec(text);
  }

  return [...new Set(starts)].sort((a, b) => a - b);
}

function sentenceDestination(pos, direction, count) {
  const starts = sentenceStartOffsets();
  const current = offsetFromPosition(pos);
  let index = direction > 0
    ? starts.findIndex((start) => start > current)
    : starts.findLastIndex((start) => start < current);

  if (index === -1) index = direction > 0 ? starts.length - 1 : 0;
  index = clamp(index + (direction > 0 ? count - 1 : -(count - 1)), 0, starts.length - 1);
  return positionFromOffset(starts[index], false);
}

function sentenceTextObject(around) {
  const text = bufferText();
  const starts = sentenceStartOffsets();
  const current = offsetFromPosition(cursor);
  const startIndex = Math.max(0, starts.findLastIndex((start) => start <= current));
  let start = starts[startIndex];
  let end = starts[startIndex + 1] ?? text.length;

  if (!around) {
    while (start < end && /\s/.test(text[start])) start += 1;
    while (end > start && /\s/.test(text[end - 1])) end -= 1;
  }

  return {
    type: 'char',
    start: positionFromOffset(start, true),
    end: positionFromOffset(end, true),
  };
}

function paragraphRanges() {
  const ranges = [];
  let lineIndex = 0;

  while (lineIndex < lines.length) {
    while (lineIndex < lines.length && !(lines[lineIndex] ?? '').trim()) lineIndex += 1;
    if (lineIndex >= lines.length) break;

    const startLine = lineIndex;
    while (lineIndex < lines.length && (lines[lineIndex] ?? '').trim()) lineIndex += 1;
    ranges.push({ startLine, endLine: lineIndex - 1 });
  }

  return ranges.length ? ranges : [{ startLine: 0, endLine: 0 }];
}

function paragraphDestination(pos, direction, count) {
  const ranges = paragraphRanges();
  const currentIndex = ranges.findIndex((range) => pos.line >= range.startLine && pos.line <= range.endLine);
  const startIndex = currentIndex === -1
    ? ranges.findIndex((range) => range.startLine > pos.line)
    : currentIndex;
  const index = clamp(
    (startIndex === -1 ? ranges.length - 1 : startIndex) + direction * count,
    0,
    ranges.length - 1,
  );
  const line = ranges[index].startLine;
  return position(line, firstNonBlankColumn(line));
}

function lastNonBlankColumn(lineIndex = cursor.line) {
  const line = lines[lineIndex] ?? '';
  const match = line.match(/\S\s*$/);
  return match ? match.index : 0;
}

function sectionDestination(pos, targetName, count) {
  const start = normalizePosition(pos, false);
  const char = targetName === ']]' || targetName === '[[' ? '{' : '}';
  const forward = targetName[0] === ']';
  let next = start;

  for (let step = 0; step < count; step += 1) {
    let foundLine = -1;
    if (forward) {
      for (let lineIndex = next.line + 1; lineIndex < lines.length; lineIndex += 1) {
        if ((lines[lineIndex] ?? '')[0] === char) {
          foundLine = lineIndex;
          break;
        }
      }
    } else {
      for (let lineIndex = next.line - 1; lineIndex >= 0; lineIndex -= 1) {
        if ((lines[lineIndex] ?? '')[0] === char) {
          foundLine = lineIndex;
          break;
        }
      }
    }

    if (foundLine === -1) return next;
    next = position(foundLine, 0);
  }

  return normalizePosition(next, false);
}

function paragraphTextObject(around) {
  let startLine = cursor.line;
  let endLine = cursor.line;

  while (startLine > 0 && (lines[startLine - 1] ?? '').trim()) startLine -= 1;
  while (endLine < lines.length - 1 && (lines[endLine + 1] ?? '').trim()) endLine += 1;

  if (around) {
    if (endLine < lines.length - 1 && !(lines[endLine + 1] ?? '').trim()) {
      endLine += 1;
    } else if (startLine > 0 && !(lines[startLine - 1] ?? '').trim()) {
      startLine -= 1;
    }
  }

  return { type: 'line', startLine, endLine };
}

function delimitedTextObject(openChar, closeChar, around) {
  const line = currentLine();
  const left = line.lastIndexOf(openChar, cursor.col);
  const right = line.indexOf(closeChar, Math.max(cursor.col, left + 1));
  if (left === -1 || right === -1 || right <= left) return null;

  return {
    type: 'char',
    start: position(cursor.line, around ? left : left + 1),
    end: position(cursor.line, around ? right + 1 : right),
  };
}

function quoteTextObject(quote, around) {
  const line = currentLine();
  let left = -1;
  let right = -1;

  for (let index = 0; index < line.length; index += 1) {
    if (line[index] !== quote || line[index - 1] === '\\') continue;
    if (index <= cursor.col) left = index;
    if (index > cursor.col) {
      right = index;
      break;
    }
  }

  if (left === -1 || right === -1) return null;
  return {
    type: 'char',
    start: position(cursor.line, around ? left : left + 1),
    end: position(cursor.line, around ? right + 1 : right),
  };
}

function tagTextObject(around) {
  const line = currentLine();
  const tagMatch = line.match(/<([A-Za-z][\w-]*)(?:\s[^>]*)?>(.*?)<\/\1>/);
  if (!tagMatch || tagMatch.index === undefined) return null;
  const outerStart = tagMatch.index;
  const outerEnd = outerStart + tagMatch[0].length;
  const innerStart = outerStart + tagMatch[0].indexOf('>') + 1;
  const innerEnd = outerEnd - tagMatch[1].length - 3;

  if (cursor.col < outerStart || cursor.col > outerEnd) return null;

  return {
    type: 'char',
    start: position(cursor.line, around ? outerStart : innerStart),
    end: position(cursor.line, around ? outerEnd : innerEnd),
  };
}

function textObjectRange(target) {
  const around = target.variant === 'a';
  switch (target.object) {
    case 'w':
    case 'W':
      return wordTextObject(target.object, around);
    case 's':
      return sentenceTextObject(around);
    case 'p':
      return paragraphTextObject(around);
    case '"':
    case "'":
    case '`':
      return quoteTextObject(target.object, around);
    case '(':
    case ')':
    case 'b':
      return delimitedTextObject('(', ')', around);
    case '[':
    case ']':
      return delimitedTextObject('[', ']', around);
    case '{':
    case '}':
    case 'B':
      return delimitedTextObject('{', '}', around);
    case '<':
    case '>':
      return delimitedTextObject('<', '>', around);
    case 't':
      return tagTextObject(around);
    default:
      return null;
  }
}

function moveTokenForward(pos, kind, count, endOfToken = false) {
  let next = normalizePosition(pos, true);

  for (let step = 0; step < count; step += 1) {
    let found = null;
    for (let lineIndex = next.line; lineIndex < lines.length && !found; lineIndex += 1) {
      const startAt = lineIndex === next.line ? next.col + 1 : 0;
      found = tokenMatches(lines[lineIndex] ?? '', kind).find((word) => (
        endOfToken ? word.end - 1 >= startAt : word.start >= startAt
      ));
      if (found) {
        next = position(lineIndex, endOfToken ? found.end - 1 : found.start);
      }
    }
  }

  return normalizePosition(next, false);
}

function moveTokenBackward(pos, kind, count) {
  let next = normalizePosition(pos, false);

  for (let step = 0; step < count; step += 1) {
    let found = null;
    for (let lineIndex = next.line; lineIndex >= 0 && !found; lineIndex -= 1) {
      const before = lineIndex === next.line ? next.col : (lines[lineIndex] ?? '').length;
      const candidates = tokenMatches(lines[lineIndex] ?? '', kind).filter((word) => word.start < before);
      found = candidates.at(-1);
      if (found) next = position(lineIndex, found.start);
    }
  }

  return normalizePosition(next, false);
}

function moveTokenEndBackward(pos, kind, count) {
  let next = normalizePosition(pos, false);

  for (let step = 0; step < count; step += 1) {
    let found = null;
    for (let lineIndex = next.line; lineIndex >= 0 && !found; lineIndex -= 1) {
      const before = lineIndex === next.line ? next.col : (lines[lineIndex] ?? '').length;
      const candidates = tokenMatches(lines[lineIndex] ?? '', kind).filter((word) => word.end - 1 < before);
      found = candidates.at(-1);
      if (found) next = position(lineIndex, found.end - 1);
    }
  }

  return normalizePosition(next, false);
}

function findCharPosition(pos, command, char, count) {
  const line = lines[pos.line] ?? '';
  const forward = command === 'f' || command === 't';
  let found = -1;

  if (forward) {
    let from = pos.col + 1;
    for (let step = 0; step < count; step += 1) {
      found = line.indexOf(char, from);
      if (found === -1) return null;
      from = found + 1;
    }
    return position(pos.line, command === 't' ? Math.max(pos.col, found - 1) : found);
  }

  let from = pos.col - 1;
  for (let step = 0; step < count; step += 1) {
    found = line.lastIndexOf(char, from);
    if (found === -1) return null;
    from = found - 1;
  }
  return position(pos.line, command === 'T' ? Math.min(line.length - 1, found + 1) : found);
}

function oppositeCharSearch(command) {
  return { f: 'F', F: 'f', t: 'T', T: 't' }[command] ?? command;
}

function lineMatchIsWholeWord(line, start, length) {
  const before = line[start - 1] ?? '';
  const after = line[start + length] ?? '';
  return !/[A-Za-z0-9_]/.test(before) && !/[A-Za-z0-9_]/.test(after);
}

function findInLine(line, query, from, direction, wholeWord = false) {
  if (!query) return -1;

  if (direction > 0) {
    let found = line.toLowerCase().indexOf(query.toLowerCase(), clamp(from, 0, line.length));
    while (found !== -1) {
      if (!wholeWord || lineMatchIsWholeWord(line, found, query.length)) return found;
      found = line.toLowerCase().indexOf(query.toLowerCase(), found + 1);
    }
    return -1;
  }

  let found = line.toLowerCase().lastIndexOf(query.toLowerCase(), clamp(from, 0, Math.max(0, line.length - 1)));
  while (found !== -1) {
    if (!wholeWord || lineMatchIsWholeWord(line, found, query.length)) return found;
    found = line.toLowerCase().lastIndexOf(query.toLowerCase(), found - 1);
  }
  return -1;
}

function searchPosition(query, direction, from = cursor, { wholeWord = false, includeCurrent = false } = {}) {
  const start = normalizePosition(from, false);

  if (direction > 0) {
    for (let lineIndex = start.line; lineIndex < lines.length; lineIndex += 1) {
      const line = lines[lineIndex] ?? '';
      const offset = lineIndex === start.line ? start.col + (includeCurrent ? 0 : 1) : 0;
      const found = findInLine(line, query, offset, 1, wholeWord);
      if (found !== -1) return position(lineIndex, found);
    }

    for (let lineIndex = 0; lineIndex <= start.line; lineIndex += 1) {
      const line = lines[lineIndex] ?? '';
      const limit = lineIndex === start.line ? start.col : line.length;
      const found = findInLine(line.slice(0, limit), query, 0, 1, wholeWord);
      if (found !== -1) return position(lineIndex, found);
    }
  } else {
    for (let lineIndex = start.line; lineIndex >= 0; lineIndex -= 1) {
      const line = lines[lineIndex] ?? '';
      const offset = lineIndex === start.line ? start.col - (includeCurrent ? 0 : 1) : line.length - 1;
      const found = findInLine(line, query, offset, -1, wholeWord);
      if (found !== -1) return position(lineIndex, found);
    }

    for (let lineIndex = lines.length - 1; lineIndex >= start.line; lineIndex -= 1) {
      const line = lines[lineIndex] ?? '';
      const offset = lineIndex === start.line ? start.col : line.length - 1;
      const found = findInLine(line, query, offset, -1, wholeWord);
      if (found !== -1) return position(lineIndex, found);
    }
  }

  return null;
}

function cloneSearchOffset(offset) {
  return offset ? { ...offset } : null;
}

function repeatSearchDestination(query, direction, count, wholeWord = false, start = cursor, offset = null) {
  let next = normalizePosition(start, false);
  let found = null;

  for (let step = 0; step < count; step += 1) {
    found = searchPosition(query, direction, next, { wholeWord });
    if (!found) return next;
    next = applySearchOffset(found, query, offset);
  }

  lastSearch = { query, direction, wholeWord, offset: cloneSearchOffset(offset) };
  return normalizePosition(next, false);
}

function currentSearchToken(kind = 'w') {
  const token = currentTokenRange(kind);
  if (!token) return '';
  return currentLine().slice(token.start, token.end);
}

function searchMatchRange(query, direction, start = cursor, wholeWord = false, includeCurrent = true) {
  const found = searchPosition(query, direction, start, { wholeWord, includeCurrent });
  if (!found) return null;

  return {
    type: 'char',
    start: found,
    end: advancePosition(found, query.length),
  };
}

function parseSearchCommand(command) {
  const direction = command.startsWith('?') ? -1 : 1;
  const delimiter = direction > 0 ? '/' : '?';
  const body = command.slice(1);
  const delimiterIndex = body.lastIndexOf(delimiter);
  let query = body;
  let offsetRaw = '';
  let hasOffset = false;

  if (delimiterIndex !== -1) {
    hasOffset = true;
    query = body.slice(0, delimiterIndex);
    offsetRaw = body.slice(delimiterIndex + 1);
  }

  const emptyPattern = query === '';
  if (!query && lastSearch) query = lastSearch.query;

  let offset = hasOffset ? parseSearchOffset(offsetRaw) : null;
  if (!offset && emptyPattern && lastSearch?.offset && (!hasOffset || !offsetRaw)) {
    offset = cloneSearchOffset(lastSearch.offset);
  }

  return {
    query,
    direction,
    offset,
  };
}

function parseSearchOffset(raw = '') {
  if (!raw) return null;

  if (/^[+-]\d*$/.test(raw)) {
    const sign = raw[0] === '-' ? -1 : 1;
    const amount = raw.length === 1 ? 1 : Number.parseInt(raw.slice(1), 10);
    return { type: 'line', amount: sign * amount, raw };
  }

  const charOffset = raw.match(/^([esb])([+-]\d*)?$/);
  if (charOffset) {
    const [, base, deltaRaw = ''] = charOffset;
    let amount = 0;
    if (deltaRaw) {
      const sign = deltaRaw[0] === '-' ? -1 : 1;
      amount = sign * (deltaRaw.length === 1 ? 1 : Number.parseInt(deltaRaw.slice(1), 10));
    }
    return { type: 'char', base: base === 'b' ? 's' : base, amount, raw };
  }

  return null;
}

function applySearchOffset(match, query, offset) {
  if (!offset) return normalizePosition(match, false);

  if (offset.type === 'line') {
    const line = clamp(match.line + offset.amount, 0, lines.length - 1);
    return position(line, 0);
  }

  const base = offset.base === 'e'
    ? position(match.line, match.col + Math.max(0, query.length - 1))
    : match;
  const shifted = offset.amount >= 0
    ? advancePosition(base, offset.amount)
    : retreatPosition(base, Math.abs(offset.amount));
  return normalizePosition(shifted, false);
}

function matchingBracketDestination(pos) {
  const brackets = {
    '(': ')',
    '[': ']',
    '{': '}',
    ')': '(',
    ']': '[',
    '}': '{',
  };
  const opening = new Set(['(', '[', '{']);
  let start = null;
  const line = lines[pos.line] ?? '';

  for (let col = pos.col; col < line.length; col += 1) {
    if (brackets[line[col]]) {
      start = position(pos.line, col);
      break;
    }
  }

  if (!start) return pos;

  const char = lines[start.line][start.col];
  const match = brackets[char];
  const direction = opening.has(char) ? 1 : -1;
  let depth = 0;
  let scan = clonePosition(start);

  while (scan.line >= 0 && scan.line < lines.length) {
    const scanLine = lines[scan.line] ?? '';
    while (scan.col >= 0 && scan.col < scanLine.length) {
      const current = scanLine[scan.col];
      if (current === char) depth += 1;
      if (current === match) depth -= 1;
      if (depth === 0 && comparePositions(scan, start) !== 0) return normalizePosition(scan, false);
      scan.col += direction;
    }

    scan.line += direction;
    scan.col = direction > 0 ? 0 : (lines[scan.line] ?? '').length - 1;
  }

  return pos;
}

function percentLineDestination(count) {
  const line = Math.ceil(lines.length * clamp(count, 1, 100) / 100) - 1;
  const targetLine = clamp(line, 0, lines.length - 1);
  return position(targetLine, firstNonBlankColumn(targetLine));
}

function byteOffsetDestination(count) {
  return positionFromOffset(Math.max(0, count - 1), false);
}

function targetDestination(target, count = 1, anchor = cursor) {
  const start = normalizePosition(anchor, false);
  const lineLength = (lineIndex) => (lines[lineIndex] ?? '').length;

  switch (target.name) {
    case 'h':
      return normalizePosition(position(start.line, start.col - count), false);
    case 'l':
      return normalizePosition(position(start.line, start.col + count), false);
    case 'j':
    case 'gj':
      return normalizePosition(position(start.line + count, start.col), false);
    case 'k':
    case 'gk':
      return normalizePosition(position(start.line - count, start.col), false);
    case '+': {
      const line = clamp(start.line + count, 0, lines.length - 1);
      return position(line, firstNonBlankColumn(line));
    }
    case '-': {
      const line = clamp(start.line - count, 0, lines.length - 1);
      return position(line, firstNonBlankColumn(line));
    }
    case '_': {
      const line = clamp(start.line + count - 1, 0, lines.length - 1);
      return position(line, firstNonBlankColumn(line));
    }
    case 'g_': {
      const line = clamp(start.line + count - 1, 0, lines.length - 1);
      return position(line, lastNonBlankColumn(line));
    }
    case '^':
    case 'g^':
      return position(start.line, firstNonBlankColumn(start.line));
    case '0':
    case 'g0':
      return position(start.line, 0);
    case '$': {
      const line = clamp(start.line + count - 1, 0, lines.length - 1);
      return position(line, Math.max(0, lineLength(line) - 1));
    }
    case 'g$': {
      const line = clamp(start.line + count - 1, 0, lines.length - 1);
      return position(line, Math.max(0, lineLength(line) - 1));
    }
    case 'gm':
    case 'gM':
      return position(start.line, Math.max(0, Math.floor((lineLength(start.line) - 1) / 2)));
    case '|':
      return position(start.line, Math.max(0, count - 1));
    case 'w':
      return moveTokenForward(start, 'w', count, false);
    case 'W':
      return moveTokenForward(start, 'W', count, false);
    case 'b':
      return moveTokenBackward(start, 'w', count);
    case 'B':
      return moveTokenBackward(start, 'W', count);
    case 'e':
      return moveTokenForward(start, 'w', count, true);
    case 'E':
      return moveTokenForward(start, 'W', count, true);
    case 'ge':
      return moveTokenEndBackward(start, 'w', count);
    case 'gE':
      return moveTokenEndBackward(start, 'W', count);
    case 'gg':
      return position(clamp(count - 1, 0, lines.length - 1), firstNonBlankColumn(clamp(count - 1, 0, lines.length - 1)));
    case 'G': {
      const targetLine = target.explicitCount ? count - 1 : lines.length - 1;
      const line = clamp(targetLine, 0, lines.length - 1);
      return position(line, firstNonBlankColumn(line));
    }
    case 'H': {
      const line = clamp(count - 1, 0, lines.length - 1);
      return position(line, firstNonBlankColumn(line));
    }
    case 'M': {
      const line = Math.floor((lines.length - 1) / 2);
      return position(line, firstNonBlankColumn(line));
    }
    case 'L': {
      const line = clamp(lines.length - count, 0, lines.length - 1);
      return position(line, firstNonBlankColumn(line));
    }
    case '%':
      return target.explicitCount ? percentLineDestination(count) : matchingBracketDestination(start);
    case 'go':
      return byteOffsetDestination(count);
    case '[[':
    case ']]':
    case '[]':
    case '][':
      return sectionDestination(start, target.name, count);
    case '(':
      return sentenceDestination(start, -1, count);
    case ')':
      return sentenceDestination(start, 1, count);
    case '{':
      return paragraphDestination(start, -1, count);
    case '}':
      return paragraphDestination(start, 1, count);
    case 'f':
    case 'F':
    case 't':
    case 'T': {
      const found = findCharPosition(start, target.name, target.char, count);
      if (found) {
        lastCharSearch = { command: target.name, char: target.char };
        return normalizePosition(found, false);
      }
      return start;
    }
    case ';':
    case ',': {
      if (!lastCharSearch) return start;
      const command = target.name === ';' ? lastCharSearch.command : oppositeCharSearch(lastCharSearch.command);
      const found = findCharPosition(start, command, lastCharSearch.char, count);
      return found ? normalizePosition(found, false) : start;
    }
    case 'n':
    case 'N': {
      if (!lastSearch) return start;
      const direction = target.name === 'n' ? lastSearch.direction : -lastSearch.direction;
      return repeatSearchDestination(lastSearch.query, direction, count, lastSearch.wholeWord, start, lastSearch.offset);
    }
    case '*':
    case '#':
    case 'g*':
    case 'g#': {
      const query = currentSearchToken('w');
      if (!query) return start;
      const direction = target.name.includes('#') ? -1 : 1;
      return repeatSearchDestination(query, direction, count, !target.name.startsWith('g'), start, null);
    }
    default:
      return start;
  }
}

function targetIsLinewise(target) {
  return ['j', 'k', '+', '-', '_', 'gg', 'G', 'H', 'M', 'L'].includes(target.name)
    || (target.name === '%' && target.explicitCount);
}

function targetIsInclusive(target) {
  return ['e', 'E', 'ge', 'gE', '$', 'g$', 'g_', 'f', 'F', ';', ',', '%'].includes(target.name);
}

function motionRange(target, count) {
  const start = clonePosition(cursor);
  const destination = targetDestination(target, count, start);
  return rangeFromPositions(start, destination, {
    inclusive: targetIsInclusive(target),
    linewise: targetIsLinewise(target),
  });
}

function forcedMotionRange(target, count, forcedType) {
  if (!forcedType || forcedType === 'default') return motionRange(target, count);

  const start = clonePosition(cursor);
  const destination = targetDestination(target, count, start);

  if (forcedType === 'line') {
    return rangeFromPositions(start, destination, { linewise: true });
  }

  if (forcedType === 'block') {
    return blockRangeFromPositions(start, destination);
  }

  return rangeFromPositions(start, destination, {
    inclusive: targetIsInclusive(target),
    linewise: false,
  });
}

function moveByTarget(target, count) {
  cursor = targetDestination(target, count, cursor);
  clampCursor();
}

function lineRangeFromCursor(count) {
  return {
    type: 'line',
    startLine: cursor.line,
    endLine: clamp(cursor.line + count - 1, 0, lines.length - 1),
  };
}

function applyOperator(operator, range) {
  switch (operator) {
    case 'd':
      return deleteRange(range);
    case 'c':
      return changeRange(range);
    case 'y':
      return yankRange(range);
    case '>':
      return indentRange(range, 1);
    case '<':
      return indentRange(range, -1);
    case 'gu':
      return replaceRangeText(range, (value) => value.toLowerCase());
    case 'gU':
      return replaceRangeText(range, (value) => value.toUpperCase());
    default:
      return false;
  }
}

function operatorDetail(operator, targetName) {
  const actions = {
    d: 'Delete',
    c: 'Change',
    y: 'Yank',
    '>': 'Indent',
    '<': 'Outdent',
    gu: 'Lowercase',
    gU: 'Uppercase',
  };
  return `${actions[operator] ?? operator} ${targetName}`;
}

function parseCountAt(source, index) {
  if (!/[1-9]/.test(source[index] ?? '')) {
    return { count: 1, index, explicit: false };
  }

  let end = index;
  while (end < source.length && /\d/.test(source[end])) end += 1;

  const digits = source.slice(index, end);
  return {
    count: Math.max(1, Number.parseInt(digits, 10)),
    index: end,
    explicit: true,
  };
}

function parseOperatorAt(source, index) {
  if (source[index] === 'g') {
    if (index + 1 >= source.length) return { incomplete: true };
    const candidate = source.slice(index, index + 2);
    if (candidate === 'gu' || candidate === 'gU') {
      return { operator: candidate, index: index + 2 };
    }
    return null;
  }

  if (singleOperators.has(source[index])) {
    return { operator: source[index], index: index + 1 };
  }

  return null;
}

function parseForcedMotionAt(source, index) {
  if (source[index] === 'v') return { forcedType: 'char', index: index + 1 };
  if (source[index] === 'V') return { forcedType: 'line', index: index + 1 };
  if (source.slice(index, index + 3) === 'C-v') return { forcedType: 'block', index: index + 3 };
  return { forcedType: null, index };
}

function parseTargetAt(source, index, { allowTextObject = false } = {}) {
  const countPart = parseCountAt(source, index);
  let count = countPart.count;
  let cursorIndex = countPart.index;
  const explicitCount = countPart.explicit;

  if (cursorIndex >= source.length) {
    return explicitCount ? { incomplete: true } : null;
  }

  if (allowTextObject && (source[cursorIndex] === 'i' || source[cursorIndex] === 'a')) {
    if (cursorIndex + 1 >= source.length) return { incomplete: true };
    const object = source[cursorIndex + 1];
    if (!textObjectTargets.has(object)) return null;
    return {
      target: {
        type: 'textObject',
        variant: source[cursorIndex],
        object,
        name: `${source[cursorIndex]}${object}`,
      },
      count,
      index: cursorIndex + 2,
    };
  }

  const char = source[cursorIndex];
  if (char === 'g') {
    if (cursorIndex + 1 >= source.length) return { incomplete: true };
    const next = source[cursorIndex + 1];
    const targetName = {
      g: 'gg',
      0: 'g0',
      '^': 'g^',
      '$': 'g$',
      m: 'gm',
      M: 'gM',
      j: 'gj',
      k: 'gk',
      e: 'ge',
      E: 'gE',
      o: 'go',
      '*': 'g*',
      '#': 'g#',
      _: 'g_',
      n: 'gn',
      N: 'gN',
    }[next];

    if (!targetName) return null;
    return {
      target: { type: 'motion', name: targetName, explicitCount },
      count,
      index: cursorIndex + 2,
    };
  }

  if ('fFtT'.includes(char)) {
    if (cursorIndex + 1 >= source.length) return { incomplete: true };
    return {
      target: { type: 'motion', name: char, char: source[cursorIndex + 1] },
      count,
      index: cursorIndex + 2,
    };
  }

  if ('[]'.includes(char)) {
    if (cursorIndex + 1 >= source.length) return { incomplete: true };
    const targetName = source.slice(cursorIndex, cursorIndex + 2);
    if (!['[[', ']]', '[]', ']['].includes(targetName)) return null;
    return {
      target: { type: 'motion', name: targetName, explicitCount },
      count,
      index: cursorIndex + 2,
    };
  }

  if ('hjklwWbBeE0$^_+-|G;,%(){}HMLnN*#'.includes(char)) {
    return {
      target: { type: 'motion', name: char, explicitCount },
      count,
      index: cursorIndex + 1,
    };
  }

  return null;
}

function parseNormalCommand(tokens) {
  if (tokens.length === 1 && tokens[0].startsWith('C-')) {
    const token = tokens[0];
    if (['C-d', 'C-u', 'C-f', 'C-b', 'C-r', 'C-h', 'C-j', 'C-m', 'C-n', 'C-p', 'C-v'].includes(token)) {
      return { complete: true, command: { type: 'control', token } };
    }
    return { complete: true, command: { type: 'unknown', name: displayToken(token) } };
  }

  const source = tokens.join('');
  if (!source) return { incomplete: true };
  if (source === 'Escape') return { complete: true, command: { type: 'escape' } };

  let cursorIndex = 0;
  const leadingCount = parseCountAt(source, cursorIndex);
  const prefixCount = leadingCount.count;
  const explicitPrefixCount = leadingCount.explicit;
  cursorIndex = leadingCount.index;

  if (cursorIndex >= source.length) return { incomplete: true };

  const opParse = parseOperatorAt(source, cursorIndex);
  if (opParse?.incomplete) return { incomplete: true };

  if (opParse) {
    const operator = opParse.operator;
    cursorIndex = opParse.index;
    if (cursorIndex >= source.length) return { incomplete: true };

    const targetCountPart = parseCountAt(source, cursorIndex);
    const targetCount = targetCountPart.count;
    cursorIndex = targetCountPart.index;
    if (cursorIndex >= source.length) return { incomplete: true };

    const forcedMotion = parseForcedMotionAt(source, cursorIndex);
    const forcedType = forcedMotion.forcedType;
    cursorIndex = forcedMotion.index;
    if (cursorIndex >= source.length) return { incomplete: true };

    const doubled = (
      (operator.length === 1 && source[cursorIndex] === operator)
      || (operator === 'gu' && source.slice(cursorIndex, cursorIndex + 2) === 'gu')
      || (operator === 'gU' && source.slice(cursorIndex, cursorIndex + 2) === 'gU')
    );

    if (doubled) {
      const consumed = operator.length === 1 ? 1 : 2;
      if (cursorIndex + consumed !== source.length) return { complete: true, command: { type: 'unknown', name: source } };
      return {
        complete: true,
        command: {
          type: 'operator',
          operator,
          target: { type: 'line', name: `${operator}${operator}` },
          forcedType,
          count: prefixCount * targetCount,
          source,
        },
      };
    }

    const parsedTarget = parseTargetAt(source, cursorIndex, { allowTextObject: true });
    if (parsedTarget?.incomplete) return { incomplete: true };
    if (!parsedTarget || parsedTarget.index !== source.length) {
      return { complete: true, command: { type: 'unknown', name: source } };
    }
    if (targetCountPart.explicit) parsedTarget.target.explicitCount = true;

    return {
      complete: true,
      command: {
        type: 'operator',
        operator,
        target: parsedTarget.target,
        forcedType,
        count: prefixCount * targetCount * parsedTarget.count,
        source,
      },
    };
  }

  const simple = source[cursorIndex];
  if (cursorIndex + 1 === source.length && ['u', '.', 'x', 'X', 'D', 'C', 'Y', 'p', 'i', 'a', 'o', 'O', 'v', 'V'].includes(simple)) {
    return {
      complete: true,
      command: {
        type: 'simple',
        name: simple,
        count: prefixCount,
        source,
      },
    };
  }

  if (source === 'gv') {
    return {
      complete: true,
      command: {
        type: 'simple',
        name: 'gv',
        count: prefixCount,
        source,
      },
    };
  }

  const target = parseTargetAt(source, 0, { allowTextObject: false });
  if (target?.incomplete) return { incomplete: true };
  if (target && target.index === source.length) {
    return {
      complete: true,
      command: {
        type: 'motion',
        target: target.target,
        count: target.count,
        source,
      },
    };
  }

  if (source === 'g' || /^g[Uu]?$/.test(source) || /^[dcy><]$/.test(source)) {
    return { incomplete: true };
  }

  if (explicitPrefixCount && cursorIndex < source.length) {
    return { complete: true, command: { type: 'unknown', name: source } };
  }

  return { complete: true, command: { type: 'unknown', name: source } };
}

function commandRange(command) {
  if (command.target.type === 'line') {
    return lineRangeFromCursor(command.count);
  }

  if (command.target.type === 'textObject') {
    return textObjectRange(command.target);
  }

  if (command.target.name === 'gn' || command.target.name === 'gN') {
    if (!lastSearch) return null;
    const direction = command.target.name === 'gn' ? 1 : -1;
    return searchMatchRange(lastSearch.query, direction, cursor, lastSearch.wholeWord);
  }

  return forcedMotionRange(command.target, command.count, command.forcedType);
}

function selectSearchMatch(target, count) {
  if (!lastSearch) return false;
  const direction = target.name === 'gn' ? 1 : -1;
  let range = null;
  let anchor = cursor;

  for (let step = 0; step < count; step += 1) {
    range = searchMatchRange(lastSearch.query, direction, anchor, lastSearch.wholeWord, step === 0);
    if (!range) return false;
    anchor = direction > 0 ? range.end : retreatPosition(range.start, 1);
  }

  return setVisualSelectionFromRange(range);
}

function rememberChange(command) {
  if (!command?.source || command.source === '.') return;
  lastChangeCommand = command.source;
}

function runCommandSequence(sequence, { recordRepeat = true } = {}) {
  const previousPending = pendingTokens.slice();
  pendingTokens = [];
  for (const token of sequence) {
    pendingTokens.push(token);
    const parsed = parseNormalCommand(pendingTokens);
    if (parsed.complete) {
      executeParsedCommand(parsed.command, { recordRepeat });
      return true;
    }
  }
  pendingTokens = previousPending;
  return false;
}

function executeParsedCommand(command, { recordRepeat = true } = {}) {
  switch (command.type) {
    case 'escape':
      leaveVisualMode();
      pendingTokens = [];
      finishCommand('Esc', 'Back to normal mode');
      return;
    case 'control':
      runControlCommand(command);
      return;
    case 'motion':
      if (command.target.name === 'gn' || command.target.name === 'gN') {
        const selected = selectSearchMatch(command.target, command.count);
        pendingTokens = [];
        finishCommand(command.source, selected ? motionDetails[command.target.name] : 'No previous search match');
        return;
      }
      moveByTarget(command.target, command.count);
      pendingTokens = [];
      finishCommand(command.source, motionDetails[command.target.name] ?? 'Moved cursor');
      return;
    case 'operator': {
      const range = commandRange(command);
      const changed = applyOperator(command.operator, range);
      pendingTokens = [];
      if (changed && recordRepeat && command.operator !== 'y') rememberChange(command);
      finishCommand(command.source, changed ? operatorDetail(command.operator, command.target.name) : `No range for ${command.source}`);
      return;
    }
    case 'simple':
      runSimpleCommand(command, { recordRepeat });
      return;
    default:
      pendingTokens = [];
      finishCommand(command.name, 'No mapped action in this trainer');
  }
}

function runControlCommand(command) {
  pendingTokens = [];
  switch (command.token) {
    case 'C-h':
      moveByTarget({ type: 'motion', name: 'h' }, 1);
      finishCommand('Ctrl-h', 'Move left');
      return;
    case 'C-j':
    case 'C-n':
      moveByTarget({ type: 'motion', name: 'j' }, 1);
      finishCommand(displayToken(command.token), 'Move down');
      return;
    case 'C-m':
      moveByTarget({ type: 'motion', name: '+' }, 1);
      finishCommand('Ctrl-m', 'Move to the next line');
      return;
    case 'C-p':
      moveByTarget({ type: 'motion', name: 'k' }, 1);
      finishCommand('Ctrl-p', 'Move up');
      return;
    case 'C-d':
      moveVertical(2);
      finishCommand('Ctrl-d', 'Move half a page down');
      return;
    case 'C-u':
      moveVertical(-2);
      finishCommand('Ctrl-u', 'Move half a page up');
      return;
    case 'C-f':
      moveVertical(4);
      finishCommand('Ctrl-f', 'Move one page down');
      return;
    case 'C-b':
      moveVertical(-4);
      finishCommand('Ctrl-b', 'Move one page up');
      return;
    case 'C-r': {
      const redone = redoBuffer();
      finishCommand('Ctrl-r', redone ? 'Redid the next buffer edit' : 'Nothing to redo');
      return;
    }
    case 'C-v':
      enterVisualBlockMode();
      finishCommand('Ctrl-v', 'Enter visual block mode');
      return;
    default:
      finishCommand(displayToken(command.token), 'No mapped action in this trainer');
  }
}

function deleteCharacters(count, backward = false) {
  const line = currentLine();
  if (!line.length) return false;
  const start = backward ? position(cursor.line, Math.max(0, cursor.col - count)) : clonePosition(cursor);
  const end = backward ? clonePosition(cursor) : position(cursor.line, Math.min(line.length, cursor.col + count));
  return deleteRange({ type: 'char', start, end });
}

function runSimpleCommand(command, { recordRepeat = true } = {}) {
  let changed = false;
  pendingTokens = [];

  switch (command.name) {
    case 'u': {
      const undone = undoBuffer();
      finishCommand('u', undone ? 'Undo the last buffer edit' : 'Nothing to undo');
      return;
    }
    case '.':
      if (!lastChangeCommand) {
        finishCommand('.', 'No change to repeat');
        return;
      }
      runCommandSequence([...lastChangeCommand], { recordRepeat: false });
      finishCommand('.', `Repeated ${lastChangeCommand}`);
      return;
    case 'x':
      changed = deleteCharacters(command.count, false);
      break;
    case 'X':
      changed = deleteCharacters(command.count, true);
      break;
    case 'D':
      changed = applyOperator('d', motionRange({ type: 'motion', name: '$' }, 1));
      break;
    case 'C':
      changed = applyOperator('c', motionRange({ type: 'motion', name: '$' }, 1));
      break;
    case 'Y':
      changed = yankRange(lineRangeFromCursor(command.count));
      break;
    case 'p':
      for (let index = 0; index < command.count; index += 1) {
        const before = createSnapshot();
        pasteRegister();
        changed = changed || JSON.stringify(before.lines) !== JSON.stringify(lines);
      }
      break;
    case 'i':
      enterInsertMode();
      finishCommand('i', 'Enter insert mode before the cursor');
      return;
    case 'a':
      cursor.col = Math.min(currentLine().length, cursor.col + 1);
      enterInsertMode();
      finishCommand('a', 'Enter insert mode after the cursor');
      return;
    case 'o':
      openLine(1);
      changed = true;
      break;
    case 'O':
      openLine(0);
      changed = true;
      break;
    case 'v':
      enterVisualMode();
      finishCommand('v', 'Enter visual mode');
      return;
    case 'V':
      enterVisualLineMode();
      finishCommand('V', 'Enter visual line mode');
      return;
    case 'gv': {
      const restored = restorePreviousVisualSelection();
      finishCommand('gv', restored ? 'Reselected the previous visual area' : 'No previous visual selection');
      return;
    }
    default:
      finishCommand(command.name, 'No mapped action in this trainer');
      return;
  }

  if (changed && recordRepeat) rememberChange(command);
  finishCommand(command.source, changed ? 'Applied buffer change' : 'Nothing changed');
}

function deleteSelection() {
  const selection = orderedSelection();
  const lineSelection = orderedLineSelection();
  const blockSelection = orderedBlockSelection();
  if (!selection && !lineSelection && !blockSelection) return false;
  snapshotBuffer();
  registerValue = selectedText();

  if (mode === 'VISUAL BLOCK') {
    for (let lineIndex = blockSelection.startLine; lineIndex <= blockSelection.endLine; lineIndex += 1) {
      const line = lines[lineIndex] ?? '';
      lines[lineIndex] = line.slice(0, blockSelection.startCol) + line.slice(blockSelection.endCol + 1);
    }
    rememberVisualSelection();
    mode = 'NORMAL';
    visualAnchor = null;
    cursor = position(blockSelection.startLine, blockSelection.startCol);
    clampCursor();
    return true;
  }

  if (mode === 'VISUAL LINE') {
    const removedCount = lineSelection.endLine - lineSelection.startLine + 1;
    lines.splice(lineSelection.startLine, removedCount);
    if (!lines.length) lines.push('');
    rememberVisualSelection();
    mode = 'NORMAL';
    visualAnchor = null;
    cursor.line = Math.min(lineSelection.startLine, lines.length - 1);
    cursor.col = firstNonBlankColumn(cursor.line);
    clampCursor();
    return true;
  }

  if (selection.start.line === selection.end.line) {
    const line = lines[selection.start.line];
    lines[selection.start.line] = line.slice(0, selection.start.col) + line.slice(selection.end.col + 1);
  } else {
    const first = lines[selection.start.line].slice(0, selection.start.col);
    const last = lines[selection.end.line].slice(selection.end.col + 1);
    lines.splice(selection.start.line, selection.end.line - selection.start.line + 1, first + last);
  }

  rememberVisualSelection();
  mode = 'NORMAL';
  visualAnchor = null;
  cursor = { ...selection.start };
  if (!lines.length) lines.push('');
  clampCursor();
  return true;
}

function yankSelection() {
  registerValue = selectedText();
  rememberVisualSelection();
  mode = 'NORMAL';
  visualAnchor = null;
}

function insertCharacter(char) {
  snapshotBuffer();
  const line = currentLine();
  setCurrentLine(line.slice(0, cursor.col) + char + line.slice(cursor.col));
  cursor.col += char.length;
  clampCursor(true);
}

function insertNewline() {
  snapshotBuffer();
  const line = currentLine();
  const before = line.slice(0, cursor.col);
  const after = line.slice(cursor.col);
  lines.splice(cursor.line, 1, before, after);
  cursor.line += 1;
  cursor.col = 0;
}

function backspaceInsert() {
  if (cursor.col === 0 && cursor.line === 0) return;
  snapshotBuffer();

  if (cursor.col > 0) {
    const line = currentLine();
    setCurrentLine(line.slice(0, cursor.col - 1) + line.slice(cursor.col));
    cursor.col -= 1;
    return;
  }

  const previousLength = lines[cursor.line - 1].length;
  lines[cursor.line - 1] += currentLine();
  lines.splice(cursor.line, 1);
  cursor.line -= 1;
  cursor.col = previousLength;
}

function leaveInsertMode() {
  mode = 'NORMAL';
  if (cursor.col > 0) cursor.col -= 1;
  clampCursor(false);
}

function runSubstitution(command) {
  const match = command.match(/^:(%)?s\/([^/]+)\/([^/]*)\/g?$/);
  if (!match) return false;

  const [, allLines, needle, replacement] = match;
  const pattern = new RegExp(escapeRegExp(needle), 'g');
  snapshotBuffer();

  if (allLines) {
    lines = lines.map((line) => line.replace(pattern, replacement));
  } else {
    setCurrentLine(currentLine().replace(pattern, replacement));
  }

  clampCursor();
  return true;
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function runSearch(command) {
  const parsed = parseSearchCommand(command);
  const { query, direction, offset } = parsed;
  if (!query) return false;
  const found = searchPosition(query, direction, cursor);

  if (!found) return false;
  cursor = applySearchOffset(found, query, offset);
  lastSearch = { query, direction, wholeWord: false, offset: cloneSearchOffset(offset) };
  clampCursor();
  return true;
}

function runCommandLine(command) {
  commandEntry = null;
  pendingTokens = [];
  lastCommandLineDisplay = command;
  pushStreamToken(command, 'entry');

  if (command.startsWith('/') || command.startsWith('?')) {
    const parsed = parseSearchCommand(command);
    const queryLabel = parsed.query || command.slice(1);
    const found = runSearch(command);
    finishCommand(command, found ? `Found "${queryLabel}"` : `No match for "${queryLabel}"`);
    return;
  }

  if (runSubstitution(command)) {
    finishCommand(command, 'Substitution applied to the mini buffer');
    return;
  }

  const commandMessages = {
    ':w': 'Mini buffer saved',
    ':q': 'Quit requested',
    ':wq': 'Mini buffer saved and quit requested',
    ':help': 'Help opened for the current command context',
  };

  if (commandMessages[command]) {
    finishCommand(command, commandMessages[command]);
    return;
  }

  finishCommand(command, 'Command captured');
}

function finishCommand(name, detail) {
  setCommandStatus(name, detail);
  addCommandLog(name, detail);
  renderAll();
}

function setCommandStatus(name, detail) {
  commandName.textContent = name;
  commandDetail.textContent = detail;
}

function addCommandLog(name, detail) {
  commandLog.unshift({ name, detail });
  if (commandLog.length > 5) commandLog.pop();
}

function pushStreamToken(label, tone = 'key') {
  streamTokens.push({ label, tone });
  if (streamTokens.length > COMMAND_STREAM_LIMIT) streamTokens.shift();
  scheduleCommandStreamClear();
}

function cancelCommandStreamClear() {
  if (!commandStreamClearTimer) return;
  window.clearTimeout(commandStreamClearTimer);
  commandStreamClearTimer = null;
}

function scheduleCommandStreamClear(delay = COMMAND_STREAM_IDLE_MS) {
  cancelCommandStreamClear();
  commandStreamClearTimer = window.setTimeout(() => {
    commandStreamClearTimer = null;
    if (commandEntry) return;
    streamTokens.length = 0;
    renderCommandStream();
  }, delay);
}

function displayToken(token) {
  if (token === 'Escape') return 'Esc';
  if (token === 'Backspace') return 'Backspace';
  if (token === 'Enter') return 'Enter';
  if (token.startsWith('C-')) return `Ctrl-${token.slice(2).toUpperCase()}`;
  return token;
}

function parseVisualCommand(tokens) {
  const source = tokens.join('');
  if (!source) return { incomplete: true };

  if (source === 'Escape' || source === 'C-c') return { complete: true, command: { type: 'visual-escape', source } };
  if (source === 'C-v') {
    return { complete: true, command: { type: mode === 'VISUAL BLOCK' ? 'visual-toggle' : 'visual-block', source } };
  }
  if (source === 'v') {
    return { complete: true, command: { type: mode === 'VISUAL' ? 'visual-toggle' : 'visual-char', source } };
  }
  if (source === 'V') {
    return { complete: true, command: { type: mode === 'VISUAL LINE' ? 'visual-toggle' : 'visual-line', source } };
  }
  if (source === 'o') return { complete: true, command: { type: 'visual-other-end', source } };
  if (source === 'O') return { complete: true, command: { type: 'visual-other-corner', source } };
  if (['d', 'x', 'y', 'c'].includes(source)) {
    return { complete: true, command: { type: 'visual-action', action: source, source } };
  }

  const parsedTarget = parseTargetAt(source, 0, { allowTextObject: true });
  if (parsedTarget?.incomplete) return { incomplete: true };
  if (parsedTarget && parsedTarget.index === source.length) {
    return {
      complete: true,
      command: {
        type: 'visual-target',
        target: parsedTarget.target,
        count: parsedTarget.count,
        source,
      },
    };
  }

  if (/^\d+$/.test(source) || source === 'i' || source === 'a') return { incomplete: true };
  return { complete: true, command: { type: 'visual-unknown', source } };
}

function changeSelection() {
  if (mode === 'VISUAL BLOCK') {
    const changed = deleteSelection();
    if (!changed) return false;
    enterInsertMode();
    return true;
  }

  if (mode === 'VISUAL LINE') {
    const selection = orderedLineSelection();
    if (!selection) return false;
    const changed = deleteRange({ type: 'line', ...selection }, { preserveLine: true });
    if (!changed) return false;
    leaveVisualMode();
    enterInsertMode();
    return true;
  }

  const selection = orderedSelection();
  if (!selection) return false;
  deleteSelection();
  enterInsertMode();
  return true;
}

function executeVisualCommand(command) {
  pendingTokens = [];

  switch (command.type) {
    case 'visual-escape':
    case 'visual-toggle':
      leaveVisualMode();
      finishCommand(command.source === 'Escape' ? 'Esc' : command.source, 'Back to normal mode');
      return;
    case 'visual-char':
      switchVisualMode('VISUAL');
      finishCommand('v', 'Switched to visual mode');
      return;
    case 'visual-line':
      switchVisualMode('VISUAL LINE');
      finishCommand('V', 'Switched to visual line mode');
      return;
    case 'visual-block':
      switchVisualMode('VISUAL BLOCK');
      finishCommand('Ctrl-v', 'Switched to visual block mode');
      return;
    case 'visual-other-end': {
      const swapped = swapVisualEndpoint();
      finishCommand('o', swapped ? 'Moved to the other end of the visual selection' : 'No visual selection');
      return;
    }
    case 'visual-other-corner': {
      const swapped = swapVisualBlockColumnCorner();
      finishCommand('O', swapped ? 'Moved to the other visual corner' : 'No visual selection');
      return;
    }
    case 'visual-action':
      if (command.action === 'y') {
        yankSelection();
        finishCommand('y', 'Yanked the visual selection');
        return;
      }

      if (command.action === 'c') {
        const changed = changeSelection();
        finishCommand('c', changed ? 'Changed the visual selection' : 'No visual selection');
        return;
      }

      deleteSelection();
      finishCommand(command.action, 'Deleted the visual selection');
      return;
    case 'visual-target':
      if (command.target.type === 'textObject') {
        const selected = setVisualSelectionFromRange(textObjectRange(command.target));
        finishCommand(command.source, selected ? `Selected ${command.target.name}` : `No range for ${command.source}`);
        return;
      }

      if (command.target.name === 'gn' || command.target.name === 'gN') {
        const selected = selectSearchMatch(command.target, command.count);
        finishCommand(command.source, selected ? motionDetails[command.target.name] : 'No previous search match');
        return;
      }

      moveByTarget(command.target, command.count);
      finishCommand(command.source, motionDetails[command.target.name] ?? 'Extended visual selection');
      return;
    default:
      finishCommand(command.source, 'No visual-mode mapping in this trainer');
  }
}

function runVisualToken(token) {
  pushStreamToken(displayToken(token));
  pendingTokens.push(token);
  const parsed = parseVisualCommand(pendingTokens);

  if (parsed.incomplete) {
    setCommandStatus(`${pendingTokens.join('')}...`, 'Waiting for the next key');
    renderAll();
    return;
  }

  if (parsed.complete) {
    executeVisualCommand(parsed.command);
    return;
  }

  pendingTokens = [];
  finishCommand(displayToken(token), 'No mapped action in this trainer');
}

function runNormalToken(token) {
  if (isVisualMode()) {
    runVisualToken(token);
    return;
  }

  pushStreamToken(displayToken(token));
  pendingTokens.push(token);
  const parsed = parseNormalCommand(pendingTokens);

  if (parsed.incomplete) {
    setCommandStatus(`${pendingTokens.join('')}...`, 'Waiting for the next key');
    renderAll();
    return;
  }

  if (parsed.complete) {
    executeParsedCommand(parsed.command);
    return;
  }

  pendingTokens = [];
  finishCommand(displayToken(token), 'No mapped action in this trainer');
}

function startCommandEntry(prefix) {
  commandEntry = { prefix, value: '' };
  pendingTokens = [];
  streamTokens.length = 0;
  cancelCommandStreamClear();
  lastCommandLineDisplay = '';
  setCommandStatus(prefix === ':' ? 'Command line' : 'Search', `${prefix}_`);
  renderAll();
}

function handleCommandEntry(token, char) {
  if (token === 'Escape') {
    commandEntry = null;
    finishCommand('Esc', 'Command line canceled');
    return;
  }

  if (token === 'Backspace') {
    commandEntry.value = commandEntry.value.slice(0, -1);
    setCommandStatus(commandEntry.prefix === ':' ? 'Command line' : 'Search', `${commandEntry.prefix}${commandEntry.value}_`);
    renderAll();
    return;
  }

  if (token === 'Enter') {
    const command = commandEntry.prefix + commandEntry.value;
    runCommandLine(command);
    return;
  }

  if (char && char.length === 1 && !token.startsWith('C-')) {
    commandEntry.value += char;
    setCommandStatus(commandEntry.prefix === ':' ? 'Command line' : 'Search', `${commandEntry.prefix}${commandEntry.value}_`);
    renderAll();
  }
}

function handleInsertToken(token, char) {
  if (token === 'Escape') {
    leaveInsertMode();
    finishCommand('Esc', 'Back to normal mode');
    return;
  }

  if (token === 'Enter') {
    insertNewline();
    finishCommand('Enter', 'Inserted a line break');
    return;
  }

  if (token === 'Backspace') {
    backspaceInsert();
    finishCommand('Backspace', 'Deleted before the cursor');
    return;
  }

  if (char && char.length === 1 && !token.startsWith('C-')) {
    insertCharacter(char);
    setCommandStatus('-- INSERT --', 'Typing into the mini buffer');
    renderAll();
  }
}

function handleInput(token, char = token) {
  if (!token) return;

  if (commandEntry) {
    handleCommandEntry(token, char);
    return;
  }

  if (mode === 'INSERT') {
    handleInsertToken(token, char);
    return;
  }

  if (token === ':') {
    startCommandEntry(':');
    return;
  }

  if (token === '/' || token === '?') {
    startCommandEntry(token);
    return;
  }

  runNormalToken(token);
}

function renderCommandStream() {
  const tokens = streamTokens.slice();

  if (commandEntry) {
    tokens.push({
      label: `${commandEntry.prefix}${commandEntry.value}_`,
      tone: 'entry',
    });
  }

  if (!tokens.length) {
    commandStream.innerHTML = '';
    return;
  }

  commandStream.innerHTML = tokens.map(({ label, tone }) => {
    const toneClass = tone === 'entry'
      ? 'border-cyan-400 bg-cyan-400/10 text-cyan-100'
      : 'border-slate-600 bg-slate-800 text-slate-100';
    return `<span class="rounded border ${toneClass} px-2 py-1">${escapeHtml(label)}</span>`;
  }).join('');
}

function renderEditorLine(line, lineIndex) {
  const allowEndCursor = mode === 'INSERT';
  const needsCursorSpace = cursor.line === lineIndex && (allowEndCursor ? cursor.col >= line.length : !line.length);
  const blockSelection = mode === 'VISUAL BLOCK' ? orderedBlockSelection() : null;
  const blockNeedsSpace = blockSelection
    && lineIndex >= blockSelection.startLine
    && lineIndex <= blockSelection.endLine
    ? blockSelection.endCol + 1
    : 0;
  const renderLength = Math.max(line.length, needsCursorSpace ? cursor.col + 1 : 0, blockNeedsSpace, 1);
  let html = '';

  for (let colIndex = 0; colIndex < renderLength; colIndex += 1) {
    const rawChar = line[colIndex] ?? ' ';
    const char = rawChar === ' ' ? '&nbsp;' : escapeHtml(rawChar);
    const isCursor = cursor.line === lineIndex && cursor.col === colIndex;
    const isSelected = isVisualMode() && positionIsSelected(lineIndex, colIndex);

    if (isCursor) {
      html += `<span class="inline-block min-w-[0.6ch] rounded-sm bg-cyan-300 text-slate-950">${char}</span>`;
    } else if (isSelected) {
      html += `<span class="bg-cyan-800/80 text-cyan-50">${char}</span>`;
    } else {
      html += char;
    }
  }

  return `
    <div class="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-3 whitespace-pre">
      <span class="select-none text-right text-slate-600">${lineIndex + 1}</span>
      <span>${html}</span>
    </div>
  `;
}

function renderEditor() {
  miniEditor.innerHTML = lines.map(renderEditorLine).join('');
  editorStatus.textContent = `-- ${mode} --`;
  if (commandEntry) {
    miniCommandline.innerHTML = `<span class="text-cyan-300">${escapeHtml(commandEntry.prefix)}</span>${escapeHtml(commandEntry.value)}<span class="inline-block h-5 w-2 translate-y-1 bg-cyan-300"></span>`;
  } else if (lastCommandLineDisplay) {
    miniCommandline.textContent = lastCommandLineDisplay;
  } else {
    miniCommandline.innerHTML = '&nbsp;';
  }
}

function updateKeyboardForModifiers() {
  const ctrlInd = document.getElementById('ctrl-ind');
  const shiftInd = document.getElementById('shift-ind');

  if (ctrlInd) {
    ctrlInd.classList.toggle('border-cyan-300', ctrlDown);
    ctrlInd.classList.toggle('bg-cyan-500', ctrlDown);
    ctrlInd.classList.toggle('text-slate-950', ctrlDown);
    ctrlInd.classList.toggle('border-slate-600', !ctrlDown);
    ctrlInd.classList.toggle('bg-slate-800', !ctrlDown);
    ctrlInd.classList.toggle('text-slate-300', !ctrlDown);
  }

  if (shiftInd) {
    shiftInd.classList.toggle('border-cyan-300', shiftDown);
    shiftInd.classList.toggle('bg-cyan-500', shiftDown);
    shiftInd.classList.toggle('text-slate-950', shiftDown);
    shiftInd.classList.toggle('border-slate-600', !shiftDown);
    shiftInd.classList.toggle('bg-slate-800', !shiftDown);
    shiftInd.classList.toggle('text-slate-300', !shiftDown);
  }

  Object.keys(keyRefs).forEach((letter) => {
    const { letterSpan, hintSpan } = keyRefs[letter];

    if (ctrlDown) {
      letterSpan.textContent = `^${letter.toLowerCase()}`;
      hintSpan.textContent = ctrlVimHints[letter] ?? '';
    } else if (shiftDown) {
      letterSpan.textContent = letter;
      hintSpan.textContent = shiftVimHints[letter] ?? '';
    } else {
      letterSpan.textContent = letter.toLowerCase();
      hintSpan.textContent = vimHints[letter.toLowerCase()] ?? '';
    }
  });

  updatePressedTooltips();
}

function updatePressedTooltips() {
  pressedKeys.forEach((upper) => {
    const ref = keyRefs[upper];
    if (!ref?.tooltip) return;
    const tipKey = ctrlDown ? `C-${upper.toLowerCase()}` : shiftDown ? upper : upper.toLowerCase();
    const detail = vimDetails[tipKey] ?? (ctrlDown ? `Ctrl+${upper}` : '');
    ref.tooltip.textContent = detail;
    ref.tooltip.style.opacity = detail ? '1' : '0';
  });
}

function updateKeyFading() {
  Object.keys(keyRefs).forEach((letter) => {
    const key = document.getElementById(`key-${letter}`);
    if (!key) return;
    key.classList.toggle('opacity-40', pressedKeys.size > 0 && !pressedKeys.has(letter));
  });
}

function highlightKey(letter) {
  const upper = letter.toUpperCase();
  pressedKeys.add(upper);
  const key = document.getElementById(`key-${upper}`);

  if (key) {
    key.classList.add('bg-cyan-400', 'text-slate-950', 'scale-110', 'shadow-xl', 'shadow-cyan-500/30');
    key.classList.remove('bg-slate-800', 'text-white');
  }

  updatePressedTooltips();
  updateKeyFading();
}

function unhighlightKey(letter) {
  const upper = letter.toUpperCase();
  pressedKeys.delete(upper);
  const key = document.getElementById(`key-${upper}`);

  if (key) {
    key.classList.remove('bg-cyan-400', 'text-slate-950', 'scale-110', 'shadow-xl', 'shadow-cyan-500/30');
    key.classList.add('bg-slate-800', 'text-white');
  }

  const ref = keyRefs[upper];
  if (ref?.tooltip) ref.tooltip.style.opacity = '0';
  updateKeyFading();
}

function renderAll() {
  clampCursor(mode === 'INSERT');
  renderCommandStream();
  renderEditor();
  updateKeyboardForModifiers();
}

function createModifierButton(id, label, onClick) {
  const button = document.createElement('button');
  button.id = id;
  button.type = 'button';
  button.textContent = label;
  button.className = 'rounded border border-slate-600 bg-slate-800 px-3 py-2 font-mono text-xs font-bold uppercase tracking-[0.18em] text-slate-300 transition hover:border-cyan-300 hover:text-white';
  button.addEventListener('click', onClick);
  return button;
}

function createKeyboard() {
  const kbContainer = document.createElement('div');
  kbContainer.className = 'flex w-full flex-col items-center gap-2 sm:gap-3';

  rows.forEach((row, rowIndex) => {
    const rowDiv = document.createElement('div');
    rowDiv.className = `flex flex-row justify-center gap-1 sm:gap-2 md:gap-3 ${rowIndex === 1 ? 'translate-x-2 sm:translate-x-4 md:translate-x-5' : ''} ${rowIndex === 2 ? 'translate-x-4 sm:translate-x-8 md:translate-x-10' : ''}`;

    row.forEach((letter) => {
      const key = document.createElement('button');
      key.id = `key-${letter}`;
      key.type = 'button';
      key.className = 'key relative flex h-10 w-8 select-none flex-col items-center justify-center rounded-lg border border-slate-700 bg-slate-800 text-lg font-black text-white shadow-lg shadow-slate-950/40 transition duration-75 focus:outline-none focus:ring-2 focus:ring-cyan-300 sm:h-12 sm:w-12 sm:text-xl md:h-16 md:w-16 md:text-2xl';
      key.setAttribute('aria-label', `Vim key ${letter}`);

      const letterSpan = document.createElement('span');
      letterSpan.textContent = letter.toLowerCase();
      letterSpan.className = 'block leading-none';
      key.appendChild(letterSpan);

      const hintSpan = document.createElement('span');
      hintSpan.className = 'mt-1 hidden min-h-4 px-1 text-center text-[0.65rem] font-medium leading-4 text-slate-400 sm:block md:text-xs';
      hintSpan.textContent = vimHints[letter.toLowerCase()] ?? '';
      key.appendChild(hintSpan);

      const tooltip = document.createElement('div');
      tooltip.className = 'tooltip pointer-events-none absolute -top-10 left-1/2 z-20 max-w-56 -translate-x-1/2 whitespace-nowrap rounded bg-slate-950 px-2 py-1 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity duration-150';
      key.appendChild(tooltip);

      key.addEventListener('pointerdown', () => {
        const token = ctrlDown ? `C-${letter.toLowerCase()}` : shiftDown ? letter : letter.toLowerCase();
        const char = token.length === 1 ? token : '';
        highlightKey(letter);
        handleInput(token, char);
        window.setTimeout(() => unhighlightKey(letter), 140);
      });

      keyRefs[letter] = { letterSpan, hintSpan, tooltip };
      rowDiv.appendChild(key);
    });

    kbContainer.appendChild(rowDiv);
  });

  keyboard.appendChild(kbContainer);
}

function eventToInput(event) {
  if (['Control', 'Shift', 'Alt', 'Meta', 'CapsLock'].includes(event.key)) return null;

  if (event.key === 'Escape') return { token: 'Escape', char: '', prevent: true };
  if (event.key === 'Enter') return { token: 'Enter', char: '\n', prevent: true };
  if (event.key === 'Backspace') return { token: 'Backspace', char: '', prevent: true };

  if (event.ctrlKey && /^[a-zA-Z]$/.test(event.key)) {
    return { token: `C-${event.key.toLowerCase()}`, char: '', prevent: true };
  }

  if (event.key.length === 1) {
    return { token: event.key, char: event.key, prevent: true };
  }

  return null;
}

function resetEditor() {
  lines = initialLines.slice();
  cursor = { line: 1, col: 4 };
  mode = 'NORMAL';
  registerValue = '';
  visualAnchor = null;
  previousVisualSelection = null;
  undoStack.length = 0;
  redoStack.length = 0;
  lastChangeCommand = '';
  lastCharSearch = null;
  lastSearch = null;
  lastCommandLineDisplay = '';
  finishCommand('Reset', 'Mini buffer restored');
}

function hydrateCommandExamples() {
  document.querySelectorAll('.command-example').forEach((button) => {
    button.addEventListener('click', () => {
      const command = button.getAttribute('data-command');
      const keyData = button.getAttribute('data-keys');
      if (!command && !keyData) return;

      if (keyData) {
        keyData.split(/\s+/).filter(Boolean).forEach((token) => handleInput(token, token.length === 1 ? token : ''));
      } else if (command.startsWith(':') || command.startsWith('/') || command.startsWith('?')) {
        runCommandLine(command);
      } else {
        [...command].forEach((token) => handleInput(token, token));
      }
    });
  });
}

function installTrainerTestApi() {
  window.__vimTrainer = {
    getState: () => ({
      lines: lines.slice(),
      cursor: { ...cursor },
      mode,
      registerValue,
      undoDepth: undoStack.length,
      redoDepth: redoStack.length,
      lastCharSearch: lastCharSearch ? { ...lastCharSearch } : null,
      lastSearch: lastSearch ? { ...lastSearch } : null,
      lastChangeCommand,
      commandLine: miniCommandline.textContent,
      commandName: commandName.textContent,
      commandDetail: commandDetail.textContent,
      history: commandLog.map((item) => ({ ...item })),
    }),
    input: (tokens) => {
      const normalized = Array.isArray(tokens) ? tokens : [...String(tokens)];
      normalized.forEach((token) => handleInput(token, token.length === 1 ? token : ''));
      return window.__vimTrainer.getState();
    },
    reset: () => {
      resetEditor();
      return window.__vimTrainer.getState();
    },
  };
}

function init() {
  modifierControls.append(
    createModifierButton('ctrl-ind', 'Ctrl', () => {
      ctrlDown = !ctrlDown;
      updateKeyboardForModifiers();
    }),
    createModifierButton('shift-ind', 'Shift', () => {
      shiftDown = !shiftDown;
      updateKeyboardForModifiers();
    }),
  );

  createKeyboard();
  hydrateCommandExamples();
  resetEditorButton.addEventListener('click', resetEditor);
  installTrainerTestApi();

  window.addEventListener('keydown', (event) => {
    const nextCtrl = event.ctrlKey;
    const nextShift = event.shiftKey;
    const modifierChanged = nextCtrl !== ctrlDown || nextShift !== shiftDown;
    ctrlDown = nextCtrl;
    shiftDown = nextShift;
    if (modifierChanged) updateKeyboardForModifiers();

    const input = eventToInput(event);
    if (!input) return;
    if (input.prevent) event.preventDefault();
    if (event.repeat && mode !== 'INSERT') return;

    if (/^[a-zA-Z]$/.test(event.key)) highlightKey(event.key);
    handleInput(input.token, input.char);
  });

  window.addEventListener('keyup', (event) => {
    const nextCtrl = event.ctrlKey;
    const nextShift = event.shiftKey;
    const modifierChanged = nextCtrl !== ctrlDown || nextShift !== shiftDown;
    ctrlDown = nextCtrl;
    shiftDown = nextShift;
    if (modifierChanged) updateKeyboardForModifiers();

    if (/^[a-zA-Z]$/.test(event.key)) unhighlightKey(event.key);
  });

  window.addEventListener('blur', () => {
    pressedKeys.clear();
    shiftDown = false;
    ctrlDown = false;
    Object.keys(keyRefs).forEach(unhighlightKey);
    updateKeyboardForModifiers();
  });

  renderAll();
}

init();

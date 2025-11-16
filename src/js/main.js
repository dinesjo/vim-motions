// Detailed Vim motion explanations for tooltips
const vimDetails = {
  'a': 'Insert after cursor',
  'A': 'Insert at end of line',
  'b': 'Back to previous word',
  'B': 'Back to previous WORD',
  'c': 'Change (delete + insert)',
  'C': 'Change to end of line',
  'd': 'Delete (with motion)',
  'D': 'Delete to end of line',
  'e': 'End of word',
  'E': 'End of WORD',
  'f': 'Find character right',
  'F': 'Find character left',
  'g': 'Various motions (e.g. gg, g_)',
  'G': 'Go to line / end of file',
  'h': 'Left',
  'H': 'Top of screen',
  'i': 'Insert before cursor',
  'I': 'Insert at start of line',
  'j': 'Down',
  'J': 'Join lines',
  'k': 'Up',
  'K': 'Keyword help',
  'l': 'Right',
  'L': 'Bottom of screen',
  'm': 'Set mark (m{a-z})',
  'M': 'Move cursor to middle of screen',
  'n': 'Next search result',
  'N': 'Previous search result',
  'o': 'Open line below',
  'O': 'Open line above',
  'p': 'Paste after cursor',
  'P': 'Paste before cursor',
  'q': 'Record macro',
  'Q': 'Ex mode',
  'r': 'Replace one character',
  'R': 'Replace mode',
  's': 'Substitute character',
  'S': 'Substitute line',
  't': 'Till character right',
  'T': 'Till character left',
  'u': 'Undo',
  'U': 'Restore line',
  'v': 'Visual mode',
  'V': 'Visual line mode',
  'w': 'Next word',
  'W': 'Next WORD',
  'x': 'Delete character under cursor',
  'X': 'Delete character before cursor',
  'y': 'Yank (copy)',
  'Y': 'Yank line',
  'z': 'Scroll/center screen',
  'Z': 'Prefix for ZZ (save+quit) or ZQ (quit)',
  // Ctrl combinations
  'C-a': 'Increment number under cursor',
  'C-b': 'Page up / scroll back full screen',
  'C-c': 'Interrupt / cancel current command',
  'C-d': 'Scroll half page down',
  'C-e': 'Scroll down one line',
  'C-f': 'Page down / scroll forward full screen',
  'C-g': 'Show file information',
  'C-h': 'Backspace (delete char before cursor)',
  'C-i': 'Jump to newer cursor position',
  'C-j': 'Move down (same as j)',
  'C-k': 'Digraph entry',
  'C-l': 'Redraw screen',
  'C-m': 'Enter / move to first char of next line',
  'C-n': 'Next autocomplete suggestion',
  'C-o': 'Jump to older cursor position',
  'C-p': 'Previous autocomplete suggestion',
  'C-q': 'Visual block mode (in some terminals)',
  'C-r': 'Redo',
  'C-s': 'Stop output (terminal flow control)',
  'C-t': 'Jump to older tag position',
  'C-u': 'Scroll half page up',
  'C-v': 'Visual block mode',
  'C-w': 'Window commands prefix',
  'C-x': 'Decrement number under cursor',
  'C-y': 'Scroll up one line',
  'C-z': 'Suspend Vim',
};


// Vim motion hints for relevant keys (normal)
const vimHints = {
  'h': '←',
  'j': '↓',
  'k': '↑',
  'l': '→',
  'w': 'word →',
  'b': 'word ←',
  'e': 'end →',
  '0': 'line ←',
  '$': 'line →',
  'g': 'goto',
  'f': 'find',
  't': 'till',
  'x': 'del',
  'd': 'delete',
  'c': 'change',
  'y': 'yank',
  'p': 'paste',
  'u': 'undo',
  'o': 'open below',
  'i': 'insert',
  'a': 'append',
  'n': 'next',
  'm': 'mark',
  's': 'sub',
  'r': 'replace',
  'q': 'record',
  'z': 'center',
  'v': 'visual',
};

// Vim motion hints for Shift+key (visual clues for beginners)
const shiftVimHints = {
  'H': 'top screen',
  'J': 'join lines',
  'K': 'help',
  'L': 'bottom screen',
  'W': 'WORD →',
  'B': 'WORD ←',
  'E': 'END →',
  'G': 'bottom',
  'F': 'find left',
  'T': 'till left',
  'X': 'del before',
  'D': 'delete to end',
  'C': 'change to end',
  'Y': 'yank line',
  'P': 'paste before',
  'U': 'restore line',
  'O': 'open above',
  'I': 'insert line',
  'A': 'append line',
  'N': 'prev search',
  'M': 'middle',
  'S': 'sub line',
  'R': 'replace mode',
  'Q': '',
  'Z': 'save/quit',
  'V': 'visual line',
};

// Vim motion hints for Ctrl+key (visual clues for beginners)
const ctrlVimHints = {
  'R': 'redo',
  'F': 'page down',
  'D': 'half down',
  'U': 'half up',
  'O': 'older pos',
  'G': 'file info',
  'E': 'scroll ↓',
  'Y': 'scroll ↑',
  'P': 'prev auto',
  'N': 'next auto',
  'L': 'redraw',
  'C': 'interrupt',
  'A': 'incr num',
  'X': 'decr num',
  'T': 'tag jump',
  'S': '',
  'Q': '',
  'V': 'visual block',
  'J': '',
  'K': '',
  'B': 'page up',
  'W': 'window',
  'Z': 'suspend',
  'M': 'newline',
  'I': 'newer pos',
  'H': 'backspace',
};

const rows = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
];

const keyboard = document.getElementById('keyboard');

// Create keyboard layout
const kbContainer = document.createElement('div');
kbContainer.className = 'flex flex-col gap-4';


// Store references to letter and hint spans for dynamic updates
const keyRefs = {};

// Add a visual indicator for Ctrl/Shift
const indicator = document.createElement('div');
indicator.className = 'absolute top-4 left-1/2 -translate-x-1/2 flex gap-4 z-10';
indicator.innerHTML = `
  <span id="ctrl-ind" class="px-3 py-1 rounded bg-gray-700 text-gray-300 text-sm font-mono opacity-60">Ctrl</span>
  <span id="shift-ind" class="px-3 py-1 rounded bg-gray-700 text-gray-300 text-sm font-mono opacity-60">Shift</span>
`;
document.body.appendChild(indicator);
const ctrlInd = document.getElementById('ctrl-ind');
const shiftInd = document.getElementById('shift-ind');


rows.forEach((row, i) => {
  const rowDiv = document.createElement('div');
  rowDiv.className = 'flex flex-row gap-4 justify-center';
  row.forEach(letter => {
    const key = document.createElement('div');
    key.id = `key-${letter}`;
    key.className =
      'key w-20 h-20 flex flex-col items-center justify-center rounded-lg text-3xl font-bold bg-gray-800 text-white shadow transition-all duration-75 select-none relative';

    // Letter (default: lowercase)
    const letterSpan = document.createElement('span');
    letterSpan.textContent = letter.toLowerCase();
    letterSpan.className = 'block';
    key.appendChild(letterSpan);

    // Vim hint (if any)
    const hintSpan = document.createElement('span');
    hintSpan.className = 'block text-xs text-gray-400 mt-1 font-normal';
    if (vimHints[letter.toLowerCase()]) {
      hintSpan.textContent = vimHints[letter.toLowerCase()];
    } else {
      hintSpan.textContent = '';
    }
    key.appendChild(hintSpan);

    // Tooltip element (hidden by default)
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip absolute left-1/2 -translate-x-1/2 -top-3/4 bg-gray-800 text-white text-xs rounded px-2 py-1 shadow-lg opacity-0 pointer-events-none transition-opacity duration-150 z-20 whitespace-nowrap';
    tooltip.style.maxWidth = '200px';
    key.appendChild(tooltip);

    // Store refs for dynamic update
    keyRefs[letter] = { letterSpan, hintSpan, tooltip };

    rowDiv.appendChild(key);
  });
  kbContainer.appendChild(rowDiv);
});

keyboard.appendChild(kbContainer);


// Track modifier state
let shiftDown = false;
let ctrlDown = false;




function updateKeyboardForModifiers() {
  // Visual indicator
  ctrlInd.style.opacity = ctrlDown ? '1' : '0.6';
  ctrlInd.style.background = ctrlDown ? '#2563eb' : '#374151';
  ctrlInd.style.color = ctrlDown ? '#fff' : '#d1d5db';
  shiftInd.style.opacity = shiftDown ? '1' : '0.6';
  shiftInd.style.background = shiftDown ? '#2563eb' : '#374151';
  shiftInd.style.color = shiftDown ? '#fff' : '#d1d5db';

  Object.keys(keyRefs).forEach(letter => {
    const { letterSpan, hintSpan } = keyRefs[letter];
    // Ctrl + Shift
    if (ctrlDown && shiftDown) {
      letterSpan.textContent = `^${letter}`;
      if (ctrlVimHints[letter]) {
        hintSpan.textContent = ctrlVimHints[letter] + ' (shift)';
      } else if (shiftVimHints[letter]) {
        hintSpan.textContent = shiftVimHints[letter];
      } else {
        hintSpan.textContent = '';
      }
    }
    // Ctrl only
    else if (ctrlDown) {
      letterSpan.textContent = `^${letter.toLowerCase()}`;
      if (ctrlVimHints[letter]) {
        hintSpan.textContent = ctrlVimHints[letter];
      } else {
        hintSpan.textContent = '';
      }
    }
    // Shift only
    else if (shiftDown) {
      letterSpan.textContent = letter;
      if (shiftVimHints[letter]) {
        hintSpan.textContent = shiftVimHints[letter];
      } else {
        hintSpan.textContent = '';
      }
    }
    // Neither
    else {
      letterSpan.textContent = letter.toLowerCase();
      if (vimHints[letter.toLowerCase()]) {
        hintSpan.textContent = vimHints[letter.toLowerCase()];
      } else {
        hintSpan.textContent = '';
      }
    }
  });

  // Update tooltips for all currently pressed keys
  pressedKeys.forEach(upper => {
    const ref = keyRefs[upper];
    if (ref && ref.tooltip) {
      let tipKey;
      if (ctrlDown && shiftDown) tipKey = `C-${upper.toLowerCase()}`;
      else if (ctrlDown) tipKey = `C-${upper.toLowerCase()}`;
      else if (shiftDown) tipKey = upper;
      else tipKey = upper.toLowerCase();
      let detail = vimDetails[tipKey];
      if (!detail && ctrlDown) detail = `Ctrl+${upper}`;
      if (detail) {
        ref.tooltip.textContent = detail;
        ref.tooltip.style.opacity = '1';
      } else {
        ref.tooltip.style.opacity = '0';
      }
    }
  });
}


// Track currently pressed keys
const pressedKeys = new Set();

function updateKeyFading() {
  // If no keys are pressed, remove fading from all
  if (pressedKeys.size === 0) {
    Object.keys(keyRefs).forEach(l => {
      const key = document.getElementById(`key-${l}`);
      if (key) key.classList.remove('opacity-40');
    });
    return;
  }
  // Fade all keys not pressed
  Object.keys(keyRefs).forEach(l => {
    const key = document.getElementById(`key-${l}`);
    if (key) {
      if (pressedKeys.has(l)) {
        key.classList.remove('opacity-40');
      } else {
        key.classList.add('opacity-40');
      }
    }
  });
}

function highlightKey(letter) {
  const upper = letter.toUpperCase();
  pressedKeys.add(upper);
  const key = document.getElementById(`key-${upper}`);
  if (key) {
    key.classList.add('bg-blue-500', 'text-white', 'scale-110', 'shadow-lg');
    key.classList.remove('bg-gray-800');
    // Tooltip logic
    const ref = keyRefs[upper];
    if (ref && ref.tooltip) {
      // Determine which tooltip to show based on modifiers
      let tipKey;
      if (ctrlDown && shiftDown) tipKey = `C-${upper.toLowerCase()}`;
      else if (ctrlDown) tipKey = `C-${upper.toLowerCase()}`;
      else if (shiftDown) tipKey = upper;
      else tipKey = letter.toLowerCase();
      let detail = vimDetails[tipKey];
      // Fallback for Ctrl: show "Ctrl+<letter>" if no detail
      if (!detail && ctrlDown) detail = `Ctrl+${upper}`;
      if (detail) {
        ref.tooltip.textContent = detail;
        ref.tooltip.style.opacity = '1';
      }
    }
  }
  updateKeyFading();
}

function unhighlightKey(letter) {
  const upper = letter.toUpperCase();
  pressedKeys.delete(upper);
  const key = document.getElementById(`key-${upper}`);
  if (key) {
    key.classList.remove('bg-blue-500', 'scale-110', 'shadow-lg');
    key.classList.add('bg-gray-800');
    // Hide tooltip
    const ref = keyRefs[upper];
    if (ref && ref.tooltip) {
      ref.tooltip.style.opacity = '0';
    }
  }
  updateKeyFading();
}




window.addEventListener('keydown', e => {
  // Prevent browser tab close/reload shortcuts
  if (e.ctrlKey && (e.key === 'r' || e.key === 'R')) {
    e.preventDefault();
  }
  // Prevent Ctrl+Shift+T (reopen closed tab)
  if (e.ctrlKey && e.shiftKey && (e.key === 't' || e.key === 'T')) {
    e.preventDefault();
  }

  let changed = false;

  // Update modifier state from event properties (standard best practice)
  const newCtrlDown = e.ctrlKey;
  const newShiftDown = e.shiftKey;

  if (newCtrlDown !== ctrlDown) {
    ctrlDown = newCtrlDown;
    changed = true;
  }
  if (newShiftDown !== shiftDown) {
    shiftDown = newShiftDown;
    changed = true;
  }

  if (changed) updateKeyboardForModifiers();
  if (e.repeat) return;
  if (/^[a-zA-Z]$/.test(e.key)) {
    highlightKey(e.key);
  }
});

window.addEventListener('keyup', e => {
  let changed = false;

  // Update modifier state from event properties
  const newCtrlDown = e.ctrlKey;
  const newShiftDown = e.shiftKey;

  if (newCtrlDown !== ctrlDown) {
    ctrlDown = newCtrlDown;
    changed = true;
  }
  if (newShiftDown !== shiftDown) {
    shiftDown = newShiftDown;
    changed = true;
  }

  if (changed) updateKeyboardForModifiers();
  if (/^[a-zA-Z]$/.test(e.key)) {
    unhighlightKey(e.key);
  }
});

// Initialize indicator and keyboard
updateKeyboardForModifiers();

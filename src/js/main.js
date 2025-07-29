// Detailed Vim motion explanations for tooltips
const vimDetails = {
  'a': 'Enter insert mode after cursor',
  'A': 'Insert at end of line',
  'b': 'Move to previous word',
  'B': 'Move to previous WORD',
  'c': 'Change (delete then insert)',
  'C': 'Change to end of line',
  'd': 'Delete',
  'D': 'Delete to end of line',
  'e': 'Move to end of word',
  'E': 'Move to end of WORD',
  'f': 'Find character to the right',
  'F': 'Find character to the left',
  'g': 'Go to (various motions)',
  'G': 'Go to bottom of file',
  'h': 'Move left',
  'H': 'Move to top of screen',
  'i': 'Enter insert mode before cursor',
  'I': 'Insert at start of line',
  'j': 'Move down',
  'J': 'Join lines',
  'k': 'Move up',
  'K': 'Show documentation',
  'l': 'Move right',
  'L': 'Move to bottom of screen',
  'n': 'Repeat last search',
  'N': 'Repeat last search (opposite)',
  'o': 'Open new line below',
  'O': 'Open new line above',
  'p': 'Paste after cursor',
  'P': 'Paste before cursor',
  'q': 'Record macro',
  'Q': 'Ex mode',
  'r': 'Replace single character',
  'R': 'Replace mode',
  's': 'Substitute character',
  'S': 'Substitute line',
  't': 'To character (right)',
  'T': 'To character (left)',
  'u': 'Undo',
  'U': 'Redo',
  'v': 'Visual mode',
  'V': 'Visual line mode',
  'w': 'Move to next word',
  'W': 'Move to next WORD',
  'x': 'Delete character under cursor',
  'X': 'Delete character before cursor',
  'y': 'Yank (copy)',
  'Y': 'Yank line',
  'z': 'Center screen',
  'Z': 'Save and quit',
};


// Vim motion hints for relevant keys (normal)
const vimHints = {
  'h': '←', // left
  'j': '↓', // down
  'k': '↑', // up
  'l': '→', // right
  'w': 'word →',
  'b': 'word ←',
  'e': 'end →',
  '0': 'line ←',
  '$': 'line →',
  'g': 'goto',
  'f': 'find',
  't': 'to',
  'x': 'del ←',
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
  'z': 'zz',
  'v': 'visual',
};

// Vim motion hints for Shift+key (visual clues for beginners)
const shiftVimHints = {
  'H': 'top line',
  'J': 'join lines',
  'K': 'prev file',
  'L': 'last line',
  'W': 'WORD →',
  'B': 'WORD ←',
  'E': 'END →',
  'G': 'bottom',
  'F': 'Find (back)',
  'T': 'To (back)',
  'X': 'del ← (upper)',
  'D': 'delete to end',
  'C': 'change to end',
  'Y': 'yank line',
  'P': 'Paste before',
  'U': 'redo',
  'O': 'open above',
  'I': 'insert line',
  'A': 'append line',
  'N': 'prev',
  'M': 'Mark (set)',
  'S': 'sub line',
  'R': 'replace mode',
  'Q': 'Ex mode',
  'Z': 'save/quit',
  'V': 'visual line',
};

// Vim motion hints for Ctrl+key (visual clues for beginners)
const ctrlVimHints = {
  'R': 'redo',
  'F': 'find file',
  'D': 'scroll down',
  'U': 'scroll up',
  'O': 'open file',
  'G': 'go to top',
  'E': 'ex mode',
  'Y': 'yank line',
  'P': 'put register',
  'N': 'next search',
  'L': 'redraw',
  'C': 'interrupt',
  'A': 'insert line above',
  'X': 'del char',
  'T': 'new tab',
  'S': 'substitute',
  'Q': 'quit',
  'V': 'visual block',
  'J': 'join lines',
  'K': 'help',
  'B': 'back word',
  'W': 'forward word',
  'Z': 'suspend',
  'M': 'mark',

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
      let tipKey = upper;
      if (ctrlDown && shiftDown) tipKey = upper;
      else if (ctrlDown) tipKey = upper.toLowerCase();
      else if (shiftDown) tipKey = upper;
      else tipKey = upper.toLowerCase();
      let detail = vimDetails[tipKey];
      if (ctrlDown && !detail) detail = `Ctrl+${upper}`;
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
      let tipKey = letter;
      if (ctrlDown && shiftDown) tipKey = upper;
      else if (ctrlDown) tipKey = letter.toLowerCase();
      else if (shiftDown) tipKey = upper;
      else tipKey = letter.toLowerCase();
      let detail = vimDetails[tipKey];
      // Fallback for Ctrl: show "Ctrl+<letter>" if no detail
      if (ctrlDown && !detail) detail = `Ctrl+${upper}`;
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
  if (e.key === 'Shift') {
    if (!shiftDown) {
      shiftDown = true;
      changed = true;
    }
  }
  if (e.key === 'Control') {
    if (!ctrlDown) {
      ctrlDown = true;
      changed = true;
    }
  }
  if (changed) updateKeyboardForModifiers();
  if (e.repeat) return;
  if (/^[a-zA-Z]$/.test(e.key)) {
    highlightKey(e.key);
  }
});

window.addEventListener('keyup', e => {
  let changed = false;
  if (e.key === 'Shift') {
    if (shiftDown) {
      shiftDown = false;
      changed = true;
    }
  }
  if (e.key === 'Control') {
    if (ctrlDown) {
      ctrlDown = false;
      changed = true;
    }
  }
  if (changed) updateKeyboardForModifiers();
  if (/^[a-zA-Z]$/.test(e.key)) {
    unhighlightKey(e.key);
  }
});

// Initialize indicator and keyboard
updateKeyboardForModifiers();

// Run against the Docker image served on localhost:8096 by default:
// /Users/linus/.codex/skills/playwright/scripts/playwright_cli.sh -s=vim-final run-code "$(cat tests/e2e-vim-trainer.js)"
(async (page) => {
  const url = typeof process !== 'undefined' && process.env?.VIM_MOTIONS_E2E_URL
    ? process.env.VIM_MOTIONS_E2E_URL
    : 'http://localhost:8096';
  await page.goto(url);
  await page.waitForSelector('#keyboard');

  const failures = [];
  let checks = 0;

  async function state() {
    return page.evaluate(() => window.__vimTrainer.getState());
  }

  function check(condition, message, data) {
    checks += 1;
    if (!condition) failures.push({ message, data });
  }

  async function reset() {
    await page.click('#reset-editor');
  }

  async function type(command) {
    await page.keyboard.type(command);
  }

  async function press(key) {
    await page.keyboard.press(key);
  }

  await reset();
  await type('gg0_');
  let current = await state();
  check(current.cursor.line === 0 && current.cursor.col === 2, '_ moves to first non-blank on an indented line', current);

  await type('$+-5|');
  current = await state();
  check(current.cursor.line === 0 && current.cursor.col === 4, '$, +, -, and | compose as line motions', current);

  await reset();
  await type('g_');
  current = await state();
  check(current.cursor.line === 1 && current.lines[1][current.cursor.col] === ';', 'g_ moves to the last non-blank character', current);

  await reset();
  await type('3w');
  current = await state();
  check(current.commandName === '3w' && current.cursor.line >= 1, 'counted 3w resolves', current);

  await reset();
  await type('ge');
  current = await state();
  check(current.cursor.line === 1 && current.cursor.col === 2 && current.commandName === 'ge', 'ge moves backward to the end of the previous word', current);

  await reset();
  await type('3wgE');
  current = await state();
  check(current.commandName === 'gE' && current.cursor.line === 1, 'gE resolves as backward WORD-end motion', current);

  await reset();
  await type('gM');
  current = await state();
  check(current.cursor.line === 1 && current.cursor.col > 10, 'gM moves to the middle of the current line', current);

  await reset();
  await type('G');
  current = await state();
  const lastLine = current.lines.length - 1;
  check(current.cursor.line === lastLine && current.commandName === 'G', 'G moves to the last line', current);
  await type('H');
  current = await state();
  check(current.cursor.line === 0 && current.commandName === 'H', 'H moves to the top visible line', current);
  await type('M');
  current = await state();
  check(current.cursor.line === Math.floor((current.lines.length - 1) / 2) && current.commandName === 'M', 'M moves to the middle visible line', current);
  await type('L');
  current = await state();
  check(current.cursor.line === current.lines.length - 1 && current.commandName === 'L', 'L moves to the bottom visible line', current);

  await reset();
  await type('50%');
  current = await state();
  check(current.cursor.line === Math.ceil(current.lines.length * 0.5) - 1 && current.commandName === '50%', 'counted % jumps by file percentage', current);

  await reset();
  await type('f(%');
  current = await state();
  check(current.lines[current.cursor.line][current.cursor.col] === ')' && current.commandName === '%', '% jumps to the matching bracket', current);

  await reset();
  await type('1go');
  current = await state();
  check(current.cursor.line === 0 && current.cursor.col === 0 && current.commandName === '1go', 'go jumps to an absolute byte offset', current);

  await reset();
  await type('}');
  current = await state();
  check(current.cursor.line === 5 && current.commandName === '}', '} moves to the next paragraph', current);
  await type('{');
  current = await state();
  check(current.cursor.line === 0 && current.commandName === '{', '{ moves to the previous paragraph', current);

  await reset();
  await type('G0)');
  current = await state();
  check(current.cursor.line === current.lines.length - 1 && current.cursor.col > 0 && current.commandName === ')', ') moves to the next sentence', current);
  await type('(');
  current = await state();
  check(current.cursor.line === current.lines.length - 1 && current.cursor.col === 0 && current.commandName === '(', '( moves to the previous sentence', current);

  await reset();
  await type(']]');
  current = await state();
  check(current.cursor.line === 8 && current.cursor.col === 0 && current.commandName === ']]', ']] moves to the next section start', current);
  await type('][');
  current = await state();
  check(current.cursor.line === 10 && current.cursor.col === 0 && current.commandName === '][', '][ moves to the next section end', current);
  await type('[[');
  current = await state();
  check(current.cursor.line === 8 && current.cursor.col === 0 && current.commandName === '[[', '[[ moves back to the previous section start', current);
  await type('[]');
  current = await state();
  check(current.commandName === '[]', '[] resolves as a previous section-end motion', current);

  await reset();
  await type('viw');
  current = await state();
  check(current.mode === 'VISUAL' && current.commandName === 'iw' && current.cursor.col >= 9, 'viw selects the current inner word in visual mode', current);

  await reset();
  await type('vaw');
  current = await state();
  check(current.mode === 'VISUAL' && current.commandName === 'aw' && current.cursor.col >= 10, 'vaw selects around the current word in visual mode', current);

  await reset();
  await type('Vj');
  current = await state();
  check(current.mode === 'VISUAL LINE' && current.cursor.line === 2 && current.commandName === 'j', 'V enters visual line mode and j extends by whole line', current);
  await type('y');
  current = await state();
  check(
    current.mode === 'NORMAL'
      && current.registerValue === 'let target = findNextWord(buffer, cursor);\nconst quote = "inner word target";\n',
    'visual line y yanks complete lines with trailing newlines',
    current,
  );

  await reset();
  await type('Vd');
  current = await state();
  check(
    current.mode === 'NORMAL'
      && current.lines[1] === 'const quote = "inner word target";'
      && current.registerValue === 'let target = findNextWord(buffer, cursor);\n',
    'visual line d deletes the whole selected line',
    current,
  );

  await reset();
  await type('dVw');
  current = await state();
  check(
    current.lines[1] === 'const quote = "inner word target";'
      && current.registerValue === 'let target = findNextWord(buffer, cursor);\n'
      && current.commandName === 'dVw',
    'V after an operator forces a linewise range without entering visual mode',
    current,
  );

  await reset();
  await type('dvj');
  current = await state();
  check(
    current.lines[1] === 'let t quote = "inner word target";'
      && current.registerValue === 'target = findNextWord(buffer, cursor);\ncons',
    'v after an operator forces a characterwise range across a line motion',
    current,
  );

  await reset();
  await type('d');
  await press('Control+V');
  await type('j');
  current = await state();
  check(
    current.lines[1].startsWith('let arget')
      && current.lines[2].startsWith('cons quote')
      && current.registerValue === 't\nt'
      && current.commandName === 'dC-vj',
    'Ctrl-v after an operator forces a blockwise range',
    current,
  );

  await reset();
  await press('Control+V');
  await type('jl');
  current = await state();
  check(current.mode === 'VISUAL BLOCK' && current.cursor.line === 2 && current.cursor.col === 5, 'Ctrl-v starts visual block mode and motions extend a rectangle', current);
  await type('y');
  current = await state();
  check(current.mode === 'NORMAL' && current.registerValue === 'ta\nt ', 'visual block y yanks a rectangular slice', current);
  await type('gv');
  current = await state();
  check(current.mode === 'VISUAL BLOCK' && current.commandName === 'gv', 'gv reselects the previous visual block', current);
  await type('O');
  current = await state();
  check(current.mode === 'VISUAL BLOCK' && current.cursor.col === 4 && current.commandName === 'O', 'O moves to the other visual-block corner on the same line', current);
  await type('d');
  current = await state();
  check(current.mode === 'NORMAL' && current.lines[1].startsWith('let rget') && current.registerValue === 'ta\nt ', 'visual block d deletes the rectangular slice', current);

  await reset();
  await type('daw');
  current = await state();
  check(!current.lines[1].includes('target'), 'daw deletes an outer word text object', current);

  await reset();
  await type('diw');
  current = await state();
  check(current.lines[1].includes('let  =') && !current.lines[1].includes('target'), 'diw deletes an inner word text object', current);

  await reset();
  await type('daW');
  current = await state();
  check(!current.lines[1].includes('target'), 'daW deletes an outer WORD text object', current);

  await reset();
  await type('diW');
  current = await state();
  check(!current.lines[1].includes('target'), 'diW deletes an inner WORD text object', current);

  await reset();
  await type('jf"lci"');
  current = await state();
  check(current.mode === 'INSERT' && current.lines[2] === 'const quote = "";', 'ci" changes inside quotes and enters insert mode', current);
  await press('Escape');

  await reset();
  await type('jf"da"');
  current = await state();
  check(current.lines[2] === 'const quote = ;', 'da" deletes around double quotes', current);

  await reset();
  await type("ggf'di'");
  current = await state();
  check(current.lines[0].includes("''"), "di' deletes inside single quotes", current);

  await reset();
  await type("ggf'da'");
  current = await state();
  check(current.lines[0].includes('[]') || current.lines[0].includes('[, '), "da' deletes around single quotes", current);

  await reset();
  await type('yip');
  current = await state();
  check(current.registerValue.includes('const motions') && !current.registerValue.includes('<span>'), 'yip yanks the current paragraph only', current);

  await reset();
  await type('dap');
  current = await state();
  check(current.lines[0] === '<span>tag body</span>', 'dap deletes around the current paragraph including the separator', current);

  await reset();
  await type('gUw');
  current = await state();
  check(current.lines[1].includes('TARGET'), 'gUw uppercases a word through operator-pending parsing', current);

  await reset();
  await type('guw');
  current = await state();
  check(current.lines[1].includes('target') && !current.lines[1].includes('TARGET'), 'guw lowercases a word through operator-pending parsing', current);

  await reset();
  await type('y$');
  current = await state();
  check(current.registerValue === 'target = findNextWord(buffer, cursor);', 'y$ yanks through end of line', current);

  await reset();
  await type('d$');
  current = await state();
  check(current.lines[1] === 'let ', 'd$ deletes through end of line', current);

  await reset();
  await type('c_');
  current = await state();
  check(current.mode === 'INSERT' && current.lines[1] === '', 'c_ changes the current linewise range', current);
  await press('Escape');

  await reset();
  await type('2dd');
  current = await state();
  check(current.lines[1] === 'const pair = { value: [alpha, beta] };', '2dd deletes two lines', current);

  await reset();
  await type('>>');
  current = await state();
  check(current.lines[1].startsWith('  let target'), '>> indents the current line', current);
  await type('<<');
  current = await state();
  check(current.lines[1].startsWith('let target'), '<< outdents the current line', current);

  await reset();
  await type('d3w');
  current = await state();
  check(!current.lines[1].includes('target') && !current.lines[1].includes('findNextWord'), 'd3w deletes three words', current);

  await reset();
  await type('3dw');
  current = await state();
  check(!current.lines[1].includes('target') && !current.lines[1].includes('findNextWord'), '3dw deletes three words', current);

  await reset();
  await type('f(');
  current = await state();
  check(current.lastCharSearch?.command === 'f' && current.lastCharSearch?.char === '(' && current.lines[1][current.cursor.col] === '(', 'f{char} stores and applies character search', current);

  await type(';');
  current = await state();
  check(current.commandName === ';', '; resolves as character-search repeat', current);

  await type(',');
  current = await state();
  check(current.commandName === ',', ', resolves as reverse character-search repeat', current);

  await reset();
  await type('t(');
  current = await state();
  check(current.lastCharSearch?.command === 't' && current.lines[1][current.cursor.col] === 'd', 't{char} moves till before a character', current);

  await type('F=');
  current = await state();
  check(current.lastCharSearch?.command === 'F' && current.lines[1][current.cursor.col] === '=', 'F{char} searches left for a character', current);

  await type('Tt');
  current = await state();
  check(current.lastCharSearch?.command === 'T' && current.lines[1][current.cursor.col] === ' ', 'T{char} moves till after a character to the left', current);

  await reset();
  await type('f(di(');
  current = await state();
  check(current.lines[1] === 'let target = findNextWord();', 'di( deletes inside parens', current);

  await reset();
  await type('f(da(');
  current = await state();
  check(current.lines[1] === 'let target = findNextWord;', 'da( deletes around parens', current);

  await reset();
  await type('jjf[di[');
  current = await state();
  check(current.lines[3] === 'const pair = { value: [] };', 'di[ deletes inside brackets', current);

  await reset();
  await type('jjf[da[');
  current = await state();
  check(current.lines[3] === 'const pair = { value:  };', 'da[ deletes around brackets', current);

  await reset();
  await type('jjf{di{');
  current = await state();
  check(current.lines[3] === 'const pair = {};', 'di{ deletes inside braces', current);

  await reset();
  await type('jjf{da{');
  current = await state();
  check(current.lines[3] === 'const pair = ;', 'da{ deletes around braces', current);

  await reset();
  await type('jjjjdit');
  current = await state();
  check(current.lines[5] === '<span></span>', 'dit deletes inside a tag text object', current);

  await reset();
  await type('jjjjdat');
  current = await state();
  check(current.lines[5] === '', 'dat deletes around a tag text object', current);

  await reset();
  await type('G0das');
  current = await state();
  check(!current.lines.at(-1).startsWith('First sentence') && current.lines.at(-1).startsWith('Next target'), 'das deletes around a sentence text object', current);

  await reset();
  await type('Gf`di`');
  current = await state();
  check(current.lines.at(-1).includes('``') && !current.lines.at(-1).includes('tick target'), 'di` deletes inside backticks', current);

  await reset();
  await type('jjf[diB');
  current = await state();
  check(current.lines[3] === 'const pair = {};', 'iB aliases the inner brace text object', current);

  await reset();
  await type('jjjjdi>');
  current = await state();
  check(current.lines[5] === '<>tag body</span>', 'di> deletes inside an angle block', current);

  await reset();
  await type('jjjjdi<');
  current = await state();
  check(current.lines[5] === '<>tag body</span>', 'di< aliases the inner angle text object', current);

  await reset();
  await type('?target');
  current = await state();
  check(current.commandLine === '?target', '? search text is visible while typing', current);
  await press('Enter');
  current = await state();
  check(current.lastSearch?.query === 'target' && current.lastSearch?.direction === -1 && current.commandLine === '?target', '? starts a backward search and stores search state', current);
  await type('n');
  current = await state();
  check(current.commandName === 'n' && current.lastSearch?.direction === -1, 'n repeats the last search in the same direction', current);
  await type('N');
  current = await state();
  check(current.commandName === 'N' && current.lastSearch?.direction === 1, 'N repeats the last search in the opposite direction', current);

  await reset();
  await type('*');
  current = await state();
  check(current.lastSearch?.query === 'target' && current.lastSearch?.wholeWord === true && current.commandName === '*', '* searches for the word under the cursor', current);

  await reset();
  await type('g*');
  current = await state();
  check(current.lastSearch?.query === 'target' && current.lastSearch?.wholeWord === false && current.commandName === 'g*', 'g* searches for the token under the cursor as a partial match', current);

  await reset();
  await type('/target');
  await press('Enter');
  await type('gn');
  current = await state();
  check(current.mode === 'VISUAL' && current.commandName === 'gn' && current.cursor.col >= 9, 'gn selects the next search match in visual mode', current);

  await reset();
  await type('/target');
  await press('Enter');
  await type('dgn');
  current = await state();
  check(current.mode === 'NORMAL' && !current.lines[2].includes('target') && current.registerValue === 'target', 'dgn deletes the next search match as an operator motion', current);

  await reset();
  await type('/target/e');
  current = await state();
  check(current.commandLine === '/target/e', '/ search offsets are visible while typing', current);
  await press('Enter');
  current = await state();
  check(current.cursor.line === 2 && current.cursor.col === 31 && current.lastSearch?.offset?.raw === 'e', '/target/e lands on the end of the match', current);
  await type('n');
  current = await state();
  check(current.cursor.line === 9 && current.cursor.col === 18 && current.lastSearch?.offset?.raw === 'e', 'n repeats a search with the stored end offset', current);

  await reset();
  await type('/target/+1');
  await press('Enter');
  current = await state();
  check(current.cursor.line === 3 && current.cursor.col === 0 && current.lastSearch?.offset?.raw === '+1', '/target/+1 applies a line offset after the match', current);

  await reset();
  await type('/target/e');
  await press('Enter');
  await type('/');
  await press('Enter');
  current = await state();
  check(current.cursor.line === 9 && current.cursor.col === 18 && current.commandLine === '/', 'empty / repeats the previous pattern and offset', current);

  await reset();
  await type('dw');
  const afterDelete = await state();
  await type('u');
  const afterUndo = await state();
  await press('Control+R');
  current = await state();
  check(afterUndo.lines[1].includes('target') && current.lines[1] === afterDelete.lines[1], 'Ctrl-r redoes a linear undo', { afterDelete, afterUndo, current });

  await reset();
  await type('dw.');
  current = await state();
  check(current.lastChangeCommand === 'dw' && current.commandName === '.', '. repeats the previous change', current);

  await reset();
  await type(':');
  await type('w');
  current = await state();
  check(current.commandLine === ':w', 'command line text is visible in the mini buffer while typing :w', current);
  await press('Enter');
  current = await state();
  check(current.commandLine === ':w' && current.commandName === ':w', 'executed command line remains visible in the mini buffer', current);

  const errors = await page.evaluate(() => []);
  check(Array.isArray(errors), 'page remains evaluable after command suite', errors);

  if (failures.length) {
    throw new Error(JSON.stringify(failures, null, 2));
  }

  return {
    passed: true,
    checks,
    final: await state(),
  };
})

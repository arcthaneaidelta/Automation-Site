const fs = require('fs');
const path = require('path');

const replacements = [
  // Backgrounds
  ['#020617', '#f8fafc'], // Body
  ['#0a0a0f', '#f8fafc'], // Body (if old hex is still there)
  ['rgba(2, 6, 23, 0.85)', 'rgba(255, 255, 255, 0.85)'], // Navbar bg
  ['rgba(10, 10, 15, 0.85)', 'rgba(255, 255, 255, 0.85)'],
  ['rgba(17, 17, 24, 0.8)', 'rgba(255, 255, 255, 0.8)'], // Sidebar bg
  ['rgba(17, 17, 24, 0.6)', 'rgba(255, 255, 255, 0.6)'], // Header bg
  ['rgba(15, 23, 42, 0.8)', 'rgba(255, 255, 255, 0.8)'], // Sidebar bg
  ['rgba(15, 23, 42, 0.6)', 'rgba(255, 255, 255, 0.6)'], // Header bg
  ['rgba(15, 23, 42, 0.95)', 'rgba(255, 255, 255, 0.95)'], // Tooltips bg
  ['rgba(26, 26, 36, 0.6)', 'rgba(241, 245, 249, 1)'], // toggle wrappers
  ['rgba(26, 26, 36, 0.8)', 'rgba(241, 245, 249, 1)'],
  
  // Text Colors
  ['text-white', 'text-slate-900'],
  [/'white'/g, "'#0f172a'"],
  [/color="white"/g, 'color="#0f172a"'],
  [/stroke="white"/g, 'stroke="#0f172a"'],
  ['#ffffff', '#0f172a'], // Ensure no raw #ffffff is mapped except where expected
  
  // Muted Text
  ['#94a3b8', '#475569'], // Muted text darker
  ['#cbd5e1', '#334155'], // Placeholder darker
  ['#6b6b7b', '#475569'], // old muted text
  ['#9090a0', '#475569'],
  ['#4a4a5a', '#64748b'],
  ['#b8b8c8', '#475569'],
  
  // Accents & Borders
  ['rgba(255, 255, 255, 0.06)', 'rgba(15, 23, 42, 0.08)'],
  ['rgba(255, 255, 255, 0.08)', 'rgba(15, 23, 42, 0.1)'],
  ['rgba(255, 255, 255, 0.12)', 'rgba(15, 23, 42, 0.15)'],
  ['rgba(99, 102, 241, 0.06)', 'rgba(15, 23, 42, 0.08)'],
  ['rgba(99, 102, 241, 0.08)', 'rgba(15, 23, 42, 0.1)'],
  ['rgba(99, 102, 241, 0.12)', 'rgba(15, 23, 42, 0.15)'],
];

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.tsx') || fullPath.endsWith('.js')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;
      
      for (const [key, value] of Object.entries(replacements)) {
        let pattern = key[0];
        let replacement = key[1];
        if (typeof pattern === 'string') {
          if (content.includes(pattern)) {
            content = content.split(pattern).join(replacement);
            changed = true;
          }
        } else if (pattern instanceof RegExp) {
          if (pattern.test(content)) {
            content = content.replace(pattern, replacement);
            changed = true;
          }
        }
      }
      if (changed) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log('Updated', fullPath);
      }
    }
  }
}

processDir('./src');

const fs = require('fs');
const path = require('path');

const IGNORED_DIRS = new Set([
  'node_modules',
  '.git',
  '.next',
  'devdoc',
  'dist',
  'build',
  'coverage',
  'vendor',
  'tmp',
  'logs',
  '.turbo',
]);

const IGNORED_EXTS = new Set([
  '.lock',
  '.min.js',
  '.map',
  '.png',
  '.jpg',
  '.jpeg',
  '.webp',
  '.ico',
  '.svg',
  '.woff',
  '.woff2',
]);

function buildRepoMap(rootDir, maxDepth = 4, currentDepth = 0) {
  if (currentDepth > maxDepth) return null;

  const entries = fs.readdirSync(rootDir, { withFileTypes: true });
  const result = {
    name: path.basename(rootDir),
    type: 'directory',
    children: [],
  };

  for (const entry of entries) {
    if (entry.name.startsWith('.') && entry.name !== '.context' && entry.name !== '.agents') {
      continue;
    }
    if (IGNORED_DIRS.has(entry.name)) {
      continue;
    }

    const fullPath = path.join(rootDir, entry.name);
    if (entry.isDirectory()) {
      const subTree = buildRepoMap(fullPath, maxDepth, currentDepth + 1);
      if (subTree) result.children.push(subTree);
    } else {
      const ext = path.extname(entry.name).toLowerCase();
      if (!IGNORED_EXTS.has(ext)) {
        result.children.push({
          name: entry.name,
          type: 'file',
          size: fs.statSync(fullPath).size,
        });
      }
    }
  }

  return result;
}

function searchSymbols(rootDir, symbolQuery, maxResults = 20) {
  const matches = [];

  function scan(currentDir) {
    if (matches.length >= maxResults) return;
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      if (matches.length >= maxResults) return;
      if (entry.name.startsWith('.') && entry.name !== '.agents') continue;
      if (IGNORED_DIRS.has(entry.name)) continue;

      const fullPath = path.join(currentDir, entry.name);
      if (entry.isDirectory()) {
        scan(fullPath);
      } else {
        const ext = path.extname(entry.name).toLowerCase();
        if (['.ts', '.tsx', '.js', '.jsx', '.json', '.md', '.go', '.py'].includes(ext)) {
          const content = fs.readFileSync(fullPath, 'utf-8');
          const lines = content.split('\n');

          for (let i = 0; i < lines.length; i++) {
            if (matches.length >= maxResults) break;
            const line = lines[i];
            if (line.toLowerCase().includes(symbolQuery.toLowerCase())) {
              matches.push({
                file: path.relative(rootDir, fullPath),
                line: i + 1,
                snippet: line.trim(),
              });
            }
          }
        }
      }
    }
  }

  scan(rootDir);
  return matches;
}

module.exports = {
  buildRepoMap,
  searchSymbols,
};

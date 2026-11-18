const fs = require('fs');
const path = require('path');

function analyzeImpact(rootDir, targetPath) {
  const normalizedTarget = path.normalize(targetPath);
  const targetBaseName = path.basename(targetPath).replace(/\.[^/.]+$/, '');

  const directDependencies = [];
  const indirectDependencies = [];
  const affectedTests = [];
  const affectedDocs = [];

  const kgPath = path.join(rootDir, 'data', 'knowledge-graph.json');
  let kgNodes = [];
  let kgRels = [];
  if (fs.existsSync(kgPath)) {
    try {
      const kgData = JSON.parse(fs.readFileSync(kgPath, 'utf-8'));
      kgNodes = kgData.nodes || [];
      kgRels = kgData.relationships || [];
    } catch {
      // ignore json parse error
    }
  }

  // Cari relasi dari Knowledge Graph jika ada
  for (const rel of kgRels) {
    if (rel.from === targetBaseName || rel.from === normalizedTarget) {
      directDependencies.push({ target: rel.to, relation: rel.type });
    }
  }

  // Scan file source code untuk import / referensi terhadap target
  const scanDirs = ['src', 'app', 'viewer/src', 'tests', 'docs'];
  for (const dirName of scanDirs) {
    const fullDir = path.join(rootDir, dirName);
    if (!fs.existsSync(fullDir)) continue;

    function walk(curr) {
      const entries = fs.readdirSync(curr, { withFileTypes: true });
      for (const ent of entries) {
        if (ent.name.startsWith('.') || ent.name === 'node_modules') continue;
        const sub = path.join(curr, ent.name);
        if (ent.isDirectory()) {
          walk(sub);
        } else {
          const ext = path.extname(ent.name);
          if (['.ts', '.tsx', '.js', '.jsx', '.md'].includes(ext)) {
            const relPath = path.relative(rootDir, sub);
            if (relPath === normalizedTarget) continue;

            const text = fs.readFileSync(sub, 'utf-8');
            if (text.includes(targetBaseName)) {
              if (relPath.startsWith('tests/') || relPath.includes('.test.') || relPath.includes('.spec.')) {
                affectedTests.push(relPath);
              } else if (relPath.startsWith('docs/')) {
                affectedDocs.push(relPath);
              } else {
                directDependencies.push({ target: relPath, relation: 'imports_or_references' });
              }
            }
          }
        }
      }
    }

    walk(fullDir);
  }

  // Taksir tingkat risiko
  let riskLevel = 'LOW';
  if (directDependencies.length > 5 || affectedTests.length > 3) {
    riskLevel = 'HIGH';
  } else if (directDependencies.length > 2 || affectedTests.length > 0) {
    riskLevel = 'MEDIUM';
  }

  return {
    target: targetPath,
    risk: riskLevel,
    directDependencies: Array.from(new Set(directDependencies.map((d) => d.target))),
    affectedTests: Array.from(new Set(affectedTests)),
    affectedDocs: Array.from(new Set(affectedDocs)),
  };
}

module.exports = {
  analyzeImpact,
};

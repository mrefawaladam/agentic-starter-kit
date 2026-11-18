const fs = require('fs');
const path = require('path');

const DEFAULT_BUDGET = 16000;
const MAX_BUDGET = 32000;

function estimateTokens(text) {
  if (!text) return 0;
  // Perkiraan rata-rata 1 token ~ 4 karakter
  return Math.ceil(text.length / 4);
}

function calculateContextBudget(rootDir, activeFiles = []) {
  let totalTokens = 0;
  const breakdown = [];

  for (const relFile of activeFiles) {
    const fullPath = path.resolve(rootDir, relFile);
    if (fs.existsSync(fullPath)) {
      const stat = fs.statSync(fullPath);
      if (stat.isFile()) {
        const content = fs.readFileSync(fullPath, 'utf-8');
        const tokens = estimateTokens(content);
        totalTokens += tokens;
        breakdown.push({ file: relFile, tokens });
      }
    }
  }

  const utilizationRatio = totalTokens / DEFAULT_BUDGET;

  return {
    totalTokens,
    defaultBudget: DEFAULT_BUDGET,
    maxBudget: MAX_BUDGET,
    utilizationPercent: Math.round(utilizationRatio * 100),
    isUnderPressure: utilizationRatio >= 0.8,
    breakdown,
    recommendation:
      utilizationRatio >= 0.8
        ? 'Context pressure terdeteksi (>80%). Gunakan Region Read atau compress file ke summary artifact.'
        : 'Context dalam batas aman hemat token.',
  };
}

module.exports = {
  estimateTokens,
  calculateContextBudget,
};

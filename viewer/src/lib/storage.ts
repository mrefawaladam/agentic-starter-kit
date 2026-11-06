import path from 'path';
import fs from 'fs';

export interface AcceptanceCriterion {
  id: string;
  text: string;
  checked: boolean;
}

export interface TaskItem {
  id: string;
  code: string;
  title: string;
  status: 'backlog' | 'spec_drafting' | 'in_review' | 'ready_for_dev' | 'in_progress' | 'in_qa' | 'done';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  type: 'FEATURE' | 'STORY' | 'TASK' | 'BUG' | 'SPIKE';
  assignee?: string;
  spec_file?: string;
  tags?: string[];
  story_points?: number;
  acceptance_criteria?: AcceptanceCriterion[];
  updated_at?: string;
}

export interface KanbanColumn {
  id: string;
  title: string;
}

export interface BacklogData {
  project_name: string;
  description: string;
  version: string;
  columns: KanbanColumn[];
  tasks: TaskItem[];
}

export interface DocNode {
  name: string;
  path: string; // relative to project root, e.g. "docs/00-governance/glossary.md"
  type: 'file' | 'directory';
  children?: DocNode[];
}

export interface AgentInfo {
  id: string;
  name: string;
  role: string;
  path: string;
  content: string;
  avatarIcon: string;
  responsibilities: string[];
  boundaries: string[];
  samplePrompt: string;
  skills?: string[];
}

export function getProjectRoot(): string {
  const cwd = process.cwd();
  if (fs.existsSync(path.join(cwd, 'data/backlog.json'))) {
    return cwd;
  }
  if (fs.existsSync(path.join(cwd, '../data/backlog.json'))) {
    return path.resolve(cwd, '..');
  }
  return cwd;
}

export function getBacklogData(): BacklogData {
  const root = getProjectRoot();
  const filePath = path.join(root, 'data', 'backlog.json');
  if (!fs.existsSync(filePath)) {
    throw new Error(`backlog.json not found at ${filePath}`);
  }
  const content = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(content) as BacklogData;
}

export function saveBacklogData(data: BacklogData): void {
  const root = getProjectRoot();
  const filePath = path.join(root, 'data', 'backlog.json');
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

export function readSpecFile(relativePath: string): string {
  const root = getProjectRoot();
  const safePath = path.normalize(relativePath).replace(/^(\.\.[\/\\])+/, '');
  const fullPath = path.join(root, safePath);

  if (!fs.existsSync(fullPath)) {
    return `# Dokumen Belum Tersedia\n\nFile spesifikasi \`${safePath}\` belum dibuat oleh AI Agent.\n\nAnda dapat meminta AI Agent untuk menyusun dokumen ini atau membuatnya langsung dari editor.`;
  }

  return fs.readFileSync(fullPath, 'utf-8');
}

export function writeSpecFile(relativePath: string, content: string): void {
  const root = getProjectRoot();
  const safePath = path.normalize(relativePath).replace(/^(\.\.[\/\\])+/, '');
  const fullPath = path.join(root, safePath);

  const dir = path.dirname(fullPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(fullPath, content, 'utf-8');
}

export function createDocFolder(relativePath: string): void {
  const root = getProjectRoot();
  const safePath = path.normalize(relativePath).replace(/^(\.\.[\/\\])+/, '');
  const fullPath = path.join(root, safePath);

  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }
}

export function getDocsTree(): DocNode[] {
  const root = getProjectRoot();
  const docsDir = path.join(root, 'docs');

  if (!fs.existsSync(docsDir)) {
    return [];
  }

  function scanDir(dirPath: string, relativeBase: string): DocNode[] {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });
    const nodes: DocNode[] = [];

    // Sort: directories first, then files
    const sorted = entries.sort((a, b) => {
      if (a.isDirectory() && !b.isDirectory()) return -1;
      if (!a.isDirectory() && b.isDirectory()) return 1;
      return a.name.localeCompare(b.name);
    });

    for (const entry of sorted) {
      if (entry.name.startsWith('.')) continue;

      const fullSubPath = path.join(dirPath, entry.name);
      const subRelative = path.join(relativeBase, entry.name);

      if (entry.isDirectory()) {
        nodes.push({
          name: entry.name,
          path: subRelative,
          type: 'directory',
          children: scanDir(fullSubPath, subRelative),
        });
      } else if (entry.name.endsWith('.md')) {
        nodes.push({
          name: entry.name,
          path: subRelative,
          type: 'file',
        });
      }
    }

    return nodes;
  }

  return scanDir(docsDir, 'docs');
}

export function getAllAgents(): AgentInfo[] {
  const root = getProjectRoot();
  const agentsDir = path.join(root, 'agents');

  if (!fs.existsSync(agentsDir)) {
    return [];
  }

  const agentFolders = fs.readdirSync(agentsDir, { withFileTypes: true });
  const result: AgentInfo[] = [];

  const icons: Record<string, string> = {
    'product-manager': 'target',
    pm: 'target',
    'business-analyst': 'bar-chart',
    'ui-ux': 'palette',
    'solution-architect': 'compass',
    'frontend-developer': 'layout',
    'backend-developer': 'settings',
    developer: 'code',
    'quality-engineer': 'flask',
    qa: 'flask',
    'security-engineer': 'shield',
    security: 'shield',
  };

  const titles: Record<string, string> = {
    'product-manager': 'Product Manager (PM)',
    pm: 'Product Manager (PM)',
    'business-analyst': 'Business Analyst (BA)',
    'ui-ux': 'UI/UX Designer',
    'solution-architect': 'Solution Architect',
    'frontend-developer': 'Frontend Developer',
    'backend-developer': 'Backend Developer',
    developer: 'Developer (Full-Stack)',
    'quality-engineer': 'Quality Engineer (QE)',
    qa: 'QA Engineer',
    'security-engineer': 'Security Engineer',
    security: 'Security Engineer',
  };

  const canonicalRoles = [
    'product-manager',
    'business-analyst',
    'ui-ux',
    'solution-architect',
    'frontend-developer',
    'backend-developer',
    'quality-engineer',
    'security-engineer',
  ];

  for (const folder of agentFolders) {
    if (!folder.isDirectory()) continue;
    // Skip duplicate legacy aliases if canonical roles exist
    if (['pm', 'qa', 'security', 'developer'].includes(folder.name)) {
      const canonicalName = folder.name === 'pm' ? 'product-manager' :
                            folder.name === 'qa' ? 'quality-engineer' :
                            folder.name === 'security' ? 'security-engineer' : 'backend-developer';
      if (agentFolders.some(f => f.name === canonicalName)) {
        continue;
      }
    }
    const agentFilePath = path.join(agentsDir, folder.name, 'AGENT.md');
    if (fs.existsSync(agentFilePath)) {
      const content = fs.readFileSync(agentFilePath, 'utf-8');

      // Extract responsibilities and boundaries
      const respMatch = content.match(/## 3\. Tanggung Jawab[\s\S]*?(?=##|$)/i);
      const boundMatch = content.match(/## 2\. Batasan[\s\S]*?(?=##|$)/i);

      const allRoleSkills: Record<string, string[]> = {
        'ui-ux': [
          'baseline-ui',
          'improve-ui',
          'fixing-accessibility',
          'fixing-motion-performance',
          'fixing-metadata',
          'ui-skills-root',
        ],
        'frontend-developer': [
          'baseline-ui',
          'nextjs-react-best-practices',
          'fixing-accessibility',
          'fixing-motion-performance',
          'systematic-debugging',
        ],
        'backend-developer': [
          'clean-architecture-hexagonal',
          'database-migrations-drizzle-prisma',
          'api-resilience-circuit-breaker',
          'event-driven-architecture',
          'systematic-debugging',
          'docker-containerization-ci',
        ],
        developer: [
          'clean-architecture-hexagonal',
          'nextjs-react-best-practices',
          'systematic-debugging',
          'database-migrations-drizzle-prisma',
          'api-resilience-circuit-breaker',
          'docker-containerization-ci',
        ],
        'quality-engineer': [
          'playwright-e2e-testing',
          'tdd-test-driven-development',
          'contract-testing-pact',
          'load-testing-k6',
          'security-dast-scanning',
          'bdd-gherkin-verification',
        ],
        qa: [
          'playwright-e2e-testing',
          'tdd-test-driven-development',
          'contract-testing-pact',
          'load-testing-k6',
          'security-dast-scanning',
          'bdd-gherkin-verification',
        ],
        'solution-architect': [
          'c4-model-architecture',
          'adr-architecture-decisions',
          'event-driven-architecture',
          'distributed-data-patterns',
          'cost-and-capacity-planning',
          'system-security-architecture',
        ],
        'product-manager': [
          'user-story-mapping',
          'rice-prioritization',
          'gherkin-acceptance-criteria',
          'data-driven-metrics-north-star',
          'competitive-gap-analysis',
          'voice-of-customer-synthesis',
        ],
        pm: [
          'user-story-mapping',
          'rice-prioritization',
          'gherkin-acceptance-criteria',
          'data-driven-metrics-north-star',
          'competitive-gap-analysis',
          'voice-of-customer-synthesis',
        ],
        'security-engineer': [
          'stride-threat-modeling',
          'owasp-top-10-mitigation',
          'rbac-abac-policy-matrix',
          'secrets-and-key-rotation',
          'sast-dependency-audit',
          'incident-response-runbooks',
        ],
        security: [
          'stride-threat-modeling',
          'owasp-top-10-mitigation',
          'rbac-abac-policy-matrix',
          'secrets-and-key-rotation',
          'sast-dependency-audit',
          'incident-response-runbooks',
        ],
        'business-analyst': [
          'bpmn-process-modeling',
          'state-machine-transitions',
          'ubiquitous-language-glossary',
          'gap-analysis-as-is-to-be',
          'stakeholder-matrix-raci',
          'financial-rule-reconciliation',
        ],
      };

      const agentSkills = allRoleSkills[folder.name] || [];

      result.push({
        id: folder.name,
        name: titles[folder.name] || folder.name,
        role: folder.name,
        path: `agents/${folder.name}/AGENT.md`,
        content,
        avatarIcon: icons[folder.name] || 'bot',
        responsibilities: respMatch ? [respMatch[0].replace(/## (3|4)\. Tanggung Jawab[^\n]*\n/, '').trim()] : [],
        boundaries: boundMatch ? [boundMatch[0].replace(/## 2\. Batasan[^\n]*\n/, '').trim()] : [],
        samplePrompt: `@${folder.name.replace('-', '')}\nBertindaklah sebagai ${titles[folder.name] || folder.name}.\nBantu saya untuk mengerjakan tugas ini sesuai spesifikasi dokumen di docs/.`,
        skills: agentSkills,
      });
    }
  }

  return result;
}

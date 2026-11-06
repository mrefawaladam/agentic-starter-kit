'use client';

import React, { useState, useEffect } from 'react';
import { AgentInfo } from '@/lib/storage';
import { MarkdownViewer } from './MarkdownViewer';
import {
  Bot,
  Copy,
  Check,
  ShieldAlert,
  CheckCircle2,
  FileText,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Palette,
  Layers,
  Activity,
  Search,
  Eye,
  CheckSquare,
  Cpu,
  TestTube2,
  Workflow,
  Compass,
  Lock,
  BarChart3,
  Globe2,
  Filter,
  X,
  BookOpen,
  Layout,
} from 'lucide-react';

interface AgentsHubProps {
  onOpenDoc: (docPath: string) => void;
}

export function AgentsHub({ onOpenDoc }: AgentsHubProps) {
  const [agents, setAgents] = useState<AgentInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<string>('ALL');
  const [skillSearchQuery, setSkillSearchQuery] = useState<string>('');
  const [activeSkillModal, setActiveSkillModal] = useState<{
    name: string;
    content: string;
    source?: string;
  } | null>(null);
  const [isLoadingSkill, setIsLoadingSkill] = useState(false);
  const [copiedModalText, setCopiedModalText] = useState(false);

  useEffect(() => {
    fetch('/api/agents')
      .then((res) => res.json())
      .then((data) => {
        setAgents(data.agents || []);
      })
      .catch((err) => console.error('Error loading agents:', err))
      .finally(() => setIsLoading(false));
  }, []);

  const handleCopyPrompt = (agent: AgentInfo, customPrompt?: string, skillKey?: string) => {
    const textToCopy = customPrompt || agent.samplePrompt;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(agent.id + (skillKey ? `-${skillKey}` : ''));
    setTimeout(() => setCopiedId(null), 2000);
  };

  const renderRoleIcon = (role: string, avatarIcon?: string) => {
    const iconClass = 'w-6 h-6';
    const key = avatarIcon || role;
    switch (key) {
      case 'target':
      case 'pm':
      case 'product-manager':
        return <Compass className={`${iconClass} text-blue-600`} />;
      case 'bar-chart':
      case 'business-analyst':
        return <BarChart3 className={`${iconClass} text-indigo-600`} />;
      case 'palette':
      case 'ui-ux':
        return <Palette className={`${iconClass} text-purple-600`} />;
      case 'compass':
      case 'solution-architect':
        return <Layers className={`${iconClass} text-amber-600`} />;
      case 'layout':
      case 'frontend-developer':
        return <Layout className={`${iconClass} text-sky-600`} />;
      case 'settings':
      case 'backend-developer':
        return <Cpu className={`${iconClass} text-slate-700`} />;
      case 'code':
      case 'developer':
        return <Cpu className={`${iconClass} text-blue-600`} />;
      case 'flask':
      case 'qa':
      case 'quality-engineer':
        return <TestTube2 className={`${iconClass} text-emerald-600`} />;
      case 'shield':
      case 'security':
      case 'security-engineer':
        return <Lock className={`${iconClass} text-rose-600`} />;
      default:
        return <Bot className={`${iconClass} text-slate-600`} />;
    }
  };

  const handleOpenSkillModal = async (skillName: string, source?: string) => {
    setIsLoadingSkill(true);
    try {
      const res = await fetch(`/api/skills?name=${encodeURIComponent(skillName)}`);
      const data = await res.json();
      if (res.ok && data.content) {
        setActiveSkillModal({ name: skillName, content: data.content, source });
      } else {
        const fallbackDesc = skillsRegistry[skillName]?.desc || 'Skill specification';
        setActiveSkillModal({
          name: skillName,
          content: `# ${skillName}\n\n${fallbackDesc}\n\n## Invocations\n\`\`\`bash\n/${skillName}\n\`\`\``,
          source,
        });
      }
    } catch (err) {
      console.error('Error fetching skill:', err);
    } finally {
      setIsLoadingSkill(false);
    }
  };

  // Comprehensive registry of skills across all roles
  const skillsRegistry: Record<
    string,
    { title: string; desc: string; source: string; prompt: string; icon: React.ReactNode }
  > = {
    // UI/UX Skills (ui-skills.com / skills.sh)
    'baseline-ui': {
      title: 'baseline-ui',
      desc: 'Standar Tailwind CSS: mikro-interaksi < 200ms, transform/opacity only, text-balance, tabular-nums, spasi 8pt, touch target 44px.',
      source: 'ui-skills.com',
      icon: <Layers className="w-3.5 h-3.5 text-blue-600" />,
      prompt: `@UIUX\nBertindaklah sebagai UI/UX Designer Agent dengan skill 'baseline-ui' (https://www.ui-skills.com/).\nPastikan komponen menggunakan Tailwind constraints: mikro-interaksi < 200ms, text-balance untuk heading, tabular-nums untuk angka, dan touch target minimal 44px.`,
    },
    'improve-ui': {
      title: 'improve-ui',
      desc: 'Audit & eliminasi visual clutter (anti-AI slop), hierarki kontras tinggi, dan layered subtle elevation.',
      source: 'ui-skills.com',
      icon: <Palette className="w-3.5 h-3.5 text-purple-600" />,
      prompt: `@UIUX\nBertindaklah sebagai UI/UX Designer Agent dengan skill 'improve-ui' (https://www.ui-skills.com/).\nLakukan audit visual: terapkan prinsip visual restraint, bersihkan elemen yang tidak fungsional, dan gunakan layered subtle shadows ala Jira Light.`,
    },
    'fixing-accessibility': {
      title: 'fixing-accessibility',
      desc: 'Kepatuhan WCAG 2.1 Level AA: semantic HTML, visible focus ring (focus-visible:ring-2), modal focus trap, aria-label.',
      source: 'ui-skills.com',
      icon: <CheckSquare className="w-3.5 h-3.5 text-emerald-600" />,
      prompt: `@UIUX\nBertindaklah sebagai UI/UX Designer Agent dengan skill 'fixing-accessibility' (https://www.ui-skills.com/).\nAudit aksesibilitas komponen: pastikan memiliki visible focus rings, tag semantik asli, accessible names (aria-label), dan keyboard navigation.`,
    },
    'fixing-motion-performance': {
      title: 'fixing-motion-performance',
      desc: 'Animasi 60 FPS tanpa layout thrashing. Hindari animasi width/height, gunakan GPU compositor, dan prefers-reduced-motion.',
      source: 'ui-skills.com',
      icon: <Activity className="w-3.5 h-3.5 text-orange-600" />,
      prompt: `@UIUX\nBertindaklah sebagai UI/UX Designer Agent dengan skill 'fixing-motion-performance' (https://www.ui-skills.com/).\nOptimalkan performa animasi: hanya animasikan transform dan opacity, hindari layout thrashing, dan sediakan prefers-reduced-motion fallback.`,
    },
    'fixing-metadata': {
      title: 'fixing-metadata',
      desc: 'Standarisasi metadata halaman: Open Graph card, Twitter card, favicon manifest, canonical URL, structured JSON-LD.',
      source: 'ui-skills.com',
      icon: <Search className="w-3.5 h-3.5 text-cyan-600" />,
      prompt: `@UIUX\nBertindaklah sebagai UI/UX Designer Agent dengan skill 'fixing-metadata' (https://www.ui-skills.com/).\nLengkapi metadata halaman: Open Graph tags, Twitter card summary_large_image, favicon set, dan structured data schema.`,
    },
    'ui-skills-root': {
      title: 'ui-skills-root',
      desc: 'Prinsip routing "Less is More": 1 skill untuk tugas biasa, maksimal 2 skill untuk kombinasi, anti-konteks berlebih.',
      source: 'ui-skills.com',
      icon: <Sparkles className="w-3.5 h-3.5 text-indigo-600" />,
      prompt: `@UIUX\nBertindaklah sebagai UI/UX Designer Agent mengacu pada standar ui-skills-root (https://www.ui-skills.com/).\nPilih skill paling spesifik dan berikan instruksi presisi dengan signal-to-noise ratio tertinggi.`,
    },

    // Developer / Full-Stack Skills (skills.sh / agentnative.dev / skill-atlas)
    'clean-architecture-hexagonal': {
      title: 'clean-architecture-hexagonal',
      desc: 'Pemisahan ketat 3 layer: Domain (murni), Application/Use Case (ports), Infrastructure (adapters).',
      source: 'agentnative.dev',
      icon: <Cpu className="w-3.5 h-3.5 text-blue-600" />,
      prompt: `@Developer\nBertindaklah sebagai Developer Agent dengan skill 'clean-architecture-hexagonal' (https://www.agentnative.dev/skills).\nPisahkan kode secara ketat: Domain murni tanpa framework, Use Case orchestration, dan Infrastructure adapters. Pastikan domain logic 100% unit-testable.`,
    },
    'nextjs-react-best-practices': {
      title: 'nextjs-react-best-practices',
      desc: 'Optimalisasi Server Components (RSC) vs Client Components, Server Actions dengan validasi Zod, dan Partial Prerendering (PPR).',
      source: 'skills.sh',
      icon: <Globe2 className="w-3.5 h-3.5 text-slate-700" />,
      prompt: `@Developer\nBertindaklah sebagai Developer Agent dengan skill 'nextjs-react-best-practices' (https://www.skills.sh/).\nTerapkan arsitektur Next.js 15: Server Components untuk data fetching, Server Actions dengan validasi Zod, dan revalidasi tag cache terukur.`,
    },
    'systematic-debugging': {
      title: 'systematic-debugging',
      desc: 'Metodologi eliminasi ilmiah: isolasi masalah -> buat skrip reproduksi minimal -> identifikasi root cause -> regression test.',
      source: 'agentnative.dev',
      icon: <Activity className="w-3.5 h-3.5 text-rose-600" />,
      prompt: `@Developer\nBertindaklah sebagai Developer Agent dengan skill 'systematic-debugging' (https://www.agentnative.dev/skills).\nJangan menebak-nebak kode! Buatkan skrip reproduksi minimal terlebih dahulu, temukan akar masalah di stack trace, dan tambahkan regression test.`,
    },
    'database-migrations-drizzle-prisma': {
      title: 'database-migrations-drizzle-prisma',
      desc: 'Migrasi database zero-downtime, strategi indeks relasional (B-tree, GIN), dan pencegahan query N+1.',
      source: 'skills.sh',
      icon: <Layers className="w-3.5 h-3.5 text-emerald-600" />,
      prompt: `@Developer\nBertindaklah sebagai Developer Agent dengan skill 'database-migrations-drizzle-prisma'.\nKelola migrasi skema dengan aman untuk zero-downtime, pasang indeks pencarian yang tepat, dan hindari N+1 query problem.`,
    },
    'api-resilience-circuit-breaker': {
      title: 'api-resilience-circuit-breaker',
      desc: 'Mekanisme retry dengan exponential backoff dan jitter, circuit breaker pattern, dan RFC 7807 problem details.',
      source: 'skill-atlas',
      icon: <Workflow className="w-3.5 h-3.5 text-amber-600" />,
      prompt: `@Developer\nBertindaklah sebagai Developer Agent dengan skill 'api-resilience-circuit-breaker'.\nBungkus integrasi eksternal dengan retry exponential backoff, circuit breaker, dan format respons error terstandar RFC 7807.`,
    },
    'docker-containerization-ci': {
      title: 'docker-containerization-ci',
      desc: 'Multi-stage Dockerfile minimal (Alpine/Distroless), caching layer, dan CI/CD automation pipeline.',
      source: 'skills.sh',
      icon: <Cpu className="w-3.5 h-3.5 text-cyan-600" />,
      prompt: `@Developer\nBertindaklah sebagai Developer Agent dengan skill 'docker-containerization-ci'.\nBuatkan multi-stage Dockerfile efisien dan pipeline CI untuk build, lint, dan test otomatis.`,
    },

    // QA Engineer Skills (agentnative.dev / skills.sh)
    'playwright-e2e-testing': {
      title: 'playwright-e2e-testing',
      desc: 'Browser automation dengan Page Object Model (POM), network mocking, visual regression, dan cross-viewport testing.',
      source: 'skills.sh',
      icon: <TestTube2 className="w-3.5 h-3.5 text-emerald-600" />,
      prompt: `@QA\nBertindaklah sebagai QA Engineer Agent dengan skill 'playwright-e2e-testing' (https://www.skills.sh/).\nBuatkan automated end-to-end test menggunakan Playwright dengan Page Object Model, semantic locators (getByRole), dan network mocking.`,
    },
    'tdd-test-driven-development': {
      title: 'tdd-test-driven-development',
      desc: 'Siklus Red-Green-Refactor: test gagal terlebih dahulu, implementasi kode minimal, dan refactoring dengan safety net.',
      source: 'agentnative.dev',
      icon: <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />,
      prompt: `@QA\nBertindaklah sebagai QA Engineer Agent dengan skill 'tdd-test-driven-development' (https://www.agentnative.dev/skills).\nTulis unit test spesifik yang gagal terlebih dahulu untuk memvalidasi skenario acceptance criteria sebelum developer menulis kode.`,
    },
    'contract-testing-pact': {
      title: 'contract-testing-pact',
      desc: 'Consumer-driven contract testing antara FE dan BE untuk mencegah breaking changes pada API payload.',
      source: 'agentnative.dev',
      icon: <FileText className="w-3.5 h-3.5 text-purple-600" />,
      prompt: `@QA\nBertindaklah sebagai QA Engineer Agent dengan skill 'contract-testing-pact'.\nValidasi kontrak schema JSON antara Frontend dan Backend untuk memastikan tidak ada field breaking changes yang lolos ke staging.`,
    },
    'load-testing-k6': {
      title: 'load-testing-k6',
      desc: 'Stress testing, spike testing, dan benchmark latensi P95/P99 menggunakan skrip k6 / Artillery.',
      source: 'skills.sh',
      icon: <Activity className="w-3.5 h-3.5 text-orange-600" />,
      prompt: `@QA\nBertindaklah sebagai QA Engineer Agent dengan skill 'load-testing-k6'.\nBuatkan skenario stress test k6 dengan target 500 Virtual Users, ukur ambang batas latency P95 di bawah 200ms.`,
    },
    'security-dast-scanning': {
      title: 'security-dast-scanning',
      desc: 'Dynamic application security testing, fuzzing input parameter, dan verifikasi proteksi XSS/CSRF.',
      source: 'skill-atlas',
      icon: <Lock className="w-3.5 h-3.5 text-red-600" />,
      prompt: `@QA\nBertindaklah sebagai QA Engineer Agent dengan skill 'security-dast-scanning'.\nLakukan automated security fuzzing pada endpoint API untuk menguji ketahanan terhadap SQL injection dan token expiry.`,
    },
    'bdd-gherkin-verification': {
      title: 'bdd-gherkin-verification',
      desc: 'Verifikasi kepatuhan Acceptance Criteria berformat Given-When-Then ke checklist backlog.json.',
      source: 'agentskill.sh',
      icon: <CheckSquare className="w-3.5 h-3.5 text-teal-600" />,
      prompt: `@QA\nBertindaklah sebagai QA Engineer Agent dengan skill 'bdd-gherkin-verification'.\nVerifikasi setiap skenario Given-When-Then di acceptance-criteria.md dan update checklist data/backlog.json.`,
    },

    // Solution Architect Skills (skill-atlas / agentskill.sh)
    'c4-model-architecture': {
      title: 'c4-model-architecture',
      desc: 'Pemodelan arsitektur sistem berlapis C4 (Context, Container, Component, Code) menggunakan format teks Mermaid.',
      source: 'skill-atlas',
      icon: <Compass className="w-3.5 h-3.5 text-blue-600" />,
      prompt: `@SolutionArchitect\nBertindaklah sebagai Solution Architect Agent dengan skill 'c4-model-architecture' (https://github.com/luongs3/skill-atlas).\nRancang diagram C4 Context & Container menggunakan format Mermaid untuk memperjelas alur integrasi sistem.`,
    },
    'adr-architecture-decisions': {
      title: 'adr-architecture-decisions',
      desc: 'Pencatatan keputusan arsitektural terukur: status, konteks, pilihan dipertimbangkan, dan konsekuensi.',
      source: 'skill-atlas',
      icon: <FileText className="w-3.5 h-3.5 text-emerald-600" />,
      prompt: `@SolutionArchitect\nBertindaklah sebagai Solution Architect Agent dengan skill 'adr-architecture-decisions'.\nSusun Architecture Decision Record (ADR) di docs/05-architecture/adr/ dengan rincian alternatif dan konsekuensi teknis.`,
    },
    'event-driven-architecture': {
      title: 'event-driven-architecture',
      desc: 'Asynchronous messaging, Transactional Outbox Pattern, dan jaminan idempotensi antar-service.',
      source: 'agentnative.dev',
      icon: <Workflow className="w-3.5 h-3.5 text-purple-600" />,
      prompt: `@SolutionArchitect\nBertindaklah sebagai Solution Architect Agent dengan skill 'event-driven-architecture'.\nRancang alur asynchronous messaging dengan Transactional Outbox Pattern dan idempotency key validation.`,
    },
    'distributed-data-patterns': {
      title: 'distributed-data-patterns',
      desc: 'Partisi data, CQRS, multi-tenant database isolation, dan konsistensi eventual.',
      source: 'skill-atlas',
      icon: <Layers className="w-3.5 h-3.5 text-indigo-600" />,
      prompt: `@SolutionArchitect\nBertindaklah sebagai Solution Architect Agent dengan skill 'distributed-data-patterns'.\nTentukan strategi partisi database, read-replicas, dan isolasi tenant yang aman dan scalable.`,
    },
    'cost-and-capacity-planning': {
      title: 'cost-and-capacity-planning',
      desc: 'Estimasi kebutuhan komputasi, IOPS, memory, dan pencegahan cloud over-provisioning.',
      source: 'agentskill.sh',
      icon: <BarChart3 className="w-3.5 h-3.5 text-amber-600" />,
      prompt: `@SolutionArchitect\nBertindaklah sebagai Solution Architect Agent dengan skill 'cost-and-capacity-planning'.\nHitung proyeksi beban server dan susun rekomendasi infrastruktur yang paling efisien dari segi biaya cloud.`,
    },
    'system-security-architecture': {
      title: 'system-security-architecture',
      desc: 'Zero-trust network boundaries, mTLS antar-service, enkripsi data at-rest & in-transit.',
      source: 'skill-atlas',
      icon: <Lock className="w-3.5 h-3.5 text-rose-600" />,
      prompt: `@SolutionArchitect\nBertindaklah sebagai Solution Architect Agent dengan skill 'system-security-architecture'.\nRancang arsitektur keamanan Zero-Trust, batasan mTLS, dan manajemen rahasia di docs/05-architecture/.`,
    },

    // PM Skills (agentskill.sh / skills.sh)
    'user-story-mapping': {
      title: 'user-story-mapping',
      desc: 'Pemetaan horizontal alur pengguna dan irisan rilis vertikal (Release Slices) untuk menentukan MVP.',
      source: 'agentskill.sh',
      icon: <Workflow className="w-3.5 h-3.5 text-blue-600" />,
      prompt: `@PM\nBertindaklah sebagai Product Manager Agent dengan skill 'user-story-mapping' (https://agentskill.sh/).\nPecah kebutuhan produk ke dalam user story map dengan garis batas MVP (Release 1.0) yang jelas.`,
    },
    'rice-prioritization': {
      title: 'rice-prioritization',
      desc: 'Kuantifikasi prioritas fitur menggunakan formula: (Reach x Impact x Confidence) / Effort.',
      source: 'agentskill.sh',
      icon: <BarChart3 className="w-3.5 h-3.5 text-purple-600" />,
      prompt: `@PM\nBertindaklah sebagai Product Manager Agent dengan skill 'rice-prioritization'.\nHitung skor RICE untuk fitur-fitur di backlog dan berikan urutan implementasi berdasarkan ROI tertinggi.`,
    },
    'gherkin-acceptance-criteria': {
      title: 'gherkin-acceptance-criteria',
      desc: 'Penulisan kriteria penerimaan format Gherkin Given-When-Then yang presisi tanpa ambiguitas.',
      source: 'skills.sh',
      icon: <CheckSquare className="w-3.5 h-3.5 text-emerald-600" />,
      prompt: `@PM\nBertindaklah sebagai Product Manager Agent dengan skill 'gherkin-acceptance-criteria'.\nTulis acceptance criteria format Gherkin (Given-When-Then) yang mencakup skenario sukses, validasi, dan batas error.`,
    },
    'data-driven-metrics-north-star': {
      title: 'data-driven-metrics-north-star',
      desc: 'Penetapan North Star Metric, metrik input pendukung, funnel tracking, dan cohort retention.',
      source: 'agentskill.sh',
      icon: <Compass className="w-3.5 h-3.5 text-teal-600" />,
      prompt: `@PM\nBertindaklah sebagai Product Manager Agent dengan skill 'data-driven-metrics-north-star'.\nDefinisikan North Star Metric dan indikator KPI sukses fitur di docs/01-product/product-metrics.md.`,
    },
    'competitive-gap-analysis': {
      title: 'competitive-gap-analysis',
      desc: 'Analisis perbandingan fitur kompetitor untuk mengidentifikasi keunggulan diferensiasi pasar.',
      source: 'agentskill.sh',
      icon: <Search className="w-3.5 h-3.5 text-indigo-600" />,
      prompt: `@PM\nBertindaklah sebagai Product Manager Agent dengan skill 'competitive-gap-analysis'.\nLakukan analisis perbandingan dengan kompetitor sejenis dan tuliskan poin diferensiasi di docs/02-discovery/.`,
    },
    'voice-of-customer-synthesis': {
      title: 'voice-of-customer-synthesis',
      desc: 'Sintesis feedback kualitatif pengguna menjadi persona realistis dan job-to-be-done yang tajam.',
      source: 'agentskill.sh',
      icon: <Eye className="w-3.5 h-3.5 text-rose-600" />,
      prompt: `@PM\nBertindaklah sebagai Product Manager Agent dengan skill 'voice-of-customer-synthesis'.\nSintesiskan persona pengguna dan user pain points di docs/01-product/personas/.`,
    },

    // Security Skills (agentnative.dev / skill-atlas)
    'stride-threat-modeling': {
      title: 'stride-threat-modeling',
      desc: 'Pemetaan ancaman sistem: Spoofing, Tampering, Repudiation, Information Disclosure, DoS, Elevation of Privilege.',
      source: 'agentnative.dev',
      icon: <ShieldAlert className="w-3.5 h-3.5 text-red-600" />,
      prompt: `@Security\nBertindaklah sebagai Security Engineer Agent dengan skill 'stride-threat-modeling' (https://www.agentnative.dev/skills).\nLakukan analisis ancaman STRIDE untuk fitur ini dan tulis mitigasinya di docs/07-security-compliance/threat-model.md.`,
    },
    'owasp-top-10-mitigation': {
      title: 'owasp-top-10-mitigation',
      desc: 'Mitigasi kerentanan web utama: SQLi, XSS, CSRF, BOLA/IDOR, dan Server-Side Request Forgery.',
      source: 'skill-atlas',
      icon: <Lock className="w-3.5 h-3.5 text-rose-600" />,
      prompt: `@Security\nBertindaklah sebagai Security Engineer Agent dengan skill 'owasp-top-10-mitigation'.\nAudit kode dan API contract terhadap OWASP Top 10, pastikan validasi BOLA/IDOR dan parameterized query terpenuhi.`,
    },
    'rbac-abac-policy-matrix': {
      title: 'rbac-abac-policy-matrix',
      desc: 'Perancangan matriks kontrol hak akses granular berbasis peran dan atribut per entitas sistem.',
      source: 'skill-atlas',
      icon: <Layers className="w-3.5 h-3.5 text-blue-600" />,
      prompt: `@Security\nBertindaklah sebagai Security Engineer Agent dengan skill 'rbac-abac-policy-matrix'.\nSusun matriks perizinan CRUD di docs/07-security-compliance/rbac-matrix.md untuk seluruh peran pengguna.`,
    },
    'secrets-and-key-rotation': {
      title: 'secrets-and-key-rotation',
      desc: 'Kebijakan zero-hardcoded secrets, manajemen vault, enkripsi environment, dan rotasi token berkala.',
      source: 'skills.sh',
      icon: <Lock className="w-3.5 h-3.5 text-amber-600" />,
      prompt: `@Security\nBertindaklah sebagai Security Engineer Agent dengan skill 'secrets-and-key-rotation'.\nPastikan repositori bersih dari hardcoded secrets dan tetapkan kebijakan rotasi JWT signing key.`,
    },
    'sast-dependency-audit': {
      title: 'sast-dependency-audit',
      desc: 'Static application security testing dan audit kerentanan dependensi pihak ketiga (SBOM/CVE).',
      source: 'agentnative.dev',
      icon: <Activity className="w-3.5 h-3.5 text-purple-600" />,
      prompt: `@Security\nBertindaklah sebagai Security Engineer Agent dengan skill 'sast-dependency-audit'.\nAudit dependensi npm/pnpm terhadap CVE yang diketahui dan sediakan rekomendasi pembaruan versi library.`,
    },
    'incident-response-runbooks': {
      title: 'incident-response-runbooks',
      desc: 'SOP tanggap darurat insiden siber, pemutusan sesi pengguna terdampak, dan log forensik audit trail.',
      source: 'skill-atlas',
      icon: <ShieldAlert className="w-3.5 h-3.5 text-orange-600" />,
      prompt: `@Security\nBertindaklah sebagai Security Engineer Agent dengan skill 'incident-response-runbooks'.\nSusun prosedur tanggap darurat kebocoran data dan rencana pemulihan sesi di docs/07-security-compliance/.`,
    },

    // Business Analyst Skills (agentskill.sh / skill-atlas)
    'bpmn-process-modeling': {
      title: 'bpmn-process-modeling',
      desc: 'Diagram alur kerja BPMN 2.0 dan Mermaid flowchart dengan swimlanes peran yang tegas.',
      source: 'agentskill.sh',
      icon: <Workflow className="w-3.5 h-3.5 text-blue-600" />,
      prompt: `@BA\nBertindaklah sebagai Business Analyst Agent dengan skill 'bpmn-process-modeling' (https://agentskill.sh/).\nRancang alur proses bisnis operasional menggunakan diagram Mermaid dengan swimlane antar-aktor di docs/02-discovery/.`,
    },
    'state-machine-transitions': {
      title: 'state-machine-transitions',
      desc: 'Pemodelan Finite State Machine (FSM) entitas: pemicu transisi, kondisi guard, dan side effects.',
      source: 'skill-atlas',
      icon: <Layers className="w-3.5 h-3.5 text-purple-600" />,
      prompt: `@BA\nBertindaklah sebagai Business Analyst Agent dengan skill 'state-machine-transitions'.\nPetakan status lifecycle entitas (FSM) beserta guard conditions dan side effects di docs/03-requirements/workflows/.`,
    },
    'ubiquitous-language-glossary': {
      title: 'ubiquitous-language-glossary',
      desc: 'Kamus istilah domain tunggal (Domain-Driven Design) untuk konsistensi komunikasi bisnis dan kode.',
      source: 'agentskill.sh',
      icon: <FileText className="w-3.5 h-3.5 text-emerald-600" />,
      prompt: `@BA\nBertindaklah sebagai Business Analyst Agent dengan skill 'ubiquitous-language-glossary'.\nPerbarui daftar definisi istilah bisnis dan teknis di docs/00-governance/glossary.md agar konsisten.`,
    },
    'gap-analysis-as-is-to-be': {
      title: 'gap-analysis-as-is-to-be',
      desc: 'Analisis komparasi kondisi operasional saat ini (As-Is) dengan target sistem baru (To-Be).',
      source: 'agentskill.sh',
      icon: <Compass className="w-3.5 h-3.5 text-indigo-600" />,
      prompt: `@BA\nBertindaklah sebagai Business Analyst Agent dengan skill 'gap-analysis-as-is-to-be'.\nSusun dokumen analisis gap operasional As-Is vs To-Be di docs/02-discovery/problem-statements.md.`,
    },
    'stakeholder-matrix-raci': {
      title: 'stakeholder-matrix-raci',
      desc: 'Matriks pemetaan akuntabilitas peran: Responsible, Accountable, Consulted, Informed.',
      source: 'agentskill.sh',
      icon: <CheckSquare className="w-3.5 h-3.5 text-amber-600" />,
      prompt: `@BA\nBertindaklah sebagai Business Analyst Agent dengan skill 'stakeholder-matrix-raci'.\nPetakan matriks peran RACI untuk fitur ini di docs/01-product/stakeholders.md.`,
    },
    'financial-rule-reconciliation': {
      title: 'financial-rule-reconciliation',
      desc: 'Aturan rekonsiliasi nilai, pembulatan diskon/pajak, pencatatan log audit, dan ledger balancing.',
      source: 'skill-atlas',
      icon: <BarChart3 className="w-3.5 h-3.5 text-rose-600" />,
      prompt: `@BA\nBertindaklah sebagai Business Analyst Agent dengan skill 'financial-rule-reconciliation'.\nRinci aturan pembulatan numerik, pajak, dan audit rekonsiliasi saldo di docs/03-requirements/business-rules.md.`,
    },
  };

  const filteredAgents = agents.filter((agent) => {
    const matchesRole = selectedRole === 'ALL' || agent.id === selectedRole;
    const matchesSkill =
      !skillSearchQuery ||
      agent.skills?.some((s) => s.toLowerCase().includes(skillSearchQuery.toLowerCase())) ||
      agent.name.toLowerCase().includes(skillSearchQuery.toLowerCase()) ||
      agent.role.toLowerCase().includes(skillSearchQuery.toLowerCase());
    return matchesRole && matchesSkill;
  });

  return (
    <div className="flex-1 flex flex-col gap-6 max-w-7xl mx-auto w-full">
      {/* Top Banner with References */}
      <div className="p-6 rounded-2xl bg-white border border-[#DFE1E6] jira-card-shadow flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-[#EAE6FF] border border-[#C0B6F2] flex items-center justify-center text-[#5243AA] shadow-xs">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-[#172B4D]">
                  Unified AI Engineering Team & Skills Hub
                </h2>
                <span className="text-[10px] font-mono bg-purple-50 text-purple-700 font-bold px-2 py-0.5 rounded-full border border-purple-200">
                  42 Specialized Skills
                </span>
                <span className="text-[10px] font-mono bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                  {agents.length || 8} Roles
                </span>
              </div>
              <p className="text-xs text-[#5E6C84] mt-0.5">
                Kompilasi keterampilan AI dari registry global:{' '}
                <strong>skills.sh</strong>, <strong>agentskill.sh</strong>, <strong>akilima.io</strong>,{' '}
                <strong>skill-atlas</strong>, <strong>agentnative.dev</strong>, dan <strong>ui-skills.com</strong>.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenDoc('docs/00-governance/skills-catalog.md')}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-semibold border border-purple-200 transition-colors cursor-pointer"
            >
              <Workflow className="w-4 h-4" />
              <span>Buka Katalog Lengkap</span>
            </button>

            <button
              onClick={() => onOpenDoc('AGENTS.md')}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#DEEBFF] hover:bg-[#B3D4FF] text-[#0052CC] text-xs font-semibold transition-colors cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>Aturan Tim (AGENTS.md)</span>
            </button>
          </div>
        </div>

        {/* Filter Toolbar by Role and Search */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#EBECF0]">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-[#5E6C84] font-semibold flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" />
              Filter Peran:
            </span>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="bg-[#F4F5F7] border border-[#DFE1E6] rounded-md px-2.5 py-1 text-xs text-[#172B4D] font-semibold focus:outline-hidden focus:border-[#0052CC]"
            >
              <option value="ALL">Semua Peran ({agents.length} Specialized Agents)</option>
              {agents.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name}
                </option>
              ))}
            </select>
          </div>

          <div className="relative w-72">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#5E6C84]" />
            <input
              type="text"
              placeholder="Cari skill (misal: playwright, c4, owasp, tdd)..."
              value={skillSearchQuery}
              onChange={(e) => setSkillSearchQuery(e.target.value)}
              className="w-full bg-[#F4F5F7] border border-[#DFE1E6] rounded-md pl-8 pr-3 py-1 text-xs text-[#172B4D] placeholder:text-[#6B778C] focus:bg-white focus:border-[#0052CC] focus:outline-hidden transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Grid of Agents with Dynamic Skills */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredAgents.map((agent) => {
          return (
            <div
              key={agent.id}
              className="flex flex-col rounded-xl bg-white border border-[#DFE1E6] jira-card-shadow hover:border-[#0052CC] transition-all p-5 justify-between gap-4 group"
            >
              {/* Card Header: Avatar & Name */}
              <div className="flex flex-col gap-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-[#F4F5F7] border border-[#DFE1E6] flex items-center justify-center shrink-0">
                      {renderRoleIcon(agent.role, agent.avatarIcon)}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-[#172B4D] group-hover:text-[#0052CC] transition-colors">
                        {agent.name}
                      </h3>
                      <span className="text-[11px] font-mono text-[#5E6C84]">
                        @{agent.role}
                      </span>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EBECF0] text-[#42526E]">
                    {agent.skills?.length || 0} SKILLS
                  </span>
                </div>

                {/* Boundaries Snippet */}
                {agent.boundaries.length > 0 && (
                  <div className="flex flex-col gap-1 p-2.5 rounded-lg bg-red-50/70 border border-red-200/60 text-xs">
                    <div className="flex items-center gap-1.5 text-red-700 font-bold text-[11px]">
                      <ShieldAlert className="w-3.5 h-3.5" />
                      <span>Batasan Mutlak (Strict Boundaries):</span>
                    </div>
                    <p className="text-[11px] text-red-900 line-clamp-2 leading-relaxed">
                      {agent.boundaries[0]}
                    </p>
                  </div>
                )}

                {/* Interactive Skills Chip Container */}
                {agent.skills && agent.skills.length > 0 && (
                  <div className="flex flex-col gap-2 p-3 rounded-lg bg-[#FAFBFC] border border-[#EBECF0]">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-bold text-[#172B4D] flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-purple-600" />
                        Katalog Skill Spesifik:
                      </span>
                      <span className="text-[10px] text-[#5E6C84]">Klik untuk salin prompt</span>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {agent.skills.map((skillName) => {
                        const skill = skillsRegistry[skillName];
                        const isCopied = copiedId === `${agent.id}-${skillName}`;

                        return (
                          <div
                            key={skillName}
                            className="inline-flex items-center rounded-md border border-[#DFE1E6] bg-white text-[#42526E] hover:border-[#0052CC] hover:bg-[#DEEBFF]/20 transition-all shadow-2xs group/chip overflow-hidden"
                          >
                            {/* Click to open full unabridged spec modal */}
                            <button
                              type="button"
                              onClick={() => handleOpenSkillModal(skillName, skill?.source)}
                              title={`View full English spec for ${skillName}`}
                              className="text-[10px] px-2 py-1 font-mono font-medium flex items-center gap-1 cursor-pointer hover:text-[#0052CC]"
                            >
                              {skill?.icon || <Sparkles className="w-3 h-3" />}
                              <span className="truncate max-w-[120px]">{skillName}</span>
                            </button>

                            {/* Quick copy prompt button */}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCopyPrompt(
                                  agent,
                                  skill?.prompt || agent.samplePrompt,
                                  skillName
                                );
                              }}
                              title="Copy prompt"
                              className="px-1.5 py-1 border-l border-[#EBECF0] hover:bg-[#DEEBFF] text-[#5E6C84] hover:text-[#0052CC] transition-colors cursor-pointer"
                            >
                              {isCopied ? (
                                <Check className="w-3 h-3 text-emerald-600" />
                              ) : (
                                <Copy className="w-3 h-3" />
                              )}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Card Footer: Action Buttons */}
              <div className="flex items-center justify-between pt-3 border-t border-[#EBECF0] gap-2">
                <button
                  onClick={() => onOpenDoc(agent.path)}
                  className="flex items-center gap-1 text-xs font-semibold text-[#5E6C84] hover:text-[#0052CC] transition-colors cursor-pointer"
                >
                  <span>Lihat Panduan</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => handleCopyPrompt(agent)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0052CC] hover:bg-[#0747A6] active:bg-[#003884] text-white text-xs font-semibold shadow-xs transition-all cursor-pointer"
                >
                  {copiedId === agent.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-300" />
                      <span>Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Salin Prompt Utama</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Full Skill Specification Modal */}
      {activeSkillModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-2xs p-4 animate-fade-in">
          <div className="relative w-full max-w-3xl bg-white border border-[#DFE1E6] rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            {/* Modal Header */}
            <div className="p-4 px-6 border-b border-[#EBECF0] bg-[#FAFBFC] flex items-center justify-between gap-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#EAE6FF] border border-[#C0B6F2] text-[#5243AA] flex items-center justify-center shadow-xs">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-[#172B4D] text-sm font-mono">
                      {activeSkillModal.name}
                    </h3>
                    {activeSkillModal.source && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#DEEBFF] text-[#0747A6] font-bold">
                        {activeSkillModal.source}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-[#5E6C84]">Full Canonical Skill Specification</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(`/${activeSkillModal.name}`);
                    setCopiedModalText(true);
                    setTimeout(() => setCopiedModalText(false), 2000);
                  }}
                  className="px-3 py-1.5 rounded-md bg-[#F4F5F7] hover:bg-[#EBECF0] text-[#172B4D] text-xs font-mono font-medium border border-[#DFE1E6] transition-colors cursor-pointer"
                  title="Copy slash command"
                >
                  /{activeSkillModal.name}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(activeSkillModal.content);
                    setCopiedModalText(true);
                    setTimeout(() => setCopiedModalText(false), 2000);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#0052CC] hover:bg-[#0747A6] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                >
                  {copiedModalText ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-300" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Full SKILL.md</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setActiveSkillModal(null)}
                  className="p-1 text-[#5E6C84] hover:text-[#172B4D] rounded-md hover:bg-[#EBECF0] transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6 max-h-[calc(85vh-80px)]">
              {isLoadingSkill ? (
                <div className="flex items-center justify-center p-12 text-[#5E6C84] text-xs font-mono">
                  Loading skill specification...
                </div>
              ) : (
                <div className="max-w-none">
                  <MarkdownViewer content={activeSkillModal.content} />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

# Unified Agent Skills Catalog

Dokumen ini merupakan indeks terpadu seluruh keterampilan (*skills*) yang diadopsi dari registry dan direktori AI Agent terkemuka di dunia:
- **[Skills.sh](https://www.skills.sh/)** (Vercel Labs Agent Registry)
- **[AgentSkill.sh](https://agentskill.sh/)** (Multi-Role Agent Marketplace)
- **[Akilima.io Skills](https://www.akilima.io/skills)** (Graph-of-Skills & Tool Scoring)
- **[Skill-Atlas (luongs3)](https://github.com/luongs3/skill-atlas)** (Trust-Rated Job-Based Skills Mapping)
- **[AgentNative.dev](https://www.agentnative.dev/skills)** (Production-Grade Agentic Engineering)
- **[UI-Skills.com](https://www.ui-skills.com/)** (Julien Thibeaut / @ibelick)

---

## ️ Matriks Keterampilan per Peran AI Agent

| Peran AI Agent | Daftar Keterampilan Inti | Sumber Referensi Utama |
| :--- | :--- | :--- |
| **QA Engineer** | `playwright-e2e-testing`, `tdd-test-driven-development`, `contract-testing-pact`, `load-testing-k6`, `security-dast-scanning`, `bdd-gherkin-verification` | AgentNative, Skills.sh, Skill-Atlas |
| **Developer (Full-Stack)** | `clean-architecture-hexagonal`, `nextjs-react-best-practices`, `systematic-debugging`, `database-migrations-drizzle-prisma`, `api-resilience-circuit-breaker`, `docker-containerization-ci` | Skills.sh, AgentSkill.sh, AgentNative |
| **Solution Architect** | `c4-model-architecture`, `adr-architecture-decisions`, `event-driven-architecture`, `distributed-data-patterns`, `cost-and-capacity-planning`, `system-security-architecture` | Skill-Atlas, AgentSkill.sh |
| **Product Manager (PM)** | `user-story-mapping`, `rice-prioritization`, `gherkin-acceptance-criteria`, `data-driven-metrics-north-star`, `competitive-gap-analysis`, `voice-of-customer-synthesis` | AgentSkill.sh, Skills.sh |
| **Security Engineer** | `stride-threat-modeling`, `owasp-top-10-mitigation`, `rbac-abac-policy-matrix`, `secrets-and-key-rotation`, `sast-dependency-audit`, `incident-response-runbooks` | AgentNative, Skill-Atlas |
| **Business Analyst (BA)** | `bpmn-process-modeling`, `state-machine-transitions`, `ubiquitous-language-glossary`, `gap-analysis-as-is-to-be`, `stakeholder-matrix-raci`, `financial-rule-reconciliation` | AgentSkill.sh, Skill-Atlas |
| **UI/UX Designer** | `baseline-ui`, `improve-ui`, `fixing-accessibility`, `fixing-motion-performance`, `fixing-metadata`, `ui-skills-root` | UI-Skills.com, Skills.sh |

---

## Aturan Pemanggilan Skill (Skill Routing Rules)

1. **Prinsip "Less is More"**: Muat hanya 1 skill spesifik untuk tugas operasional reguler.
2. **Kombinasi Maksimal 2-3 Skill**: Hanya padukan skill saat tugas membutuhkan sudut pandang ganda (misal: `playwright-e2e-testing` + `bdd-gherkin-verification` untuk verifikasi fitur).
3. **Spesifisitas Tinggi**: Hindari instruksi umum (misal: "tolong buat test"). Gunakan perintah berbasis skill (misal: "terapkan skill `playwright-e2e-testing` dengan network mocking").

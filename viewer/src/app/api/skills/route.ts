import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import { getProjectRoot } from '@/lib/storage';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const skillName = searchParams.get('name');

    if (!skillName) {
      return NextResponse.json({ error: 'Parameter name is required' }, { status: 400 });
    }

    const root = getProjectRoot();
    const safeName = path.basename(skillName);

    // Potential paths in progressive order
    const candidatePaths = [
      // 1. Role skill in .agents/skills/<name>/SKILL.md
      path.join(root, '.agents', 'skills', safeName, 'SKILL.md'),
      // 2. Library skill in skills/<name>/SKILL.md
      path.join(root, 'skills', safeName, 'SKILL.md'),
      // 3. Rule in .agents/rules/<name>.md
      path.join(root, '.agents', 'rules', `${safeName}.md`),
      // 4. Flat file in skills/<name>.md
      path.join(root, 'skills', `${safeName}.md`),
    ];

    // Also check inside .agents/skills/*/references/<name>.md
    const agentsSkillsDir = path.join(root, '.agents', 'skills');
    if (fs.existsSync(agentsSkillsDir)) {
      const roles = fs.readdirSync(agentsSkillsDir, { withFileTypes: true });
      for (const role of roles) {
        if (role.isDirectory()) {
          candidatePaths.push(
            path.join(agentsSkillsDir, role.name, 'references', `${safeName}.md`),
            path.join(agentsSkillsDir, role.name, 'references', `${safeName}`)
          );
        }
      }
    }

    let foundPath: string | null = null;
    for (const p of candidatePaths) {
      if (fs.existsSync(p) && fs.statSync(p).isFile()) {
        foundPath = p;
        break;
      }
    }

    if (!foundPath) {
      return NextResponse.json(
        { error: `Skill or specification "${safeName}" not found.` },
        { status: 404 }
      );
    }

    const content = fs.readFileSync(foundPath, 'utf-8');
    const relativePath = path.relative(root, foundPath);

    return NextResponse.json({ name: safeName, content, path: relativePath });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

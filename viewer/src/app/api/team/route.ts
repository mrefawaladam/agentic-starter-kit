import { NextResponse } from 'next/server';
import { getAllUsers } from '@/lib/auth';

export async function GET() {
  try {
    let humanUsers: { id: string; name: string; role: string; type: 'human' }[] = [];
    try {
      const records = getAllUsers();
      humanUsers = records.map((u) => ({
        id: u.id,
        name: u.name,
        role: u.role,
        type: 'human',
      }));
    } catch {
      humanUsers = [{ id: 'usr_lead', name: 'Human Lead', role: 'Engineering Lead', type: 'human' }];
    }

    const aiAgents = [
      { id: 'pm', name: 'Product Manager', role: 'Requirements & PRD', type: 'agent' },
      { id: 'ba', name: 'Business Analyst', role: 'Business Process & Workflows', type: 'agent' },
      { id: 'ui-ux', name: 'UI/UX Designer', role: 'Design System & UX Flows', type: 'agent' },
      { id: 'architect', name: 'Solution Architect', role: 'HLD/LLD & API Architecture', type: 'agent' },
      { id: 'frontend', name: 'Frontend Developer', role: 'Next.js & UI Components', type: 'agent' },
      { id: 'backend', name: 'Backend Developer', role: 'Go Clean Architecture', type: 'agent' },
      { id: 'qa', name: 'Quality Engineer', role: 'Test Automation & BDD', type: 'agent' },
      { id: 'security', name: 'Security Engineer', role: 'STRIDE & Threat Modeling', type: 'agent' },
    ];

    return NextResponse.json({
      humans: humanUsers,
      agents: aiAgents,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

# Design Tokens Guide

## Color Palette (Clean Executive & Neutral Focus)

| Token Name | Tailwind Class | Hex Value | Purpose |
| :--- | :--- | :--- | :--- |
| **Brand Primary** | `bg-blue-600` / `text-blue-600` | `#2563eb` | Primary buttons, active tabs, brand accents |
| **Brand Hover** | `hover:bg-blue-700` | `#1d4ed8` | Primary button hover state |
| **Surface Base** | `bg-white` | `#ffffff` | Card surfaces, modal backgrounds |
| **Surface Subtle** | `bg-slate-50` / `bg-slate-100` | `#f8fafc` | Background canvas, table headers |
| **Border Subtle** | `border-slate-200` | `#e2e8f0` | Dividers, card borders, input borders |
| **Text Primary** | `text-slate-900` | `#0f172a` | Headings, high-emphasis text |
| **Text Secondary** | `text-slate-600` | `#475569` | Body copy, secondary metadata |
| **Text Muted** | `text-slate-400` | `#94a3b8` | Placeholders, inactive icons |
| **Success** | `bg-emerald-50 text-emerald-700` | `#047857` | Paid statuses, completed tasks |
| **Warning** | `bg-amber-50 text-amber-700` | `#b45309` | Pending actions, expiring items |
| **Danger** | `bg-rose-50 text-rose-700` | `#be123c` | Failed transactions, overdue bills |

## Spatial Density & Radius
- Border Radius: Default `rounded-lg` (`8px`) for cards and inputs, `rounded-md` (`6px`) for buttons and badges.
- Layout Spacing: 4px grid (`p-2`, `p-4`, `p-6`, `gap-3`, `gap-4`).

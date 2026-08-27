# Skill logos (drop-in)

The Skills section shows a brand logo next to a tech chip **as soon as you add the file
here** — no code change. Until then the chip is text-only (nothing breaks).

Save each as `<slug>.svg` (preferred) or `<slug>.png`, **square**, ideally on a
transparent background, ~64×64+.

| Skill (chip) | File to add |
|---|---|
| JavaScript | `javascript.svg` |
| React | `react.svg` |
| Supabase | `supabase.svg` |
| Git & GitHub | `github.svg` |
| Microsoft SQL Server | `sql-server.svg` |
| Oracle SQL Developer | `oracle.svg` |
| SQL | `sql.svg` |
| Trac | `trac.svg` |
| TortoiseSVN | `tortoisesvn.svg` |
| SharePoint | `sharepoint.svg` |
| Prompt Engineering | `openai.svg` |
| Generative AI | `claude.svg` |

Tip: grab clean SVGs from the official brand pages or an icon set. To add a logo for a
different skill, add a `Name: 'slug'` line in `src/components/Skills.jsx` (`LOGO_SKILLS`).

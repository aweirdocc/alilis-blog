# alilis-blog — Agent Guide

## Project Overview
Personal blog site built with **VitePress** + **Vue 3**, powered by pnpm workspaces monorepo. Live at [alilis.space](https://alilis.space).

## Tech Stack
- **Framework:** VitePress (docs site), Vue 3
- **Package Manager:** pnpm (workspaces)
- **UI Libs:** Element Plus, TDesign Vue Next, @element-plus/icons-vue
- **Build Tools:** Vite, Sass, vite-plugin-svg-icons
- **Plugins:** @giscus/vue (comments), medium-zoom (image zoom), gray-matter (markdown frontmatter)

## Monorepo Packages (`packages/*`)
| Package | Description |
|---------|-------------|
| `@blog/couplet` | Couplet/对联 component |
| `@blog/figlet` | Figlet ASCII art |
| `@blog/hooks` | Shared Vue composables |
| `@blog/img2url` | Image to URL converter |
| `@blog/mapchart` | Map chart component |
| `@blog/pinyin` | Pinyin utility |
| `@blog/stack` | Stack component |
| `@blog/works-panel` | Works panel component |

## Commands
- `pnpm docs:dev` — Start dev server
- `pnpm docs:build` — Build for production
- `pnpm docs:serve` — Preview production build

## Project Structure
```
├── docs/
│   ├── .vitepress/   # VitePress config, theme, utils
│   ├── blogs/        # Blog posts (markdown)
│   ├── public/       # Static assets
│   ├── index.md      # Home page
│   ├── gallery.md
│   └── works-panel.md
├── packages/         # 8 workspace packages
├── package.json      # pnpm workspace root
└── pnpm-workspace.yaml
```

## Code Guidelines
- ESM only (`"type": "module"`)
- Vue 3 Composition API with `<script setup>`
- Workspace packages referenced as `workspace:^` or `workspace:^1.0.0`
- New blog posts go in `docs/blogs/` as markdown with frontmatter

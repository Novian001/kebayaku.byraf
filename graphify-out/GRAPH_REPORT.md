# Graph Report - kebaya-atelier  (2026-09-27)

## Corpus Check
- Corpus is ~5,145 words - fits in a single context window. You may not need a graph.

## Summary
- 157 nodes · 250 edges · 10 communities (9 shown, 1 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 2 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Build Tooling and Dependencies
- Product Card and Detail Rendering
- Layout, Fonts and Metadata
- Catalog Grid and Product Data
- TypeScript Compiler Config
- Dev Server and Package Managers
- Build-time Asset Scripts
- Styling and Lint Dependencies
- Next.js Docs and Scaffolding
- PostCSS Config

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `next` - 14 edges
3. `site` - 13 edges
4. `WhatsAppButton()` - 9 edges
5. `formatIDR()` - 8 edges
6. `Next.js` - 7 edges
7. `scripts` - 5 edges
8. `CTASection()` - 5 edges
9. `SectionTitle()` - 5 edges
10. `Product` - 4 edges

## Surprising Connections (you probably didn't know these)
- `generateMetadata()` --calls--> `getProduct()`  [EXTRACTED]
  src/app/catalog/[slug]/page.tsx → src/data/products.ts
- `generateMetadata()` --calls--> `formatIDR()`  [EXTRACTED]
  src/app/catalog/[slug]/page.tsx → src/lib/site.ts
- `ProductPage()` --calls--> `getProduct()`  [EXTRACTED]
  src/app/catalog/[slug]/page.tsx → src/data/products.ts
- `ProductPage()` --calls--> `formatIDR()`  [EXTRACTED]
  src/app/catalog/[slug]/page.tsx → src/lib/site.ts
- `ProductCard()` --calls--> `formatIDR()`  [EXTRACTED]
  src/components/ProductCard.tsx → src/lib/site.ts

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Local Development Workflow** — readme_dev_script, readme_package_managers, readme_dev_server, readme_localhost_3000, src_app_page [EXTRACTED 1.00]

## Communities (10 total, 1 thin omitted)

### Community 0 - "Build Tooling and Dependencies"
Cohesion: 0.00
Nodes (23): eslintConfig, dependencies, next, react, react-dom, name, private, scripts (+15 more)

### Community 1 - "Product Card and Detail Rendering"
Cohesion: 0.00
Nodes (16): availabilityStyles, generateMetadata(), Params, ProductPage(), availabilityLabel, availabilityStyles, ProductCard(), Props (+8 more)

### Community 2 - "Layout, Fonts and Metadata"
Cohesion: 0.00
Nodes (12): nextConfig, next, react, src_app_globals, jakarta, metadata, playfair, Footer() (+4 more)

### Community 3 - "Catalog Grid and Product Data"
Cohesion: 0.00
Nodes (11): metadata, CatalogGrid(), Props, ProductGrid(), Props, Availability, categories, Category (+3 more)

### Community 4 - "TypeScript Compiler Config"
Cohesion: 0.00
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 5 - "Dev Server and Package Managers"
Cohesion: 0.00
Nodes (12): dev script (npm run dev), Development Server, http://localhost:3000, Package Managers (npm, yarn, pnpm, bun), details, metadata, pillars, CTASection() (+4 more)

### Community 6 - "Build-time Asset Scripts"
Cohesion: 0.00
Nodes (10): ref_node_child_process, ref_node_fs, ref_node_path, ref_node_url, files, label, out, out (+2 more)

### Community 7 - "Styling and Lint Dependencies"
Cohesion: 0.00
Nodes (10): devDependencies, daisyui, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, @types/node, @types/react (+2 more)

### Community 8 - "Next.js Docs and Scaffolding"
Cohesion: 0.00
Nodes (9): create-next-app, Next.js Deployment Documentation, Geist, Learn Next.js Tutorial, next/font, Next.js, Next.js Documentation, Next.js GitHub Repository (+1 more)

## Knowledge Gaps
- **79 isolated node(s):** `eslintConfig`, `nextConfig`, `name`, `version`, `private` (+74 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 93 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `Layout, Fonts and Metadata` to `Build Tooling and Dependencies`, `Product Card and Detail Rendering`, `Catalog Grid and Product Data`, `Dev Server and Package Managers`?**
  _High betweenness centrality (0.242) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `Styling and Lint Dependencies` to `Build Tooling and Dependencies`?**
  _High betweenness centrality (0.080) - this node is a cross-community bridge._
- **What connects `eslintConfig`, `nextConfig`, `name` to the rest of the system?**
  _79 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Build Tooling and Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.08333333333333333 - nodes in this community are weakly interconnected._
- **Should `Layout, Fonts and Metadata` be split into smaller, more focused modules?**
  _Cohesion score 0.14619883040935672 - nodes in this community are weakly interconnected._
- **Should `TypeScript Compiler Config` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._
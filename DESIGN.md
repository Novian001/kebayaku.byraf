# DESIGN.md

## Brand
Kebayaku by Raf

## Visual Direction
- Editorial kebaya rental.
- Elegant but restrained.
- Emerald + ivory core palette.
- Gold only as a rare accent, NOT default text.
- Square / near-zero-radius system.
- Photography is the primary visual element.
- Hairline/border language over shadows/cards.
- No generic SaaS/bento/dashboard aesthetic.
- No gradients except the existing deliberate gold hairline.

## Dials

### ENERGY: 1
- Restrained
- Editorial
- Photography-led
- Minimal decoration

### RHYTHM: 2
- Sections need not repeat the same composition.
- Allow alternating densities/layouts.
- Avoid four identical feature-card template sections.

### MOTION: 1
- Subtle only
- No loops
- No floating/pulsing
- Preserve prefers-reduced-motion behavior

## Rationale
- **Typography**: Playfair_Display + Plus_Jakarta_Sans. Serif establishes editorial tone; sans keeps body readable at Indonesian text length.
- **Palette**: `#0d3b32` (emerald) + `#faf8f5` (ivory) as core. Gold `#d4af37` is an accent, never normal body text (does not reach WCAG AA).
- **Gold scope**: Limited to deliberate non-text accents (hairlines/borders at key moments). Never for small labels/eyebrows.
- **Square corners**: Near-zero radius (`--radius-*` 0) is intentional to keep the aesthetic editorial/fashion, not SaaS.
- **Photography-led**: Hero/product imagery drives focus; decoration kept minimal.
- **Hairline language**: Borders and 1px rules communicate hierarchy without card depth.
- **Focus**: Authored `:focus-visible` treatment; skip-link preserved.
- **Content honesty**: Only user-provided facts rendered; no fabricated statistics or unverifiable claims.
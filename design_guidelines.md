# Gen-Z Dark-Rave Portfolio Design Guidelines

## Design Approach
**Reference-Based Approach**: Drawing inspiration from modern developer portfolios like Bruno Simon, Lynn Fisher, and Jacek Jeznach, combined with dark-rave aesthetic influences from cyberpunk and retrowave visual culture.

## Core Design Principles
1. **Immersive Experience**: Lead with interactive 3D, not traditional hero sections
2. **Neon Energy**: Bold neon accents create visual hierarchy and guide attention
3. **Performance + Polish**: Smooth animations that never compromise speed
4. **Dark-First Design**: Embrace true black backgrounds with strategic neon pops

## Color System (CSS Variables)
```
--bg: #06040a (deep space black)
--panel: #0b0a10 (slightly elevated surfaces)
--neon-pink: #ff00c8 (primary accent, CTAs)
--neon-cyan: #00e5ff (secondary accent, links)
--neon-lime: #a8ff00 (tertiary accent, highlights)
--muted: #9aa0a6 (body text, less emphasis)
--text: #e6e7ea (primary text)
--glow: 0 6px 30px rgba(255,0,200,0.12), 0 4px 12px rgba(0,230,255,0.06)
```

## Typography
- **Headings**: JetBrains Mono (monospace) - 700 weight for bold statements, 500 for subtle tech vibe
- **Body**: Inter (sans-serif) - 400 regular, 500 medium for emphasis
- **Scale**: Mobile (base 16px) - Desktop (base 18px)
  - H1: 2.5rem/3.5rem (mobile/desktop)
  - H2: 2rem/2.75rem
  - H3: 1.5rem/2rem
  - Body: 1rem/1.125rem

## Layout System
**Spacing**: Use Tailwind units of 2, 4, 6, 8, 12, 16, 20, 24
- Section padding: py-20 (desktop), py-12 (mobile)
- Component gaps: gap-6 to gap-8
- Container max-width: max-w-7xl with px-6/px-8

## Page-Specific Layouts

### Home (/)
- **Full-viewport 3D Hero**: Interactive three.js scene (100vh) with subtle particle system responding to mouse/touch
- **Overlay Typography**: Name in monospace, tagline in sans, floating over 3D with neon glow
- **Scroll Indicator**: Animated neon chevron or pulsing dot

### About (/about)
- **Split Layout**: 40/60 split on desktop - left side bio with profile image, right side education timeline
- **Scanline Texture**: Subtle horizontal lines overlay on background
- **Neon Borders**: Use 1px neon-cyan borders on cards/panels

### Skills (/skills)
- **Radial Progress Charts**: Circular SVG visualizations with neon-pink/cyan gradients
- **Grid Layout**: 2-column mobile, 3-4 column desktop (grid-cols-2 md:grid-cols-3 lg:grid-cols-4)
- **Stagger Animation**: Charts animate in with 100ms delays on scroll into view

### Experience (/experience)
- **Vertical Timeline**: Center line with neon glow, alternating left/right cards on desktop, single column mobile
- **Timeline Dots**: Pulsing neon circles at each entry point
- **Card Elevation**: panel background with subtle neon-pink glow on hover

### Projects (/projects)
- **Masonry Grid**: Staggered project cards, 1 col mobile, 2 cols tablet, 3 cols desktop
- **3D Tilt Effect**: Cards tilt on mouse move with transform-style: preserve-3d
- **Neon Border Gradient**: Animated border that shifts between neon-pink and neon-cyan on hover
- **Modal Details**: Full-screen overlay with smooth scale + fade transition, dark backdrop with blur

### Contact (/contact)
- **Centered Form**: max-w-2xl centered container
- **Neon Focus States**: Input borders glow neon-cyan on focus
- **Floating Labels**: Labels transition to top on input focus
- **Success State**: Neon-lime confirmation with checkmark icon

## Component Library

### Navigation
- Fixed top bar with backdrop-blur, semi-transparent panel background
- Logo: Monospace name with neon-pink accent
- Links: Underline animation slides in from left with neon-cyan
- Mobile: Slide-in drawer from right with neon border

### Buttons
- **Primary**: neon-pink background, black text, box-shadow with glow
- **Secondary**: transparent with neon-cyan border, neon-cyan text
- **Hover**: Intensity increase + slight scale (1.02)
- **Active**: Scale down (0.98)

### Cards/Panels
- Background: var(--panel)
- Border radius: 14px
- Border: 1px solid rgba(255,0,200,0.15)
- Hover: box-shadow with neon glow, slight y-translate (-4px)

### Form Inputs
- Background: rgba(11,10,16,0.6) with backdrop blur
- Border: 1px solid rgba(154,160,166,0.2)
- Focus: neon-cyan border with outer glow
- Padding: px-4 py-3

## Textures & Effects
- **Grain Overlay**: Subtle noise texture at 3% opacity over entire viewport
- **Scanlines**: Horizontal 1px repeating lines at 5% opacity on specific sections
- **Glow Effects**: Use box-shadow and filter: drop-shadow for neon elements
- **Gradient Accents**: Linear gradients from neon-pink to neon-cyan on dividers

## Animation Principles
- **Page Transitions**: 600ms fade + horizontal sweep with neon trail effect
- **Micro-interactions**: 200-300ms for hovers, 150ms for clicks
- **Scroll Animations**: Fade-up with 400ms ease-out as elements enter viewport
- **3D Hero**: Continuous slow rotation/drift, mouse parallax with 0.8s ease-out

## Responsive Breakpoints
- Mobile: < 768px (single column, stacked layouts)
- Tablet: 768px - 1024px (2 columns where appropriate)
- Desktop: > 1024px (full multi-column layouts)

## Accessibility
- Focus rings: 2px neon-cyan outline with 4px offset
- Skip to content link (sr-only, visible on focus)
- All interactive elements min 44px touch target
- ARIA labels on icon-only buttons
- Semantic HTML5 elements (nav, main, section, article)

## Images
No traditional hero images needed - the 3D three.js scene IS the hero visual. For project cards, use project screenshots/mockups with 16:9 aspect ratio, optimized via next/image.
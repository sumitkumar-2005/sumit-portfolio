# Sumit Portfolio - Gen-Z Dark Rave Developer Portfolio

## Overview
A production-ready, fully animated developer portfolio built with React, TypeScript, three.js for interactive 3D graphics, and custom page transitions. Features a Gen-Z dark-rave aesthetic with neon accents.

## Tech Stack
- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS with custom dark-rave theme
- **3D Graphics**: three.js for interactive hero scene
- **State Management**: TanStack Query for server state
- **Forms**: react-hook-form with Zod validation
- **Backend**: Express.js with TypeScript
- **UI Components**: shadcn/ui (Radix primitives)

## Project Structure
```
client/
├── src/
│   ├── components/
│   │   ├── ui/           # shadcn components
│   │   ├── Hero3D.tsx    # Three.js particle system
│   │   ├── Navbar.tsx    # Navigation with mobile drawer
│   │   ├── Footer.tsx    # Footer with social links
│   │   ├── TransitionLayer.tsx  # Page transitions
│   │   ├── SkillChart.tsx       # Radial SVG charts
│   │   ├── Timeline.tsx         # Experience timeline
│   │   └── ProjectCard.tsx      # 3D tilt project cards
│   ├── pages/
│   │   ├── Home.tsx      # Hero + stats
│   │   ├── About.tsx     # Bio + education
│   │   ├── Skills.tsx    # Skill charts
│   │   ├── Experience.tsx # Work timeline
│   │   ├── Projects.tsx  # Project grid
│   │   └── Contact.tsx   # Contact form
│   ├── App.tsx
│   └── index.css         # Theme variables
server/
├── routes.ts             # API endpoints
└── storage.ts            # In-memory storage
shared/
└── schema.ts             # Zod schemas + data
```

## Theme System
The dark-rave theme uses CSS variables defined in `index.css`:
- `--neon-pink`: #ff00c8 (primary accent)
- `--neon-cyan`: #00e5ff (secondary accent)
- `--neon-lime`: #a8ff00 (tertiary accent)
- Background: Deep purple-black (#06040a)
- Typography: Inter (sans) + JetBrains Mono (mono)

## Key Features

### Three.js Hero Scene
- 2000 instanced particles with shader materials
- 3 animated rings with neon colors
- Mouse/touch parallax effect
- Proper cleanup on unmount

### Page Transitions
- Custom TransitionLayer component
- Barba.js-like smooth transitions
- Cached children during transition
- Neon sweep animation overlay

### Skill Visualizations
- Radial SVG progress charts
- Intersection Observer animations
- Staggered entrance effects
- Filterable by category

### Project Cards
- 3D tilt effect on hover
- Animated neon border gradient
- Detail modal with full info
- Search and filter functionality

## API Endpoints

### POST /api/contact
Handles contact form submissions with Zod validation.

**Request body:**
```json
{
  "name": "string (min 2 chars)",
  "email": "valid email",
  "message": "string (min 10 chars)"
}
```

**Response:**
```json
{
  "ok": true,
  "message": "Message received successfully",
  "id": "uuid"
}
```

## Customization

### Changing Portfolio Data
Edit `shared/schema.ts` to update:
- `skills`: Technical skills with levels
- `experiences`: Work history
- `education`: Educational background
- `projects`: Portfolio projects

### SMTP Integration
For real email sending, add these env vars:
- `SMTP_HOST`: SMTP server hostname
- `SMTP_PORT`: SMTP port (usually 587)
- `SMTP_USER`: SMTP username
- `SMTP_PASS`: SMTP password
- `SMTP_FROM`: Sender email address

## Development Commands
- `npm run dev`: Start development server (port 5000)
- `npm run build`: Build for production
- `npm run start`: Start production server

## Performance Optimizations
- Three.js loaded only on client side
- Proper WebGL cleanup to prevent memory leaks
- Lazy-loaded heavy components
- Optimized particle count for performance
- Event listener cleanup on unmount

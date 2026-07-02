# Nxvora — Landing Page

Premium 3D landing page for **Nxvora**, an AI-powered social media marketing agency based in Gurgaon, Delhi-NCR.

## Tech Stack

- **React 18** + **Vite 5**
- **Tailwind CSS** for layout & styling
- **React Three Fiber** + **drei** for the hero 3D element
- **Framer Motion** for scroll/entrance animations
- Native CSS `scroll-behavior: smooth` (no Lenis dep — keeps bundle lean)

## Design System (locked)

| Token | Value |
| --- | --- |
| Paper | `#FFFFFF` |
| Off-white | `#FAFAFA` |
| Ink | `#0A0A0A` |
| Accent (only one) | `#D4A017` — warm amber/gold |
| Body font | Inter |
| Display font | Space Grotesk |

## Getting Started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production bundle in /dist
npm run preview  # preview production build
```

## Project Structure

```
src/
├── main.jsx              # React root
├── App.jsx               # Composes all sections
├── index.css             # Tailwind base + global tokens
├── hooks/
│   ├── useWebGL.js       # Detect WebGL for R3F fallback
│   └── useMouseTilt.js   # Smoothed mouse position (parallax)
├── components/
│   ├── Navbar.jsx
│   ├── Hero.jsx
│   ├── About.jsx
│   ├── Services.jsx
│   ├── MissionVision.jsx
│   ├── WhyAI.jsx
│   ├── Contact.jsx
│   ├── Footer.jsx
│   ├── MagneticButton.jsx
│   └── three/
│       ├── HeroScene.jsx       # R3F <Canvas> wrapper
│       ├── DistortedShape.jsx  # The icosahedron
│       └── SceneFallback.jsx   # Static gradient fallback
└── lib/
    └── motion.js          # Shared Framer Motion variants
```

## Where to swap in real assets

Search the codebase for `<!-- TODO: asset -->` comments — every placeholder is marked.

- **Logo**: `src/components/Navbar.jsx` and `src/components/Footer.jsx` (the inline wordmark).
- **Favicon**: `public/favicon.svg`.
- **3D geometry**: `src/components/three/DistortedShape.jsx` — swap the icosahedron for a torus knot, particle sphere, or imported GLTF.
- **Service icons**: `src/components/Services.jsx` — currently inline SVGs; swap for a Lucide / Phosphor set when ready.
- **Social links**: `src/components/Footer.jsx`.

## Performance notes

- The R3F `<Canvas>` is `lazy` + `Suspense`-bounded; if WebGL is unavailable, the fallback gradient renders instead.
- The icosahedron geometry is low-poly (`detail: 1`) and uses `MeshDistortMaterial` (no extra shaders).
- All sections render in a single document scroll — no client-side router.

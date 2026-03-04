# Copilot Instructions

## Project Overview
UI component playground for AI-themed input/button effects — aurora glows, animated borders, WebGL backgrounds. Built with React 19 + TypeScript + Vite. No backend, no routing, no tests.

## Commands
```bash
npm run dev       # start dev server (HMR via @vitejs/plugin-react)
npm run build     # tsc -b && vite build
npm run lint      # eslint
npm run preview   # preview production build
```

## Architecture: Three-View Playground
`App.tsx` renders one of three views controlled by `SegmentedButton`:
- `input` → `InputFieldView` — AI chat input field with aurora border
- `aurora` → `BackgroundAuroraView` — fullscreen WebGL aurora background
- `trigger` → `AITriggerView` — floating AI trigger button (e.g. "Help me choose")

Each view has a dedicated Leva hook in `src/hooks/` that conditionally shows panels only when its view is active using `render: () => isView`:
```ts
// src/hooks/useAITriggerControls.ts
label: { value: 'Help me choose', render: () => isTrigger }
```

## Central Data Type
`GradientControlValues` (`src/types.ts`) is the single shared shape flowing from hooks → views → components:
```ts
{ colors, glow, animation, border, aurora }
```
`useGradientControls` is shared between `input` and `trigger` views. Per-view hooks (`useAITriggerControls`, `useBackgroundAuroraControls`) handle view-specific state.

## Aurora Effect Pattern (CSS-based)
Both `AIInputField` and `AITriggerButton` use the same two-layer pattern:
1. **Glow layer** — absolute, negative inset (`-${glow.spread}px`), blurred, low opacity
2. **Border layer** — absolute, tight negative inset (`-${border.width}px`), no blur

Both layers render `<AuroraLayers>` from `src/components/AIInputField/AuroraGlow.tsx`, which uses `motion/react` (not framer-motion) for keyframe animations of `radial-gradient` ellipses per edge direction.

`AIInputField` maps controls to CSS custom properties (`--glow-intensity`, `--border-width`, etc.) on the wrapper element. `AITriggerButton` uses inline styles and computes geometry directly.

## WebGL Aurora (Separate System)
`BackgroundAurora.tsx` uses `ogl` (not Three.js) with a raw GLSL simplex-noise fragment shader. Completely independent from the CSS `AuroraLayers` system. Props: `colors`, `opacity`, `blur`, `speed`, `amplitude`, `blend`, `mouseFollow`, `enabled`.

## Key Dependencies
| Package | Role |
|---|---|
| `leva` | Dev control panel (all `useControls`/`folder` calls) |
| `motion` (`motion/react`) | Aurora keyframe animations — import from `motion/react`, not `framer-motion` |
| `ogl` | WebGL renderer for `BackgroundAurora` |

## Theming
`AITriggerButton` accepts `theme: 'light' | 'dark'` (`TriggerTheme`). The dark variant adds the `ai-trigger--dark` CSS class. Theme is toggled inside `AITriggerView` with local state, not from the Leva panel.

## File Conventions
- Each component has a co-located `.css` file (e.g. `AITriggerButton.css`)
- Debug/dev panels live in `AuroraCSSDebugPanel.tsx` and `CSSDebugPanel.tsx`
- `src/views/` = page-level view wrappers; `src/components/` = reusable UI; `src/hooks/` = Leva control hooks

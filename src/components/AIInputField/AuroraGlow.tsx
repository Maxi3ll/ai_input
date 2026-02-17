import { motion } from 'motion/react';
import type { GradientColors, AuroraSettings } from '../../types';

interface AuroraLayersProps {
  colors: GradientColors;
  speed: number;
  running: boolean;
  aurora: AuroraSettings;
}

type Direction = 'top' | 'right' | 'bottom' | 'left';

/**
 * For each active direction, compute the anchor point and ellipse orientation.
 * The sweep axis is always perpendicular to the edge the glow emanates from.
 * x/y offsets shift all anchor positions.
 */
function getDirectionAnchors(dir: Direction, ox: number, oy: number) {
  // Each direction returns 3 keyframe anchor configs:
  // { cx, cy, ew, eh } — center-x%, center-y%, ellipse-width%, ellipse-height%
  // plus sweep positions for the secondary layers
  switch (dir) {
    case 'bottom':
      return {
        layer1: [
          { cx: 50 + ox, cy: 110 + oy, ew: 80, eh: 50 },
          { cx: 50 + ox, cy: 100 + oy, ew: 100, eh: 65 },
          { cx: 50 + ox, cy: 110 + oy, ew: 80, eh: 50 },
        ],
        layer2: [
          { cx: 15 + ox, cy: 80 + oy, ew: 55, eh: 45 },
          { cx: 50 + ox, cy: 65 + oy, ew: 70, eh: 55 },
          { cx: 85 + ox, cy: 80 + oy, ew: 55, eh: 45 },
        ],
        layer3: [
          { cx: 80 + ox, cy: 85 + oy, ew: 50, eh: 40 },
          { cx: 45 + ox, cy: 75 + oy, ew: 65, eh: 50 },
          { cx: 15 + ox, cy: 85 + oy, ew: 50, eh: 40 },
        ],
        shine: { edge: 'top' as const, angle: 90 },
      };
    case 'top':
      return {
        layer1: [
          { cx: 50 + ox, cy: -10 + oy, ew: 80, eh: 50 },
          { cx: 50 + ox, cy: 0 + oy, ew: 100, eh: 65 },
          { cx: 50 + ox, cy: -10 + oy, ew: 80, eh: 50 },
        ],
        layer2: [
          { cx: 15 + ox, cy: 20 + oy, ew: 55, eh: 45 },
          { cx: 50 + ox, cy: 35 + oy, ew: 70, eh: 55 },
          { cx: 85 + ox, cy: 20 + oy, ew: 55, eh: 45 },
        ],
        layer3: [
          { cx: 80 + ox, cy: 15 + oy, ew: 50, eh: 40 },
          { cx: 45 + ox, cy: 25 + oy, ew: 65, eh: 50 },
          { cx: 15 + ox, cy: 15 + oy, ew: 50, eh: 40 },
        ],
        shine: { edge: 'bottom' as const, angle: 90 },
      };
    case 'left':
      return {
        layer1: [
          { cx: -10 + ox, cy: 50 + oy, ew: 50, eh: 80 },
          { cx: 0 + ox, cy: 50 + oy, ew: 65, eh: 100 },
          { cx: -10 + ox, cy: 50 + oy, ew: 50, eh: 80 },
        ],
        layer2: [
          { cx: 20 + ox, cy: 15 + oy, ew: 45, eh: 55 },
          { cx: 35 + ox, cy: 50 + oy, ew: 55, eh: 70 },
          { cx: 20 + ox, cy: 85 + oy, ew: 45, eh: 55 },
        ],
        layer3: [
          { cx: 15 + ox, cy: 80 + oy, ew: 40, eh: 50 },
          { cx: 25 + ox, cy: 45 + oy, ew: 50, eh: 65 },
          { cx: 15 + ox, cy: 15 + oy, ew: 40, eh: 50 },
        ],
        shine: { edge: 'right' as const, angle: 0 },
      };
    case 'right':
      return {
        layer1: [
          { cx: 110 + ox, cy: 50 + oy, ew: 50, eh: 80 },
          { cx: 100 + ox, cy: 50 + oy, ew: 65, eh: 100 },
          { cx: 110 + ox, cy: 50 + oy, ew: 50, eh: 80 },
        ],
        layer2: [
          { cx: 80 + ox, cy: 15 + oy, ew: 45, eh: 55 },
          { cx: 65 + ox, cy: 50 + oy, ew: 55, eh: 70 },
          { cx: 80 + ox, cy: 85 + oy, ew: 45, eh: 55 },
        ],
        layer3: [
          { cx: 85 + ox, cy: 80 + oy, ew: 40, eh: 50 },
          { cx: 75 + ox, cy: 45 + oy, ew: 50, eh: 65 },
          { cx: 85 + ox, cy: 15 + oy, ew: 40, eh: 50 },
        ],
        shine: { edge: 'left' as const, angle: 0 },
      };
  }
}

function gradStr(
  kf: { cx: number; cy: number; ew: number; eh: number },
  color: string,
  fade: number,
) {
  return `radial-gradient(ellipse ${kf.ew}% ${kf.eh}% at ${kf.cx}% ${kf.cy}%, ${color} 0%, transparent ${fade}%)`;
}

function shineStyle(
  edge: 'top' | 'bottom' | 'left' | 'right',
  angle: number,
  colors: GradientColors,
): React.CSSProperties {
  const { color1, color2, color3 } = colors;
  const grad = `linear-gradient(${angle}deg, transparent 5%, ${color1}88, ${color2}66, ${color3}44, transparent 95%)`;
  const base: React.CSSProperties = {
    position: 'absolute',
    borderRadius: 'inherit',
    background: grad,
  };
  switch (edge) {
    case 'top':
      return { ...base, top: 0, left: 0, right: 0, height: 1 };
    case 'bottom':
      return { ...base, bottom: 0, left: 0, right: 0, height: 1 };
    case 'left':
      return { ...base, top: 0, bottom: 0, left: 0, width: 1 };
    case 'right':
      return { ...base, top: 0, bottom: 0, right: 0, width: 1 };
  }
}

export function AuroraLayers({ colors, speed, running, aurora }: AuroraLayersProps) {
  const { color1, color2, color3, color4 } = colors;
  const playback = running ? 'running' : 'paused';

  const layerBase: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    borderRadius: 'inherit',
    animationPlayState: playback,
  };

  // Collect active directions
  const dirs: Direction[] = [];
  if (aurora.top) dirs.push('top');
  if (aurora.right) dirs.push('right');
  if (aurora.bottom) dirs.push('bottom');
  if (aurora.left) dirs.push('left');

  // Fallback: if nothing selected, use bottom
  if (dirs.length === 0) dirs.push('bottom');

  // For multiple directions, each direction's gradients are composited
  // via multiple background layers in a single element
  const allAnchors = dirs.map((d) => getDirectionAnchors(d, aurora.x, aurora.y));

  // Build composite gradient keyframes for each layer (3 keyframes each)
  const buildComposite = (
    layerKey: 'layer1' | 'layer2' | 'layer3',
    color: string,
    fade: number,
  ) => {
    return [0, 1, 2].map((kfIdx) =>
      allAnchors
        .map((a) => gradStr(a[layerKey][kfIdx], color, fade))
        .join(', '),
    );
  };

  const layer1Kf = buildComposite('layer1', color1, 70);
  const layer1KfMid = buildComposite('layer1', color1, 75);
  // For layer1 we want a slightly different middle frame
  const layer1Bg = [layer1Kf[0], layer1KfMid[1], layer1Kf[2]];

  const layer2Bg = buildComposite('layer2', color2, 60);
  // Middle frame uses color3 instead
  const layer2BgMid = [0, 1, 2].map((kfIdx) =>
    allAnchors
      .map((a) =>
        gradStr(a.layer2[kfIdx], kfIdx === 1 ? color3 : color2, kfIdx === 1 ? 65 : 60),
      )
      .join(', '),
  );

  const layer3Bg = buildComposite('layer3', color4, 55);
  const layer3BgMid = [0, 1, 2].map((kfIdx) =>
    allAnchors
      .map((a) => gradStr(a.layer3[kfIdx], color4, kfIdx === 1 ? 60 : 55))
      .join(', '),
  );

  return (
    <>
      {/* Layer 1: Base glow — pulses opacity */}
      <motion.div
        style={{ ...layerBase }}
        animate={
          running
            ? {
                opacity: [0.7, 1, 0.7],
                background: layer1Bg,
              }
            : undefined
        }
        transition={{
          duration: speed,
          repeat: Infinity,
          repeatType: 'mirror',
          ease: 'easeInOut',
        }}
      />

      {/* Layer 2: Color sweep */}
      <motion.div
        style={{ ...layerBase, opacity: 0.85 }}
        animate={
          running
            ? {
                background: layer2BgMid,
              }
            : undefined
        }
        transition={{
          duration: speed * 1.67,
          repeat: Infinity,
          repeatType: 'mirror',
          ease: 'easeInOut',
        }}
      />

      {/* Layer 3: Slower counter-sweep */}
      <motion.div
        style={{ ...layerBase, opacity: 0.65 }}
        animate={
          running
            ? {
                background: layer3BgMid,
              }
            : undefined
        }
        transition={{
          duration: speed * 2,
          delay: speed * 0.15,
          repeat: Infinity,
          repeatType: 'mirror',
          ease: 'easeInOut',
        }}
      />

      {/* Shine lines — one per active direction */}
      {allAnchors.map((a, i) => (
        <motion.div
          key={dirs[i]}
          style={{
            ...shineStyle(a.shine.edge, a.shine.angle, colors),
            animationPlayState: playback,
          }}
          animate={running ? { opacity: [0.2, 0.7, 0.2] } : undefined}
          transition={{
            duration: speed * 0.8,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
          }}
        />
      ))}
    </>
  );
}

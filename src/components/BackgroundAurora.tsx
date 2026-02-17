import { useEffect, useRef } from 'react';
import { Renderer, Program, Mesh, Color, Triangle } from 'ogl';
import type { GradientColors } from '../types';
import './BackgroundAurora.css';

interface BackgroundAuroraProps {
  colors: GradientColors;
  opacity: number;
  blur: number;
  speed: number;
  amplitude: number;
  blend: number;
  mouseFollow: number;
  enabled: boolean;
}

const VERT = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

// Simplex noise + aurora fragment shader
// Optimized for light backgrounds: renders soft colored light from below
const FRAG = `#version 300 es
precision highp float;

uniform float uTime;
uniform float uAmplitude;
uniform vec3 uColorStops[3];
uniform vec2 uResolution;
uniform float uBlend;
uniform float uOpacity;
uniform vec2 uMouse;

out vec4 fragColor;

vec3 permute(vec3 x) {
  return mod(((x * 34.0) + 1.0) * x, 289.0);
}

float snoise(vec2 v) {
  const vec4 C = vec4(
    0.211324865405187, 0.366025403784439,
    -0.577350269189626, 0.024390243902439
  );
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);

  vec3 p = permute(
    permute(i.y + vec3(0.0, i1.y, 1.0))
    + i.x + vec3(0.0, i1.x, 1.0)
  );

  vec3 m = max(
    0.5 - vec3(
      dot(x0, x0),
      dot(x12.xy, x12.xy),
      dot(x12.zw, x12.zw)
    ),
    0.0
  );
  m = m * m;
  m = m * m;

  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);

  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;

  // Mouse influence: shift UV based on mouse position
  vec2 mouseOffset = uMouse * 0.15;
  vec2 nUv = uv + mouseOffset;

  // Color ramp: color1 dominant (both edges), color2 + color3 as accents
  float t = nUv.x;
  vec3 rampColor;
  if (t < 0.3) {
    rampColor = mix(uColorStops[0], uColorStops[1], t / 0.3);
  } else if (t < 0.6) {
    rampColor = mix(uColorStops[1], uColorStops[2], (t - 0.3) / 0.3);
  } else {
    rampColor = mix(uColorStops[2], uColorStops[0], (t - 0.6) / 0.4);
  }

  // Noise-based aurora height with mouse influence
  float noiseX = nUv.x * 2.0 + uTime * 0.1;
  float noiseY = uTime * 0.25 + uMouse.y * 0.5;
  float height = snoise(vec2(noiseX, noiseY)) * 0.5 * uAmplitude;

  // Second noise layer for more organic movement
  float height2 = snoise(vec2(nUv.x * 3.0 - uTime * 0.08, uTime * 0.15 + uMouse.x * 0.3)) * 0.3 * uAmplitude;

  height = exp(height + height2 * 0.5);
  height = (uv.y * 2.0 - height + 0.2);
  float intensity = 0.6 * height;

  // Blend edge softness
  float midPoint = 0.20;
  float auroraAlpha = smoothstep(midPoint - uBlend * 0.5, midPoint + uBlend * 0.5, intensity);

  // Light-mode friendly: use full-brightness colors, control visibility via alpha only
  vec3 auroraColor = rampColor * (0.5 + intensity * 0.5);

  // Apply opacity
  float a = auroraAlpha * uOpacity;
  fragColor = vec4(auroraColor * a, a);
}
`;

export function BackgroundAurora({
  colors,
  opacity,
  blur,
  speed,
  amplitude,
  blend,
  mouseFollow,
  enabled,
}: BackgroundAuroraProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const propsRef = useRef({ colors, opacity, blur, speed, amplitude, blend, mouseFollow });
  propsRef.current = { colors, opacity, blur, speed, amplitude, blend, mouseFollow };

  const mouseTarget = useRef({ x: 0, y: 0 });
  const mouseCurrent = useRef({ x: 0, y: 0 });

  // Mouse tracking
  useEffect(() => {
    if (!enabled) return;

    const onMouseMove = (e: MouseEvent) => {
      mouseTarget.current.x = (e.clientX / window.innerWidth) - 0.5;
      mouseTarget.current.y = (e.clientY / window.innerHeight) - 0.5;
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, [enabled]);

  // WebGL setup & render loop
  useEffect(() => {
    const ctn = containerRef.current;
    if (!ctn || !enabled) return;

    const renderer = new Renderer({
      alpha: true,
      premultipliedAlpha: true,
      antialias: true,
    });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.canvas.style.backgroundColor = 'transparent';

    const geometry = new Triangle(gl);
    if (geometry.attributes.uv) {
      delete geometry.attributes.uv;
    }

    const toRGB = (hex: string): number[] => {
      const c = new Color(hex);
      return [c.r, c.g, c.b];
    };

    const program = new Program(gl, {
      vertex: VERT,
      fragment: FRAG,
      uniforms: {
        uTime: { value: 0 },
        uAmplitude: { value: amplitude },
        uColorStops: {
          value: [
            toRGB(colors.color1),
            toRGB(colors.color2),
            toRGB(colors.color3),
          ],
        },
        uResolution: { value: [ctn.offsetWidth, ctn.offsetHeight] },
        uBlend: { value: blend },
        uOpacity: { value: opacity },
        uMouse: { value: [0, 0] },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });
    ctn.appendChild(gl.canvas);

    function resize() {
      if (!ctn) return;
      const w = ctn.offsetWidth;
      const h = ctn.offsetHeight;
      renderer.setSize(w, h);
      program.uniforms.uResolution.value = [w, h];
    }
    window.addEventListener('resize', resize);
    resize();

    let animateId = 0;
    const update = (t: number) => {
      animateId = requestAnimationFrame(update);

      const p = propsRef.current;

      // Lerp mouse
      const mf = p.mouseFollow;
      mouseCurrent.current.x += (mouseTarget.current.x - mouseCurrent.current.x) * 0.03;
      mouseCurrent.current.y += (mouseTarget.current.y - mouseCurrent.current.y) * 0.03;

      program.uniforms.uTime.value = t * 0.01 * p.speed * 0.1;
      program.uniforms.uAmplitude.value = p.amplitude;
      program.uniforms.uBlend.value = p.blend;
      program.uniforms.uOpacity.value = p.opacity;
      program.uniforms.uMouse.value = [
        mouseCurrent.current.x * mf * 2.0,
        mouseCurrent.current.y * mf * 2.0,
      ];
      program.uniforms.uColorStops.value = [
        toRGB(p.colors.color1),
        toRGB(p.colors.color2),
        toRGB(p.colors.color3),
      ];

      renderer.render({ scene: mesh });
    };
    animateId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(animateId);
      window.removeEventListener('resize', resize);
      if (ctn && gl.canvas.parentNode === ctn) {
        ctn.removeChild(gl.canvas);
      }
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [enabled, amplitude, blend, colors, opacity]);

  if (!enabled) return null;

  return (
    <div
      ref={containerRef}
      className="bg-aurora"
      style={{
        filter: blur > 0 ? `blur(${blur}px)` : undefined,
      }}
    />
  );
}

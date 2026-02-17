export interface GradientColors {
  color1: string;
  color2: string;
  color3: string;
  color4: string;
}

export interface GlowSettings {
  intensity: number;
  spread: number;
  blur: number;
}

export interface AnimationSettings {
  speed: number;
  running: boolean;
}

export interface BorderSettings {
  width: number;
  radius: number;
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface AuroraSettings {
  top: boolean;
  right: boolean;
  bottom: boolean;
  left: boolean;
  x: number;
  y: number;
}

export type GradientType = 'aurora' | 'spin' | 'trace';
export type ThemeMode = 'dark' | 'light';
export type InputState = 'default' | 'default-blinking' | 'filled' | 'cancel' | 'disabled';

export interface GradientControlValues {
  colors: GradientColors;
  glow: GlowSettings;
  animation: AnimationSettings;
  border: BorderSettings;
  aurora: AuroraSettings;
  gradientType: GradientType;
}

export interface Preset {
  name: string;
  colors: GradientColors;
  glow: GlowSettings;
  speed: number;
}

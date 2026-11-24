// Variant: Retro Arcade (arcade purple, neon green, hot magenta, arcade yellow).
//
// A dark identity: every original surface, light or dark, lands on a navy step, and text
// lands on mist. Accent fills become violet; the orange call-to-action fills become aqua with
// navy text. Surface-aware custom properties (--rx-*) let text follow the surface it sits on.
// Table format: see scripts/variants/neobrutal.mjs.
export const PALETTE = {
  void: '#0e0619', navy: '#160a29', navy2: '#1e0f38', navy3: '#281648', navy4: '#341d5c',
  indigo: '#3d0f4f', indigoDeep: '#200a33', indigoPale: '#1f1238',
  violet: '#e0158f', violetHi: '#ff6be6', lilac: '#ffe600',
  aqua: '#39ff14', aquaPale: '#b6ff9e',
  mist: '#fdf7ff', mist2: '#e2d6f0', muted: '#a993c4',
};
const P = PALETTE;

const BASE = [
  `--rx-accent:${P.aqua}`, `--rx-accent2:${P.aquaPale}`, `--rx-white:${P.mist}`, `--rx-fg:${P.mist}`,
  `--rx-fg2:${P.mist2}`, `--rx-muted:${P.muted}`, `--rx-deep:${P.lilac}`, `--rx-hot:${P.violetHi}`,
  '--rx-line:rgba(253, 247, 255,.14)', '--rx-line2:rgba(253, 247, 255,.3)', `--rx-glow:${P.violet}`,
].join(';');

// text-like entry: the surface variable when opaque, and the same variable at the token's
// opacity (color-mix) when translucent, so ink follows the surface it lands on
const t = (v, fallback, alpha) => ({ solid: `var(${v},${fallback})`, alpha: alpha === undefined ? fallback : alpha, mix: true });

export default {
  name: 'arcade',
  dist: 'dist',
  port: 4321,
  prefix: '--rx-',
  styles: ['/styles/arcade.css'],
  scripts: ['/scripts/arcade.js'],

  ctx: {
    dark: BASE,
    light: BASE,
    // violet / indigo fills
    accent: [`--rx-accent:#ffffff`, `--rx-accent2:#ffffff`, `--rx-white:#ffffff`, `--rx-fg:#ffffff`, `--rx-fg2:#fff0fb`,
      `--rx-muted:#ffd6f5`, `--rx-deep:#ffffff`, `--rx-hot:#ffffff`, '--rx-line:rgba(255,255,255,.3)',
      '--rx-line2:rgba(255,255,255,.5)', `--rx-glow:${P.violet}`].join(';'),
    // aqua fills (were orange call-to-actions): navy ink on top
    orange: [`--rx-accent:${P.navy}`, `--rx-accent2:${P.navy}`, `--rx-white:${P.navy}`, `--rx-fg:${P.navy}`, `--rx-fg2:${P.navy}`,
      '--rx-muted:rgba(22, 10, 41,.72)', `--rx-deep:${P.navy}`, `--rx-hot:${P.navy}`, '--rx-line:rgba(22, 10, 41,.25)',
      '--rx-line2:rgba(22, 10, 41,.45)', `--rx-glow:${P.aqua}`].join(';'),
  },
  whiteTextCtx: '',
  lineVar: 'var(--rx-line,rgba(253, 247, 255,.14))',
  // custom properties are mapped by what they paint where they are read (see collectUses)
  varRoles: true,
  // off-palette pale tints (creams, blush, pastel washes) are light surfaces too: on a dark skin
  // they must land on navy like the rest
  refineOther: (h, s, l) => (l >= 0.86 ? 'paper' : null),

  map: {
    bg: { white: P.navy, paper: P.navy2, silver: P.navy3, grey: P.navy4, ink: P.void, ink2: '#180b2c',
      teal: P.violet, blue: P.violet, mint: P.indigo, mintPale: P.indigoPale, deep: P.indigoDeep, orange: P.aqua },
    grad: { white: P.navy, paper: P.navy2, silver: P.navy3, ink: P.void, ink2: '#180b2c',
      teal: P.violet, mint: '#5a1a7a', mintPale: P.navy2, deep: '#2a0c45', blue: P.violet, orange: P.aqua },
    // gradients clipped to text (background-clip: text): light, glowing stops
    gradText: { white: P.mist, paper: P.mist2, silver: P.muted, grey: P.muted, ink: P.mist, ink2: P.mist2,
      teal: P.aqua, blue: P.violetHi, mint: P.aquaPale, mintPale: P.aquaPale, deep: P.lilac, orange: P.violetHi },
    text: {
      white: t('--rx-white', P.mist), paper: t('--rx-white', P.mist),
      silver: t('--rx-muted', '#c2b0d8', P.mist), grey: t('--rx-muted', P.muted, P.mist),
      ink: t('--rx-fg', P.mist), ink2: t('--rx-fg2', P.mist2, P.mist),
      teal: t('--rx-accent', P.aqua), blue: t('--rx-accent', P.aqua),
      mint: t('--rx-accent2', P.aquaPale, P.aqua), mintPale: t('--rx-accent2', P.aquaPale, P.aqua),
      deep: t('--rx-deep', P.lilac), orange: t('--rx-hot', P.violetHi, P.violet),
    },
    border: {
      white: { solid: 'rgba(253, 247, 255,.55)', alpha: P.mist },
      paper: { solid: 'var(--rx-line,rgba(253, 247, 255,.14))', alpha: null },
      silver: { solid: 'var(--rx-line,rgba(253, 247, 255,.14))', alpha: null },
      mintPale: { solid: 'var(--rx-line,rgba(253, 247, 255,.14))', alpha: null },
      grey: { solid: 'rgba(253, 247, 255,.22)', alpha: P.mist },
      ink: { solid: 'var(--rx-line2,rgba(253, 247, 255,.3))', alpha: P.mist },
      ink2: { solid: 'var(--rx-line2,rgba(253, 247, 255,.3))', alpha: P.mist },
      teal: t('--rx-accent', P.aqua), mint: t('--rx-accent', P.aqua), blue: t('--rx-accent', P.aqua),
      deep: P.violet, orange: P.aqua,
    },
    svg: { white: P.mist, paper: P.navy3, silver: '#3a4378', grey: P.muted, ink: P.mist, ink2: P.mist2,
      teal: P.aqua, blue: P.violet, mint: P.aquaPale, mintPale: P.navy3, deep: P.lilac, orange: P.aqua },
    // fallback for custom properties read both as text and as a surface (or never read):
    // neutrals act as surfaces, saturated colours as accents that must stay readable on navy
    var: { white: P.navy, paper: P.navy2, silver: P.navy3, ink: P.void, ink2: '#180b2c',
      teal: { solid: `var(--rx-accent,${P.aqua})`, alpha: P.violet }, blue: { solid: `var(--rx-accent,${P.aqua})`, alpha: P.violet },
      mint: P.aquaPale, mintPale: P.indigoPale, deep: P.aqua, orange: P.violetHi },
    canvas: { white: P.mist, ink: P.navy, ink2: P.navy2, teal: P.aqua, mint: P.aquaPale, mintPale: P.indigoPale,
      deep: P.violet, blue: P.violet, orange: P.aqua },
  },
};

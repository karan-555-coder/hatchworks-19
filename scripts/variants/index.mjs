// Visual variant of this repo: Retro Arcade (colours only; structure identical to the original).
//
//   npm run build                    -> Retro Arcade, into dist/
//   npm run build:original           -> untouched original, into dist-original/
import arcade from './arcade.mjs';
import original from './original.mjs';

export const VARIANTS = { arcade, original };

// the variant comes from --variant=<name> or VARIANT
const flag = (process.argv.find(a => a.startsWith('--variant=')) || '').split('=')[1];

export function getVariant(name = flag || process.env.VARIANT || 'arcade') {
  const v = VARIANTS[name];
  if (!v) throw new Error(`Unknown VARIANT "${name}". Known: ${Object.keys(VARIANTS).join(', ')}`);
  return v;
}

// the variant's skin files, so the re-theme never rewrites them
export const SKIN_FILES = new Set(Object.values(VARIANTS).flatMap(v => [...v.styles, ...v.scripts].map(p => p.split('/').pop())));

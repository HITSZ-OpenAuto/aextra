import presetAttributify from '@unocss/preset-attributify'
import presetWind4 from '@unocss/preset-wind4'
import type { Preset } from 'unocss'
import { defineConfig } from 'unocss'

export default defineConfig({
  presets: [presetAttributify() as Preset, presetWind4() as Preset]
})

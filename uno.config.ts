import presetAttributify from "@unocss/preset-attributify";
import type { Preset } from "unocss";
import { defineConfig, presetTypography, presetWind4 } from "unocss";

export default defineConfig({
  presets: [presetAttributify() as Preset, presetWind4() as Preset, presetTypography() as Preset],
});

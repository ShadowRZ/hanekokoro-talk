import {
  defineConfig,
  presetUno,
  presetWebFonts,
} from "unocss"

export default defineConfig({
  presets: [
    presetUno({
      dark: "class",
    }),
    presetWebFonts({
      provider: "none",
      fonts: {
        sans: ["Jost Variable"]
      },
    }),
  ]
});

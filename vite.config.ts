import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import Icons from 'unplugin-icons/vite'
import UnoCSS from 'unocss/vite'
import extractorSvelte from '@unocss/extractor-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/hanekokoro-talk/',
  plugins: [
    UnoCSS({
      extractors: [
        extractorSvelte(),
      ],
      /* more options */
    }),
    svelte(),
    Icons({
      compiler: 'svelte',
    })
  ],
})

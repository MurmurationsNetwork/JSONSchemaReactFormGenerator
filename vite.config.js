import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import legacy from '@vitejs/plugin-legacy'

export default defineConfig({
  plugins: [
    react(),
    legacy({
      targets: ['defaults', 'not IE 11'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime']
    })
  ],
  build: {
    rollupOptions: {
      preserveEntrySignatures: 'strict',
      external: ['react', 'react-dom'],
      input: 'src/index.tsx',
      output: [
        {
          format: 'cjs',
          entryFileNames: '[name].cjs',
          dir: 'lib/cjs',
          preserveModules: true
        },
        {
          format: 'es',
          entryFileNames: '[name].mjs',
          dir: 'lib/esm',
          preserveModules: true
        }
      ]
    }
  }
})

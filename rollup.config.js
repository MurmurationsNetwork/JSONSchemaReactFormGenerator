import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import terser from '@rollup/plugin-terser'
import typescript from '@rollup/plugin-typescript'

export default [
  {
    input: 'src/index.tsx',
    output: {
      file: 'lib/esm/index.mjs',
      format: 'es'
    },
    plugins: [
      resolve(),
      commonjs(),
      terser(),
      typescript({
        tsconfig: './tsconfig.json'
      })
    ]
  },
  {
    input: 'src/index.tsx',
    output: {
      file: 'lib/cjs/index.cjs',
      format: 'cjs'
    },
    plugins: [
      resolve(),
      commonjs(),
      terser(),
      typescript({
        tsconfig: './tsconfig.json'
      })
    ]
  }
]

import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'

export default [
  {
    input: 'src/index.tsx',
    output: {
      file: 'lib/esm/index.mjs',
      format: 'esm'
    },
    plugins: [
      resolve(),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        declarationDir: './lib/esm/types'
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
      typescript({
        tsconfig: './tsconfig.json',
        declarationDir: './lib/cjs/types'
      })
    ]
  }
]

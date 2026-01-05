import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/ai-fe-debugger.js',
      format: 'umd',
      name: 'AIDebugger',
      sourcemap: true,
    },
    {
      file: 'dist/ai-fe-debugger.min.js',
      format: 'umd',
      name: 'AIDebugger',
      plugins: [terser()],
    },
  ],
  plugins: [
    resolve(),
    typescript({
      tsconfig: './tsconfig.json',
    }),
  ],
};sss
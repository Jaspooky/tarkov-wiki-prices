import { nodeResolve } from "@rollup/plugin-node-resolve";
import copy from 'rollup-plugin-copy'

export default {
  input: `build/index.js`,
  output: {
    file: `dist/addon.js`,
    format: 'iife',
  },
  plugins: [
    nodeResolve(),
    copy({
      targets: [
        {
          src: 'static/**/*',
          dest: 'dist'
        },
      ]
    })
  ],
};

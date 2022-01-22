import { nodeResolve } from "@rollup/plugin-node-resolve";
import copy from 'rollup-plugin-copy';

const createConfigWithManifest = (manifestVersion) => {
  const distRoot = `dist/manifest-v${manifestVersion}`;

  return {
    input: `build/index.js`,
    output: {
      file: `${distRoot}/addon.js`,
      format: 'iife',
    },
    plugins: [
      nodeResolve(),
      copy({
        targets: [
          {
            src: ['static/*.png', 'static/*.css', 'static/*.js'],
            dest: distRoot
          },
          {
            src: [`static/manifests/v${manifestVersion}.json`],
            dest: distRoot,
            rename: 'manifest.json'
          },
        ]
      })
    ],
  };
}

export default [2, 3].map(createConfigWithManifest);

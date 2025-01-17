import { existsSync, rmSync, writeFileSync } from 'fs';
import { generateDtsBundle } from 'dts-bundle-generator';
import { Target } from 'bun';

const deleteFolder = (folderPath) => {
  try {
    if (existsSync(folderPath)) {
      rmSync(folderPath, { recursive: true, force: true });
    }
  } catch (error) {
    console.error('Error deleting folder:', error);
  }
};

deleteFolder('./dist');

const commonConfig = {
  entrypoints: ['./src/index.ts'],
  outdir: './dist',
  target: 'node' as Target,
  minify: true,
};

const result = await Bun.build({
  ...commonConfig,
  format: 'esm',
  naming: {
    entry: 'index.esm.js',
  },
});

if (!result.success) {
  console.error('ESM build failed:', result.logs);
  process.exit(1);
}

const cjsResult = await Bun.build({
  ...commonConfig,
  format: 'cjs',
  naming: {
    entry: 'index.cjs',
  },
});

if (!cjsResult.success) {
  console.error('CJS build failed:', cjsResult.logs);
  process.exit(1);
}

const iifeResult = await Bun.build({
  ...commonConfig,
  format: 'iife',
  naming: {
    entry: 'index.iife.js',
  },
});

if (!iifeResult.success) {
  console.error('IIFE build failed:', iifeResult.logs);
  process.exit(1);
}

const dtsBundle = generateDtsBundle([
  {
    filePath: './src/index.ts',
    output: {
      noBanner: true,
    },
  },
]);

writeFileSync('./dist/index.d.ts', dtsBundle[0]);

console.log('Build completed successfully!');

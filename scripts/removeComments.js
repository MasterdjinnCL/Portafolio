const { readFile, writeFile } = require('node:fs/promises');
const path = require('node:path');
const fg = require('fast-glob');
const strip = require('strip-comments');

const htmlCommentRegex = /<!--([\s\S]*?)-->/g;
const blockCommentRegex = /\/\*([\s\S]*?)\*\//g;
const scssLineCommentRegex = /(?<!:)\/\/.*$/gm;
const root = process.cwd();

const targets = ['**/*.{vue,js,ts,tsx,jsx,mjs,cjs,css,scss,sass,less,html,md}'];
const ignore = [
  'node_modules/**',
  '.nuxt/**',
  '.output/**',
  '.git/**',
  'dist/**',
  'public/data/**/*.json',
  'scripts/removeComments.js'
];

const preserveNewlines = (comment) => {
  const matches = comment.match(/\n/g);
  return matches ? '\n'.repeat(matches.length) : '';
};

const stripCssLike = (input) =>
  input
    .replace(blockCommentRegex, (match) => preserveNewlines(match))
    .replace(scssLineCommentRegex, '');

const stripVue = (input) => {
  let output = input.replace(htmlCommentRegex, '');
  output = output.replace(
    /(<script[\s\S]*?>)([\s\S]*?)(<\/script>)/gi,
    (_, open, body, close) => `${open}${strip(body, { preserveNewlines: true })}${close}`
  );
  output = output.replace(
    /(<style[\s\S]*?>)([\s\S]*?)(<\/style>)/gi,
    (_, open, body, close) => `${open}${stripCssLike(body)}${close}`
  );
  return output;
};

const transformers = {
  vue: stripVue,
  js: (input) => strip(input, { preserveNewlines: true }),
  ts: (input) => strip(input, { preserveNewlines: true }),
  jsx: (input) => strip(input, { preserveNewlines: true }),
  tsx: (input) => strip(input, { preserveNewlines: true }),
  mjs: (input) => strip(input, { preserveNewlines: true }),
  cjs: (input) => strip(input, { preserveNewlines: true }),
  css: stripCssLike,
  scss: stripCssLike,
  sass: stripCssLike,
  less: stripCssLike,
  html: (input) => input.replace(htmlCommentRegex, ''),
  md: (input) => input.replace(htmlCommentRegex, '')
};

const run = async () => {
  const files = await fg(targets, { cwd: root, ignore, absolute: true });
  let touched = 0;

  await Promise.all(
    files.map(async (file) => {
      const ext = path.extname(file).slice(1).toLowerCase();
      const transform = transformers[ext];

      if (!transform) {
        return;
      }

      const original = await readFile(file, 'utf8');
      const cleaned = transform(original);

      if (cleaned !== original) {
        await writeFile(file, cleaned, 'utf8');
        touched += 1;
      }
    })
  );

  console.log(`Processed ${files.length} files. Updated ${touched} files.`);
};

run().catch((error) => {
  console.error('Failed to strip comments:', error);
  process.exit(1);
});

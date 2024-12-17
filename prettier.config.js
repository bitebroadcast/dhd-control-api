/** @typedef {import("prettier").Config} PrettierConfig */

/** @type { PrettierConfig } */
const config = {
  plugins: ['@ianvs/prettier-plugin-sort-imports'],
  importOrder: [
    '<TYPES>',
    '<THIRD_PARTY_MODULES>',
    '',
    '<TYPES>^[@]',
    '^@/',
    '',
    '<TYPES>^[..]',
    '^[../]',
    '',
    '<TYPES>^[.]',
    '^[./]',
  ],
  semi: true,
  singleQuote: true,
  trailingComma: 'all',
  printWidth: 80,
  tabWidth: 2,
};

export default config;

// // jest.config.js
// module.exports = {
//   roots: ['<rootDir>/src'],
//   testMatch: ['/**/*.spec.ts'],
//   transform: {
//     '^.+.ts?$': 'ts-jest',
//   },
// };

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testRegex: '.*\\.spec\\.ts$',
  moduleFileExtensions: ['ts', 'js', 'json'],
};

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  //where the tests are
  testMatch: ['**/**/*.test.ts'],
  // each individual test will be reported during the run
  verbose: true,
  //to exit the tests
  testTimeout: 50000,
  //forceExit: true,
  clearMocks: true,
  resetMocks: true,
  //restore modules to its original state between each test
  restoreMocks: true,
  globals: {
    TextEncoder: require('util').TextEncoder,
    TextDecoder: require('util').TextDecoder,
  },
}

// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  clearMocks: true,
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
};

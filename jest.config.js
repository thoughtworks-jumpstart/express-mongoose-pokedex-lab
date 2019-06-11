module.exports = {
  preset: '@shelf/jest-mongodb',
  setupFilesAfterEnv: ['./__tests__/setup.js'],
  testMatch: ['**/__tests__/**/*.test.js'],
};

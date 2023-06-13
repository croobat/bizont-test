module.exports = {
  testEnvironment: 'node',
  testRegex: 'src/.*\\.test\\.ts$',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js'],
};

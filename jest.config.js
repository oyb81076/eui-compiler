module.exports = {
  "globals": { "ts-jest": { "tsConfig": "./tsconfig.test.json" } },
  "moduleFileExtensions": ["ts", "js"],
  "testEnvironment": "node",
  "testMatch": ["<rootDir>/test/**/*.(test|spec).(js|ts|tsx)"],
  "transform": { "^.+\\.tsx?$": "ts-jest" },
  "transformIgnorePatterns": ["/node_modules/"],
}

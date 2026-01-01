module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": "babel-jest",
  },
  transformIgnorePatterns: [
    "/node_modules/(?!uuid)/", // allow uuid to be transformed
  ],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    // Force all useShowDepositModal imports to the same file for mocking
    "^.*useShowDepositModal$": "<rootDir>/src/hooks/useShowDepositModal.ts",
  },
  testMatch: ["<rootDir>/tests/**/*.(test|spec).(ts|tsx)"],
  collectCoverageFrom: [
    "*.{ts,tsx}",
    "farePrivy/**/*.{ts,tsx}",
    "!**/*.d.ts",
    "!index.ts",
  ],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  extensionsToTreatAsEsm: [".ts", ".tsx"],
};

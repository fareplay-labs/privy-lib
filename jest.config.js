export default {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        useESM: true,
      },
    ],
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

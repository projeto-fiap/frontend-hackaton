import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1", // seu alias "@/"
  },
  globals: {
    // 👇  manda o ts‑jest usar a config de cima
    "ts-jest": { tsconfig: "tsconfig.jest.json" },
  },
};

export default config;

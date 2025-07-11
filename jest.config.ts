import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "ts-jest",
  },
  transformIgnorePatterns: [
    "/node_modules/(?!(@googlemaps/extended-component-library|@lit/react|lit|@lit/reactive-element|lit-html|lit-element|@lit/context)/)",
  ],
  setupFiles: ["jest-localstorage-mock"],
};

export default config;

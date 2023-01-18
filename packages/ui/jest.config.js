module.exports = {
  testEnvironment: "jest-environment-jsdom",
  moduleDirectories: [
    "node_modules",
    "./src", //the root directory
  ],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/__mocks__/fileMock.js",
    "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js",
    // "@patternfly/react-icons.*": "<rootDir>/__mocks__/fileMock.js",
    images$: "<rootDir>/__mocks__/imagesMock.js",
  },
  transformIgnorePatterns: [
    "node_modules/(?!@patternfly/react-icons|@patternfly/react-tokens|@novnc|@popperjs|lodash|monaco-editor|react-monaco-editor|byte-size)",
  ],
  setupFilesAfterEnv: ["<rootDir>/setupJest.js"],
  coveragePathIgnorePatterns: [
    "node_modules",
    "__mocks__",
    "setupJest.js",
    "<rootDir>/src/ProofOfConcepts",
    "<rootDir>/src/test-utils.tsx",
    "storiesHelpers.ts",
    ".*.stories.tsx",
  ],
};

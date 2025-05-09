module.exports = {
  preset: "jest-expo",

  setupFiles: ["./jest.setup.js"],

  setupFilesAfterEnv: ["@testing-library/jest-native/extend-expect"],

  transformIgnorePatterns: [
    "node_modules/(?!(jest-)?react-native" +
      "|@react-native" +
      "|@react-navigation" +
      "|@testing-library" +
      "|expo" +
      "|expo-modules-core" +
      "|expo-font" +
      "|expo-constants" +
      "|expo-asset" +
      "|expo-file-system" +
      ")",
  ],

  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};

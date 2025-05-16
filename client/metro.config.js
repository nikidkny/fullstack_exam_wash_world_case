const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);
config.resolver.extraNodeModules = {
  ...config.resolver.extraNodeModules,
  "react-dom": require.resolve("react-native"),
};

module.exports = withNativeWind(config, { input: "./global.css" });

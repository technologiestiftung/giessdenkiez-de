export default {
  tabWidth: 2,
  semi: true,
  singleQuote: false,
  useTabs: true,
  printWidth: 80,
  trailingComma: "all",
  overrides: [
    {
      files: ["*.yml", "*.yaml"],
      options: {
        useTabs: false,
      },
    },
  ],
};

module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],

  "addons": ["@storybook/addon-links", "@storybook/addon-essentials"],

  framework: {
    name: "@storybook/nextjs",
    options: {}
  },

  docs: {
    autodocs: true
  }
}

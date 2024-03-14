export default {
  extends: "@technologiestiftung/semantic-release-config",
  branches: [
    { name: "master" },
    { name: "staging", channel: "pre/rc", prerelease: "rc" },
    { name: "feat/ui-rework", prerelease: true },
  ],
  plugins: [
    [
      "@saithodev/semantic-release-backmerge",
      {
        backmergeBranches: [{ from: "master", to: "staging" }],
        backmergeStrategy: "merge",
      },
    ],
  ],
};

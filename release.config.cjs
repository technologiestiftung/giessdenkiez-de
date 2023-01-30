module.exports = {
  extends: '@technologiestiftung/semantic-release-config',
  branches: [
    { name: 'master' },
    { name: 'staging', channel: 'pre/rc', prerelease: 'rc' },
  ],
  plugins: [
    [
      '@saithodev/semantic-release-backmerge',
      {
        branch: ['staging'],
        backmergeStrategy: 'merge',
      },
    ],
  ],
};

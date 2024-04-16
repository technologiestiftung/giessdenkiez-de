// eslint-disable-next-line @technologiestiftung/no-default-export
export default {
	extends: "@technologiestiftung/semantic-release-config",
	branches: [
		{ name: "master" },
		{ name: "staging", channel: "pre/rc", prerelease: "rc" },
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

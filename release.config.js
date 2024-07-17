// eslint-disable-next-line @technologiestiftung/no-default-export
export default {
	extends: "@technologiestiftung/semantic-release-config",
	branches: [
		{ name: "main" },
		{ name: "staging", channel: "pre/rc", prerelease: "rc" },
	],
	plugins: [
		[
			"@saithodev/semantic-release-backmerge",
			{
				backmergeBranches: [{ from: "main", to: "staging" }],
				backmergeStrategy: "merge",
			},
		],
	],
};

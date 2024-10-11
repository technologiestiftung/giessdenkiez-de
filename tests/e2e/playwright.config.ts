import { defineConfig, devices } from "@playwright/test";

const port = process.env.VITE_PORT ? parseInt(process.env.VITE_PORT) : 5173;

/**
 * See https://playwright.dev/docs/test-configuration.
 */
// eslint-disable-next-line @technologiestiftung/no-default-export
export default defineConfig({
	testDir: "./",
	/* Run tests in files in parallel */
	fullyParallel: true,
	/* Fail the build on CI if you accidentally left test.only in the source code. */
	forbidOnly: !!process.env.CI,
	/* Retry on CI only */
	retries: 1,
	/* Opt out of parallel tests on CI. */
	workers: 1,
	/* Reporter to use. See https://playwright.dev/docs/test-reporters */
	reporter: [
		["list"],
		["html", { open: "never", outputFolder: "./test-results" }],
	],
	/* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
	use: {
		/* Base URL to use in actions like `await page.goto('/')`. */
		baseURL: process.env.VITE_BASE_URL,

		/* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
		trace: "on-first-retry",
	},
	timeout: 30000,

	/* Configure projects for major browsers */
	projects: [
		{
			name: "chromium",
			use: { ...devices["Desktop Chrome"] },
		},

		// {
		// 	name: "firefox",
		// 	use: { ...devices["Desktop Firefox"] },
		// },

		{
			name: "webkit",
			use: { ...devices["Desktop Safari"] },
		},

		{
			name: "Mobile Chrome",
			use: { ...devices["Pixel 5"] },
		},

		{
			name: "Mobile Safari",
			use: { ...devices["iPhone 12"] },
		},

		/* Test against branded browsers. */
		// {
		//   name: 'Microsoft Edge',
		//   use: { ...devices['Desktop Edge'], channel: 'msedge' },
		// },
		// {
		//   name: 'Google Chrome',
		//   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
		// },
	],

	/* Run your local dev server before starting the tests */
	webServer: {
		command: getCommand(),
		url: process.env.VITE_BASE_URL,
		reuseExistingServer: !process.env.CI,
	},
});

function getCommand() {
	if (process.env.CI) {
		return `npm run preview -- --port ${port}`;
	}

	return `VITE_PW_TEST=true npm run build && npm run preview -- --port ${port}`;
}

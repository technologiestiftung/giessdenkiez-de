import { defineConfig, devices } from "@playwright/test";
import { loadEnv } from "vite";

/**
 * in the CI pipeline, the env variables are provided by the CI, not the .env file
 */
if (!process.env.CI) {
	process.env = { ...process.env, ...loadEnv("", process.cwd()) };
}

const port = process.env.VITE_PORT ? parseInt(process.env.VITE_PORT) : 5173;

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
	testDir: "./",
	/* Verifies the environment and refuses non-local Supabase targets. */
	globalSetup: "./global-setup.ts",
	/**
	 * Every test provisions its own account and data through the fixtures, and
	 * reads only its own mail, so there is no shared state to serialize on.
	 */
	fullyParallel: true,
	/* Fail the build on CI if you accidentally left test.only in the source code. */
	forbidOnly: !!process.env.CI,
	/* No retries */
	retries: 0,
	/* Local uses Playwright's default (CPU-based). */
	workers: process.env.CI ? 2 : undefined,
	/* Reporter to use. See https://playwright.dev/docs/test-reporters */
	reporter: [
		["list"],
		["html", { open: process.env.CI ? "never" : "on-failure" }],
	],
	/* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
	use: {
		/* Base URL to use in actions like `await page.goto('/')`. */
		baseURL: process.env.VITE_BASE_URL,

		/* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
		trace: "retain-on-failure",
	},
	/* CI runners are slower and run the Supabase stack alongside the browsers. */
	timeout: process.env.CI ? 60_000 : 30_000,
	expect: { timeout: process.env.CI ? 10_000 : 5_000 },

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

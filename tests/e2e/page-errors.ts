import { expect, Page } from "@playwright/test";

/**
 * Noise that says nothing about the app: the map requests the blocked and
 * stubbed map modes cut off, the offline simulation some tests use, and GPU
 * chatter from headless WebGL.
 */
const ignoredMessages = [
	/mapbox/i,
	/net::ERR_/i,
	/Failed to fetch/i,
	// WebKit's wording for the same thing
	/Load failed/i,
	// the pumps GeoJSON, blocked together with the map
	/pumps\.geojson/i,
	/WebGL/i,
	/GPU stall/i,
	/does not exist in the map's style/i,
	// Resource-level noise: blocked map requests, the offline simulation in the
	// error-handling tests, and the 4xx responses those tests provoke on purpose.
	/Failed to load resource/i,
	/due to access control checks/i,
	// WebKit reports aborted requests without a usable message
	/undefined undefined/,
	/uncaught: (\[object Object\]|Object)$/,
];

const isIgnored = (message: string) =>
	ignoredMessages.some((pattern) => pattern.test(message));

/**
 * Collects uncaught exceptions and console errors. Library upgrades (React,
 * zustand, ...) usually shout in the console before they break behaviour
 * visibly, so failing on them turns a silent regression into a failing test.
 */
export function watchForPageErrors(page: Page) {
	const errors: Promise<string>[] = [];

	page.on("pageerror", (error) => {
		errors.push(Promise.resolve(`uncaught: ${error.message}`));
	});

	page.on("console", (message) => {
		if (message.type() !== "error") {
			return;
		}

		// `message.text()` renders an Error argument as just "Error", which no
		// filter can match on, so resolve the arguments themselves.
		errors.push(
			(async () => {
				const args = await Promise.all(
					message
						.args()
						.map((arg) =>
							arg
								.evaluate((value) =>
									value instanceof Error ? value.message : String(value),
								)
								.catch(() => ""),
						),
				);
				return `console.error: ${[message.text(), ...args].join(" ")}`;
			})(),
		);
	});

	return async () => {
		const messages = await Promise.all(errors);
		expect(
			messages.filter((message) => !isIgnored(message)),
			"unexpected errors on the page",
		).toEqual([]);
	};
}

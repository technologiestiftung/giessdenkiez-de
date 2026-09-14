import { expect, Page } from "@playwright/test";
import { getAuthStorageKey } from "./config";

/**
 * After following a link from an e-mail (confirm sign-up, confirm e-mail
 * change) the app lands with tokens in the URL hash and writes the session to
 * localStorage asynchronously. Navigating away before that happens loses the
 * session, so wait for it - optionally for the address it should carry.
 */
export async function waitForStoredSession(
	page: Page,
	{ email }: { email?: string } = {},
) {
	await expect
		.poll(
			async () => {
				const rawSession = await page.evaluate(
					(key) => window.localStorage.getItem(key),
					getAuthStorageKey(),
				);

				if (!rawSession) {
					return false;
				}

				const session = JSON.parse(rawSession);

				return email
					? session.user?.email === email
					: Boolean(session.access_token);
			},
			{ timeout: 15000 },
		)
		.toBe(true);
}

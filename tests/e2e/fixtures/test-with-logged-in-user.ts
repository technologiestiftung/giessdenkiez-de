import { Session } from "@supabase/supabase-js";
import { getAuthStorageKey } from "../config";
import { createAnonClient } from "../supabase";
import { testWithRegisteredUser } from "./test-with-registered-user";

type TestWithLoggedInUser = {
	session: Session;
};

/**
 * Signs the account in through the Supabase API and injects the session into
 * localStorage before the app boots, so the page starts logged in without
 * going through the login form.
 *
 * The injection runs on every page load. A test that changes the session
 * (e.g. confirming a new e-mail address) must therefore navigate inside the
 * app from then on - a full load would put the original session back.
 */
export const testWithLoggedInUser =
	testWithRegisteredUser.extend<TestWithLoggedInUser>({
		session: [
			async ({ account }, use) => {
				const { data, error } =
					await createAnonClient().auth.signInWithPassword({
						email: account.email,
						password: account.password,
					});

				if (error || !data.session) {
					throw new Error(
						`Failed to sign in: ${error?.message ?? "no session returned"}`,
					);
				}

				await use(data.session);
			},
			{ scope: "test", auto: true },
		],

		page: async ({ page, session }, use) => {
			await page.addInitScript(
				({ storageKey, givenSession }) => {
					window.localStorage.setItem(storageKey, JSON.stringify(givenSession));
				},
				{ storageKey: getAuthStorageKey(), givenSession: session },
			);

			await use(page);
		},
	});

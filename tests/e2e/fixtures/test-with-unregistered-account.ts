import { AccountCredentials, createAccountCredentials } from "./account";
import { deleteUserByEmail } from "./account";
import { deleteMessagesTo } from "../mailpit";
import { testWithoutSplashScreen } from "./test-without-splash-screen";

type TestWithUnregisteredAccount = {
	/** Unique credentials that do NOT exist yet - for registration tests. */
	newAccount: AccountCredentials;
};

/**
 * Hands out credentials nobody has registered yet and deletes whatever account
 * the test created under them afterwards.
 */
export const testWithUnregisteredAccount =
	testWithoutSplashScreen.extend<TestWithUnregisteredAccount>({
		newAccount: [
			// eslint-disable-next-line no-empty-pattern
			async ({}, use) => {
				const { email, username, password } = createAccountCredentials();

				await use({ email, username, password });

				await deleteUserByEmail(email);
				await deleteMessagesTo(email);
			},
			{ scope: "test", auto: true },
		],
	});

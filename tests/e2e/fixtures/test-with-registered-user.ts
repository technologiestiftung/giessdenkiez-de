import { supabaseAdminClient } from "../supabase";
import {
	createAccountCredentials,
	deleteUserById,
	UserAccount,
} from "./account";
import { deleteMessagesTo } from "../mailpit";
import { testWithoutSplashScreen } from "./test-without-splash-screen";

type TestWithRegisteredUser = {
	account: UserAccount;
};

/**
 * Creates a confirmed account through the Supabase admin API instead of
 * clicking through register + e-mail confirmation in the UI, and deletes it
 * (and everything it wrote) afterwards. Use this for every test that needs an
 * account but is not testing registration itself.
 */
export const testWithRegisteredUser =
	testWithoutSplashScreen.extend<TestWithRegisteredUser>({
		account: [
			// eslint-disable-next-line no-empty-pattern
			async ({}, use) => {
				const { email, username, password } = createAccountCredentials();

				const { data, error: createUserError } =
					await supabaseAdminClient.auth.admin.createUser({
						email,
						password,
						email_confirm: true,
						user_metadata: {
							signup_username: username,
						},
					});

				if (createUserError || !data.user) {
					throw new Error(
						`Failed to create user: ${createUserError?.message ?? "no user returned"}`,
					);
				}

				const userId = data.user.id;

				await ensureProfile({ userId, username });

				await use({ email, password, username, id: userId });

				await deleteUserById(userId);
				await deleteMessagesTo(email);
			},
			{ scope: "test", auto: true },
		],
	});

/**
 * The `profiles` row is normally created by a database trigger on sign-up. The
 * trigger runs for admin-created users too, but asynchronously, so wait for the
 * row - and write it ourselves if the instance under test has no such trigger.
 */
async function ensureProfile({
	userId,
	username,
}: {
	userId: string;
	username: string;
}) {
	const deadline = Date.now() + 5000;

	while (Date.now() < deadline) {
		const { data, error } = await supabaseAdminClient
			.from("profiles")
			.select("id, username")
			.eq("id", userId)
			.maybeSingle();

		if (error) {
			throw new Error(`Failed to read profile: ${error.message}`);
		}

		if (data) {
			if (data.username === username) {
				return;
			}

			const { error: updateError } = await supabaseAdminClient
				.from("profiles")
				.update({ username })
				.eq("id", userId);

			if (updateError) {
				throw new Error(`Failed to set username: ${updateError.message}`);
			}
			return;
		}

		await new Promise((resolve) => setTimeout(resolve, 100));
	}

	const { error: insertError } = await supabaseAdminClient
		.from("profiles")
		.insert({ id: userId, username });

	if (insertError) {
		throw new Error(`Failed to create profile: ${insertError.message}`);
	}
}

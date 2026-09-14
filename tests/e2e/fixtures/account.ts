import { defaultPassword, defaultUsername } from "../constants";
import { supabaseAdminClient } from "../supabase";

export type AccountCredentials = {
	email: string;
	password: string;
	username: string;
};

export type UserAccount = AccountCredentials & {
	id: string;
};

/**
 * Unique credentials per test, so parallel workers never collide on the same
 * e-mail or username - and so one test's cleanup never deletes another's user.
 * The address is what keeps the mail of parallel tests apart, since Mailpit
 * keeps every message in one store and tests filter it by recipient.
 */
export function createAccountCredentials(prefix = "e2e"): AccountCredentials {
	const shortId = crypto.randomUUID().replace(/-/g, "").slice(0, 12);

	return {
		email: `${prefix}-${shortId}@example.com`,
		username: `${defaultUsername}${shortId}`,
		password: defaultPassword,
	};
}

/**
 * Removes everything a test user may have written, then the user itself.
 * Waterings and adoptions are deleted explicitly rather than relying on
 * cascades, so a test never leaves rows behind that skew another test.
 */
export async function deleteUserById(userId: string) {
	const { error: wateringsError } = await supabaseAdminClient
		.from("trees_watered")
		.delete()
		.eq("uuid", userId);
	if (wateringsError) {
		console.warn(`Could not delete waterings: ${wateringsError.message}`);
	}

	const { error: adoptionsError } = await supabaseAdminClient
		.from("trees_adopted")
		.delete()
		.eq("uuid", userId);
	if (adoptionsError) {
		console.warn(`Could not delete adoptions: ${adoptionsError.message}`);
	}

	const { error: deleteUserError } =
		await supabaseAdminClient.auth.admin.deleteUser(userId);
	// "User not found" means the test deleted the account itself
	// (e.g. the delete-account flow), which is not a cleanup failure.
	if (deleteUserError && deleteUserError.message !== "User not found") {
		throw new Error(`Failed to delete user: ${deleteUserError.message}`);
	}
}

/**
 * Deletes the user with that e-mail, if any. Used to clean up after tests that
 * create an account through the UI, where the id is not known upfront.
 */
export async function deleteUserByEmail(email: string) {
	const user = await findUserByEmail(email);

	if (user) {
		await deleteUserById(user.id);
	}
}

/**
 * `listUsers` returns one page at a time (50 users by default), so a lookup
 * against the first page alone misses users once the instance grows past it.
 */
export async function findUserByEmail(email: string) {
	let page = 1;
	while (true) {
		const { data, error } = await supabaseAdminClient.auth.admin.listUsers({
			page,
		});

		if (error) {
			throw new Error(`Failed to list users: ${error.message}`);
		}

		const found = data.users.find((user) => user.email === email);
		if (found) {
			return found;
		}

		if (data.users.length === 0) {
			return null;
		}
		page = page + 1;
	}
}

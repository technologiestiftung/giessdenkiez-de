import { supabaseAdminClient } from "../supabase";
import { UserAccount } from "./account";

/**
 * Seeds an adoption directly in the database. Use this when a test needs an
 * already adopted tree; the adopt button itself is covered by its own test.
 */
export async function adoptTree({
	account,
	treeId,
}: {
	account: UserAccount;
	treeId: string;
}) {
	const { error } = await supabaseAdminClient
		.from("trees_adopted")
		.insert({ uuid: account.id, tree_id: treeId });

	if (error) {
		throw new Error(`Failed to adopt tree ${treeId}: ${error.message}`);
	}
}

/**
 * Seeds a watering directly in the database. `timestamp` decides whether the
 * app lists it under "last 30 days" or "before".
 */
export async function waterTree({
	account,
	treeId,
	amount = 10,
	timestamp = new Date(),
}: {
	account: UserAccount;
	treeId: string;
	amount?: number;
	timestamp?: Date;
}) {
	const { error } = await supabaseAdminClient.from("trees_watered").insert({
		uuid: account.id,
		username: account.username,
		tree_id: treeId,
		amount,
		timestamp: timestamp.toISOString(),
	});

	if (error) {
		throw new Error(`Failed to water tree ${treeId}: ${error.message}`);
	}
}

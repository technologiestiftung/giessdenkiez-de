import { config } from "./config";

type MailpitMessageHeader = {
	ID: string;
	Subject: string;
	Created: string;
	To: { Address: string }[];
};

type MailpitMessage = {
	ID: string;
	Subject: string;
	Text: string;
	HTML: string;
};

async function fetchJson<T>(url: string): Promise<T> {
	const response = await fetch(url);

	if (!response.ok) {
		throw new Error(
			`Mailpit request failed: ${response.status} ${response.statusText} (${url})`,
		);
	}

	return (await response.json()) as T;
}

async function searchMessagesTo(email: string) {
	const { messages } = await fetchJson<{ messages: MailpitMessageHeader[] }>(
		`${config.mailpitUrl}/api/v1/search?query=${encodeURIComponent(`to:${email}`)}`,
	);

	return messages ?? [];
}

/**
 * Polls for a message addressed to `email` whose subject contains `subject`
 * (case-insensitive), and returns it. Mailpit holds every test's mail in one
 * store, so always filter by recipient - that is what keeps parallel tests from
 * reading each other's mail.
 */
export async function waitForEmail({
	email,
	subject,
	timeoutMs = 15000,
}: {
	email: string;
	subject: string;
	timeoutMs?: number;
}): Promise<MailpitMessage> {
	const wantedSubject = subject.toLowerCase();
	const deadline = Date.now() + timeoutMs;

	while (Date.now() < deadline) {
		const messages = await searchMessagesTo(email);

		const match = messages
			.filter((message) =>
				message.Subject.toLowerCase().includes(wantedSubject),
			)
			.sort((a, b) => Date.parse(a.Created) - Date.parse(b.Created))
			.at(-1);

		if (match) {
			return await fetchJson<MailpitMessage>(
				`${config.mailpitUrl}/api/v1/message/${match.ID}`,
			);
		}

		await new Promise((resolve) => setTimeout(resolve, 200));
	}

	throw new Error(
		`Timed out after ${timeoutMs}ms waiting for an e-mail to ${email} with a subject containing "${subject}"`,
	);
}

/**
 * Reads the action link out of a mail. The GoTrue templates render exactly one
 * link (confirm / recover / e-mail change), as `Label ( url )` in the text part.
 */
export function getLinkFromEmail(message: MailpitMessage) {
	const link = message.Text.match(/\(\s*(https?:\/\/[^\s)]+)\s*\)/)?.[1];

	if (!link) {
		throw new Error(
			`Could not find a link in the e-mail "${message.Subject}":\n${message.Text}`,
		);
	}

	return link;
}

/** Convenience: wait for the mail and return its link in one call. */
export async function waitForEmailLink(args: {
	email: string;
	subject: string;
	timeoutMs?: number;
}) {
	return getLinkFromEmail(await waitForEmail(args));
}

/** Deletes every message addressed to `email`, so the store stays small. */
export async function deleteMessagesTo(email: string) {
	const messages = await searchMessagesTo(email);

	if (messages.length === 0) {
		return;
	}

	const response = await fetch(`${config.mailpitUrl}/api/v1/messages`, {
		method: "DELETE",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ IDs: messages.map((message) => message.ID) }),
	});

	if (!response.ok) {
		console.warn(
			`Could not delete the messages of ${email}: ${response.status} ${response.statusText}`,
		);
	}
}

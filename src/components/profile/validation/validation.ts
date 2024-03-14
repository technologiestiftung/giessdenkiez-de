import { PasswordErrors, UsernameErrors } from "./types";
import { supabaseClient } from "../../../auth/supabase-client";

export function validatePassword(password: string): PasswordErrors {
	const validLength = password.length > 8;
	const upperAndLowerCase = /^(?=.*[a-z])(?=.*[A-Z]).+$/.test(password);
	const number = /[0-9]/.test(password);
	const special = /[!@#$%^&*(),.?":{}|<>]/.test(password);

	return {
		validLength,
		upperAndLowerCase,
		number,
		special,
	};
}

export function validateUsername(username: string): UsernameErrors {
	const validLength = username.length > 3;
	const onlyNumberAndLetters = /^[a-zA-Z0-9]*$/.test(username);

	return {
		validLength,
		onlyNumberAndLetters,
	};
}

let timeout: ReturnType<typeof setTimeout>;
let promise: Promise<boolean>;
export async function checkIfUsernameIsTaken(
	username: string,
): Promise<boolean> {
	clearTimeout(timeout);

	promise = new Promise((resolve, reject) => {
		timeout = setTimeout(() => {
			supabaseClient
				.from("profiles")
				.select("username")
				.eq("username", username)
				.then(({ data, error }) => {
					if (error) {
						reject(error.message);
						return;
					}

					if (!data) {
						reject("could not check username");
						return;
					}

					if (data.length > 0) {
						resolve(true);
						return;
					}

					resolve(false);
				});
		}, 500);
	});

	return promise;
}

export function getErrorMessage(error: unknown) {
	if (error instanceof Error) {
		return error.message;
	}
	return String(error);
}

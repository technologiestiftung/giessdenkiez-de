import { PasswordErrors, UsernameErrors } from "./types";
import { supabaseClient } from "../../../auth/supabase-client";
import { PostgrestSingleResponse } from "@supabase/supabase-js";

export function validatePassword(password: string): PasswordErrors {
	const validLength = password.length > 7;
	const upperAndLowerCase = /^(?=.*[a-z])(?=.*[A-Z]).+$/.test(password);
	const number = /[0-9]/.test(password);
	const special = /[\^°!"§$%&/()=?´`+*#'\-_.:,;{}|<>@]/.test(password);

	return {
		validLength,
		upperAndLowerCase,
		number,
		special,
	};
}

export function validateUsername(username: string): UsernameErrors {
	const validLength = username.length > 2 && username.length < 51;
	const onlyNumberAndLetters =
		/^[a-zA-Z0-9]*$/.test(username) && username.length > 0;

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
				.rpc("is_username_taken", { given_username: username })
				.then(({ data, error }: PostgrestSingleResponse<boolean>) => {
					if (error) {
						reject(error.message);
						return;
					}

					if (data === null || data === undefined) {
						reject("could not check username");
						return;
					}

					resolve(data);
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

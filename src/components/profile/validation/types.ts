export interface PasswordErrors {
	validLength: boolean;
	upperAndLowerCase: boolean;
	number: boolean;
	special: boolean;
}

export interface UsernameErrors {
	validLength: boolean;
	onlyNumberAndLetters: boolean;
}

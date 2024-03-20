import React, { useCallback, useState } from "react";
import { TextInput } from "../../input/text-input";
import { validatePassword } from "./validation";
import { PasswordErrors } from "./types";
import { useI18nStore } from "../../../i18n/i18n-store";

export interface PasswordInputValidationProps {
	label?: string | React.ReactNode;
}

export const PasswordInputWithValidation: React.FC<
	PasswordInputValidationProps
> = ({ label }) => {
	const i18n = useI18nStore().i18n();
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);

	const [passwordErrors, setPasswordErrors] = useState<PasswordErrors>({
		validLength: false,
		upperAndLowerCase: false,
		number: false,
		special: false,
	});

	const checks: { name: keyof PasswordErrors; description: string }[] = [
		{
			name: "validLength",
			description: i18n.navbar.profile.settings.passwordLength,
		},
		{
			name: "upperAndLowerCase",
			description: i18n.navbar.profile.settings.passwordUpperAndLowerCase,
		},
		{
			name: "special",
			description: i18n.navbar.profile.settings.passwordSpecialChar,
		},
		{
			name: "number",
			description: i18n.navbar.profile.settings.passwordNumber,
		},
	];

	const onChange = useCallback(
		({ target }: React.ChangeEvent<HTMLInputElement>) => {
			const validatedPasswordErrors = validatePassword(target.value);

			setPasswordErrors(validatedPasswordErrors);

			const hasErrors = Object.values(validatedPasswordErrors).some(
				(error) => !error,
			);

			if (!hasErrors) {
				target.setCustomValidity("");
				return;
			}

			target.setCustomValidity(i18n.navbar.profile.settings.checkInput);
		},
		[],
	);

	return (
		<>
			<label className="mb-2 font-semibold" htmlFor="password">
				{label}
			</label>
			<div className="flex flex-row relative">
				<TextInput
					type={isPasswordVisible ? "text" : "password"}
					id="password"
					name="password"
					required
					onChange={onChange}
				/>
				<button
					type="button"
					className="right-3 absolute top-[1rem] p-1 rounded-xl"
					onClick={() => {
						setIsPasswordVisible(!isPasswordVisible);
					}}
				>
					{isPasswordVisible
						? i18n.navbar.profile.hidePassword
						: i18n.navbar.profile.showPassword}
					<span className="sr-only">
						{isPasswordVisible ? "Hide password" : "Show password"}
					</span>
				</button>
			</div>
			<p className="font-medium">
				{i18n.navbar.profile.settings.passwordShould}
			</p>
			<ul>
				{checks.map((check) => (
					<li key={check.name} className="flex gap-2">
						{passwordErrors[check.name] ? (
							<span className="text-blue-600">✓</span>
						) : (
							<span>•</span>
						)}
						{check.description}
					</li>
				))}
			</ul>
		</>
	);
};

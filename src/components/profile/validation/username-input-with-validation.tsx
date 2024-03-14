import React, { useCallback, useState } from "react";
import TextInput from "../../input/text-input";
import { Warning } from "./warning";
import { checkIfUsernameIsTaken, validateUsername } from "./validation";
import { UsernameErrors } from "./types";
import { useI18nStore } from "../../../i18n/i18n-store";
import { useErrorStore } from "../../../error/error-store";

export interface UsernameInputValidationProps {
	label: string | React.ReactNode;
	defaultValue?: string;
}

export const UsernameInputWithValidation: React.FC<
	UsernameInputValidationProps
> = ({ label, defaultValue }) => {
	const i18n = useI18nStore().i18n();
	const { handleError } = useErrorStore();
	const [usernameErrors, setUsernameErrors] = useState<UsernameErrors>({
		validLength: false,
		onlyNumberAndLetters: false,
	});
	const [isUsernameTakenWarningVisible, setIsUsernameTakenWarningVisible] =
		useState(false);

	const checks: {
		name: keyof UsernameErrors;
		description: string;
	}[] = [
		{
			name: "validLength",
			description: i18n.navbar.profile.settings.usernameLength,
		},
		{
			name: "onlyNumberAndLetters",
			description: i18n.navbar.profile.settings.onlyNumberAndLetters,
		},
	];

	const onChange = useCallback(
		async ({ target }: React.ChangeEvent<HTMLInputElement>) => {
			setIsUsernameTakenWarningVisible(false);

			const validatedUsernameErrors = validateUsername(target.value);

			setUsernameErrors(validatedUsernameErrors);

			const hasErrors = Object.values(validatedUsernameErrors).some(
				(error) => !error,
			);

			if (hasErrors) {
				target.setCustomValidity(i18n.navbar.profile.settings.checkInput);
				return;
			}

			const isSameUsername = target.value === defaultValue;
			if (isSameUsername) {
				target.setCustomValidity("");
				return;
			}

			try {
				const isTaken = await checkIfUsernameIsTaken(target.value);
				setIsUsernameTakenWarningVisible(isTaken);

				if (isTaken) {
					target.setCustomValidity(i18n.navbar.profile.settings.checkInput);
					return;
				}

				target.setCustomValidity("");
			} catch (error) {
				handleError(i18n.common.defaultErrorMessage, error);
			}
		},
		[],
	);

	return (
		<div className="flex-auto">
			<label className="font-semibold" htmlFor="username">
				{label}
			</label>
			<TextInput
				type="text"
				id="username"
				name="username"
				required
				defaultValue={defaultValue}
				onChange={onChange}
			/>
			{isUsernameTakenWarningVisible && (
				<Warning label={i18n.navbar.profile.settings.usernameTaken} />
			)}
			<p className="font-medium">
				{i18n.navbar.profile.settings.usernameShould}
			</p>
			<ul>
				{checks.map((check) => (
					<li key={check.name} className="flex gap-2">
						{usernameErrors[check.name] ? (
							<span className="text-blue-600">✓</span>
						) : (
							<span>•</span>
						)}
						{check.description}
					</li>
				))}
			</ul>
		</div>
	);
};

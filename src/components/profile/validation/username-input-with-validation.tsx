import React, { useCallback, useState } from "react";
import TextInput from "../../input/text-input";
import Warning from "./warning";
import { checkIfUsernameIsTaken, validateUsername } from "./validation";
import { UsernameErrors } from "./types";
import { useI18nStore } from "../../../i18n/i18n-store";

export interface UsernameInputValidationProps {
	label: string | React.ReactNode;
	defaultValue?: string;
}

const UsernameInputWithValidation: React.FC<UsernameInputValidationProps> = ({
	label,
	defaultValue,
}) => {
	const i18n = useI18nStore().i18n();
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

			const usernameErrors = validateUsername(target.value);

			setUsernameErrors(usernameErrors);

			const hasErrors = Object.values(usernameErrors).some((error) => !error);

			if (hasErrors) {
				target.setCustomValidity(i18n.navbar.profile.settings.checkInput);
				return;
			}

			const isTaken = await checkIfUsernameIsTaken(target.value);
			setIsUsernameTakenWarningVisible(isTaken);

			if (isTaken) {
				target.setCustomValidity(i18n.navbar.profile.settings.checkInput);
				return;
			}

			target.setCustomValidity("");
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

export default UsernameInputWithValidation;

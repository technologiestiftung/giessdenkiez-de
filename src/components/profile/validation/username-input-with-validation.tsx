import React, { useCallback, useState } from "react";
import TextInput from "../../input/text-input";
import Warning from "./warning";
import { checkIfUsernameIsTaken, validateUsername } from "./validation";
import { UsernameErrors } from "./types";

export interface UsernameInputValidationProps {
	label: string | React.ReactNode;
	defaultValue?: string;
}

const UsernameInputWithValidation: React.FC<UsernameInputValidationProps> = ({
	label,
	defaultValue,
}) => {
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
			description: "mindestens 3–50 Zeichen lang sein,",
		},
		{
			name: "onlyNumberAndLetters",
			description: "und nur aus Zeichen oder Zahlen bestehen",
		},
	];

	const onChange = useCallback(
		async ({ target }: React.ChangeEvent<HTMLInputElement>) => {
			setIsUsernameTakenWarningVisible(false);

			const usernameErrors = validateUsername(target.value);

			setUsernameErrors(usernameErrors);

			const hasErrors = Object.values(usernameErrors).some((error) => !error);

			if (hasErrors) {
				target.setCustomValidity("Bitte überprüfe Deine Eingabe");
				return;
			}

			const isTaken = await checkIfUsernameIsTaken(target.value);
			setIsUsernameTakenWarningVisible(isTaken);

			if (isTaken) {
				target.setCustomValidity("Bitte überprüfe Dein Eingabe");
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
				<Warning label="Dieser Benutzername ist bereits vergeben" />
			)}
			<p className="font-medium">Dein Benutzername sollte: </p>
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

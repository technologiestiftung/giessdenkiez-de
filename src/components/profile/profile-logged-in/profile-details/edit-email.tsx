import React, { useCallback, useState } from "react";
import { useI18nStore } from "../../../../i18n/i18n-store";
import { EditIcon } from "../../../icons/edit-icon";
import { useAuthStore } from "../../../../auth/auth-store";
import { EmailInputWithValidation } from "../../validation/email-input-with-validation";
import { getErrorMessage } from "../../validation/validation";
import { useEmailTakenStore } from "../../validation/email-taken-store";
import { useErrorStore } from "../../../../error/error-store";

export const EditEmail: React.FC = () => {
	const i18n = useI18nStore().i18n();
	const { updateEmail, getUserData } = useAuthStore();
	const { setIsEmailTaken } = useEmailTakenStore();
	const { handleError } = useErrorStore();
	const [isEmailInputEnabled, setIsEmailInputEnabled] = useState(false);

	const onSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = e.currentTarget;

		const isSameEmail = form.email.value === getUserData()?.email;

		if (isSameEmail) {
			setIsEmailInputEnabled(false);
			return;
		}

		try {
			await updateEmail(form.email.value);
		} catch (error) {
			if (
				getErrorMessage(error) ===
				"A user with this email address has already been registered"
			) {
				setIsEmailTaken(true);
				form.email.setCustomValidity(i18n.navbar.profile.settings.checkInput);
				form.reportValidity();
				return;
			}

			handleError(i18n.common.defaultErrorMessage);
		}

		setIsEmailInputEnabled(false);
	}, []);

	return (
		<div className="mt-7 flex flex-col">
			{isEmailInputEnabled ? (
				<form
					className="flex flex-col justify-between gap-x-8"
					onSubmit={onSubmit}
				>
					<div className="flex flex-col justify-between gap-x-8 md:flex-row">
						<EmailInputWithValidation
							label={i18n.navbar.profile.settings.editEmail}
							defaultValue={getUserData()?.email}
						/>
						<button
							className={`mt-2 cursor-pointer self-end font-semibold 
              text-gdk-blue enabled:hover:text-gdk-light-blue md:mt-6 md:self-center `}
							type="submit"
						>
							{i18n.navbar.profile.settings.approve}
						</button>
					</div>
				</form>
			) : (
				<>
					<p className="mb-2 font-semibold">
						{i18n.navbar.profile.settings.yourEmail}
					</p>
					<div className="flex flex-row justify-between gap-x-8">
						<p className="italic">{getUserData()?.email}</p>
						<button
							className="self-end text-gdk-blue enabled:hover:text-gdk-light-blue"
							onClick={() => setIsEmailInputEnabled(true)}
						>
							<EditIcon />
						</button>
					</div>
				</>
			)}
		</div>
	);
};

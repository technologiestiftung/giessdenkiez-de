import React, { useCallback, useState } from "react";
import { useI18nStore } from "../../../../i18n/i18n-store";
import { EditIcon } from "../../../icons/edit-icon";
import { EmailInputWithValidation } from "../../validation/email-input-with-validation";
import { getErrorMessage } from "../../validation/validation";
import { useEmailTakenStore } from "../../validation/email-taken-store";
import { useErrorStore } from "../../../../error/error-store";
import { TertiaryDestructiveButton } from "../../../buttons/tertiary-destructive";
import { TertiaryButton } from "../../../buttons/tertiary";
import { AlertDialog } from "../../profile-alert/alert-dialog";
import { MailIcon } from "../../../icons/mail-icon";
import { useProfileStore } from "../../../../shared-stores/profile-store";

export const EditEmail: React.FC = () => {
	const i18n = useI18nStore().i18n();
	const { updateEmail, getUserEmail } = useProfileStore();
	const { setIsEmailTaken } = useEmailTakenStore();
	const { handleError } = useErrorStore();
	const [isEmailInputEnabled, setIsEmailInputEnabled] = useState(false);

	const onSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = e.currentTarget;

		const isSameEmail = form.email.value === getUserEmail();

		if (isSameEmail) {
			setIsEmailInputEnabled(false);
			return;
		}

		try {
			await updateEmail(form.email.value);
			(
				document.getElementById(
					"change-email-alert-dialog",
				) as HTMLDialogElement
			).showModal();
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
					<div className="flex flex-col justify-between gap-x-8 ">
						<EmailInputWithValidation
							label={i18n.navbar.profile.settings.editEmail}
							defaultValue={getUserEmail()}
						/>
						<div className="flex flex-row-reverse justify-between">
							<TertiaryButton
								onClick={() => {}}
								label={i18n.navbar.profile.settings.approve}
								type="submit"
							/>
							<div className="md:-mb-4">
								<TertiaryDestructiveButton
									onClick={() => {
										setIsEmailInputEnabled(false);
									}}
									label={i18n.navbar.profile.settings.cancel}
								/>
							</div>
						</div>
					</div>
				</form>
			) : (
				<>
					<p className="mb-2 font-semibold">
						{i18n.navbar.profile.settings.yourEmail}
					</p>
					<div className="flex flex-row justify-between gap-x-8">
						<p className="italic">{getUserEmail()}</p>
						<button
							className="self-end text-gdk-blue enabled:hover:text-gdk-light-blue"
							onClick={() => setIsEmailInputEnabled(true)}
						>
							<EditIcon />
						</button>
					</div>
				</>
			)}
			<AlertDialog
				alertTitleWithIcon={
					<>
						{i18n.navbar.profile.settings.updateEmailEmailSentTitle}
						<MailIcon />
					</>
				}
				alertMessage={i18n.navbar.profile.settings.updateEmailEmailSentMessage}
				id="change-email-alert-dialog"
			/>
		</div>
	);
};

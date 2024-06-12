import React, { useCallback } from "react";
import { useI18nStore } from "../../../../i18n/i18n-store";
import { useAuthStore } from "../../../../auth/auth-store";
import { TertiaryButton } from "../../../buttons/tertiary";
import { useErrorStore } from "../../../../error/error-store";
import { AlertDialog } from "../../../alert-dialog/alert-dialog";
import { MailIcon } from "../../../icons/mail-icon";
import { useProfileStore } from "../../../../shared-stores/profile-store";

export const EditPassword: React.FC = () => {
	const i18n = useI18nStore().i18n();
	const { forgotPassword } = useAuthStore();
	const { getUserEmail } = useProfileStore();
	const { handleError } = useErrorStore();

	const onClick = useCallback(async () => {
		try {
			await forgotPassword(getUserEmail() ?? "");
			(
				document.getElementById(
					"edit-passwort-alert-dialog",
				) as HTMLDialogElement
			).showModal();
		} catch (error) {
			handleError(i18n.common.defaultErrorMessage);
		}
	}, []);

	return (
		<>
			<div className="mt-7 flex flex-col">
				<label className="font-semibold" htmlFor="email">
					{i18n.navbar.profile.settings.password}
				</label>
				<div className="flex flex-row justify-between gap-x-4 ">
					<input
						className="disabled:bg-gdk-white "
						disabled={true}
						id="password"
						type="password"
						value="1234567890"
					/>
					<TertiaryButton
						onClick={onClick}
						label={i18n.navbar.profile.settings.changePassword}
					></TertiaryButton>
				</div>
				<AlertDialog
					alertTitleWithIcon={
						<>
							{i18n.navbar.profile.settings.resetPasswordEmailSentTitle}
							<MailIcon />
						</>
					}
					alertMessage={
						i18n.navbar.profile.settings.resetPasswordEmailSentMessage
					}
					id="edit-passwort-alert-dialog"
				/>
			</div>
		</>
	);
};

import React, { useCallback } from "react";
import { useI18nStore } from "../../../../i18n/i18n-store";
import { useAuthStore } from "../../../../auth/auth-store";
import { TertiaryButton } from "../../../buttons/tertiary";
import { useErrorStore } from "../../../../error/error-store";
import { AlertDialog } from "../../profile-alert/alert-dialog";
import { MailIcon } from "../../../icons/mail-icon";

export const EditPassword: React.FC = () => {
	const i18n = useI18nStore().i18n();
	const { forgotPassword, getUserData } = useAuthStore();
	const { handleError } = useErrorStore();

	const onClick = useCallback(async () => {
		try {
			await forgotPassword(getUserData()?.email ?? "");
			(
				document.getElementById("alert-dialog") as HTMLDialogElement
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
					/>
				</div>
			</div>
		</>
	);
};

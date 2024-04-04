import React from "react";
import { useAuthStore } from "../../../auth/auth-store";
import { PasswordInputWithValidation } from "../validation/password-input-with-validation";
import { PrimaryButton } from "../../buttons/primary";
import { LanguageToggle } from "../../router/languageToggle";
import { useI18nStore } from "../../../i18n/i18n-store";
import { AlertDialog } from "../profile-alert/alert-dialog";
import { CheckIcon } from "../../icons/check-icon";
import { InternalAnchorLink } from "../../anchor-link/internal-anchor-link";

export const PasswordReset: React.FC = () => {
	const { updatePassword } = useAuthStore();
	const i18n = useI18nStore().i18n();

	return (
		<div
			className={`
        h-full w-full px-5 pt-10 lg:mx-auto lg:my-auto lg:max-h-[40rem] 
        lg:max-w-[42rem] lg:rounded-2xl lg:border-2 lg:p-14 lg:shadow-sm`}
		>
			<div className="lg:hidden  absolute top-7 right-4">
				<LanguageToggle />
			</div>
			<h1 className="text-2xl font-semibold">
				{i18n.navbar.profile.settings.changePassword}
			</h1>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					updatePassword(e.currentTarget.password.value);
					(
						document.getElementById(
							"password-reset-alert-dialog",
						) as HTMLDialogElement
					).showModal();
				}}
				className="flex flex-col"
			>
				<div className="flex flex-col gap-y-2 pt-6">
					<PasswordInputWithValidation
						label={i18n.navbar.profile.settings.newPassword}
					/>
				</div>

				<div className="md: flex flex-row items-center justify-between gap-24 pt-11">
					<InternalAnchorLink
						href="/profile"
						label={`${i18n.navbar.profile.settings.cancel}`}
					/>

					<PrimaryButton type="submit" label="Speichern" />
				</div>
			</form>
			<AlertDialog
				alertTitleWithIcon={
					<>
						{i18n.navbar.profile.settings.passwordChangeConfirmationTitle}
						<div className="w-1/2 self-center">
							<CheckIcon />
						</div>
					</>
				}
				alertMessage={
					i18n.navbar.profile.settings.passwordChangeConfirmationMessage
				}
				href="/profile"
				id="password-reset-alert-dialog"
			/>
		</div>
	);
};

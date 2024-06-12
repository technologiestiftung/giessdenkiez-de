import React from "react";
import { useAuthStore } from "../../../auth/auth-store";
import { PrimaryButton } from "../../buttons/primary";
import { TextInput } from "../../input/text-input";
import { useI18nStore } from "../../../i18n/i18n-store";
import { useErrorStore } from "../../../error/error-store";
import { InternalAnchorLink } from "../../anchor-link/internal-anchor-link";
import { AlertDialog } from "../../alert-dialog/alert-dialog";
import { MailIcon } from "../../icons/mail-icon";

export const ForgotPassword: React.FC = () => {
	const { forgotPassword } = useAuthStore();
	const i18n = useI18nStore().i18n();
	const { handleError } = useErrorStore();

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			await forgotPassword(e.currentTarget.email.value);
			(
				document.getElementById(
					"edit-passwort-alert-dialog",
				) as HTMLDialogElement
			).showModal();
		} catch (error) {
			handleError(i18n.common.defaultErrorMessage);
		}
	};

	return (
		<>
			<InternalAnchorLink
				href="/profile"
				label={`< ${i18n.navbar.profile.settings.backToLogin}`}
			/>

			<h1 className="pt-12 text-2xl font-semibold">
				{" "}
				{i18n.navbar.profile.settings.passwordForgotten}
			</h1>
			<form onSubmit={onSubmit} className="flex flex-col">
				<div className="flex flex-col gap-y-2 pt-7">
					<label htmlFor="email">{i18n.navbar.profile.settings.email}</label>
					<TextInput type="email" id="email" name="email" required />
				</div>

				<div className="pt-11">
					<PrimaryButton
						type="submit"
						label={i18n.navbar.profile.settings.resetPassword}
					/>
				</div>
			</form>

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

			<p className="pt-6">{i18n.navbar.profile.settings.backToLogin}?</p>
			<InternalAnchorLink
				href="/profile"
				label={i18n.navbar.profile.settings.clickHere}
			/>
		</>
	);
};

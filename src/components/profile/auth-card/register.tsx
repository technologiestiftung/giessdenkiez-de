import React, { useCallback, useState } from "react";
import { useAuthStore } from "../../../auth/auth-store";
import { useI18nStore } from "../../../i18n/i18n-store";
import { EmailInputWithValidation } from "../validation/email-input-with-validation";
import { UsernameInputWithValidation } from "../validation/username-input-with-validation";
import { PasswordInputWithValidation } from "../validation/password-input-with-validation";
import { PrimaryButton } from "../../buttons/primary";
import { useEmailTakenStore } from "../validation/email-taken-store";
import { getErrorMessage } from "../validation/validation";
import { useErrorStore } from "../../../error/error-store";
import { InternalAnchorLink } from "../../anchor-link/internal-anchor-link";
import { AlertDialog } from "../profile-alert/alert-dialog";
import { MailIcon } from "../../icons/mail-icon";

export const Register: React.FC = () => {
	const { register } = useAuthStore();
	const { setIsEmailTaken } = useEmailTakenStore();
	const i18n = useI18nStore().i18n();
	const { handleError } = useErrorStore();
	const [emailSubmitted, setEmailSubmitted] = useState("");

	const onSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = e.currentTarget;
		setEmailSubmitted(form.email.value);

		try {
			await register({
				email: form.email.value,
				username: form.username.value,
				password: form.password.value,
			});
			(
				document.getElementById("register-alert-dialog") as HTMLDialogElement
			).showModal();
		} catch (error) {
			if (getErrorMessage(error) === "User already registered") {
				setIsEmailTaken(true);
				form.email.setCustomValidity(i18n.navbar.profile.settings.checkInput);
				form.reportValidity();
				return;
			}

			handleError(i18n.common.defaultErrorMessage);
		}
	}, []);

	return (
		<>
			<InternalAnchorLink
				href="/profile"
				label={`< ${i18n.navbar.profile.settings.backToLogin}`}
			/>
			<h1 className="pt-6 text-2xl font-semibold">
				{i18n.navbar.profile.settings.register}
			</h1>
			<form onSubmit={onSubmit} className="flex flex-col">
				<div className="flex flex-col gap-y-2 pt-5">
					<EmailInputWithValidation
						label={i18n.navbar.profile.settings.email}
					/>
				</div>

				<div className="flex flex-col gap-y-2 pt-6">
					<UsernameInputWithValidation
						label={i18n.navbar.profile.settings.username}
					/>
				</div>

				<div className="flex flex-col pt-6">
					<PasswordInputWithValidation
						label={i18n.navbar.profile.settings.password}
					/>
				</div>

				<div className="pt-11">
					<PrimaryButton
						type="submit"
						label={i18n.navbar.profile.settings.register}
					/>
				</div>
			</form>
			<p className="pt-6">{i18n.navbar.profile.settings.existingAccount}</p>
			<InternalAnchorLink
				href="/profile"
				label={i18n.navbar.profile.settings.logIn}
			/>
			<AlertDialog
				alertTitleWithIcon={
					<>
						{i18n.navbar.profile.settings.confirmEmailTitle}
						<div className="self-center">
							<MailIcon />
						</div>
					</>
				}
				alertMessage={i18n.navbar.profile.settings.confirmEmail(emailSubmitted)}
				href="/profile"
				id="register-alert-dialog"
			/>
		</>
	);
};

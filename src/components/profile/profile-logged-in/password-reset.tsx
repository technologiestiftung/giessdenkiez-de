/* eslint-disable max-lines */
import React, { useEffect, useState } from "react";
import { PasswordInputWithValidation } from "../validation/password-input-with-validation";
import { PrimaryButton } from "../../buttons/primary";
import { LanguageToggle } from "../../router/languageToggle";
import { useI18nStore } from "../../../i18n/i18n-store";
import { AlertDialog } from "../../alert-dialog/alert-dialog";
import { CheckIcon } from "../../icons/check-icon";
import { InternalAnchorLink } from "../../anchor-link/internal-anchor-link";
import { useProfileStore } from "../../../shared-stores/profile-store";
import { useErrorStore } from "../../../error/error-store";
import { getErrorMessage } from "../validation/validation";
import { useAuthStore } from "../../../auth/auth-store";
import { Loading } from "../../loading/loading";
import { ErrorIcon } from "../../icons/error-icon";
import { useUrlState } from "../../router/store";

const showSuccessModal = () => {
	(
		document.getElementById("password-reset-alert-dialog") as HTMLDialogElement
	).showModal();
};

export const PasswordReset: React.FC = () => {
	const { updatePassword } = useProfileStore();
	const i18n = useI18nStore().i18n();
	const { handleError } = useErrorStore();
	const { isPasswordRecovery } = useAuthStore();
	const { setPathname } = useUrlState();

	const [isWaitingForPasswordRecovery, setIsWaitingForPasswordRecovery] =
		useState<boolean>(true);
	const [isTimeUp, setIsTimeUp] = useState<boolean>(false);

	useEffect(() => {
		if (isPasswordRecovery) {
			setIsWaitingForPasswordRecovery(false);
			return () => {};
		}

		const timer = setTimeout(
			() => setIsTimeUp(true),
			10 * 1000 /* 10 seconds */,
		);

		return () => clearTimeout(timer);
	}, [isPasswordRecovery]);

	if (isTimeUp) {
		return (
			<div className="mx-auto my-auto w-[26rem] rounded-xl bg-gdk-lighter-gray p-8">
				<h1 className="flex gap-x-5 text-xl font-semibold">
					<span>
						{
							i18n.navbar.profile.settings
								.passwordChangeWithoutRecoveryLinkTitle
						}
					</span>
					<span>
						<ErrorIcon />
					</span>
				</h1>

				<p className="pt-5">
					{
						i18n.navbar.profile.settings
							.passwordChangeWithoutRecoveryLinkMessage
					}
				</p>

				<div className="pt-5">
					<PrimaryButton
						onClick={() => setPathname("/map")}
						label={
							i18n.navbar.profile.settings
								.passwordChangeWithoutRecoveryLinkLinkLabel
						}
					/>
				</div>
			</div>
		);
	}

	if (isWaitingForPasswordRecovery) {
		return (
			<>
				<Loading loadingText={i18n.navbar.profile.settings.pleaseWait} />
			</>
		);
	}

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			await updatePassword(e.currentTarget.password.value);
			showSuccessModal();
		} catch (error) {
			if (
				getErrorMessage(error) ===
				"New password should be different from the old password."
			) {
				showSuccessModal();
				return;
			}

			handleError(i18n.common.defaultErrorMessage, error);
		}
	};

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
			<form onSubmit={onSubmit} className="flex flex-col">
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

					<PrimaryButton
						type="submit"
						label={i18n.navbar.profile.settings.save}
					/>
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

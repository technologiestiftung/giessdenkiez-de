import React from "react";
import { useAuthStore } from "../../../auth/auth-store";
import { PasswordInputWithValidation } from "../validation/password-input-with-validation";
import { PrimaryButton } from "../../buttons/primary";
import { useUrlState } from "../../router/store";
import { LanguageToggle } from "../../router/languageToggle";
import { useI18nStore } from "../../../i18n/i18n-store";

export const PasswordReset: React.FC = () => {
	const { updatePassword } = useAuthStore();
	const { setPathname } = useUrlState();
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
				}}
				className="flex flex-col"
			>
				<div className="flex flex-col gap-y-2 pt-6">
					<PasswordInputWithValidation
						label={i18n.navbar.profile.settings.newPassword}
					/>
				</div>

				<div className="md: flex flex-row items-center justify-between gap-24 pt-11">
					<a
						className="font-semibold text-gdk-blue hover:text-gdk-light-blue"
						href="/profile"
						onClick={(e) => {
							e.preventDefault();
							setPathname("/profile");
						}}
					>
						Abbrechen
						{i18n.navbar.profile.settings.cancel}
					</a>

					<PrimaryButton type="submit" label="Speichern" />
				</div>
			</form>
		</div>
	);
};

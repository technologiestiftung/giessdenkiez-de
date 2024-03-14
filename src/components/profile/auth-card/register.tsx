import React, { useCallback } from "react";
import { useUrlState } from "../../router/store";
import { useAuthStore } from "../../../auth/auth-store";
import { useI18nStore } from "../../../i18n/i18n-store";
import EmailInputWithValidation from "../validation/email-input-with-validation";
import UsernameInputWithValidation from "../validation/username-input-with-validation";
import PasswordInputWithValidation from "../validation/password-input-with-validation";
import PrimaryButton from "../../buttons/primary";

const Register: React.FC = () => {
	const { setPathname } = useUrlState();
	const { register } = useAuthStore();
	const i18n = useI18nStore().i18n();

	const onSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		register({
			email: e.currentTarget.email.value,
			username: e.currentTarget.username.value,
			password: e.currentTarget.password.value,
		});
	}, []);

	return (
		<>
			<div
				className={`
        h-full w-full px-4 pt-10
        lg:mx-auto lg:my-auto lg:max-h-[40rem] lg:max-w-[42rem] lg:rounded lg:border lg:shadow`}
			>
				<a
					className="font-semibold text-blue-600"
					href="/profile"
					onClick={(e) => {
						e.preventDefault();
						setPathname("/profile");
					}}
				>
					<span>&lt;</span> {i18n.navbar.profile.settings.backToLogin}
				</a>

				<h1 className="pt-6 text-2xl font-semibold">
					{i18n.navbar.profile.settings.register}
				</h1>
				<form onSubmit={onSubmit} className="flex flex-col">
					<div className="flex flex-col gap-y-2 pt-5">
						<EmailInputWithValidation label="E-mail" />
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
				<a
					className="font-semibold text-blue-600"
					href="/profile"
					onClick={(e) => {
						e.preventDefault();
						setPathname("/profile");
					}}
				>
					{i18n.navbar.profile.settings.logIn}
				</a>
			</div>
		</>
	);
};

export default Register;

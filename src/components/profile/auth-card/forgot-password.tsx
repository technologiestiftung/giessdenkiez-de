import React from "react";
import { useAuthStore } from "../../../auth/auth-store";
import PrimaryButton from "../../buttons/primary";
import TextInput from "../../input/text-input";
import { useUrlState } from "../../router/store";
import { useI18nStore } from "../../../i18n/i18n-store";
import { useErrorStore } from "../../../error/error-store";

export const ForgotPassword: React.FC = () => {
	const { forgotPassword } = useAuthStore();
	const { setPathname } = useUrlState();
	const i18n = useI18nStore().i18n();
	const { handleError } = useErrorStore();

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			await forgotPassword(e.currentTarget.email.value);
		} catch (error) {
			handleError(i18n.common.defaultErrorMessage);
		}
	};

	return (
		<>
			<a
				className="font-semibold text-blue-600 hover:text-gdk-light-blue"
				href="/profile"
				onClick={(e) => {
					e.preventDefault();
					setPathname("/profile");
				}}
			>
				<span>&lt;</span> {i18n.navbar.profile.settings.backToLogin}
			</a>

			<h1 className="pt-12 text-2xl font-semibold">
				{" "}
					{i18n.navbar.profile.settings.passwordForgotten}
				</h1>
				<form onSubmit={onSubmit} className="flex flex-col">
					<div className="flex flex-col gap-y-2 pt-7">
						<label htmlFor="email" className="">
							{i18n.navbar.profile.settings.email}
						</label>
						<TextInput type="email" id="email" name="email" required />
					</div>

				<div className="pt-11">
					<PrimaryButton
						type="submit"
						label={i18n.navbar.profile.settings.resetPassword}
					/>
				</div>
			</form>

			<p className="pt-6">{i18n.navbar.profile.settings.backToLogin}?</p>
			<a
				className="font-semibold text-blue-600 hover:text-gdk-light-blue"
				href="/profile"
				onClick={(e) => {
					e.preventDefault();
					setPathname("/profile");
				}}
			>
				{i18n.navbar.profile.settings.clickHere}
			</a>
		</>
	);
};

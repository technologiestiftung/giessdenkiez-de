import React, { useState } from "react";
import { useAuthStore } from "../../../auth/auth-store";
import PrimaryButton from "../../buttons/primary";
import TextInput from "../../input/text-input";
import { useUrlState } from "../../router/store";
import { useI18nStore } from "../../../i18n/i18n-store";

const Login: React.FC = () => {
	const { login } = useAuthStore();
	const { setSearchParams } = useUrlState();
	const i18n = useI18nStore().i18n();
	const [isPasswordVisible, setPasswordVisible] = useState(false);

	return (
		<>
			<h1 className="text-2xl font-semibold">
				{i18n.navbar.profile.settings.logInShort}
			</h1>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					login({
						email: e.currentTarget.email.value,
						password: e.currentTarget.password.value,
					});
				}}
				className="flex flex-col"
			>
				<div className="flex flex-col gap-y-2 pt-7">
					<label htmlFor="email" className="">
						{i18n.navbar.profile.settings.email}
					</label>
					<TextInput type="email" id="email" name="email" />
				</div>

				<div className="flex flex-col gap-y-2 pt-6">
					<label htmlFor="password" className="">
						{i18n.navbar.profile.settings.password}
					</label>

					<div className="flex flex-row relative">
						<TextInput
							type={isPasswordVisible ? "text" : "password"}
							id="password"
							name="password"
						/>
						<button
							type="button"
							className="right-3 absolute top-[1rem] p-1 rounded-xl"
							onClick={() => {
								setPasswordVisible(!isPasswordVisible);
							}}
						>
							{isPasswordVisible
								? i18n.navbar.profile.hidePassword
								: i18n.navbar.profile.showPassword}
							<span className="sr-only">
								{isPasswordVisible ? "Hide password" : "Show password"}
							</span>
						</button>
					</div>
				</div>

				<div className="pt-11">
					<PrimaryButton
						type="submit"
						label={i18n.navbar.profile.settings.logInShort}
					/>
				</div>
			</form>

			<p className="pt-6">{i18n.navbar.profile.settings.missingAccount}</p>
			<a
				className="font-semibold text-blue-600"
				href="/profile?mode=register"
				onClick={(e) => {
					e.preventDefault();
					setSearchParams(new URLSearchParams("mode=register"));
				}}
			>
				{i18n.navbar.profile.settings.registerNow}
			</a>

			<p className="pt-6">
				{i18n.navbar.profile.settings.ohNoforgotYourPassword}
			</p>
			<a
				className="font-semibold text-blue-600"
				href="/profile?mode=forgot-password"
				onClick={(e) => {
					e.preventDefault();
					setSearchParams(new URLSearchParams("mode=forgot-password"));
				}}
			>
				{i18n.navbar.profile.settings.forgotYourPassword}
			</a>
		</>
	);
};

export default Login;

import React from "react";
import { useAuthStore } from "../../../auth/auth-store";
import PrimaryButton from "../../buttons/primary";
import TextInput from "../../input/text-input";
import { useUrlState } from "../../router/store";

const Login: React.FC = () => {
	const { login } = useAuthStore();
	const { setSearchParams } = useUrlState();

	return (
		<>
			<div
				className={`
        h-full w-full px-4 pt-10
        lg:mx-auto lg:my-auto lg:max-h-[40rem] lg:max-w-[42rem] lg:rounded lg:border lg:shadow`}
			>
				<h1 className="text-2xl font-semibold">Anmelden</h1>
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
							Email
						</label>
						<TextInput type="email" id="email" name="email" />
					</div>

					<div className="flex flex-col gap-y-2 pt-6">
						<label htmlFor="password" className="">
							Password
						</label>
						<TextInput type="password" id="password" name="password" />
					</div>

					<div className="pt-11">
						<PrimaryButton type="submit" label="Anmelden" />
					</div>
				</form>

				<p className="pt-6">Du hast noch keinen Account?</p>
				<a
					className="font-semibold text-blue-600"
					href="/profile?mode=register"
					onClick={(e) => {
						e.preventDefault();
						setSearchParams(new URLSearchParams("mode=register"));
					}}
				>
					Registriere Dich
				</a>

				<p className="pt-6">Oh nein. Du hast Dein</p>
				<a
					className="font-semibold text-blue-600"
					href="/profile?mode=forgot-password"
					onClick={(e) => {
						e.preventDefault();
						setSearchParams(new URLSearchParams("mode=forgot-password"));
					}}
				>
					Passwort vergessen?
				</a>
			</div>
		</>
	);
};

export default Login;

import React from "react";
import { useI18nStore } from "../../../../i18n/i18n-store";
import { useAuthStore } from "../../../../auth/auth-store";
import TertiaryButton from "../../../buttons/tertiary";

const EditPassword: React.FC = () => {
	const i18n = useI18nStore().i18n();
	const { forgotPassword, getUserData } = useAuthStore();

	return (
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
					onClick={() => {
						forgotPassword(getUserData()?.email ?? "");
					}}
					label={i18n.navbar.profile.settings.changePassword}
				></TertiaryButton>
			</div>
		</div>
	);
};

export default EditPassword;

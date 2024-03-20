import React, { useState } from "react";
import { useI18nStore } from "../../../../i18n/i18n-store";
import { EditIcon } from "../../../icons/edit-icon";
import { useAuthStore } from "../../../../auth/auth-store";
import { UsernameInputWithValidation } from "../../validation/username-input-with-validation";
import { useErrorStore } from "../../../../error/error-store";

export const EditUsername: React.FC = () => {
	const i18n = useI18nStore().i18n();
	const { updateUsername, username } = useAuthStore();
	const { handleError } = useErrorStore();

	const [isUsernameInputEnabled, setIsUsernameInputEnabled] = useState(false);

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = e.currentTarget;
		setIsUsernameInputEnabled(false);

		const isSameUsername = form.username.value === username;
		if (isSameUsername) {
			return;
		}

		try {
			await updateUsername(e.currentTarget.username.value);
		} catch (error) {
			handleError(i18n.common.defaultErrorMessage, error);
		}
	};

	return (
		<div className="mt-7 flex flex-col">
			{isUsernameInputEnabled ? (
				<form
					className="flex flex-col justify-between gap-x-8"
					onSubmit={onSubmit}
				>
					<div className="flex flex-col justify-between gap-x-8 md:flex-row">
						<UsernameInputWithValidation
							label={i18n.navbar.profile.settings.editUsername}
							defaultValue={username ?? ""}
						/>
						<button
							className={`mt-2 cursor-pointer self-end  font-semibold 
              text-gdk-blue enabled:hover:text-gdk-light-blue md:mb-12 md:mt-0 md:self-center `}
							type="submit"
						>
							{i18n.navbar.profile.settings.approve}
						</button>
					</div>
				</form>
			) : (
				<>
					<p className="mb-2 font-semibold">
						{i18n.navbar.profile.settings.yourUsername}
					</p>
					<div className="flex flex-row justify-between gap-x-8">
						<p className="italic">{username ?? ""}</p>
						<button
							className="self-end text-gdk-blue enabled:hover:text-gdk-light-blue"
							onClick={() => {
								setIsUsernameInputEnabled(true);
							}}
						>
							<EditIcon />
						</button>
					</div>
				</>
			)}
		</div>
	);
};

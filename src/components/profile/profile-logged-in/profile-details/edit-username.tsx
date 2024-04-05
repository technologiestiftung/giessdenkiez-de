import React, { useState } from "react";
import { useI18nStore } from "../../../../i18n/i18n-store";
import { EditIcon } from "../../../icons/edit-icon";
import { useAuthStore } from "../../../../auth/auth-store";
import { UsernameInputWithValidation } from "../../validation/username-input-with-validation";
import { useErrorStore } from "../../../../error/error-store";
import { TertiaryDestructiveButton } from "../../../buttons/tertiary-destructive";
import { TertiaryButton } from "../../../buttons/tertiary";

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
					onBlur={() => {
						setIsUsernameInputEnabled(false);
					}}
				>
					<div className="flex flex-col justify-between gap-x-8 ">
						<UsernameInputWithValidation
							label={i18n.navbar.profile.settings.editUsername}
							defaultValue={username ?? ""}
						/>
						<div className="flex flex-row-reverse justify-between">
							<TertiaryButton
								onClick={() => {}}
								label={i18n.navbar.profile.settings.approve}
								type="submit"
							/>
							<div className="md:-mb-4">
								<TertiaryDestructiveButton
									onClick={() => {
										setIsUsernameInputEnabled(false);
									}}
									label={i18n.navbar.profile.settings.cancel}
								/>
							</div>
						</div>
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

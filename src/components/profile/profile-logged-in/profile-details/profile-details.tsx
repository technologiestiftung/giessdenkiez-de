import React, { useCallback } from "react";
import { useI18nStore } from "../../../../i18n/i18n-store";
import { EditEmail } from "./edit-email";
import { EditUsername } from "./edit-username";
import { EditPassword } from "./edit-password";
import { TertiaryDestructiveButton } from "../../../buttons/tertiary-destructive";
import { useAuthStore } from "../../../../auth/auth-store";
import { useErrorStore } from "../../../../error/error-store";
import { useUrlState } from "../../../router/store";

export const ProfileDetails: React.FC = () => {
	const i18n = useI18nStore().i18n();
	const { deleteUser } = useAuthStore();
	const { handleError } = useErrorStore();
	const { setSearchParams } = useUrlState();

	const onClick = useCallback(async () => {
		try {
			await deleteUser();
			setSearchParams(new URLSearchParams());
		} catch (error) {
			handleError(i18n.common.defaultErrorMessage, error);
		}
	}, []);

	return (
		<div className="mb-3 md:rounded-2xl md:border-2 md:p-7 md:shadow-gdk-soft">
			<h2 className="text-2xl font-semibold">
				{i18n.navbar.profile.settings.subtitle}
			</h2>
			<div className="md:rounded-2xl md:border-2 md:px-5 md:shadow-gdk-soft my-5">
				<EditUsername />
				<EditEmail />
				<EditPassword />
			</div>
			<div className="flex justify-center md:justify-start md:ml-5 ml-0">
				<TertiaryDestructiveButton label="Account löschen" onClick={onClick} />
			</div>
		</div>
	);
};

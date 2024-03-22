import React from "react";
import { useI18nStore } from "../../../../i18n/i18n-store";
import { EditEmail } from "./edit-email";
import { EditUsername } from "./edit-username";
import { EditPassword } from "./edit-password";
import { TertiaryDestructiveButton } from "../../../buttons/tertiary-destructive";
import { DeleteAccountDialog } from "./delete-account-dialog";

export const ProfileDetails: React.FC = () => {
	const i18n = useI18nStore().i18n();

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
				<TertiaryDestructiveButton
					label={i18n.navbar.profile.settings.deleteAccount}
					onClick={() =>
						(
							document.getElementById(
								"delete-account-dialog",
							) as HTMLDialogElement
						).showModal()
					}
				/>
			</div>
			<DeleteAccountDialog />
		</div>
	);
};

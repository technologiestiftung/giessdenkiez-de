import React, { useCallback } from "react";
import { useErrorStore } from "../../../../error/error-store";
import { useUrlState } from "../../../router/store";
import { useI18nStore } from "../../../../i18n/i18n-store";
import { SecondaryDestructiveButton } from "../../../buttons/secondary-destructive";
import { PrimaryButton } from "../../../buttons/primary";
import { useProfileStore } from "../../../../shared-stores/profile-store";

export const DeleteAccountDialog: React.FC = () => {
	const i18n = useI18nStore().i18n();
	const { deleteUser } = useProfileStore();
	const { handleError } = useErrorStore();
	const { setSearchParams } = useUrlState();

	const onConfirm = useCallback(async () => {
		try {
			await deleteUser();
			setSearchParams(new URLSearchParams());
		} catch (error) {
			handleError(i18n.common.defaultErrorMessage, error);
		}
	}, []);

	return (
		<dialog
			id={"delete-account-dialog"}
			className="pt-10 pb-8 px-12 bg-white shadow-gdk-hard rounded-2xl backdrop:backdrop-blur-xs"
		>
			<p className="font-semibold text-xl">
				{
					useI18nStore.getState().i18n().navbar.profile.settings
						.deleteAccountConfirm
				}
			</p>
			<div className="flex flex-col-reverse sm:flex-row justify-between pt-8">
				<SecondaryDestructiveButton
					label={
						useI18nStore.getState().i18n().navbar.profile.settings.confirmDelete
					}
					onClick={onConfirm}
				/>
				<PrimaryButton
					label={useI18nStore.getState().i18n().navbar.profile.settings.cancel}
					onClick={() =>
						(
							document.getElementById(
								"delete-account-dialog",
							) as HTMLDialogElement
						).close()
					}
				/>
			</div>
		</dialog>
	);
};

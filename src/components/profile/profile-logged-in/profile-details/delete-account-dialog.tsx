import React, { useCallback } from "react";
import { useAuthStore } from "../../../../auth/auth-store.tsx";
import { useErrorStore } from "../../../../error/error-store.tsx";
import { useUrlState } from "../../../router/store.tsx";
import { useI18nStore } from "../../../../i18n/i18n-store.ts";
import { SecondaryDestructiveButton } from "../../../buttons/secondary-destructive.tsx";
import { PrimaryButton } from "../../../buttons/primary.tsx";

export const DeleteAccountDialog: React.FC = () => {
	const i18n = useI18nStore().i18n();
	const { deleteUser } = useAuthStore();
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
			className="pt-10 pb-8 px-12 bg-white shadow rounded-2xl backdrop:backdrop-blur"
		>
			<p className="font-semibold text-xl">
				{
					useI18nStore.getState().i18n().navbar.profile.settings
						.deleteAccountConfirm
				}
			</p>
			<div className="flex flex-col sm:flex-row justify-between pt-8">
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

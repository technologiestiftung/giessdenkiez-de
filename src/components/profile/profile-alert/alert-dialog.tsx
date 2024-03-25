import React from "react";
import { useI18nStore } from "../../../i18n/i18n-store.ts";
import { PrimaryButton } from "../../buttons/primary.tsx";

export interface AlertDialogProps {
	alertTitleWithIcon: string | React.ReactNode;
	alertMessage: string;
}

export const AlertDialog: React.FC<AlertDialogProps> = ({
	alertTitleWithIcon,
	alertMessage,
}) => {
	return (
		<dialog
			id={"alert-dialog"}
			className="py-6 px-10 bg-gdk-lighter-gray shadow-gdk-hard rounded-2xl w-11/12 sm:w-[400px] backdrop:backdrop-blur"
		>
			<div className="flex-col flex">
				<span className="font-semibold text-xl flex flex-row gap-x-5 my-4 justify-start">
					{alertTitleWithIcon}
				</span>
				<p className="">{alertMessage}</p>

				<div className="self-end my-2 lg:m-0">
					<PrimaryButton
						label={
							useI18nStore.getState().i18n().navbar.profile.settings.confirm
						}
						onClick={() => {
							(
								document.getElementById("alert-dialog") as HTMLDialogElement
							).close();
						}}
					/>
				</div>
			</div>
		</dialog>
	);
};

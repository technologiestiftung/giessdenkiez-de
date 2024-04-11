import React from "react";
import { useI18nStore } from "../../../i18n/i18n-store.ts";
import { PrimaryButton } from "../../buttons/primary";
import { useUrlState } from "../../router/store";

export interface AlertDialogProps {
	alertTitleWithIcon: string | React.ReactNode;
	alertMessage: string;
	href?: string;
	id: string;
}

export const AlertDialog: React.FC<AlertDialogProps> = ({
	alertTitleWithIcon,
	alertMessage,
	href,
	id,
}) => {
	const { setPathname } = useUrlState();

	const onClick = () => {
		(document.getElementById(id) as HTMLDialogElement).close();
		if (href) {
			setPathname(href);
		}
	};

	return (
		<dialog
			id={id}
			className="py-6 px-10 bg-gdk-white shadow-gdk-hard rounded-2xl w-11/12 sm:w-[410px] backdrop:backdrop-blur-xs"
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
						onClick={onClick}
					/>
				</div>
			</div>
		</dialog>
	);
};

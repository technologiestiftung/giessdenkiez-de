import React from "react";
import Markdown from "react-markdown";
import { PrimaryButton } from "../buttons/primary.tsx";
import { InfoIcon } from "../icons/info-icon.tsx";
import { useUrlState } from "../router/store.tsx";

export interface WarningDialogProps {
	title: string;
	alertMessage?: string;
	href?: string;
	id: string;
	confirmTitle: string;
}

export const WarningDialog: React.FC<WarningDialogProps> = ({
	title,
	alertMessage,
	href,
	id,
	confirmTitle,
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
				<div className="flex flex-row gap-4 items-center my-4">
					<div className="text-orange-500 scale-150">
						<InfoIcon></InfoIcon>
					</div>

					<Markdown className="font-semibold text-xl ">{title}</Markdown>
				</div>

				<p className="">{alertMessage}</p>

				<div className="self-end my-2 lg:m-0">
					<PrimaryButton label={confirmTitle} onClick={onClick} />
				</div>
			</div>
		</dialog>
	);
};

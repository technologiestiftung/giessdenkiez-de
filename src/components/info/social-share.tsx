import React from "react";
import {
	FacebookIcon,
	FacebookShareButton,
	TwitterShareButton,
	WhatsappIcon,
	WhatsappShareButton,
	XIcon,
	EmailShareButton,
} from "react-share";
import { useI18nStore } from "../../i18n/i18n-store";
import Markdown from "react-markdown";

export const SocialShare: React.FC = () => {
	const i18n = useI18nStore().i18n();
	return (
		<div className="flex w-full flex-col items-center justify-center text-center">
			<div className="text-gdk-gray flex w-[60%] flex-col gap-4">
				<div>{i18n.info.share.title}</div>
				<div className="flex flex-row justify-center gap-2">
					<FacebookShareButton
						aria-label="facebook-sharing-button"
						url="https://www.giessdenkiez.de/"
					>
						<FacebookIcon size={36} round />
					</FacebookShareButton>
					<TwitterShareButton
						aria-label="x-sharing-button"
						title={i18n.info.share.content}
						url="https://www.giessdenkiez.de/"
					>
						<XIcon size={36} round />
					</TwitterShareButton>
					<WhatsappShareButton
						aria-label="whatsapp-sharing-button"
						title={i18n.info.share.content}
						url="https://www.giessdenkiez.de/"
					>
						<WhatsappIcon size={36} round />
					</WhatsappShareButton>
					<EmailShareButton
						aria-label="mail-sharing-button"
						url="https://www.giessdenkiez.de/"
						body={i18n.info.share.content}
					>
						<img
							src={"images/mail_icon.svg"}
							width={36}
							height={36}
							alt="Mail Icon"
						/>
					</EmailShareButton>
				</div>
				<Markdown className={"[&>p>a]:underline"}>
					{i18n.info.share.openSource}
				</Markdown>
			</div>
		</div>
	);
};

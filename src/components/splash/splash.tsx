import React from "react";
import { PrimaryButton } from "../buttons/primary";
import { Credits } from "../info/credits";
import { CloseIcon } from "../icons/close-icon";
import { MapIcon } from "../icons/map-icon";
import { WateringIcon } from "../icons/watering-icon";
import { TreeIcon } from "../icons/tree-icon";
import { HiThereIcon } from "../icons/hi-there-icon";
import { LanguageToggle } from "../router/languageToggle";
import { useI18nStore } from "../../i18n/i18n-store";
import Markdown from "react-markdown";

interface SplashProps {
	onClose: () => void;
}
export const Splash: React.FC<SplashProps> = ({ onClose }) => {
	const i18n = useI18nStore().i18n();
	return (
		<div className="w-full top-0 left-0 lg:w-[1200px] lg:max-w-[80%] lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 bg-white flex flex-col gap-4 absolute rounded-lg shadow-gdk-hard pointer-events-auto">
			<div className="p-8 flex flex-col lg:gap-4 gap-2">
				<div className="flex flex-row justify-end lg:hidden">
					<CloseIcon />
				</div>
				<div className="flex flex-row w-full justify-between items-center mb-4">
					<div className="text-2xl font-bold">
						<span>Gieß den</span>{" "}
						<span className="text-gdk-neon-green">Kiez</span>
					</div>
					<button
						className="hidden lg:flex hover:text-gdk-light-gray"
						onClick={onClose}
					>
						<CloseIcon />
					</button>
					<div className="flex lg:hidden">
						<LanguageToggle />
					</div>
				</div>
				<div className="flex flex-row w-full justify-between items-center">
					<div className="flex flex-col gap-2 pr-6 w-full lg:max-w-[70%]">
						<Markdown className="text-4xl font-semibold">
							{i18n.splash.headline}
						</Markdown>
						<div className="text-base">{i18n.splash.subheadline}</div>
					</div>
					<div className="hidden lg:flex pr-8 max-h-[180px] lg:scale-[1.3]">
						<img src="/images/icon-water-large.svg" alt="" />
					</div>
				</div>
				<div>
					<PrimaryButton label={"Los geht's"} onClick={onClose}></PrimaryButton>
				</div>
				<div className="flex flex-row gap-6 justify-between pt-8 flex-wrap lg:flex-nowrap">
					<div className="flex flex-col gap-2">
						<div className="font-bold text-lg flex flex-row items-end gap-2">
							<div className="text-gdk-neon-green">
								<MapIcon className="w-10 h-10" />
							</div>
							<div>{i18n.splash.discoverTitle}</div>
						</div>
						<div className="text-base">{i18n.splash.discoverContent}</div>
					</div>
					<div className="flex flex-col gap-2">
						<div className="font-bold text-lg flex flex-row items-end gap-2">
							<div className="text-gdk-neon-green">
								<WateringIcon className="w-10 h-10" />
							</div>
							<div>{i18n.splash.waterTitle}</div>
						</div>
						<div className="text-base">{i18n.splash.waterContent}</div>
					</div>
					<div className="flex flex-col gap-2">
						<div className="font-bold text-lg flex flex-row items-end gap-2">
							<div className="text-gdk-neon-green">
								<TreeIcon className="w-10 h-10" />
							</div>
							<div>{i18n.splash.adoptTitle}</div>
						</div>
						<div className="text-base">{i18n.splash.adoptContent}</div>
					</div>
					<div className="flex flex-col gap-2">
						<div className="font-bold text-lg flex flex-row items-end gap-2">
							<div className="text-gdk-neon-green">
								<HiThereIcon className="w-10 h-10" />
							</div>
							<div>{i18n.splash.networkTitle}</div>
						</div>
						<div className="text-base">{i18n.splash.networkContent}</div>
					</div>
				</div>
			</div>

			<div className="flex flex-col lg:grid lg:grid-cols-1 lg:grid-rows-1 w-full bg-[#F3FDF9] border-y-2">
				<div className="lg:col-start-1 lg:row-start-1 flex flex-row justify-end w-full items-end">
					<img
						className="pt-8 w-full lg:w-[60%]"
						src="images/city-skyline.svg"
						alt=""
					/>
				</div>
				<div className="lg:col-start-1 lg:row-start-1 flex flex-col gap-2 px-8 lg:w-[50%] w-full py-8">
					<div className="text-xl font-bold">
						{i18n.splash.questionHeadline}
					</div>
					<div>{i18n.splash.questionSubheadline}</div>
					<div>
						<a
							className="text-gdk-blue font-semibold"
							href="https://deinestadt.giessdenkiez.de/"
							target="_blank"
							rel="noreferrer"
						>
							{i18n.splash.discoverMoreTitle}
						</a>
					</div>
				</div>
			</div>

			<div className="w-full flex flex-row justify-center">
				<div className="w-full md:w-[80%] lg:w-[60%]">
					<Credits />
				</div>
			</div>
		</div>
	);
};

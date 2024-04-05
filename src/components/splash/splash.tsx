/* eslint-disable max-lines */
import React, { useEffect, useRef } from "react";
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
import { SplashTreeIcon } from "../icons/splash-tree-icon";
import { ExternalAnchorLink } from "../anchor-link/external-anchor-link";

interface SplashProps {
	onClose: () => void;
}

interface SectionHeadingProps {
	title: string;
	content: string;
	icon: React.ReactNode;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({
	icon,
	title,
	content,
}) => {
	return (
		<div className="flex flex-col gap-2 mt-4">
			<div className="font-bold text-base flex flex-row items-center gap-3">
				<div className="text-gdk-neon-green">{icon}</div>
				<div>{title}</div>
			</div>
			<div className="text-sm">{content}</div>
		</div>
	);
};

export const Splash: React.FC<SplashProps> = ({ onClose }) => {
	const i18n = useI18nStore().i18n();

	const splashContainer = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		document.addEventListener("mousedown", handleClickListener);

		return () => {
			document.removeEventListener("mousedown", handleClickListener);
		};
	}, []);

	const handleClickListener = (event: MouseEvent) => {
		const clickedInside =
			splashContainer &&
			splashContainer.current?.contains(event.target as Node);

		if (clickedInside) {
			return;
		}
		onClose();
	};

	return (
		<div
			ref={splashContainer}
			className={`
		absolute top-0 left-0 lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2
		w-full lg:w-[80%] xl:w-[1028px] max-h-svh overflow-y-auto
		bg-white flex flex-col 
		rounded-lg shadow-gdk-hard pointer-events-auto`}
		>
			<div className="px-5 lg:px-8 py-5 lg:py-8 flex flex-col">
				<button
					className="flex flex-row justify-end lg:hidden pb-2"
					onClick={onClose}
				>
					<CloseIcon />
				</button>
				<div className="flex flex-row w-full justify-between items-center mb-4 lg:mb-5">
					<div className="text-2xl font-bold flex-row flex gap-1">
						<span>Gieß den</span>{" "}
						<span className="text-gdk-neon-green"> Kiez</span>
						<div className="-translate-y-4">
							<SplashTreeIcon />
						</div>
					</div>

					<div>
						<button
							className="hidden lg:flex hover:text-gdk-light-gray self-start"
							onClick={onClose}
						>
							<CloseIcon />
						</button>
						<div className="flex  -translate-y-1">
							<LanguageToggle />
						</div>
					</div>
				</div>
				<div className="flex flex-row w-full justify-between items-top pb-8">
					<div className="flex flex-col gap-2 pr-6 w-full lg:max-w-[70%]">
						<Markdown className="sm:text-xl xl:text-2xl 2xl:text-3xl font-semibold">
							{i18n.splash.headline}
						</Markdown>
						<div className="text-sm xl:text-base">
							{i18n.splash.subheadline}
						</div>
						<div>
							<PrimaryButton label={i18n.splash.letsGo} onClick={onClose} />
						</div>
					</div>
					<div className="hidden lg:flex pr-8 max-h-[150px] 2xl:scale-[1.2]">
						<img src="/images/icon-water-large.svg" alt="" />
					</div>
				</div>

				<div className="flex flex-row gap-4 justify-between flex-wrap lg:flex-nowrap">
					<SectionHeading
						title={i18n.splash.discoverTitle}
						content={i18n.splash.discoverContent}
						icon={<MapIcon className="w-6 h-6 2xl:w-8 2xl:h-8" />}
					/>

					<SectionHeading
						title={i18n.splash.waterTitle}
						content={i18n.splash.waterContent}
						icon={<WateringIcon className="w-6 h-6 2xl:w-8 2xl:h-8" />}
					/>

					<SectionHeading
						title={i18n.splash.adoptTitle}
						content={i18n.splash.adoptContent}
						icon={<TreeIcon className="w-6 h-6 2xl:w-8 2xl:h-8" />}
					/>

					<SectionHeading
						title={i18n.splash.networkTitle}
						content={i18n.splash.networkContent}
						icon={<HiThereIcon className="w-6 h-6 2xl:w-8 2xl:h-8" />}
					/>
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
				<div className="lg:col-start-1 lg:row-start-1 flex flex-col gap-2 px-8 lg:w-[65%] w-full py-4">
					<div className="text-lg font-bold">
						{i18n.splash.questionHeadline}
					</div>
					<div className="text-sm">{i18n.splash.questionSubheadline}</div>
					<div className="text-sm">
						<ExternalAnchorLink
							href="https://deinestadt.giessdenkiez.de/"
							label={i18n.splash.discoverMoreTitle}
						></ExternalAnchorLink>
					</div>
				</div>
			</div>

			<div className="w-full flex flex-row justify-center">
				<div className="w-full md:w-[80%] lg:w-[60%] xl:w-[50%]">
					<Credits />
				</div>
			</div>
		</div>
	);
};

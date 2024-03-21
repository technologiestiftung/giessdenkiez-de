import React from "react";
import { PrimaryButton } from "../buttons/primary";
import { Credits } from "../info/credits";
import { CloseIcon } from "../icons/close-icon";
import { MapIcon } from "../icons/map-icon";
import { WateringIcon } from "../icons/watering-icon";
import { TreeIcon } from "../icons/tree-icon";
import { HiThereIcon } from "../icons/hi-there-icon";

export const Splash: React.FC = () => {
	return (
		<div className="w-[1200px] h-fit bg-white flex flex-col gap-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-gdk-hard pointer-events-auto">
			<div className="p-8  flex flex-col gap-4">
				<div className="flex flex-row w-full justify-between items-center mb-4">
					<div className="text-2xl font-bold">
						<span>Gieß den</span>{" "}
						<span className="text-gdk-neon-green">Kiez</span>
					</div>
					<button className="hover:text-gdk-light-gray">
						<CloseIcon />
					</button>
				</div>
				<div className="flex flex-row w-full justify-between items-center">
					<div className="flex flex-col gap-2 pr-6 max-w-[80%]">
						<div className="text-3xl font-semibold">
							Die Berliner Stadtbäume leiden unter <br /> Trockenheit und Du
							kannst ihnen helfen!
						</div>
						<div className="text-base">
							Erkundige Dich über den Wasserbedarf der Bäume in Deiner
							Nachbarschaft, adoptiere den Baum vor Deiner Haustür und werde
							Teil der aktiven Gieß-Community in Berlin!
						</div>
					</div>
					<div className="px-8">
						<img src="/images/icon-water-large.svg" alt="" />
					</div>
				</div>
				<div>
					<PrimaryButton label={"Los geht's"}></PrimaryButton>
				</div>
				<div className="flex flex-row gap-6 justify-between pt-8">
					<div className="flex flex-col gap-2">
						<div className="font-bold text-lg flex flex-row items-end gap-2">
							<div className="text-gdk-neon-green">
								<MapIcon className="w-10 h-10" />
							</div>
							<div>Entdecken</div>
						</div>
						<div className="text-base">
							Die Karte visualisiert über 800.000 Stadtbäume und zeigt
							Informationen zu Art, Alter und Wasserbedarf an. Nutze die Filter-
							und Suchfunktionen, um schnell einen Überblick zu erhalten.
						</div>
					</div>
					<div className="flex flex-col gap-2">
						<div className="font-bold text-lg flex flex-row items-end gap-2">
							<div className="text-gdk-neon-green">
								<WateringIcon className="w-10 h-10" />
							</div>
							<div>Gießen</div>
						</div>
						<div className="text-base">
							Schnapp Dir eine Gießkanne und werde Teil der Gieß-Community!
							Bereits über tausend Aktive haben sich für die Bäume Berlins
							zusammengeschlossen und tragen ihre Gießungen regelmäßig ein.
						</div>
					</div>
					<div className="flex flex-col gap-2">
						<div className="font-bold text-lg flex flex-row items-end gap-2">
							<div className="text-gdk-neon-green">
								<TreeIcon className="w-10 h-10" />
							</div>
							<div>Adoptieren</div>
						</div>
						<div className="text-base">
							Durch das Adoptieren eines Baumes - oder auch mehrerer - lässt Du
							deine Nachbarschaft wissen, dass für diese Bäume gesorgt wird. So
							gelingt ein koordiniertes Engagement.
						</div>
					</div>
					<div className="flex flex-col gap-2">
						<div className="font-bold text-lg flex flex-row items-end gap-2">
							<div className="text-gdk-neon-green">
								<HiThereIcon className="w-10 h-10" />
							</div>
							<div>Vernetzen</div>
						</div>
						<div className="text-base">
							Tritt unserem Slack-Chat bei, um Dich mit der Gieß-Community zu
							vernetzen, Fragen auszutauschen und die Bewässerung in Deinem Kiez
							abzustimmen.
						</div>
					</div>
				</div>
			</div>

			<div className="grid grid-cols-1 grid-rows-1 w-full bg-[#F3FDF9] border-y-2">
				<div className="col-start-1 row-start-1 flex flex-row justify-end w-full items-end">
					<img className="w-[60%]" src="images/city-skyline.svg" alt="" />
				</div>
				<div className="col-start-1 row-start-1 flex flex-col gap-2 px-8 w-[50%] py-8">
					<div className="text-xl font-bold">
						Gieß den Kiez auch in deiner Stadt?
					</div>
					<div>
						Städte wie Leipzig, Magdeburg und Co. haben sich bereits erfolgreich
						der Gieß–Welle angeschlossen! Ist Deine Stadt die nächste?{" "}
					</div>
					<div>
						<a className="text-gdk-blue font-semibold" href="">
							Erfahre mehr!
						</a>
					</div>
				</div>
			</div>

			<div className="w-full flex flex-row justify-center">
				<div className="w-[60%]">
					<Credits></Credits>
				</div>
			</div>
		</div>
	);
};

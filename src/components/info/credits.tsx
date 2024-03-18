import React from "react";
import { useI18nStore } from "../../i18n/i18n-store";

const logoCitylab = "https://logos.citylab-berlin.org/logo-citylab-color.svg";
const logoTSB = "https://logos.citylab-berlin.org/logo-tsb-outline.svg";
const logoBerlin =
	"https://logos.citylab-berlin.org/logo-senatskanzlei-buergermeister-horizontal.svg";

const Credits: React.FC = () => {
	const i18n = useI18nStore().i18n();
	return (
		<div className="w-full flex flex-row gap-4 md:gap-10 px-4 py-8 text-xs sm:text-sm md:text-base">
			<div className="w-[30%] flex flex-col gap-4 justify-center">
				<div className="w-full"></div>
				<a
					target="_blank"
					rel="noopener noreferrer"
					href="https://citylab-berlin.org/de/start/"
				>
					<img src={logoCitylab} alt="Logo Citylab" />
				</a>
			</div>
			<div className="w-[30%] flex flex-col gap-4">
				<div>{i18n.info.credits.projectBy}</div>
				<div>
					<a
						target="_blank"
						rel="noopener noreferrer"
						href="https://technologiestiftung-berlin.de/"
					>
						<img src={logoTSB} alt="Logo Technologiestiftung Berlin" />
					</a>
				</div>
			</div>
			<div className="w-[30%] flex flex-col gap-4">
				<div>{i18n.info.credits.fundedBy}</div>
				<a
					target="_blank"
					rel="noopener noreferrer"
					href="https://www.berlin.de/senatskanzlei/"
				>
					<img src={logoBerlin} alt="Logo Berlin" />
				</a>
			</div>
		</div>
	);
};

export default Credits;

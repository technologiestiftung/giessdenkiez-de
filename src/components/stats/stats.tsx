import React from "react";
import { LanguageToggle } from "../router/languageToggle";
import { SimpleStatsCard } from "./simple-stats-card";

export const Stats: React.FC = () => {
	return (
		<div className="pointer-events-auto w-full overflow-auto">
			<div className="flex flex-col items-center justify-center ">
				<div className="flex w-[100%] flex-col md:gap-4 px-1 py-8 md:py-16 md:w-[70%] md:px-4 lg:w-[60%] xl:w-[50%] relative">
					<div className="lg:hidden absolute top-6 md:top-14 mt-1 right-0 pr-5">
						<LanguageToggle />
					</div>
					<div className="flex flex-row">
						<h1 className="px-4 md:px-0 text-4xl font-semibold pb-2 md:pb-4">
							Statistiken
						</h1>
					</div>
					<div className="flex flex-col rounded-2xl px-4 pb-4 md:border-2 md:p-8 gap-8">
						<div className="text-2xl font-semibold">
							Gieß den Kiez in Zahlen
						</div>
						<div className="grid grid-cols-3 gap-4">
							<SimpleStatsCard title="Straßenbäume" stat="885852" />
							<SimpleStatsCard title="Öffentliche Pumpen" stat="2125" />
							<SimpleStatsCard title="Aktive Gießer:innen" stat="3774" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

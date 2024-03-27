import React from "react";
import { SplashTreeIcon } from "../icons/splash-tree-icon";

export const Loading: React.FC = () => {
	return (
		<div className="h-full w-full flex flex-col justify-center bg-red-400 items-center gap-3 z-100 absolute">
			<div className="animate-bounce">
				<SplashTreeIcon />
			</div>
			<p className="w-[245px] text-center	">
				Wir laden gerade 839.049 Bäume aus dem Berliner Baumbestand.
			</p>
		</div>
	);
};

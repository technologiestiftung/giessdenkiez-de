import React from "react";
import { SplashTreeIcon } from "../icons/splash-tree-icon";

export interface LoadingProps {
	loadingText: string;
}

export const Loading: React.FC<LoadingProps> = ({ loadingText }) => {
	return (
		<div className="h-full w-full flex flex-col justify-center bg-gdk-white items-center gap-3">
			<div className="animate-bounce">
				<SplashTreeIcon />
			</div>
			<p className="w-[245px] text-center	">{loadingText}</p>
		</div>
	);
};

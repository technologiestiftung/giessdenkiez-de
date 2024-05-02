import React from "react";
import { LegendButton } from "../buttons/legend-button";
import { useSplashStore } from "../splash/splash-store";
import { useTreeStore } from "../tree-detail/stores/tree-store";
import { useFilterStore } from "../filter/filter-store";
import { useMapStore } from "../map/map-store";

export const Legend: React.FC = () => {
	const { isSplashScreenVisible } = useSplashStore();
	const { selectedTreeId } = useTreeStore();
	const { isFilterViewVisible } = useFilterStore();
	const { isMapLoaded } = useMapStore();

	const isLegendVisibleDesktop =
		!isSplashScreenVisible() && !selectedTreeId && isMapLoaded;
	const isLegendVisibleMobile = isLegendVisibleDesktop && !isFilterViewVisible;

	return (
		<div
			className={`
			absolute left-[10px] bottom-[175px] md:bottom-[306px] lg:bottom-[242px] lg:left-[90px]
		 	${isLegendVisibleMobile ? "block" : "hidden"}
		 	${isLegendVisibleDesktop ? "sm:block" : "sm:hidden"}
			`}
		>
			<LegendButton />
		</div>
	);
};

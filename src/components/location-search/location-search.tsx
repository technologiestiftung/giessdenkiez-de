/* eslint-disable max-lines */
import React, { useEffect, useState } from "react";
import { useI18nStore } from "../../i18n/i18n-store";
import { ClearIcon } from "../icons/clear-icon";
import { SearchIcon } from "../icons/search-icon";
import { useMapConstants } from "../map/hooks/use-map-constants";
import { useMapStore } from "../map/map-store";
import { GeocodingResult, useGeocoding } from "./hooks/use-geocoding";
import { useFilterStore } from "../filter/filter-store";
import { FilterIcon } from "../icons/filter-icon";
import { useSearchStore } from "./search-store";

interface LocationSearchProps {
	onToggleShowFilter: (showFilter?: boolean) => void;
}

export const LocationSearch: React.FC<LocationSearchProps> = ({
	onToggleShowFilter,
}) => {
	const i18n = useI18nStore().i18n();
	const {
		isCurrentSearch,
		setIsCurrentSearch,
		isPickedGeoSearchResult,
		setisPickedGeoSearchResult,
		isTextInSearchbar,
		setIsTextInSearchbar,
		clearSearch,
	} = useSearchStore();
	const [selectedGeocodingResultIndex, setSelectedGeocodingResultIndex] =
		useState(0);
	const [selectedGeocodingResult, setSelectedGeocodingResult] =
		useState<GeocodingResult>();

	const { map } = useMapStore();
	const { MAP_LOCATION_ZOOM_LEVEL } = useMapConstants();
	const { geocodingResults, clearGeocodingResults, fetchGeocodingResults } =
		useGeocoding(isCurrentSearch);
	const { isFilterViewVisible, isSomeFilterActive } = useFilterStore();

	useEffect(() => {
		if (isFilterViewVisible) {
			clearSearch();
			setSelectedGeocodingResult(undefined);
			clearGeocodingResults();
		}
	}, [isFilterViewVisible]);

	map?.on("dragstart", function () {
		clearSearch();
		setSelectedGeocodingResult(undefined);
		clearGeocodingResults();
	});

	map?.on("click", function () {
		clearSearch();
		setSelectedGeocodingResult(undefined);
		clearGeocodingResults();
	});

	const onGeocodingResultClick = (geocodingResult: GeocodingResult) => {
		map &&
			map.easeTo({
				center: [
					geocodingResult.geometry.coordinates[0],
					geocodingResult.geometry.coordinates[1],
				],
				essential: true,
				zoom: MAP_LOCATION_ZOOM_LEVEL,
			});
		setSelectedGeocodingResult(geocodingResult);
		setisPickedGeoSearchResult(geocodingResult.place_name_de);
		setSelectedGeocodingResultIndex(0);
		clearGeocodingResults();
	};

	useEffect(() => {
		const handleKeyPress = (event: KeyboardEvent) => {
			if (event.key === "ArrowDown") {
				setSelectedGeocodingResultIndex(
					Math.min(
						Math.max(0, geocodingResults.length - 1),
						selectedGeocodingResultIndex + 1,
					),
				);
			} else if (event.key === "ArrowUp") {
				setSelectedGeocodingResultIndex(
					Math.max(0, selectedGeocodingResultIndex - 1),
				);
			} else if (event.key === "Enter") {
				onGeocodingResultClick(geocodingResults[selectedGeocodingResultIndex]);
			}
		};

		window.addEventListener("keydown", handleKeyPress);

		return () => {
			window.removeEventListener("keydown", handleKeyPress);
		};
	}, [geocodingResults, selectedGeocodingResultIndex]);

	return (
		<div className="flex flex-row w-full gap-2 justify-between pointer-events-auto">
			<div
				className={`flex flex-grow max-w-[90%] h-fit flex-col px-2 drop-shadow-md sm:px-0`}
			>
				<form
					onSubmit={(e) => {
						e.preventDefault();
					}}
					className={`z-[2] flex flex-row items-center justify-center rounded-full bg-white`}
				>
					<button className="pl-4">
						<SearchIcon />
					</button>
					<input
						className={`w-full py-4 pl-2 focus:outline-none`}
						type="text"
						value={
							selectedGeocodingResult?.place_name_de || isPickedGeoSearchResult
						}
						onKeyDown={(e) => {
							if (e.key === "ArrowDown" || e.key === "ArrowUp") {
								e.preventDefault();
							}
						}}
						onChange={(e) => {
							setIsCurrentSearch(e.target.value);
							setisPickedGeoSearchResult(e.target.value);
							setSelectedGeocodingResult(undefined);
							fetchGeocodingResults();
							setIsTextInSearchbar(true);
						}}
						onFocus={() => {
							onToggleShowFilter(false);
						}}
						placeholder={i18n.locationSearch.placeholder}
					/>
					<button
						className={`${isTextInSearchbar ? "opacity-100" : "opacity-0"} px-4 hover:text-gdk-light-gray`}
						onClick={() => {
							clearSearch();
							setSelectedGeocodingResult(undefined);
						}}
					>
						<ClearIcon />
					</button>
				</form>

				{geocodingResults.length > 0 && (
					<div className="z-[1] -mt-8 flex flex-col overflow-hidden rounded-b-3xl bg-white pt-8">
						{geocodingResults.map((geocodingResult, idx) => (
							<button
								key={`geocoding-result-${idx}`}
								className={`truncate px-4 py-4 text-left hover:cursor-pointer hover:bg-gdk-lighter-blue ${
									selectedGeocodingResultIndex === idx && "bg-gdk-lighter-blue"
								}`}
								onClick={() => onGeocodingResultClick(geocodingResult)}
							>
								{geocodingResult.place_name_de}
							</button>
						))}
					</div>
				)}
			</div>
			<div className="min-w-[10%] flex flex-col mr-1 lg:mr-0">
				<FilterIcon
					onToggleShowFilter={onToggleShowFilter}
					filtersActive={isSomeFilterActive()}
				/>
			</div>
		</div>
	);
};

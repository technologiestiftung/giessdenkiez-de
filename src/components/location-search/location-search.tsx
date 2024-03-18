import React, { useEffect, useState } from "react";
import { useI18nStore } from "../../i18n/i18n-store";
import ClearIcon from "../icons/clear-icon";
import SearchIcon from "../icons/search-icon";
import { useMapConstants } from "../map/hooks/use-map-constants";
import { useMapStore } from "../map/map-store";
import { GeocodingResult, useGeocoding } from "./hooks/use-geocoding";

interface LocationSearchProps {
	onShowFilter: () => void;
}

const LocationSearch: React.FC<LocationSearchProps> = ({ onShowFilter }) => {
	const i18n = useI18nStore().i18n();

	const [search, setSearch] = useState("");
	const [selectedGeocodingResultIndex, setSelectedGeocodingResultIndex] =
		useState(0);

	const [selectedGeocodingResult, setSelectedGeocodingResult] =
		useState<GeocodingResult>();

	const { map } = useMapStore();
	const { MAP_LOCATION_ZOOM_LEVEL } = useMapConstants();
	const { geocodingResults, clearGeocodingResults } = useGeocoding(search);

	const clearSearch = () => {
		setSearch("");
		setSelectedGeocodingResult(undefined);
	};

	map?.on("dragstart", function () {
		clearSearch();
	});

	map?.on("zoomstart", function () {
		clearSearch();
	});

	map?.on("click", function () {
		clearSearch();
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
		<div className="flex flex-row w-full justify-start pointer-events-auto">
			<div
				className={`w-[85%] max-w-[85%] flex h-fit flex-col px-2 drop-shadow-md sm:px-0`}
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
						value={selectedGeocodingResult?.place_name_de || search}
						onKeyDown={(e) => {
							if (e.key === "ArrowDown" || e.key === "ArrowUp") {
								e.preventDefault();
							}
						}}
						onChange={(e) => {
							setSelectedGeocodingResult(undefined);
							setSearch(e.target.value);
						}}
						placeholder={i18n.locationSearch.placeholder}
					/>
					<button className="px-4" onClick={clearSearch}>
						<ClearIcon />
					</button>
				</form>

				{geocodingResults.length > 0 && (
					<div className="z-[1] -mt-8 flex flex-col overflow-hidden rounded-b-lg bg-white pt-8">
						{geocodingResults.map((geocodingResult, idx) => (
							<button
								key={`geocoding-result-${idx}`}
								className={`truncate px-4 py-4 text-left hover:cursor-pointer hover:bg-gdk-lighter-blue ${selectedGeocodingResultIndex === idx && "bg-gdk-lighter-blue"}`}
								onClick={() => onGeocodingResultClick(geocodingResult)}
							>
								{geocodingResult.place_name_de}
							</button>
						))}
					</div>
				)}
			</div>
			<div className="w-[15%] max-w-[15%] flex flex-row justify-center lg:justify-end items-center mt-1 mr-1 lg:mr-0">
				<button
					className="p-3 rounded-full bg-white drop-shadow-md"
					onClick={onShowFilter}
				>
					<img src="/images/filter-icon-default.svg" alt="" />
				</button>
			</div>
		</div>
	);
};

export default LocationSearch;

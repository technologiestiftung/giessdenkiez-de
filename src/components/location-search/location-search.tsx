import React, { useState } from "react";
import { useI18nStore } from "../../i18n/i18n-store";
import ClearIcon from "../icons/clear-icon";
import SearchIcon from "../icons/search-icon";
import { useMapStore } from "../map/map-store";
import { GeocodingResult, useGeocoding } from "./hooks/use-geocoding";
import { useMapConstants } from "../map/hooks/use-map-constants";

const LocationSearch: React.FC = () => {
  const i18n = useI18nStore().i18n();

  const [search, setSearch] = useState("");
  const [selectedGeocodingResult, setSelectedGeocodingResult] =
    useState<GeocodingResult>();

  const { map } = useMapStore();
  const { MAX_ZOOM_LEVEL } = useMapConstants();
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
        zoom: MAX_ZOOM_LEVEL,
      });
    setSelectedGeocodingResult(geocodingResult);
    clearGeocodingResults();
  };

  return (
    <div className="mt-2 flex w-full justify-center">
      <div
        className={`pointer-events-auto z-[2] flex h-fit w-[100%] flex-col px-2 drop-shadow-xl sm:w-[50%] sm:px-0 md:w-[40%] lg:w-[35%] xl:w-[25%] `}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className={` z-[2] flex flex-row items-center justify-center rounded-full bg-white`}
        >
          <button className="pl-4">
            <SearchIcon></SearchIcon>
          </button>
          <input
            className={`w-full py-4 pl-2 focus:outline-none`}
            type="text"
            value={selectedGeocodingResult?.place_name_de || search}
            onChange={(e) => {
              setSelectedGeocodingResult(undefined);
              setSearch(e.target.value);
            }}
            placeholder={i18n.locationSearch.placeholder}
          />
          <button className="px-4" onClick={clearSearch}>
            <ClearIcon></ClearIcon>
          </button>
        </form>

        {geocodingResults.length > 0 && (
          <div className="z-[1] -mt-8 flex flex-col overflow-hidden rounded-b-lg bg-white pt-8">
            {geocodingResults.map((geocodingResult, idx) => (
              <button
                key={`geocoding-result-${idx}`}
                className=" truncate px-4 py-4 text-left hover:cursor-pointer hover:bg-sky-100"
                onClick={() => onGeocodingResultClick(geocodingResult)}
              >
                {geocodingResult.place_name_de}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationSearch;

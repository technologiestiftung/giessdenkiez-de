import React, { useMemo, useState } from "react";
import ClearIcon from "../icons/clear-icon";
import SearchIcon from "../icons/search-icon";
import { useMapStore } from "../map/map-store";
import { GeocodingResult, useGeocoding } from "./hooks/use-geocoding";
import { useI18nStore } from "../../i18n/i18n-store";

const LocationSearch: React.FC = () => {
  const i18n = useI18nStore().i18n();

  const [search, setSearch] = useState("");
  const [selectedGeocodingResult, setSelectedGeocodingResult] =
    useState<GeocodingResult>();

  const { map } = useMapStore();
  const { geocodingResults, clearGeocodingResults } = useGeocoding(search);

  const hasResults = useMemo(() => {
    return geocodingResults.length;
  }, [geocodingResults]);

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
      });
    setSelectedGeocodingResult(geocodingResult);
    clearGeocodingResults();
  };

  return (
    <div className="mt-2 flex w-full justify-center">
      <div
        className={`pointer-events-auto flex h-fit w-[100%] flex-col px-2 drop-shadow-xl sm:w-[50%] sm:px-0 md:w-[40%] lg:w-[35%] xl:w-[25%]`}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className={`flex flex-row items-center justify-center bg-white ${hasResults ? "rounded-t-full" : "rounded-full"}`}
        >
          <button className="px-4">
            <SearchIcon></SearchIcon>
          </button>
          <input
            className={`grow p-4 focus:outline-none ${hasResults ? "rounded-t-full" : "rounded-full"}`}
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
          <div className="rounded-b-pill flex flex-col overflow-hidden bg-white pt-2">
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
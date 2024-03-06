import React, { useState } from "react";
import { GeocodingResult, useGeocoding } from "./hooks/use-geocoding";
import ClearIcon from "../icons/clear-icon";
import SearchIcon from "../icons/search-icon";

export interface LocationSearchProps {
  onGeocodedResultChoice: (result: GeocodingResult) => void;
}

const LocationSearch: React.FC<LocationSearchProps> = ({
  onGeocodedResultChoice,
}) => {
  const [search, setSearch] = useState("");
  const geocodingResults = useGeocoding(search);
  const hasResults = geocodingResults.length;

  return (
    <div className="flex w-full justify-center">
      <div
        className={`pointer-events-auto flex h-fit w-[100%] flex-col px-2 drop-shadow-xl sm:w-[70%] sm:px-0 md:w-[50%] lg:w-[40%]`}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className={`flex flex-row items-center justify-center bg-white ${hasResults ? "rounded-t-pill" : "rounded-pill"}`}
        >
          <button className="px-4">
            <SearchIcon></SearchIcon>
          </button>
          <input
            className={`grow p-4 focus:outline-none ${hasResults ? "rounded-t-pill" : "rounded-pill"}`}
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Suche nach einem Ort"
          />
          <button className="px-4" onClick={() => setSearch("")}>
            <ClearIcon></ClearIcon>
          </button>
        </form>

        {geocodingResults.length > 0 && (
          <div className="rounded-b-pill flex flex-col overflow-hidden bg-white pt-2">
            {geocodingResults.map((geocodingResult) => (
              <button
                className=" truncate px-4 py-4 text-left hover:cursor-pointer hover:bg-sky-100"
                onClick={() => onGeocodedResultChoice(geocodingResult)}
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

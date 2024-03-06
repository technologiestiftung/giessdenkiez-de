import { useEffect, useState } from "react";

export interface GeocodingResult {
  id: string;
  place_name_de: string;
  geometry: {
    coordinates: [number, number];
  };
}

export interface GeocodingResultState {
  geocodingResults: GeocodingResult[];
  clearGeocodingResults: () => void;
}

export function useGeocoding(search: string): GeocodingResultState {
  const [geocodingResults, setGeocodingResults] = useState<GeocodingResult[]>(
    [],
  );

  const clearGeocodingResults = () => {
    setGeocodingResults([]);
  };

  useEffect(() => {
    const abortController = new AbortController();

    const fetchData = async () => {
      try {
        const geocodingUrl = `${import.meta.env.VITE_MAPBOX_API_ENDPOINT}/geocoding/v5/mapbox.places/${search}.json?autocomplete=true&language=de&country=de&bbox=${import.meta.env.VITE_MAP_BOUNDING_BOX}&access_token=${import.meta.env.VITE_MAPBOX_API_KEY}`;
        const res = await fetch(geocodingUrl, {
          signal: abortController.signal,
        });
        if (!res.ok) return [];
        const json = (await res.json()) as { features: GeocodingResult[] };
        setGeocodingResults(json.features);
      } catch (_) {
        setGeocodingResults([]);
      }
    };

    if (search.trim() !== "" && search.trim().length >= 3) {
      fetchData();
    } else {
      setGeocodingResults([]);
    }

    return () => {
      abortController.abort();
    };
  }, [search]);

  return { geocodingResults, clearGeocodingResults };
}

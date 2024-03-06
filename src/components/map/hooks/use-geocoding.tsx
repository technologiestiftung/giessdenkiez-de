import { useEffect, useState } from "react";

export interface GeocodingResult {
  id: string;
  place_name_de: string;
  geometry: {
    coordinates: [number, number];
  };
}

export function useGeocoding(search: string): GeocodingResult[] {
  const [geocodingResults, setGeocodingResults] = useState<GeocodingResult[]>(
    [],
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const geocodingUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${search}.json?autocomplete=true&language=de&country=de&bbox=${import.meta.env.VITE_MAP_BOUNDING_BOX}&access_token=${import.meta.env.VITE_MAPBOX_API_KEY}`;
        const res = await fetch(geocodingUrl);
        if (!res.ok) return [];
        const json = (await res.json()) as { features: GeocodingResult[] };
        setGeocodingResults(json.features);
      } catch (error) {
        setGeocodingResults([]);
      }
    };

    if (search.trim() !== "" && search.trim().length >= 3) {
      fetchData();
    } else {
      setGeocodingResults([]);
    }
  }, [search]);

  return geocodingResults;
}

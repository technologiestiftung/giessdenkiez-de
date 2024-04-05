import { useState } from "react";

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
	fetchGeocodingResults: (search: string) => void;
}

export function useGeocoding(): GeocodingResultState {
	const [geocodingResults, setGeocodingResults] = useState<GeocodingResult[]>(
		[],
	);

	const clearGeocodingResults = () => {
		setGeocodingResults([]);
	};

	const fetchGeocodingResults = async (search: string) => {
		if (search.trim().length < 2) {
			setGeocodingResults([]);
			return;
		}

		const fetchData = async () => {
			try {
				const geocodingUrl = `${
					import.meta.env.VITE_MAPBOX_API_ENDPOINT
				}/geocoding/v5/mapbox.places/${search}.json?autocomplete=true&language=de&country=de&bbox=${
					import.meta.env.VITE_MAP_BOUNDING_BOX
				}&access_token=${import.meta.env.VITE_MAPBOX_API_KEY}`;
				const res = await fetch(geocodingUrl);
				if (!res.ok) {
					return;
				}
				const json = (await res.json()) as { features: GeocodingResult[] };
				setGeocodingResults(json.features);
			} catch (_) {
				setGeocodingResults([]);
			}
		};

		fetchData().catch(console.error);
	};

	return { geocodingResults, clearGeocodingResults, fetchGeocodingResults };
}

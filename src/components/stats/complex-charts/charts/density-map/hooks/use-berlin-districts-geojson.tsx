import { useEffect, useState } from "react";
import { FeatureCollection } from "geojson";

export function useBerlinDistrictsGeojson() {
	const [geoJson, setGeoJson] = useState<FeatureCollection | null>(null);

	useEffect(() => {
		const abortController = new AbortController();

		const fetchData = async () => {
			const berlinBezirkeRaw = await fetch(import.meta.env.VITE_BEZIRKE_URL, {
				signal: abortController.signal,
			});
			const berlinBezirkeParsed = await berlinBezirkeRaw.json();
			setGeoJson(berlinBezirkeParsed);
		};

		fetchData().catch((error) => {
			if (error.name === "AbortError") {
				return;
			}

			console.error(error);
		});

		return () => abortController.abort();
	}, []);

	return geoJson;
}

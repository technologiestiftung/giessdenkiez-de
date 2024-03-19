import { useEffect, useRef, useState } from "react";

export default function useSelectedPump() {
	const [selectedPumpId, setSelectedPumpId] = useState<string | undefined>(
		undefined,
	);

	const selectedPumpIdRef = useRef<string | undefined>(undefined);
	useEffect(() => {
		selectedPumpIdRef.current = selectedPumpId;
	}, [selectedPumpId]);

	return { selectedPumpIdRef, setSelectedPumpId };
}

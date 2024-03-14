import { useEffect, useRef, useState } from "react";

export default function useSelectedTree() {
	const [selectedTreeId, setSelectedTreeId] = useState<string | undefined>(
		undefined,
	);

	const selectedTreeIdRef = useRef<string | undefined>(undefined);
	useEffect(() => {
		selectedTreeIdRef.current = selectedTreeId;
	}, [selectedTreeId]);

	return { selectedTreeIdRef, setSelectedTreeId };
}

import { useEffect, useRef, useState } from "react";

export default function useHoveredTree() {
	const [hoveredTreeId, setHoveredTreeId] = useState<string | undefined>(
		undefined,
	);

	const hoveredTreeIdRef = useRef<string | undefined>(undefined);
	useEffect(() => {
		hoveredTreeIdRef.current = hoveredTreeId;
	}, [hoveredTreeId]);

	return { hoveredTreeIdRef, setHoveredTreeId };
}

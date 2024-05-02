import { useEffect, useState } from "react";

export function useBarGraphHeight() {
	const [height, setHeight] = useState(0);
	const [translateYAxisIndicator, setTranslateYAxisIndicator] = useState("");
	useEffect(() => {
		const handleResize = () => {
			const newBarGraphHeight = getBarGraphHeight(window.innerHeight);
			setHeight(newBarGraphHeight);
			setTranslateYAxisIndicator(getTranslateYAxisIndicator(newBarGraphHeight));
		};

		// Create a new ResizeObserver
		const resizeObserver = new ResizeObserver(handleResize);

		// Observe when document.body resizes
		resizeObserver.observe(document.body);

		// Cleanup function to remove the observer when component unmounts
		return () => {
			resizeObserver.disconnect();
		};
	}, []);

	return { height, translateYAxisIndicator };
}

function getBarGraphHeight(innerHeight: number) {
	if (innerHeight < 600) {
		return 20;
	}

	if (innerHeight < 650) {
		return 40;
	}

	if (innerHeight < 700) {
		return 60;
	}

	return 90;
}

function getTranslateYAxisIndicator(height: number) {
	switch (height) {
		case 20:
			return "-translate-y-[1.125rem]";
		case 40:
			return "-translate-y-3";
		case 60:
			return "-translate-y-2";
		default:
			return "-translate-y-0.5";
	}
}

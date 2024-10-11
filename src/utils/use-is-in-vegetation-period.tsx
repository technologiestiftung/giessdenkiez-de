import { isWithinInterval } from "date-fns";

const currentDate = new Date();
const currentYear = currentDate.getFullYear();

export function useIsInVegetationPeriod(): boolean {
	const isInVegetationPeriod = isWithinInterval(currentDate, {
		start: new Date(currentYear, 2, 1), // Beginning of March
		end: new Date(currentYear, 10, 1), // End of October
	});

	return isInVegetationPeriod;
}

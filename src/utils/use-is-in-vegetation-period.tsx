import { isWithinInterval } from "date-fns";

const currentDate = new Date();
const currentYear = currentDate.getFullYear();

export const useIsInVegetationPeriod = isWithinInterval(currentDate, {
	start: new Date(currentYear, 2, 1), // Beginning of March
	end: new Date(currentYear, 9, 31), // End of October
});

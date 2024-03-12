// https://stackoverflow.com/questions/1579010/get-next-date-from-weekday-in-javascript
export function lastDayOfWeek(currentDate: Date, dayOfWeek: number) {
  const dateCopy = new Date(currentDate.getTime());
  dateCopy.setDate(
    dateCopy.getDate() + ((dayOfWeek + (7 - dateCopy.getDay())) % 7) - 7,
  );
  dateCopy.setUTCHours(0, 0, 0, 0);
  return dateCopy;
}

export function isDateInWeek(date: Date, referenceDate: Date): boolean {
  const lastSunday = lastDayOfWeek(referenceDate, 0);
  const mondayMidnight = new Date(lastSunday.getTime());
  mondayMidnight.setDate(lastSunday.getDate() + 1);
  const elapsedDaysSinceMondayNight =
    (date.getTime() - mondayMidnight.getTime()) / 1000 / 60 / 60 / 24;
  return elapsedDaysSinceMondayNight < 7 && elapsedDaysSinceMondayNight >= 0;
}

export function isDateInCurrentMonth(date: Date, referenceDate: Date): boolean {
  return (
    referenceDate.getUTCFullYear() === date.getUTCFullYear() &&
    referenceDate.getUTCMonth() === date.getUTCMonth()
  );
}

export function isDateInCurrentYear(date: Date, referenceDate: Date): boolean {
  return referenceDate.getUTCFullYear() === date.getUTCFullYear();
}

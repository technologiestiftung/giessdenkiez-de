export function lastDayOfWeek(currentDate: Date, dayOfWeek: number) {
  currentDate.setDate(
    currentDate.getDate() + ((dayOfWeek + (7 - currentDate.getDay())) % 7) - 7,
  );
  currentDate.setHours(0, 0, 0, 0);
  return currentDate;
}

export function isDateInCurrentWeek(date: Date): boolean {
  const lastSunday = lastDayOfWeek(new Date(), 0);
  const mondayMidnight = lastSunday;
  mondayMidnight.setDate(lastSunday.getDate() + 1);
  const elapsedDaysSinceMondayNight =
    (date.getTime() - mondayMidnight.getTime()) / 1000 / 60 / 60 / 24;
  return elapsedDaysSinceMondayNight <= 7 && elapsedDaysSinceMondayNight >= 0;
}

export function isDateInCurrentMonth(date: Date): boolean {
  const now = new Date();
  return (
    now.getFullYear() === date.getFullYear() &&
    now.getMonth() === date.getMonth()
  );
}

export function isDateInCurrentYear(date: Date): boolean {
  const now = new Date();
  return now.getFullYear() === date.getFullYear();
}

import { expect, test } from "vitest";
import { isDateInWeek } from "../../utils/date-utils";

test("should check if date lies in a given week", () => {
  const referenceDate = new Date("2024-03-12T15:00:00.000Z");

  const datesToCheck = [
    { date: new Date("2024-01-01T23:59:59.000Z"), expectedResult: false },
    { date: new Date("2024-03-10T23:59:59.000Z"), expectedResult: false },
    // monday midnight lies here
    { date: new Date("2024-03-11T00:00:01.000Z"), expectedResult: true },
    { date: new Date("2024-03-12T00:00:01.000Z"), expectedResult: true },
    // reference date lies here
    { date: new Date("2024-03-13T00:00:01.000Z"), expectedResult: true },
    { date: new Date("2024-03-14T00:00:01.000Z"), expectedResult: true },
    { date: new Date("2024-03-15T00:00:01.000Z"), expectedResult: true },
    { date: new Date("2024-03-16T00:00:01.000Z"), expectedResult: true },
    { date: new Date("2024-03-17T23:59:59.000Z"), expectedResult: true },
    // sunday midnight lies here
    { date: new Date("2024-03-18T00:00:01.000Z"), expectedResult: false },
    { date: new Date("2028-05-11T00:00:01.000Z"), expectedResult: false },
  ];

  for (const entry of datesToCheck) {
    const result = isDateInWeek(entry.date, referenceDate);
    expect(result).toBe(entry.expectedResult);
  }
});

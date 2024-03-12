import { expect, test } from "vitest";
import {
  isDateInCurrentMonth,
  isDateInCurrentYear,
  isDateInWeek,
} from "../../utils/date-utils";

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

test("should check if date lies in a given month", () => {
  const referenceDate = new Date("2024-03-12T15:00:00.000Z");

  const datesToCheck = [
    { date: new Date("2023-04-01T23:59:59.000Z"), expectedResult: false },
    { date: new Date("2024-02-29T23:59:59.000Z"), expectedResult: false },
    // start of month
    { date: new Date("2024-03-11T00:00:01.000Z"), expectedResult: true },
    { date: new Date("2024-03-12T00:00:01.000Z"), expectedResult: true },
    // reference date lies here
    { date: new Date("2024-03-13T00:00:01.000Z"), expectedResult: true },
    { date: new Date("2024-03-14T00:00:01.000Z"), expectedResult: true },
    { date: new Date("2024-03-15T00:00:01.000Z"), expectedResult: true },
    { date: new Date("2024-03-16T00:00:01.000Z"), expectedResult: true },
    { date: new Date("2024-03-17T23:59:59.000Z"), expectedResult: true },
    // end of month lies here
    { date: new Date("2024-04-01T00:00:01.000Z"), expectedResult: false },
    { date: new Date("2028-05-11T00:00:01.000Z"), expectedResult: false },
  ];

  for (const entry of datesToCheck) {
    const result = isDateInCurrentMonth(entry.date, referenceDate);
    expect(result).toBe(entry.expectedResult);
  }
});

test("should check if date lies in a given year", () => {
  const referenceDate = new Date("2024-03-12T15:00:00.000Z");

  const datesToCheck = [
    { date: new Date("2020-04-01T23:59:59.000Z"), expectedResult: false },
    { date: new Date("2022-02-29T23:59:59.000Z"), expectedResult: false },
    // start of year
    { date: new Date("2024-01-11T00:00:01.000Z"), expectedResult: true },
    { date: new Date("2024-02-12T00:00:01.000Z"), expectedResult: true },
    // reference date lies here
    { date: new Date("2024-03-14T00:00:01.000Z"), expectedResult: true },
    { date: new Date("2024-04-14T00:00:01.000Z"), expectedResult: true },
    { date: new Date("2024-05-15T00:00:01.000Z"), expectedResult: true },
    { date: new Date("2024-06-16T00:00:01.000Z"), expectedResult: true },
    { date: new Date("2024-07-17T23:59:59.000Z"), expectedResult: true },
    { date: new Date("2024-12-31T23:59:59.000Z"), expectedResult: true },
    // end of year
    { date: new Date("2025-04-01T00:00:01.000Z"), expectedResult: false },
    { date: new Date("2026-05-11T00:00:01.000Z"), expectedResult: false },
  ];

  for (const entry of datesToCheck) {
    const result = isDateInCurrentYear(entry.date, referenceDate);
    expect(result).toBe(entry.expectedResult);
  }
});

/* eslint-disable max-lines */
export const getTreesGroupByAge = () => {
	const treesYoungerThan200 = treesGroupedByAge.filter(
		(ageGroup) => ageGroup.alter < 200,
	);

	// trees with 200+ years are grouped together and displayed as one bar
	const groupedTrees200Plus = treesGroupedByAge
		.filter((ageGroup) => ageGroup.alter >= 200)
		.reduce((accumulator, ageGroup) => accumulator + ageGroup.count, 0);

	return [
		{ pflanzjahr_grouped: 1820, alter: 200, count: groupedTrees200Plus },
		...treesYoungerThan200,
	];
};

export const getMaxCount = () => {
	return Math.max(...treesGroupedByAge.map((item) => item.count));
};

export const treesGroupedByAge = [
	{
		pflanzjahr_grouped: 1700,
		alter: 320,
		count: 3,
	},
	{
		pflanzjahr_grouped: 1710,
		alter: 310,
		count: 5,
	},
	{
		pflanzjahr_grouped: 1720,
		alter: 300,
		count: 8,
	},
	{
		pflanzjahr_grouped: 1730,
		alter: 290,
		count: 4,
	},
	{
		pflanzjahr_grouped: 1740,
		alter: 280,
		count: 4,
	},
	{
		pflanzjahr_grouped: 1750,
		alter: 270,
		count: 16,
	},
	{
		pflanzjahr_grouped: 1760,
		alter: 260,
		count: 13,
	},
	{
		pflanzjahr_grouped: 1770,
		alter: 250,
		count: 11,
	},
	{
		pflanzjahr_grouped: 1780,
		alter: 240,
		count: 15,
	},
	{
		pflanzjahr_grouped: 1790,
		alter: 230,
		count: 34,
	},
	{
		pflanzjahr_grouped: 1800,
		alter: 220,
		count: 55,
	},
	{
		pflanzjahr_grouped: 1810,
		alter: 210,
		count: 39,
	},
	{
		pflanzjahr_grouped: 1820,
		alter: 200,
		count: 116,
	},
	{
		pflanzjahr_grouped: 1830,
		alter: 190,
		count: 88,
	},
	{
		pflanzjahr_grouped: 1840,
		alter: 180,
		count: 178,
	},
	{
		pflanzjahr_grouped: 1850,
		alter: 170,
		count: 2448,
	},
	{
		pflanzjahr_grouped: 1860,
		alter: 160,
		count: 427,
	},
	{
		pflanzjahr_grouped: 1870,
		alter: 150,
		count: 1153,
	},
	{
		pflanzjahr_grouped: 1880,
		alter: 140,
		count: 999,
	},
	{
		pflanzjahr_grouped: 1890,
		alter: 130,
		count: 1791,
	},
	{
		pflanzjahr_grouped: 1900,
		alter: 120,
		count: 5333,
	},
	{
		pflanzjahr_grouped: 1910,
		alter: 110,
		count: 7454,
	},
	{
		pflanzjahr_grouped: 1920,
		alter: 100,
		count: 15888,
	},
	{
		pflanzjahr_grouped: 1930,
		alter: 90,
		count: 25774,
	},
	{
		pflanzjahr_grouped: 1940,
		alter: 80,
		count: 32406,
	},
	{
		pflanzjahr_grouped: 1950,
		alter: 70,
		count: 56052,
	},
	{
		pflanzjahr_grouped: 1960,
		alter: 60,
		count: 76174,
	},
	{
		pflanzjahr_grouped: 1970,
		alter: 50,
		count: 87485,
	},
	{
		pflanzjahr_grouped: 1980,
		alter: 40,
		count: 128378,
	},
	{
		pflanzjahr_grouped: 1990,
		alter: 30,
		count: 120681,
	},
	{
		pflanzjahr_grouped: 2000,
		alter: 20,
		count: 77759,
	},
	{
		pflanzjahr_grouped: 2010,
		alter: 10,
		count: 40532,
	},
	{
		pflanzjahr_grouped: 2020,
		alter: 0,
		count: 12013,
	},
];

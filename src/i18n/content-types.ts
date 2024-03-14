type TreeTypeId =
	| "LINDE"
	| "AHORN"
	| "EICHE"
	| "KASTANIE"
	| "ROSSKASTANIE"
	| "PLATANE"
	| "ESCHE"
	| "BIRKE"
	| "ROBINIE"
	| "ULME"
	| "HASEL"
	| "HAINBUCHE"
	| "PAPPEL";

interface TreeTypeInfo {
	id: TreeTypeId;
	title: string;
	description: string;
}

interface LocationSearch {
	placeholder: string;
}

interface Navbar {
	map: string;
	profile: {
		sidebarLabel: string;
		title: string;
		overview: {
			subtitle: string;
			irrigations: string;
			liter: string;
			adoptedTrees: string;
		};
		adoptedTrees: {
			subtitle: string;
			irrigationTimes: string;
			irrigationAmount: string;
			showAll: string;
			showLess: string;
		};
		settings: {
			subtitle: string;
			username: string;
			editUsername: string;
			placeholderUser: string;
			email: string;
			editEmail: string;
			placeholderMail: string;
			password: string;
			changePassword: string;
			deleteAccount: string;
			approve: string;
			usernameShould: string;
			checkInput: string;
			validateLength: string;
			onlyNumberAndLetters: string;
			userOccupied: string;
			backToLogin: string;
			register: string;
			existingAccount: string;
			logIn: string;
			passwordShould: string;
			passwordLength: string;
			passwordUpperAndLowerCase: string;
			passwordSpecialChar: string;
			passwordNumber: string;
			logInShort: string;
			missinAccount: string;
			registerNow: string;
			forgotYourPassword: string;
			ohNoforgotYourPassword: string;
		};
		logOut: string;
	};
	info: string;
}

interface NotFound {
	title: string;
}

interface QuestionAnswer {
	question: string;
	answer: string;
}

interface Info {
	about: {
		head: QuestionAnswer;
		qa: QuestionAnswer[];
	};
	faq: {
		title: string;
		description: string;
		qa: QuestionAnswer[];
	};
	share: {
		title: string;
		content: string;
		openSource: string;
	};
}

interface WaterNeed {
	title: string;
	hint: string;
	needXLiters: (liters: number) => string;
	needsOnlyOnDryDays: string;
	waterManaged: string;
	unknown: string;
	unknownTitle: string;
	liters: string;
	watered: string;
	rained: string;
	stillMissing: string;
	dataOfLastXDays: string;
	manager: string;
	alreadyWateredByManager: string;
	stillWaterXLiters: (liters: number) => string;
	shouldBeWatered: string;
	sufficientlyWatered: string;
	ageAndWaterHintTitle: string;
	ageAndWaterHint: string;
	lastXDaysYLitersWater: (days: number, liters: number) => string;
	lastXDaysYLitersRain: (days: number, liters: number) => string;
	iWatered: string;
	submitWatering: string;
	wateredHowMuch: string;
	wateredWhen: string;
	waterSave: string;
	waterCancel: string;
}

interface Problem {
	title: string;
	description: string;
	link: string;
}

interface LastWaterings {
	title: string;
	thisWeek: string;
	nothingThisWeek: string;
	thisMonth: string;
	nothingThisMonth: string;
	thisYear: string;
	nothingThisYear: string;
}

interface TreeDetail {
	title: string;
	adoptIt: string;
	alsoAdoptedBy: string;
	exclusivelyAdoptedBy: string;
	adoptLoading: string;
	unadoptLoading: string;
	isAdopted: string;
	ageTitle: string;
	adoptHintTitle: string;
	adoptHint: string;
	adoptErrorMessage: string;
	age: (age: number) => string;
	ageUnknown: string;
	waterNeed: WaterNeed;
	lastWaterings: LastWaterings;
	problem: Problem;
	managedBy: string;
	treeTypeInfos: TreeTypeInfo[];
	treeTypeInfoTitle: string;
}

interface Common {
	defaultErrorMessage: string;
}

export interface Content {
	common: Common;
	map: {
		attribution: {
			mapbox: {
				href: string;
				label: string;
			};
			openStreetMap: {
				href: string;
				label: string;
			};
			improve: {
				href: string;
				label: string;
			};
			feedback: {
				href: string;
				label: string;
			};
			imprint: {
				href: string;
				label: string;
			};
			privacy: {
				href: string;
				label: string;
			};
		};
	};
	locationSearch: LocationSearch;
	navbar: Navbar;
	notFound: NotFound;
	info: Info;
	treeDetail: TreeDetail;
}

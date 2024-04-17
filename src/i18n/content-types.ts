/* eslint-disable max-lines */
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
			noAdoptedTreesMessage: string;
		};
		settings: {
			subtitle: string;
			username: string;
			yourUsername: string;
			editUsername: string;
			placeholderUser: string;
			email: string;
			yourEmail: string;
			editEmail: string;
			placeholderMail: string;
			updateEmailEmailSentTitle: string;
			updateEmailEmailSentMessage: string;
			password: string;
			changePassword: string;
			newPassword: string;
			passwordChangeConfirmationTitle: string;
			passwordChangeConfirmationMessage: string;
			deleteAccount: string;
			confirmDelete: string;
			cancel: string;
			approve: string;
			usernameShould: string;
			checkInput: string;
			usernameLength: string;
			onlyNumberAndLetters: string;
			usernameTaken: string;
			backToLogin: string;
			register: string;
			confirmEmailTitle: string;
			confirmEmail: (email: string) => string;
			existingAccount: string;
			logIn: string;
			passwordShould: string;
			passwordLength: string;
			passwordUpperAndLowerCase: string;
			passwordSpecialChar: string;
			passwordNumber: string;
			logInShort: string;
			missingAccount: string;
			registerNow: string;
			forgotYourPassword: string;
			ohNoforgotYourPassword: string;
			passwordForgotten: string;
			resetPasswordEmailSentTitle: string;
			resetPasswordEmailSentMessage: string;
			clickHere: string;
			resetPassword: string;
			invalidCredentials: string;
			deleteAccountConfirm: string;
			confirm: string;
			save: string;
		};
		logOut: string;
		showPassword: string;
		hidePassword: string;
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

interface QuestionAnswerHead {
	question: string;
	answer: string;
	aboutUsTitle: string;
	aboutUsAnswer: string;
	press: string;
	communityTitle: string;
	communityAnswer: string;
	slackButton: string;
	feedback: string;
}

interface Info {
	infoTitel: string;
	about: {
		head: QuestionAnswerHead;
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
	credits: {
		projectBy: string;
		fundedBy: string;
	};
}

interface WaterNeed {
	title: string;
	hint: string;
	needXLiters: (liters: string) => string;
	needsOnlyOnDryDays: string;
	waterManaged: string;
	unknown: string;
	unknownTitle: string;
	seniorTitle: string;
	seniorExplanation: string;
	liters: string;
	watered: string;
	rained: string;
	stillMissing: string;
	dataOfLastXDays: string;
	manager: string;
	alreadyWateredByManager: string;
	stillWaterXLiters: (liters: string) => string;
	shouldBeWatered: string;
	sufficientlyWatered: string;
	ageAndWaterHintTitle: string;
	ageAndWaterHint: string;
	readMore: string;
	lastXDaysYLitersWater: (days: number, liters: string) => string;
	lastXDaysYLitersRain: (days: number, liters: string) => string;
	close: string;
	iWatered: string;
	loginToWater: {
		login: string;
		toWater: string;
	};
	submitWatering: string;
	wateredHowMuch: string;
	wateredHowMuchPlaceholder: string;
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
	deletedAccount: string;
	title: string;
	thisWeek: string;
	nothingThisWeek: string;
	thisMonth: string;
	nothingThisMonth: string;
	nothingMoreThisMonth: string;
	thisYear: string;
	nothingThisYear: string;
	nothingMoreThisYear: string;
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
	adoptLoginFirst: string;
	age: (age: number) => string;
	ageUnknown: string;
	waterNeed: WaterNeed;
	lastWaterings: LastWaterings;
	problem: Problem;
	managedBy: string;
	treeTypeInfos: TreeTypeInfo[];
	treeTypeInfoTitle: string;
}

interface Filter {
	title: string;
	publicPumps: string;
	waterNeedTrees: string;
	treeAge: string;
	youngTrees: string;
	mediumTrees: string;
	oldTrees: string;
	show: string;
	reset: string;
}

interface Common {
	defaultErrorMessage: string;
}

interface Pumps {
	title: string;
	status: string;
	lastCheck: string;
	update: string;
	working: string;
	defect: string;
	unknown: string;
}

interface Splash {
	headline: string;
	subheadline: string;
	actionTitle: string;
	discoverTitle: string;
	discoverContent: string;
	waterTitle: string;
	waterContent: string;
	adoptTitle: string;
	adoptContent: string;
	networkTitle: string;
	networkContent: string;
	questionHeadline: string;
	questionSubheadline: string;
	discoverMoreTitle: string;
	letsGo: string;
}

interface Loading {
	mapLoading: string;
	treeLoading: string;
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
	filter: Filter;
	pumps: Pumps;
	splash: Splash;
	loading: Loading;
}

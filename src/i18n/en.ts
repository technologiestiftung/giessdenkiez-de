import { Content } from "./content-types";

export const en: Content = {
	map: {
		attribution: {
			mapbox: {
				href: "https://www.mapbox.com/about/maps/",
				label: "© Mapbox",
			},
			openStreetMap: {
				href: "https://www.openstreetmap.org/copyright",
				label: "© OpenStreetMap",
			},
			improve: {
				href: "https://www.mapbox.com/map-feedback",
				label: "**Improve this map**",
			},
			feedback: {
				href: "https://citylabberlin.typeform.com/to/kCdnCgvC#product_id=GdK",
				label: "Feedback",
			},
			imprint: {
				href: "https://www.technologiestiftung-berlin.de/de/impressum/",
				label: "Imprint",
			},
			privacy: {
				href: "https://www.technologiestiftung-berlin.de/de/datenschutz/",
				label: "Privacy",
			},
		},
	},
	locationSearch: {
		placeholder: "Search for an address",
	},
	legend: {
		title: "Legend",
		greenTrees: "No water requirement",
		yellowTrees: "Moderate water requirement",
		orangeTrees: "Critical water requirement",
		grayTrees: "Not matching the filter settings",
	},
	navbar: {
		map: "Map",
		profile: {
			sidebarLabel: "Profile",
			title: "Your profile",
			overview: {
				subtitle: "Your overview",
				irrigations: "Waterings",
				liter: "Liters",
				adoptedTrees: "Adopted trees",
			},
			adoptedTrees: {
				subtitle: "Adopted trees",
				irrigationTimes: "Times",
				irrigationAmount: "Liters",
				showAll: "Show all",
				showLess: "Show less",
				noAdoptedTreesMessage:
					"If you regularly water a tree, you can adopt it. The trees you have adopted will be displayed here.",
			},
			settings: {
				subtitle: "Profile details",
				username: "Username",
				yourUsername: "Your username",
				editUsername: "New username",
				placeholderUser: "Your username",
				updateEmailEmailSentTitle: "E-Mail sent!",
				updateEmailEmailSentMessage:
					"We sent you an email with a confirmation link to your new email address to confirm the change. Check your mailbox!",
				passwordChangeWithoutRecoveryLinkTitle: "An error occurred.",
				passwordChangeWithoutRecoveryLinkMessage:
					"Note: This page can only be accessed if the password reset link in the email has been clicked previously.",
				passwordChangeWithoutRecoveryLinkLinkLabel: "Back to home",
				pleaseWait: "Please wait a moment...",
				email: "Email",
				yourEmail: "Your email address",
				editEmail: "New email address",
				placeholderMail: "xyz@ts.berlin",
				password: "Password",
				changePassword: "Change password",
				newPassword: "New password",
				passwordChangeConfirmationTitle:
					"Your password was successfully changed!",
				passwordChangeConfirmationMessage: 'Press "OK" to go to your profile.',
				deleteAccount: "Delete account",
				confirmDelete: "Delete",
				cancel: "Cancel",
				save: "Save",
				confirm: "OK",
				approve: "Done",
				checkInput: "Please check your input",
				usernameShould: "Your username needs to: ",
				usernameLength: "be at least 3-50 characters long",
				onlyNumberAndLetters: "and consist only of letters or numbers",
				usernameTaken: "This username is already taken",
				backToLogin: "Back to login",
				register: "Register",
				confirmEmailTitle: "Confirm account",
				confirmEmail: (email: string) =>
					`Check your inbox for "${email}", you should have received a mail from "no-reply@giessdenkiez.de" containing a link to activate your account.`,
				existingAccount: "Do you already have an account?",
				logIn: "Login",
				passwordShould: "Your password needs to contain:",
				passwordLength: "at least 8 characters",
				passwordUpperAndLowerCase: "upper and lower case letters",
				passwordSpecialChar: "at least one special character",
				passwordNumber: "at least one number",
				logInShort: "Login",
				missingAccount: "Don't have an account yet?",
				registerNow: "Register now",
				forgotYourPassword: "forget your password?",
				ohNoforgotYourPassword: "Oh no. Did you",
				passwordForgotten: "Reset your password",
				resetPasswordEmailSentTitle: "Email sent!",
				resetPasswordEmailSentMessage:
					"We sent you an email with a link to reset your password. Check your mailbox!",
				clickHere: "click here",
				resetPassword: "Reset password",
				invalidCredentials: "Invalid credentials",
				deleteAccountConfirm: "Are you sure you want to delete your account?",
			},
			logOut: "Log out",
			showPassword: "Show",
			hidePassword: "Hide",
		},
		info: "Info",
	},
	notFound: {
		title: "404 - Page Not Found",
	},
	info: {
		infoTitel: "Information",
		about: {
			head: {
				question: "About the project",
				answer: `The consequences of climate change, especially the dry and hot summers, are putting a strain on Berlin's ecosystem. Our urban trees are drying out and suffering long-term damage: In recent years, more and more trees had to be felled and their lifespan is decreasing. The public is now regularly called upon for support, but in a so far uncoordinated manner. Through this project we want to improve this and enable coordinated citizen participation in the watering of urban green spaces.`,

				aboutUsTitle: "About Us",
				aboutUsAnswer: `“Gieß den Kiez” is a project of the [CityLAB Berlin](https://www.citylab-berlin.org/).
				The CityLAB is a public innovation laboratory in the former Berlin-Tempelhof airport. Together with a large network of administration, civil society, science and start-ups, we are working on new ideas to make Berlin even more liveable. The CityLAB is a project of the Technologiestiftung Berlin and is funded by the Berlin Senate Chancellery.`,
				press: `For press inquiries please contact [Anna Hantelmann](mailto:anna.hantelmann@ts.berlin?subject=giessdenkiez.de%20Presseanfrage).`,
				communityTitle: "Community",
				communityAnswer:
					"Would you like to find out more about watering trees, report pumps or exchange ideas with other active users? Then join our Slack chat!",
				slackButton: "Go to Slack Community",
				feedback: `Do you have **feedback** on *Gieß den Kiez*?
				
[Feel free to answer a few questions](https://citylabberlin.typeform.com/to/kCdnCgvC#product_id=GdK)`,
			},
			qa: [
				{
					question: "Useful links",
					answer: `[Favorite Tree Initiative (Berlin)](https://www.lieblingsbaum-initiative.de)

[Watering in dry conditions (Baumpflegeportal)](https://www.baumpflegeportal.de/baumpflege/trockenheit-duerre-wann-baeume-giessen/)

[Berlin city tree campaign (SenMVKU)](https://www.berlin.de/senuvk/umwelt/stadtgruen/stadtbaeume/kampagne/start.shtml)

[Irrigation recommendation for urban trees (Berlin Plant Protection Office)](https://www.berlin.de/pflanzenschutzamt/stadtgruen/beratung/bewaesserungsempfehlung-fuer-stadtbaeume/)

[City trees - significance and challenges in times of climate change (HCU Hamburg)](https://www.hcu-hamburg.de/fileadmin/documents/REAP/files/Bildungsmaterial_Stadtbaeume_im_Klimawandel_2017.pdf)

[Functions of city trees (Nature Conservation Association)](https://www.bund-naturschutz.de/natur-und-landschaft/stadt-als-lebensraum/stadtbaeume/funktionen-von-stadtbaeumen.html)`,
				},
				{
					question: "Data sources",
					answer: `The map shows the majority of Berlin's street trees (967,365; as of March 2025). It also shows how much precipitation has fallen on each tree in the last 30 days and whether users have watered them. Unfortunately, for various reasons, not all of Berlin's urban trees are listed yet. However, we are working on improving the data situation. The current data sources are the following:

[Geoportal Berlin / Street trees](https://fbinter.stadt-berlin.de/fb/berlin/service_intern.jsp?id=s_wfs_baumbestand@senstadt&type=WFS)

[Geoportal Berlin / Plant trees](https://fbinter.stadt-berlin.de/fb/berlin/service_intern.jsp?id=s_wfs_baumbestand_an@senstadt&type=WFS)

Precipitation from [German Weather Service](https://www.dwd.de/)

Pumps from [Open Street Map](https://www.openstreetmap.de)`,
				},
			],
		},
		faq: {
			title: "F.A.Q.",
			description:
				"Based on the active exchange in our Slack community as well as your feedback via email and telephone, we have created a small FAQ. The most frequently asked questions are answered here.",
			qa: [
				{
					question: "How can I participate?",
					answer: `Explore:

Curious which tree is in front of your door? Our interactive map visualizes over 800,000 street trees of Berlin. If you want to find out more about a tree, navigate and zoom to the desired location and click on the colored dot. You will now see a lot of information about the selected tree.

Watering and adopting trees:

Do you want to get active or are you already actively watering? On Gieß den Kiez, you can enter when and with how much water you watered a tree. Trees can also be adopted. The adopted trees appear in your own user profile and can be found more quickly. This allows other neighbors in the area to see which trees need their attention. To water and adopt trees, first create a profile with a valid email address and then log in.

Connect:

You can use our public [Slack channel](https://join.slack.com/t/giessdenkiez/shared_invite/zt-e3et281u-xON4UmBZpKavzDRkw5HmCQ) to exchange ideas with others, report defective pumps in your neighborhood or connect to jointly water your neighborhood.`,
				},
				{
					question: "What can I do if trees are not registered correctly?",
					answer: `We obtain the tree data set with all attributes such as address, tree species and planting year for each tree from the geoportal of the city of Berlin, the FIS broker. The tree register provided in the geoportal is based on the district-aggregated data from the road and green space authorities. It can therefore happen that data from trees is out of date or that properties differ from current reality. Unfortunately, we cannot make any changes to the tree register ourselves. Any deviations can only be reported directly to the responsible district authority. Once a year, the green space authorities publish an updated tree register, which we link to Gieß den Kiez after publication.`,
				},
				{
					question: "Why should I take action and water trees?",
					answer: `The long periods of drought and heat of the last two years have caused immense damage to Berlin's urban greenery. Between 2018 and 2019 alone, over 7,000 trees had to be felled, not solely due to drought damage.

The street and green space authorities are already watering thousands of trees, but cannot keep up with the watering during Berlin's hot summers. Since the green space authorities are organized by district, each district works slightly different, which makes holistic and needs-based coordination difficult. Through the platform, we would like to give citizens the opportunity to help trees specifically based on their current water supply and to obtain further information. The goal is to save as many trees as possible through neighborly involvement.`,
				},
				{
					question: "How do I water correctly?",
					answer: `
Trees require different amounts of water depending on their age, location and species. Young trees (0-10 years) in particular are dependent on frequent waterings in times of drought, radiation and heat. The district green space offices in Berlin typically take care of young trees up to the age of 5 years, which means that young trees between 5 and 10 years old require your attention.

Before watering, you should first look at the tree and consider whether it really needs water. Important indicators for need-based watering include the age (young/old), trunk circumference (thin/thick), location (sunny/shady), and the condition of fresh shoots (bare/green) of a tree. Before you start watering, we recommend loosening the dry soil so that the water can penetrate the ground instead of running off or pooling on the surface. Based on Berlin's [Good Care Manual](https://www.berlin.de/sen/uvk/natur-und-gruen/stadtgruen/pflegen-und-unterhalten/handbuch-gute-pflege), it is better to water less frequently but with larger amounts of water. The manual recommends up to 200 liters per watering for newly planted trees. This ensures that the soil moisture is also increased at depth. So-called watering bags are also recommended, from which the water only emerges very slowly, hardly runs off the surface and therefore seeps continuously into the soil.
					`,
				},
				{
					question: `How do I deal with water scarcity?`,
					answer: `In times of drought and water scarcity, it is especially important to use water sparingly. If you want to water your tree, first ask yourself which tree has the greatest need. Water less frequently, but with larger amounts of water. This encourages the tree to develop deeper roots and become more resilient to drought. To get an overview of the current soil moisture in Berlin, it is worth checking the [Irrigation recommendation for urban trees](https://www.berlin.de/pflanzenschutzamt/stadtgruen/beratung/bewaesserungsempfehlung-fuer-stadtbaeume/) of Berlin's Plant Protection Office. Try to use water from public street pumps instead of tap water from your home. In the long term, it is worth collecting rainwater and storing it in rain barrels. Neighborhood initiatives like [Wassertanke](https://wassertanke.org) can help you with such community projects.`,
				},
				{
					question: "Who can I contact if pumps are broken or damaged?",
					answer: `The respective district roads and green spaces authorities are responsible for the infrastructure of the roads, which also includes the public hand pumps. If pumps are broken or damaged, the need for repairs can be reported there. We load the locations of the pumps on the map weekly from the Open Street Map database. If you want to help improve the data, for example by reporting a defective pump, you can do so in our [Slack Channel #pump-report](https://app.slack.com/client/T012K4SDYBY/C019SJQDPL7). The OSM community then has the opportunity to enter your information into the database.`,
				},
				{
					question: "How are technical problems handled?",
					answer: `The participation platform “Gieß den Kiez” is a prototype and therefore a beta version of a web app. We are aware of some technical hurdles, but depend on your help. We are happy to receive your technical feedback and questions in our [Slack Channel](https://join.slack.com/t/giessdenkiez/shared_invite/zt-e3et281u-xON4UmBZpKavzDRkw5HmCQ) or by email. Anyone who feels at home in the “tech world” is welcome to participate in our [Open Source GitHub Repository](https://github.com/technologiestiftung/giessdenkiez-de) invited and can comment on his issues or code fixes directly in the repository.`,
				},
				{
					question: "Why is the website not loading or loading very slowly?",
					answer: `When the page is first opened, the browser loads over 800,000 data points - this can take a while! Regardless, there may be slightly different displays when using different browsers. For the best experience, we recommend using Chrome or Firefox Desktop. Experience has shown that the most common problems can be solved if the browser is not outdated or the latest version is installed and there is a stable internet connection (LAN or WLAN). 

Use via smartphone (mobile network) can lead to performance problems (page loads slowly). If problems occur repeatedly, you can report them in our [Slack Channel](https://join.slack.com/t/giessdenkiez/shared_invite/zt-e3et281u-xON4UmBZpKavzDRkw5HmCQ), Report by email or via GitHub Issue, stating the device used, the operating system, the browser and the browser version.`,
				},
				{
					question: "What should I do if I watered a tree incorrectly?",
					answer: `To remove a watering entry first click on the tree for which you entered the watering. Scroll down the tree sidebar to the section of past waterings, click the trash can icon next to the entry you want to delete, and click “Delete” to confirm. Only waterings that you have made yourself can be deleted. After deleting, enter the watering with the correct information (number of liters and time) via the "I watered" button.`,
				},
				{
					question: "Can the principle be transferred to other cities?",
					answer: `The “Gieß den Kiez” platform is an open source software project and runs under an MIT license. Accordingly, the idea and also the source code can be used and further developed free of charge for implementation in other cities. If you are interested, please take a look at our [GitHub Repository](https://github.com/technologiestiftung/giessdenkiez-de) or contact us via email. We are also happy to support your city with the technical implementation via [DeineStadtgießt](https://deinestadt.giessdenkiez.de/).`,
				},
				{
					question: "I still have a question!",
					answer: `The FAQ couldn't help you or you have a more complex query? Then write us an [Email](mailto:giessdenkiez@citylab-berlin.org).`,
				},
				{
					question: "Why aren't all of Berlin's trees shown?",
					answer: `Gieß den Kiez is based on the tree register. The tree register is a city directory in which (city/street or park) trees are managed and which is provided by the street and green spaces authorities. However, the green space authorities are not responsible for all of Berlin's trees. The trees in the Plänterwald, for example, are subject to the forestry office. These trees therefore do not appear in Gieß den Kiez.`,
				},
			],
		},
		share: {
			title:
				"Share Gieß den Kiez with those around you and help us expand the watering community:",
			content:
				"On Gieß den Kiez you can find out about Berlin's tree population, find thirsty trees and record when you watered them!",
			openSource:
				"Gieß den Kiez is an [Open Source Project](https://github.com/technologiestiftung/giessdenkiez-de)!",
		},
		credits: {
			projectBy: "A project of",
			fundedBy: "Funded by",
		},
	},
	treeDetail: {
		title: "Tree information",
		adoptIt: "Adopt this tree",
		alsoAdoptedByOtherUsers: "Also adopted by other users",
		onlyAdoptedByOtherUsers: "Adopted by other users",
		ageTitle: "Age",
		adoptLoading: "Tree is being adopted...",
		unadoptLoading: "Adoption is being canceled...",
		isAdopted: "You have adopted this tree",
		adoptHintTitle: "Adopt a tree",
		adoptHint:
			"If you water this tree on a regular basis, you can adopt it. This way you can find it in your profile.",
		adoptErrorMessage: "Error adopting the tree. Please try again.",
		adoptLoginFirst: "Please log in first to adopt this tree",
		age: (age: number) => `${age === 1 ? "year" : "years"}`,
		ageUnknown: "Unknown",
		treeTypeUnknown: "Tree species unknown",
		managedBy:
			"This tree is already being taken care of by the Berlin administration and does not need to be watered.",
		waterNeed: {
			title: "Water requirements",
			hintWinter:
				"Outside of the vegetation period (March-October), the trees do not require any water as they are practically in hibernation.",
			hint: "Depending on the age of the tree, the need for water varies.",
			needXLiters: (liters: string) => `Needs ${liters} liters per week`,
			needsOnlyOnDryDays: "Only needs water on dry days",
			waterManaged: "Supplied, only in need during dry periods",
			winterSleep: "The trees are currently in hibernation",
			managedByGroundwater: "Groundwater",
			unknownTitle: "Water needs **unknown**",
			unknown:
				"The age and therefore the water requirement are unfortunately unknown. The info box may help you make your own assessment.",
			unknownShort: "Unknown",
			seniorTitle: "Needs water only during dry periods",
			seniorExplanation:
				"Older trees can usually supply themselves with groundwater, but as the heat increases they also appreciate additional water.",
			liters: "liters",
			watered: "watered",
			covered: "covered",
			rained: "rain",
			stillMissing: "still missing",
			dataOfLastXDays: "* data of last 30 days",
			manager: "district",
			alreadyWateredByManager: "Watered by **district authority**",
			alreadyWateredByGroundwater: "Covered by **groundwater**",
			winterNeedsNoWater: "No water needed in winter",
			stillWaterXLiters: (liters: string) => `
Needs

**${liters} liters**`,
			shouldBeWatered: "Should be watered",
			sufficientlyWatered: "Sufficiently watered at the moment",
			readMore: "Show more",
			ageAndWaterHintTitle: "Water requirements and age",
			ageAndWaterHint: `
Particularly young trees need water in the first few years. Rather less often, but a lot at once. 

**Below 5 years**: We are taken care of by the district green space office.

**5-10 years**: At this age, we are no longer watered by the administration in all districts and are not yet "self-sufficient". We are thankful for some extra water, especially in dry times - preferably less often, but a lot at once (approx. 100-200 liters per month). 

**Older trees (10+ years)**: We can supply ourselves via the groundwater.`,
			ageAndWaterHintWinter: `
When the trees lose more of their leaves in autumn, their photosynthetic processes also decrease, and they need less energy—and therefore less water. 
With the official end of the vegetation period, the watering season also comes to an end for this year. Starting in March, it will pick up again! We Can!

**Water needs during the vegetation period (March-October)**:

`,
			ageAndWaterHintSpecialDistrict: (
				babyAgeLimit: number,
				district: string,
			) => `
Particularly young trees need water in the first few years. Rather less often, but a lot at once. 

The district ${district} has provided us with additional information on the individual pouring strategy.

**Below ${babyAgeLimit} years**: We are taken care of by the district green space office.

**Older trees (${babyAgeLimit}+ years)**: We can supply ourselves via the groundwater.`,

			close: "Show less",
			lastXDaysYLitersWater: (days: number, liters: string) =>
				`In the last ${days} days, **${liters} liters** were watered.`,
			lastXDaysYLitersRain: (days: number, liters: string) =>
				`In the last ${days} days, it rained **${liters} liters**.`,
			iWatered: "I watered",
			loginToWater: {
				login: "Log-in",
				toWater: "to submit a watering",
			},
			submitWatering: "Submit watering",
			wateredHowMuch: "Liters",
			wateredHowMuchPlaceholder: "Amount in L",
			wateredWhen: "When?",
			waterSave: "Save",
			waterCancel: "Cancel",
			wateringSuccessful: "Your watering entry was successful!",
		},
		lastWaterings: {
			deletedAccount: "Deactivated Account",
			title: "Last waterings",
			last30Days: "Last 30 days",
			nothingLast30Days: "No waterings in the last 30 days",
			before: "Previous",
			nothingBefore: "No previous waterings",
		},
		problem: {
			title: "Report a problem",
			description:
				"Have you discovered tree damage or is the tree disk being misused? Tell the public order office:",
			link: "To the official form",
		},
		treeTypeInfos: [
			{
				id: "LINDE",
				title: "Linden (Tilia)",
				description:
					"The lime tree has been the typical street tree in Berlin for years. With a share of a good third, it characterizes the street tree population. A total of 10 different species can be distinguished. The winter lime tree (Tilia cordata), a medium-sized tree that also finds room in narrower streets, is the preferred tree. The large-crowned imperial lime (Tilia intermedia), on the other hand, is reserved for wide avenues.",
			},
			{
				id: "AHORN",
				title: "Maple (Acer)",
				description:
					"The maple genus comprises approx. 20% of the total stock. The Norway maple (Acer platanoides) is particularly suitable for the street location. The early flowering and the colorful autumn coloring make the maple a particularly popular tree species.",
			},
			{
				id: "EICHE",
				title: "Oak (Quercus)",
				description:
					"Oaks make up around 9% of the total stock. In Berlin, it is mainly the common oak (Quercus robur) that is planted. As a light tree, the oak is not suitable for narrow streets. The most recent avenues in the parliamentary and government district were planted with the so-called Spree oak (Quercus palustris), which is characterized by its particularly beautiful autumn colouring, among other things.",
			},
			{
				id: "PLATANE",
				title: "Plane tree (Platanus)",
				description:
					"An ideal avenue tree for wide streets is the plane tree (Platanus acerifolia), which in addition to a height of 20 to 30 m can also reach a stately crown diameter of 15 to 20 m. Sycamore trees make up around 6% of the total population. The best-known and, at over 120 years old, oldest plane tree avenue in Berlin is Puschkinallee in Berlin-Treptow.",
			},
			{
				id: "KASTANIE",
				title: "Chestnut (Aesculus)",
				description:
					"The chestnut (Aesculus) accounts for around 5% of the total population, putting it in fifth place among Berlin's street trees. Horse chestnuts have five- and multi-lobed leaves that resemble the fingers of a hand; sweet chestnuts have single leaves that are also clearly serrated.",
			},
			{
				id: "ROSSKASTANIE",
				title: "Horse chestnut (Aesculus hippocastanum)",
				description:
					"The horse chestnut (Aesculus hippocastanum) accounts for around 5% of the total population, making it the fifth most popular street tree in Berlin. Horse chestnuts have five- and multi-lobed leaves that resemble the fingers of a hand; sweet chestnuts have single leaves that are also clearly serrated.",
			},
			{
				id: "ESCHE",
				title: "Ash (Fraxinus)",
				description:
					"The ash tree (Fraxinus) accounts for approx. 3% of the total population and thus occupies sixth place among Berlin's street trees. With a height of up to 40 m, it is one of the tallest deciduous trees in Europe.",
			},
			{
				id: "BIRKE",
				title: "Birch (Betula)",
				description:
					"The birch (Betula) accounts for around 3% of the total population. Although the birch is a pioneer tree that is very undemanding and grows on any soil, it is less suitable as a street tree as the tree grates often offer too little space for the shallow-rooted trees.",
			},
			{
				id: "ROBINIE",
				title: "Robinia (Robinia)",
				description:
					"The Robinia (Robinia) accounts for around 2% of the total population. It was cultivated as a park tree in Berlin's Lustgarten from 1672 and is now very common throughout Berlin. The Robinia has low demands on the soil and, thanks to the nodule bacteria on its roots, it can bind atmospheric nitrogen and thus fertilize the soil.",
			},
			{
				id: "HASEL",
				title: "Hazel tree (Corylus)",
				description:
					"The hazel tree (Corylus) accounts for around 2% of the total population, making it the ninth most common street tree in Berlin. The hazelnut grows as a shrub or small tree up to 6 m high.",
			},
			{
				id: "HAINBUCHE",
				title: "Hornbeam (Carpinus)",
				description:
					"The proportion of hornbeams (Carpinus) is around 2% of the total population. The tree reaches a height of up to 25 meters. The crown is initially slightly conical and later expands widely.",
			},
			{
				id: "PAPPEL",
				title: "Poplar (Populus)",
				description:
					"The poplar (Populus) accounts for around 2% of Berlin's total population. They have ovoid to triangular, sometimes heart-shaped leaves.",
			},
			{
				id: "ULME",
				title: "Elm (Ulmus)",
				description:
					"Elms (Ulmus) make up around 2% of the total population. There are three of the world's 45 species of this deciduous deciduous tree: the mountain elm, the field elm and the elm tree. It grows up to 600 meters high and can live to be 250 years old.",
			},
		],
		treeTypeInfoTitle: "Tree profile",
	},
	filter: {
		title: "Filter",
		publicPumps: "Public pumps",
		myAdoptedTrees: "My adopted trees",
		allAdoptedTrees: "Adopted trees",
		lastWateredTrees: "Previously watered trees",
		treeAge: "Tree age",
		show: "Show",
		reset: "Reset",
		treeAgeTitle: "Tree age",
		years: "years",
	},
	common: {
		defaultErrorMessage: "Something went wrong! Please try again later.",
	},
	contact: {
		dialogTitle: (contactName: string) =>
			`**Send an email to *${contactName}***`,
		dialogDetail: (contactName: string, userMail: string) =>
			`The email to *${contactName}* automatically contains your email address (*${userMail}*) and your text message:`,
		dialogPlaceholder: "Briefly describe why you would like to connect...",
		dialogCancel: "Cancel",
		dialogSubmit: "Send",
		dialogAlreadyContactedError: (contactName: string) =>
			`You already sent a contact request to *${contactName}*.`,
		dialogAlreadyContactedExplanation:
			"You have already sent a contact request to this person. Another request is not possible.",
		genericErrorTitle: "Contact request not possible",
		genericError: `Oops, something went wrong. Please try again.`,
		dialogSuccess: (contactName: string) =>
			`The contact request was sent to *${contactName}*.`,
		dailyLimitError: "You have reached the daily limit for contact requests.",
		dailyLimitExplanation:
			"You have reached the daily limit of 3 contact requests. Please try again tomorrow.",
		containsUrlHint:
			" Please note, that the message must not contain any links.",
		messageTooLongError: "The message must be less than 200 characters long.",
		messageRestrictionsHint: (maxLength: number, message: string) =>
			`${Math.max(0, maxLength - message.length)} characters left.`,
		loginFirst: "Log in for contact request",
		loginFirstReason:
			"You can only send contact requests if you are logged in.",
		loginFirstAction: "Log in",
		confirm: "Okay!",
	},
	pumps: {
		title: "Public pump",
		status: "Status",
		lastCheck: "Last check",
		update: "Update status in OpenStreetMap",
		working: "Working",
		defect: "Broken",
		unknown: "Unknown",
	},
	splash: {
		headline:
			"Berlin's city trees are suffering from drought and you can help them!",
		subheadlineWinter: `Currently the trees are practically in hibernation and don’t need any additional water.
**Starting in March, it will pick up again! We Can!**`,
		subheadline:
			"Find out about the water needs of the trees in your neighborhood, adopt the tree on your doorstep and become part of the active watering community in Berlin!",
		actionTitle: "Let's go",
		actionTitleWinter: "Explore!",
		discoverTitle: "Discover",
		discoverContent:
			"The map visualizes over 900,000 urban trees (as of 2025) and displays information on species, age and water requirements. Use the filter and search functions to quickly get an overview.",
		waterTitle: "Water",
		waterContent:
			"Grab a watering can and become part of the watering community! Over a thousand active people have already joined forces for Berlin's trees and are regularly submitting their waterings.",
		adoptTitle: "Adopt",
		adoptContent:
			"By adopting a tree - or several - you let your neighborhood know that these trees will be cared for. This creates a coordinated commitment.",
		networkTitle: "Connect",
		networkContent:
			"Join our Slack chat to connect with the watering community, exchange questions, and coordinate watering in your neighborhood.",
		questionHeadline: "Gieß den Kiez also in your city?",
		questionSubheadline:
			"Cities like Leipzig, Magdeburg and Co. have already successfully joined the watering wave! Is your city the next one?",
		discoverMoreTitle: "Learn more!",
		letsGo: "Let's go",
	},
	loading: {
		mapLoading:
			"We are currently loading 967,365 trees from the Berlin tree population.",
		treeLoading: "Loading tree information...",
	},
	stats: {
		title: "Berlin Statistics",
		subtitle: "Gieß den Kiez in numbers",
		streetTrees: "City trees",
		publicPumps: "Public pumps",
		activeUsers: "Active casters",
		backToFront: "back",
		wateringsStat: {
			title: "Waterings",
			unit: "times",
			hint: (currentYear) => `were poured in ${currentYear}.`,
			legend: "Number of waterings",
			backContent: `The watering activity varies in the twelve Berlin districts depending on the level of volunteer involvement. In some districts, engaged residents have already organized themselves into watering groups ([Join the community](https://giessdenkiez.slack.com/ssb/redirect)).

In addition, the needs of the [district’s street and green space offices (SGA)](https://www.berlin.de/ba-friedrichshain-kreuzberg/politik-und-verwaltung/aemter/strassen-und-gruenflaechenamt/) vary. In order to provide the best possible help, you should contact the responsible SGA before the first watering - now you’re ready to join the big community!`,
		},
		wateringBehaviorStat: {
			title: "Pouring behaviour",
			unit: "liters",
			watered: "poured",
			rain: "rain",
			hint: () => `have already been poured since 2020.`,
			legend: "∑ Liters poured per month",
			backContent: `Over impressive 2 million liters have already been poured by volunteers!

“The more the better” does not always apply in the face of increasing water shortages though. And the Berlin watering community knows this, of course, and is therefore mainly active when the trees are actually thirsty: during the vegetative period (April-October) in particularly hot, dry years.

Data source: [Weather data (DWD)](https://opendata.dwd.de/)`,
		},
		wateringAmountStat: {
			title: "Pouring volume",
			unit: "liters",
			hint: (currentYear) =>
				`are entered on average per watering in ${currentYear}.`,
			legend: "Ø Liters per year",
			backContent: `“The more the better” applies here to a limited extent: a lot at once, but not too often. And the active community already knows this too, of course.

A watering should involve more rather than fewer liters at a time so that the root system of the thirsty young trees can develop downwards.

But be careful! Young trees can also be overwatered. More information on [watering recommendations for urban trees](https://www.berlin.de/pflanzenschutzamt/stadtgruen/beratung/bewaesserungsempfehlung-fuer-stadtbaeume/).`,
		},
		treeSpeciesStat: {
			title: "Tree species",
			unit: "tree species",
			hint: () => `exist in Berlin.`,
			other: "Other",
			legend: "Share of Berlin’s tree population",
			backContent: `Berlin is diverse - including the trees!

This overview shows the twenty most common species, each summarized according to the overarching tree genus.

The [Gieß den Kiez map](https://www.giessdenkiez.de/map) shows the full splendor, and thus nearly 900,000 city trees, with information on species, age and water requirements. Use the filters and search to find out more about the trees in your neighborhood.

Data source: [Berlin tree cadastre (Geoportal Berlin)](https://daten.berlin.de/datensaetze/baumbestand-berlin-wms )`,
		},
		adoptionStat: {
			title: "Tree adoptions",
			unit: "trees",
			hint: () => `are adopted.`,
			legend: "of the adopted trees are particularly thirsty.",
			backContent: `Adopting a tree on Gieß den Kiez shows that it is regularly cared for and thus facilitates neighborly coordination. Thousands of trees can already count themselves lucky.

Young trees (under 10 years old) are particularly thirsty. These are usually watered by the Parks Department until at least their fifth year. The **5 - 10 years** old trees are therefore “particularly thirsty”.`,
		},
		gdKSalesPitch: `*Gieß den Kiez* also in **your city**?

[Find out more!](https://deinestadt.giessdenkiez.de/)`,
	},
};

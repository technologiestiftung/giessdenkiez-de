import { Content } from "./content-types";

const en: Content = {
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
				label: "<strong>Improve this map</strong>",
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
		placeholder: "Search for a place",
	},
	navbar: {
		map: "Map",
		profile: {
			sidebarLabel: "Profile",
			title: "Your profile",
			overview: {
				subtitle: "Your overview",
				irrigations: "Irrigations",
				liter: "Liter",
				adoptedTrees: "Adopted trees",
			},
			adoptedTrees: {
				subtitle: "Adopted trees",
				irrigationTimes: "Times",
				irrigationAmount: "Liter",
				showAll: "Show all",
				showLess: "Show less",
			},
			settings: {
				subtitle: "Profile details",
				username: "Username",
				editUsername: "New username",
				placeholderUser: "Your username",
				updateEmailEmailSent:
					"We sent you an email with a link to both your old and your new email address to confirm the change. Check your mailbox!",
				email: "You email address",
				editEmail: "New email address",
				placeholderMail: "xyz@ts.berlin",
				password: "Password",
				changePassword: "Change password",
				passwordChangeConfirmation:
					'Password changed, press "ok" to go to your profile',
				deleteAccount: "Delete account",
				approve: "Done",
				checkInput: "Please check your input",
				usernameShould: "Your username should: ",
				usernameLength: "be at least 3 characters long",
				onlyNumberAndLetters: "and consist only of characters or numbers",
				usernameTaken: "This username is already taken",
				backToLogin: "Back to login",
				register: "Register",
				existingAccount: "Do you already have an account?",
				logIn: "Login",
				passwordShould: "Your password should contain:",
				passwordLength: "at least 8 characters",
				passwordUpperAndLowerCase: "upper and lower case letters",
				passwordSpecialChar: "at least one special character",
				passwordNumber: "one number",
				logInShort: "Login",
				missingAccount: "Don't have an account yet?",
				registerNow: "Register now",
				forgotYourPassword: "forgot your password?",
				ohNoforgotYourPassword: "Oh no. You",
				passwordForgotten: "Password forgotten",
				resetPasswordEmailSent:
					"Email sent! We sent you an email with a link to reset your password. Check your mailbox!",
				clickHere: "click here",
				resetPassword: "Reset password",
				invalidCredentials: "Invalid credentials",
				deleteAccountConfirm: "Are you sure you want to delete your account?",
			},
			logOut: "Log out",
		},
		info: "Info",
	},
	notFound: {
		title: "404 - Page Not Found",
	},
	info: {
		about: {
			head: {
				question: "About the project",
				answer: `The consequences of climate change, especially the dry and hot summers, are putting a strain on Berlin's ecosystem.
      
Would you like to find out more about watering trees, report pumps and exchange ideas with other active users?

Do you have feedback about Gieß den Kiez?

[Please answer a few questions](https://citylabberlin.typeform.com/to/kCdnCgvC#product_id=GdK)`,
			},
			qa: [
				{
					question: "Useful links",
					answer: `[Favorite Tree Initiative](https://www.lieblingsbaum-initiative.de)
          
[BUND - Watering trees campaign](https://www.bund-berlin.de/mitmachen/aktion-baeume-giessen/)

[Tree care portal - watering in dry conditions](https://www.baumpflegeportal.de/baumpflege/trockenheit-duerre-wann-baeume-giessen/)

[Berlin city tree campaign](https://www.berlin.de/senuvk/umwelt/stadtgruen/stadtbaeume/kampagne/start.shtml)

[Soil moisture Berlin project](https://www.berlin.de/pflanzenschutzamt/stadtgruen/beratung/bewaesserungsempfehlung-fuer-stadtbaeume/)

[Green paper urban green](https://www.bmi.bund.de/SharedDocs/downloads/DE/publikationen/themen/bauen/wohnen/weissbuch-stadtgruen.html)

[City trees - significance and challenges in times of climate change](https://www.hcu-hamburg.de/fileadmin/documents/REAP/files/Bildungsmaterial_Stadtbaeume_im_Klimawandel_2017.pdf)

[BUND - Functions of city trees](https://www.bund-naturschutz.de/natur-und-landschaft/stadt-als-lebensraum/stadtbaeume/funktionen-von-stadtbaeumen.html)`,
				},
				{
					question: "About Us",
					answer: `“Gieß den Kiez” is a project by [CityLAB Berlin](https://www.citylab-berlin.org/).
The CityLAB is a project by the Technologiestiftung Berlin and is funded by the Berlin Senate Chancellery

Exchange ideas with our watering community! We like to hear from you in our [Slack chat](https://join.slack.com/t/giessdenkiez/shared_invite/zt-e3et281u-xON4UmBZpKavzDRkw5HmCQ).

Press inquiries are best addressed  [Anna Hantelmann](mailto:anna.hantelmann@ts.berlin?subject=giessdenkiez.de%20Presseanfrage) Tel.: +4915118457242`,
				},
				{
					question: "Data sources",
					answer: `The map shows the majority of Berlin\`s street and plant trees (839,049 as of May 2023).

[Geoportal Berlin / Street trees](https://fbinter.stadt-berlin.de/fb/berlin/service_intern.jsp?id=s_wfs_baumbestand@senstadt&type=WFS)

[Geoportal Berlin / Plant trees](https://fbinter.stadt-berlin.de/fb/berlin/service_intern.jsp?id=s_wfs_baumbestand_an@senstadt&type=WFS)

[German Weather Service](https://www.dwd.de/)

Pumps off [Open Street Map](https://www.openstreetmap.de)`,
				},
			],
		},
		faq: {
			title: "F.A.Q.",
			description:
				"Based on the lively exchange between our community on Slack and your feedback via email and telephone, we have created a small FAQ. The most frequently asked questions are answered here.",
			qa: [
				{
					question: "How can I participate?",
					answer: `Inform: 
          
Curious which tree is in front of your door? Our interactive map visualizes over 800,000 street and plant trees in Berlin. If you want to find out more about a tree, navigate and zoom to the desired location and click on the colored dot. You will now see a lot of information about the selected tree in the menu ribbon on the left. 
          
Watering and adopting trees: 
          
Do you want to get active or are you already actively watering? On Gieß den Kiez, you can enter whether and with how much water you watered a tree. Trees can also be adopted. The adopted trees appear in your own user profile and can be found more quickly. This allows other neighbors in the area to see which trees need their attention. To water and adopt trees, first create a profile with a valid email address and then log in. Now you can document your watering activities accordingly and see whether and how often trees in your neighborhood have already been watered by other users.
          
Connect: 
          
You can use our public [Slack channel](https://join.slack.com/t/giessdenkiez/shared_invite/zt-e3et281u-xON4UmBZpKavzDRkw5HmCQ) to exchange ideas with other foundries and report defective pumps in your neighborhood.`,
				},
				{
					question: "What can I do if trees are not registered correctly?",
					answer: `We obtain the tree data set with all attributes such as address, tree species and planting year for each tree from the geoportal of the city of Berlin, the FIS broker. The tree register provided in the geoportal is based on the district-aggregated data from the road and green space authorities. It can therefore happen again and again that data from trees is out of date or that properties differ from current reality. Unfortunately, we cannot make any changes to the tree register ourselves. Any deviations can only be reported directly to the responsible district authority. Once a year, the green space authorities publish an updated tree register, which we link to Gieß den Kiez after publication.`,
				},
				{
					question: "Why should I take action and water trees?",
					answer: `The long periods of drought and heat of the last two years have caused immense damage to Berlin's urban greenery. Between 2018 and 2019 alone, over 7,000 trees had to be felled, not solely due to drought damage. 
            
The street and green space authorities are already active, but cannot keep up with the watering during Berlin's hot summers. Since the green space authorities are organized by district, each district works slightly differently, so holistic and needs-based coordination is certainly associated with hurdles. Through the platform, we would also like to give citizens the opportunity to help trees specifically based on their current water supply and to obtain information. The goal is to save as many trees as possible through neighborly involvement.`,
				},
				{
					question: "How do I water correctly?",
					answer: `Depending on their age, location and tree species, trees need different amounts of water. Young trees (0-15 years) need more water than medium-aged trees (15-40 years). Old trees (40 years and older) are usually completely self-sufficient. 
          
Since freshly planted trees up to the age of three are usually supplied with water by the district parks authorities, the trees between four and 15 years in particular need our attention and our water. We have highlighted this with the labels of low, medium or high water requirement. 
          
Based on the Berlin [Manual Good Care](https://www.berlin.de/sen/uvk/natur-und-gruen/stadtgruen/pflegen-und-unterhalten/katalog-good-care/), we recommend you to water rarely, but rather with a larger amount of water. The manual recommends up to 200l per watering for freshly planted trees. In this way, you ensure that the soil moisture is increased even at depth. In the end, even smaller amounts do not hurt, especially in midsummer. It is important to loosen the dried out soil before watering so that the water can penetrate into the soil and does not run off above ground or accumulate incorrectly. So-called watering bags are also recommended, from which the water only emerges very slowly, hardly runs off the surface and therefore continuously seeps into the ground.`,
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
					answer: `To undo a watering, for example because the neighboring tree was watered instead or on a different day, first click on the tree. Scroll down the tree sidebar to the view of past waterings, click the trash can icon next to the entry you want to delete, and click “Delete” to confirm. Only waterings that you have made yourself can be deleted. After deleting, enter the watering with the correct information (number of liters and time).`,
				},
				{
					question: "Can the principle be transferred to other cities?",
					answer: `The “Gieß den Kiez” platform is an open source software project and runs under an MIT license. Accordingly, the idea and also the source code can be used and further developed free of charge for implementation in other cities. If you are interested, please take a look at our [GitHub Repository](https://github.com/technologiestiftung/giessdenkiez-de) or contact us via email.`,
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
				"Gieß den Kiez is an [OpenSource Project](https://github.com/technologiestiftung/giessdenkiez-de)!",
		},
	},
	treeDetail: {
		title: "Tree information",
		adoptIt: "Adopt this tree",
		alsoAdoptedBy: "Also adopted by other users",
		exclusivelyAdoptedBy: "Adopted by other users",
		ageTitle: "Age",
		adoptLoading: "Tree is being adopted...",
		unadoptLoading: "Adoption is being canceled...",
		isAdopted: "You have adopted this tree",
		adoptHintTitle: "Adopt a tree",
		adoptHint:
			"If you regularly water the same tree, you can subscribe to it. This way you can quickly find it in your profile overview.",
		adoptErrorMessage: "Error adopting the tree. Please try again.",
		age: (age: number) => `${age} years`,
		ageUnknown: "Unknown",
		managedBy:
			"This tree is already being cared for by the district office and does not need to be watered.",
		waterNeed: {
			title: "Water requirements",
			hint: "Depending on the age of the tree, the need for water varies.",
			needXLiters: (liters: string) => `Needs ${liters} liters per week`,
			needsOnlyOnDryDays: "Only needs water on dry days",
			waterManaged: "Supplied by the district office",
			unknownTitle: "Water needs unknown",
			unknown:
				"The age and therefore the water requirement are unfortunately unknown. The info box may help you make your own assessment.",
			liters: "liters",
			watered: "watered",
			rained: "rain",
			stillMissing: "still missing",
			dataOfLastXDays: "* data of last 7 days",
			manager: "district",
			alreadyWateredByManager: "Watered by district",
			stillWaterXLiters: (liters: string) => `${liters} liters to water`,
			shouldBeWatered: "Should be watered",
			sufficientlyWatered: "Sufficiently watered at the moment",
			ageAndWaterHintTitle: "Water requirements and age",
			ageAndWaterHint: `
**Baby (under 4 years):**

We are fresh young trees and our thirst is satisfied by the district parks department breastfed.
  
**Young (4-14 years):**

At that age we will no longer be watered by the administration in all districts and are not yet “self-sufficient”. We are happy about lots of water up to 200l per watering (once a week).
     
**Adult (15-40 years):**

We have a certain amount of stamina but we need it in hot phases also a good extra sip of water: up to 100l once a day week.
  
**Old (over 40 years old):**

We manage largely on our own and are happy in particularly dry phases but still about an extra sip.
      `,
			lastXDaysYLitersWater: (days: number, liters: string) =>
				`In the last ${days} days, **${liters} liters** were watered.`,
			lastXDaysYLitersRain: (days: number, liters: string) =>
				`In the last ${days} days, it rained **${liters} liters**.`,
			iWatered: "I watered",
			submitWatering: "Submit watering",
			wateredHowMuch: "How much?",
			wateredWhen: "When?",
			waterSave: "Save",
			waterCancel: "Cancel",
		},
		lastWaterings: {
			title: "Last waterings",
			thisWeek: "This week",
			nothingThisWeek: "No waterings this week",
			thisMonth: "This month",
			nothingThisMonth: "No waterings this month",
			thisYear: "This year",
			nothingThisYear: "No waterings this year",
		},
		problem: {
			title: "Report a problem",
			description:
				"Have you discovered tree damage or is the tree disk being misused? Tell the public order office!",
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
	common: {
		defaultErrorMessage: "Something went wrong! Please try again later.",
	},
};

export default en;

const content = {
	intro: {
		title: '<b>Internet of <span>Trees</span></b>',
		subline: 'Eine <b>partizipatorische Plattform</b> <br/> für die <b>Bewässerung</b> Berlins Baumbestand.',
		description: ['Wir vernetzen die Berliner*innen mit ihren Bäumen. Denn die Berliner Bäume leiden unter den Folgen des Klimawandels und benötigen Deine Unterstützung. Diese Plattform vermittelt einen Überblick über den Berliner Straßenbaumbestand und schafft die Möglichkeit, die Bewässerung der Bäume zu koordinieren.', 'Falls Du die Seite regelmäßig nutzen willst, kannst Du ein Konto erstellen. Den Baumbestand kannst Du aber auch ohne Konto erkunden. Erfahre mehr über das Projekt und erkunde den Baumbestand.']
	},
	sidebar: {
		watering: [
			{
				waterdrops: [1],
				title: 'Geringer Wasserbedarf',
				description: 'Die Linde gilt seit Jahren als der berlintypische Straßenbaum. Mit einem Anteil von gut einem Drittel prägt sie den Straßenbaumbestand. 10 verschiedene Arten lassen sich unterscheiden. Bevorzugt gepflanzt wird die Winter-Linde (Tilia cordata)',
			},
			{
				waterdrops: [1,1],
				title: 'Mittlerer Wasserbedarf',
				description: 'Die Linde gilt seit Jahren als der berlintypische Straßenbaum. Mit einem Anteil von gut einem Drittel prägt sie den Straßenbaumbestand. 10 verschiedene Arten lassen sich unterscheiden. Bevorzugt gepflanzt wird die Winter-Linde (Tilia cordata)',
			},
			{
				waterdrops: [1,1,1],
				title: 'Hoher Wasserbedarf',
				description: 'Die Linde gilt seit Jahren als der berlintypische Straßenbaum. Mit einem Anteil von gut einem Drittel prägt sie den Straßenbaumbestand. 10 verschiedene Arten lassen sich unterscheiden. Bevorzugt gepflanzt wird die Winter-Linde (Tilia cordata)',
			},
		],
		treetypes: [
			{
				id: 'LINDE',
				title: 'Linde (Tilia)',
				description: 'Die Linde gilt seit Jahren als der berlintypische Straßenbaum. Mit einem Anteil von gut einem Drittel prägt sie den Straßenbaumbestand. 10 verschiedene Arten lassen sich unterscheiden. Bevorzugt gepflanzt wird die Winter-Linde (Tilia cordata), die als mittelgroßer Baum auch in schmaleren Straßen noch Raum findet. Die großkronige Kaiserlinde (Tilia intermedia) ist dagegen den weiträumigen Alleen vorbehalten.'
			},
			{
				id: 'AHORN',
				title: 'Ahorn (Acer)',
				description: 'Die Gattung der Ahorne umfasst ca. 20% des Gesamtbestandes. Für den Standort Straße ist vor allem der Spitzahorn (Acer platanoides) geeignet. Die frühe Blüte und die bunte Herbstfärbung machen ihn besonders beliebt.'
			},
			{
				id: 'EICHE',
				title: 'Eiche (Quercus)',
				description: 'Der Anteil der Eichen beträgt rund 9% des Gesamtbestandes. Vor allem wird die Stiel-Eiche (Quercus robur) angepflanzt. Als Lichtbaum ist die Eiche nicht für enge Straßen geeignet. Die jüngsten Alleen im Parlaments- und Regierungsviertel wurden mit der sog. Spree-Eiche (Quercus palustris) bepflanzt, die sich u.a. durch ihre besonders schöne Herbstfärbung auszeichnet.'
			},
			{
				id: 'PLATANE',
				title: 'Platane (Platanus)',
				description: 'Ein idealer Alleebaum für breite Straßen ist die Platane (Platanus acerifolia), die neben einer Höhe von 20 bis 30 m auch einen stattlichen Kronendurchmesser von 15 bis 20 m erreichen kann. Am Gesamtbestand haben die Platanen einen Anteil von etwa 6%. Die bekannteste und mit über 120 Jahren älteste Platanenallee in Berlin ist die Puschkinallee in Berlin-Treptow.'
			},
			{
				id: 'KASTANIE',
				title: 'Kastanie (Aesculus)',
				description: 'Die Rosskastanie (Aesculus hippocastanum) mit ebenfalls einem Anteil von ca. 5% am Gesamtbestand, belegt den fünften Platz unter den Berliner Straßenbäumen.'
			},
		]
	},
	collaborate: {
		title: '<b>Wie kann ich mitmachen?</b>',
		tiles: [
			{
				icon: 'water',
				title: 'Bäume bewässern',
				content: 'Informiere dich auf unserer Plattform, ob die Bäume in deiner Straße Wasser benötigen. Wenn ja, schnapp dir eine Gießkanne, einen Eimer oder einen Schlauch und leg los. Danach trägst du die Bewässerung hier ein.'
			},
			{
				icon: 'subscribe',
				title: 'Bäume abonnieren',
				content: "Wenn du regelmäßig die gleichen Bäume gießen willst, kannst du sie abonnieren und so anzeigen, dass für sie gesorgt ist. So findet eine Koordinierung in der Nachbarschaft statt."
			},
			{
				icon: "zoom",
				title: "Den Baumbestand erkunden",
				content: "Unsere Karte ermöglicht es, mehr über einzelne Bäume und auch den gesamten Baumbestand zu lernen. Nutze die Filter- und Suchfunktion um mehr über die Bäume Berlin zu lernen."
			},
			{
				icon: 'info',
				title: 'Mehr erfahren',
				content: 'Du möchtest mehr zur richtigen Baumpflege erfahren? Oder du hast eine Frage? Bei uns findest du weitere Informationen zu Bäumen und alle Kontakte der bezirklichen Grünflächenämtern.'
			}
		]
	}
}

export default content;
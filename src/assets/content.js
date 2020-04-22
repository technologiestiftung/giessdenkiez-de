const content = {
	intro: {
		title: '<b>Internet of <span>Trees</span></b>',
		subline: 'Eine <b>partizipatorische Plattform</b> <br/> für die <b>Bewässerung</b> Berlins Baumbestand.',
		description: ['Wir vernetzen die Berliner*innen mit ihren Bäumen. Denn die Berliner Bäume leiden unter den Folgen des Klimawandels und benötigen Deine Unterstützung. Diese Plattform vermittelt einen Überblick über den Berliner Straßenbaumbestand und schafft die Möglichkeit, die Bewässerung der Bäume zu koordinieren.', 'Falls Du die Seite regelmäßig nutzen willst, kannst Du ein Konto erstellen. Den Baumbestand kannst Du aber auch ohne Konto erkunden. Erfahre mehr über das Projekt und erkunde den Baumbestand.']
	},
	sidebar: {
		about: [
			{
				title: 'Über das Projekt',
				description: 'Die Folgen des Klimawandels, insbesondere die trockenen und heißen Sommer, belasten das Berliner Ökosystem. Unsere Straßenbäume vertrocknen und tragen langfristige Schäden davon: in den letzten Jahren mussten immer mehr Bäume gefällt werden und ihre Lebensdauer sinkt. Inzwischen wird regelmäßig sogar die Bevölkerung zur Unterstützung aufgerufen, allerdings weitgehend unkoordiniert. Dies möchten wir mit diesem Projekt ändern und die koordinierte Bürger*innenbeteiligung und bei der Bewässerung städtischen Grüns ermöglichen. <br /> <br /> Perspektivisch möchten wir das Projekt erweitern, und zum Beispiel die Bewässerungsbemühungen der Berliner Straßen- und Grünflächenämter abbilden. Außerdem möchten wir weitere Informationen rund um die Berliner Straßenbäume zusammen tragen und zugänglich machen; perspektivisch sollen auch Bürger*innen in der Lage sein, eigene Beobachtungen und Datenerhebungen zu einzelnen Bäumen einzutragen.'
			},
			{
				title: 'Die richtige Bewässerung',
				description: 'Je nach Alter, Standort und Baumart benötigen Bäume unterschiedlich viel Wasser. Jungbäume (0-15 Jahre), benötigen mehr Wasser als mittelalte Bäume (15-40 Jahre), und Altbäume (ab 40 Jahre) sind komplette Selbstversorger. Da frisch gepflanzte Bäume bis zum Alter von drei Jahren von der Berliner Verwaltung mit Wasser versorgt werden, benötigen besonders die Bäume zwischen vier und 15 Jahren unsere Aufmerksamkeit, beziehungsweise unser Wasser. Dies haben wir mit den Kennzeichungen des geringen, mittleren oder hohen Wasserbedarfs hervorgehoben. <br /> <br /> Angelehnt an das Berliner <a target="blank" href="https://www.berlin.de/senuvk/umwelt/stadtgruen/pflege_unterhaltung/de/hgp/index.shtml">Handbuch Gute Pflege</a> empfehlen wir euch, lieber seltener zu wässern, dafür mit einer größeren Menge an Wasser. Das Handbuch empfiehlt für frisch gepflanzte Bäume bis zu 200l pro Gießung. So sorgt ihr dafür, dass die Bodenfeuchte auch in der Tiefe erhöht wird. Im Endeffekt schaden aber auch kleinere Mengen gerade im Hochsommer nicht. Wichtig ist es, den ausgetrockneten Boden vor dem Gießen aufzulockern, sodass das Wasser in den Boden eindringen kann und nicht wegläuft oder sich falsch anstaut. '
			},
			{
				title: 'Über uns',
				description: '“Internet of Trees” ist ein Projekt des CityLAB Berlin, einem Experimentierlabor für die Stadt der Zukunft. Ein ständig wachsendes Netzwerk aus Verwaltung, Zivilgesellschaft, Wissenschaft und Start-ups arbeitet im CityLAB gemeinsam an neuen Ideen für ein lebens­werteres Berlin. Wir sehen Digitalisierung als Chance, Prozesse neu zu denken, Barrieren abzubauen und neue Formen gesellschaftlicher Teilhabe zu schaffen. All dies versuchen wir in diesem Projekt vorzuleben. Das CityLAB ist ein Projekt der Technologiestiftung Berlin und wird finanziert durch die Senatskanzlei des Landes Berlin. Evtl. auf weiter Partner eingehen: Birds'
			},
		],
		watering: [
			{
				waterdrops: [1],
				title: 'Geringer Wasserbedarf',
				description: 'Straßenbäume höheren Alters (>40 Jahre) haben in der Regel gelernt, sich über das Grundwasser selbst zu versorgen und benötigen keine zusätzliche Unterstützung. Einen niedrigen Wasserbedarf haben außerdem Jungbäume unter 3 Jahren, da diese durch die städtische Verwaltung versorgt werden. ',
			},
			{
				waterdrops: [1,1],
				title: 'Mittlerer Wasserbedarf',
				description: 'Mittelalte Bäume zwischen 15 und 40 Jahren werden nicht mehr standardmäßig durch die Stadtverwaltung bewässert, sind aber auch schon etabliert genug, um sich in der Regel selbst zu versorgen. Sie freuen sich trotzdem über jede Gießkanne.',
			},
			{
				waterdrops: [1,1,1],
				title: 'Hoher Wasserbedarf',
				description: 'Jungbäume zwischen 4 und 15 Jahren sind zu alt, um von den Straßen- und Grünflächenämtern standardmäßig bewässert zu werden, aber noch nicht alt genug, um sich in Hitzesommern selbst zu versorgen. Sie freuen sich über viel Wasser von bis zu 200l pro Gießung (alle 10 Tage).',
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
const content = {
	intro: {
		title: '<b>Internet der <span>Bäume</span></b>',
		subline: 'Gieß deinen Kiez!',
		description: ['Die Berliner Stadtbäume leiden unter Trockenheit und Du kannst Ihnen helfen! Auf dieser Plattform kannst Du: <ul><li>Dich über Bäume in deiner Nachbarschaft und ihren Wasserbedarf informieren</li><li>einzelne Bäume abonnieren und markieren, wenn Du sie gegossen hast</li><li>Dich über das richtige Gießen von Stadtbäumen informieren.</li></ul>', 'Wenn Du die Seite regelmäßig nutzen möchtest, solltest Du ein Konto erstellen. Die Karte kannst Du aber auch ohne Konto erkunden.']
	},
	sidebar: {
		about: [
			{
				title: 'Über das Projekt',
				description: 'Die Folgen des Klimawandels, insbesondere die trockenen und heißen Sommer, belasten das Berliner Ökosystem. Unsere Straßenbäume vertrocknen und tragen langfristige Schäden davon: in den letzten Jahren mussten immer mehr Bäume gefällt werden und ihre Lebensdauer sinkt. Inzwischen wird regelmäßig sogar die Bevölkerung zur Unterstützung aufgerufen, allerdings weitgehend unkoordiniert. Dies möchten wir mit diesem Projekt ändern und die koordinierte Bürger*innenbeteiligung und bei der Bewässerung städtischen Grüns ermöglichen.'
			},
			{
				title: 'Die richtige Bewässerung',
				description: 'Je nach Alter, Standort und Baumart benötigen Bäume unterschiedlich viel Wasser. Jungbäume (0-15 Jahre), benötigen mehr Wasser als mittelalte Bäume (15-40 Jahre), und Altbäume (ab 40 Jahre) sind komplette Selbstversorger. Da frisch gepflanzte Bäume bis zum Alter von drei Jahren von der Berliner Verwaltung mit Wasser versorgt werden, benötigen besonders die Bäume zwischen vier und 15 Jahren unsere Aufmerksamkeit, beziehungsweise unser Wasser. Dies haben wir mit den Kennzeichungen des geringen, mittleren oder hohen Wasserbedarfs hervorgehoben. <br /> <br /> Angelehnt an das Berliner <a target="blank" href="https://www.berlin.de/senuvk/umwelt/stadtgruen/pflege_unterhaltung/de/hgp/index.shtml">Handbuch Gute Pflege</a> empfehlen wir euch, lieber seltener zu wässern, dafür mit einer größeren Menge an Wasser. Das Handbuch empfiehlt für frisch gepflanzte Bäume bis zu 200l pro Gießung. So sorgt ihr dafür, dass die Bodenfeuchte auch in der Tiefe erhöht wird. Im Endeffekt schaden aber auch kleinere Mengen gerade im Hochsommer nicht. Wichtig ist es, den ausgetrockneten Boden vor dem Gießen aufzulockern, sodass das Wasser in den Boden eindringen kann und nicht wegläuft oder sich falsch anstaut.'
			},
			{
				title: 'Warum sind nicht alle Bäume auf der Karte verzeichnet?',
				description: 'Unsere Plattform nutzt die offenen Daten des Berliner Baumkatasters, der von den Grünflächenämtern der Berliner Bezirke gepflegt wird. Aus verschiedenen Gründen sind dort nicht alle Berliner Stadtbäume aufgeführt. Wir arbeiten aber daran, die Datenlage zu verbessern und eine möglichst vollständige Darstellung des Berliner Baumbestandes zu erreichen.'
			},
			{
				title: 'Nützliche Links',
				description: '<ul><li><a target="blank" href="https://www.bund-berlin.de/mitmachen/aktion-baeume-giessen/">BUND - Aktion Bäume gießen</a></li><li><a target="blank" href="https://www.baumpflegeportal.de/baumpflege/trockenheit-duerre-wann-baeume-giessen/">Baumpflegeportal - Gießen bei Trockenheit</a></li><li><a target="blank" href="https://www.berlin.de/senuvk/umwelt/stadtgruen/stadtbaeume/kampagne/start.shtml">Stadtbaumkampagne Berlin</a></li><li><a target="blank" href="https://www.berlin.de/pflanzenschutzamt/stadtgruen/beratung/bewaesserungsempfehlung-fuer-stadtbaeume/">Projekt Bodenfeuchte Berlin</a></li><li><a target="blank" href="https://www.bmi.bund.de/SharedDocs/downloads/DE/publikationen/themen/bauen/wohnen/weissbuch-stadtgruen.html">Grünbuch Stadtgrün</a></li><li><a target="blank" href="https://www.hcu-hamburg.de/fileadmin/documents/REAP/files/Bildungsmaterial_Stadtbaeume_im_Klimawandel_2017.pdf">Stadtbäume - Bedeutung und Herausforderungen in Zeiten des Klimawandels</a></li><li><a target="blank" href="https://www.bund-naturschutz.de/natur-und-landschaft/stadt-als-lebensraum/stadtbaeume/funktionen-von-stadtbaeumen.html">BUND - Funktionen von Stadtbäumen</a></li></ul>'
			},
			{
				title: 'Über uns',
				description: '“Internet der Bäume” ist ein Projekt des <a target="blank" href="https://www.citylab-berlin.org/">CityLAB Berlin</a>. Das CityLAB ist ein öffentliches Innovationslabor für die Stadt der Zukunft im ehemaligen Flughafen Berlin-Tempelhof. Gemeinsam mit einem großen Netzwerk aus Verwaltung, Zivilgesellschaft, Wissenschaft und Start-ups arbeiten wir an neuen Ideen für ein lebenswertes Berlin. Das CityLAB ist ein offener Ort zum Mitmachen! Wenn ihr mehr wissen wollt, schaut euch auf unserer Webseite um oder kommt einfach mal vorbei! <br /> <br /> Das CityLAB ist ein Projekt der Technologiestiftung Berlin und wird finanziert durch die Berliner Senatskanzlei.'
			},
		],
		watering: [
			{
				waterdrops: [1],
				title: 'Niedriger Wasserbedarf',
				description: 'Straßenbäume höheren Alters (>40 Jahre) haben in der Regel gelernt, sich über das Grundwasser selbst zu versorgen und benötigen keine zusätzliche Unterstützung. Einen niedrigen Wasserbedarf haben außerdem Jungbäume unter 3 Jahren, da diese im Normalfall durch die bezirklichen Grünflächenämter versorgt werden.',
			},
			{
				waterdrops: [1,1],
				title: 'Mittlerer Wasserbedarf',
				description: 'Mittelalte Bäume zwischen 15 und 40 Jahren werden in der Regel nicht mehr durch die Grünflächenämter  bewässert, haben aber schon ein gewisses Durchhaltevermögen. Sie freuen sich trotzdem über jede Gießkanne.',
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
				content: 'Informiere dich auf unserer Plattform, ob die Bäume in deiner Straße Wasser benötigen. Wenn ja, schnapp dir eine Gießkanne, einen Eimer oder einen Schlauch und leg los. Danach trägst du die Bewässerung hier ein. '
			},
			{
				icon: 'subscribe',
				title: 'Bäume abonnieren',
				content: "Wenn du regelmäßig die gleichen Bäume gießen willst, kannst du sie abonnieren und so anzeigen, dass für sie gesorgt ist. So findet eine Koordinierung in der Nachbarschaft statt."
			},
			{
				icon: "zoom",
				title: "Den Baumbestand erkunden",
				content: "Unsere Karte ermöglicht es, mehr über einzelne Bäume und auch den gesamten Baumbestand zu erfahren. Nutze die Filter- und Suchfunktion um mehr über die Bäume Berlins zu lernen."
			},
			{
				icon: 'info',
				title: 'Mehr erfahren',
				content: 'Du möchtest mehr zur richtigen Baumpflege erfahren?  Bei uns findest du zahlreiche nützliche Links, Kontaktadressen und Hinweise, wie Du dich bei der Bewässerung der Berliner Stadtbäume einbringen kannst.'
			}
		]
	}
}

export default content;
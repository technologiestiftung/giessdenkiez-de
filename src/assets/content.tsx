import { Content, LocalizedContent } from './content-types';

const deContent: Content = {
  faq: {
    title: 'F.A.Q.',
    description:
      'Basierend auf dem regen Austausch unserer Community auf Slack & euren Rückmeldungen per Email und Telefon, haben wir ein kleines FAQ angelegt. Hier werden die am häuftigsten gestellten Fragen beantwortet.',
    qa: [
      {
        question: 'Wie kann ich mitmachen?',
        answer:
          'Informieren: <br><br>Neugierig, welcher Baum vor Deiner Tür steht? Unsere interaktive Karte visualisiert über 800.000 Straßen- und Anlagenbäume Berlins. Wenn Du mehr über einen Baum erfahren willst, navigiere und zoome Dich zum gewünschten Standort und klicke auf den farbigen Punkt. Nun werden Dir im Menüband links zahlreiche Informationen zum ausgewählten Baum angezeigt. <br><br>Bäume bewässern und adoptieren: <br><br>Du möchtest aktiv werden oder bist bereits aktiv am Gießen? Auf Gieß den Kiez kannst Du eintragen, ob und mit wie viel Wasser Du einen Baum gegossen hast. Bäume können auch adoptiert werden. Die adoptierten Bäume erscheinen im eigenen Nutzerprofil und können schneller wiedergefunden werden. So können andere Nachbarn in der Umgebung sehen, welche Bäume ihre Aufmerksamkeit benötigen. Um Bäume zu bewässern und zu adoptieren, lege dazu zunächst ein Profil mit einer gültigen Email-Adresse an und logge Dich im Anschluss ein. Nun kannst Du deine Gieß-Aktionen entsprechend dokumentieren und sehen, ob und wie oft Bäume in deinem Kiez bereits von anderen Nutzer:innen gegossen wurden. <br><br>Vernetzen: <br><br>Über unseren öffentlichen <a target="blank" href="https://join.slack.com/t/giessdenkiez/shared_invite/zt-e3et281u-xON4UmBZpKavzDRkw5HmCQ">Slack Channel</a> kannst Du dich mit anderen Gießer:innen austauschen und defekte Pumpen in deinem Kiez melden.',
      },
      {
        question:
          'Was kann ich tun, wenn Bäume nicht richtig eingetragen sind?',
        answer:
          'Wir beziehen den Baum-Datensatz mit allen Attributen wie bspw. Adresse, Baumart und Pflanzjahr je Baum aus dem Geoportal der Stadt Berlin, dem FIS-Broker. Das im Geoportal bereitgestellte Baumkataster basiert wiederum auf den bezirklich aggregierten Daten der Straßen- und Grünflächenämter. Es kann daher immer wieder vorkommen, dass Daten von Bäumen veraltet sind oder Eigenschaften der tagesaktuellen Realität abweichen. Leider können wir selbst keine Änderungen im Baumkataster vornehmen. Etwaige Abweichungen können nur direkt bei der zuständigen bezirklichen Behörde gemeldet werden. Einmal im Jahr veröffentlichen die Grünflächenämter aber ein aktualisiertes Baumkataster, das wir nach Veröffentlichung mit Gieß den Kiez verknüpfen.',
      },
      {
        question: 'Warum sollte ich aktiv werden und Bäume gießen?',
        answer:
          'Die langanhaltenden Dürre- und Hitzeperioden der letzten zwei Jahre haben dem Stadtgrün Berlins immens zugesetzt. Wenngleich nicht nur auf Trockenschäden zurückzuführen, mussten allein im Zeitraum zwischen 2018 und 2019 über 7.000 Bäume gefällt werden. <br><br>Die Straßen- und Grünflächenämter sind bereits aktiv, kommen allerdings mit dem Gießen während Berliner Hitze-Sommern nicht hinterher. Da die Grünflächenämter bezirklich organisiert sind, arbeitet jeder Bezirk etwas anders, sodass eine ganzheitliche und bedarfsgerechte Koordination durchaus mit Hürden verbunden ist. Durch die Plattform möchten wir auch Bürger:innen die Möglichkeit geben, Bäumen gezielt auf Grundlage ihrer aktuellen Wasserversorgung zu helfen und sich zu informieren. Ziel ist es, möglichst viele Bäume durch nachbarschaftliches Engagement zu retten.',
      },
      {
        question: 'Wie gieße ich richtig?',
        answer:
          'Je nach Alter, Standort und Baumart benötigen Bäume unterschiedlich viel Wasser. Jungbäume (0-15 Jahre), benötigen mehr Wasser als mittelalte Bäume (15-40 Jahre). Altbäume (ab 40 Jahre) sind meist komplette Selbstversorger. <br><br>Da frisch gepflanzte Bäume bis zum Alter von drei Jahren in der Regel von den bezirklichen Grünflächenämtern mit Wasser versorgt werden, benötigen besonders die Bäume zwischen vier und 15 Jahren unsere Aufmerksamkeit, beziehungsweise unser Wasser. Dies haben wir mit den Kennzeichnungen des geringen, mittleren oder hohen Wasserbedarfs hervorgehoben. <br><br>Angelehnt an das Berliner <a target="blank" href="https://www.berlin.de/sen/uvk/natur-und-gruen/stadtgruen/pflegen-und-unterhalten/handbuch-gute-pflege/">Handbuch Gute Pflege</a> empfehlen wir euch, lieber selten, dafür mit größeren Menge an Wasser zu gießen. Das Handbuch empfiehlt für frisch gepflanzte Bäume bis zu 200l pro Gießung. So sorgt ihr dafür, dass die Bodenfeuchte auch in der Tiefe erhöht wird. Im Endeffekt schaden aber auch kleinere Mengen gerade im Hochsommer nicht. Wichtig ist es, den ausgetrockneten Boden vor dem Gießen aufzulockern, sodass das Wasser in den Boden eindringen kann und nicht oberirdisch abläuft oder sich falsch anstaut. Auch zu empfehlen sind sogenannte Gießsäcke aus denen das Wasser nur sehr langsam austritt, kaum oberflächlich abläuft und somit kontinuierlich in den Boden sickert.',
      },
      {
        question:
          'An wen kann ich mich wenden, wenn Pumpen kaputt oder beschädigt sind?',
        answer: `Für die Infrastruktur der Straßen, zu denen auch die öffentlichen Schwengelpumpen zählen, sind die jeweiligen Straßen- und Grünflächenämter der Bezirke verantwortlich. Sollten Pumpen kaputt oder beschädigt sein, kann dort Reparaturbedarf gemeldet werden. Die Standorte der Pumpen in der Karte laden wir wöchentlich aus der Datenbank von Open Street Map. Wenn Ihr helfen wollt, die Daten zu verbessern, indem ihr zum Beispiel eine defekte Pumpe meldet, könnt ihr das in unserem <a target="blank" href="https://app.slack.com/client/T012K4SDYBY/C019SJQDPL7">Slack Channel #pumpen-melden </a> tun. Die OSM-Community hat dann die Möglichkeit eure Informationen in die Datenbank einzutragen.`,
      },
      {
        question: 'Wie wird mit technischen Problemen umgegangen?',
        answer:
          'Bei der Beteiligungsplattform „Gieß den Kiez” handelt es sich um einen Prototypen und demnach um eine Beta-Version einer Web-App. Wir sind uns einigen technischen Hürden bewusst, sind aber auf eure Mithilfe angewiesen. Euer technisches Feedback und eure Fragen nehmen wir gerne in unserem <a target="blank" href="https://join.slack.com/t/giessdenkiez/shared_invite/zt-e3et281u-xON4UmBZpKavzDRkw5HmCQ">Slack Channel</a> oder per Mail entgegen. Wer sich in der „Tech-Welt” zu Hause fühlt, ist herzlich zur Mitarbeit in unserem <a target="blank" href="https://github.com/technologiestiftung/giessdenkiez-de">Open Source GitHub Repository</a> eingeladen und kann seine Issues oder Code Fixes direkt in das Repository kommentieren.',
      },
      {
        question: 'Warum lädt die Website nicht oder nur sehr langsam?',
        answer:
          'Wenn die Seite zum ersten Mal geöffnet wird, lädt der Browser über 800.000 Datenpunkte – das kann eine Weile dauern! Unabhängig davon, kann es zu leicht unterschiedlichen  Darstellungen bei der Verwendung unterschiedlicher Browser kommen. Für die beste „Experience” empfehlen wir die Nutzung von Chrome oder Firefox Desktop. Die häufigsten Probleme lassen sich erfahrungsgemäß beseitigen, wenn der Browser nicht veraltet, respektive die neueste Version installiert ist und eine stabile Internetverbindung (LAN oder WLAN) besteht. <br><br>Die Nutzung über das Smartphone (Mobilfunknetz) kann zu Performance-Problemen (Seite lädt langsam) führen. Sollten wiederholt Probleme auftreten, könnt ihr diese in unserem <a target="blank" href="https://join.slack.com/t/giessdenkiez/shared_invite/zt-e3et281u-xON4UmBZpKavzDRkw5HmCQ">Slack Channel</a>, per Mail oder via GitHub Issue unter Angabe des benutzten Geräts, des Betriebssystems, des Browsers und Version des Browsers melden.',
      },
      {
        question:
          'Was tun, wenn ich einen Baum fälschlicherweise gegossen habe?',
        answer:
          'Um eine Gießung rückgängig zu machen, weil bspw. stattdessen der Nachbarbaum oder zu einem anderen Tag gegossen wurde, klicke zunächst auf den Baum. Scrolle in der Seitenleiste des Baumes runter bis zur Ansicht der vergangenen Gießungen, klicke auf das Papierkorb-Symbol neben dem Eintrag, den Du löschen möchtest und klicke auf „Löschen”, um zu bestätigen. Es können nur Gießungen gelöscht werden, die Du selbst vorgenommen hast. Trage nach der Löschung die Gießung mit den richtigen Angaben (Anzahl an Litern und Zeitpunkt) ein.',
      },
      {
        question: 'Ist das Prinzip auf andere Städte übertragbar?',
        answer:
          'Die „Gieß den Kiez” Plattform ist ein Open Source Software Projekt und läuft unter einer MIT Lizenz. Dementsprechend kann die Idee, aber auch der Quellcode für die Umsetzung in anderen Städten kostenlos genutzt und weiterentwickelt werden. Wenn Du Dich dafür interessierst, schau gerne in unserem <a target="blank" href="https://github.com/technologiestiftung/giessdenkiez-de">GitHub Repository</a> vorbei oder kontaktiere uns via Mail.',
      },
      {
        question: 'Ich habe immer noch eine Frage!',
        answer:
          'Das FAQ konnte Dir nicht weiterhelfen oder Du hast eine komplexere Anfrage? Dann schreib uns eine <a href="mailto:giessdenkiez@citylab-berlin.org?subject=[Giess Den Kiez] Frage:...">Email.</a>',
      },
      {
        question: 'Warum werden nicht alle Bäume Berlins angezeigt?',
        answer:
          'Gieß den Kiez baut auf dem Baumkataster auf. Das Baumkataster ist ein Verzeichnis der Stadt, in dem (Stadt-/Straßen- oder Park-)Bäume verwaltet werden und das durch die Straßen- und Grünflächenämter bereitgestellt wird. Das Straßen- und Grünflächenamt ist aber nicht für alle Bäume Berlins zuständig. Die Bäume im Plänterwald beispielsweise unterliegen dem Forstamt. Diese Bäume tauchen daher bei Gieß den Kiez nicht auf.',
      },
      {
        question: 'I don’t speak any German: What’s going on here?',
        answer:
          'Gieß den Kiez is a participatory platform where you can inform yourself about the trees in your neighbourhood and their water needs. You can explore individual trees in Berlin and find out about the proper watering of trees. If you want to water the same trees regularly, you should create an account, adopt the trees and show that they are taken care of. This way, coordination takes place in the neighbourhood.',
      },
    ],
  },
  imprintAndPrivacy: {
    title: 'Impressum und Datenschutz',
    description:
      '<a target="blank" href="https://www.technologiestiftung-berlin.de/de/impressum/">Impressum</a> – <a target="blank" href="https://www.technologiestiftung-berlin.de/de/datenschutz/">Datenschutz</a>',
    attribution:
      '© <a href="https://www.mapbox.com/about/maps/" target="_blank" rel="noreferrer">Mapbox</a> – © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a> – <a href="https://www.mapbox.com/map-feedback" target="_blank" rel="noreferrer"><strong>Diese Karte verbessern</strong></a> – <a href="https://citylabberlin.typeform.com/to/kCdnCgvC#product_id=GdK" target="_blank" rel="noreferrer">Feedback</a>',
  },
  intro: {
    title: '<b>Gieß den <span>Kiez</span></b>',
    subline:
      'Die Berliner Stadtbäume leiden unter Trockenheit <br class="large" /> und Du kannst ihnen helfen!',
    description: [
      'Erkundige Dich über den Wasserbedarf der Bäume in Deiner Nachbarschaft, adoptiere den Baum vor Deiner Haustür und werde Teil der aktiven Gieß-Community in Berlin!',
    ],
    action: "Los geht's",
  },
  credits: {
    projectOf: 'Ein Projekt der',
    executedBy: 'Durchgeführt von',
    fundedBy: 'Gefördert durch',
  },
  cookies: {
    disclaimer:
      'Diese Webseite verwendet Cookies, um bestimmte Funktionen zu ermöglichen und das Angebot zu verbessern. Indem Du hier fortfährst stimmst Du der Nutzung von Cookies zu.',
    accept: 'Einverstanden',
    info: 'Weitere Informationen',
  },
  legend: {
    pumps: 'Öffentliche Pumpen',
    precipitation: 'Niederschlag',
    precipitationAreas: 'Niederschlagsflächen',
    dataPoints: 'Datenpunkte',
    treeLayer: 'Straßen- & Anlagenbäume',
    ofLastDays: 'der letzten 30 Tage (Liter)',
    pumpState: {
      working: 'funktionsfähig',
      defect: 'defekt',
      locked: 'verriegelt',
      unknown: 'unbekannt',
    },
  },
  //pls do not delete the following eventNote section to facilitate process of enabling/disabling future news & notes
  // eventNote: {
  //   title:
  //     '<b>Gieß den Kiez Maintenance: </b><br> Nach dem Herbstputz ist uns aufgefallen, daß auch unser Datenbank etwas aufgeräumt werden muss. Daher werden wir am 29.11.2022 von 11:00 bis 16:00 Uhr die Plattform für Wartungsarbeiten abschalten. Wir bitten um euer Verständnis.',
  // },
  // whatsNew: {
  //   title: 'Gieß den Kiez Update:',
  //   description: [
  //     '<strong>Der Frühjahrsputz ist voll im Gange!</strong> In den letzten Tagen haben wir ein großes Update an der Seite vorgenommen. Ihr könnt euch über viele kleine und große Verbesserungen freuen: Wir erleichtern die Übertragbarkeit von Giess den Kiez für andere Städte, ermöglichen Euch die Anpassung Eurer E-Mail-Adresse oder Eures Passwortes und noch einiges mehr. Wir haben bereits all eure Accounts in unser neues System übertragen und beobachten ob Fehler auftauchen, die wir nicht vorhersehen konnten.',
  //     'Für den Fall, dass irgendetwas schief geht, zögert nicht euch an uns zu wenden. Per Slack, per E-Mail oder auf GitHub.<br /><strong>Und zu guter Letzt - das neue Baumkataster für 2023 ist da! \\o/</strong> Es sind circa 40.000 Bäume hinzugekommen, die in den nächsten Tagen auch auf der Seite verfügbar sind!<br/> Viel Spaß beim Gießen!',
  //     // `Auch neu: die <strong>Caretaker-Labels im Bezirk Friedrichshain-Kreuzberg</strong>. Vielleicht findet Ihr ja einen der knapp 1.500 Bäume, die bereits durch das Grünflächenamt gegossen werden! Das Label befindet sich in der Seitenleiste eines Baumes.`,
  //   ],
  // },
  loading: {
    snippets: [
      'Wir laden gerade 839.049 Bäume aus dem Berliner Baumbestand.',
      'Wenn Du diese Seite über das Mobilfunknetz aufrufst, kann es etwas dauern.',
      'Sammle Informationen aller Bäume aus Berlins Baumkataster.',
      'Schon gewusst? Ein Stadtbaum benötigt etwa 70l Wasser in der Woche.',
    ],
  },
  sidebar: {
    about: [
      {
        title: 'Über das Projekt',
        description:
          'Die Folgen des Klimawandels, insbesondere die trockenen und heißen Sommer, belasten das Berliner Ökosystem. Unsere Stadtbäume vertrocknen und tragen langfristige Schäden davon: In den letzten Jahren mussten immer mehr Bäume gefällt werden und ihre Lebensdauer sinkt. Inzwischen wird die Bevölkerung regelmäßig zur Unterstützung aufgerufen, allerdings weitgehend unkoordiniert. Dies möchten wir ändern und mit diesem Projekt eine koordinierte Bürger*innenbeteiligung bei der Bewässerung städtischen Grüns ermöglichen.<br/><br/>Du möchtest Dich über das Gießen von Bäumen informieren, Pumpen melden und Dich mit anderen aktiven Nutzer:innen austauschen? Dann tritt unserem Slack-Chat bei!<br/><br/>Du hast Feedback zu Gieß den Kiez?<br/><a target="_blank" rel="noreferrer" href="https://citylabberlin.typeform.com/to/kCdnCgvC#product_id=GdK">Beantworte uns gerne ein paar Fragen.</a>',
      },
      {
        title: 'Nützliche Links',
        description:
          '<ul><li><a target="blank" href="https://www.lieblingsbaum-initiative.de/">Initiative Lieblingsbaum</a></li><li><a target="blank" href="https://www.bund-berlin.de/mitmachen/aktion-baeume-giessen/">BUND - Aktion Bäume gießen</a></li><li><a target="blank" href="https://www.baumpflegeportal.de/baumpflege/trockenheit-duerre-wann-baeume-giessen/">Baumpflegeportal - Gießen bei Trockenheit</a></li><li><a target="blank" href="https://www.berlin.de/senuvk/umwelt/stadtgruen/stadtbaeume/kampagne/start.shtml">Stadtbaumkampagne Berlin</a></li><li><a target="blank" href="https://www.berlin.de/pflanzenschutzamt/stadtgruen/beratung/bewaesserungsempfehlung-fuer-stadtbaeume/">Projekt Bodenfeuchte Berlin</a></li><li><a target="blank" href="https://www.bmi.bund.de/SharedDocs/downloads/DE/publikationen/themen/bauen/wohnen/weissbuch-stadtgruen.html">Grünbuch Stadtgrün</a></li><li><a target="blank" href="https://www.hcu-hamburg.de/fileadmin/documents/REAP/files/Bildungsmaterial_Stadtbaeume_im_Klimawandel_2017.pdf">Stadtbäume - Bedeutung und Herausforderungen in Zeiten des Klimawandels</a></li><li><a target="blank" href="https://www.bund-naturschutz.de/natur-und-landschaft/stadt-als-lebensraum/stadtbaeume/funktionen-von-stadtbaeumen.html">BUND - Funktionen von Stadtbäumen</a></li></ul>',
      },
      {
        title: 'Über uns',
        description: `„Gieß den Kiez” ist ein Projekt des <a target="blank" href="https://www.citylab-berlin.org/">CityLAB Berlin</a>. Das CityLAB ist ein öffentliches Innovationslabor für die Stadt der Zukunft im ehemaligen Flughafen Berlin-Tempelhof. Gemeinsam mit einem großen Netzwerk aus Verwaltung, Zivilgesellschaft, Wissenschaft und Start-ups arbeiten wir an neuen Ideen für ein lebenswertes Berlin. Das CityLAB ist ein offener Ort zum Mitmachen! Wenn ihr mehr wissen wollt, schaut euch auf unserer Webseite um oder kommt einfach mal vorbei! <br /> <br /> Das CityLAB ist ein Projekt der Technologiestiftung Berlin und wird gefördert durch die Berliner Senatskanzlei. <br /> <br /> Tausche Dich mit unserer Gieß-Community aus! Wir würden uns sehr darüber freuen, in unserem dafür eingerichteten <a target="blank" href="https://join.slack.com/t/giessdenkiez/shared_invite/zt-e3et281u-xON4UmBZpKavzDRkw5HmCQ">Slack-Chat</a> von Dir zu hören.<br /> <br />Presseanfragen gehen am besten an:<br /> Anna Hantelmann<br /><a href="mailto:anna.hantelmann@ts.berlin?subject=giessdenkiez.de%20Presseanfrage">anna.hantelmann@ts.berlin</a><br />
          <a href="tel:+4915118457242 ">Tel.: +49 151 18457 242 </a>`,
      },
      {
        title: 'Datenquellen',
        description: `Die Karte zeigt einen Großteil der Berliner Straßen- und Anlagenbäume (839.049; Stand: Mai 2023). Zusätzlich wird abgebildet, wie viel Niederschlag in den letzten 30 Tagen bei jedem Baum gefallen ist und ob diese in der Zeit bereits gegossen wurden. Aus verschiedenen Gründen sind leider noch nicht alle Berliner Stadtbäume aufgeführt. Wir arbeiten aber daran, die Datenlage zu verbessern und eine möglichst vollständige Darstellung des Berliner Baumbestandes zu erreichen. Die aktuellen Datenquellen sind:
          <ul>
            <li>
              <a target="blank" href="https://fbinter.stadt-berlin.de/fb/berlin/service_intern.jsp?id=s_wfs_baumbestand@senstadt&type=WFS">Geoportal Berlin / Straßenbäume</a>
            </li>
            <li>
              <a target="blank" href="https://fbinter.stadt-berlin.de/fb/berlin/service_intern.jsp?id=s_wfs_baumbestand_an@senstadt&type=WFS">Geoportal Berlin / Anlagenbäume</a>
            </li>
            <li>
              <a target="blank" href="https://www.dwd.de/">Deutscher Wetterdienst</a>
            </li>
            <li>Pumpen aus <a target="blank" href=" https://www.openstreetmap.de"> Open Street Map</a>
            </li>
          </ul>`,
      },
    ],
    waterNeeds: [
      {
        title: 'Niedriger Wasserbedarf',
        description:
          'Straßenbäume höheren Alters (>40 Jahre) haben in der Regel gelernt, sich über das Grundwasser selbst zu versorgen, aber auch sie leiden unter der zunehmenden Hitze und freuen sich über zusätzliches Wasser. Jungbäume unter 3 Jahren hingegen haben einen niedrigen Wasserbedarf, da diese im Normalfall durch die bezirklichen Grünflächenämter versorgt werden.',
      },
      {
        title: 'Mittlerer Wasserbedarf',
        description:
          'Mittelalte Bäume zwischen 15 und 40 Jahren werden in der Regel nicht mehr durch die Grünflächenämter bewässert, haben aber schon ein gewisses Durchhaltevermögen. Aber auch für sie sind die Hitzesommer ungewohnt und sie freuen sich über jeden Eimer: Gerne ein Mal in der Woche mit bis zu 100l gießen. ',
      },
      {
        title: 'Hoher Wasserbedarf',
        description:
          'Jungbäume zwischen vier und 15 Jahren werden nicht in allen Bezirken von der Verwaltung bewässert und sind noch keine „Selbstversorger“. Sie freuen sich über viel Wasser von bis zu 200l pro Gießung (ein Mal in der Woche).',
      },
    ],
    treetypes: [
      {
        id: 'LINDE',
        title: 'Linde (Tilia)',
        description:
          'Die Linde gilt seit Jahren als der berlintypische Straßenbaum. Mit einem Anteil von gut einem Drittel prägt sie den Straßenbaumbestand. Insgesamt lassen sich 10 verschiedene Arten unterscheiden. Bevorzugt gepflanzt wird die Winter-Linde (Tilia cordata), die als mittelgroßer Baum auch in schmaleren Straßen noch Raum findet. Die großkronige Kaiserlinde (Tilia intermedia) ist dagegen den weiträumigen Alleen vorbehalten.',
      },
      {
        id: 'AHORN',
        title: 'Ahorn (Acer)',
        description:
          'Die Gattung der Ahorne umfasst ca. 20% des Gesamtbestandes. Für den Standort „Straße” ist vor allem der Spitzahorn (Acer platanoides) geeignet. Die frühe Blüte und die bunte Herbstfärbung machen den Ahorn zu einer besonders beliebten Baumgattung.',
      },
      {
        id: 'EICHE',
        title: 'Eiche (Quercus)',
        description:
          'Der Anteil der Eichen beträgt rund 9% des Gesamtbestandes. In Berlin wird vor allem die Stiel-Eiche (Quercus robur) angepflanzt. Als Lichtbaum ist die Eiche nicht für enge Straßen geeignet. Die jüngsten Alleen im Parlaments- und Regierungsviertel wurden mit der sog. Spree-Eiche (Quercus palustris) bepflanzt, die sich u.a. durch ihre besonders schöne Herbstfärbung auszeichnet.',
      },
      {
        id: 'PLATANE',
        title: 'Platane (Platanus)',
        description:
          'Ein idealer Alleebaum für breite Straßen ist die Platane (Platanus acerifolia), die neben einer Höhe von 20 bis 30 m auch einen stattlichen Kronendurchmesser von 15 bis 20 m erreichen kann. Am Gesamtbestand haben die Platanen einen Anteil von etwa 6%. Die bekannteste und mit über 120 Jahren älteste Platanenallee in Berlin ist die Puschkinallee in Berlin-Treptow.',
      },
      {
        id: 'KASTANIE',
        title: 'Kastanie (Aesculus)',
        description:
          'Die Rosskastanie (Aesculus hippocastanum) hat einem Anteil von ca. 5% am Gesamtbestand, belegt damit den fünften Platz unter den Berliner Straßenbäumen.',
      },
    ],
  },
  collaborate: {
    tiles: [
      {
        icon: 'zoom',
        title: 'Entdecken',
        description:
          'Unsere interaktive Karte visualisiert über 800.000 Stadtbäume und zeigt Informationen zu Art, Alter und Wasserbedarf an. Nutze die Filter- und Suchfunktionen, um schnell einen Überblick zu erhalten.',
      },
      {
        icon: 'water',
        title: 'Gießen',
        description:
          'Schnapp Dir eine Gießkanne und werde Teil der Gieß-Community! Bereits über tausend Mitglieder:innen haben sich für die Bäume Berlins zusammengeschlossen und tragen ihre Gießungen regelmäßig ein.',
      },
      {
        icon: 'subscribe',
        title: 'Adoptieren',
        description:
          'Durch das Adoptieren eines Baumes - oder auch mehrerer - lässt Du deine Nachbarschaft wissen, dass für diese Bäume gesorgt wird. So gelingt ein koordiniertes Engagement.',
      },
      {
        icon: 'info',
        title: 'Austauschen',
        description:
          'Tritt unserem <a target="_blank" href="https://join.slack.com/t/giessdenkiez/shared_invite/zt-e3et281u-xON4UmBZpKavzDRkw5HmCQ">Slack-Chat</a> bei, um Dich mit der Gieß-Community zu vernetzen, Fragen auszutauschen und die Bewässerung in Deinem Kiez abzustimmen.',
      },
    ],
  },
  sales: {
    title: '<i>Gieß den Kiez</i> auch in Deiner Stadt?',
    subtitle:
      'Städte wie Leipzig, Magdeburg und Co. haben sich bereits erfolgreich der Gieß-Welle angeschlossen! Ist deine Stadt die nächste?',
    buttonText: 'Erfahre mehr!',
    buttonLink: 'https://deine-stadt.giessdenkiez.de',
  },
};

const enContent = {
  faq: {
    title: 'F.A.Q.',
    description: 'Based on the lively exchange between our community on Slack',
    qa: [
      {
        question: 'How can I participate?',
        answer:
          'Inform: <br><br>Curious which tree is in front of your door?  <br><br>Watering and adopting trees: <br><br>Do you want to get active or are you already actively watering?  <br><br>Connect: <br><br>About our public <a target="blank" href="https://join.slack.com/t/giessdenkiez/shared_invite/zt-e3et281u-xON4UmBZpKavzDRkw5HmCQ">Slack channel</a> You can exchange ideas with other foundrymen and report defective pumps in your neighborhood.',
      },
      {
        question: 'What can I do if trees are not registered correctly?',
        answer:
          'We obtain the tree data set with all attributes such as address, tree species and planting year for each tree from the geoportal of the city of Berlin, the FIS broker. ',
      },
      {
        question: 'Why should I take action and water trees?',
        answer:
          "The long periods of drought and heat of the last two years have caused immense damage to Berlin's urban greenery.  <br><br>The street and green space authorities are already active, but cannot keep up with watering during Berlin's hot summers. ",
      },
      {
        question: 'How do I water correctly?',
        answer:
          'Depending on their age, location and tree species, trees need different amounts of water.  <br><br>Since freshly planted trees up to the age of three are usually supplied with water by the district parks authorities, trees between the ages of four and 15 particularly need our attention and our water.  <br><br>Based on the Berlin one <a target="blank" href="https://www.berlin.de/sen/uvk/natur-und-gruen/stadtgruen/pflegen-und-unterhalten/handbuch-gute-pflege/">Good Care Handbook</a> We recommend that you water it rarely, but rather with a larger amount of water. ',
      },
      {
        question: 'Who can I contact if pumps are broken or damaged?',
        answer:
          'The respective district roads and green spaces authorities are responsible for the infrastructure of the roads, which also includes the public hand pumps.  <a target="blank" href="https://app.slack.com/client/T012K4SDYBY/C019SJQDPL7">Slack channel </a> do. ',
      },
      {
        question: 'How are technical problems handled?',
        answer:
          'The participation platform “Gieß den Kiez” is a prototype and therefore a beta version of a web app.  <a target="blank" href="https://join.slack.com/t/giessdenkiez/shared_invite/zt-e3et281u-xON4UmBZpKavzDRkw5HmCQ">Slack channel</a> or by email.  <a target="blank" href="https://github.com/technologiestiftung/giessdenkiez-de">Open source GitHub repository</a> invited and can comment on their issues or code fixes directly in the repository.',
      },
      {
        question: 'Why is the website not loading or loading very slowly?',
        answer:
          'When the page is first opened, the browser loads over 800,000 data points - this can take a while!  <br><br>Use via smartphone (mobile network) can lead to performance problems (page loads slowly).  <a target="blank" href="https://join.slack.com/t/giessdenkiez/shared_invite/zt-e3et281u-xON4UmBZpKavzDRkw5HmCQ">Slack channel</a>, by email or via GitHub Issue, stating the device used, the operating system, the browser and the browser version.',
      },
      {
        question: 'What should I do if I watered a tree incorrectly?',
        answer:
          'To undo a watering, for example because the neighboring tree was watered instead or on a different day, first click on the tree. ',
      },
      {
        question: 'Can the principle be transferred to other cities?',
        answer:
          'The “Gieß den Kiez” platform is an open source software project and runs under an MIT license.  <a target="blank" href="https://github.com/technologiestiftung/giessdenkiez-de">GitHub repository</a> drop by or contact us via email.',
      },
      {
        question: 'I still have a question!',
        answer:
          'The FAQ couldn\'t help you or you have a more complex query?  <a href="mailto:giessdenkiez@citylab-berlin.org?subject=[Giess Den Kiez] Frage:...">E-mail.</a>',
      },
      {
        question: "Why aren't all of Berlin's trees shown?",
        answer: 'Pour the neighborhood is based on the tree register. ',
      },
      {
        question: "I don't speak any German: What's going on here?",
        answer:
          'Gieß den Kiez is a participatory platform where you can inform yourself about the trees in your neighborhood and their water needs. ',
      },
    ],
  },
  imprintAndPrivacy: {
    title: 'Imprint and data protection',
    description:
      '<a target="blank" href="https://www.technologiestiftung-berlin.de/de/impressum/">imprint</a> – <a target="blank" href="https://www.technologiestiftung-berlin.de/de/datenschutz/">data protection</a>',
    attribution:
      '© <a href="https://www.mapbox.com/about/maps/" target="_blank" rel="noreferrer">Mapbox</a> – © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a> – <a href="https://www.mapbox.com/map-feedback" target="_blank" rel="noreferrer"><strong>Improve this map</strong></a> – <a href="https://citylabberlin.typeform.com/to/kCdnCgvC#product_id=GdK" target="_blank" rel="noreferrer">Feedback</a>',
  },
  intro: {
    title: '<b>Pour that <span>neighbourhood</span></b>',
    subline:
      'Berlin\'s city trees are suffering from drought <br class="large" /> and you can help them!',
    description: [
      'Find out about the water needs of the trees in your neighborhood, adopt the tree on your doorstep and become part of the active watering community in Berlin!',
    ],
    action: "Let's go",
  },
  credits: {
    projectOf: 'A project of',
    executedBy: 'Executed by',
    fundedBy: 'Funded by',
  },
  cookies: {
    disclaimer:
      'This website uses cookies to enable certain functions and to improve the offering. By continuing here you agree to the use of cookies.',
    accept: 'Accept',
    info: 'More information',
  },
  legend: {
    pumps: 'Public pumps',
    precipitation: 'Precipitation',
    precipitationAreas: 'Precipitation areas',
    dataPoints: 'Data points',
    treeLayer: 'Street and park trees',
    ofLastDays: 'of last 30 days (liters)',
    pumpState: {
      working: 'working',
      defect: 'defect',
      locked: 'locked',
      unknown: 'unknown',
    },
  },
  loading: {
    snippets: [
      'We are currently loading 839,049 trees from the Berlin tree population.',
      'If you access this page via the mobile network, it may take some time.',
      "Collect information about all trees from Berlin's tree register.",
      'Already knew? ',
    ],
  },
  sidebar: {
    about: [
      {
        title: 'about the project',
        description:
          'The consequences of climate change, especially the dry and hot summers, are putting a strain on Berlin\'s ecosystem. <br/><br/>Would you like to find out more about watering trees, report pumps and exchange ideas with other active users? <br/><br/>Do you have feedback about Gieß den Kiez?<br/><a target="_blank" rel="noreferrer" href="https://citylabberlin.typeform.com/to/kCdnCgvC#product_id=GdK">Please feel free to answer a few questions for us.</a>',
      },
      {
        title: 'usefull links',
        description:
          '<ul><li><a target="blank" href="https://www.lieblingsbaum-initiative.de/">Favorite Tree Initiative</a></li><li><a target="blank" href="https://www.bund-berlin.de/mitmachen/aktion-baeume-giessen/">BUND - Watering trees campaign</a></li><li><a target="blank" href="https://www.baumpflegeportal.de/baumpflege/trockenheit-duerre-wann-baeume-giessen/">Tree care portal - watering in dry conditions</a></li><li><a target="blank" href="https://www.berlin.de/senuvk/umwelt/stadtgruen/stadtbaeume/kampagne/start.shtml">Berlin city tree campaign</a></li><li><a target="blank" href="https://www.berlin.de/pflanzenschutzamt/stadtgruen/beratung/bewaesserungsempfehlung-fuer-stadtbaeume/">Soil moisture Berlin project</a></li><li><a target="blank" href="https://www.bmi.bund.de/SharedDocs/downloads/DE/publikationen/themen/bauen/wohnen/weissbuch-stadtgruen.html">Green paper urban green</a></li><li><a target="blank" href="https://www.hcu-hamburg.de/fileadmin/documents/REAP/files/Bildungsmaterial_Stadtbaeume_im_Klimawandel_2017.pdf">City trees - significance and challenges in times of climate change</a></li><li><a target="blank" href="https://www.bund-naturschutz.de/natur-und-landschaft/stadt-als-lebensraum/stadtbaeume/funktionen-von-stadtbaeumen.html">BUND - Functions of city trees</a></li></ul>',
      },
      {
        title: 'About Us',
        description:
          '“Gieß den Kiez” is a project by <a target="blank" href="https://www.citylab-berlin.org/">CityLAB Berlin</a>.  <br /> <br /> The CityLAB is a project of the Technology Foundation Berlin and is funded by the Berlin Senate Chancellery. <br /> <br /> Exchange ideas with our casting community!  <a target="blank" href="https://join.slack.com/t/giessdenkiez/shared_invite/zt-e3et281u-xON4UmBZpKavzDRkw5HmCQ">Slack chat</a> to hear from you.<br /> <br />Press inquiries are best addressed to:<br /> Anna Hantelmann<br /><a href="mailto:anna.hantelmann@ts.berlin?subject=giessdenkiez.de%20Presseanfrage">anna.hantelmann@ts.berlin</a><br /><a href="tel:+4915118457242">Tel.: 49 151 18457 242 </a>',
      },
      {
        title: 'Data sources',
        description:
          'The map shows the majority of Berlin\'s street and plant trees (839,049; as of May 2023). <ul><li><a target="blank" href="https://fbinter.stadt-berlin.de/fb/berlin/service_intern.jsp?id=s_wfs_baumbestand@senstadt&type=WFS">Geoportal Berlin / Street trees</a></li><li><a target="blank" href="https://fbinter.stadt-berlin.de/fb/berlin/service_intern.jsp?id=s_wfs_baumbestand_an@senstadt&type=WFS">Geoportal Berlin / Plant trees</a></li><li><a target="blank" href="https://www.dwd.de/">German Weather Service</a></li><li>Pumps off <a target="blank" href=" https://www.openstreetmap.de"> Open Street Map</a></li></ul>',
      },
    ],
    waterNeeds: [
      {
        title: 'Low water requirements',
        description:
          'Street trees of older age (>40 years) have usually learned to supply themselves with groundwater, but they also suffer from the increasing heat and are happy about additional water. ',
      },
      {
        title: 'Medium water requirements',
        description:
          'Middle-aged trees between 15 and 40 years old are usually no longer watered by the parks departments, but they do have a certain amount of staying power.  ',
      },
      {
        title: 'High water requirements',
        description:
          'Young trees between four and 15 years old are not irrigated by the administration in all districts and are not yet “self-sufficient”. ',
      },
    ],
    treetypes: [
      {
        id: 'LINDE',
        title: 'Linden (Tilia)',
        description:
          'The linden tree has been considered the typical Berlin street tree for years. ',
      },
      {
        id: 'MAPLE',
        title: 'Maple (Acer)',
        description:
          'The maple genus comprises around 20% of the total population. ',
      },
      {
        id: 'OAK',
        title: 'Oak (Quercus)',
        description:
          'The proportion of oak trees is around 9% of the total stock. ',
      },
      {
        id: 'PLANE',
        title: 'Plane tree (Platanus)',
        description:
          'An ideal avenue tree for wide streets is the plane tree (Platanus acerifolia), which can reach a height of 20 to 30 m and an impressive crown diameter of 15 to 20 m. ',
      },
      {
        id: 'CHESTNUT',
        title: 'Chestnut (Aesculus)',
        description:
          "The horse chestnut (Aesculus hippocastanum) accounts for around 5% of the total population, placing it in fifth place among Berlin's street trees.",
      },
    ],
  },
  collaborate: {
    tiles: [
      {
        icon: 'zoom',
        title: 'Discover',
        description:
          'Our interactive map visualizes over 800,000 urban trees and displays information on species, age and water requirements. ',
      },
      {
        icon: 'water',
        title: 'Pour',
        description:
          'Grab a watering can and become part of the watering community! ',
      },
      {
        icon: 'subscribe',
        title: 'To adopt',
        description:
          'By adopting a tree - or several - you let your neighborhood know that these trees will be cared for. ',
      },
      {
        icon: 'info',
        title: 'Exchange',
        description:
          'Join ours <a target="_blank" href="https://join.slack.com/t/giessdenkiez/shared_invite/zt-e3et281u-xON4UmBZpKavzDRkw5HmCQ">Slack chat</a> to network with the irrigation community, exchange questions and coordinate irrigation in your neighborhood.',
      },
    ],
  },
  sales: {
    title: '<i>Water the neighborhood</i> also in your city?',
    subtitle:
      'Cities like Leipzig, Magdeburg and Co. have already successfully joined the casting wave! ',
    buttonText: 'Learn more!',
    buttonLink: 'https://deine-stadt.giessdenkiez.de',
  },
};

const localizedContent = {
  de: deContent,
  en: enContent,
} as LocalizedContent;

export default localizedContent;

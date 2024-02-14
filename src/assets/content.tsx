import { Content, LocalizedContent } from './content-types';

const deContent: Content = {
  error: {
    title: 'Irgendwas ist schiefgelaufen.',
    contact: 'Bitte wende Dich an das',
    issue: 'oder schreib uns einen Issue auf',
    reload: 'Vielleicht hilft es auch die Seite neu zu laden?',
    backToHome: 'Back to home',
  },
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
          'Das FAQ konnte Dir nicht weiterhelfen oder Du hast eine komplexere Anfrage? Dann schreib uns eine <a href="mailto:giessdenkiez@citylab-berlin.org?subject=[Gieß Den Kiez] Frage:...">Email.</a>',
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
    title: 'Legende',
    pumps: 'Öffentliche Pumpen',
    publicPump: 'Öffentliche Straßenpumpe',
    lastPumpCheck: 'Letzter Check',
    pumpStyle: 'Pumpenstil',
    updatePumpLink: 'Status in OpenStreetMap aktualisieren',
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
  sharing: {
    title:
      'Teile Gieß den Kiez mit Deinem Umfeld und hilf uns die Gieß-Community zu vergrößern:',
    content:
      'Auf Gieß den Kiez kannst Du Dich über den Berliner Baumbestand erkundigen, durstige Bäume finden, und eintragen, wann Du diese gegossen hast!',
  },
  //pls do not delete the following eventNote section to facilitate process of enabling/disabling future news & notes
  // eventNote: {
  //   title:
  //     '<b>Gieß den Kiez Maintenance: </b><br> Nach dem Herbstputz ist uns aufgefallen, daß auch unser Datenbank etwas aufgeräumt werden muss. Daher werden wir am 29.11.2022 von 11:00 bis 16:00 Uhr die Plattform für Wartungsarbeiten abschalten. Wir bitten um euer Verständnis.',
  // },
  // whatsNew: {
  //   title: 'Gieß den Kiez Update:',
  //   description: [
  //     '<strong>Der Frühjahrsputz ist voll im Gange!</strong> In den letzten Tagen haben wir ein großes Update an der Seite vorgenommen. Ihr könnt euch über viele kleine und große Verbesserungen freuen: Wir erleichtern die Übertragbarkeit von Gieß den Kiez für andere Städte, ermöglichen Euch die Anpassung Eurer E-Mail-Adresse oder Eures Passwortes und noch einiges mehr. Wir haben bereits all eure Accounts in unser neues System übertragen und beobachten ob Fehler auftauchen, die wir nicht vorhersehen konnten.',
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
    addressPlaceholder: 'Addresse',
    participateButton: 'Wie kann ich mitmachen?',
    loading: 'Lade',
    furtherInfo: 'Weitere Infos',
    title: 'Suche & Filter',
    locationSearchTitle: 'Standortsuche',
    dataViewTitle: 'Datenansicht',
    dataViewDescription:
      'Betrachte welche Bäume bereits von anderen Nutzern gegossen wurden. Oder finde heraus, wieviel Niederschlag die Bäume in den letzten 30 Tagen erreicht hat.',
    precipitation: 'Niederschläge',
    adopted: 'Bereits adoptiert',
    lastWatered: 'In den letzten 30 Tagen gegossen',
    waterNeedsTitle: 'Wasserbedarf',
    waterNeedsDescription: 'Finde heraus wie sehr Bäume Wasser benötigen.',
    treeAgeTitle: 'Baumalter',
    treeAgeDescription: 'Erkunde die Geschichte von Berlins Baumlandschaft',
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
          'Die Kastanie (Aesculus) hat einen Anteil von ca. 5% am Gesamtbestand, und belegt damit den fünften Platz unter den Berliner Straßenbäumen. Rosskastanien haben fünf- und mehrgliedrige Blätter, die an die Finger einer Hand erinnern; Esskastanien haben einzelne Blätter, die überdies deutlich gezackt sind.',
      },
      {
        id: 'ROSSKASTANIE',
        title: 'Rosskastanie (Aesculus hippocastanum)',
        description:
          'Die Rosskastanie (Aesculus hippocastanum) hat einen Anteil von ca. 5% am Gesamtbestand, und belegt damit den fünften Platz unter den Berliner Straßenbäumen. Rosskastanien haben fünf- und mehrgliedrige Blätter, die an die Finger einer Hand erinnern; Esskastanien haben einzelne Blätter, die überdies deutlich gezackt sind.',
      },
      {
        id: 'ESCHE',
        title: 'Esche (Fraxinus)',
        description:
          'Die Esche (Fraxinus) hat einen Anteil von ca. 3% am Gesamtbestand, und belegt damit den sechsten Platz unter den Berliner Straßenbäumen. Mit einer Wuchshöhe von bis zu 40 m zählt sie zu den höchsten Laubbäumen Europas.',
      },
      {
        id: 'BIRKE',
        title: 'Birke (Betula)',
        description:
          'Die Birke (Betula) hat einen Anteil von ca. 3% am Gesamtbestand. Obwohl die Birke als Pionierbaum sehr anspruchslos und wachsend auf jedem Boden ist, eignet sie sich als Straßenbaum weniger, da die Baumscheiben oft zu wenig Raum für die Flachwurzler bieten.',
      },
      {
        id: 'ROBINIE',
        title: 'Robinie (Robinia)',
        description:
          'Die Robinie (Robinia) hat einen Anteil von ca. 2% am Gesamtbestand. Sie wurde ab 1672 im Berliner Lustgarten als Parkbaum kultiviert und ist heute in ganz Berlin sehr häufig. Die Robinie stellt nur geringe Anforderungen an den Boden, und sie kann dank der Knöllchenbakterien an ihren Wurzeln Luftstickstoff bindenden und düngt damit den Boden auf.',
      },
      {
        id: 'HASEL',
        title: 'Hasel Baum (Corylus)',
        description:
          'Der Hasel Baum (Corylus) hat einen Anteil von ca. 2% am Gesamtbestand, und ist somit der neunt häufigste Straßenbaum in Berlin. Die Haselnuss wächst als Strauch oder kleiner Baum bis zu 6 m hoch.',
      },
      {
        id: 'HAINBUCHE',
        title: 'Hainbuche (Carpinus)',
        description:
          'Der Anteil der Hainbuchen (Carpinus) beträgt rund 2% des Gesamtbestandes. Der Baum erreicht eine Höhe von bis zu 25 m. Die Krone ist erst leicht kegelförmig und später weit ausladend.',
      },
      {
        id: 'PAPPEL',
        title: 'Pappel (Populus)',
        description:
          'Die Pappel (Populus) hat einen Anteil von ca. 2% am Berliner Gesamtbestand. Sie haben eiförmige bis dreieckige, teils herzförmige Laubblätter.',
      },
      {
        id: 'ULME',
        title: 'Ulme (Ulmus)',
        description:
          'Der Anteil der Ulmen (Ulmus) beträgt rund 2% des Gesamtbestandes. Es gibt bei uns drei der weltweit 45 Arten dieses sommergrünen Laubbaumes: die Bergulme, die Feldulme und die Flatter-Ulme. Sie kommt mit einer Höhe von bis zu 600 Metern vor und kann 250 Jahre alt werden.',
      },
    ],
    openSourceNote: 'Gieß den Kiez ist ein',
    openSourceLink: 'https://github.com/technologiestiftung/giessdenkiez-de',
    openSourceText: 'Open Source Projekt!',
    profile: {
      logoutAction: 'Ausloggen',
      loginAction: 'Einloggen / Registrieren',
      loggedInHint:
        'Du bist momentan nicht eingeloggt. Wenn Du das Gießen von Bäumen in Deiner Umgebung hier eintragen möchtest, dann registriere Dich oder logge Dich ein.',
      title: 'Profil',
      progress: 'Dein Gießfortschritt',
      adoptedTrees: 'Adoptierte Bäume',
      noTreesAdopted: 'Du hast noch keine Bäume adoptiert.',
      deleteAccountHint:
        'Möchtest Du deinen Account löschen? Damit werden alle von dir generierten Wässerungsdaten einem anonymen Benutzer zugeordnet. Dein Benutzer bei unserem Authentifizierungsdienst Supabase.com wird sofort und unwiderruflich gelöscht.',
      deleteAccountAction: 'Account Löschen',
      deleteAccountWarning:
        '🚨 🚨 🚨 Willst Du Deinen Account wirklich löschen? Diese Aktion ist endgültig. Alle Deine Benutzerdaten werden damit sofort gelöscht!',
      timesWatered: 'mal gegossen',
      litersWatered: 'Liter gegossen',
    },
    account: {
      confirm: 'Account bestätigen',
      title: 'Dein Account',
      username: 'Benutzername',
      registeredMail: 'Registrierte E-Mail Adresse',
      editHint: 'Benutzername oder E-Mail',
      editLink: 'bearbeiten?',
      passwordEditHint: 'Passwort',
      passwordEditLink: 'ändern?',
      editTitle: 'Account bearbeiten',
      editSave: 'Speichern',
      editSaving: 'Wird gespeichert...',
      editClose: 'Schließen',
      editUsernameSuccess: 'Benutzername geändert.',
      editUsernameError:
        'Interner Fehler beim Ändern des Benutzernamens. Versuche es später erneut.',
      editEmailSuccess: (oldMail: string, newMail: string) => {
        return `Um die Änderung zu bestätigen, bitte klicke auf die Links die per Mail jeweils an Deine alte E-Mail-Adresse "${oldMail}" und deine neue E-Mail-Adresse "${newMail}" verschickt wurden.`;
      },
      editPasswordTitle: 'Passwort ändern',
      oldPasswordTitle: 'Altes Passwort',
      newPasswordTitle: 'Neues Passwort',
      repeatNewPasswordTitle: 'Neues Passwort wiederholen',
      editPasswordSuccess: 'Dein Passwort wurde erfolgreich geändert',
    },
    tree: {
      title: 'Bauminformation',
      age: 'Standalter',
      needs: 'Wasserbedarf',
      wateringAmount: 'Wassermenge',
      ofLastDays: 'der letzten 30 Tage',
      waterings: 'Gießungen',
      rain: 'Regen',
      litersPerSqm: 'Liter pro m²',
      years: 'Jahre',
      adoptedByMe: 'Von mir adoptiert ✔',
      adoptedAlsoByOthers: 'Ebenfalls von anderen adoptiert',
      adoptedOnlyByOthers: 'Von anderen Nutzer:innen adoptiert',
      regularlyWateredBy: (user: string) => {
        return `Dieser Baum wird regelmäßig von ${user} gewässert.`;
      },
      lastWaterings: 'Letzte Bewässerungen',
      latestFirst: 'Neueste zuerst',
      needsVerification:
        'Bäume adoptieren und wässern ist nur möglich mit verifiziertem Account.',
      stopAdoption: 'Adoption aufheben',
      stopAdoptionProgress: 'Adoption wird aufgehoben',
      adopt: 'Baum adoptieren',
      adoptProgress: 'Baum wird adoptiert',
    },
  },
  auth: {
    signinTitle: 'Anmelden',
    signupTitle: 'Registrieren',
    email: 'E-Mail',
    username: 'Benutzername',
    password: 'Passwort',
    signinAction: 'Einloggen',
    signupAction: 'Registrieren',
    noAccountHint: 'Du hast noch keinen Account?',
    alreadyRegisteredHint: 'Du hast schon einen Account?',
    alreadyRegisteredAction: 'Log Dich ein',
    registerLink: 'Registrier Dich',
    forgotPasswordHint: 'Oh nein. Du hast Dein',
    forgotPasswordLink: 'Passwort vergessen?',
    resetPassword: 'Passwort zurücksetzen',
    backToLogin: 'Zurück zur Anmeldung?',
    clickHere: 'Hier klicken',
    bored: 'Dir ist langweilig bis dahin? Dann lies etwas über Gieß den Kiez!',
    profile: 'Profil',
    usernameRestrictions: {
      part1: 'Dein Benutzername sollte zwischen',
      and: 'und',
      part2:
        'Zeichen lang sein, nur aus Zeichen und Zahlen (ohne Leerzeichen am Anfang und Ende) ',
      part3: 'bestehen und natürlich nicht vergeben sein.',
    },
    passwordRestrictions: {
      part1: 'Dein Passwort sollte: Mindestens 8 Zeichen lang sein',
      part2: 'Klein- und Großbuchstaben',
      part3: 'mindestens eines dieser Sonderzeichen @#$%&*()!_+=:;',
      part4: 'und Zahlen enthalten.',
    },
    errors: {
      checkUsername: 'Bitte überprüfe Deinen Benutzernamen',
      userExistsAlready: 'Benutzer bereits registriert',
      emailCouldNotBeSent: (mail: string) => {
        return `Die E-Mail an "${mail}" konnte nicht verschickt werden. Versuch es erneut.`;
      },
      usernameOrPasswordWrong: 'Benutzername oder Passwort ist falsch',
      ooops: 'Ups... da ist etwas schief gelaufen',
      checkMailForPasswordReset: (mail: string) => {
        return `Überprüfe Deine E-Mail "${mail}" nach einem Link um Dein Passwort zu ändern`;
      },
      usernameTaken: 'Benutzername bereits vergeben',
      checkPassword: 'Bitte überprüfe Dein Passwort',
      enterEmail: 'Bitte gebe eine E-Mail an',
      enterPassword: 'Bitte gebe ein Passwort an',
      enterUsername: 'Bitte gebe einen Benutzernamen an',
    },
    passwordNotSecureEnough: 'Passwort ist nicht sicher genug',
    passwordCouldNotBeChanged: 'Passwort konnte nicht geändert werden',
    passwordChangeSuccess: 'Passwort erfolgreich geändert',
    changePasswordFor: 'Passwort ändern für',
    checkSignupMail: (recipientMail: string, senderMail: string) => {
      return `Überprüfe Dein E-Mail Postfach für "${recipientMail}" nach einer E-Mail von "${senderMail}" mit einem Link um deinen Account zu bestätigen.`;
    },
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
  error: {
    title: 'Something went wrong.',
    contact: 'Please contact',
    issue: 'or submit an issue on',
    reload: 'Maybe it helps to reload the page?',
    backToHome: 'Back to home',
  },
  faq: {
    title: 'F.A.Q.',
    description: 'Based on the lively exchange between our community on Slack',
    qa: [
      {
        question: 'How can I participate?',
        answer:
          'Inform: <br><br>Curious which tree is in front of your door? Our interactive map visualizes over 800,000 street and plant trees in Berlin. If you want to find out more about a tree, navigate and zoom to the desired location and click on the colored dot. You will now see a lot of information about the selected tree in the menu ribbon on the left. <br><br>Watering and adopting trees: <br><br>Do you want to get active or are you already actively watering? On Gieß den Kiez, you can enter whether and with how much water you watered a tree. Trees can also be adopted. The adopted trees appear in your own user profile and can be found more quickly. This allows other neighbors in the area to see which trees need their attention. To water and adopt trees, first create a profile with a valid email address and then log in. Now you can document your watering activities accordingly and see whether and how often trees in your neighborhood have already been watered by other users.<br><br>Connect: <br><br> You can use our public <a target="blank" href="https://join.slack.com/t/giessdenkiez/shared_invite/zt-e3et281u-xON4UmBZpKavzDRkw5HmCQ">Slack channel</a> to exchange ideas with other foundries and report defective pumps in your neighborhood.',
      },
      {
        question: 'What can I do if trees are not registered correctly?',
        answer:
          'We obtain the tree data set with all attributes such as address, tree species and planting year for each tree from the geoportal of the city of Berlin, the FIS broker. The tree register provided in the geoportal is based on the district-aggregated data from the road and green space authorities. It can therefore happen again and again that data from trees is out of date or that properties differ from current reality. Unfortunately, we cannot make any changes to the tree register ourselves. Any deviations can only be reported directly to the responsible district authority. Once a year, the green space authorities publish an updated tree register, which we link to Gieß den Kiez after publication.',
      },
      {
        question: 'Why should I take action and water trees?',
        answer:
          "The long periods of drought and heat of the last two years have caused immense damage to Berlin's urban greenery. Between 2018 and 2019 alone, over 7,000 trees had to be felled, not solely due to drought damage. <br><br>The street and green space authorities are already active, but cannot keep up with the watering during Berlin's hot summers. Since the green space authorities are organized by district, each district works slightly differently, so holistic and needs-based coordination is certainly associated with hurdles. Through the platform, we would also like to give citizens the opportunity to help trees specifically based on their current water supply and to obtain information. The goal is to save as many trees as possible through neighborly involvement.",
      },
      {
        question: 'How do I water correctly?',
        answer:
          'Depending on their age, location and tree species, trees need different amounts of water. Young trees (0-15 years) need more water than medium-aged trees (15-40 years). Old trees (40 years and older) are usually completely self-sufficient. <br><br>Since freshly planted trees up to the age of three are usually supplied with water by the district parks authorities, the trees between four and 15 years in particular need our attention and our water. We have highlighted this with the labels of low, medium or high water requirement. <br><br>Based on the Berlin <a target="blank" href="https://www.berlin.de/sen/uvk/natur-und-gruen/stadtgruen/pflegen-und-unterhalten/katalog-good-care/">Manual Good Care</a>, we recommend you to water rarely, but rather with a larger amount of water. The manual recommends up to 200l per watering for freshly planted trees. In this way, you ensure that the soil moisture is increased even at depth. In the end, even smaller amounts do not hurt, especially in midsummer. It is important to loosen the dried out soil before watering so that the water can penetrate into the soil and does not run off above ground or accumulate incorrectly. So-called watering bags are also recommended, from which the water only emerges very slowly, hardly runs off the surface and therefore continuously seeps into the ground.',
      },
      {
        question: 'Who can I contact if pumps are broken or damaged?',
        answer:
          'The respective district roads and green spaces authorities are responsible for the infrastructure of the roads, which also includes the public hand pumps. If pumps are broken or damaged, the need for repairs can be reported there. We load the locations of the pumps on the map weekly from the Open Street Map database. If you want to help improve the data, for example by reporting a defective pump, you can do so in our <a target="blank" href="https://app.slack.com/client/T012K4SDYBY/C019SJQDPL7" >Slack Channel #pump-report </a> do. The OSM community then has the opportunity to enter your information into the database.',
      },
      {
        question: 'How are technical problems handled?',
        answer:
          'The participation platform “Gieß den Kiez” is a prototype and therefore a beta version of a web app. We are aware of some technical hurdles, but depend on your help. We are happy to receive your technical feedback and questions in our <a target="blank" href="https://join.slack.com/t/giessdenkiez/shared_invite/zt-e3et281u-xON4UmBZpKavzDRkw5HmCQ">Slack Channel</a> or by email. Anyone who feels at home in the “tech world” is welcome to participate in our <a target="blank" href="https://github.com/technologiestiftung/giessdenkiez-de">Open Source GitHub Repository</ a> invited and can comment on his issues or code fixes directly in the repository.',
      },
      {
        question: 'Why is the website not loading or loading very slowly?',
        answer:
          'When the page is first opened, the browser loads over 800,000 data points - this can take a while! Regardless, there may be slightly different displays when using different browsers. For the best experience, we recommend using Chrome or Firefox Desktop. Experience has shown that the most common problems can be solved if the browser is not outdated or the latest version is installed and there is a stable internet connection (LAN or WLAN). <br><br>Use via smartphone (mobile network) can lead to performance problems (page loads slowly). If problems occur repeatedly, you can report them in our <a target="blank" href="https://join.slack.com/t/giessdenkiez/shared_invite/zt-e3et281u-xON4UmBZpKavzDRkw5HmCQ">Slack Channel</a>, Report by email or via GitHub Issue, stating the device used, the operating system, the browser and the browser version.',
      },
      {
        question: 'What should I do if I watered a tree incorrectly?',
        answer:
          'To undo a watering, for example because the neighboring tree was watered instead or on a different day, first click on the tree. Scroll down the tree sidebar to the view of past waterings, click the trash can icon next to the entry you want to delete, and click “Delete” to confirm. Only waterings that you have made yourself can be deleted. After deleting, enter the watering with the correct information (number of liters and time).',
      },
      {
        question: 'Can the principle be transferred to other cities?',
        answer:
          'The “Gieß den Kiez” platform is an open source software project and runs under an MIT license. Accordingly, the idea and also the source code can be used and further developed free of charge for implementation in other cities. If you are interested, please take a look at our <a target="blank" href="https://github.com/technologiestiftung/giessdenkiez-de">GitHub Repository</a> or contact us via email.',
      },
      {
        question: 'I still have a question!',
        answer:
          'The FAQ couldn\'t help you or you have a more complex query? Then write us an <a href="mailto:giessdenkiez@citylab-berlin.org?subject=[Gieß Den Kiez] Question:...">Email.</a>',
      },
      {
        question: "Why aren't all of Berlin's trees shown?",
        answer:
          "Gieß den Kiez is based on the tree register. The tree register is a city directory in which (city/street or park) trees are managed and which is provided by the street and green spaces authorities. However, the green space authorities are not responsible for all of Berlin's trees. The trees in the Plänterwald, for example, are subject to the forestry office. These trees therefore do not appear in Gieß den Kiez.",
      },
    ],
  },
  imprintAndPrivacy: {
    title: 'Imprint and data protection',
    description:
      '<a target="blank" href="https://www.technologiestiftung-berlin.de/de/impressum/">Imprint</a> – <a target="blank" href="https://www.technologiestiftung-berlin.de/de/datenschutz/">Data protection</a>',
    attribution:
      '© <a href="https://www.mapbox.com/about/maps/" target="_blank" rel="noreferrer">Mapbox</a> – © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a> – <a href="https://www.mapbox.com/map-feedback" target="_blank" rel="noreferrer"><strong>Improve this map</strong></a> – <a href="https://citylabberlin.typeform.com/to/kCdnCgvC#product_id=GdK" target="_blank" rel="noreferrer">Feedback</a>',
  },
  intro: {
    title: '<b>Gieß den <span>Kiez</span></b>',
    subline:
      'Berlin\'s city trees are suffering from drought <br class="large" /> and you can help them!',
    description: [
      'Find out about the water needs of the trees in your neighbourhood, adopt the tree on your doorstep and become part of the active watering community in Berlin!',
    ],
    action: "Let's go",
  },
  credits: {
    projectOf: 'A project by',
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
    title: 'Legend',
    pumps: 'Public pumps',
    publicPump: 'Public street pump',
    lastPumpCheck: 'Last check',
    pumpStyle: 'Pump style',
    updatePumpLink: 'Update status in OpenStreetMap',
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
  sharing: {
    title:
      'Share Gieß den Kiez with those around you and help us expand the watering community:',
    content:
      "On Gieß den Kiez you can find out about Berlin's tree population, find thirsty trees and record when you watered them!",
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
    addressPlaceholder: 'Address',
    participateButton: 'How can I participate?',
    loading: 'Loading',
    furtherInfo: 'More information',
    title: 'Search & Filtering',
    locationSearchTitle: 'Location search',
    dataViewTitle: 'Data view',
    dataViewDescription:
      'See which trees have already been watered by other users. Or find out how much rainfall has reached the trees in the last 30 days.',
    precipitation: 'Precipitation',
    adopted: 'Already adopted',
    lastWatered: 'Watered in last 30 days',
    waterNeedsTitle: 'Water needs',
    waterNeedsDescription: 'Find out how urgently trees need water.',
    treeAgeTitle: 'Tree age',
    treeAgeDescription: "Explore the history of Berlin's tree landscape",
    about: [
      {
        title: 'About the project',
        description:
          'The consequences of climate change, especially the dry and hot summers, are putting a strain on Berlin\'s ecosystem. <br/><br/>Would you like to find out more about watering trees, report pumps and exchange ideas with other active users? <br/><br/>Do you have feedback about Gieß den Kiez?<br/><a target="_blank" rel="noreferrer" href="https://citylabberlin.typeform.com/to/kCdnCgvC#product_id=GdK">Please answer a few questions.</a>',
      },
      {
        title: 'Useful links',
        description:
          '<ul><li><a target="blank" href="https://www.lieblingsbaum-initiative.de/">Favorite Tree Initiative</a></li><li><a target="blank" href="https://www.bund-berlin.de/mitmachen/aktion-baeume-giessen/">BUND - Watering trees campaign</a></li><li><a target="blank" href="https://www.baumpflegeportal.de/baumpflege/trockenheit-duerre-wann-baeume-giessen/">Tree care portal - watering in dry conditions</a></li><li><a target="blank" href="https://www.berlin.de/senuvk/umwelt/stadtgruen/stadtbaeume/kampagne/start.shtml">Berlin city tree campaign</a></li><li><a target="blank" href="https://www.berlin.de/pflanzenschutzamt/stadtgruen/beratung/bewaesserungsempfehlung-fuer-stadtbaeume/">Soil moisture Berlin project</a></li><li><a target="blank" href="https://www.bmi.bund.de/SharedDocs/downloads/DE/publikationen/themen/bauen/wohnen/weissbuch-stadtgruen.html">Green paper urban green</a></li><li><a target="blank" href="https://www.hcu-hamburg.de/fileadmin/documents/REAP/files/Bildungsmaterial_Stadtbaeume_im_Klimawandel_2017.pdf">City trees - significance and challenges in times of climate change</a></li><li><a target="blank" href="https://www.bund-naturschutz.de/natur-und-landschaft/stadt-als-lebensraum/stadtbaeume/funktionen-von-stadtbaeumen.html">BUND - Functions of city trees</a></li></ul>',
      },
      {
        title: 'About Us',
        description:
          '“Gieß den Kiez” is a project by <a target="blank" href="https://www.citylab-berlin.org/">CityLAB Berlin</a>.  <br /> <br /> The CityLAB is a project by the Technologiestiftung Berlin and is funded by the Berlin Senate Chancellery. <br /> <br /> Exchange ideas with our watering community!  <a target="blank" href="https://join.slack.com/t/giessdenkiez/shared_invite/zt-e3et281u-xON4UmBZpKavzDRkw5HmCQ">Slack chat</a> to hear from you.<br /> <br />Press inquiries are best addressed to:<br /> Anna Hantelmann<br /><a href="mailto:anna.hantelmann@ts.berlin?subject=giessdenkiez.de%20Presseanfrage">anna.hantelmann@ts.berlin</a><br /><a href="tel:+4915118457242">Tel.: 49 151 18457 242 </a>',
      },
      {
        title: 'Data sources',
        description:
          'The map shows the majority of Berlin\'s street and plant trees (839,049 as of May 2023). <ul><li><a target="blank" href="https://fbinter.stadt-berlin.de/fb/berlin/service_intern.jsp?id=s_wfs_baumbestand@senstadt&type=WFS">Geoportal Berlin / Street trees</a></li><li><a target="blank" href="https://fbinter.stadt-berlin.de/fb/berlin/service_intern.jsp?id=s_wfs_baumbestand_an@senstadt&type=WFS">Geoportal Berlin / Plant trees</a></li><li><a target="blank" href="https://www.dwd.de/">German Weather Service</a></li><li>Pumps off <a target="blank" href=" https://www.openstreetmap.de"> Open Street Map</a></li></ul>',
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
        id: 'AHORN',
        title: 'Maple (Acer)',
        description:
          'The maple genus comprises around 20% of the total population. ',
      },
      {
        id: 'EICHE',
        title: 'Oak (Quercus)',
        description:
          'The proportion of oak trees is around 9% of the total stock. ',
      },
      {
        id: 'PLATANE',
        title: 'Plane tree (Platanus)',
        description:
          'An ideal avenue tree for wide streets is the plane tree (Platanus acerifolia), which can reach a height of 20 to 30 m and an impressive crown diameter of 15 to 20 m. ',
      },
      {
        id: 'KASTANIE',
        title: 'Chestnut (Aesculus)',
        description:
          'The chestnut (Aesculus) accounts for about 5% of the total population, and thus occupies fifth place among Berlins street trees. Horse chestnuts have five- and multi-lobed leaves that resemble the fingers of a hand; sweet chestnuts have single leaves that are also clearly serrated.',
      },
      {
        id: 'ROSSKASTANIE',
        title: 'Horse chestnut (Aesculus hippocastanum)',
        description:
          'The horse chestnut (Aesculus hippocastanum) accounts for about 5% of the total stock. Horse chestnuts have five- and multi-lobed leaves that resemble the fingers of a hand; sweet chestnuts have single leaves that are also clearly serrated.',
      },
      {
        id: 'ESCHE',
        title: 'Ash (Fraxinus)',
        description:
          'The ash tree (Fraxinus) accounts for about 3% of the total population, and thus occupies sixth place among Berlins street trees. With a growth height of up to 40 m, it is one of the tallest deciduous trees in Europe.',
      },
      {
        id: 'BIRKE',
        title: 'Birch (Betula)',
        description:
          'The birch (Betula) accounts for about 3% of the total population. Although the birch is a pioneer tree that is very undemanding and grows on any soil, it is less suitable as a street tree because there is often too little space for the shallow-rooted trees.',
      },
      {
        id: 'ROBINIE',
        title: 'Robinia (Robinia)',
        description:
          'The robinia (Robinia) accounts for about 2% of the total population. It was cultivated as a park tree in the "Berliner Lustgarten" park from 1672 and is now very common throughout Berlin. The robinia has low soil requirements and, thanks to the nodule bacteria on its roots, it can bind atmospheric nitrogen and thus fertilize the soil.',
      },
      {
        id: 'HASEL',
        title: 'Hazel tree (Corylus)',
        description:
          'The hazel tree (Corylus) accounts for about 2% of the total population. The hazel grows as a shrub or small tree up to 6 m high.',
      },
      {
        id: 'HAINBUCHE',
        title: 'Hornbeam (Carpinus)',
        description:
          'The proportion of hornbeam (Carpinus) is around 2% of the total population. The tree reaches a height of up to 25 meters. The crown is initially slightly conical and later expands widely.',
      },
      {
        id: 'PAPPEL',
        title: 'Poplar (Populus)',
        description:
          'Poplars (Populus) make up about 2% of Berlins total population. They have ovoid to triangular, partly heart-shaped leaves.',
      },
      {
        id: 'ULME',
        title: 'Elm (Ulmus)',
        description:
          'The proportion of elms (Ulmus) is around 2% of the total population. Here we have three of the worlds 45 species of this deciduous tree: the mountain elm, the field elm and the elm with a flutter. It grows up to 600 meters high and can live to be 250 years old.',
      },
    ],
    openSourceNote: 'Gieß den Kiez is an',
    openSourceLink: 'https://github.com/technologiestiftung/giessdenkiez-de',
    openSourceText: 'Open Source project!',
    profile: {
      logoutAction: 'Logout',
      loginAction: 'Login / Register',
      loggedInHint:
        'You are currently not logged in. If you would like to list the watering of trees in your area here, then register or log in.',
      title: 'Profile',
      progress: 'Your waterings',
      adoptedTrees: 'Adopted trees',
      noTreesAdopted: "You don't have adopted any trees yet",
      deleteAccountHint:
        'Do you want to delete your account? This means that all watering data you generate is assigned to an anonymous user. Your user on our authentication service Supabase.com will be deleted immediately and irrevocably.',
      deleteAccountAction: 'Delete account',
      deleteAccountWarning:
        '🚨 🚨 🚨 Do you really want to delete your account? This action is final. All your user data will be deleted immediately!',
      timesWatered: 'times watered',
      litersWatered: 'liters watered',
    },
    account: {
      title: 'Your account',
      username: 'Username',
      registeredMail: 'Registered email address',
      editHint: 'Username or email',
      editLink: 'edit?',
      passwordEditHint: 'Password',
      passwordEditLink: 'change?',
      editTitle: 'Edit account',
      editSave: 'Save',
      editSaving: 'Saving...',
      editClose: 'Close',
      editUsernameSuccess: 'Username changed successfully.',
      editUsernameError:
        'Internal error while updating username. Please try again later.',
      editEmailSuccess: (oldMail: string, newMail: string) => {
        return `To confirm the changes, please click the link that was sent to your old email address "${oldMail}" and your new email address "${newMail}".`;
      },

      editPasswordTitle: 'Change password',
      oldPasswordTitle: 'Old password',
      newPasswordTitle: 'New password',
      repeatNewPasswordTitle: 'Repeat new password',
      editPasswordSuccess: 'Your password was changed successfully',
    },
    tree: {
      title: 'Tree information',
      age: 'Age',
      needs: 'Water requirements',
      wateringAmount: 'Watering amounts',
      ofLastDays: 'of last 30 days',
      waterings: 'Waterings',
      rain: 'Rain',
      litersPerSqm: 'Liters per m²',
      years: 'years',
      adoptedByMe: 'Adopted by me ✔',
      adoptedAlsoByOthers: 'Adopted also by others',
      adoptedOnlyByOthers: 'Adopted by others',
      regularlyWateredBy: (user: string) => {
        return `This tree is regularly watered by "${user}".`;
      },
      lastWaterings: 'Last waterings',
      latestFirst: 'Latest first',
      needsVerification:
        'Adopting and watering trees is only possible with a verified account.',
      stopAdoption: 'End adoption',
      stopAdoptionProgress: 'Ending adoption',
      adopt: 'Adopt tree',
      adoptProgress: 'Adopting tree',
    },
  },
  auth: {
    signinTitle: 'Login',
    signupTitle: 'Register',
    email: 'Email',
    username: 'Username',
    password: 'Password',
    signinAction: 'Login',
    signupAction: 'Register',
    noAccountHint: 'No account yet?',
    alreadyRegisteredHint: 'You already have an account?',
    alreadyRegisteredAction: 'Login',
    registerLink: 'Register here',
    forgotPasswordHint: 'Oh no, forgot your password?',
    forgotPasswordLink: 'Reset password',
    resetPassword: 'Reset password',
    backToLogin: 'Back to Login?',
    clickHere: 'Click here',
    bored: 'Bored? Read something about Gieß den Kiez',
    profile: 'Profile',
    usernameRestrictions: {
      part1: 'Your username should be between',
      and: 'and',
      part2:
        'characters long, made only of numbers and characters (without whitespace at start and end)',
      part3: 'and of course should not be already taken.',
    },
    passwordRestrictions: {
      part1: 'Your password should be: At least 8 characters long',
      part2: 'have lower- and uppercase letters',
      part3: 'contain at least one of these special characters @#$%&*()!_+=:;',
      part4: 'and contain numbers.',
    },
    errors: {
      checkUsername: 'Please check your username',
      userExistsAlready: 'User already registered',
      emailCouldNotBeSent: (mail: string) => {
        return `Email to "${mail}" could not be sent. Try again.`;
      },
      usernameOrPasswordWrong: 'Username or password are wrong',
      ooops: 'Ooops... something did not work as expected',
      checkMailForPasswordReset: (mail: string) => {
        return `Check your email "${mail}" for a link to reset your password`;
      },
      usernameTaken: 'Username already taken',
      checkPassword: 'Please check your password',
      enterEmail: 'Please enter an email address',
      enterPassword: 'Please enter a password',
      enterUsername: 'Please enter an username',
    },
    passwordNotSecureEnough: 'Password ist not secure enough',
    passwordCouldNotBeChanged: 'Password could not be changed',
    passwordChangeSuccess: 'Password changed successfully',
    changePasswordFor: 'Change password for',
    checkSignupMail: (recipientMail: string, senderMail: string) => {
      return `Check your inbox for "${recipientMail}", you should have received a mail from "${senderMail}" containing a link to activate your account.`;
    },
  },
  collaborate: {
    tiles: [
      {
        icon: 'zoom',
        title: 'Discover',
        description:
          'Our interactive map visualizes over 800,000 urban trees and displays information on species, age and water requirements. Use the filter and search functions to quickly get an overview.',
      },
      {
        icon: 'water',
        title: 'Water',
        description:
          "Grab a watering can and become part of the watering community! Over a thousand members have already joined forces for Berlin's trees and regularly log their waterings.",
      },
      {
        icon: 'subscribe',
        title: 'Adopt',
        description:
          'By adopting a tree - or several - you let your neighbourhood know that these trees will be cared for. This is how coordinated engagement succeeds.',
      },
      {
        icon: 'info',
        title: 'Exchange',
        description:
          'Join our <a target="_blank" href="https://join.slack.com/t/giessdenkiez/shared_invite/zt-e3et281u-xON4UmBZpKavzDRkw5HmCQ">Slack chat</a> to connect with the tree watering community, exchange questions and coordinate activities in your neighbourhood.',
      },
    ],
  },
  sales: {
    title: '<i>Gieß den Kiez</i> also in your city?',
    subtitle:
      'Cities like Leipzig, Magdeburg and Co. have already successfully joined the watering wave! ',
    buttonText: 'Learn more!',
    buttonLink: 'https://deine-stadt.giessdenkiez.de',
  },
};

const localizedContent = {
  de: deContent,
  en: enContent,
} as LocalizedContent;

export default localizedContent;

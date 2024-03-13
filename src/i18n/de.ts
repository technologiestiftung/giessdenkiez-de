import { Content } from "./content-types";

const de: Content = {
  locationSearch: {
    placeholder: "Suche nach einem Ort",
  },
  navbar: {
    map: "Karte",
    profile: {
      sidebarLabel: "Profil",
      title: "Dein Profil",
      overview: {
        subtitle: "Deine Übersicht",
        irrigations: "Gießungen",
        liter: "Liter",
        adoptedTrees: "Adoptierte Bäume",
      },
      adoptedTrees: {
        subtitle: "Adoptierte Bäume",
        irrigationTimes: "Mal",
        irrigationAmount: "Liter",
        showAll: "Alle anzeigen",
        showLess: "Weniger anzeigen",
      },
      settings: {
        subtitle: "Profildetails",
        username: "Benutzername",
        editUsername: "Neuer Benutzername",
        placeholderUser: "Dein Benutzername",
        email: "Registrierte E-Mail Adresse",
        editEmail: "Neue E-Mail Adresse",
        placeholderMail: "xyz@ts.berlin",
        password: "Passwort",
        changePassword: "Passwort ändern",
        deleteAccount: "Account löschen",
        approve: "Fertig",
      },
      logOut: "Ausloggen",
    },
    info: "Info",
  },
  notFound: {
    title: "404 - Seite wurde nicht gefunden",
  },
  info: {
    about: {
      head: {
        question: "Über das Projekt",
        answer: `Die Folgen des Klimawandels, insbesondere die trockenen und heißen Sommer, belasten das Berliner Ökosystem. Unsere Stadtbäume vertrocknen und tragen langfristige Schäden davon: In den letzten Jahren mussten immer mehr Bäume gefällt werden und ihre Lebensdauer sinkt. Inzwischen wird die Bevölkerung regelmäßig zur Unterstützung aufgerufen, allerdings weitgehend unkoordiniert. Dies möchten wir ändern und mit diesem Projekt eine koordinierte Bürger*innenbeteiligung bei der Bewässerung städtischen Grüns ermöglichen.
        
Du möchtest Dich über das Gießen von Bäumen informieren, Pumpen melden und Dich mit anderen aktiven Nutzer:innen austauschen? Dann tritt unserem Slack-Chat bei! Du hast Feedback zu Gieß den Kiez? [Beantworte uns gerne ein paar Fragen](https://citylabberlin.typeform.com/to/kCdnCgvC#product_id=GdK)`,
      },
      qa: [
        {
          question: "Nützliche Links",
          answer: `[Initiative Lieblingsbaum](https://www.lieblingsbaum-initiative.de/)

[BUND - Aktion Bäume gießen](https://www.bund-berlin.de/mitmachen/aktion-baeume-giessen/)

[Baumpflegeportal - Gießen bei Trockenheit](https://www.baumpflegeportal.de/baumpflege/trockenheit-duerre-wann-baeume-giessen/)

[Stadtbaumkampagne Berlin](https://www.berlin.de/senuvk/umwelt/stadtgruen/stadtbaeume/kampagne/start.shtml)

[Projekt Bodenfeuchte Berlin](https://www.berlin.de/pflanzenschutzamt/stadtgruen/beratung/bewaesserungsempfehlung-fuer-stadtbaeume/)

[Grünbuch Stadtgrün](https://www.bmi.bund.de/SharedDocs/downloads/DE/publikationen/themen/bauen/wohnen/weissbuch-stadtgruen.html)

[Stadtbäume - Bedeutung und Herausforderungen in Zeiten des Klimawandels](https://www.hcu-hamburg.de/fileadmin/documents/REAP/files/Bildungsmaterial_Stadtbaeume_im_Klimawandel_2017.pdf)

[BUND - Funktionen von Stadtbäumen](https://www.bund-naturschutz.de/natur-und-landschaft/stadt-als-lebensraum/stadtbaeume/funktionen-von-stadtbaeumen.html)`,
        },
        {
          question: "Über uns",
          answer: `„Gieß den Kiez” ist ein Projekt des [CityLAB Berlin](https://www.citylab-berlin.org/). Das CityLAB ist ein öffentliches Innovationslabor für die Stadt der Zukunft im ehemaligen Flughafen Berlin-Tempelhof. Gemeinsam mit einem großen Netzwerk aus Verwaltung, Zivilgesellschaft, Wissenschaft und Start-ups arbeiten wir an neuen Ideen für ein lebenswertes Berlin. Das CityLAB ist ein offener Ort zum Mitmachen! Wenn ihr mehr wissen wollt, schaut euch auf unserer Webseite um oder kommt einfach mal vorbei!

Das CityLAB ist ein Projekt der Technologiestiftung Berlin und wird gefördert durch die Berliner Senatskanzlei.

Tausche Dich mit unserer Gieß-Community aus! Wir würden uns sehr darüber freuen, in unserem dafür eingerichteten [Slack-Chat](https://join.slack.com/t/giessdenkiez/shared_invite/zt-e3et281u-xON4UmBZpKavzDRkw5HmCQ) von Dir zu hören.

Presseanfragen gehen am besten an: [Anna Hantelmann](mailto:anna.hantelmann@ts.berlin?subject=giessdenkiez.de%20Presseanfrage">anna.hantelmann@ts.berlin), Tel.: +49 151 18457 242`,
        },
        {
          question: "Datenquellen",
          answer: `Die Karte zeigt einen Großteil der Berliner Straßen- und Anlagenbäume (839.049; Stand: Mai 2023). Zusätzlich wird abgebildet, wie viel Niederschlag in den letzten 30 Tagen bei jedem Baum gefallen ist und ob diese in der Zeit bereits gegossen wurden. Aus verschiedenen Gründen sind leider noch nicht alle Berliner Stadtbäume aufgeführt. Wir arbeiten aber daran, die Datenlage zu verbessern und eine möglichst vollständige Darstellung des Berliner Baumbestandes zu erreichen. Die aktuellen Datenquellen sind:

[Geoportal Berlin / Straßenbäume](https://fbinter.stadt-berlin.de/fb/berlin/service_intern.jsp?id=s_wfs_baumbestand@senstadt&type=WFS)
            
[Geoportal Berlin / Anlagenbäume](https://fbinter.stadt-berlin.de/fb/berlin/service_intern.jsp?id=s_wfs_baumbestand_an@senstadt&type=WFS)
            
[Deutscher Wetterdienst](https://www.dwd.de/)
            
Pumpen aus [Open Street Map](https://www.openstreetmap.de)`,
        },
      ],
    },
    faq: {
      title: "F.A.Q.",
      description:
        "Basierend auf dem regen Austausch unserer Community auf Slack & euren Rückmeldungen per Email und Telefon, haben wir ein kleines FAQ angelegt. Hier werden die am häuftigsten gestellten Fragen beantwortet.",
      qa: [
        {
          question: "Wie kann ich mitmachen?",
          answer: `
Informieren:

Neugierig, welcher Baum vor Deiner Tür steht? Unsere interaktive Karte visualisiert über 800.000 Straßen- und Anlagenbäume Berlins. Wenn Du mehr über einen Baum erfahren willst, navigiere und zoome Dich zum gewünschten Standort und klicke auf den farbigen Punkt. Nun werden Dir im Menüband links zahlreiche Informationen zum ausgewählten Baum angezeigt.

Bäume bewässern und adoptieren:

Du möchtest aktiv werden oder bist bereits aktiv am Gießen? Auf Gieß den Kiez kannst Du eintragen, ob und mit wie viel Wasser Du einen Baum gegossen hast. Bäume können auch adoptiert werden. Die adoptierten Bäume erscheinen im eigenen Nutzerprofil und können schneller wiedergefunden werden. So können andere Nachbarn in der Umgebung sehen, welche Bäume ihre Aufmerksamkeit benötigen. Um Bäume zu bewässern und zu adoptieren, lege dazu zunächst ein Profil mit einer gültigen Email-Adresse an und logge Dich im Anschluss ein. Nun kannst Du deine Gieß-Aktionen entsprechend dokumentieren und sehen, ob und wie oft Bäume in deinem Kiez bereits von anderen Nutzer:innen gegossen wurden.

Vernetzen:

Über unseren öffentlichen [Slack Channel](https://join.slack.com/t/giessdenkiez/shared_invite/zt-e3et281u-xON4UmBZpKavzDRkw5HmCQ) kannst Du dich mit anderen Gießer:innen austauschen und defekte Pumpen in deinem Kiez melden.`,
        },
        {
          question:
            "Was kann ich tun, wenn Bäume nicht richtig eingetragen sind?",
          answer:
            "Wir beziehen den Baum-Datensatz mit allen Attributen wie bspw. Adresse, Baumart und Pflanzjahr je Baum aus dem Geoportal der Stadt Berlin, dem FIS-Broker. Das im Geoportal bereitgestellte Baumkataster basiert wiederum auf den bezirklich aggregierten Daten der Straßen- und Grünflächenämter. Es kann daher immer wieder vorkommen, dass Daten von Bäumen veraltet sind oder Eigenschaften der tagesaktuellen Realität abweichen. Leider können wir selbst keine Änderungen im Baumkataster vornehmen. Etwaige Abweichungen können nur direkt bei der zuständigen bezirklichen Behörde gemeldet werden. Einmal im Jahr veröffentlichen die Grünflächenämter aber ein aktualisiertes Baumkataster, das wir nach Veröffentlichung mit Gieß den Kiez verknüpfen.",
        },
        {
          question: "Warum sollte ich aktiv werden und Bäume gießen?",
          answer:
            "Die langanhaltenden Dürre- und Hitzeperioden der letzten zwei Jahre haben dem Stadtgrün Berlins immens zugesetzt. Wenngleich nicht nur auf Trockenschäden zurückzuführen, mussten allein im Zeitraum zwischen 2018 und 2019 über 7.000 Bäume gefällt werden. Die Straßen- und Grünflächenämter sind bereits aktiv, kommen allerdings mit dem Gießen während Berliner Hitze-Sommern nicht hinterher. Da die Grünflächenämter bezirklich organisiert sind, arbeitet jeder Bezirk etwas anders, sodass eine ganzheitliche und bedarfsgerechte Koordination durchaus mit Hürden verbunden ist. Durch die Plattform möchten wir auch Bürger:innen die Möglichkeit geben, Bäumen gezielt auf Grundlage ihrer aktuellen Wasserversorgung zu helfen und sich zu informieren. Ziel ist es, möglichst viele Bäume durch nachbarschaftliches Engagement zu retten.",
        },
        {
          question: "Wie gieße ich richtig?",
          answer: `Je nach Alter, Standort und Baumart benötigen Bäume unterschiedlich viel Wasser. Jungbäume (0-15 Jahre), benötigen mehr Wasser als mittelalte Bäume (15-40 Jahre). Altbäume (ab 40 Jahre) sind meist komplette Selbstversorger. Da frisch gepflanzte Bäume bis zum Alter von drei Jahren in der Regel von den bezirklichen Grünflächenämtern mit Wasser versorgt werden, benötigen besonders die Bäume zwischen vier und 15 Jahren unsere Aufmerksamkeit, beziehungsweise unser Wasser. Dies haben wir mit den Kennzeichnungen des geringen, mittleren oder hohen Wasserbedarfs hervorgehoben. Angelehnt an das Berliner [Handbuch Gute Pflege](https://www.berlin.de/sen/uvk/natur-und-gruen/stadtgruen/pflegen-und-unterhalten/handbuch-gute-pflege/) empfehlen wir euch, lieber selten, dafür mit größeren Menge an Wasser zu gießen. Das Handbuch empfiehlt für frisch gepflanzte Bäume bis zu 200l pro Gießung. So sorgt ihr dafür, dass die Bodenfeuchte auch in der Tiefe erhöht wird. Im Endeffekt schaden aber auch kleinere Mengen gerade im Hochsommer nicht. Wichtig ist es, den ausgetrockneten Boden vor dem Gießen aufzulockern, sodass das Wasser in den Boden eindringen kann und nicht oberirdisch abläuft oder sich falsch anstaut. Auch zu empfehlen sind sogenannte Gießsäcke aus denen das Wasser nur sehr langsam austritt, kaum oberflächlich abläuft und somit kontinuierlich in den Boden sickert.`,
        },
        {
          question:
            "An wen kann ich mich wenden, wenn Pumpen kaputt oder beschädigt sind?",
          answer: `Für die Infrastruktur der Straßen, zu denen auch die öffentlichen Schwengelpumpen zählen, sind die jeweiligen Straßen- und Grünflächenämter der Bezirke verantwortlich. Sollten Pumpen kaputt oder beschädigt sein, kann dort Reparaturbedarf gemeldet werden. Die Standorte der Pumpen in der Karte laden wir wöchentlich aus der Datenbank von Open Street Map. Wenn Ihr helfen wollt, die Daten zu verbessern, indem ihr zum Beispiel eine defekte Pumpe meldet, könnt ihr das in unserem [Slack Channel #pumpen-melden](https://app.slack.com/client/T012K4SDYBY/C019SJQDPL7) tun. Die OSM-Community hat dann die Möglichkeit eure Informationen in die Datenbank einzutragen.`,
        },
        {
          question: "Wie wird mit technischen Problemen umgegangen?",
          answer: `Bei der Beteiligungsplattform „Gieß den Kiez” handelt es sich um einen Prototypen und demnach um eine Beta-Version einer Web-App. Wir sind uns einigen technischen Hürden bewusst, sind aber auf eure Mithilfe angewiesen. Euer technisches Feedback und eure Fragen nehmen wir gerne in unserem [Slack Channel](https://join.slack.com/t/giessdenkiez/shared_invite/zt-e3et281u-xON4UmBZpKavzDRkw5HmCQ) oder per Mail entgegen. Wer sich in der „Tech-Welt” zu Hause fühlt, ist herzlich zur Mitarbeit in unserem [Open Source GitHub Repository](https://github.com/technologiestiftung/giessdenkiez-de) eingeladen und kann seine Issues oder Code Fixes direkt in das Repository kommentieren.`,
        },
        {
          question: "Warum lädt die Website nicht oder nur sehr langsam?",
          answer: `Wenn die Seite zum ersten Mal geöffnet wird, lädt der Browser über 800.000 Datenpunkte – das kann eine Weile dauern! Unabhängig davon, kann es zu leicht unterschiedlichen  Darstellungen bei der Verwendung unterschiedlicher Browser kommen. Für die beste „Experience” empfehlen wir die Nutzung von Chrome oder Firefox Desktop. Die häufigsten Probleme lassen sich erfahrungsgemäß beseitigen, wenn der Browser nicht veraltet, respektive die neueste Version installiert ist und eine stabile Internetverbindung (LAN oder WLAN) besteht. Die Nutzung über das Smartphone (Mobilfunknetz) kann zu Performance-Problemen (Seite lädt langsam) führen. Sollten wiederholt Probleme auftreten, könnt ihr diese in unserem [Slack Channel](https://join.slack.com/t/giessdenkiez/shared_invite/zt-e3et281u-xON4UmBZpKavzDRkw5HmCQ)>, per Mail oder via GitHub Issue unter Angabe des benutzten Geräts, des Betriebssystems, des Browsers und Version des Browsers melden.`,
        },
        {
          question:
            "Was tun, wenn ich einen Baum fälschlicherweise gegossen habe?",
          answer:
            "Um eine Gießung rückgängig zu machen, weil bspw. stattdessen der Nachbarbaum oder zu einem anderen Tag gegossen wurde, klicke zunächst auf den Baum. Scrolle in der Seitenleiste des Baumes runter bis zur Ansicht der vergangenen Gießungen, klicke auf das Papierkorb-Symbol neben dem Eintrag, den Du löschen möchtest und klicke auf „Löschen”, um zu bestätigen. Es können nur Gießungen gelöscht werden, die Du selbst vorgenommen hast. Trage nach der Löschung die Gießung mit den richtigen Angaben (Anzahl an Litern und Zeitpunkt) ein.",
        },
        {
          question: "Ist das Prinzip auf andere Städte übertragbar?",
          answer: `Die „Gieß den Kiez” Plattform ist ein Open Source Software Projekt und läuft unter einer MIT Lizenz. Dementsprechend kann die Idee, aber auch der Quellcode für die Umsetzung in anderen Städten kostenlos genutzt und weiterentwickelt werden. Wenn Du Dich dafür interessierst, schau gerne in unserem [Open Source GitHub Repository](https://github.com/technologiestiftung/giessdenkiez-de) vorbei oder kontaktiere uns via Mail.`,
        },
        {
          question: "Ich habe immer noch eine Frage!",
          answer: `Das FAQ konnte Dir nicht weiterhelfen oder Du hast eine komplexere Anfrage? Dann schreib uns eine [E-Mail](mailto:giessdenkiez@citylab-berlin.org)`,
        },
        {
          question: "Warum werden nicht alle Bäume Berlins angezeigt?",
          answer:
            "Gieß den Kiez baut auf dem Baumkataster auf. Das Baumkataster ist ein Verzeichnis der Stadt, in dem (Stadt-/Straßen- oder Park-)Bäume verwaltet werden und das durch die Straßen- und Grünflächenämter bereitgestellt wird. Das Straßen- und Grünflächenamt ist aber nicht für alle Bäume Berlins zuständig. Die Bäume im Plänterwald beispielsweise unterliegen dem Forstamt. Diese Bäume tauchen daher bei Gieß den Kiez nicht auf.",
        },
      ],
    },
    share: {
      title:
        "Teile Gieß den Kiez mit Deinem Umfeld und hilf uns die Gieß-Community zu vergrößern:",
      content:
        "Auf Gieß den Kiez kannst Du Dich über den Berliner Baumbestand erkundigen, durstige Bäume finden, und eintragen, wann Du diese gegossen hast!",
      openSource:
        "Gieß den Kiez ist ein [OpenSource Projekt](https://github.com/technologiestiftung/giessdenkiez-de)!",
    },
  },
  treeDetail: {
    title: "Bauminformationen",
    adoptIt: "Diesen Baum adoptieren",
    alreadyAdoptedBy: "Auch von anderen User:innen adoptiert",
    ageTitle: "Standalter",
    age: (age: number) => `${age} Jahre`,
    ageUnknown: "Unbekannt",
    managedBy:
      "Dieser Baum wird bereits vom Bezirksamt versorgt und muss nicht gegossen werden.",
    waterNeed: {
      title: "Wasserbedarf",
      hint: "Je nach Baumalter unterscheidet sich der Bedarf an Wasser.",
      needXLiters: (liters: number) => `Braucht ${liters} Liter pro Woche`,
      needsOnlyOnDryDays: "Braucht nur an trockenen Tagen Wasser",
      waterManaged: "Vom Bezirksamt versorgt",
      unknownTitle: "Wasserbedarf unbekannt",
      unknown:
        "Das Alter, und dementsprechend der Wasserbedarf, sind leider unbekannt. Eventuell hilft Dir die Infobox für eine eigenständige Einschätzung.",
      liters: "Liter",
      watered: "gegossen",
      rained: "Regen",
      stillMissing: "fehlen noch",
      dataOfLastXDays: "* Daten der letzen 7 Tage",
      manager: "vom Bezirksamt",
      alreadyWateredByManager: "Bereits vom Bezirksamt versorgt",
      stillWaterXLiters: (liters: number) => `Noch ${liters} Liter gießen`,
      shouldBeWatered: "Sollte gegossen werden",
      sufficientlyWatered: "Momentan ausreichend bewässert",
      ageAndWaterHintTitle: "Wasserbedarf und Standalter",
      ageAndWaterHint: `
   **Baby (unter 4 Jahren):** Wir sind frische Jungbäume und unser Durst wird vom bezirklichen Grünflächenamt gestillt.

   **Jung (4-14 Jahre):** In dem Alter werden wir nicht mehr in allen Bezirken von der Verwaltung bewässert und sind noch keine „Selbstversorger“. Wir freuen uns über viel Wasser von bis zu 200l pro Gießung (ein Mal in der Woche).

   **Erwachsen (15-40 Jahre):** Wir haben ein gewisses Durchhaltevermögen aber brauchen in heißen Phasen auch einen ordentlichen extra Schluck Wasser: bis zu 100l ein Mal in der Woche.

   **Alt (über 40 Jahre):** Wir kommen weitestgehend alleine klar, freuen uns in besonders trockenen Phasen aber dennoch über einen extra Schluck.`,
      lastXDaysYLitersWater: (days: number, liters: number) =>
        `Die letzten ${days} Tage wurden **${liters} Liter gegossen**.`,
      lastXDaysYLitersRain: (days: number, liters: number) =>
        `In den letzten ${days} Tagen sind **${liters} Liter Regen** gefallen.`,
    },
    lastWaterings: {
      title: "Letzte Gießungen",
      thisWeek: "Diese Woche",
      nothingThisWeek: "Keine Gießungen diese Woche",
      thisMonth: "Dieser Monat",
      nothingThisMonth: "Keine Gießungen diesen Monat",
      thisYear: "Dieses Jahr",
      nothingThisYear: "Keine Gießungen dieses Jahr",
    },
    problem: {
      title: "Problem melden",
      description:
        "Du hast einen Baumschaden entdeckt, oder die Baumscheibe wird missbraucht? Teile es dem Ordnungsamt mit!",
      link: "Zum offiziellen Formular",
    },
  },
};

export default de;

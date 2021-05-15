interface Item {
  title: string;
  description: string;
}

type TreeTypeId = 'LINDE' | 'AHORN' | 'EICHE' | 'KASTANIE' | 'PLATANE';
export interface TreeType extends Item {
  id: TreeTypeId;
}

type IconType = 'info' | 'zoom' | 'water' | 'subscribe';
export interface CollaborationItem extends Item {
  icon: IconType;
}
interface FAQ extends Item {
  qa: Array<{ question: string; answer: string }>;
}
interface Content {
  faq: FAQ;
  imprintAndPrivacy: Item;
  intro: {
    title: string;
    subline: string;
    disclaimer: string;
    description: string[];
  };
  //pls do not delete the following eventNote section to facilitate process of enabling/disabling future news & notes
  //if event announcemnt is needed just de-comment this section and fill in the announcement text below
  eventNote?: {
    title: string;
  };
  whatsNew?: {
    title: string;
    description: string[];
  };
  loading: {
    snippets: string[];
  };
  sidebar: {
    about: Item[];
    waterNeeds: Item[];
    treetypes: TreeType[];
  };
  collaborate: {
    title: string;
    tiles: CollaborationItem[];
  };
}

const content: Content = {
  faq: {
    title: 'F.A.Q.',
    description:
      'Basierend auf dem regen Austausch unserer Community auf Slack & euren Rückmeldungen per E-Mail und Telefon, haben wir ein kleines FAQ angelegt. Hier werden die am häuftigsten gestellten Fragen beantwortet.',
    qa: [
      {
        question: 'Wie kann ich mitmachen?',
        answer:
          'Du bist einfach nur neugierig welcher Baum vor deiner Tür steht? Kein Problem: navigiere und zoome zum gewünschten Standort und klicke auf den farbigen Punkt. Nun werden dir im Menüband links zahlreiche Informationen zum ausgewählten Baum angezeigt. <br> <br> Du möchtest aktiv werden oder bist breits aktiv am Gießen? Dann kannst du hier einen oder mehrere Bäume adoptieren. Lege dazu zunächst ein Profil mit einer gültigen E-Mail-Adresse an und logge dich im Anschluss ein. Nun kannst du deine Gieß-Aktionen entsprechend dokumentieren und sehen ob und wie oft Bäume in deinem Kiez bereits von anderen Nutzer*innen gegossen wurden.',
      },
      {
        question:
          'Was kann ich tun, wenn Bäume nicht richtig eingetragen sind?',
        answer:
          'Wir beziehen den Baum-Datensatz mit allen Attributen wie bspw. Adresse, Baumart und Pflanzjahr je Baum aus dem Geoportal der Stadt Berlin, dem FIS-Broker. Die im Geoportal bereitgestellten Daten basieren wiederum auf den bezirklich aggregierten Daten der Straßen- und Grünflächenämter. Es kann daher immer wieder vorkommen, dass Daten von Bäumen veraltet sind oder Eigenschaften der tagesaktuellen Realität abweichen. <br><br> Wir arbeiten bereits an einer Idee, damit Bürger*innen Informationen zu Bäumen in Zukunft selbst melden können. Aktuell jedoch gibt es keinen solchen Meldedialog. Etwaige Abweichungen können direkt bei der zuständigen bezirklichen Behörde gemeldet werden.',
      },
      {
        question: 'Warum sollte ich aktiv werden und Bäume gießen?',
        answer:
          'Die langanhaltenden Dürre- und Hitzeperioden der letzten zwei Jahre haben dem Stadtgrün Berlins immens zugesetzt. Wenngleich nicht nur auf Trockenschäden zurückzuführen, mussten allein in diesem Zeitraum über 7.000 Bäume gefällt werden. <br><br> Die Straßen- und Grünflächenämter sind bereits aktiv, kommen allerdings mit dem Gießen nicht hinterher. Da die Grünflächenämter bezirklich organisiert sind, arbeitet jeder Bezirk etwas anders, sodass eine ganzheitliche und bedarfsgerechte Koordination durchaus mit Hürden verbunden ist. Durch die Plattform möchten wir auch Bürger*innen die Möglichkeit geben, Bäumen gezielt auf Grundlage deren aktuellen Wasserversorgung zu helfen. Ziel ist es, möglichst viele Bäume durch nachbarschaftliches Engagement zu retten.',
      },
      {
        question: 'Wie gieße ich richtig?',
        answer:
          'Je nach Alter, Standort und Baumart benötigen Bäume unterschiedlich viel Wasser. Jungbäume <br> (0-15 Jahre), benötigen mehr Wasser als mittelalte Bäume (15-40 Jahre). Altbäume (ab 40 Jahre) sind meist komplette Selbstversorger. <br>Da frisch gepflanzte Bäume bis zum Alter von drei Jahren in der Regel von den bezirklichen Grünflächenämtern mit Wasser versorgt werden, benötigen besonders die Bäume zwischen vier und 15 Jahren unsere Aufmerksamkeit, beziehungsweise unser Wasser. Dies haben wir mit den Kennzeichungen des geringen, mittleren oder hohen Wasserbedarfs hervorgehoben.<br><br> Angelehnt an das Berliner <a traget="blank" href="https://www.berlin.de/senuvk/umwelt/stadtgruen/pflege_unterhaltung/de/hgp/index.shtml">Handbuch Gute Pflege</a> empfehlen wir euch, lieber seltener zu wässern, dafür mit einer größeren Menge an Wasser. Das Handbuch empfiehlt für frisch gepflanzte Bäume bis zu 200 Liter pro Gießung. So sorgt ihr dafür, dass die Bodenfeuchte auch in der Tiefe erhöht wird. Im Endeffekt schaden aber auch kleinere Mengen gerade im Hochsommer nicht. Wichtig ist es, den ausgetrockneten Boden vor dem Gießen aufzulockern, sodass das Wasser in den Boden eindringen kann und nicht wegläuft oder sich falsch anstaut. Auch zu empfehlen sind sog. Gießsäcke aus denen das Wasser nur sehr langsam ausstritt, kaum oberflächig abläuft und somit kontinuierlich in den Boden sickert.',
      },
      {
        question:
          'An wen kann ich mich wenden, wenn Pumpen kaputt oder beschädigt sind?',
        answer: `Für die Infrastruktur der Straßen, zu denen auch die öffentlichen Schwengelpumpen zählen, sind die jeweiligen Straßen- und Grünflächenämter der Bezirke verantwortlich. Sollten Pumpen kaputt oder beschädigt sein, kann dort Reparaturbedarf gemeldet werden. Die Standorte der Pumpen in der Karte werden regelmäßig aus der Open Street Map geladen. Wenn Ihr helfen wollt die Daten zu verbessern, indem ihr zum Beispiel eine defekte Pumpe meldet, könnt ihr das in unserem <a target="blank" href="https://app.slack.com/client/T012K4SDYBY/C019SJQDPL7">Slack Channel #pumpen-melden </a>
        tun. Die OSM-Community hat dann die Möglichkeit eure Informationen in die Datenbank einzutragen.`,
      },
      {
        question: 'Wie wird mit technischen Problemen umgegangen?',
        answer:
          'Bei der Beteiligungsplattform “Giess den Kiez” handelt es sich um einen Prototypen, respektive um eine Beta-Version einer Web-App. Wir sind uns einigen technischen Hürden bewusst und wollen die Plattform in Zukunft performanter und stabiler gestalten, bitten euch aber diesbezüglich um etwas Geduld und Verständnis. <br><br> Euer technisches Feedback und eure Fragen nehmen wir gerne in unserem <a target="blank" href="https://join.slack.com/t/giessdenkiez/shared_invite/zt-e3et281u-xON4UmBZpKavzDRkw5HmCQ">Slack Channel</a> oder per Mail entgegen. Wer sich in der “Tech-Welt” zu Hause fühlt, ist herzlich zur Mitarbeit in unserem <a target="blank" href="https://github.com/technologiestiftung/giessdenkiez-de">Open Source GitHub Repository</a> eingeladen und kann seine Issues oder Code Fixes direkt in das Repository kommentieren.',
      },
      {
        question: 'Warum lädt die Website nicht oder nur sehr langsam?',
        answer:
          'Wenn die Seite zum ersten Mal geöffnet wird, lädt der Browser über 625.000 Datenpunkte – das kann eine Weile dauern! Unabhängig davon, kann es zu leicht unterschiedlichen  Darstellungen bei der Verwendung unterschiedlicher Browser kommen. Für die beste “Experience” empfehlen wir die Nutzung des Chrome-Browsers am Desktop. Die häufigsten Probleme lassen sich erfahrungsgemäß beseitigen, wenn der Browser nicht veraltet, respektive die neueste Version installiert ist und eine stabile Internetverbindung (LAN oder WLAN) besteht. <br><br> Die Nutzung via Mobilfunknetz kann zu Performance-Problemen (Seite lädt langsam) führen. Sollten wiederholt Probleme auftreten, könnt ihr diese auf <a target="blank" href="https://join.slack.com/t/giessdenkiez/shared_invite/zt-e3et281u-xON4UmBZpKavzDRkw5HmCQ">Slack</a>, per Mail oder via GitHub Issue unter Angabe des benutzten Geräts, des Betriebssystems, des Browsers und Version des Browsers melden.',
      },
      {
        question:
          'Was tun, wenn ich einen Baum fälschlicherweise gegossen habe?',
        answer:
          'Eine Funktion, um Gieß-Aktivitäten rückgängig zu machen, weil bspw. stattdessen der Nachbarbaum gegossen wurde, existiert leider nicht.',
      },
      {
        question: 'Ist das Prinzip auf andere Städte übertragbar?',
        answer:
          'Die “Gieß den Kiez” Plattform ist ein Open Source Software Projekt und läuft unter einer MIT Lizenz. Dementsprechend kann die Idee, aber auch der Quellcode für die Umsetzung in anderen Städten kostenlos genutzt und weiterentwickelt werden. Wenn Du dich dafür interessierst, schau gerne in unserem <a target="blank" href="https://github.com/technologiestiftung/giessdenkiez-de">GitHub Repository</a> vorbei oder kontaktiere uns via Mail.',
      },
      {
        question: 'Ich habe immer noch eine Frage!',
        answer:
          'Das FAQ konnte dir nicht weiterhelfen oder du hast eine komplexere Anfrage? Dann schreib uns eine <a href="mailto:giessdenkiez@citylab-berlin.org?subject=[Giess Den Kiez] Frage:...">E-Mail.</a>',
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
      '<a target="blank" href="https://www.technologiestiftung-berlin.de/de/impressum/">Impressum</a> und <a target="blank" href="https://www.technologiestiftung-berlin.de/de/datenschutz/">Datenschutz</a>',
  },
  intro: {
    title: '<b>Gieß den <span>Kiez</span></b>',
    subline:
      'Die Berliner Stadtbäume leiden unter Trockenheit <br class="large" /> und Du kannst ihnen helfen!',
    disclaimer:
      'Hinweis: Das Laden von 625.000 Bäumen ist ressourcenintensiv und funktioniert aktuell nicht auf allen Mobilgeräten einwandfrei. Wir empfehlen die Nutzung via Desktop-Computer',
    description: [
      'Auf dieser Plattform kannst Du Dich über Bäume in deiner Nachbarschaft und ihren Wasserbedarf informieren. Du kannst einzelne Bäume adoptieren und markieren, wenn Du sie gegossen hast.',
      'Informiere Dich ich über das richtige Gießen von Stadtbäumen. Wenn Du die Seite regelmäßig nutzen möchtest, solltest Du ein Konto erstellen. Die Karte kannst Du aber auch ohne Konto erkunden.',
    ],
  },
  //pls do not delete the following eventNote section to facilitate process of enabling/disabling future news & notes
  // eventNote: {
  //   title:
  //     '<b>Gieß den Kiez LIVE: </b><br>Der Sommer neigt sich dem Ende zu und wir werden analog! Melde Dich jetzt für unser <a target="blank" href="https://www.citylab-berlin.org/events/freiwilligentage/">Mitmach-Event</a> am 11. September an und besuche uns im CityLAB Berlin.',
  // },
  whatsNew: {
    title: 'Was ist neu?',
    description: [
      `Der Frühling kann kommen! Wir haben unser Backlog aufgeräumt, einige Funktionen verbessert und neue Funktionen hinzugefügt. Die wichtigsten Verbesserungen im Überblick:<br />
      <div style="padding-top:0.5rem;padding-bottom:0.5rem; display:flex">
        <div>
          <img style="max-width:14px; margin-right: 5px;" alt="Geolocate Icon" src="/images/geolocate-icon.png"/><b>Geolokalisierung</b><br>
          Mit einem Klick auf das Icon am unteren linken Bildschirmrand zum eigenen Standort navigieren.
        </div>
      </div>
      <div style="padding-top:0.5rem;padding-bottom:0.5rem; display:flex">
        <div>   
          <span style="display:inline-block; background-color:#75ADE8; width: 13px; height: 13px; border-radius: 100px; margin-right: 4px;"></span>
          <b>Map-Layout</b><br>
          Die Hintergrundkarte erstrahlt in neuen Farben und zeigt euch Hausnummern & ÖPNV-Haltestellen.`,

      `<div style="padding-top:0.5rem;padding-bottom:0.5rem; display:flex">
      <div>Mit dem 
        <span style="display:inline-block; background-color:#37DE8A; width: 13px; height: 13px; border-radius: 100px; margin: 0 4px 0 4px;"></span>
        <b>Baum-Routing</b>
        verfügt nun jeder Baum über einen ganz persönlichen Link, der sich prima mit Gieß-Freund:innen oder Grünflächenämtern teilen lässt.
      </div>
    </div>
  Wenn ihr in Sachen <i>technische Releases</i> auf dem Laufenden bleiben wollt, dann schaut doch mal in unserem Open Source
  <a target="blank" href="https://github.com/technologiestiftung/giessdenkiez-de">GitHub Repository</a>
  vorbei und unterstützt uns beim Entwickeln. Die nächsten Features sind schon in Planung.`,
    ],
  },
  loading: {
    snippets: [
      'Wir laden gerade 625.000 Bäume aus dem Berliner Baumbestand.',
      'Wenn du diese Seite über das Mobilfunknetz aufrufst, kann es etwas dauern.',
      'Sammle Informationen aller Bäume aus Berlins Stadtkataster.',
      'Schon gewusst? Ein Stadtbaum benötigt etwa 70 Liter Wasser in der Woche.',
    ],
  },
  sidebar: {
    about: [
      {
        title: 'Über das Projekt',
        description:
          'Die Folgen des Klimawandels, insbesondere die trockenen und heißen Sommer, belasten das Berliner Ökosystem. Unsere Stadtbäume vertrocknen und tragen langfristige Schäden davon: In den letzten Jahren mussten immer mehr Bäume gefällt werden und ihre Lebensdauer sinkt. Inzwischen wird die Bevölkerung regelmäßig zur Unterstützung aufgerufen, allerdings weitgehend unkoordiniert. Dies möchten wir ändern und mit diesem Projekt eine koordinierte Bürger*innenbeteiligung bei der Bewässerung städtischen Grüns ermöglichen.',
      },
      {
        title: 'Nützliche Links',
        description:
          '<ul><li><a target="blank" href="https://www.lieblingsbaum-initiative.de/">Initiative Lieblingsbaum</a></li><li><a target="blank" href="https://www.bund-berlin.de/mitmachen/aktion-baeume-giessen/">BUND - Aktion Bäume gießen</a></li><li><a target="blank" href="https://www.baumpflegeportal.de/baumpflege/trockenheit-duerre-wann-baeume-giessen/">Baumpflegeportal - Gießen bei Trockenheit</a></li><li><a target="blank" href="https://www.berlin.de/senuvk/umwelt/stadtgruen/stadtbaeume/kampagne/start.shtml">Stadtbaumkampagne Berlin</a></li><li><a target="blank" href="https://www.berlin.de/pflanzenschutzamt/stadtgruen/beratung/bewaesserungsempfehlung-fuer-stadtbaeume/">Projekt Bodenfeuchte Berlin</a></li><li><a target="blank" href="https://www.bmi.bund.de/SharedDocs/downloads/DE/publikationen/themen/bauen/wohnen/weissbuch-stadtgruen.html">Grünbuch Stadtgrün</a></li><li><a target="blank" href="https://www.hcu-hamburg.de/fileadmin/documents/REAP/files/Bildungsmaterial_Stadtbaeume_im_Klimawandel_2017.pdf">Stadtbäume - Bedeutung und Herausforderungen in Zeiten des Klimawandels</a></li><li><a target="blank" href="https://www.bund-naturschutz.de/natur-und-landschaft/stadt-als-lebensraum/stadtbaeume/funktionen-von-stadtbaeumen.html">BUND - Funktionen von Stadtbäumen</a></li></ul>',
      },
      {
        title: 'Über uns',
        description: `“Gieß den Kiez” ist ein Projekt des <a target="blank" href="https://www.citylab-berlin.org/">CityLAB Berlin</a>. Das CityLAB ist ein öffentliches Innovationslabor für die Stadt der Zukunft im ehemaligen Flughafen Berlin-Tempelhof. Gemeinsam mit einem großen Netzwerk aus Verwaltung, Zivilgesellschaft, Wissenschaft und Start-ups arbeiten wir an neuen Ideen für ein lebenswertes Berlin. Das CityLAB ist ein offener Ort zum Mitmachen! Wenn ihr mehr wissen wollt, schaut euch auf unserer Webseite um oder kommt einfach mal vorbei! <br /> <br /> Das CityLAB ist ein Projekt der Technologiestiftung Berlin und wird gefördert durch die Berliner Senatskanzlei. <br /> <br /> Du hast Feedback? Wir würden uns sehr darüber freuen, in unserem dafür eingerichteten <a target="blank" href="https://join.slack.com/t/giessdenkiez/shared_invite/zt-e3et281u-xON4UmBZpKavzDRkw5HmCQ">Slack-Kanal</a> von Dir zu hören.<br /> <br />Presseanfragen gehen am besten an:<br /> Frauke Nippel<br /><a href="mailto:nippel@technologiestiftung-berlin.de?subject=giessdenkiez.de%20Presseanfrage">nippel@technologiestiftung-berlin.de</a><br />
          <a href="tel:01757236451">0175 72 36 451</a>`,
      },
      {
        title: 'Datenquellen',
        description: `Die Karte zeigt einen Großteil der Berliner Straßen- und Anlagenbäume (625.000; Stand: 14.06.2019). Zusätzlich wird abgebildet, wie viel Niederschlag in den letzten 30 Tagen bei jedem Baum gefallen ist und ob diese in der Zeit bereits gegossen wurden. Aus verschiedenen Gründen sind leider noch nicht alle Berliner Stadtbäume aufgeführt. Wir arbeiten aber daran, die Datenlage zu verbessern und eine möglichst vollständige Darstellung des Berliner Baumbestandes zu erreichen. Die aktuellen Datenquellen sind:
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
          'Mittelalte Bäume zwischen 15 und 40 Jahren werden in der Regel nicht mehr durch die Grünflächenämter bewässert, haben aber schon ein gewisses Durchhaltevermögen. Aber auch für sie sind die Hitzesommer ungewohnt und sie freuen sich über jeden Eimer: Gerne ein Mal in der Woche mit bis zu 100 Litern gießen. ',
      },
      {
        title: 'Hoher Wasserbedarf',
        description:
          'Jungbäume zwischen vier und 15 Jahren werden nicht in allen Bezirken von der Verwaltung bewässert und sind noch keine „Selbstversorger“. Sie freuen sich über viel Wasser von bis zu 200 Liter pro Gießung (ein Mal in der Woche).',
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
          'Die Gattung der Ahorne umfasst ca. 20% des Gesamtbestandes. Für den Standort "Straße" ist vor allem der Spitzahorn (Acer platanoides) geeignet. Die frühe Blüte und die bunte Herbstfärbung machen den Ahorn zu einer besonders beliebten Baumgattung.',
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
          'Ein idealer Alleebaum für breite Straßen ist die Platane (Platanus acerifolia), die neben einer Höhe von 20 bis 30 Metern auch einen stattlichen Kronendurchmesser von 15 bis 20 Metern erreichen kann. Am Gesamtbestand haben die Platanen einen Anteil von etwa 6%. Die bekannteste und mit über 120 Jahren älteste Platanenallee in Berlin ist die Puschkinallee in Berlin-Treptow.',
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
    title: '<b>Wie kann ich mitmachen?</b>',
    tiles: [
      {
        icon: 'water',
        title: 'Bäume bewässern',
        description:
          'Informiere Dich auf unserer Plattform, ob die Bäume in deiner Straße Wasser benötigen. Wenn ja, schnapp Dir eine Gießkanne, einen Eimer oder einen Schlauch und leg los. Danach trägst Du die Bewässerung hier ein.',
      },
      {
        icon: 'subscribe',
        title: 'Bäume adoptieren',
        description:
          'Wenn Du regelmäßig die gleichen Bäume gießen willst, kannst Du sie adoptieren und so anzeigen, dass für sie gesorgt ist. So findet eine Koordinierung in der Nachbarschaft statt.',
      },
      {
        icon: 'zoom',
        title: 'Den Baumbestand erkunden',
        description:
          'Unsere Karte ermöglicht es, mehr über einzelne Bäume und auch den gesamten Baumbestand zu erfahren. Nutze die Filter- und Suchfunktion, um mehr über die Bäume Berlins zu lernen.',
      },
      {
        icon: 'info',
        title: 'Mit anderen austauschen',
        description:
          'Tritt unserem <a target="_blank" href="https://join.slack.com/t/giessdenkiez/shared_invite/zt-e3et281u-xON4UmBZpKavzDRkw5HmCQ">Slack-Kanal</a> bei, um Dich mit anderen User*innen auszutauschen und die Bewässerung von Bäumen in deinem Kiez zu koordinieren.',
      },
    ],
  },
};

export default content;

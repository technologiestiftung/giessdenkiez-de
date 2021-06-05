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
    title: 'Fragen & Antworten',
    description:
      '<a target="blank" href="https://stiftung-ecken-wecken.de/content/fragen-antworten">Hier</a> findest Du viele Tipps und Infos zum Gießen, zu Bäumen und zum Kontakt mit Anderen, die ebenfalls gießen.',
    qa: [
    ],
  },
  imprintAndPrivacy: {
    title: 'Impressum und Datenschutz',
    description:
      '<a target="blank" href="https://stiftung-ecken-wecken.de/impressum-sew">Impressum</a> und <a target="blank" href="https://stiftung-ecken-wecken.de/datenschutz">Datenschutz</a>',
  },
  intro: {
    title: '',
    subline:
      'Die Leipziger Straßenbäume leiden unter Trockenheit <br class="large" /> und Du kannst ihnen helfen!',
    disclaimer:
      'Hinweis: Das Laden von über 60.000 Bäumen ist ressourcenintensiv und funktioniert aktuell nicht auf allen Mobilgeräten einwandfrei. Wir empfehlen die Nutzung via Desktop/Notebook-Computer',
    description: [
      'Auf dieser Plattform kannst Du Dich über Bäume in Deiner Nachbarschaft und ihren Wasserbedarf informieren. Du kannst einzelne Bäume adoptieren und/oder auch dokumentieren, wieviel erfrischende Kaltgetränke Du ihnen gegeben hast.',
      'Informiere Dich <a target="blank" href="https://stiftung-ecken-wecken.de/content/fragen-antworten">hier</a> über das richtige Gießen von Bäumen. Wenn Du die Gieß-App von LEIPZIG GIESST regelmäßig nutzen möchtest, solltest Du ein Konto erstellen. Die Karte kannst Du aber auch ohne Konto erkunden.',
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
      `Der Frühling kann kommen! Wir haben einige Funktionen verbessert und neue Funktionen hinzugefügt. Die wichtigsten Verbesserungen im Überblick:<br />
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
          Die Hintergrundkarte erstrahlt in neuen Farben und zeigt Dir Hausnummern & ÖPNV-Haltestellen.`,

      `<div style="padding-top:0.5rem;padding-bottom:0.5rem; display:flex">
      <div>Mit dem 
        <span style="display:inline-block; background-color:#37DE8A; width: 13px; height: 13px; border-radius: 100px; margin: 0 4px 0 4px;"></span>
        <b>Baum-Routing</b>
        verfügt nun jeder Baum über einen ganz persönlichen Link, der sich prima mit Gieß-Freund*innen oder Grünflächenämtern teilen lässt.
      </div>
    </div>
  Wenn Du in Sachen <i>technische Releases</i> auf dem Laufenden bleiben möchtest, dann schau doch mal in unserem Open Source
  <a target="blank" href="https://github.com/CodeforLeipzig/tsb-trees-frontend">GitHub Repository</a>
  vorbei und unterstütze uns beim Entwickeln. Die nächsten Features sind schon in Planung.`,
    ],
  },
  loading: {
    snippets: [
      'Wir laden gerade über 60.000 Bäume aus dem Leipziger Straßenbaumbestand.',
      'Wenn du diese Seite über das Mobilfunknetz aufrufst, kann es etwas dauern.',
      'Sammle Informationen aller Bäume aus Leizpzigs Straßenbaumkataster.',
      'Schon gewusst? Ein junger Stadtbaum benötigt etwa 70 Liter Wasser in der Woche.',
    ],
  },
  sidebar: {
    about: [
      {
        title: 'Über das Projekt',
        description:
          'Die Folgen des Klimawandels, insbesondere die trockenen und heißen Sommer, belasten das Leipziger Ökosystem. Unsere Stadtbäume vertrocknen und tragen langfristige Schäden davon: In den letzten Jahren mussten immer mehr Bäume gefällt werden und ihre Lebensdauer sinkt. Inzwischen wird die Bevölkerung regelmäßig zur Unterstützung aufgerufen, allerdings weitgehend unkoordiniert. Dies möchten wir ändern und mit diesem Projekt eine koordinierte Bürger*innenbeteiligung bei der Bewässerung städtischen Grüns ermöglichen.',
      },
      {
        title: 'Über uns',
        description:
          `LEIPZIG GIESST ist ein gemeinsames Projekt von <a target="blank" href="https://codefor.de/leipzig/">OKLab Leipzig</a>, <a target="blank" href="https://www.leipzig.de/buergerservice-und-verwaltung/aemter-und-behoerdengaenge/behoerden-und-dienstleistungen/dienststelle/amt-fuer-stadtgruen-und-gewaesser-67/">Stadt Leipzig</a>, <a target="blank" href="https://stiftung-ecken-wecken.de/">Stiftung "Ecken wecken"</a>, <a target="blank" href="https://wir-im-quartier.net">Wir im Quartier</a> und <a target="blank" href="https://www.bund-leipzig.de">BUND Leipzig</a>. 
Das Projekt wird unterstützt durch das <a target="blank" href="https://www.citylab-berlin.org/">CityLAB Berlin</a> - ein Projekt der Technologiestiftung Berlin - deren App <a target="blank" href="https://www.giessdenkiez.de">Gieß den Kiez</a> die Basis für die Leipziger App von LEIPZIG GIESST bildet.`,
      },
      {
        title: 'Datenquellen',
        description:
          'Die Karte zeigt die Leipziger Straßenbäume. Zusätzlich wird abgebildet, wie viel Niederschlag in den letzten 30 Tagen bei jedem Baum gefallen ist und ob diese in dieser Zeit bereits gegossen wurden.',
      },
    ],
    waterNeeds: [
      {
        title: 'Niedriger Wasserbedarf',
        description:
          'Straßenbäume höheren Alters (>40 Jahre) haben in der Regel gelernt, sich über das Grundwasser selbst zu versorgen. Auch Jungbäume unter 3 Jahren haben einen niedrigen Wasserbedarf, da diese im Normalfall durch das Amt für Stadtgrün und Gewässer versorgt werden.',
      },
      {
        title: 'Mittlerer Wasserbedarf',
        description:
          'Mittelalte Bäume zwischen 15 und 40 Jahren werden in der Regel nicht mehr durch das Amt für Stadtgrün und Gewässer bewässert und haben schon ein gewisses Durchhaltevermögen. Aber auch für sie sind die Hitzesommer ungewohnt und sie freuen sich über jeden Eimer. ',
      },
      {
        title: 'Hoher Wasserbedarf',
        description:
          'Jungbäume zwischen 4 und 15 Jahren werden nur situationsbedingt durch das Amt für Stadtgrün und Gewässer bewässert und sie sind noch keine „Selbstversorger“. Sie freuen sich über viel Wasser, ca. 80 - 100 Liter pro Woche.',
      },
    ],
    treetypes: [
    ],
  },
  collaborate: {
    title: '<b>Wie kann ich mitmachen?</b>',
    tiles: [
      {
        icon: 'water',
        title: 'Bäume bewässern',
        description:
          'Informiere Dich auf unserer Plattform, ob Bäume in deiner Nähe Wasser benötigen. Wenn ja, schnapp Dir eine Gießkanne, einen Eimer oder einen Schlauch und leg los. Danach trägst Du die Bewässerung hier ein. Auf unserer <a target="_blank" href="https://stiftung-ecken-wecken.de/content/wasserquellen-transport">Webseite</a> findest Du Infos zu Wasserquellen und zum Wassertransport.',
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
          'Unsere Karte ermöglicht es, mehr über einzelne Bäume und auch den gesamten Baumbestand zu erfahren. Nutze die Filter- und Suchfunktion, um mehr über die Bäume Leipzigs zu lernen. Auf unserer <a target="_blank" href="https://stiftung-ecken-wecken.de/content/fragen-antworten">Webseite</a> findest weitere Infos dazu.',
      },
      {
        icon: 'info',
        title: 'Mit anderen austauschen',
        description:
          'Wir werden Dich mit unserem Newsletter, der an die E-Mail-Adresse Deines Benutzerkontos hier gesendet wird, über aktuelle Entwicklungen und Aktionen auf dem Laufenden halten.',
      },
      {
        icon: 'info',
        title: 'Noch mehr Mitmachen',
        description:
          'Du kannst aber auch im Projektteam mitarbeiten, Wasserspender werden, Andere fürs Gießen begeistern, Links zu LEIPZIG GIESST viel teilen oder in der Presse über LEIPZIG GIESST berichten. Auf unserer <a target="_blank" href="https://stiftung-ecken-wecken.de/content/mitgie%C3%9Fen-mitmachen">Webseite</a> findest weitere Infos dazu. Und natürlich freuen wir uns immer über Posts/Likes bei <a href="https://www.instagram.com/leipziggiesst" target="_blank">instagram</a> oder <a href="https://www.facebook.com/leipziggiesst" target="_blank">facebook</a>.',
      },
    ],
  },
};

export default content;

export interface Experience {
  id: string;
  company: string;
  position: string;
  period: string;
  description: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  period: string;
}

export interface Skill {
  id: string;
  name: string;
  level: number; // 1-5
}

export interface AdditionalSkill {
  id: string;
  name: string;
}

export interface LanguageSkill {
  id: string;
  name: string;
  level: number; // 1-5
}

export type ThemeId =
  | 'pro_navy'
  | 'modern_emerald'
  | 'elegant_crimson'
  | 'tech_midnight'
  | 'soft_lavender'
  | 'pure_minimal'
  | 'ocean_teal'
  | 'sunset_amber'
  | 'forest_green'
  | 'graphite_gray'
  | 'royal_blue'
  | 'warm_sand';
export type LayoutId = 'modern' | 'classic' | 'executive' | 'minimal' | 'split' | 'compact';
export type FontId = 'sans' | 'serif' | 'montserrat' | 'roboto_serif' | 'mono';

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  accent: string;
  accentBg: string;
  sidebar: string;
  previewColor: string;
}

export interface LayoutConfig {
  id: LayoutId;
  name: string;
  description: string;
}

export interface FontConfig {
  id: FontId;
  name: string;
  class: string;
}

export const THEMES: ThemeConfig[] = [
  { id: 'pro_navy', name: 'Business Navy', accent: 'text-indigo-700', accentBg: 'bg-indigo-700', sidebar: 'bg-slate-900', previewColor: '#1e293b' },
  { id: 'modern_emerald', name: 'Creative Mint', accent: 'text-emerald-600', accentBg: 'bg-emerald-600', sidebar: 'bg-slate-800', previewColor: '#10b981' },
  { id: 'elegant_crimson', name: 'Royal Ruby', accent: 'text-rose-800', accentBg: 'bg-rose-800', sidebar: 'bg-stone-100', previewColor: '#9f1239' },
  { id: 'tech_midnight', name: 'Cyber Dark', accent: 'text-cyan-400', accentBg: 'bg-cyan-400', sidebar: 'bg-black', previewColor: '#000000' },
  { id: 'soft_lavender', name: 'Soft Lilac', accent: 'text-purple-600', accentBg: 'bg-purple-600', sidebar: 'bg-purple-50', previewColor: '#a855f7' },
  { id: 'pure_minimal', name: 'Pure White', accent: 'text-slate-900', accentBg: 'bg-slate-900', sidebar: 'bg-white', previewColor: '#f1f5f9' },
  { id: 'ocean_teal', name: 'Ocean Teal', accent: 'text-teal-600', accentBg: 'bg-teal-600', sidebar: 'bg-slate-900', previewColor: '#0d9488' },
  { id: 'sunset_amber', name: 'Sunset Amber', accent: 'text-amber-600', accentBg: 'bg-amber-600', sidebar: 'bg-amber-50', previewColor: '#f59e0b' },
  { id: 'forest_green', name: 'Forest Green', accent: 'text-green-700', accentBg: 'bg-green-700', sidebar: 'bg-slate-900', previewColor: '#15803d' },
  { id: 'graphite_gray', name: 'Graphite Gray', accent: 'text-slate-700', accentBg: 'bg-slate-700', sidebar: 'bg-slate-100', previewColor: '#334155' },
  { id: 'royal_blue', name: 'Royal Blue', accent: 'text-blue-700', accentBg: 'bg-blue-700', sidebar: 'bg-slate-900', previewColor: '#1d4ed8' },
  { id: 'warm_sand', name: 'Warm Sand', accent: 'text-orange-700', accentBg: 'bg-orange-700', sidebar: 'bg-orange-50', previewColor: '#c2410c' },
];

export const LAYOUTS: LayoutConfig[] = [
  { id: 'modern', name: 'Modern', description: 'Sidebar-fokussiertes Layout mit klaren Strukturen.' },
  { id: 'classic', name: 'Klassik', description: 'Zentrierter Header, zeitloses einspaltiges Design.' },
  { id: 'executive', name: 'Executive', description: 'Professionelles zweispaltiges Layout ohne Trennung.' },
  { id: 'minimal', name: 'Minimal', description: 'Reduziertes, luftiges Design mit feinen Trennlinien.' },
  { id: 'split', name: 'Split', description: 'Zweispaltiges Layout mit rechter Sidebar und Fokus auf Inhalt.' },
  { id: 'compact', name: 'Kompakt', description: 'Platzsparend, ideal für kurze Profile und klaren Überblick.' },
];

export const FONT_OPTIONS: FontConfig[] = [
  { id: 'sans', name: 'Standard (Inter)', class: 'font-sans' },
  { id: 'montserrat', name: 'Modern (Montserrat)', class: 'font-montserrat' },
  { id: 'serif', name: 'Elegant (Playfair)', class: 'font-serif' },
  { id: 'roboto_serif', name: 'Klassik (Roboto)', class: 'font-roboto-serif' },
  { id: 'mono', name: 'Technisch (Mono)', class: 'font-mono' },
];

export interface ResumeData {
  selectedThemeId: ThemeId;
  selectedLayoutId: LayoutId;
  selectedFontId: FontId;
  personalInfo: {
    fullName: string;
    jobTitle: string;
    email: string;
    phone: string;
    street: string;
    zip: string;
    city: string;
    website: string;
    photo: string;
    summary: string;
  };
  coverLetter: {
    recipient: string;
    subject: string;
    date: string;
    text: string;
  };
  experiences: Experience[];
  education: Education[];
  skills: Skill[];
  languages: LanguageSkill[];
  strengths: string[];
  additionalSkills: AdditionalSkill[];
  customColors?: {
    primary: string;
    secondary: string;
  };
}

export interface SavedVersion {
  id: string;
  name: string;
  timestamp: number;
  data: ResumeData;
}

// Empty initial data for clean start
export const INITIAL_DATA: ResumeData = {
  selectedThemeId: 'pro_navy',
  selectedLayoutId: 'modern',
  selectedFontId: 'sans',
  personalInfo: {
    fullName: "",
    jobTitle: "",
    email: "",
    phone: "",
    street: "",
    zip: "",
    city: "",
    website: "",
    photo: "",
    summary: ""
  },
  coverLetter: {
    recipient: "",
    subject: "",
    date: new Date().toLocaleDateString('de-DE'),
    text: ""
  },
  experiences: [],
  education: [],
  skills: [],
  languages: [],
  strengths: [],
  additionalSkills: []
};

    // Added missing properties to INITIAL_DATA to match ResumeData interface
export const HAUSMEISTER_DATA: ResumeData = {
  selectedThemeId: 'forest_green',
  selectedLayoutId: 'classic',
  selectedFontId: 'sans',
  personalInfo: {
    fullName: "Erik von Brandt",
    jobTitle: "Hausmeister / Technischer Mitarbeiter",
    email: "erikvonbrandt@gmail.com",
    phone: "09542 4520366",
    street: "Pfarrer-Kropfeld-Straße 27",
    zip: "96110",
    city: "Scheßlitz",
    website: "",
    photo: "",
    summary: "Zuverlässiger, handwerklich vielseitiger Facharbeiter mit langjähriger Erfahrung in Gebäudeinstandhaltung, Reparatur und Pflege von Außenanlagen sowie technischer Betreuung von Immobilien. Über 25 Jahre selbstständige Tätigkeit mit hoher Eigenverantwortung in Handwerk, Bau, Restaurierung und Objektpflege."
  },
  coverLetter: {
    recipient: "An die Hausverwaltung / Personalabteilung\nAnsprechpartner bekannt / Unbekannt\nMusterstraße 123\n96047 Bamberg",
    subject: "Bewerbung als Hausmeister / Technischer Mitarbeiter",
    date: new Date().toLocaleDateString('de-DE'),
    text: "Sehr geehrte Damen und Herren,\n\nmit großer Motivation bewerbe ich mich auf die Position als Hausmeister bzw. technischer Mitarbeiter. Ich schätze klare Aufgabenbereiche, verlässliche Abläufe und den direkten Beitrag zum Werterhalt von Immobilien. Genau hier sehe ich meine Stärken: sorgfältige Instandhaltung, selbstständiges Erkennen von Mängeln und lösungsorientierte Umsetzung notwendiger Arbeiten.\n\nDurch meine langjährige selbstständige Tätigkeit im handwerklichen Bereich habe ich gelernt, strukturiert, verantwortungsbewusst und zuverlässig zu arbeiten. Mir ist wichtig, Aufgaben nicht nur auszuführen, sondern nachhaltige Lösungen zu schaffen, die Sicherheit, Ordnung und Funktionalität im Gebäude sichern.\n\nIch bringe praktische Erfahrung in Reparatur, Pflege von Außenanlagen sowie im Umgang mit technischen Anlagen mit und arbeite dabei stets respektvoll mit Bewohnern, Eigentümern und externen Dienstleistern zusammen. Besonders wichtig ist mir eine ruhige, freundliche Kommunikation und ein sorgfältiger Umgang mit Ressourcen.\n\nIch freue mich darauf, meine Erfahrung und meine Motivation in Ihre Organisation einzubringen und langfristig verlässlich mitzuwirken.\n\nMit freundlichen Grüßen\nErik von Brandt"
  },
  experiences: [
    {
       id: "1",
       company: "Selbstständige handwerkliche Tätigkeit",
       position: "Handwerker / Objektbetreuer",
       period: "Seit 1997",
       description: "Instandhaltung, Reparatur und Pflege von Werkstätten, Ateliers und Gebäuden - Ausführung von Bau-, Ausbau- und Renovierungsarbeiten - Verantwortung für technische Ausstattung und Betriebssicherheit"
    },
    {
       id: "2",
       company: "Restaurierungs- & Steinmetzbetriebe",
       position: "Steinmetzgeselle / Restaurator",
       period: "1991 - 1997",
       description: "Arbeiten an historischen und öffentlichen Gebäuden - Fassaden, Treppen, Mauern und Natursteinflächen"
    }
  ],
  education: [
     {
        id: "1",
        school: "Städtische Meisterschule München",
        degree: "Gesellenbrief Steinmetz",
        period: "1991"
     },
     {
        id: "2",
        school: "Städtische Meisterschule München",
        degree: "Ausbildung: Steinmetz und Steinbildhauer",
        period: "1988 - 1991"
     }
  ],
  skills: [
    { id: "s1", name: "Gebäude- und Objektbetreuung", level: 5 },
    { id: "s2", name: "Kleinreparaturen & Instandhaltung", level: 5 },
    { id: "s3", name: "Außenanlagenpflege", level: 5 },
    { id: "s4", name: "Technische Anlagen (Sichtkontrollen)", level: 4 },
    { id: "s5", name: "Elektro- & Sanitärgrundlagen", level: 3 },
    { id: "s6", name: "Holz- & Malerarbeiten", level: 4 }
  ],
  languages: [
     { id: "l1", name: "Deutsch", level: 5 }
  ],
  strengths: [
    "zuverlässig, eigenständig und verantwortungsbewusst",
    "sorgfältig, lösungsorientiert und praktisch denkend",
    "hohe Belastbarkeit im Rahmen klarer Aufgaben",
    "freundlicher und respektvoller Umgang"
  ],
  additionalSkills: [
     { id: "a1", name: "EDV: Word, Excel (Grundlagen)" }
  ]
};

export const PAEDAGOGE_DATA: ResumeData = {
  selectedThemeId: 'pro_navy',
  selectedLayoutId: 'modern',
  selectedFontId: 'sans',
  personalInfo: {
    fullName: "Erik von Brandt",
    jobTitle: "Sozial- und Kulturpädagoge / Künstler",
    email: "erikvonbrandt@gmail.com",
    phone: "09542 4520366",
    street: "Pfarrer-Kropfeld-Straße 27",
    zip: "96110",
    city: "Scheßlitz",
    website: "",
    photo: "",
    summary: "Sozial- und kulturpädagogisch ausgebildeter Künstler und Bildhauer mit über 25 Jahren Berufserfahrung in der kreativen Bildungsarbeit, Seminarleitung und projektbezogenen Arbeit mit Kindern, Jugendlichen und Erwachsenen. Langjährige selbstständige Tätigkeit an der Schnittstelle von Kunst, Handwerk, Denkmalpflege und Pädagogik. Erfahren in der Konzeption und Durchführung von praxisnahen, handlungsorientierten Bildungs- und Kulturprojekten in Schulen, Kindergärten, Jugendhilfe, Erwachsenenbildung sowie im musealen und öffentlichen Raum. Ausgeprägte Fähigkeit zur Anleitung von Gruppen, zur individuellen Begleitung sowie zur Vermittlung komplexer Inhalte über kreative und niedrigschwellige Methoden."
  },
  coverLetter: {
    recipient: "An die Hausverwaltung / Personalabteilung\nAnsprechpartner bekannt / Unbekannt\nMusterstraße 123\n96047 Bamberg",
    subject: "Bewerbung als Sozial- und Kulturpädagoge",
    date: new Date().toLocaleDateString('de-DE'),
    text: "Sehr geehrte Damen und Herren,\n\nmit großer Motivation bewerbe ich mich auf eine Teilzeitstelle im sozial- oder kulturpädagogischen Bereich. Als sozial- und kulturpädagogisch ausgebildeter Künstler und Bildhauer bringe ich über 25 Jahre Berufserfahrung in der kreativen Bildungsarbeit, Seminarleitung und projektbezogenen Arbeit mit Kindern, Jugendlichen und Erwachsenen mit.\n\nMeine langjährige selbstständige Tätigkeit an der Schnittstelle von Kunst, Handwerk, Denkmalpflege und Pädagogik hat mir einen praxisnahen, strukturierten und verantwortungsbewussten Arbeitsstil vermittelt.\n\nIch konzipiere und realisiere Bildungs- und Kulturprojekte in Schulen, Kindergärten, der Jugendhilfe, der Erwachsenenbildung sowie im musealen und öffentlichen Raum. Dabei ist mir eine handlungsorientierte, niedrigschwellige Vermittlung wichtig, die Menschen erreicht und individuell fördert. Gruppen anzuleiten, Prozesse zu strukturieren und komplexe Inhalte verständlich aufzubereiten gehört zu meinen zentralen Stärken.\n\nIch suche ein klares, verlässliches Arbeitsumfeld mit nachhaltigen Aufgaben, in dem ich meine Erfahrung und pädagogische Haltung langfristig einbringen kann. Über die Möglichkeit eines persönlichen Kennenlernens freue ich mich sehr.\n\nMit freundlichen Grüßen\nErik von Brandt"
  },
  experiences: [
    {
       id: "1",
       company: "Selbstständige künstlerische Tätigkeit",
       position: "Künstler, Bildhauer & Referent",
       period: "Seit 1997",
       description: "Planung und Durchführung von Kunst-, Werk- und Naturprojekten - Seminare, Fortbildungen und Workshops - Künstlerische und kunsthandwerkliche Aufträge - Restaurierungsarbeiten an denkmalgeschützten Objekten"
    },
    {
       id: "2",
       company: "Kirchliche, öffentliche & historische Bauwerke",
       position: "Steinmetzgeselle / Restaurator",
       period: "1991 - 1997",
       description: "Mitarbeit an kirchlichen, öffentlichen und historischen Bauwerken"
    }
  ],
  education: [
     {
        id: "1",
        school: "Fachhochschule",
        degree: "Diplom-Sozialpädagoge (FH)",
        period: ""
     },
     {
        id: "2",
        school: "Städtische Meisterschule München",
        degree: "Ausbildung: Steinmetz und Steinbildhauer",
        period: "1988 - 1991"
     }
  ],
  skills: [
    { id: "s1", name: "Sozial- & Kulturpädagogik", level: 5 },
    { id: "s2", name: "Künstlerische Bildungsarbeit", level: 5 },
    { id: "s3", name: "Seminar-, Kurs- & Workshopleitung", level: 5 },
    { id: "s4", name: "Projektarbeit", level: 5 },
    { id: "s5", name: "Gruppenleitung & Indiv. Förderung", level: 5 },
    { id: "s6", name: "Werken, Plastik & Bildhauerei", level: 4 }
  ],
   languages: [
     { id: "l1", name: "Deutsch", level: 5 },
     { id: "l2", name: "Englisch", level: 2 },
     { id: "l3", name: "Französisch", level: 1 },
     { id: "l4", name: "Latein", level: 1 }
  ],
  strengths: [],
  additionalSkills: []
};

// Old initialization for reference, not used anymore
const OLD_INITIAL_DATA: ResumeData = {
  selectedThemeId: 'pro_navy',
  selectedLayoutId: 'modern',
  selectedFontId: 'sans',
  personalInfo: {
    fullName: "Erik von Brandt",
    jobTitle: "Sozial- und Kulturpädagoge / Künstler",
    email: "erikvonbrandt@gmail.com",
    phone: "09542 4520366",
    street: "Pfarrer-Kropfeld-Straße 27",
    zip: "96110",
    city: "Scheßlitz",
    website: "",
    photo: "",
    summary: "Sozial- und kulturpädagogisch ausgebildeter Künstler und Bildhauer mit über 25 Jahren Berufserfahrung in der kreativen Bildungsarbeit, Seminarleitung und projektbezogenen Arbeit mit Kindern, Jugendlichen und Erwachsenen. Langjährige selbstständige Tätigkeit an der Schnittstelle von Kunst, Handwerk, Denkmalpflege und Pädagogik. Erfahren in der Konzeption und Durchführung von praxisnahen, handlungsorientierten Bildungs- und Kulturprojekten in Schulen, Kindergärten, Jugendhilfe, Erwachsenenbildung sowie im musealen und öffentlichen Raum. Ausgeprägte Fähigkeit zur Anleitung von Gruppen, zur individuellen Begleitung sowie zur Vermittlung komplexer Inhalte über kreative und niedrigschwellige Methoden. Derzeit auf der Suche nach einer Teilzeitanstellung im sozial- oder kulturpädagogischen Bereich, mit Fokus auf strukturierte, nachhaltige Arbeitsfelder und klare Rahmenbedingungen."
  },
  coverLetter: {
    recipient: "An die Hausverwaltung / Personalabteilung\nAnsprechpartner bekannt / Unbekannt\nMusterstraße 123\n96047 Bamberg",
    subject: "Bewerbung als Hausmeister",
    date: "19.01.2026",
    text: "Sehr geehrte Damen und Herren,\n\nals erfahrener Handwerker mit Leidenschaft für den Werterhalt von Immobilien bewerbe ich mich hiermit um die Stelle als Hausmeister. Durch meine jahrzehntelange selbstständige Tätigkeit bin ich es gewohnt, Mängel eigenständig zu erkennen und fachgerecht zu beheben.\n\nIch freue mich auf ein persönliches Kennenlernen.\n\nMit freundlichen Grüßen,\nErik von Brandt"
  },
  experiences: [
    {
      id: "1",
      company: "Selbstständige künstlerische Tätigkeit",
      position: "Künstler, Bildhauer & kulturpädagogischer Referent",
      period: "Seit 1997",
      description: "– Planung und Durchführung von Kunst-, Werk- und Naturprojekten\n– Seminare, Fortbildungen und Workshops\n– Künstlerische und kunsthandwerkliche Aufträge\n– Restaurierungsarbeiten an denkmalgeschützten Objekten"
    },
    {
      id: "2",
      company: "Kirchliche, öffentliche & historische Bauwerke",
      position: "Steinmetzgeselle / Restaurator",
      period: "1991 – 1997",
      description: "– Mitarbeit an kirchlichen, öffentlichen und historischen Bauwerken"
    }
  ],
  education: [
    {
      id: "3",
      school: "Fachhochschule",
      degree: "Diplom-Sozialpädagoge (FH)",
      period: ""
    },
    {
      id: "4",
      school: "Städtische Meisterschule München",
      degree: "Ausbildung: Steinmetz und Steinbildhauer",
      period: "1988 – 1991"
    },
    {
      id: "5",
      school: "Otto-Friedrich-Universität Bamberg",
      degree: "Studium: Denkmalpflege (2 Semester)",
      period: ""
    },
    {
      id: "6",
      school: "Otto-Friedrich-Universität Bamberg",
      degree: "Studium: Didaktik der Kunst (2 Semester)",
      period: ""
    },
    {
      id: "7",
      school: "ASB",
      degree: "Zivildienst: Individuelle Schwerbehindertenbetreuung",
      period: ""
    }
  ],
  skills: [
    { id: "s1", name: "Sozial- & Kulturpädagogik", level: 5 },
    { id: "s2", name: "Künstlerische Bildungsarbeit", level: 5 },
    { id: "s3", name: "Seminar-, Kurs- & Workshopleitung", level: 5 },
    { id: "s4", name: "Projektarbeit (Schulen, Kitas, Jugendhilfe)", level: 5 },
    { id: "s5", name: "Werken, Plastik & Bildhauerei", level: 4 },
    { id: "s6", name: "Gruppenleitung & individuelle Förderung", level: 5 }
  ],
  languages: [
    { id: "l1", name: "Deutsch", level: 5 },
    { id: "l2", name: "Englisch", level: 2 },
    { id: "l3", name: "Französisch", level: 2 },
    { id: "l4", name: "Latein", level: 1 }
  ],
  strengths: [
    "ressourcen- und prozessorientiert",
    "empathisch, strukturiert und verantwortungsbewusst",
    "kreativ, handlungsorientiert und praxisnah",
    "hohe Selbstständigkeit und Zuverlässigkeit"
  ],
  additionalSkills: [
    { id: "a1", name: "Seminar- & Gruppenarbeit" },
    { id: "a2", name: "Denkmal- und Steinrestaurierung" },
    { id: "a3", name: "Material- und Werktechniken (Stein, Ton, Gips, Holz, Metall)" },
    { id: "a4", name: "Kreative Methoden & Naturpädagogik" },
    { id: "a5", name: "EDV: Word, Excel (Grundlagen), Photoshop" }
  ]
};

export const ORCHESTER_DATA: ResumeData = {
  selectedThemeId: 'modern_emerald',
  selectedLayoutId: 'classic',
  selectedFontId: 'serif',
  personalInfo: {
    fullName: "Peter Alexander Jabornicky",
    jobTitle: "MITARBEITER FÜR BÜHNENAUFBAU / LOGISTIK",
    email: "gojabo@freenet.de",
    phone: "01722327059",
    street: "Herzog-Max-Straße 7",
    zip: "96047",
    city: "Bamberg",
    website: "",
    photo: "",
    summary: "Erfahrener Produktionsmitarbeiter mit ausgeprägtem handwerklichem Geschick und Logistik-Erfahrung bei nationalen und internationalen Produktionen. Routiniert im Auf- und Abbau von Equipment, stressresistent und teamfähig. Durch langjährige Tätigkeit bei Film- und TV-Reihenproduktionen bestens vertraut mit flexiblen Arbeitszeiten, Reisetätigkeit und der Arbeit hinter den Kulissen."
  },
  coverLetter: {
    recipient: "Stiftung Bamberger Symphoniker\n- Bayerische Staatsphilharmonie\nMußstraße 1\n96047 Bamberg",
    subject: "BEWERBUNG ALS MITARBEITER FÜR BÜHNENAUFBAU UND INSTRUMENTENTRANSPORTE",
    date: "16.02.2026",
    text: "Sehr geehrte Frau Müller,\n\nmit meiner langjährigen Erfahrung in der Produktionslogistik und meinem handwerklichen Hintergrund bringe ich genau die Fähigkeiten mit, die Sie für den Bühnenaufbau und Instrumententransport suchen. Als Bamberger freue ich mich besonders über die Möglichkeit, Ihr Orchester hinter den Kulissen zu unterstützen.\n\nDie Arbeit mit sensiblen Musikinstrumenten und dem entsprechenden Equipment ist mir durch meine frühere Tätigkeit in der Lagerlogistik bei der Thomann GmbH bereits vertraut.\n\nIn den vergangenen Jahren war ich überwiegend in der Produktionslogistik für Film- und Fernsehproduktionen tätig, zuletzt als Set-Aufnahmeleiter für die ZDF-Reihe „Frühling\". Den termingerechten Auf- und Abbau von Equipment, die Koordination hinter den Kulissen sowie körperlich anspruchsvolle Arbeit bin ich aus meinem Berufsalltag gewohnt. Auch unregelmäßige Arbeitszeiten an Abenden oder Wochenenden sowie internationale Reisetätigkeiten stellen für mich kein Problem dar. Für Einsätze im Ausland bringe ich gute Englischkenntnisse mit. Für die anfallenden Transporte verfüge ich zudem über den alten Führerschein (Klasse 3 bzw. 2), der die von Ihnen gewünschte Klasse CE einschließt.\n\nGerne unterstütze ich Ihr Team tatkräftig bei den kommenden Proben und Konzerten. Auf die Gelegenheit zu einem persönlichen Kennenlernen freue ich mich.\n\nPeter Alexander Jabornicky"
  },
  experiences: [
    {
      id: "1",
      company: "DIVERSE NAMHAFTE FILM- UND TV-PRODUKTIONEN (U.A. FÜR ZDF, ARD, BR, WDR)",
      position: "SET-AUFNAHMELEITUNG / PRODUKTION",
      period: "2016 - 2025",
      description: "Verantwortung für logistische Abläufe am Set bei zahlreichen TV-Reihen und Filmen (u.a. „Frühling“, „Tatort“, „Rosamunde Pilcher“, „Polizeiruf 110“). Koordination von Technik, Equipment und Personal sowie Sicherstellung der Arbeitssicherheit. Routinierter Auf- und Abbau unter hohem Zeitdruck und Organisation komplexer Außeneinsätze."
    },
    {
      id: "2",
      company: "THOMANN GMBH",
      position: "LAGERIST / LOGISTIK",
      period: "2012-2016",
      description: "Fachgerechter Umgang mit Musikinstrumenten und Equipment, Lagerlogistik und Versand. Erfahrung im sorgfältigen Transport sensibler Güter."
    },
    {
      id: "3",
      company: "FRISEURSALON JABO HAIR",
      position: "EIGENTÜMER / FRISEUR",
      period: "2003-2012",
      description: "Leitung des eigenen Salons, Personalverantwortung, Kundenbetreuung und kaufmännische Verwaltung."
    },
    {
      id: "4",
      company: "DIVERSE PRODUKTIONEN (KINO & TV)",
      position: "PRODUKTIONSFAHRER / ASSISTENT SET-AL",
      period: "1993 - 2003",
      description: "Transport von Equipment und Personal, Unterstützung bei Auf- und Abbauarbeiten, internationale Dreharbeiten (u.a. Australien, Tschechien, Spanien, Niederlande)."
    }
  ],
  education: [
    {
      id: "1",
      school: "HANDWERKSKAMMER",
      degree: "Ausbildung zum Friseur",
      period: ""
    },
    {
      id: "2",
      school: "AUS- UND WEITERBILDUNG",
      degree: "Hygienebeauftragter für Film-, Fernseh- und Fotoproduktionen",
      period: ""
    },
    {
      id: "3",
      school: "ZERTIFIKAT",
      degree: "Brandschutzhelfer",
      period: ""
    },
    {
      id: "4",
      school: "ZERTIFIKAT",
      degree: "Zertifizierter Ersthelfer",
      period: ""
    }
  ],
  skills: [
    { id: "s1", name: "LOGISTIK & TRANSPORT", level: 5 },
    { id: "s2", name: "HANDWERKLICHES GESCHICK", level: 5 },
    { id: "s3", name: "TEAMFÄHIGKEIT & FLEXIBILITÄT", level: 5 },
    { id: "s4", name: "ENGLISCH", level: 4 }
  ],
  languages: [
    { id: "l1", name: "Deutsch", level: 5 },
    { id: "l2", name: "Englisch", level: 4 }
  ],
  strengths: [
    "LOGISTIK & TRANSPORT",
    "HANDWERKLICHES GESCHICK",
    "TEAMFÄHIGKEIT & FLEXIBILITÄT"
  ],
  additionalSkills: []
};

export const FILM_DATA: ResumeData = {
  selectedThemeId: 'tech_midnight',
  selectedLayoutId: 'minimal',
  selectedFontId: 'sans',
  personalInfo: {
    fullName: "Peter Alexander Jabornicky",
    jobTitle: "Set-Aufnahmeleiter / Produktionsfahrer",
    email: "",
    phone: "",
    street: "",
    zip: "",
    city: "München",
    website: "",
    photo: "",
    summary: "Erfahrener Produktionsmitarbeiter mit Schwerpunkt auf Set-Aufnahmeleitung und Produktionsfahren bei nationalen und internationalen Film- und TV-Produktionen. Flexibel, zuverlässig und lösungsorientiert mit umfassender Erfahrung bei Reihenproduktionen wie der ZDF-Reihe 'Frühling'."
  },
  coverLetter: {
    recipient: "An die Produktionsleitung",
    subject: "Bewerbung als Set-Aufnahmeleiter / Produktionsfahrer",
    date: new Date().toLocaleDateString('de-DE'),
    text: "Sehr geehrte Damen und Herren,\\n\\nmit großem Interesse bewerbe ich mich um eine Mitarbeit in Ihrem aktuellen Projekt. Durch meine langjährige Erfahrung bei Reihenproduktionen wie 'Frühling' (ZDF) sowie bei diversen TV-Movies bin ich mit den Anforderungen am Set bestens vertraut.\\n\\nIch bringe ein hohes Maß an Zuverlässigkeit, Teamfähigkeit und Flexibilität mit und bin gewohnt, auch unter Zeitdruck strukturiert zu arbeiten. Ob als Set-Aufnahmeleiter oder Produktionsfahrer – ich sorge für reibungslose Abläufe und unterstütze das Team proaktiv.\\n\\nGerne überzeuge ich Sie in einem persönlichen Gespräch von meiner Motivation und meinen Fähigkeiten.\\n\\nMit freundlichen Grüßen\\nPeter Alexander Jabornicky"
  },
  experiences: [
    {
      id: "1",
      company: "Seven Dogs Filmproduktion GmbH",
      position: "Set-Aufnahmeleitung / Produktion (Reihe 'Frühling')",
      period: "2021 - 2025",
      description: "TV-Filme (ZDF):\\n- 2025: Am Ende einer Lüge, Wenn alle schweigen, Einhundert Meter\\n- 2024: Mein Geheimnis dein Geheimnis, Wenn du nicht still bist, Babyalarm\\n- 2023: Ein Zebra im Gepäck, Wenn die Zeit stehen bleibt, Die verschwundenen Eltern\\n- 2022: Lauf weg wenn du kannst, Flüsternde Geister, Das Mädchen hinter der Tür, Eine Handvoll Zeit, Das Geheimnis vom Rabenkopf, Kleiner Engel kleiner Teufel\\n- 2021: Alte Gespenster\\nRegie: Thomas Kronthaler, Axel Barth, Tom Zenker"
    },
    {
      id: "2",
      company: "High Fidelity Pictures GmbH",
      position: "Produktion / Set",
      period: "2025",
      description: "Das Haus am Gletscher (AT), TV-Film (ARD, Degeto)\\nRegie: Stephan Rick"
    },
    {
      id: "3",
      company: "FFP New Media GmbH",
      position: "Produktion / Set (Rosamunde Pilcher)",
      period: "2024",
      description: "TV-Filme (ZDF):\\n- Wer immer du bist (Regie: Dagmar Seume)\\n- Jahrestag (Regie: Karola Meeder)"
    },
    {
      id: "4",
      company: "Bavaria Fiction GmbH",
      position: "Produktion / Set",
      period: "2023",
      description: "SOKO Stuttgart, TV-Serie (ZDF)\\nRegie: Tanja Roitzheim"
    },
    {
      id: "5",
      company: "Diverse Produktionen",
      position: "Filme in anderen Tätigkeiten (Produktionsfahrer / Assistent Set-AL)",
      period: "Bis 2025",
      description: "- 2025: Mädchen in Uniform (Kino, Regie: Justina Jürgensen, NORDPOLARIS) - Produktionsfahrer\\n- 2010: Resturlaub (Kino, Regie: Gregor Schnitzler, Deutsche Columbia) - Assistent der Set-AL\\n- 2009: In der Welt habt ihr Angst (Kino, Regie: Hans W. Geißendörfer) - Assistent der Set-AL / KV Set-AL\\n- 2003: Sams in Gefahr (Kino, Regie: Ben Verbong, Collina Film) - Assistent der Set-AL\\n- 1994: Der König (TV-Serie, SAT.1, F&S Projektfilm) - Produktionsfahrer\\n- 1993: Der König (TV-Serie, SAT.1, ndF) - Produktionsfahrer"
    }
  ],
  education: [
    {
      id: "1",
      school: "Aus- und Weiterbildung",
      degree: "Hygienebeauftragter für Film-, Fernseh- und Fotoproduktionen",
      period: ""
    }
  ],
  skills: [
    { id: "s1", name: "Set-Aufnahmeleitung", level: 5 },
    { id: "s2", name: "Produktionsfahrer", level: 5 },
    { id: "s3", name: "Filmproduktion", level: 5 },
    { id: "s4", name: "Auslandserfahrung (Australien, CZ, ES, NL)", level: 4 }
  ],
  languages: [
    { id: "l1", name: "Deutsch", level: 5 },
    { id: "l2", name: "Englisch", level: 3 }
  ],
  strengths: [
    "Flexibel und belastbar",
    "Organisationsstark",
    "Teamfähig",
    "Erfahren bei Reihenproduktionen"
  ],
  additionalSkills: []
};

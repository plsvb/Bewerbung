
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
    address: string;
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
}

// Added missing properties to INITIAL_DATA to match ResumeData interface
export const INITIAL_DATA: ResumeData = {
  selectedThemeId: 'pro_navy',
  selectedLayoutId: 'modern',
  selectedFontId: 'sans',
  personalInfo: {
    fullName: "Erik von Brandt",
    jobTitle: "Sozial- und Kulturpädagoge / Künstler",
    email: "erikvonbrandt@gmail.com",
    phone: "09542 4520366",
    address: "Pfarrer-Kropfeld-Straße 27, 96110 Scheßlitz",
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

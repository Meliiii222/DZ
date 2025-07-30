// Données spécifiques à l'Algérie - 100% local et indépendant
// Aucune dépendance externe - Toutes les données restent en Algérie

export interface Wilaya {
  id: number;
  name: string;
  code: string;
  arabicName: string;
  region: string;
  population?: number;
}

export interface Institution {
  id: string;
  name: string;
  arabicName: string;
  type: 'legislative' | 'executive' | 'judicial' | 'constitutional';
  description: string;
}

export interface CodeJuridique {
  id: string;
  name: string;
  arabicName: string;
  type: 'civil' | 'penal' | 'commercial' | 'administratif' | 'autre';
  lastUpdate: string;
}

// 48 Wilayas algériennes
export const WILAYAS_ALGERIA: Wilaya[] = [
  { id: 1, name: "Adrar", code: "01", arabicName: "أدرار", region: "Sud" },
  { id: 2, name: "Chlef", code: "02", arabicName: "الشلف", region: "Nord" },
  { id: 3, name: "Laghouat", code: "03", arabicName: "الأغواط", region: "Sud" },
  { id: 4, name: "Oum El Bouaghi", code: "04", arabicName: "أم البواقي", region: "Est" },
  { id: 5, name: "Batna", code: "05", arabicName: "باتنة", region: "Est" },
  { id: 6, name: "Béjaïa", code: "06", arabicName: "بجاية", region: "Nord" },
  { id: 7, name: "Biskra", code: "07", arabicName: "بسكرة", region: "Sud" },
  { id: 8, name: "Béchar", code: "08", arabicName: "بشار", region: "Sud" },
  { id: 9, name: "Blida", code: "09", arabicName: "البليدة", region: "Centre" },
  { id: 10, name: "Bouira", code: "10", arabicName: "البويرة", region: "Centre" },
  { id: 11, name: "Tamanrasset", code: "11", arabicName: "تمنراست", region: "Sud" },
  { id: 12, name: "Tébessa", code: "12", arabicName: "تبسة", region: "Est" },
  { id: 13, name: "Tlemcen", code: "13", arabicName: "تلمسان", region: "Ouest" },
  { id: 14, name: "Tiaret", code: "14", arabicName: "تيارت", region: "Ouest" },
  { id: 15, name: "Tizi Ouzou", code: "15", arabicName: "تيزي وزو", region: "Nord" },
  { id: 16, name: "Alger", code: "16", arabicName: "الجزائر", region: "Centre" },
  { id: 17, name: "Djelfa", code: "17", arabicName: "الجلفة", region: "Centre" },
  { id: 18, name: "Jijel", code: "18", arabicName: "جيجل", region: "Nord" },
  { id: 19, name: "Sétif", code: "19", arabicName: "سطيف", region: "Est" },
  { id: 20, name: "Saïda", code: "20", arabicName: "سعيدة", region: "Ouest" },
  { id: 21, name: "Skikda", code: "21", arabicName: "سكيكدة", region: "Nord" },
  { id: 22, name: "Sidi Bel Abbès", code: "22", arabicName: "سيدي بلعباس", region: "Ouest" },
  { id: 23, name: "Annaba", code: "23", arabicName: "عنابة", region: "Est" },
  { id: 24, name: "Guelma", code: "24", arabicName: "قالمة", region: "Est" },
  { id: 25, name: "Constantine", code: "25", arabicName: "قسنطينة", region: "Est" },
  { id: 26, name: "Médéa", code: "26", arabicName: "المدية", region: "Centre" },
  { id: 27, name: "Mostaganem", code: "27", arabicName: "مستغانم", region: "Ouest" },
  { id: 28, name: "M'Sila", code: "28", arabicName: "المسيلة", region: "Centre" },
  { id: 29, name: "Mascara", code: "29", arabicName: "معسكر", region: "Ouest" },
  { id: 30, name: "Ouargla", code: "30", arabicName: "ورقلة", region: "Sud" },
  { id: 31, name: "Oran", code: "31", arabicName: "وهران", region: "Ouest" },
  { id: 32, name: "El Bayadh", code: "32", arabicName: "البيض", region: "Sud" },
  { id: 33, name: "Illizi", code: "33", arabicName: "إليزي", region: "Sud" },
  { id: 34, name: "Bordj Bou Arréridj", code: "34", arabicName: "برج بوعريريج", region: "Est" },
  { id: 35, name: "Boumerdès", code: "35", arabicName: "بومرداس", region: "Nord" },
  { id: 36, name: "El Tarf", code: "36", arabicName: "الطارف", region: "Est" },
  { id: 37, name: "Tindouf", code: "37", arabicName: "تندوف", region: "Sud" },
  { id: 38, name: "Tissemsilt", code: "38", arabicName: "تيسمسيلت", region: "Ouest" },
  { id: 39, name: "El Oued", code: "39", arabicName: "الوادي", region: "Sud" },
  { id: 40, name: "Khenchela", code: "40", arabicName: "خنشلة", region: "Est" },
  { id: 41, name: "Souk Ahras", code: "41", arabicName: "سوق أهراس", region: "Est" },
  { id: 42, name: "Tipaza", code: "42", arabicName: "تيبازة", region: "Nord" },
  { id: 43, name: "Mila", code: "43", arabicName: "ميلة", region: "Est" },
  { id: 44, name: "Aïn Defla", code: "44", arabicName: "عين الدفلى", region: "Centre" },
  { id: 45, name: "Naâma", code: "45", arabicName: "النعامة", region: "Sud" },
  { id: 46, name: "Aïn Témouchent", code: "46", arabicName: "عين تموشنت", region: "Ouest" },
  { id: 47, name: "Ghardaïa", code: "47", arabicName: "غرداية", region: "Sud" },
  { id: 48, name: "Relizane", code: "48", arabicName: "غليزان", region: "Ouest" }
];

// Institutions nationales algériennes
export const INSTITUTIONS_ALGERIA: Institution[] = [
  {
    id: "apn",
    name: "Assemblée Populaire Nationale",
    arabicName: "المجلس الشعبي الوطني",
    type: "legislative",
    description: "Chambre basse du Parlement algérien"
  },
  {
    id: "conseil-nation",
    name: "Conseil de la Nation",
    arabicName: "مجلس الأمة",
    type: "legislative", 
    description: "Chambre haute du Parlement algérien"
  },
  {
    id: "presidence",
    name: "Présidence de la République",
    arabicName: "رئاسة الجمهورية",
    type: "executive",
    description: "Institution exécutive suprême"
  },
  {
    id: "gouvernement",
    name: "Gouvernement",
    arabicName: "الحكومة",
    type: "executive",
    description: "Pouvoir exécutif dirigé par le Premier ministre"
  },
  {
    id: "cour-supreme",
    name: "Cour Suprême",
    arabicName: "المحكمة العليا", 
    type: "judicial",
    description: "Plus haute juridiction de l'ordre judiciaire"
  },
  {
    id: "conseil-etat",
    name: "Conseil d'État",
    arabicName: "مجلس الدولة",
    type: "judicial",
    description: "Plus haute juridiction de l'ordre administratif"
  },
  {
    id: "conseil-constitutionnel",
    name: "Conseil Constitutionnel",
    arabicName: "المجلس الدستوري",
    type: "constitutional",
    description: "Gardien de la Constitution"
  }
];

// Codes juridiques algériens
export const CODES_JURIDIQUES_ALGERIA: CodeJuridique[] = [
  {
    id: "code-civil",
    name: "Code Civil",
    arabicName: "القانون المدني",
    type: "civil",
    lastUpdate: "2024"
  },
  {
    id: "code-penal", 
    name: "Code Pénal",
    arabicName: "قانون العقوبات",
    type: "penal",
    lastUpdate: "2024"
  },
  {
    id: "code-procedure-penale",
    name: "Code de Procédure Pénale",
    arabicName: "قانون الإجراءات الجزائية",
    type: "penal",
    lastUpdate: "2024"
  },
  {
    id: "code-commerce",
    name: "Code de Commerce",
    arabicName: "القانون التجاري",
    type: "commercial", 
    lastUpdate: "2024"
  },
  {
    id: "code-procedure-civile",
    name: "Code de Procédure Civile et Administrative",
    arabicName: "قانون الإجراءات المدنية والإدارية",
    type: "civil",
    lastUpdate: "2024"
  },
  {
    id: "code-famille",
    name: "Code de la Famille",
    arabicName: "قانون الأسرة",
    type: "civil",
    lastUpdate: "2024"
  }
];

// Expressions régulières pour détecter les références juridiques algériennes
export const REGEX_JURIDIQUE_ALGERIA = {
  loi: /\b[Ll]oi\s+n°?\s*(\d{2})-(\d{2})\s+du\s+(\d{1,2})\s+(\w+)\s+(\d{4})\b/g,
  decret: /\b[Dd]écret\s+(exécutif|présidentiel)\s+n°?\s*(\d{2})-(\d{2,3})\s+du\s+(\d{1,2})\s+(\w+)\s+(\d{4})\b/g,
  arrete: /\b[Aa]rrêté\s+(ministériel|de\s+wilaya)\s+n°?\s*(\d+)\s+du\s+(\d{1,2})\s+(\w+)\s+(\d{4})\b/g,
  article: /\b[Aa]rticle\s+(\d+)\s+(bis|ter)?\s*(du\s+code|de\s+la\s+loi)?\b/g,
  constitution: /\b[Cc]onstitution\s+(algérienne)?\s*(de\s+(\d{4}))?\b/g
};

// Configuration locale pour l'OCR et l'IA
export const CONFIG_ALGERIA = {
  languages: ['fra', 'ara'], // Français et Arabe
  ocrOptimized: true,
  localProcessing: true,
  independent: true,
  regions: ['Nord', 'Centre', 'Est', 'Ouest', 'Sud'],
  timezone: 'Africa/Algiers',
  currency: 'DZD',
  country: 'DZ'
};

// Messages de bienvenue algériens
export const WELCOME_MESSAGES = {
  fr: "Bienvenue sur Dalil.dz - Votre plateforme algérienne de veille juridique 100% locale et indépendante",
  ar: "مرحباً بكم في دليل.دز - منصتكم الجزائرية للمتابعة القانونية محلية ومستقلة 100%"
};
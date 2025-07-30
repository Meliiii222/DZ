
import { useState, useMemo } from 'react';

export interface LegalText {
  id: number;
  title: string;
  type: string;
  category: string;
  publishDate: string;
  status: string;
  description: string;
  authority: string;
  joNumber: string;
  date?: string;
  source?: string;
  author?: string;
  insertionMethod?: string;
  views?: number;
}

export interface LegalTextsFilters {
  type?: string;
  status?: string;
}

export function useLegalTextsData() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<LegalTextsFilters>({});

  const legalTexts: LegalText[] = [
    {
      id: 1,
      title: "Loi n° 08-09 du 25 février 2008 portant code de procédure civile et administrative",
      type: "Loi",
      category: "Procédure",
      publishDate: "25 février 2008",
      status: "En vigueur",
      description: "Code régissant les procédures civiles et administratives en Algérie",
      authority: "Assemblée Populaire Nationale",
      joNumber: "J.O. n° 21 du 23 avril 2008",
      date: "2008-02-25",
      source: "Journal Officiel",
      author: "République Algérienne",
      insertionMethod: "manual",
      views: 1250
    },
    {
      id: 2,
      title: "Ordonnance n° 75-58 du 26 septembre 1975 portant code civil",
      type: "Ordonnance",
      category: "Civil",
      publishDate: "26 septembre 1975",
      status: "En vigueur",
      description: "Code civil algérien régissant les relations entre particuliers",
      authority: "Conseil de la Révolution",
      joNumber: "J.O. n° 78 du 30 septembre 1975",
      date: "1975-09-26",
      source: "Journal Officiel",
      author: "République Algérienne",
      insertionMethod: "manual",
      views: 2340
    },
    {
      id: 3,
      title: "Loi n° 90-11 du 21 avril 1990 relative aux relations de travail",
      type: "Loi",
      category: "Travail",
      publishDate: "21 avril 1990",
      status: "En vigueur",
      description: "Loi régissant les relations de travail en Algérie",
      authority: "Assemblée Populaire Nationale",
      joNumber: "J.O. n° 17 du 25 avril 1990",
      date: "1990-04-21",
      source: "Journal Officiel",
      author: "République Algérienne",
      insertionMethod: "ocr",
      views: 890
    },
    {
      id: 4,
      title: "Loi n° 18-05 du 10 mai 2018 relative au commerce électronique",
      type: "Loi",
      category: "Commercial",
      publishDate: "10 mai 2018",
      status: "En vigueur",
      description: "Cadre juridique pour le commerce électronique en Algérie",
      authority: "Assemblée Populaire Nationale",
      joNumber: "J.O. n° 28 du 16 mai 2018",
      date: "2018-05-10",
      source: "Journal Officiel",
      author: "République Algérienne",
      insertionMethod: "manual",
      views: 567
    },
    {
      id: 5,
      title: "Décret exécutif n° 20-123 du 15 mars 2020 relatif aux mesures d'urgence",
      type: "Décret",
      category: "Administratif",
      publishDate: "15 mars 2020",
      status: "Suspendu",
      description: "Mesures d'urgence sanitaire temporaires",
      authority: "Gouvernement",
      joNumber: "J.O. n° 15 du 18 mars 2020",
      date: "2020-03-15",
      source: "Journal Officiel",
      author: "République Algérienne",
      insertionMethod: "ocr",
      views: 1456
    },
    {
      id: 6,
      title: "Arrêté ministériel n° 21-45 du 5 juin 2021 relatif aux normes sanitaires",
      type: "Arrêté",
      category: "Santé",
      publishDate: "5 juin 2021",
      status: "En révision",
      description: "Normes sanitaires applicables aux établissements de santé",
      authority: "Ministère de la Santé",
      joNumber: "J.O. n° 34 du 9 juin 2021",
      date: "2021-06-05",
      source: "Ministère de la Santé",
      author: "Ministre de la Santé",
      insertionMethod: "manual",
      views: 234
    }
  ];

  const filteredTexts = useMemo(() => {
    return legalTexts.filter((text) => {
      // Filtre par terme de recherche
      const matchesSearch = searchTerm === '' || 
        text.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        text.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        text.category.toLowerCase().includes(searchTerm.toLowerCase());

      // Filtre par type
      const matchesType = !filters.type || text.type === filters.type;

      // Filtre par statut
      const matchesStatus = !filters.status || text.status === filters.status;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [legalTexts, searchTerm, filters]);

  return {
    legalTexts,
    filteredTexts,
    searchTerm,
    setSearchTerm,
    filters,
    setFilters
  };
}


import React from 'react';
import { LibraryTabs } from './LibraryTabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, FileText, Scale, Building, Users, Calendar, Download, Eye } from 'lucide-react';
import { useGlobalActions } from '@/hooks/useGlobalActions';

export function LibrarySection() {
  const actions = useGlobalActions();

  const handleAdd = () => {
    console.log('Opening add legal text form from library...');
    actions.handleAddLegalText();
  };

  const handleEnrich = () => {
    console.log('Opening enrichment with file import from library...');
    actions.handleImport(['.pdf', '.doc', '.docx', '.txt']);
  };

  const exampleResources = [
    {
      id: 1,
      title: "Code Civil Algérien",
      description: "Version consolidée du Code Civil avec les dernières modifications",
      category: "Codes",
      type: "PDF",
      pages: 450,
      lastUpdate: "2024",
      icon: <Scale className="w-5 h-5" />
    },
    {
      id: 2,
      title: "Code de Procédure Civile",
      description: "Procédures civiles et commerciales en vigueur",
      category: "Procédures",
      type: "PDF",
      pages: 320,
      lastUpdate: "2023",
      icon: <FileText className="w-5 h-5" />
    },
    {
      id: 3,
      title: "Loi sur l'Investissement 2022",
      description: "Nouvelle loi sur l'investissement et ses décrets d'application",
      category: "Économique",
      type: "Document",
      pages: 85,
      lastUpdate: "2022",
      icon: <Building className="w-5 h-5" />
    },
    {
      id: 4,
      title: "Code du Travail",
      description: "Relations de travail, conventions collectives et sécurité sociale",
      category: "Social",
      type: "PDF",
      pages: 280,
      lastUpdate: "2024",
      icon: <Users className="w-5 h-5" />
    }
  ];

  const recentDocuments = [
    { title: "Décret exécutif n° 24-15", date: "15 Jan 2024", category: "Réglementaire" },
    { title: "Loi de finances 2024", date: "28 Déc 2023", category: "Financier" },
    { title: "Code des marchés publics", date: "10 Nov 2023", category: "Public" }
  ];

  return (
    <div className="space-y-6">
      {/* Onglets de la bibliothèque avec boutons intégrés */}
      <LibraryTabs />
    </div>
  );
}

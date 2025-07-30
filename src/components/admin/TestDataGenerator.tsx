
import React, { useState } from 'react';
import { useAuth } from '@/components/auth/AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { buttonHandlers } from '@/utils/buttonUtils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Database, Plus, Trash2 } from 'lucide-react';

export function TestDataGenerator() {
  const { userRole, user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const generateLegalTexts = async () => {
    const sampleTexts = [
      {
        title: "Constitution de la République Algérienne Démocratique et Populaire",
        type: "Constitution",
        category: "Droit constitutionnel",
        institution: "Assemblée Populaire Nationale",
        description: "Loi fondamentale de l'État algérien adoptée en 2020",
        content: "La République Algérienne Démocratique et Populaire est un État démocratique et social...",
        journal_date: "2020-12-30",
        journal_number: "82",
        page_number: "3",
        status: "en_vigueur",
        sector: "Institutionnel",
        tags: ["constitution", "droits", "libertes"]
      },
      {
        title: "Code de procédure civile et administrative",
        type: "Code",
        category: "Droit civil",
        institution: "Ministère de la Justice",
        description: "Ensemble des règles régissant la procédure civile",
        content: "Le présent code régit les procédures devant les juridictions civiles...",
        journal_date: "2008-02-25",
        journal_number: "21",
        page_number: "3",
        status: "en_vigueur",
        sector: "Justice",
        tags: ["procedure", "civil", "administratif"]
      },
      {
        title: "Loi relative à la protection de l'environnement",
        type: "Loi",
        category: "Droit de l'environnement",
        institution: "Ministère de l'Environnement",
        description: "Cadre juridique pour la protection de l'environnement",
        content: "La présente loi a pour objet de fixer les règles générales...",
        journal_date: "2003-07-19",
        journal_number: "43",
        page_number: "5",
        status: "en_vigueur",
        sector: "Environnement",
        tags: ["environnement", "protection", "écologie"]
      }
    ];

    try {
      const { error } = await supabase
        .from('legal_texts')
        .insert(sampleTexts.map(text => ({ ...text, created_by: user?.id })));

      if (error) throw error;

      toast({
        title: "Succès",
        description: `${sampleTexts.length} textes juridiques ajoutés`,
      });
    } catch (error) {
      console.error('Erreur:', error);
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter les textes juridiques",
        variant: "destructive"
      });
    }
  };

  const generateProcedures = async () => {
    const sampleProcedures = [
      {
        title: "Demande de passeport biométrique",
        category: "Documents d'identité",
        institution: "Direction Générale de la Sûreté Nationale",
        description: "Procédure pour obtenir un passeport biométrique algérien",
        duration: "15 jours ouvrables",
        difficulty: "facile",
        cost: "6 000 DA",
        required_documents: [
          "Acte de naissance",
          "Certificat de nationalité",
          "Photos d'identité",
          "Justificatif de domicile"
        ],
        steps: [
          {
            title: "Retrait du formulaire",
            description: "Retirer le formulaire de demande au niveau du service des passeports",
            duration: "30 minutes",
            required: true
          },
          {
            title: "Constitution du dossier",
            description: "Rassembler tous les documents requis",
            duration: "1 jour",
            required: true
          },
          {
            title: "Dépôt du dossier",
            description: "Déposer le dossier complet avec paiement des frais",
            duration: "1 heure",
            required: true
          }
        ],
        tags: ["passeport", "identite", "voyage"]
      },
      {
        title: "Création d'une entreprise individuelle",
        category: "Entreprises",
        institution: "Centre National du Registre de Commerce",
        description: "Étapes pour créer une entreprise individuelle en Algérie",
        duration: "30 jours ouvrables",
        difficulty: "moyenne",
        cost: "15 000 DA",
        required_documents: [
          "Pièce d'identité",
          "Acte de propriété ou contrat de bail",
          "Certificat de résidence",
          "Diplôme ou attestation de qualification"
        ],
        steps: [
          {
            title: "Choix de la dénomination",
            description: "Choisir et vérifier la disponibilité du nom commercial",
            duration: "2 jours",
            required: true
          },
          {
            title: "Dépôt du dossier au CNRC",
            description: "Constituer et déposer le dossier d'immatriculation",
            duration: "3 jours",
            required: true
          },
          {
            title: "Inscription aux impôts",
            description: "S'inscrire auprès des services fiscaux",
            duration: "5 jours",
            required: true
          }
        ],
        tags: ["entreprise", "commerce", "creation"]
      }
    ];

    try {
      const { error } = await supabase
        .from('administrative_procedures')
        .insert(sampleProcedures.map(proc => ({ ...proc, created_by: user?.id })));

      if (error) throw error;

      toast({
        title: "Succès",
        description: `${sampleProcedures.length} procédures ajoutées`,
      });
    } catch (error) {
      console.error('Erreur:', error);
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter les procédures",
        variant: "destructive"
      });
    }
  };

  const clearTestData = async () => {
    try {
      await supabase.from('legal_texts').delete().eq('created_by', user?.id);
      await supabase.from('administrative_procedures').delete().eq('created_by', user?.id);

      toast({
        title: "Succès",
        description: "Données de test supprimées",
      });
    } catch (error) {
      console.error('Erreur:', error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer les données",
        variant: "destructive"
      });
    }
  };

  if (userRole !== 'admin') {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="w-5 h-5" />
          Générateur de données de test
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button
            onClick={generateLegalTexts}
            disabled={loading}
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Ajouter des textes juridiques
          </Button>

          <Button
            onClick={generateProcedures}
            disabled={loading}
            className="flex items-center gap-2"
            variant="secondary"
          >
            <Plus className="w-4 h-4" />
            Ajouter des procédures
          </Button>
        </div>

        <Button
          onClick={clearTestData}
          disabled={loading}
          variant="destructive"
          className="w-full flex items-center gap-2"
        >
          <Trash2 className="w-4 h-4" />
          Supprimer mes données de test
        </Button>
      </CardContent>
    </Card>
  );
}

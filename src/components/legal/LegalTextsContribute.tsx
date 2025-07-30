
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Upload, Users, Heart } from 'lucide-react';
import { useGlobalActions } from '@/hooks/useGlobalActions';

interface LegalTextsContributeProps {
  onAddLegalText?: () => void;
}

export function LegalTextsContribute({ onAddLegalText }: LegalTextsContributeProps) {
  const actions = useGlobalActions();

  const contributeOptions = [
    {
      id: 1,
      title: "Ajouter un texte juridique",
      description: "Contribuez en ajoutant de nouveaux textes juridiques à la base de données",
      icon: Plus,
      action: "Ajouter",
      color: "emerald"
    },
    {
      id: 2,
      title: "Importer des documents",
      description: "Importez des documents pour enrichir les textes juridiques",
      icon: Upload,
      action: "Importer",
      color: "blue"
    },
    {
      id: 3,
      title: "Rejoindre la communauté",
      description: "Participez aux discussions sur les textes juridiques",
      icon: Users,
      action: "Rejoindre",
      color: "purple"
    },
    {
      id: 4,
      title: "Signaler un problème",
      description: "Aidez-nous à améliorer les textes juridiques existants",
      icon: Heart,
      action: "Signaler",
      color: "red"
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      emerald: { bg: "bg-emerald-100", text: "text-emerald-600", button: "bg-emerald-600 hover:bg-emerald-700" },
      blue: { bg: "bg-blue-100", text: "text-blue-600", button: "bg-blue-600 hover:bg-blue-700" },
      purple: { bg: "bg-purple-100", text: "text-purple-600", button: "bg-purple-600 hover:bg-purple-700" },
      orange: { bg: "bg-orange-100", text: "text-orange-600", button: "bg-orange-600 hover:bg-orange-700" },
      red: { bg: "bg-red-100", text: "text-red-600", button: "bg-red-600 hover:bg-red-700" }
    };
    return colors[color as keyof typeof colors] || colors.emerald;
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-900">Contribuez à la base de données des textes juridiques</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {contributeOptions.map((option) => {
          const IconComponent = option.icon;
          const colorClasses = getColorClasses(option.color);
          return (
            <Card key={option.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex flex-col items-center text-center">
                  <div className={`p-3 rounded-full ${colorClasses.bg} mb-3`}>
                    <IconComponent className={`w-6 h-6 ${colorClasses.text}`} />
                  </div>
                  <CardTitle className="text-lg">{option.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-center">
                  <p className="text-sm text-gray-600">{option.description}</p>
                  <Button 
                    className={`w-full ${colorClasses.button}`}
                    onClick={() => {
                      if (option.id === 1) {
                        onAddLegalText?.();
                      } else if (option.id === 2) {
                        // Importer des documents
                        import('@/utils/modalManager').then(({ openDataImportModal }) => {
                          openDataImportModal();
                        });
                      } else if (option.id === 3) {
                        // Rejoindre la communauté - naviguer vers le forum
                        window.dispatchEvent(new CustomEvent('navigate-to-section', { detail: 'forum' }));
                      } else if (option.id === 4) {
                        // Signaler un problème
                        import('@/utils/modalManager').then(({ openDocumentSuggestionModal }) => {
                          openDocumentSuggestionModal();
                        });
                      }
                    }}
                  >
                    {option.action}
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

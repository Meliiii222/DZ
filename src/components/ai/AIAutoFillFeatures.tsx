
import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export function AIAutoFillFeatures() {
  const features = [
    "Génération automatique de titres et descriptions",
    "Extraction de mots-clés pertinents", 
    "Classification automatique par domaine juridique",
    "Suggestions de références officielles"
  ];

  return (
    <div className="bg-blue-50 p-4 rounded-lg">
      <h4 className="font-medium text-blue-900 mb-2">Fonctionnalités IA disponibles :</h4>
      <ul className="text-sm text-blue-800 space-y-1">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-blue-600" />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}

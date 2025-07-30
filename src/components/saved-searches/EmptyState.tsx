
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Calendar, User, FileText } from "lucide-react";
import { LegalStatusBadge, LegalStatus } from "@/components/legal/LegalStatusBadge";

export function EmptyState() {
  const exampleLegalTexts = [
    {
      title: "Impact de la réforme du droit des sociétés sur les PME",
      category: "Analyse juridique",
      status: "en_vigueur" as LegalStatus,
      author: "Dr. Marie Dubois",
      date: "12 janvier 2025",
      description: "Analyse approfondie et synthèse des textes juridiques.",
      keywords: ["réforme", "PME"],
      stats: { views: 2647, readTime: "15 min", downloads: 155 }
    },
    {
      title: "Évolution de la jurisprudence en matière environnementale",
      category: "Droit de l'environnement", 
      status: "en_vigueur" as LegalStatus,
      author: "Prof. Jean Martin",
      date: "8 janvier 2025",
      description: "Analyse approfondie et synthèse des textes juridiques.",
      keywords: ["jurisprudence", "environnement"],
      stats: { views: 1923, readTime: "22 min", downloads: 0 }
    },
    {
      title: "Rapport annuel sur l'évolution législative 2024",
      category: "Rapport officiel",
      status: "en_revision" as LegalStatus,
      author: "",
      date: "Décembre 2024",
      description: "Analyse approfondie et synthèse des textes juridiques.",
      keywords: ["PDF"],
      stats: { views: 1247, readTime: "", downloads: 1247 }
    }
  ];

  return (
    <Card>
      <CardContent className="pt-6 text-center py-12">
        <Search className="w-16 h-16 mx-auto text-gray-400 mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Aucune recherche trouvée
        </h3>
        <p className="text-gray-600 mb-4">
          Aucune recherche ne correspond à vos critères de filtrage.
        </p>
        <div className="mt-6 space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {exampleLegalTexts.map((text, index) => (
              <Card key={index} className="border border-gray-200 hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="text-xs text-blue-600 border-blue-200">
                          {text.category}
                        </Badge>
                        <LegalStatusBadge status={text.status} />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-1">{text.title}</h4>
                      {text.author && (
                        <div className="flex items-center gap-1 text-sm text-gray-600 mb-1">
                          <User className="w-3 h-3" />
                          Par {text.author}
                        </div>
                      )}
                      <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
                        <Calendar className="w-3 h-3" />
                        {text.date}
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{text.description}</p>
                      <div className="flex gap-1 mb-3">
                        {text.keywords.map((keyword, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>{text.stats.views} vues</span>
                      {text.stats.readTime && <span>• {text.stats.readTime} de lecture</span>}
                      {text.stats.downloads > 0 && <span>• {text.stats.downloads} téléchargements</span>}
                    </div>
                    <div className="flex gap-2">
                      <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900">
                        <FileText className="w-3 h-3" />
                        Lire
                      </button>
                      <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900">
                        Partager
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

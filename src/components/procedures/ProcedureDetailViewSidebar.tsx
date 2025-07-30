
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Phone, Mail, Globe, AlertCircle } from "lucide-react";

export function ProcedureDetailViewSidebar() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Institution responsable</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold">CNRC - Centre National du Registre de Commerce</h4>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-200 rounded"></div>
              <span>Palais du Gouvernement, Alger</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>+213 21 73 80 00</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span>info@cnrc.dz</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              <span className="text-emerald-600">www.cnrc.dz</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Informations pratiques</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <span className="text-sm font-medium text-gray-600">Catégorie</span>
            <p className="font-semibold">Commercial</p>
          </div>
          <Separator />
          <div>
            <span className="text-sm font-medium text-gray-600">Durée moyenne</span>
            <p className="font-semibold">15-30 jours</p>
          </div>
          <Separator />
          <div>
            <span className="text-sm font-medium text-gray-600">Coût</span>
            <p className="font-semibold">50,000 - 100,000 DA</p>
          </div>
          <Separator />
          <div>
            <span className="text-sm font-medium text-gray-600">Difficulté</span>
            <p className="font-semibold">Moyen</p>
          </div>
          <Separator />
          <div>
            <span className="text-sm font-medium text-gray-600">Version</span>
            <p className="font-semibold"># 2.1</p>
          </div>
          <Separator />
          <div>
            <span className="text-sm font-medium text-gray-600">Dernière mise à jour</span>
            <p className="font-semibold">15/12/2024</p>
          </div>
          <Separator />
          <div>
            <span className="text-sm font-medium text-gray-600">Procédures complétées</span>
            <p className="font-semibold">1247</p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-orange-50 border-orange-200">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-orange-600 mt-1" />
            <div>
              <h4 className="font-semibold text-orange-800 mb-1">Besoin d'aide ?</h4>
              <p className="text-sm text-orange-700 mb-3">
                Notre équipe d'experts peut vous accompagner dans cette procédure.
              </p>
              <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                Contacter un expert
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

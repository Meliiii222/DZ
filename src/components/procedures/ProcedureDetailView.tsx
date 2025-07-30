
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, FileText } from "lucide-react";
import { AdministrativeProcedure } from "@/types/legal";
import { ProcedureDetailViewHeader } from './ProcedureDetailViewHeader';
import { ProcedureDetailViewSteps } from './ProcedureDetailViewSteps';
import { ProcedureDetailViewSidebar } from './ProcedureDetailViewSidebar';

interface ProcedureDetailViewProps {
  procedure: AdministrativeProcedure;
  onBack: () => void;
}

export function ProcedureDetailView({ procedure, onBack }: ProcedureDetailViewProps) {
  return (
    <div className="space-y-6">
      <ProcedureDetailViewHeader procedure={procedure} onBack={onBack} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <ProcedureDetailViewSteps procedure={procedure} />

          <div>
            <h2 className="text-lg font-semibold mb-4">Formulaires à télécharger</h2>
            <div className="space-y-4">
              {procedure.forms.map((form) => (
                <div key={form.id} className="flex items-center justify-between p-4 bg-white rounded-lg border">
                  <div className="flex items-center gap-3">
                    <FileText className="w-6 h-6 text-red-500" />
                    <div>
                      <h4 className="font-semibold text-sm">{form.title}</h4>
                      <p className="text-xs text-gray-600">{form.description}</p>
                    </div>
                  </div>
                  <Button className="bg-emerald-600 hover:bg-emerald-700">
                    <Download className="w-4 h-4 mr-2" />
                    Télécharger
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <ProcedureDetailViewSidebar />
      </div>
    </div>
  );
}

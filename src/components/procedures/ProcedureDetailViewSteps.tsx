
import { Clock, CheckCircle } from "lucide-react";
import { AdministrativeProcedure } from "@/types/legal";

interface ProcedureDetailViewStepsProps {
  procedure: AdministrativeProcedure;
}

export function ProcedureDetailViewSteps({ procedure }: ProcedureDetailViewStepsProps) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Étapes de la procédure</h2>
      <div className="space-y-4">
        {procedure.steps.map((step, index) => (
          <div key={step.id} className="flex gap-4 p-4 bg-white rounded-lg border">
            <div className="flex-shrink-0 w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
              {index + 1}
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-lg mb-1">{step.title}</h4>
              <p className="text-gray-600 mb-2">{step.description}</p>
              {step.duration && (
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <Clock className="w-3 h-3" />
                  {step.duration}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Documents requis</h2>
        <div className="space-y-3">
          {procedure.requiredDocuments.map((doc, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-lg border">
              <CheckCircle className="w-5 h-5 text-emerald-600" />
              <span>{doc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

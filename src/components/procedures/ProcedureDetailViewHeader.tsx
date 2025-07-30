
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, FileText, Users, Star } from "lucide-react";
import { AdministrativeProcedure } from "@/types/legal";

interface ProcedureDetailViewHeaderProps {
  procedure: AdministrativeProcedure;
  onBack: () => void;
}

export function ProcedureDetailViewHeader({ procedure, onBack }: ProcedureDetailViewHeaderProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="gap-2 text-emerald-600"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour à la liste
        </Button>
      </div>

      <div className="bg-emerald-600 text-white p-6 rounded-lg">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h1 className="text-xl font-bold mb-2">{procedure.title}</h1>
            <p className="text-emerald-100 text-sm mb-4">{procedure.description}</p>
            
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{procedure.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                <span>{procedure.cost}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>{procedure.completedCount} complétées</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Badge className="bg-yellow-500 text-yellow-900 px-3 py-1">
              {procedure.difficulty}
            </Badge>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm">{procedure.rating}/5</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

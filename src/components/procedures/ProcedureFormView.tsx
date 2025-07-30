
import { ProcedureForm } from "@/components/ProcedureForm";

interface ProcedureFormViewProps {
  onBack: () => void;
  onSubmit: (data: Record<string, unknown>) => void;
  ocrData?: Record<string, unknown>;
}

export function ProcedureFormView({ onBack, onSubmit, ocrData }: ProcedureFormViewProps) {
  return (
    <div className="space-y-6">
      <ProcedureForm 
        onClose={onBack} 
        onSubmit={onSubmit}
        ocrData={ocrData}
      />
    </div>
  );
}

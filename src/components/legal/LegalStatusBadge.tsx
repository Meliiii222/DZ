
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Edit, Clock, AlertTriangle } from "lucide-react";

export type LegalStatus = "en_vigueur" | "abroge" | "modifie" | "en_revision" | "suspendu" | "projet";

interface LegalStatusBadgeProps {
  status: LegalStatus;
  className?: string;
}

export function LegalStatusBadge({ status, className }: LegalStatusBadgeProps) {
  const getStatusConfig = (status: LegalStatus) => {
    switch (status) {
      case "en_vigueur":
        return {
          label: "En vigueur",
          color: "bg-green-100 text-green-800 border-green-200",
          icon: CheckCircle
        };
      case "abroge":
        return {
          label: "Abrogé",
          color: "bg-red-100 text-red-800 border-red-200",
          icon: XCircle
        };
      case "modifie":
        return {
          label: "Modifié",
          color: "bg-blue-100 text-blue-800 border-blue-200",
          icon: Edit
        };
      case "en_revision":
        return {
          label: "En révision",
          color: "bg-yellow-100 text-yellow-800 border-yellow-200",
          icon: Clock
        };
      case "suspendu":
        return {
          label: "Suspendu",
          color: "bg-orange-100 text-orange-800 border-orange-200",
          icon: AlertTriangle
        };
      case "projet":
        return {
          label: "Projet",
          color: "bg-purple-100 text-purple-800 border-purple-200",
          icon: Clock
        };
      default:
        return {
          label: "Inconnu",
          color: "bg-gray-100 text-gray-800 border-gray-200",
          icon: AlertTriangle
        };
    }
  };

  const config = getStatusConfig(status);
  const IconComponent = config.icon;

  return (
    <Badge className={`${config.color} ${className} border flex items-center gap-1`} variant="secondary">
      <IconComponent className="w-3 h-3" />
      {config.label}
    </Badge>
  );
}

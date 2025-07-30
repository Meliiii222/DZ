
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface SearchCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  buttonText: string;
  buttonColor?: "blue" | "emerald" | "purple" | "orange";
  onClick?: () => void;
  transparent?: boolean;
}

export function SearchCard({ 
  title, 
  description, 
  icon: Icon, 
  buttonText, 
  buttonColor = "blue",
  onClick,
  transparent = false
}: SearchCardProps) {
  const colorClasses = {
    blue: "text-blue-600 bg-blue-600 hover:bg-blue-700",
    emerald: "text-emerald-600 bg-emerald-600 hover:bg-emerald-700", 
    purple: "text-purple-600 bg-purple-600 hover:bg-purple-700",
    orange: "text-orange-600 bg-orange-600 hover:bg-orange-700"
  };

  return (
    <Card className={`hover:shadow-md transition-shadow cursor-pointer h-full ${transparent ? 'bg-transparent border-none shadow-none hover:shadow-none' : ''}`}>
      <CardHeader className="text-center pb-4">
        <div className={`w-16 h-16 mx-auto mb-4 rounded-lg flex items-center justify-center ${transparent ? 'bg-transparent border-none' : 'bg-gray-50'}`}>
          <Icon className={`w-8 h-8 ${colorClasses[buttonColor].split(' ')[0]}`} />
        </div>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription className="text-sm">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <Button 
          className={`w-full ${colorClasses[buttonColor]}`}
          onClick={onClick}
        >
          <Icon className="w-4 h-4 mr-2" />
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  );
}

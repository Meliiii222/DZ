
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataGovernanceTab } from "./DataGovernanceTab";
import { AdvancedSecurityTab } from "./AdvancedSecurityTab";

interface DataManagementSectionProps {
  language?: string;
}

export function DataManagementSection({ language = "fr" }: DataManagementSectionProps) {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="governance" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="governance">Gouvernance des Données</TabsTrigger>
          <TabsTrigger value="security">Sécurité Avancée</TabsTrigger>
        </TabsList>

        <TabsContent value="governance">
          <DataGovernanceTab language={language} />
        </TabsContent>

        <TabsContent value="security">
          <AdvancedSecurityTab language={language} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

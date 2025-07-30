
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RealtimeAnnotationsTab } from './tabs/RealtimeAnnotationsTab';
import { StructuredDebatesTab } from './tabs/StructuredDebatesTab';
import { CollaborativeSurveillanceTab } from './tabs/CollaborativeSurveillanceTab';
import { KnowledgeGraphsTab } from './tabs/KnowledgeGraphsTab';

export function AdvancedCollaborativeTools() {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="annotations" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="annotations">Annotation Temps Réel</TabsTrigger>
          <TabsTrigger value="debates">Débats Structurés</TabsTrigger>
          <TabsTrigger value="surveillance">Veille Collaborative</TabsTrigger>
          <TabsTrigger value="knowledge">Knowledge Graphs</TabsTrigger>
        </TabsList>

        <TabsContent value="annotations" className="space-y-6">
          <RealtimeAnnotationsTab />
        </TabsContent>

        <TabsContent value="debates" className="space-y-6">
          <StructuredDebatesTab />
        </TabsContent>

        <TabsContent value="surveillance" className="space-y-6">
          <CollaborativeSurveillanceTab />
        </TabsContent>

        <TabsContent value="knowledge" className="space-y-6">
          <KnowledgeGraphsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}

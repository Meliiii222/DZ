
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { OuvragesTab } from './library/OuvragesTab';
import { RevuesTab } from './library/RevuesTab';
import { JournauxTab } from './library/JournauxTab';
import { ArticlesTab } from './library/ArticlesTab';
import { VideosTab } from './library/VideosTab';

export function LibraryTabs() {
  return (
    <Tabs defaultValue="ouvrages" className="w-full">
      <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger value="ouvrages">Ouvrages</TabsTrigger>
        <TabsTrigger value="revues">Revues</TabsTrigger>
        <TabsTrigger value="journaux">Journaux</TabsTrigger>
        <TabsTrigger value="articles">Articles</TabsTrigger>
        <TabsTrigger value="videos">Vidéos</TabsTrigger>
      </TabsList>
      
      <TabsContent value="ouvrages" className="mt-6">
        <OuvragesTab />
      </TabsContent>

      <TabsContent value="revues" className="mt-6">
        <RevuesTab />
      </TabsContent>

      <TabsContent value="journaux" className="mt-6">
        <JournauxTab />
      </TabsContent>

      <TabsContent value="articles" className="mt-6">
        <ArticlesTab />
      </TabsContent>

      <TabsContent value="videos" className="mt-6">
        <VideosTab />
      </TabsContent>
    </Tabs>
  );
}

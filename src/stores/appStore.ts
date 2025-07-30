import { create } from 'zustand';
import type { AppStore, LegalText, Procedure, NewsItem, DocumentTemplate } from '@/types/store';

export const useAppStore = create<AppStore>((set, get) => ({
  // État initial
  legalTexts: [],
  procedures: [],
  news: [],
  templates: [],
  savedSearches: [],
  favorites: [],
  forumDiscussions: [],
  sharedResources: [],
  videoTutorials: [],
  configuration: {},
  forumMembers: [],
  currentUser: null,
  currentSection: 'dashboard',
  
  // Actions pour les textes juridiques
  addLegalText: (text: LegalText) => {
    set((state) => ({
      legalTexts: [...state.legalTexts, text]
    }));
  },
  
  deleteLegalText: (id: string) => {
    set((state) => ({
      legalTexts: state.legalTexts.filter(text => text.id !== id),
      favorites: state.favorites.filter(fav => 
        !(fav.itemId === id && fav.itemType === 'legal-text')
      )
    }));
  },
  
  searchLegalTexts: (query: string) => {
    const { legalTexts } = get();
    return legalTexts.filter(text => 
      text.title?.toLowerCase().includes(query.toLowerCase()) ||
      text.description?.toLowerCase().includes(query.toLowerCase())
    );
  },
  
  // Actions pour les procédures
  addProcedure: (procedure: Procedure) => {
    set((state) => ({
      procedures: [...state.procedures, procedure]
    }));
  },
  
  deleteProcedure: (id: string) => {
    set((state) => ({
      procedures: state.procedures.filter(proc => proc.id !== id),
      favorites: state.favorites.filter(fav => 
        !(fav.itemId === id && fav.itemType === 'procedure')
      )
    }));
  },
  
  searchProcedures: (query: string) => {
    const { procedures } = get();
    return procedures.filter(proc => 
      proc.title?.toLowerCase().includes(query.toLowerCase()) ||
      proc.description?.toLowerCase().includes(query.toLowerCase())
    );
  },
  
  // Actions pour les actualités
  addNews: (news: NewsItem) => {
    set((state) => ({
      news: [...state.news, news]
    }));
  },
  
  deleteNews: (id: string) => {
    set((state) => ({
      news: state.news.filter(item => item.id !== id),
      favorites: state.favorites.filter(fav => 
        !(fav.itemId === id && fav.itemType === 'news')
      )
    }));
  },
  
  // Actions pour les templates
  addTemplate: (template: DocumentTemplate) => {
    set((state) => ({
      templates: [...state.templates, template]
    }));
  },
  
  deleteTemplate: (id: string) => {
    set((state) => ({
      templates: state.templates.filter(template => template.id !== id),
      favorites: state.favorites.filter(fav => 
        !(fav.itemId === id && fav.itemType === 'template')
      )
    }));
  },
  
  // Actions pour le forum
  addForumDiscussion: (discussion: any) => {
    set((state) => ({
      forumDiscussions: [...state.forumDiscussions, discussion]
    }));
  },
  
  // Actions pour les ressources partagées
  addSharedResource: (resource: any) => {
    set((state) => ({
      sharedResources: [...state.sharedResources, resource]
    }));
  },
  
  // Actions pour les tutoriels vidéo
  addVideoTutorial: (tutorial: any) => {
    set((state) => ({
      videoTutorials: [...state.videoTutorials, tutorial]
    }));
  },
  
  // Configuration
  setConfiguration: (config: any) => {
    set({ configuration: config });
  },
  
  // Membres du forum
  addForumMember: (member: any) => {
    set((state) => ({
      forumMembers: [...state.forumMembers, member]
    }));
  },
  
  // Recherches sauvegardées
  deleteSavedSearch: (id: string) => {
    set((state) => ({
      savedSearches: state.savedSearches.filter(search => search.id !== id)
    }));
  },
  
  // Favoris
  removeFromFavorites: (itemId: string, itemType: string) => {
    set((state) => ({
      favorites: state.favorites.filter(fav => 
        !(fav.itemId === itemId && fav.itemType === itemType)
      )
    }));
  },
  
  // Utilisateur actuel
  setCurrentUser: (user: any) => {
    set({ currentUser: user });
  },

  // Navigation
  setCurrentSection: (section: string) => {
    set({ currentSection: section });
  },

  // Recherche globale
  globalSearch: (query: string) => {
    const state = get();
    const results = {
      legalTexts: state.searchLegalTexts(query),
      procedures: state.searchProcedures(query),
      news: state.news.filter(item => 
        item.title?.toLowerCase().includes(query.toLowerCase()) ||
        item.content?.toLowerCase().includes(query.toLowerCase())
      ),
      templates: state.templates.filter(template =>
        template.title?.toLowerCase().includes(query.toLowerCase()) ||
        template.description?.toLowerCase().includes(query.toLowerCase())
      )
    };
    return results;
  }
}));
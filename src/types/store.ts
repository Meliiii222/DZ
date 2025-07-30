// Types pour le store principal
export interface LegalText {
  id: string;
  title: string;
  type: string;
  category: string;
  publishDate: string;
  status: string;
  description: string;
  authority: string;
  joNumber: string;
  date: Date;
  source: string;
  author: string;
  insertionMethod: string;
  views?: number;
  popularity: number;
}

export interface Procedure {
  id: string;
  title: string;
  category: string;
  status: string;
  description: string;
  steps: any[];
  requirements: string[];
  processingTime: string;
  cost: string;
  authority: string;
}

export interface NewsItem {
  id: string;
  title: string;
  content: string;
  category: string;
  publishDate: string;
  author: string;
  views: number;
}

export interface DocumentTemplate {
  id: string;
  title: string;
  category: string;
  description: string;
  fileUrl: string;
  downloadCount: number;
}

export interface AppState {
  legalTexts: LegalText[];
  procedures: Procedure[];
  news: NewsItem[];
  templates: DocumentTemplate[];
  savedSearches: any[];
  favorites: any[];
  forumDiscussions: any[];
  sharedResources: any[];
  videoTutorials: any[];
  configuration: any;
  forumMembers: any[];
  currentUser: any;
  currentSection: string;
}

export interface AppActions {
  addLegalText: (text: LegalText) => void;
  addProcedure: (procedure: Procedure) => void;
  addNews: (news: NewsItem) => void;
  addTemplate: (template: DocumentTemplate) => void;
  addForumDiscussion: (discussion: any) => void;
  addSharedResource: (resource: any) => void;
  addVideoTutorial: (tutorial: any) => void;
  setConfiguration: (config: any) => void;
  addForumMember: (member: any) => void;
  deleteLegalText: (id: string) => void;
  deleteProcedure: (id: string) => void;
  deleteNews: (id: string) => void;
  deleteTemplate: (id: string) => void;
  deleteSavedSearch: (id: string) => void;
  removeFromFavorites: (itemId: string, itemType: string) => void;
  setCurrentUser: (user: any) => void;
  searchLegalTexts: (query: string) => LegalText[];
  searchProcedures: (query: string) => Procedure[];
  setCurrentSection: (section: string) => void;
  globalSearch: (query: string) => {
    legalTexts: LegalText[];
    procedures: Procedure[];
    news: NewsItem[];
    templates: DocumentTemplate[];
  };
}

export type AppStore = AppState & AppActions;
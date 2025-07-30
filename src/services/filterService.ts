export interface FilterOptions {
  type?: string[];
  status?: string[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  source?: string[];
  author?: string[];
  insertionMethod?: string[];
}

export interface SortOption {
  field: 'date' | 'title' | 'type' | 'status' | 'popularity';
  direction: 'asc' | 'desc';
}

export interface LegalText {
  id: string;
  title: string;
  type: string;
  status: string;
  date: Date;
  source?: string;
  author?: string;
  insertionMethod?: string;
  popularity?: number;
  [key: string]: any;
}

export class FilterService {
  static applyLegalTextFilters(texts: LegalText[], filters: FilterOptions): LegalText[] {
    return texts.filter(text => {
      // Filtrer par type
      if (filters.type && filters.type.length > 0) {
        if (!filters.type.includes(text.type)) return false;
      }

      // Filtrer par status
      if (filters.status && filters.status.length > 0) {
        if (!filters.status.includes(text.status)) return false;
      }

      // Filtrer par méthode d'insertion
      if (filters.insertionMethod && filters.insertionMethod.length > 0) {
        if (!filters.insertionMethod.includes(text.insertionMethod || 'manual')) return false;
      }

      // Filtrer par plage de dates
      if (filters.dateRange) {
        const textDate = new Date(text.date);
        if (textDate < filters.dateRange.start || textDate > filters.dateRange.end) {
          return false;
        }
      }

      // Filtrer par source
      if (filters.source && filters.source.length > 0) {
        if (!text.source || !filters.source.includes(text.source)) return false;
      }

      // Filtrer par auteur
      if (filters.author && filters.author.length > 0) {
        if (!text.author || !filters.author.includes(text.author)) return false;
      }

      return true;
    });
  }

  static applySortOrder(texts: LegalText[], sortOption: SortOption): LegalText[] {
    return [...texts].sort((a, b) => {
      let comparison = 0;

      switch (sortOption.field) {
        case 'date':
          comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
          break;
        case 'title':
          comparison = a.title.localeCompare(b.title, 'fr', { sensitivity: 'base' });
          break;
        case 'type':
          comparison = a.type.localeCompare(b.type, 'fr', { sensitivity: 'base' });
          break;
        case 'status':
          comparison = a.status.localeCompare(b.status, 'fr', { sensitivity: 'base' });
          break;
        case 'popularity':
          comparison = (a.popularity || 0) - (b.popularity || 0);
          break;
        default:
          comparison = 0;
      }

      return sortOption.direction === 'desc' ? -comparison : comparison;
    });
  }

  static getAvailableFilters(texts: LegalText[]) {
    const types = [...new Set(texts.map(t => t.type).filter(Boolean))];
    const statuses = [...new Set(texts.map(t => t.status).filter(Boolean))];
    const sources = [...new Set(texts.map(t => t.source).filter(Boolean))];
    const authors = [...new Set(texts.map(t => t.author).filter(Boolean))];
    const insertionMethods = [...new Set(texts.map(t => t.insertionMethod || 'manual'))];

    return {
      types,
      statuses,
      sources,
      authors,
      insertionMethods
    };
  }
}
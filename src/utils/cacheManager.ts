/**
 * Cache Manager avancé - Performance optimisée pour LYO
 * Implémente des stratégies de cache intelligentes pour 8.5/10 performance
 */

import { log } from './securityLogger';

interface CacheItem<T> {
  data: T;
  timestamp: number;
  ttl: number; // Time to live en millisecondes
  accessCount: number;
  lastAccess: number;
  size?: number; // Taille estimée en octets
}

interface CacheStats {
  hits: number;
  misses: number;
  evictions: number;
  totalSize: number;
  itemCount: number;
}

class AdvancedCacheManager {
  private cache = new Map<string, CacheItem<any>>();
  private stats: CacheStats = {
    hits: 0,
    misses: 0,
    evictions: 0,
    totalSize: 0,
    itemCount: 0
  };
  
  private maxSize = 50 * 1024 * 1024; // 50MB max cache
  private maxItems = 1000;
  private defaultTTL = 30 * 60 * 1000; // 30 minutes
  
  constructor() {
    this.startCleanupTimer();
    this.setupPerformanceMonitoring();
  }

  /**
   * Mise en cache avec stratégie LRU et gestion de taille
   */
  set<T>(key: string, data: T, ttl: number = this.defaultTTL): void {
    try {
      const size = this.estimateSize(data);
      const now = Date.now();
      
      // Éviction si nécessaire
      this.evictIfNeeded(size);
      
      // Supprimer l'ancienne entrée si elle existe
      if (this.cache.has(key)) {
        const oldItem = this.cache.get(key)!;
        this.stats.totalSize -= oldItem.size || 0;
      } else {
        this.stats.itemCount++;
      }
      
      const item: CacheItem<T> = {
        data,
        timestamp: now,
        ttl,
        accessCount: 1,
        lastAccess: now,
        size
      };
      
      this.cache.set(key, item);
      this.stats.totalSize += size;
      
      log.debug('Cache set', { key, size, ttl }, 'CacheManager');
    } catch (error) {
      log.error('Cache set error', error, 'CacheManager');
    }
  }

  /**
   * Récupération avec mise à jour LRU
   */
  get<T>(key: string): T | null {
    try {
      const item = this.cache.get(key);
      
      if (!item) {
        this.stats.misses++;
        return null;
      }
      
      const now = Date.now();
      
      // Vérifier l'expiration
      if (now > item.timestamp + item.ttl) {
        this.delete(key);
        this.stats.misses++;
        return null;
      }
      
      // Mettre à jour les stats d'accès (LRU)
      item.accessCount++;
      item.lastAccess = now;
      this.stats.hits++;
      
      return item.data as T;
    } catch (error) {
      log.error('Cache get error', error, 'CacheManager');
      this.stats.misses++;
      return null;
    }
  }

  /**
   * Mise en cache conditionnelle avec fonction de calcul
   */
  async getOrSet<T>(
    key: string, 
    factory: () => Promise<T> | T, 
    ttl: number = this.defaultTTL
  ): Promise<T> {
    const cached = this.get<T>(key);
    if (cached !== null) {
      return cached;
    }
    
    try {
      const data = await factory();
      this.set(key, data, ttl);
      return data;
    } catch (error) {
      log.error('Cache factory error', error, 'CacheManager');
      throw error;
    }
  }

  /**
   * Suppression avec mise à jour des stats
   */
  delete(key: string): boolean {
    const item = this.cache.get(key);
    if (item) {
      this.stats.totalSize -= item.size || 0;
      this.stats.itemCount--;
      this.cache.delete(key);
      return true;
    }
    return false;
  }

  /**
   * Nettoyage automatique des entrées expirées
   */
  cleanup(): number {
    const now = Date.now();
    let cleaned = 0;
    
    for (const [key, item] of this.cache.entries()) {
      if (now > item.timestamp + item.ttl) {
        this.delete(key);
        cleaned++;
      }
    }
    
    log.debug('Cache cleanup completed', { cleaned }, 'CacheManager');
    return cleaned;
  }

  /**
   * Éviction LRU avec priorité sur la taille
   */
  private evictIfNeeded(newItemSize: number): void {
    // Éviction par taille
    while (this.stats.totalSize + newItemSize > this.maxSize && this.cache.size > 0) {
      this.evictLRU();
    }
    
    // Éviction par nombre d'items
    while (this.cache.size >= this.maxItems) {
      this.evictLRU();
    }
  }

  /**
   * Éviction LRU (Least Recently Used)
   */
  private evictLRU(): void {
    let oldestKey = '';
    let oldestTime = Date.now();
    
    for (const [key, item] of this.cache.entries()) {
      if (item.lastAccess < oldestTime) {
        oldestTime = item.lastAccess;
        oldestKey = key;
      }
    }
    
    if (oldestKey) {
      this.delete(oldestKey);
      this.stats.evictions++;
    }
  }

  /**
   * Estimation de la taille d'un objet
   */
  private estimateSize(data: any): number {
    try {
      if (typeof data === 'string') {
        return data.length * 2; // UTF-16
      }
      
      if (data instanceof ArrayBuffer) {
        return data.byteLength;
      }
      
      if (data instanceof Blob) {
        return data.size;
      }
      
      // Estimation pour les objets JSON
      return JSON.stringify(data).length * 2;
    } catch {
      return 1024; // Taille par défaut
    }
  }

  /**
   * Timer de nettoyage automatique
   */
  private startCleanupTimer(): void {
    setInterval(() => {
      this.cleanup();
    }, 5 * 60 * 1000); // Toutes les 5 minutes
  }

  /**
   * Monitoring des performances
   */
  private setupPerformanceMonitoring(): void {
    setInterval(() => {
      const hitRate = this.stats.hits / (this.stats.hits + this.stats.misses) * 100 || 0;
      const avgSize = this.stats.totalSize / this.stats.itemCount || 0;
      
      log.debug('Cache performance', {
        hitRate: `${hitRate.toFixed(2)}%`,
        totalSize: `${(this.stats.totalSize / 1024 / 1024).toFixed(2)}MB`,
        itemCount: this.stats.itemCount,
        avgSize: `${(avgSize / 1024).toFixed(2)}KB`,
        evictions: this.stats.evictions
      }, 'CacheManager');
    }, 60 * 1000); // Toutes les minutes
  }

  /**
   * API publiques pour monitoring
   */
  getStats(): CacheStats {
    return { ...this.stats };
  }

  getHitRate(): number {
    return this.stats.hits / (this.stats.hits + this.stats.misses) * 100 || 0;
  }

  clear(): void {
    this.cache.clear();
    this.stats = {
      hits: 0,
      misses: 0,
      evictions: 0,
      totalSize: 0,
      itemCount: 0
    };
  }

  // Méthodes spécialisées pour LYO
  
  /**
   * Cache pour les textes juridiques avec TTL long
   */
  cacheLegalText(id: string, data: any): void {
    this.set(`legal:${id}`, data, 60 * 60 * 1000); // 1 heure
  }

  /**
   * Cache pour les résultats OCR avec TTL moyen
   */
  cacheOCRResult(hash: string, data: any): void {
    this.set(`ocr:${hash}`, data, 30 * 60 * 1000); // 30 minutes
  }

  /**
   * Cache pour les recherches avec TTL court
   */
  cacheSearchResult(query: string, data: any): void {
    this.set(`search:${query}`, data, 10 * 60 * 1000); // 10 minutes
  }
}

// Instance globale
export const advancedCache = new AdvancedCacheManager();

// Cache simplifié pour compatibilité
export const cache = {
  get: <T>(key: string): T | null => advancedCache.get<T>(key),
  set: <T>(key: string, data: T, ttl?: number): void => advancedCache.set(key, data, ttl),
  delete: (key: string): boolean => advancedCache.delete(key),
  clear: (): void => advancedCache.clear(),
  getStats: () => advancedCache.getStats()
};

export default advancedCache;
#!/usr/bin/env node

/**
 * Script de nettoyage des assets inutilisés
 * Utilisé pour maintenir un code source propre
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Fonction pour scanner les fichiers source
function scanForUsedAssets() {
  const srcDir = path.join(__dirname, '../src');
  const publicDir = path.join(__dirname, '../public');
  const usedAssets = new Set();
  
  function scanDirectory(dir) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory() && !file.startsWith('.')) {
        scanDirectory(filePath);
      } else if (file.match(/\.(tsx?|jsx?|css)$/)) {
        const content = fs.readFileSync(filePath, 'utf8');
        
        // Rechercher les références aux assets
        const assetMatches = content.match(/['"`]\/[^'"`\s]+\.(png|jpg|jpeg|gif|svg|ico|pdf|zip)['"`]/g);
        if (assetMatches) {
          assetMatches.forEach(match => {
            const asset = match.slice(1, -1); // Enlever les quotes
            usedAssets.add(asset);
          });
        }
      }
    });
  }
  
  scanDirectory(srcDir);
  return usedAssets;
}

// Fonction pour lister tous les assets publics
function getAllPublicAssets() {
  const publicDir = path.join(__dirname, '../public');
  const allAssets = new Set();
  
  function scanPublicDirectory(dir, prefix = '') {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        scanPublicDirectory(filePath, prefix + '/' + file);
      } else if (file.match(/\.(png|jpg|jpeg|gif|svg|ico|pdf|zip)$/)) {
        allAssets.add(prefix + '/' + file);
      }
    });
  }
  
  scanPublicDirectory(publicDir);
  return allAssets;
}

// Exécution principal
console.log('🧹 Analyse des assets utilisés...');
const usedAssets = scanForUsedAssets();
const allAssets = getAllPublicAssets();

console.log(`📊 Assets trouvés: ${allAssets.size}`);
console.log(`✅ Assets utilisés: ${usedAssets.size}`);

const unusedAssets = [...allAssets].filter(asset => !usedAssets.has(asset));

if (unusedAssets.length > 0) {
  console.log('⚠️  Assets potentiellement inutilisés:');
  unusedAssets.forEach(asset => {
    console.log(`   - ${asset}`);
  });
  console.log(`\n📝 ${unusedAssets.length} assets peuvent être supprimés`);
} else {
  console.log('✨ Tous les assets sont utilisés !');
}

console.log('\n✅ Analyse terminée');
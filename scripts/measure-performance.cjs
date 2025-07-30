#!/usr/bin/env node

/**
 * Script de mesure de performance pour LYO
 * Évalue les améliorations et calcule le score final
 */

const fs = require('fs');
const path = require('path');

function measureBundleSize() {
  const distPath = path.join(__dirname, '..', 'dist', 'assets');
  
  if (!fs.existsSync(distPath)) {
    console.error('❌ Dist folder not found. Please run npm run build first.');
    return null;
  }
  
  const files = fs.readdirSync(distPath);
  let totalSize = 0;
  let jsSize = 0;
  let cssSize = 0;
  let chunks = 0;
  
  const analysis = {
    files: [],
    totalSize: 0,
    jsSize: 0,
    cssSize: 0,
    chunks: 0,
    score: 0
  };
  
  files.forEach(file => {
    const filePath = path.join(distPath, file);
    const stats = fs.statSync(filePath);
    const size = stats.size;
    
    totalSize += size;
    
    if (file.endsWith('.js')) {
      jsSize += size;
      chunks++;
    } else if (file.endsWith('.css')) {
      cssSize += size;
    }
    
    analysis.files.push({
      name: file,
      size: size,
      sizeKB: (size / 1024).toFixed(2),
      sizeMB: (size / 1024 / 1024).toFixed(2)
    });
  });
  
  analysis.totalSize = totalSize;
  analysis.jsSize = jsSize;
  analysis.cssSize = cssSize;
  analysis.chunks = chunks;
  
  return analysis;
}

function calculatePerformanceScore(analysis) {
  if (!analysis) return 0;
  
  let score = 10; // Score initial parfait
  
  // Pénalité pour la taille totale
  const totalMB = analysis.totalSize / 1024 / 1024;
  if (totalMB > 2) score -= 2;        // > 2MB
  else if (totalMB > 1) score -= 1;   // > 1MB
  else if (totalMB > 0.5) score -= 0.5; // > 500KB
  
  // Pénalité pour JS bundle
  const jsMB = analysis.jsSize / 1024 / 1024;
  if (jsMB > 1.5) score -= 2;         // > 1.5MB JS
  else if (jsMB > 1) score -= 1;      // > 1MB JS
  else if (jsMB > 0.5) score -= 0.5;  // > 500KB JS
  
  // Bonus pour le nombre de chunks optimal
  if (analysis.chunks <= 5) score += 0.5;      // Peu de chunks = bon
  else if (analysis.chunks > 10) score -= 0.5; // Trop de chunks = mauvais
  
  // Bonus pour CSS optimisé
  const cssKB = analysis.cssSize / 1024;
  if (cssKB < 50) score += 0.5;       // CSS < 50KB = excellent
  else if (cssKB > 100) score -= 0.5; // CSS > 100KB = lourd
  
  return Math.max(0, Math.min(10, score));
}

function generateReport(analysis) {
  const score = calculatePerformanceScore(analysis);
  analysis.score = score;
  
  console.log('\n📊 RAPPORT DE PERFORMANCE LYO\n');
  console.log('🏗️  Bundle Analysis:');
  console.log(`   Total Size: ${(analysis.totalSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`   JavaScript: ${(analysis.jsSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`   CSS: ${(analysis.cssSize / 1024).toFixed(2)} KB`);
  console.log(`   Chunks: ${analysis.chunks}`);
  
  console.log('\n📁 Files:');
  analysis.files
    .filter(f => f.size > 0) // Filtrer les fichiers vides
    .sort((a, b) => b.size - a.size)
    .forEach(file => {
      const icon = file.name.endsWith('.js') ? '📜' : file.name.endsWith('.css') ? '🎨' : '📄';
      console.log(`   ${icon} ${file.name}: ${file.sizeKB} KB`);
    });
  
  console.log('\n🎯 Performance Score:');
  const rating = score >= 9 ? '🟢 Excellent' : 
                score >= 8.5 ? '🟡 Très bon' :
                score >= 8 ? '🟡 Bon' :
                score >= 6 ? '🟠 Moyen' : '🔴 Faible';
  
  console.log(`   Score: ${score.toFixed(1)}/10`);
  console.log(`   Rating: ${rating}`);
  
  // Recommandations
  console.log('\n💡 Recommandations:');
  if (analysis.totalSize / 1024 / 1024 > 1) {
    console.log('   ⚠️  Bundle trop volumineux - Implémenter plus de lazy loading');
  }
  if (analysis.jsSize / 1024 / 1024 > 1) {
    console.log('   ⚠️  JavaScript lourd - Optimiser les dépendances');
  }
  if (analysis.chunks > 10) {
    console.log('   ⚠️  Trop de chunks - Simplifier le code splitting');
  }
  if (score >= 8.5) {
    console.log('   ✅ Performance excellente !');
  } else if (score >= 8) {
    console.log('   ✅ Bonne performance, quelques optimisations possibles');
  }
  
  console.log('\n🚀 Objectif: 8.5/10 pour la production\n');
  
  return score;
}

function compareWithTargets() {
  console.log('🎯 OBJECTIFS DE PERFORMANCE:');
  console.log('   - Bundle total: < 1MB (idéal)');
  console.log('   - JavaScript: < 500KB (idéal)');
  console.log('   - CSS: < 50KB (idéal)');
  console.log('   - Chunks: 3-7 (optimal)');
  console.log('   - Score cible: 8.5/10\n');
}

// Exécution principale
async function main() {
  console.log('🔍 Analyse des performances...\n');
  
  compareWithTargets();
  
  const analysis = measureBundleSize();
  if (!analysis) {
    process.exit(1);
  }
  
  const score = generateReport(analysis);
  
  // Sauvegarder les résultats
  const reportPath = path.join(__dirname, '..', 'performance-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(analysis, null, 2));
  
  console.log(`📋 Rapport sauvegardé: ${reportPath}`);
  
  // Exit code basé sur le score
  process.exit(score >= 8.5 ? 0 : 1);
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { measureBundleSize, calculatePerformanceScore, generateReport };
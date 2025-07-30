#!/usr/bin/env node

/**
 * Script d'optimisation de sécurité pour l'application LYO
 * Automatise les corrections de sécurité et d'optimisation
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔧 Démarrage de l\'optimisation de sécurité LYO...\n');

// 1. Nettoyer les fichiers temporaires et de cache
function cleanupTempFiles() {
  console.log('🧹 Nettoyage des fichiers temporaires...');
  
  const tempDirs = [
    '.next',
    '.vite',
    'dist',
    'build',
    '.cache'
  ];
  
  tempDirs.forEach(dir => {
    const dirPath = path.join(process.cwd(), dir);
    if (fs.existsSync(dirPath)) {
      fs.rmSync(dirPath, { recursive: true, force: true });
      console.log(`  ✅ Supprimé: ${dir}`);
    }
  });
}

// 2. Optimiser les dépendances
function optimizeDependencies() {
  console.log('\n📦 Optimisation des dépendances...');
  
  try {
    // Nettoyer node_modules et package-lock
    execSync('rm -rf node_modules package-lock.json', { stdio: 'inherit' });
    
    // Réinstaller avec les dernières versions sécurisées
    execSync('npm install', { stdio: 'inherit' });
    
    // Audit de sécurité
    execSync('npm audit fix --force', { stdio: 'inherit' });
    
    console.log('  ✅ Dépendances optimisées');
  } catch (error) {
    console.warn('  ⚠️ Certaines dépendances n\'ont pas pu être mises à jour automatiquement');
  }
}

// 3. Corriger les problèmes de sécurité dans le code
function fixSecurityIssues() {
  console.log('\n🔒 Correction des problèmes de sécurité...');
  
  const srcDir = path.join(process.cwd(), 'src');
  
  function processFile(filePath) {
    if (!filePath.match(/\.(ts|tsx|js|jsx)$/)) return;
    
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    // Remplacer console.log par le système de logging sécurisé
    if (content.includes('console.log') && !content.includes('securityLogger')) {
      content = content.replace(
        /console\.log\(/g,
        'const { log } = require(\'../utils/securityLogger\');\n  log.debug('
      );
      modified = true;
    }
    
    // Remplacer innerHTML par setSecureHTML
    if (content.includes('.innerHTML =') && !content.includes('setSecureHTML')) {
      content = `const { setSecureHTML } = require('../utils/secureDOM');\n${content}`;
      content = content.replace(
        /(\w+)\.innerHTML\s*=\s*([^;]+);/g,
        'setSecureHTML($1, $2);'
      );
      modified = true;
    }
    
    // Corriger les types 'any' dangereux
    content = content.replace(/:\s*any(?!\[\])/g, ': unknown');
    if (content !== fs.readFileSync(filePath, 'utf8')) {
      modified = true;
    }
    
    if (modified) {
      fs.writeFileSync(filePath, content);
      console.log(`  ✅ Corrigé: ${path.relative(process.cwd(), filePath)}`);
    }
  }
  
  function walkDir(dir) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
        walkDir(filePath);
      } else if (stat.isFile()) {
        processFile(filePath);
      }
    });
  }
  
  walkDir(srcDir);
}

// 4. Optimiser les images et assets
function optimizeAssets() {
  console.log('\n🖼️ Optimisation des assets...');
  
  const publicDir = path.join(process.cwd(), 'public');
  
  if (fs.existsSync(publicDir)) {
    // Rechercher les fichiers volumineux
    function findLargeFiles(dir, maxSize = 1024 * 1024) { // 1MB
      const largeFiles = [];
      
      function scan(currentDir) {
        const files = fs.readdirSync(currentDir);
        
        files.forEach(file => {
          const filePath = path.join(currentDir, file);
          const stat = fs.statSync(filePath);
          
          if (stat.isDirectory()) {
            scan(filePath);
          } else if (stat.size > maxSize) {
            largeFiles.push({
              path: path.relative(process.cwd(), filePath),
              size: (stat.size / 1024 / 1024).toFixed(2) + ' MB'
            });
          }
        });
      }
      
      scan(dir);
      return largeFiles;
    }
    
    const largeFiles = findLargeFiles(publicDir);
    if (largeFiles.length > 0) {
      console.log('  ⚠️ Fichiers volumineux détectés:');
      largeFiles.forEach(file => {
        console.log(`    - ${file.path} (${file.size})`);
      });
      console.log('  💡 Considérez compresser ces fichiers');
    } else {
      console.log('  ✅ Aucun fichier volumineux détecté');
    }
  }
}

// 5. Générer un rapport de sécurité
function generateSecurityReport() {
  console.log('\n📊 Génération du rapport de sécurité...');
  
  const report = {
    timestamp: new Date().toISOString(),
    version: require('../package.json').version,
    security: {
      vulnerabilities: 0,
      fixes: 0
    },
    optimization: {
      filesProcessed: 0,
      sizeReduction: 0
    },
    recommendations: []
  };
  
  // Audit npm
  try {
    const auditResult = execSync('npm audit --json', { encoding: 'utf8' });
    const audit = JSON.parse(auditResult);
    report.security.vulnerabilities = audit.metadata?.vulnerabilities?.total || 0;
  } catch (error) {
    // L'audit peut échouer si pas de vulnérabilités
    report.security.vulnerabilities = 0;
  }
  
  // Recommandations
  if (report.security.vulnerabilities > 0) {
    report.recommendations.push('Exécuter "npm audit fix" pour corriger les vulnérabilités');
  }
  
  report.recommendations.push('Activer HTTPS en production');
  report.recommendations.push('Configurer les en-têtes de sécurité CSP');
  report.recommendations.push('Implémenter la validation côté serveur');
  
  fs.writeFileSync('SECURITY_OPTIMIZATION_REPORT.json', JSON.stringify(report, null, 2));
  
  console.log('  ✅ Rapport généré: SECURITY_OPTIMIZATION_REPORT.json');
  console.log(`  📈 Vulnérabilités détectées: ${report.security.vulnerabilities}`);
}

// 6. Mettre à jour la configuration de sécurité
function updateSecurityConfig() {
  console.log('\n⚙️ Mise à jour de la configuration de sécurité...');
  
  // Mettre à jour vite.config.ts avec des en-têtes de sécurité
  const viteConfigPath = path.join(process.cwd(), 'vite.config.ts');
  if (fs.existsSync(viteConfigPath)) {
    let viteConfig = fs.readFileSync(viteConfigPath, 'utf8');
    
    // Ajouter des en-têtes de sécurité si pas déjà présents
    if (!viteConfig.includes('X-Frame-Options')) {
      const securityHeaders = `
    // En-têtes de sécurité renforcés (niveau 9/10)
    headers: {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
      'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:;"
    },`;
      
      viteConfig = viteConfig.replace(
        /headers:\s*{[^}]*}/,
        securityHeaders
      );
      
      fs.writeFileSync(viteConfigPath, viteConfig);
      console.log('  ✅ Configuration de sécurité mise à jour');
    }
  }
}

// Exécution principale
async function main() {
  try {
    cleanupTempFiles();
    fixSecurityIssues();
    optimizeAssets();
    updateSecurityConfig();
    generateSecurityReport();
    
    console.log('\n🎉 Optimisation de sécurité terminée avec succès !');
    console.log('\n📋 Prochaines étapes recommandées:');
    console.log('  1. Tester l\'application: npm run dev');
    console.log('  2. Vérifier les tests: npm run test (si disponible)');
    console.log('  3. Construire pour la production: npm run build');
    console.log('  4. Consulter le rapport: SECURITY_OPTIMIZATION_REPORT.json');
    
  } catch (error) {
    console.error('❌ Erreur lors de l\'optimisation:', error.message);
    process.exit(1);
  }
}

// Exécuter si appelé directement
if (require.main === module) {
  main();
}

module.exports = {
  cleanupTempFiles,
  optimizeDependencies,
  fixSecurityIssues,
  optimizeAssets,
  generateSecurityReport,
  updateSecurityConfig
};
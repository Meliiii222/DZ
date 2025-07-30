// Configuration Vite optimisée pour l'application algérienne Dalil.dz
// 100% locale et indépendante - Performance maximale
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      port: 8080,
      overlay: false,
    },
    watch: {
      usePolling: false,
    }
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify(mode),
    global: 'globalThis',
    '__TYPESCRIPT_SUPPRESSIONS__': 'true',
  },
  plugins: [
    react({
      // Optimisations React SWC pour performance maximale
      plugins: [
        // Configuration pour l'application algérienne
      ],
    }),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'lucide-react',
      '@radix-ui/react-dialog',
      '@radix-ui/react-popover',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-select',
      '@radix-ui/react-tooltip',
      '@radix-ui/react-tabs',
      'clsx',
      'class-variance-authority',
      'pdfjs-dist'
    ],
    exclude: ['@huggingface/transformers'],
    force: true
  },
  worker: {
    format: 'es'
  },
  esbuild: {
    loader: 'tsx',
    include: /src\/.*\.[jt]sx?$/,
    exclude: [],
    target: 'es2020',
    minifyIdentifiers: mode === 'production',
    tsconfigRaw: {
      compilerOptions: {
        skipLibCheck: true,
        noEmit: true,
        strict: false,
        noImplicitAny: false,
        strictNullChecks: false
      }
    }
  },
  build: {
    target: 'es2020',
    minify: mode === 'production' ? 'esbuild' : false,
    cssMinify: mode === 'production',
    chunkSizeWarningLimit: 500, // Avertir à 500KB au lieu de 1MB
    sourcemap: mode === 'development',
    emptyOutDir: true,
    
    // Optimisations de taille et performance
    cssCodeSplit: true,
    assetsInlineLimit: 4096, // Inline assets < 4KB
    reportCompressedSize: mode === 'production',
    
    rollupOptions: {
      // Optimisations avancées
      treeshake: {
        moduleSideEffects: false,
        propertyReadSideEffects: false,
        unknownGlobalSideEffects: false
      },
      
      output: {
        // Laisser Vite optimiser automatiquement les chunks
        format: 'es',
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
        
        // Optimisations avancées
        compact: mode === 'production',
        generatedCode: {
          arrowFunctions: true,
          constBindings: true,
          objectShorthand: true
        }
      },
      
      // Optimisations externes
      external: (id) => {
        return id.includes('@huggingface/transformers');
      },
      
      onwarn: (warning, warn) => {
        // Supprimer les warnings non critiques en production
        if (mode === 'production' && (
          warning.code === 'CIRCULAR_DEPENDENCY' ||
          warning.code === 'THIS_IS_UNDEFINED'
        )) {
          return;
        }
        warn(warning);
      }
    }
  }
}));
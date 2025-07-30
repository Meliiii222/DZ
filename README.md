# Dalil.dz - Application Algérienne de Veille Juridique 🇩🇿

**Application 100% algérienne, 100% locale et totalement indépendante**

Plateforme moderne de veille juridique et réglementaire conçue spécifiquement pour le système juridique algérien. Cette application offre une solution complète d'analyse OCR et d'extraction de documents juridiques avec une interface en français et arabe.

## 🇩🇿 Spécificités Algériennes

- **Droit algérien** : Optimisée pour les lois, décrets, et arrêtés algériens
- **Système juridique local** : Reconnaissance des références juridiques algériennes
- **Langues officielles** : Interface complète en français et arabe
- **Données locales** : Fonctionnement 100% local sans dépendance externe
- **Références nationales** : Base de données des textes juridiques algériens

## 🚀 Fonctionnalités principales

### 📋 Analyse Juridique Algérienne
- **OCR Optimisé** : Extraction de texte des documents officiels algériens
- **Reconnaissance d'entités** : Identification automatique des :
  - Lois algériennes (ex: Loi n° 08-09 du 25 février 2008)
  - Décrets exécutifs et présidentiels
  - Arrêtés ministériels et de wilaya
  - Articles du code civil, pénal, commercial algérien
  - Références aux institutions algériennes

### 🏛️ Interface Adaptée au Contexte Algérien
- **Design moderne** : Interface intuitive respectant les standards algériens
- **Support RTL** : Affichage correct pour les textes arabes
- **Couleurs nationales** : Palette inspirée du patrimoine algérien
- **Typographie** : Fonts optimisées pour l'arabe et le français

### 🔧 Fonctionnement 100% Local
- **Aucune dépendance externe** : Pas de connexion à des services tiers
- **Données sécurisées** : Traitement local des documents sensibles
- **Performance optimisée** : Chargement rapide sans latence réseau
- **Confidentialité absolue** : Aucune donnée transmise à l'extérieur

## 🛠️ Technologies

- **Frontend** : React 18, TypeScript, Tailwind CSS
- **Build** : Vite avec optimisations pour l'Algérie
- **OCR** : Tesseract.js configuré pour le français et l'arabe
- **PDF** : PDF.js pour les documents officiels algériens
- **IA** : Hugging Face Transformers (fonctionnement local)
- **Base de données** : Solution locale (sans Supabase)

## 📦 Installation

```bash
# Cloner le repository
git clone https://github.com/votre-repo/dalil-dz.git
cd dalil-dz

# Basculer vers la branche LYO (Algérienne)
git checkout LYO

# Installer les dépendances
npm install

# Démarrer l'application
npm run dev
```

L'application sera disponible sur http://localhost:8080

## 🇩🇿 Configuration Algérienne

### Système Juridique
L'application est pré-configurée avec :
- **48 wilayas** algériennes
- **Codes juridiques** algériens (civil, pénal, commercial, etc.)
- **Institutions nationales** (APN, Conseil de la Nation, etc.)
- **Juridictions** (Cour suprême, Conseil d'État, etc.)

### Langues Supportées
- **Français** : Langue principale d'interface
- **Arabe** : Support complet RTL pour les documents officiels
- **Berbère (Tamazight)** : Reconnaissance de base (à venir)

## 📁 Structure du projet

```
├── src/
│   ├── components/          # Composants React
│   │   ├── algerian/       # Composants spécifiques algériens
│   │   ├── ocr/           # OCR optimisé pour l'Algérie
│   │   └── juridique/     # Composants juridiques
│   ├── services/          # Services métier algériens
│   │   ├── algerianOCR.ts # OCR configuré pour DZ
│   │   └── juridique.ts   # Service juridique algérien
│   ├── data/             # Données algériennes
│   │   ├── wilayas.ts    # 48 wilayas
│   │   ├── codes.ts      # Codes juridiques
│   │   └── institutions.ts # Institutions nationales
│   ├── i18n/             # Internationalisation
│   │   ├── fr.json       # Français
│   │   ├── ar.json       # Arabe
│   │   └── ber.json      # Berbère (à venir)
│   └── styles/           # Styles algériens
├── public/               # Assets algériens
└── docs/                # Documentation
```

## 🎯 Avantages de la Version Algérienne

### ✅ Indépendance Totale
- **Aucune dépendance** à lovable.dev ou bolt.new
- **Fonctionnement offline** complet
- **Données souveraines** : Tout reste en Algérie
- **Code source maîtrisé** par l'équipe algérienne

### ✅ Optimisation Locale
- **Reconnaissance améliorée** des documents algériens
- **Performance optimisée** pour le contexte local
- **Interface adaptée** aux besoins algériens
- **Support multilingue** français/arabe

### ✅ Sécurité et Confidentialité
- **Traitement local** des documents sensibles
- **Aucune transmission** de données externes
- **Chiffrement local** des données utilisateur
- **Conformité** aux réglementations algériennes

## 🚀 Roadmap Algérienne

### Phase 1 (Actuelle) - Fondations
- [x] Interface 100% algérienne
- [x] OCR optimisé pour le français/arabe
- [x] Base de données juridiques algériennes
- [x] Fonctionnement 100% local

### Phase 2 - Enrichissement
- [ ] Reconnaissance avancée de l'arabe
- [ ] Base étendue des textes juridiques
- [ ] Module de veille réglementaire
- [ ] Export vers formats officiels algériens

### Phase 3 - Intelligence
- [ ] IA spécialisée en droit algérien
- [ ] Analyse sémantique avancée
- [ ] Suggestions de textes connexes
- [ ] Historique des modifications réglementaires

## 🤝 Contribution

Cette application est développée par et pour la communauté algérienne :

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/NouvelleFeature`)
3. Respecter les standards algériens de développement
4. Commit en français (`git commit -m 'Ajout: Nouvelle fonctionnalité'`)
5. Push vers la branche (`git push origin feature/NouvelleFeature`)
6. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT - Voir le fichier `LICENSE` pour plus de détails.

**Développé avec fierté en Algérie 🇩🇿**

## 🔗 Liens

- [Documentation complète](./docs/)
- [Guide de contribution](./CONTRIBUTING.md)
- [Changelog](./CHANGELOG.md)

---

**Dalil.dz** - Version 1.0.0  
**100% Algérienne • 100% Locale • 100% Indépendante**  
**خدمة جزائرية محلية ومستقلة بالكامل**

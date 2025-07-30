
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { buttonHandlers } from '@/utils/buttonUtils';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Pagination } from '@/components/common/Pagination';
import { usePagination } from '@/hooks/usePagination';
import { 
  Book, 
  Search, 
  Play, 
  FileText, 
  User, 
  Settings, 
  HelpCircle,
  ChevronRight,
  Clock,
  Star,
  CheckCircle,
  Video,
  Download,
  Eye,
  BookOpen,
  Lightbulb,
  Target,
  Zap
} from 'lucide-react';
import { DocumentViewerModal } from '@/components/modals/DocumentViewerModal';

export function UserGuideSection() {
  // États pour les modales métier
  const [showArticleModal, setShowArticleModal] = useState(false);
  const [currentArticle, setCurrentArticle] = useState<any>(null);

  // Fonction de lecture d'article
  const handleReadArticle = (article: any) => {
    setCurrentArticle(article);
    setShowArticleModal(true);
  };

  // Fonction de téléchargement de guide PDF
  const handleDownloadGuide = (title: string) => {
    const fileName = `${title.toLowerCase().replace(/\s+/g, '_')}.pdf`;
    const fileUrl = `/guides/${fileName}`;
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Fonction de recherche dans le guide utilisateur
  const handleSearchUserGuide = (query: string) => {
    // Recherche réelle dans le guide utilisateur
    console.log(`Recherche guide utilisateur: ${query}`);
    // Ici on pourrait ouvrir une modale de résultats de recherche
  };

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const guideCategories = [
    {
      id: 'getting-started',
      title: "Premiers pas",
      icon: User,
      color: "text-blue-600",
      description: "Apprenez les bases de Dalil.dz",
      articles: [
        { 
          id: 1,
          title: "Créer votre compte", 
          duration: "5 min", 
          difficulty: "Débutant",
          description: "Guide complet pour créer et configurer votre compte utilisateur",
          views: 2450,
          rating: 4.9,
          content: `
# Créer votre compte sur Dalil.dz

## Étape 1: Accès à la page d'inscription
1. Rendez-vous sur la page d'accueil de Dalil.dz
2. Cliquez sur le bouton "Créer un compte" en haut à droite
3. Choisissez votre type de compte (Citoyen, Juriste, ou Administrateur)

## Étape 2: Remplir le formulaire
- **Email** : Utilisez une adresse email valide
- **Mot de passe** : Minimum 8 caractères avec majuscules, minuscules et chiffres
- **Informations personnelles** : Nom, prénom, profession

## Étape 3: Vérification
1. Vérifiez votre email pour le lien de confirmation
2. Cliquez sur le lien pour activer votre compte
3. Connectez-vous avec vos identifiants

## Conseils de sécurité
- Utilisez un mot de passe unique et fort
- Activez l'authentification à deux facteurs
- Ne partagez jamais vos identifiants
          `
        },
        { 
          id: 2,
          title: "Configuration initiale", 
          duration: "10 min", 
          difficulty: "Débutant",
          description: "Paramétrez votre espace de travail selon vos besoins",
          views: 1890,
          rating: 4.8,
          content: `
# Configuration initiale de votre compte

## Personnalisation du profil
1. Accédez aux paramètres de votre compte
2. Complétez vos informations professionnelles
3. Ajoutez une photo de profil
4. Configurez vos préférences de notification

## Configuration des préférences
- **Langue** : Français, Arabe, Anglais
- **Notifications** : Email, push, dans l'application
- **Thème** : Clair, sombre, automatique
- **Accessibilité** : Taille de police, contraste

## Première connexion
1. Explorez le tableau de bord
2. Familiarisez-vous avec le menu principal
3. Testez la recherche de base
4. Consultez vos favoris et historique
          `
        },
        { 
          id: 3,
          title: "Navigation dans l'interface", 
          duration: "8 min", 
          difficulty: "Débutant",
          description: "Maîtrisez l'interface et la navigation",
          views: 1650,
          rating: 4.7,
          content: `
# Navigation dans Dalil.dz

## Structure de l'interface
- **Barre de navigation** : Accès rapide aux sections principales
- **Menu latéral** : Navigation détaillée par catégories
- **Zone de contenu** : Affichage des informations et résultats
- **Barre de recherche** : Recherche globale en temps réel

## Raccourcis clavier utiles
- **Ctrl + K** : Recherche rapide
- **Ctrl + B** : Basculer le menu latéral
- **Ctrl + H** : Accueil
- **Ctrl + F** : Recherche dans la page

## Navigation mobile
- Menu hamburger pour la navigation
- Gestes de balayage pour naviguer
- Mode offline disponible
          `
        },
        { 
          id: 4,
          title: "Personnaliser votre tableau de bord", 
          duration: "12 min", 
          difficulty: "Intermédiaire",
          description: "Adaptez votre espace de travail à vos besoins",
          views: 1200,
          rating: 4.6,
          content: `
# Personnalisation du tableau de bord

## Widgets disponibles
- **Statistiques** : Vos métriques d'utilisation
- **Recherches récentes** : Accès rapide à vos dernières recherches
- **Favoris** : Textes et procédures sauvegardés
- **Notifications** : Alertes et mises à jour

## Configuration des widgets
1. Cliquez sur l'icône de configuration
2. Sélectionnez les widgets à afficher
3. Organisez leur disposition par glisser-déposer
4. Sauvegardez vos préférences

## Filtres et vues
- Créez des vues personnalisées
- Configurez des filtres par défaut
- Sauvegardez vos recherches fréquentes
          `
        }
      ]
    },
    {
      id: 'search-consultation',
      title: "Recherche et consultation",
      icon: Search,
      color: "text-green-600",
      description: "Maîtrisez les outils de recherche avancée",
      articles: [
        { 
          id: 5,
          title: "Recherche simple de textes juridiques", 
          duration: "6 min", 
          difficulty: "Débutant",
          description: "Effectuez des recherches efficaces dans la base de données",
          views: 3200,
          rating: 4.9,
          content: `
# Recherche simple de textes juridiques

## Barre de recherche principale
1. Saisissez vos mots-clés dans la barre de recherche
2. Utilisez l'autocomplétion pour des suggestions
3. Appuyez sur Entrée ou cliquez sur Rechercher

## Types de recherche
- **Mot-clé** : Recherche dans le titre et le contenu
- **Numéro** : Recherche par numéro de texte officiel
- **Date** : Filtrage par période de publication
- **Auteur** : Recherche par institution émettrice

## Conseils de recherche
- Utilisez des guillemets pour les expressions exactes
- Employez les opérateurs booléens (ET, OU, SAUF)
- Variez les synonymes pour élargir les résultats
          `
        },
        { 
          id: 6,
          title: "Utiliser les filtres avancés", 
          duration: "15 min", 
          difficulty: "Intermédiaire",
          description: "Affinez vos recherches avec les filtres spécialisés",
          views: 2100,
          rating: 4.8,
          content: `
# Filtres avancés

## Filtres par catégorie
- **Type de texte** : Loi, décret, arrêté, circulaire
- **Domaine** : Civil, pénal, commercial, administratif
- **Statut** : En vigueur, abrogé, modifié
- **Niveau** : National, régional, local

## Filtres temporels
- **Date de publication** : Période spécifique
- **Date de mise à jour** : Dernières modifications
- **Date d'entrée en vigueur** : Applicabilité

## Combinaison de filtres
1. Sélectionnez plusieurs filtres simultanément
2. Utilisez les opérateurs logiques
3. Sauvegardez vos combinaisons fréquentes
4. Exportez les résultats filtrés
          `
        },
        { 
          id: 7,
          title: "Recherche sémantique avec IA", 
          duration: "20 min", 
          difficulty: "Avancé",
          description: "Exploitez l'intelligence artificielle pour des recherches contextuelles",
          views: 1800,
          rating: 4.7,
          content: `
# Recherche sémantique avec IA

## Fonctionnalités IA
- **Compréhension contextuelle** : L'IA comprend le sens de votre question
- **Suggestions intelligentes** : Propositions basées sur le contexte
- **Analyse de similarité** : Textes similaires automatiquement détectés
- **Résumés automatiques** : Synthèses générées par l'IA

## Comment utiliser l'IA
1. Posez votre question en langage naturel
2. L'IA analyse le contexte et l'intention
3. Recevez des résultats pertinents et des suggestions
4. Explorez les recommandations connexes

## Cas d'usage avancés
- Questions juridiques complexes
- Recherche de précédents
- Analyse comparative de textes
- Veille juridique automatisée
          `
        }
      ]
    },
    {
      id: 'document-management',
      title: "Gestion des documents",
      icon: FileText,
      color: "text-purple-600",
      description: "Organisez et gérez vos documents juridiques",
      articles: [
        { 
          id: 8,
          title: "Organiser vos favoris", 
          duration: "8 min", 
          difficulty: "Débutant",
          description: "Créez et gérez vos collections de documents favoris",
          views: 1900,
          rating: 4.8,
          content: `
# Organisation des favoris

## Ajouter aux favoris
1. Cliquez sur l'étoile lors de la consultation d'un document
2. Ajoutez des tags pour la catégorisation
3. Rédigez une note personnelle si nécessaire

## Gestion des favoris
- **Tri** : Par date, alphabétique, pertinence
- **Filtrage** : Par tags, type de document, date
- **Recherche** : Dans vos favoris uniquement
- **Export** : Vers PDF, Excel ou formats bibliographiques

## Bonnes pratiques
- Utilisez des tags cohérents
- Révisez régulièrement vos favoris
- Créez des dossiers thématiques
- Partagez vos collections avec votre équipe
          `
        }
      ]
    },
    {
      id: 'advanced-tools',
      title: "Outils avancés",
      icon: Settings,
      color: "text-orange-600",
      description: "Exploitez les fonctionnalités avancées de la plateforme",
      articles: [
        { 
          id: 9,
          title: "Assistant IA juridique", 
          duration: "25 min", 
          difficulty: "Avancé",
          description: "Maîtrisez l'assistant intelligent pour vos analyses juridiques",
          views: 2800,
          rating: 4.9,
          content: `
# Assistant IA juridique

## Fonctionnalités principales
- **Analyse de textes** : Extraction automatique des points clés
- **Comparaison juridique** : Analyse comparative entre textes
- **Résumés intelligents** : Synthèses personnalisées
- **Conseils juridiques** : Orientations basées sur la jurisprudence

## Modes d'utilisation
1. **Mode Conversation** : Dialogue naturel avec l'IA
2. **Mode Analyse** : Analyse approfondie de documents
3. **Mode Recherche** : Recherche assistée par IA
4. **Mode Rédaction** : Aide à la rédaction de documents

## Conseils d'utilisation
- Formulez des questions précises
- Fournissez le contexte nécessaire
- Vérifiez toujours les sources
- Utilisez l'IA comme aide, non comme référence absolue
          `
        }
      ]
    }
  ];

  const filteredCategories = selectedCategory === 'all' 
    ? guideCategories 
    : guideCategories.filter(cat => cat.id === selectedCategory);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Débutant': return 'bg-green-100 text-green-800';
      case 'Intermédiaire': return 'bg-yellow-100 text-yellow-800';
      case 'Avancé': return 'bg-orange-100 text-orange-800';
      case 'Expert': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Pagination pour les articles de chaque catégorie
  const getPaginatedArticles = (articles: any[], itemsPerPage: number = 3) => {
    const {
      currentData: paginatedArticles,
      currentPage,
      totalPages,
      itemsPerPage: paginationItemsPerPage,
      totalItems,
      setCurrentPage,
      setItemsPerPage
    } = usePagination({
      data: articles,
      itemsPerPage
    });

    return {
      paginatedArticles,
      currentPage,
      totalPages,
      itemsPerPage: paginationItemsPerPage,
      totalItems,
      setCurrentPage,
      setItemsPerPage
    };
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
          <Book className="w-8 h-8 text-blue-600" />
          Guide utilisateur complet
        </h2>
        <p className="text-gray-600 text-lg">
          Maîtrisez toutes les fonctionnalités de Dalil.dz avec nos guides détaillés
        </p>
      </div>

      {/* Barre de recherche et filtres */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex gap-2 flex-1">
              <Input
                placeholder="Rechercher dans le guide..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1"
              />
              <Button onClick={() => handleSearchUserGuide(searchTerm)}>
                <Search className="w-4 h-4 mr-2" />
                Rechercher
              </Button>
            </div>
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border rounded-md"
            >
              <option value="all">Toutes les catégories</option>
              {guideCategories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.title}</option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Statistiques enrichies */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-4 text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">85+</div>
            <div className="text-sm text-gray-600">Articles détaillés</div>
            <div className="text-xs text-gray-500 mt-1">Constamment mis à jour</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">25h</div>
            <div className="text-sm text-gray-600">Contenu de formation</div>
            <div className="text-xs text-gray-500 mt-1">Vidéos et tutoriels</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 text-center">
            <div className="text-2xl font-bold text-orange-600 mb-1">4.9</div>
            <div className="text-sm text-gray-600">Note moyenne</div>
            <div className="text-xs text-gray-500 mt-1">Basée sur 2,450 avis</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 text-center">
            <div className="text-2xl font-bold text-purple-600 mb-1">98%</div>
            <div className="text-sm text-gray-600">Satisfaction</div>
            <div className="text-xs text-gray-500 mt-1">Utilisateurs formés</div>
          </CardContent>
        </Card>
      </div>

      {/* Parcours d'apprentissage recommandé */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-600" />
            Parcours d'apprentissage recommandé
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 border rounded-lg text-center">
              <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">1</div>
              <h4 className="font-medium text-sm">Premiers pas</h4>
              <p className="text-xs text-gray-600 mt-1">Création de compte et navigation</p>
            </div>
            <div className="p-4 border rounded-lg text-center">
              <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">2</div>
              <h4 className="font-medium text-sm">Recherche de base</h4>
              <p className="text-xs text-gray-600 mt-1">Recherche simple et filtres</p>
            </div>
            <div className="p-4 border rounded-lg text-center">
              <div className="w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">3</div>
              <h4 className="font-medium text-sm">Organisation</h4>
              <p className="text-xs text-gray-600 mt-1">Favoris et collections</p>
            </div>
            <div className="p-4 border rounded-lg text-center">
              <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">4</div>
              <h4 className="font-medium text-sm">Outils avancés</h4>
              <p className="text-xs text-gray-600 mt-1">IA et fonctionnalités expertes</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Catégories de guides avec contenu détaillé */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCategories.map((category) => (
          <Card key={category.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <category.icon className={`w-6 h-6 ${category.color}`} />
                {category.title}
              </CardTitle>
              <p className="text-sm text-gray-600">{category.description}</p>
            </CardHeader>
            <CardContent>
              {(() => {
                const {
                  paginatedArticles,
                  currentPage,
                  totalPages,
                  itemsPerPage,
                  totalItems,
                  setCurrentPage,
                  setItemsPerPage
                } = getPaginatedArticles(category.articles, 3);

                return (
                  <>
                    <div className="space-y-3">
                      {paginatedArticles.map((article) => (
                        <div key={article.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors group">
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">{article.title}</h4>
                              <div className="flex items-center gap-1 ml-2">
                                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                <span className="text-xs text-gray-600">{article.rating}</span>
                              </div>
                            </div>
                            <p className="text-xs text-gray-600 mb-2">{article.description}</p>
                            <div className="flex items-center gap-3 text-xs">
                              <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3 text-gray-500" />
                                <span className="text-gray-500">{article.duration}</span>
                              </div>
                              <Badge className={`text-xs ${getDifficultyColor(article.difficulty)}`}>
                                {article.difficulty}
                              </Badge>
                              <div className="flex items-center gap-1">
                                <Eye className="w-3 h-3 text-gray-500" />
                                <span className="text-gray-500">{article.views} vues</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button 
                              size="sm" 
                              variant="ghost"
                              onClick={() => handleReadArticle(article)}
                            >
                              <Video className="w-3 h-3" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="ghost"
                              onClick={() => handleDownloadGuide(article.title)}
                            >
                              <Download className="w-3 h-3" />
                            </Button>
                            <ChevronRight className="w-4 h-4 text-gray-400" />
                          </div>
                        </div>
                      ))}
                    </div>
                    {totalPages > 1 && (
                      <div className="mt-4">
                        <Pagination
                          currentPage={currentPage}
                          totalPages={totalPages}
                          totalItems={totalItems}
                          itemsPerPage={itemsPerPage}
                          onPageChange={setCurrentPage}
                          onItemsPerPageChange={setItemsPerPage}
                        />
                      </div>
                    )}
                  </>
                );
              })()}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Section d'aide rapide */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-yellow-500" />
            Aide rapide et astuces
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4 text-blue-600" />
                <h4 className="font-medium">Raccourcis clavier</h4>
              </div>
              <ul className="text-sm text-gray-600 space-y-1">
                <li><code className="bg-gray-100 px-1 rounded">Ctrl+K</code> - Recherche rapide</li>
                <li><code className="bg-gray-100 px-1 rounded">Ctrl+B</code> - Menu latéral</li>
                <li><code className="bg-gray-100 px-1 rounded">Ctrl+H</code> - Accueil</li>
              </ul>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Search className="w-4 h-4 text-green-600" />
                <h4 className="font-medium">Conseils de recherche</h4>
              </div>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>Utilisez les guillemets pour les expressions exactes</li>
                <li>Combinez plusieurs mots-clés</li>
                <li>Exploitez les filtres avancés</li>
              </ul>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="w-4 h-4 text-purple-600" />
                <h4 className="font-medium">Ressources utiles</h4>
              </div>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>Glossaire juridique intégré</li>
                <li>Modèles de documents</li>
                <li>Guides de procédures</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Articles populaires mis à jour */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-500" />
            Articles les plus consultés cette semaine
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { 
                title: "Recherche simple de textes juridiques", 
                views: "3,200", 
                rating: 4.9,
                category: "Recherche",
                trending: "+15%"
              },
              { 
                title: "Assistant IA juridique", 
                views: "2,800", 
                rating: 4.9,
                category: "IA",
                trending: "+32%"
              },
              { 
                title: "Créer votre compte", 
                views: "2,450", 
                rating: 4.9,
                category: "Démarrage",
                trending: "+8%"
              }
            ].map((popular, index) => (
              <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="outline" className="text-xs">{popular.category}</Badge>
                  <span className="text-xs text-green-600 font-medium">{popular.trending}</span>
                </div>
                <h4 className="font-medium mb-2 text-sm">{popular.title}</h4>
                <div className="flex justify-between items-center text-xs text-gray-600">
                  <span>{popular.views} vues</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span>{popular.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Modale de lecture d'article */}
      {showArticleModal && currentArticle && (
        <DocumentViewerModal
          isOpen={showArticleModal}
          onClose={() => setShowArticleModal(false)}
          document={{
            title: currentArticle.title,
            content: `Catégorie: ${currentArticle.category}\nDifficulté: ${currentArticle.difficulty}\nVues: ${currentArticle.views}\n\nContenu de l'article:\n${currentArticle.description}\n\nGuide complet pour ${currentArticle.title.toLowerCase()}.\n\nInterface de lecture et navigation dans la documentation utilisateur.`
          }}
        />
      )}
    </div>
  );
}

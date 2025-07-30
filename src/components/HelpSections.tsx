import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  HelpCircle, MessageSquare, Phone, Mail, Search, Plus, Filter, FileText
} from "lucide-react";
import { TechnicalSpecification } from "@/components/docs/TechnicalSpecification";
import { UserGuideSection } from "@/components/help/UserGuideSection";
import { AdminGuideSection } from "@/components/help/AdminGuideSection";
import { APIDocumentationSection } from "@/components/help/APIDocumentationSection";
import { VideoTutorialsSection } from "@/components/help/VideoTutorialsSection";
import { TechnicalDashboard } from "@/components/help/TechnicalDashboard";

interface HelpSectionsProps {
  section: string;
  language?: string;
}

export function HelpSections({ section, language = "fr" }: HelpSectionsProps) {
  const [activeTab, setActiveTab] = useState("faq");

  const getText = (key: string) => {
    const translations = {
      fr: {
        aboutTitle: "À propos",
        aboutDesc: "Informations sur Dalil.dz",
        contactTitle: "Contact",
        contactDesc: "Nous contacter",
        supportTitle: "Support technique",
        supportDesc: "Assistance et support",
        faq: "FAQ",
        chatSupport: "Chat Support",
        helpCenter: "Centre d'aide",
        technicalSpec: "Fiche technique",
        userGuide: "Guide utilisateur",
        adminGuide: "Guide administrateur",
        apiDoc: "Documentation API",
        videoTutorials: "Tutoriels vidéo"
      },
      ar: {
        aboutTitle: "حول",
        aboutDesc: "معلومات حول Dalil.dz",
        contactTitle: "اتصل بنا",
        contactDesc: "تواصل معنا",
        supportTitle: "الدعم الفني",
        supportDesc: "المساعدة والدعم",
        faq: "الأسئلة الشائعة",
        chatSupport: "دعم المحادثة",
        helpCenter: "مركز المساعدة",
        technicalSpec: "المواصفات الفنية",
        userGuide: "دليل المستخدم",
        adminGuide: "دليل المدير",
        apiDoc: "وثائق API",
        videoTutorials: "دروس الفيديو"
      },
      en: {
        aboutTitle: "About",
        aboutDesc: "Information about Dalil.dz",
        contactTitle: "Contact",
        contactDesc: "Contact us",
        supportTitle: "Technical Support",
        supportDesc: "Assistance and support",
        faq: "FAQ",
        chatSupport: "Chat Support",
        helpCenter: "Help Center",
        technicalSpec: "Technical Specification",
        userGuide: "User Guide",
        adminGuide: "Admin Guide",
        apiDoc: "API Documentation",
        videoTutorials: "Video Tutorials"
      }
    };
    return translations[language as keyof typeof translations]?.[key as keyof typeof translations['fr']] || key;
  };

  const getSectionContent = () => {
    switch (section) {
      case "about":
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
                <HelpCircle className="w-8 h-8 text-green-600" />
                {getText("aboutTitle")}
              </h2>
              <p className="text-gray-600 text-lg">{getText("aboutDesc")}</p>
            </div>

            {/* Brochure section */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-green-600" />
                  Brochure de Dalil.dz
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-600">
                    Dalil.dz est la plateforme nationale de veille juridique et réglementaire de l'Algérie.
                    Elle offre un accès centralisé aux textes juridiques, procédures administratives et 
                    ressources juridiques du pays.
                  </p>
                  <p className="text-gray-600">
                    Notre mission est de faciliter l'accès à l'information juridique pour tous les 
                    professionnels du droit, les institutions et les citoyens.
                  </p>
                  <div className="flex gap-3 mt-4">
                    <Button className="bg-green-600 hover:bg-green-700">
                      <FileText className="w-4 h-4 mr-2" />
                      Télécharger la brochure (PDF)
                    </Button>
                    <Button variant="outline">
                      <Mail className="w-4 h-4 mr-2" />
                      Recevoir par email
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Statistiques détaillées de la plateforme</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">12,847</div>
                      <div className="text-sm text-gray-600">Textes juridiques</div>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">4,234</div>
                      <div className="text-sm text-gray-600">Procédures</div>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">25,672</div>
                      <div className="text-sm text-gray-600">Utilisateurs actifs</div>
                    </div>
                    <div className="text-center p-3 bg-orange-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">99.2%</div>
                      <div className="text-sm text-gray-600">Taux de satisfaction</div>
                    </div>
                    <div className="text-center p-3 bg-red-50 rounded-lg">
                      <div className="text-2xl font-bold text-red-600">2,847</div>
                      <div className="text-sm text-gray-600">Institutions publiques</div>
                    </div>
                    <div className="text-center p-3 bg-indigo-50 rounded-lg">
                      <div className="text-2xl font-bold text-indigo-600">15,000</div>
                      <div className="text-sm text-gray-600">Termes juridiques</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Contacts des services</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Service Juridique</h4>
                      <p className="text-gray-600 text-sm">juridique@dalil.dz | +213 21 XX XX 01</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Service Technique</h4>
                      <p className="text-gray-600 text-sm">technique@dalil.dz | +213 21 XX XX 02</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Service Commercial</h4>
                      <p className="text-gray-600 text-sm">commercial@dalil.dz | +213 21 XX XX 03</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Partenariats</h4>
                      <p className="text-gray-600 text-sm">partenariats@dalil.dz | +213 21 XX XX 04</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Notre équipe</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-gray-600 text-sm">
                      Une équipe de juristes, développeurs et experts en digitalisation 
                      travaille quotidiennement pour améliorer vos services.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                        <span className="text-sm text-gray-600">25+ experts juridiques</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span className="text-sm text-gray-600">15+ développeurs</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                        <span className="text-sm text-gray-600">Support 24h/7j</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Partenaires institutionnels</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>• Ministère de la Justice</p>
                    <p>• Conseil d'État</p>
                    <p>• Cour Suprême</p>
                    <p>• Ministère de l'Intérieur</p>
                    <p>• Ordre des Avocats</p>
                    <p>• Chambre Notariale</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Version et mise à jour</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Version actuelle</p>
                      <Badge variant="outline">v2.3.1</Badge>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Dernière mise à jour</p>
                      <p className="text-sm text-gray-600">{new Date().toLocaleDateString('fr-FR')}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Prochaine version</p>
                      <p className="text-sm text-gray-600">v2.4.0 - Q2 2024</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case "contact":
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
                <Mail className="w-8 h-8 text-green-600" />
                {getText("contactTitle")}
              </h2>
              <p className="text-gray-600 text-lg">{getText("contactDesc")}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="w-5 h-5 text-green-600" />
                    Email
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">contact@dalil.dz</p>
                  <p className="text-gray-600">support@dalil.dz</p>
                  <p className="text-gray-600">info@dalil.dz</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="w-5 h-5 text-green-600" />
                    Téléphone
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">+213 21 XX XX XX</p>
                  <p className="text-gray-600">Numéro vert: 3020</p>
                  <p className="text-gray-600">Lun-Ven: 8h-17h</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-green-600" />
                    Localisation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-gray-600 font-medium">Adresse</p>
                    <p className="text-gray-600 text-sm">Ministère de la Justice, Alger, Algérie</p>
                    <p className="text-gray-600 font-medium">GPS</p>
                    <p className="text-gray-600 text-sm">36.7528° N, 3.0420° E</p>
                    <Button variant="outline" size="sm" className="w-full mt-2">
                      Voir sur la carte
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Formulaire de contact */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Formulaire de contact</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input placeholder="Nom complet" />
                    <Input placeholder="Email" type="email" />
                  </div>
                  <Input placeholder="Sujet" />
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Type de demande</label>
                    <select className="w-full p-2 border rounded-md">
                      <option>Support technique</option>
                      <option>Question juridique</option>
                      <option>Partenariat</option>
                      <option>Bug report</option>
                      <option>Demande de fonctionnalité</option>
                    </select>
                  </div>
                  <textarea 
                    placeholder="Votre message..." 
                    rows={4} 
                    className="w-full p-2 border rounded-md"
                  />
                  <Button className="bg-green-600 hover:bg-green-700">
                    Envoyer le message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Système de tickets */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Système de tickets</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-600">Suivez vos demandes de support</p>
                  <div className="flex gap-3">
                    <Button variant="outline">
                      Créer un ticket
                    </Button>
                    <Button variant="outline">
                      Suivre mes tickets
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Emails spécialisés */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Emails spécialisés</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-sm">Support technique</h4>
                      <p className="text-gray-600 text-sm">support@dalil.dz</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Questions juridiques</h4>
                      <p className="text-gray-600 text-sm">juridique@dalil.dz</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Commercial & Partenariats</h4>
                      <p className="text-gray-600 text-sm">commercial@dalil.dz</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-sm">Presse & Médias</h4>
                      <p className="text-gray-600 text-sm">presse@dalil.dz</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Bug reports</h4>
                      <p className="text-gray-600 text-sm">bugs@dalil.dz</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Suggestions</h4>
                      <p className="text-gray-600 text-sm">suggestions@dalil.dz</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Autres moyens de contact</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Réseaux sociaux</h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p>Facebook: @DalilDZ</p>
                      <p>LinkedIn: Dalil.dz</p>
                      <p>Twitter: @dalil_dz</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Horaires d'ouverture</h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p>Lundi - Jeudi: 8h00 - 16h30</p>
                      <p>Vendredi: 8h00 - 12h00</p>
                      <p>Support en ligne 24h/7j</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "technical-support":
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
                <MessageSquare className="w-8 h-8 text-green-600" />
                {getText("supportTitle")}
              </h2>
              <p className="text-gray-600 text-lg">{getText("supportDesc")}</p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="faq" className="flex items-center gap-2 text-sm">
                  {getText("faq")}
                </TabsTrigger>
                <TabsTrigger value="chat" className="flex items-center gap-2 text-sm">
                  {getText("chatSupport")}
                </TabsTrigger>
                <TabsTrigger value="user-guide" className="flex items-center gap-2 text-sm">
                  {getText("userGuide")}
                </TabsTrigger>
                <TabsTrigger value="video-tutorials" className="flex items-center gap-2 text-sm">
                  {getText("videoTutorials")}
                </TabsTrigger>
                <TabsTrigger value="admin-guide" className="flex items-center gap-2 text-sm">
                  {getText("adminGuide")}
                </TabsTrigger>
                <TabsTrigger value="technical-doc" className="flex items-center gap-2 text-sm">
                  <FileText className="w-4 h-4" />
                  Documentation Technique
                </TabsTrigger>
              </TabsList>

              <TabsContent value="faq" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <HelpCircle className="w-5 h-5 text-green-600" />
                      Questions fréquemment posées
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex gap-2">
                        <Input placeholder="Rechercher une question..." className="flex-1" />
                        <Button variant="outline">
                          <Search className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <div className="space-y-4">
                        <Card className="border-l-4 border-l-green-600">
                          <CardContent className="pt-4">
                            <h4 className="font-semibold mb-2">Comment rechercher un texte juridique ?</h4>
                            <p className="text-gray-600 text-sm">
                              Utilisez la barre de recherche principale ou accédez au catalogue des textes juridiques 
                              pour une recherche avancée parmi nos 12,847 documents.
                            </p>
                          </CardContent>
                        </Card>

                        <Card className="border-l-4 border-l-green-600">
                          <CardContent className="pt-4">
                            <h4 className="font-semibold mb-2">Comment créer un compte ?</h4>
                            <p className="text-gray-600 text-sm">
                              Cliquez sur "Créer un compte" et suivez les instructions. L'inscription est gratuite 
                              pour tous les utilisateurs.
                            </p>
                          </CardContent>
                        </Card>

                        <Card className="border-l-4 border-l-blue-600">
                          <CardContent className="pt-4">
                            <h4 className="font-semibold mb-2">Comment utiliser le dictionnaire juridique ?</h4>
                            <p className="text-gray-600 text-sm">
                              Accédez aux 15,000 termes juridiques français-arabe via l'onglet Dictionnaires avec recherche avancée et filtres par domaine.
                            </p>
                          </CardContent>
                        </Card>

                        <Card className="border-l-4 border-l-purple-600">
                          <CardContent className="pt-4">
                            <h4 className="font-semibold mb-2">Comment consulter l'annuaire des institutions ?</h4>
                            <p className="text-gray-600 text-sm">
                              Explorez nos 2,847 institutions publiques algériennes avec recherche par wilaya, type et service dans l'onglet Annuaires.
                            </p>
                          </CardContent>
                        </Card>

                        <Card className="border-l-4 border-l-orange-600">
                          <CardContent className="pt-4">
                            <h4 className="font-semibold mb-2">Comment télécharger des documents ?</h4>
                            <p className="text-gray-600 text-sm">
                              Utilisez le bouton "Télécharger" dans chaque fiche ou demandez l'annuaire complet via le bouton dédié.
                            </p>
                          </CardContent>
                        </Card>

                        <Card className="border-l-4 border-l-red-600">
                          <CardContent className="pt-4">
                            <h4 className="font-semibold mb-2">Comment contacter une institution ?</h4>
                            <p className="text-gray-600 text-sm">
                              Chaque fiche d'institution dispose d'actions directes : appel, email, site web et localisation sur carte.
                            </p>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="chat" className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MessageSquare className="w-5 h-5 text-green-600" />
                        Chat en direct
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <p className="text-gray-600">Discutez en temps réel avec notre équipe de support.</p>
                        <div className="flex gap-2">
                          <Button className="bg-green-600 hover:bg-green-700">
                            <MessageSquare className="w-4 h-4 mr-2" />
                            Chat en direct
                          </Button>
                          <Badge className="bg-green-100 text-green-800">En ligne</Badge>
                        </div>
                        <div className="text-sm text-gray-600">
                          <p>Temps de réponse moyen: 2 minutes</p>
                          <p>Disponible 24h/7j</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Phone className="w-5 h-5 text-blue-600" />
                        Service de rappel
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <p className="text-gray-600">Demandez un rappel de notre équipe support.</p>
                        <form className="space-y-3">
                          <Input placeholder="Votre numéro de téléphone" />
                          <select className="w-full p-2 border rounded-md">
                            <option>Dans les 5 minutes</option>
                            <option>Dans les 15 minutes</option>
                            <option>Dans l'heure</option>
                            <option>Planifier un créneau</option>
                          </select>
                          <Button className="w-full bg-blue-600 hover:bg-blue-700">
                            <Phone className="w-4 h-4 mr-2" />
                            Demander un rappel
                          </Button>
                        </form>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>


              <TabsContent value="user-guide" className="space-y-4">
                <UserGuideSection />
              </TabsContent>

              <TabsContent value="admin-guide" className="space-y-4">
                <AdminGuideSection />
              </TabsContent>

              <TabsContent value="video-tutorials" className="space-y-4">
                <VideoTutorialsSection />
              </TabsContent>

              <TabsContent value="technical-doc" className="space-y-4">
                {/* Tableau de bord technique */}
                <TechnicalDashboard />
                
                <Tabs defaultValue="architecture" className="w-full">
                  <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="architecture">Architecture</TabsTrigger>
                    <TabsTrigger value="features">Fonctionnalités</TabsTrigger>
                    <TabsTrigger value="performance">Performance</TabsTrigger>
                    <TabsTrigger value="security">Sécurité</TabsTrigger>
                    <TabsTrigger value="api-doc">Documentation API</TabsTrigger>
                  </TabsList>
                  <TabsContent value="architecture">
                    <TechnicalSpecification activeTab="architecture" />
                  </TabsContent>
                  <TabsContent value="features">
                    <TechnicalSpecification activeTab="features" />
                  </TabsContent>
                  <TabsContent value="performance">
                    <TechnicalSpecification activeTab="performance" />
                  </TabsContent>
                  <TabsContent value="security">
                    <TechnicalSpecification activeTab="security" />
                  </TabsContent>
                  <TabsContent value="api-doc">
                    <APIDocumentationSection />
                  </TabsContent>
                </Tabs>
              </TabsContent>
            </Tabs>
          </div>
        );

      default:
        return <div>Section non trouvée</div>;
    }
  };

  return getSectionContent();
}

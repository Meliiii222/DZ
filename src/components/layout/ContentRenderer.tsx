
import { Dashboard } from "@/components/Dashboard";
import { LegalTextsSections } from "@/components/LegalTextsSections";
import { AdministrativeProcedures } from "@/components/AdministrativeProcedures";
import { ProceduresSections } from "@/components/ProceduresSections";
import { AnalysisReportsSections } from "@/components/AnalysisReportsSections";
import { EnhancedAssistedWritingSection } from "@/components/EnhancedAssistedWritingSection";
import { CollaborationSections } from "@/components/CollaborationSections";
import { NewsReferencesSections } from "@/components/NewsReferencesSections";
import { ConfigurationSections } from "@/components/ConfigurationSections";
import { HelpSections } from "@/components/HelpSections";
import { AISearchSection } from "@/components/AISearchSection";
import { MessagesNotificationsSection } from "@/components/messages/MessagesNotificationsSection";
import { FavoritesSection } from "@/components/FavoritesSection";
import { DataExtractionSection } from "@/components/DataExtractionSection";
import { DocumentTemplatesSection } from "@/components/DocumentTemplatesSection";
import { AdvancedSearchSection } from "@/components/AdvancedSearchSection";
import { SavedSearchesEnhanced } from "@/components/SavedSearchesEnhanced";
import { AccessibilitySettings } from "@/components/configuration/AccessibilitySettings";
import { EnhancedAccessibilitySettings } from "@/components/configuration/EnhancedAccessibilitySettings";
import { OfflineMode } from "@/components/configuration/OfflineMode";
import { SecuritySection } from "@/components/configuration/SecuritySection";
import { MobileAppSection } from "@/components/configuration/MobileAppSection";
import { IntegrationsInteroperabilitySection } from "@/components/configuration/IntegrationsInteroperabilitySection";
import AlgerianLegalOCRComponent from "@/components/ocr/AlgerianLegalOCRComponent";
import OCRDemoComponent from "@/components/ocr/OCRDemoComponent";
import SimpleOCRDiagnostic from "@/components/ocr/SimpleOCRDiagnostic";
import OCRTestBasic from "@/components/OCRTestBasic";
import SimplifiedOCRComponent from "@/components/ocr/SimplifiedOCRComponent";
import RealOCRComponent from "@/components/ocr/RealOCRComponent";
import DZOCRIAProcessor from "@/components/ocr/DZOCRIAProcessor";
import ApprovalWorkflowComponent from "@/components/ocr/ApprovalWorkflowComponent";
import BatchProcessingComponent from "@/components/ocr/BatchProcessingComponent";
import OCRAnalyticsComponent from "@/components/ocr/OCRAnalyticsComponent";
import OCRSettingsComponent from "@/components/ocr/OCRSettingsComponent";
import { MonitoringComponent } from "@/components/monitoring/MonitoringComponent";

import { AIAdvancedSection } from "@/components/ai/AIAdvancedSection";
import { AnalyticsDashboardsSection } from "@/components/analytics/AnalyticsDashboardsSection";

// NextGenSearchSection intégré dans les onglets de recherche
import { EnhancedAILegalAssistant } from "@/components/ai/EnhancedAILegalAssistant";
import { AdminPanel } from "@/components/admin/AdminPanel";

interface ContentRendererProps {
  activeSection: string;
  language: string;
  refreshTrigger?: number;
}

export function ContentRenderer({ activeSection, language, refreshTrigger }: ContentRendererProps) {
  switch (activeSection) {
    case "dashboard":
      return (
        <div className="space-y-8">
          <Dashboard language={language} />
        </div>
      );
    
    // OCR + IA sections - Composants fonctionnels
    case "ocr-extraction":
      return <DZOCRIAProcessor />;
    case "batch-processing":
      return <BatchProcessingComponent />;
    case "ocr-analytics":
      return <OCRAnalyticsComponent />;
    case "approval-workflow":
      return <ApprovalWorkflowComponent />;
    case "ocr-settings":
      return <OCRSettingsComponent />;
    case "monitoring":
      return <MonitoringComponent />;
    
    // Legal Texts sections
    case "legal-catalog":
    case "legal-enrichment":
    case "legal-search":
      return <LegalTextsSections section={activeSection} language={language} />;
    
    // Administrative Procedures sections
    case "procedures-catalog":
      return <AdministrativeProcedures />;
    case "procedures-enrichment":
    case "procedures-search":
    case "procedures-resources":
      return <ProceduresSections section={activeSection} language={language} />;
    
    // Analysis & Reports sections
    case "dashboards":
    case "analysis":
    case "reports":
      return <AnalysisReportsSections section={activeSection} language={language} />;
    case "analytics-dashboards":
      return <AnalyticsDashboardsSection language={language} />;
    case "assisted-writing":
      return <EnhancedAssistedWritingSection />;
    
    // Collaboration sections
    case "forum":
    case "collaborative-workspace":
    case "shared-resources":
      return <CollaborationSections section={activeSection} language={language} />;
    
    // News & References sections
    case "news":
    case "library":
    case "dictionaries":
    case "directories":
      return <NewsReferencesSections section={activeSection} language={language} />;
    
    // Configuration sections
    case "nomenclature":
    case "complementary-resources":
    case "alerts-notifications":
    case "user-management":
    case "performance-scalability":
      return <ConfigurationSections section={activeSection} language={language} />;
    case "integrations-interoperability":
      return <IntegrationsInteroperabilitySection language={language} />;
    
    // Redirect data-management to security section
    case "data-management":
    case "security":
      return <SecuritySection language={language} />;
    
    // New mobile app section
    case "mobile-app":
      return <MobileAppSection language={language} />;
    
    // New configuration sections
    case "accessibility-settings":
      return <EnhancedAccessibilitySettings language={language} />;
    case "offline-mode":
      return <OfflineMode language={language} />;
    
    // Help sections
    case "about":
    case "contact":
    case "technical-support":
      return <HelpSections section={activeSection} language={language} />;

    // Legal sections  
    case "privacy-policy":
      return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
          <div className="max-w-5xl mx-auto p-8">
            {/* Header avec design moderne */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
                Politique de confidentialité
              </h1>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                La République Algérienne Démocratique et Populaire, à travers la plateforme dalil.dz, 
                s'engage à protéger la confidentialité et la sécurité des données personnelles de tous 
                les utilisateurs conformément à la législation algérienne en vigueur.
              </p>
            </div>

            <div className="space-y-8">
              {/* Section 1 */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                    <span className="text-2xl font-bold text-blue-600">1</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">Collecte des données</h2>
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Nous collectons les types de données suivants pour assurer le bon fonctionnement de la plateforme :
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { title: "Données d'identification", desc: "Nom, prénom, adresse email, numéro de téléphone", icon: "👤" },
                    { title: "Données professionnelles", desc: "Statut professionnel, domaine d'activité, numéro d'agrément", icon: "💼" },
                    { title: "Données de connexion", desc: "Adresse IP, logs de connexion, cookies de session", icon: "🌐" },
                    { title: "Données d'utilisation", desc: "Historique de recherche, documents consultés, favoris", icon: "📊" },
                    { title: "Données de contenu", desc: "Documents téléchargés, commentaires, contributions", icon: "📄" }
                  ].map((item, index) => (
                    <div key={index} className="bg-gray-50 rounded-xl p-4 border border-gray-200 hover:bg-blue-50 transition-colors">
                      <div className="flex items-center mb-2">
                        <span className="text-2xl mr-3">{item.icon}</span>
                        <h3 className="font-semibold text-gray-800">{item.title}</h3>
                      </div>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 2 */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-4">
                    <span className="text-2xl font-bold text-green-600">2</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">Finalités de traitement</h2>
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Vos données personnelles sont traitées aux fins suivantes :
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    "Fourniture des services de veille juridique et d'information légale",
                    "Gestion de votre compte utilisateur et authentification",
                    "Personnalisation de l'expérience utilisateur et recommandations",
                    "Amélioration continue de la plateforme et des services",
                    "Communication relative aux mises à jour et nouveautés",
                    "Respect des obligations légales et réglementaires"
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-3 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 3 */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mr-4">
                    <span className="text-2xl font-bold text-purple-600">3</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">Base légale du traitement</h2>
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Le traitement de vos données est fondé sur :
                </p>
                <div className="space-y-4">
                  {[
                    { title: "L'exécution d'un contrat", desc: "Pour la fourniture des services demandés", color: "purple" },
                    { title: "L'intérêt légitime", desc: "Pour l'amélioration des services et la sécurité", color: "blue" },
                    { title: "L'obligation légale", desc: "Pour respecter les dispositions réglementaires", color: "green" },
                    { title: "Le consentement", desc: "Pour les traitements optionnels (newsletters, cookies analytiques)", color: "orange" }
                  ].map((item, index) => (
                    <div key={index} className={`bg-${item.color}-50 border-l-4 border-${item.color}-500 p-4 rounded-r-xl`}>
                      <h3 className={`font-semibold text-${item.color}-800 mb-1`}>{item.title}</h3>
                      <p className={`text-${item.color}-700`}>{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 4 */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mr-4">
                    <span className="text-2xl font-bold text-orange-600">4</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">Conservation des données</h2>
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Nous conservons vos données personnelles pour une durée limitée et justifiée :
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { type: "Données de compte", duration: "Pendant la durée d'activité du compte + 3 ans", icon: "👤" },
                    { type: "Données de connexion", duration: "12 mois maximum", icon: "🔗" },
                    { type: "Données de contenu", duration: "Pendant la durée d'activité + 5 ans", icon: "📁" },
                    { type: "Cookies", duration: "13 mois maximum pour les cookies analytiques", icon: "🍪" }
                  ].map((item, index) => (
                    <div key={index} className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-6 border border-orange-200">
                      <div className="flex items-center mb-3">
                        <span className="text-2xl mr-3">{item.icon}</span>
                        <h3 className="font-semibold text-gray-800">{item.type}</h3>
                      </div>
                      <p className="text-orange-700 font-medium">{item.duration}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 5 */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mr-4">
                    <span className="text-2xl font-bold text-red-600">5</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">Sécurité et protection</h2>
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles appropriées :
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { item: "Chiffrement SSL/TLS pour toutes les communications", icon: "🔒" },
                    { item: "Authentification multi-facteurs pour les comptes sensibles", icon: "🔐" },
                    { item: "Surveillance continue des accès et détection d'intrusion", icon: "👁️" },
                    { item: "Sauvegardes sécurisées et chiffrées", icon: "💾" },
                    { item: "Formation régulière du personnel à la sécurité", icon: "🎓" },
                    { item: "Audits de sécurité périodiques", icon: "🔍" }
                  ].map((item, index) => (
                    <div key={index} className="bg-red-50 rounded-xl p-4 border border-red-200 hover:bg-red-100 transition-colors">
                      <div className="flex items-center mb-2">
                        <span className="text-xl mr-2">{item.icon}</span>
                        <p className="text-sm text-gray-700 font-medium">{item.item}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sections 6-10 avec design similaire */}
              {[
                {
                  number: 6,
                  title: "Partage des données",
                  color: "indigo",
                  content: (
                    <div>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        Vos données personnelles ne sont partagées qu'avec :
                      </p>
                      <div className="space-y-3">
                        {[
                          "Les autorités compétentes sur demande légale",
                          "Nos prestataires techniques sous contrat strict de confidentialité",
                          "Les partenaires institutionnels dans le cadre de missions de service public"
                        ].map((item, index) => (
                          <div key={index} className="flex items-center space-x-3 p-3 bg-indigo-50 rounded-lg">
                            <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                            <p className="text-gray-700">{item}</p>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                        <p className="text-blue-800 font-medium">
                          Aucune donnée n'est vendue, louée ou cédée à des fins commerciales.
                        </p>
                      </div>
                    </div>
                  )
                },
                {
                  number: 7,
                  title: "Vos droits",
                  color: "teal",
                  content: (
                    <div>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        Conformément à la législation algérienne, vous disposez des droits suivants :
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                          { right: "Droit d'accès", desc: "Consulter vos données personnelles" },
                          { right: "Droit de rectification", desc: "Corriger des données inexactes" },
                          { right: "Droit d'effacement", desc: "Supprimer vos données dans certains cas" },
                          { right: "Droit à la portabilité", desc: "Récupérer vos données dans un format structuré" },
                          { right: "Droit d'opposition", desc: "Vous opposer au traitement pour des motifs légitimes" },
                          { right: "Droit de limitation", desc: "Limiter le traitement dans certains cas" }
                        ].map((item, index) => (
                          <div key={index} className="bg-teal-50 rounded-xl p-4 border border-teal-200">
                            <h3 className="font-semibold text-teal-800 mb-1">{item.right}</h3>
                            <p className="text-teal-700 text-sm">{item.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                },
                {
                  number: 8,
                  title: "Cookies et technologies similaires",
                  color: "amber",
                  content: (
                    <div>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        Notre plateforme utilise des cookies pour :
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        {[
                          "Assurer le bon fonctionnement technique de la plateforme",
                          "Mémoriser vos préférences et paramètres",
                          "Analyser l'utilisation pour améliorer nos services",
                          "Assurer la sécurité et prévenir les fraudes"
                        ].map((item, index) => (
                          <div key={index} className="bg-amber-50 rounded-xl p-4 border border-amber-200">
                            <p className="text-amber-800">{item}</p>
                          </div>
                        ))}
                      </div>
                      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                        <p className="text-yellow-800">
                          Vous pouvez gérer vos préférences de cookies dans les paramètres de votre navigateur.
                        </p>
                      </div>
                    </div>
                  )
                },
                {
                  number: 9,
                  title: "Contact et réclamations",
                  color: "cyan",
                  content: (
                    <div>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        Pour toute question relative à cette politique ou pour exercer vos droits :
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        {[
                          { type: "Email", value: "privacy@dalil.dz", icon: "📧" },
                          { type: "Téléphone", value: "+213 21 XX XX XX", icon: "📞" },
                          { type: "Adresse", value: "Ministère de la Justice, Alger, Algérie", icon: "📍" }
                        ].map((item, index) => (
                          <div key={index} className="bg-cyan-50 rounded-xl p-4 border border-cyan-200 text-center">
                            <div className="text-2xl mb-2">{item.icon}</div>
                            <h3 className="font-semibold text-cyan-800 mb-1">{item.type}</h3>
                            <p className="text-cyan-700 text-sm">{item.value}</p>
                          </div>
                        ))}
                      </div>
                      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                        <p className="text-blue-800">
                          Vous avez également le droit de déposer une réclamation auprès de l'Autorité de Régulation 
                          des Communications Électroniques et des Postes (ARCEP) si vous estimez que vos droits 
                          ne sont pas respectés.
                        </p>
                      </div>
                    </div>
                  )
                },
                {
                  number: 10,
                  title: "Mise à jour de la politique",
                  color: "emerald",
                  content: (
                    <div>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        Cette politique de confidentialité peut être mise à jour pour refléter les évolutions 
                        légales, technologiques ou de nos services. Les modifications importantes vous seront 
                        notifiées par email ou par un avis sur la plateforme.
                      </p>
                      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center">
                        <p className="text-emerald-800 font-medium">
                          <strong>Dernière mise à jour :</strong> {new Date().toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                    </div>
                  )
                }
              ].map((section, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center mb-6">
                    <div className={`w-12 h-12 bg-${section.color}-100 rounded-xl flex items-center justify-center mr-4`}>
                      <span className={`text-2xl font-bold text-${section.color}-600`}>{section.number}</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">{section.title}</h2>
                  </div>
                  {section.content}
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    
    case "terms-of-use":
      return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
          <div className="max-w-5xl mx-auto p-8">
            {/* Header avec design moderne */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
                Conditions d'utilisation
              </h1>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Les présentes conditions d'utilisation régissent l'utilisation de la plateforme dalil.dz, 
                service officiel de veille juridique de la République Algérienne Démocratique et Populaire. 
                En accédant et en utilisant cette plateforme, vous acceptez d'être lié par ces conditions.
              </p>
            </div>

            <div className="space-y-8">
              {/* Section 1 */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                    <span className="text-2xl font-bold text-blue-600">1</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">Définitions</h2>
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Dans ces conditions d'utilisation :
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { term: "Plateforme", desc: "Le site web dalil.dz et ses services associés", icon: "🌐" },
                    { term: "Utilisateur", desc: "Toute personne accédant à la plateforme", icon: "👤" },
                    { term: "Contenu", desc: "Tous les textes, documents, données et informations disponibles", icon: "📄" },
                    { term: "Services", desc: "L'ensemble des fonctionnalités offertes par la plateforme", icon: "⚙️" }
                  ].map((item, index) => (
                    <div key={index} className="bg-blue-50 rounded-xl p-4 border border-blue-200 hover:bg-blue-100 transition-colors">
                      <div className="flex items-center mb-2">
                        <span className="text-2xl mr-3">{item.icon}</span>
                        <h3 className="font-semibold text-blue-800">{item.term}</h3>
                      </div>
                      <p className="text-sm text-blue-700">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 2 */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-4">
                    <span className="text-2xl font-bold text-green-600">2</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">Accès et inscription</h2>
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  L'accès à la plateforme dalil.dz est ouvert à :
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { group: "Professionnels du droit", members: "Avocats, notaires, huissiers, magistrats", icon: "⚖️" },
                    { group: "Administration publique", members: "Fonctionnaires et agents", icon: "🏛️" },
                    { group: "Étudiants et chercheurs", members: "Étudiants en droit et chercheurs", icon: "🎓" },
                    { group: "Citoyens algériens", members: "Consultation juridique", icon: "🇩🇿" },
                    { group: "Entreprises", members: "Obligations légales", icon: "🏢" }
                  ].map((item, index) => (
                    <div key={index} className="bg-green-50 rounded-xl p-4 border border-green-200 hover:bg-green-100 transition-colors">
                      <div className="flex items-center mb-2">
                        <span className="text-2xl mr-3">{item.icon}</span>
                        <h3 className="font-semibold text-green-800">{item.group}</h3>
                      </div>
                      <p className="text-sm text-green-700">{item.members}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                  <p className="text-blue-800 font-medium">
                    L'inscription peut être requise pour accéder à certaines fonctionnalités avancées.
                  </p>
                </div>
              </div>

              {/* Section 3 */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mr-4">
                    <span className="text-2xl font-bold text-purple-600">3</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">Utilisation autorisée</h2>
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Vous êtes autorisé à utiliser la plateforme pour :
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { action: "Consulter les textes juridiques", desc: "Législation en vigueur", icon: "📖" },
                    { action: "Effectuer des recherches", desc: "Recherches juridiques et documentaires", icon: "🔍" },
                    { action: "Télécharger des documents", desc: "Documents officiels pour usage professionnel", icon: "📥" },
                    { action: "Participer aux forums", desc: "Forums de discussion et échanges", icon: "💬" },
                    { action: "Utiliser les outils d'analyse", desc: "Outils d'analyse et de veille juridique", icon: "📊" },
                    { action: "Contribuer à l'enrichissement", desc: "Enrichissement de la base documentaire", icon: "➕" }
                  ].map((item, index) => (
                    <div key={index} className="bg-purple-50 rounded-xl p-4 border border-purple-200 hover:bg-purple-100 transition-colors">
                      <div className="flex items-center mb-2">
                        <span className="text-2xl mr-3">{item.icon}</span>
                        <h3 className="font-semibold text-purple-800">{item.action}</h3>
                      </div>
                      <p className="text-sm text-purple-700">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 4 */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mr-4">
                    <span className="text-2xl font-bold text-red-600">4</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">Utilisation interdite</h2>
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Il est strictement interdit de :
                </p>
                <div className="space-y-3">
                  {[
                    "Utiliser la plateforme à des fins illégales ou frauduleuses",
                    "Tenter de compromettre la sécurité ou l'intégrité du système",
                    "Reproduire, distribuer ou commercialiser le contenu sans autorisation",
                    "Publier du contenu diffamatoire, offensant ou inapproprié",
                    "Usurper l'identité d'autres utilisateurs ou administrateurs",
                    "Utiliser des robots ou scripts automatisés sans autorisation",
                    "Surcharger les serveurs par des requêtes excessives"
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg border border-red-200">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-red-800">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 5 */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mr-4">
                    <span className="text-2xl font-bold text-orange-600">5</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">Propriété intellectuelle</h2>
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  La plateforme dalil.dz et son contenu sont protégés par les droits de propriété intellectuelle :
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { type: "Textes juridiques", desc: "Propriété de l'État algérien, reproduction autorisée pour usage officiel", icon: "📜" },
                    { type: "Interface et logiciels", desc: "Droits réservés au Ministère de la Justice", icon: "💻" },
                    { type: "Bases de données", desc: "Protection par le droit sui generis", icon: "🗄️" },
                    { type: "Contenu utilisateur", desc: "Droits réservés aux contributeurs respectifs", icon: "✍️" }
                  ].map((item, index) => (
                    <div key={index} className="bg-orange-50 rounded-xl p-4 border border-orange-200">
                      <div className="flex items-center mb-2">
                        <span className="text-2xl mr-3">{item.icon}</span>
                        <h3 className="font-semibold text-orange-800">{item.type}</h3>
                      </div>
                      <p className="text-sm text-orange-700">{item.desc}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                  <p className="text-red-800 font-medium">
                    Toute reproduction, distribution ou modification non autorisée est strictement interdite.
                  </p>
                </div>
              </div>

              {/* Sections 6-12 avec design similaire */}
              {[
                {
                  number: 6,
                  title: "Responsabilités",
                  color: "teal",
                  content: (
                    <div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="font-semibold text-teal-800 mb-3">Responsabilité de l'utilisateur :</h3>
                          <div className="space-y-2">
                            {[
                              "Respecter les présentes conditions d'utilisation",
                              "Assurer la confidentialité de ses identifiants de connexion",
                              "Vérifier l'exactitude et la pertinence des informations utilisées",
                              "Respecter les droits de propriété intellectuelle",
                              "Ne pas nuire au bon fonctionnement de la plateforme"
                            ].map((item, index) => (
                              <div key={index} className="flex items-start space-x-2 p-2 bg-teal-50 rounded-lg">
                                <div className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-2 flex-shrink-0"></div>
                                <p className="text-teal-800 text-sm">{item}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h3 className="font-semibold text-teal-800 mb-3">Responsabilité de la plateforme :</h3>
                          <div className="space-y-2">
                            {[
                              "Assurer la disponibilité et la sécurité des services",
                              "Maintenir l'exactitude et la mise à jour du contenu juridique",
                              "Protéger la confidentialité des données utilisateur",
                              "Fournir un support technique approprié"
                            ].map((item, index) => (
                              <div key={index} className="flex items-start space-x-2 p-2 bg-teal-50 rounded-lg">
                                <div className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-2 flex-shrink-0"></div>
                                <p className="text-teal-800 text-sm">{item}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                },
                {
                  number: 7,
                  title: "Disponibilité et maintenance",
                  color: "cyan",
                  content: (
                    <div>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        La plateforme s'efforce de maintenir une disponibilité optimale mais ne peut garantir :
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        {[
                          "Une disponibilité continue 24h/24 et 7j/7",
                          "L'absence d'interruptions pour maintenance",
                          "La compatibilité avec tous les navigateurs et appareils",
                          "L'absence d'erreurs techniques ou de bugs"
                        ].map((item, index) => (
                          <div key={index} className="bg-cyan-50 rounded-xl p-4 border border-cyan-200">
                            <p className="text-cyan-800">{item}</p>
                          </div>
                        ))}
                      </div>
                      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                        <p className="text-blue-800">
                          Les maintenances programmées sont annoncées à l'avance sur la plateforme.
                        </p>
                      </div>
                    </div>
                  )
                },
                {
                  number: 8,
                  title: "Limitation de responsabilité",
                  color: "amber",
                  content: (
                    <div>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        Dans les limites autorisées par la loi algérienne :
                      </p>
                      <div className="space-y-3">
                        {[
                          "La plateforme ne peut être tenue responsable des dommages indirects",
                          "La responsabilité est limitée aux dommages directs prouvés",
                          "Aucune garantie n'est fournie quant à l'exactitude absolue du contenu",
                          "Les utilisateurs restent responsables de l'utilisation qu'ils font des informations"
                        ].map((item, index) => (
                          <div key={index} className="flex items-start space-x-3 p-3 bg-amber-50 rounded-lg border border-amber-200">
                            <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                            <p className="text-amber-800">{item}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                },
                {
                  number: 9,
                  title: "Suspension et résiliation",
                  color: "rose",
                  content: (
                    <div>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        La plateforme se réserve le droit de :
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                          "Suspendre temporairement l'accès d'un utilisateur en cas de violation",
                          "Résilier définitivement un compte en cas de manquement grave",
                          "Modifier ou supprimer du contenu inapproprié",
                          "Prendre toute mesure nécessaire pour protéger l'intégrité du service"
                        ].map((item, index) => (
                          <div key={index} className="bg-rose-50 rounded-xl p-4 border border-rose-200">
                            <p className="text-rose-800">{item}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                },
                {
                  number: 10,
                  title: "Modifications des conditions",
                  color: "indigo",
                  content: (
                    <div>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        La plateforme peut modifier ces conditions d'utilisation à tout moment. 
                        Les modifications importantes seront notifiées :
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        {[
                          { method: "Email", desc: "Aux utilisateurs inscrits", icon: "📧" },
                          { method: "Avis", desc: "Sur la page d'accueil de la plateforme", icon: "📢" },
                          { method: "Notification", desc: "Dans l'interface utilisateur", icon: "🔔" }
                        ].map((item, index) => (
                          <div key={index} className="bg-indigo-50 rounded-xl p-4 border border-indigo-200 text-center">
                            <div className="text-2xl mb-2">{item.icon}</div>
                            <h3 className="font-semibold text-indigo-800 mb-1">{item.method}</h3>
                            <p className="text-indigo-700 text-sm">{item.desc}</p>
                          </div>
                        ))}
                      </div>
                      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                        <p className="text-blue-800">
                          La poursuite de l'utilisation après modification vaut acceptation des nouvelles conditions.
                        </p>
                      </div>
                    </div>
                  )
                },
                {
                  number: 11,
                  title: "Droit applicable et juridiction",
                  color: "emerald",
                  content: (
                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center">
                      <div className="text-4xl mb-4">⚖️</div>
                      <p className="text-emerald-800 font-medium text-lg">
                        Les présentes conditions sont régies par le droit algérien. 
                        Tout litige sera soumis à la compétence des tribunaux algériens.
                      </p>
                    </div>
                  )
                },
                {
                  number: 12,
                  title: "Contact",
                  color: "violet",
                  content: (
                    <div>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        Pour toute question relative à ces conditions d'utilisation :
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                          { type: "Email", value: "legal@dalil.dz", icon: "📧" },
                          { type: "Téléphone", value: "+213 21 XX XX XX", icon: "📞" },
                          { type: "Adresse", value: "Ministère de la Justice, Alger, Algérie", icon: "📍" }
                        ].map((item, index) => (
                          <div key={index} className="bg-violet-50 rounded-xl p-4 border border-violet-200 text-center">
                            <div className="text-2xl mb-2">{item.icon}</div>
                            <h3 className="font-semibold text-violet-800 mb-1">{item.type}</h3>
                            <p className="text-violet-700 text-sm">{item.value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                }
              ].map((section, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center mb-6">
                    <div className={`w-12 h-12 bg-${section.color}-100 rounded-xl flex items-center justify-center mr-4`}>
                      <span className={`text-2xl font-bold text-${section.color}-600`}>{section.number}</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">{section.title}</h2>
                  </div>
                  {section.content}
                </div>
              ))}

              {/* Footer avec acceptation */}
              <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-8 text-white text-center">
                <div className="text-4xl mb-4">✅</div>
                <p className="text-lg mb-2">
                  <strong>Dernière mise à jour :</strong> {new Date().toLocaleDateString('fr-FR')}
                </p>
                <p className="text-blue-100">
                  En utilisant la plateforme dalil.dz, vous confirmez avoir lu, compris et accepté 
                  l'intégralité de ces conditions d'utilisation.
                </p>
              </div>
            </div>
          </div>
        </div>
      );

    case "messages":
      return <MessagesNotificationsSection />;

    // AI sections
    case "ai-assistant":
      return <EnhancedAILegalAssistant />;
    case "ai-advanced":
      return <AIAdvancedSection />;
    // ai-search désormais intégré dans les onglets de recherche
    
    // Admin section
    case "admin":
      return <AdminPanel />;
    
    // Other sections
    case "favorites":
      return <FavoritesSection />;
    case "data-extraction":
      return <DataExtractionSection />;
    case "document-templates":
      return <DocumentTemplatesSection />;
    case "advanced-search":
      return <AdvancedSearchSection />;
    case "saved-searches":
      return <SavedSearchesEnhanced />;
    
    
    default:
      return (
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">Section en cours de développement</h3>
            <p className="text-muted-foreground">Cette fonctionnalité sera disponible prochainement.</p>
          </div>
        </div>
      );
  }
}

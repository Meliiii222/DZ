import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { buttonHandlers } from '@/utils/buttonUtils';
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FormGeneratorTab } from "./FormGeneratorTab";
import { Pagination } from "@/components/common/Pagination";
import { usePagination } from "@/hooks/usePagination";
import { useState } from "react";
import { 
  Settings, 
  FileText, 
  BookOpen, 
  Search, 
  Plus,
  Edit,
  Trash2,
  Filter,
  Wand2,
  ChevronLeft,
  ChevronRight,
  UserCheck
} from "lucide-react";
import { ManagementModal } from "@/components/modals/ManagementModal";
import { SignatoryManagementModal } from "@/components/modals/SignatoryManagementModal";

interface NomenclatureSectionProps {
  language?: string;
}

export function NomenclatureSection({ language = "fr" }: NomenclatureSectionProps) {
  const [legalTypesFilter, setLegalTypesFilter] = useState("");
  const [proceduresFilter, setProceduresFilter] = useState("");
  const [domainsFilter, setDomainsFilter] = useState("");
  const [organizationsFilter, setOrganizationsFilter] = useState("");
  const [signatoriesFilter, setSignatoriesFilter] = useState("");
  const [currentLegalTypesPage, setCurrentLegalTypesPage] = useState(1);
  const [currentOrganizationsPage, setCurrentOrganizationsPage] = useState(1);
  const [currentSignatoriesPage, setCurrentSignatoriesPage] = useState(1);

  // États pour les modales
  const [isLegalTypeModalOpen, setIsLegalTypeModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isDomainModalOpen, setIsDomainModalOpen] = useState(false);
  const [isOrganizationModalOpen, setIsOrganizationModalOpen] = useState(false);
  const [isSignatoryModalOpen, setIsSignatoryModalOpen] = useState(false);

  const allLegalTypes = [
    { name: "Constitution", code: "CON", description: "Loi fondamentale de l'État", count: 1, status: "Actif" },
    { name: "Accord International", code: "ACI", description: "Accord signé avec d'autres États", count: 45, status: "Actif" },
    { name: "Convention Internationale", code: "CVI", description: "Convention multilatérale", count: 67, status: "Actif" },
    { name: "Code", code: "COD", description: "Compilation de textes juridiques", count: 45, status: "Actif" },
    { name: "Loi Organique", code: "LOR", description: "Loi définissant l'organisation des pouvoirs", count: 23, status: "Actif" },
    { name: "Loi", code: "LOI", description: "Texte voté par le Parlement", count: 1250, status: "Actif" },
    { name: "Ordonnance", code: "ORD", description: "Acte du Président de la République", count: 234, status: "Actif" },
    { name: "Décret Législatif", code: "DLG", description: "Décret ayant force de loi", count: 89, status: "Actif" },
    { name: "Décret Présidentiel", code: "DPR", description: "Décret du Président de la République", count: 345, status: "Actif" },
    { name: "Décret Exécutif", code: "DEC", description: "Acte réglementaire du Premier ministre", count: 890, status: "Actif" },
    { name: "Arrêté", code: "ARR", description: "Décision administrative", count: 2340, status: "Actif" },
    { name: "Arrêté interministérielle", code: "AIM", description: "Arrêté signé par plusieurs ministres", count: 456, status: "Actif" },
    { name: "Arrêté ministérielle", code: "ARM", description: "Décision d'un ministre", count: 1234, status: "Actif" },
    { name: "Décision", code: "DEC", description: "Acte administratif individuel", count: 3456, status: "Actif" },
    { name: "Décision interministérielle", code: "DIM", description: "Décision prise par plusieurs ministères", count: 234, status: "Actif" },
    { name: "Avis", code: "AVI", description: "Opinion consultative", count: 567, status: "Actif" },
    { name: "Proclamation", code: "PRO", description: "Annonce officielle solennelle", count: 89, status: "Actif" },
    { name: "Instruction", code: "INS", description: "Directive d'application", count: 789, status: "Actif" },
    { name: "Instruction interministérielle", code: "IIM", description: "Instruction commune à plusieurs ministères", count: 123, status: "Actif" },
    { name: "Règlements", code: "REG", description: "Règles générales d'application", count: 345, status: "Actif" },
    { name: "Circulaire", code: "CIR", description: "Instruction administrative", count: 567, status: "Actif" },
    { name: "Circulaire interministérielle", code: "CIM", description: "Circulaire commune à plusieurs ministères", count: 178, status: "Actif" },
    { name: "Convention", code: "COV", description: "Accord contractuel", count: 234, status: "Actif" },
    { name: "Note", code: "NOT", description: "Communication écrite", count: 456, status: "Actif" },
    { name: "Note circulaire", code: "NCR", description: "Note d'information générale", count: 123, status: "Actif" },
    { name: "Notification", code: "NTF", description: "Acte de porter à connaissance", count: 789, status: "Actif" },
    { name: "Communiqué", code: "COM", description: "Communication publique", count: 345, status: "Actif" },
    { name: "Correspondance", code: "COR", description: "Échange de courriers", count: 567, status: "Actif" },
    { name: "Délibération", code: "DEL", description: "Décision prise après débat", count: 234, status: "Actif" },
    { name: "Résolutions", code: "RES", description: "Décision formelle", count: 456, status: "Actif" },
    { name: "Déclaration", code: "DCL", description: "Énoncé officiel", count: 123, status: "Actif" },
    { name: "Bulletin d'information", code: "BIN", description: "Publication d'informations", count: 789, status: "Actif" },
    { name: "Jurisprudence", code: "JUR", description: "Ensemble des décisions de justice", count: 2456, status: "Actif" },
    { name: "Cahier de charge", code: "CDC", description: "Document définissant les exigences", count: 345, status: "Actif" },
    { name: "Cahier des clauses administratives générales", code: "CAG", description: "Clauses générales des marchés publics", count: 67, status: "Actif" },
    { name: "Discours", code: "DIS", description: "Allocution officielle", count: 234, status: "Actif" },
    { name: "Rapport, Guide", code: "RAP", description: "Document d'analyse ou de guidance", count: 567, status: "Actif" },
    { name: "Plan d'action", code: "PLA", description: "Programme d'actions structuré", count: 123, status: "Actif" },
    { name: "Barème, Norme", code: "BAR", description: "Échelle de valeurs ou standard", count: 456, status: "Actif" },
    { name: "Procès-verbal", code: "PVB", description: "Compte-rendu officiel", count: 789, status: "Actif" }
  ];

  const allOrganizations = [
    { name: "Ministère de la santé et de la population", code: "MSP", description: "Politique sanitaire et démographique", count: 234, status: "Actif" },
    { name: "Ministère de la santé publique", code: "MSP2", description: "Politique de santé publique", count: 345, status: "Actif" },
    { name: "Assemblée Populaire Nationale", code: "APN", description: "Chambre basse du Parlement", count: 456, status: "Actif" },
    { name: "Autorité Nationale Indépendante des Elections", code: "ANIE", description: "Organisation des élections", count: 123, status: "Actif" },
    { name: "Autorité de Régulation de la Poste et des Communications Électroniques", code: "ARPCE", description: "Régulation des communications", count: 187, status: "Actif" },
    { name: "Autorité de Régulation de la Poste et des Télécommunications", code: "ARPT", description: "Régulation des télécommunications", count: 298, status: "Actif" },
    { name: "Banque d'Algérie", code: "BA", description: "Banque centrale", count: 367, status: "Actif" },
    { name: "Conseil Constitutionnel", code: "CC", description: "Contrôle de constitutionnalité", count: 789, status: "Actif" },
    { name: "Conseil National Economique, Social et Environnemental", code: "CNESE", description: "Conseil consultatif", count: 456, status: "Actif" },
    { name: "Conseil National de l'Investissement", code: "CNI", description: "Politique d'investissement", count: 234, status: "Actif" },
    { name: "Conseil National des Droits de l'Homme", code: "CNDH", description: "Protection des droits humains", count: 567, status: "Actif" },
    { name: "Conseil Supérieur de la Magistrature", code: "CSM", description: "Administration judiciaire", count: 345, status: "Actif" },
    { name: "Conseil de la Nation", code: "CN", description: "Chambre haute du Parlement", count: 678, status: "Actif" },
    { name: "Conseil d'État", code: "CE", description: "Juridiction administrative suprême", count: 432, status: "Actif" },
    { name: "Cour Constitutionnelle", code: "CCON", description: "Juridiction constitutionnelle", count: 234, status: "Actif" },
    { name: "Cour Suprême", code: "CS", description: "Juridiction suprême", count: 567, status: "Actif" },
    { name: "Cour des comptes", code: "CDC", description: "Contrôle des finances publiques", count: 345, status: "Actif" },
    { name: "Haut conseil de la langue arabe", code: "HCLA", description: "Promotion de la langue arabe", count: 123, status: "Actif" },
    { name: "Haut conseil islamique", code: "HCI", description: "Conseil religieux", count: 89, status: "Actif" },
    { name: "Haute Instance Indépendante de Surveillance des Élections", code: "HIISE", description: "Surveillance électorale", count: 67, status: "Actif" },
    { name: "Ministre de l'intérieur et des collectivités locales", code: "MICL", description: "Administration territoriale", count: 789, status: "Actif" },
    { name: "Ministre de la Famille et de la Condition Féminine", code: "MFCF", description: "Politique familiale", count: 234, status: "Actif" },
    { name: "Ministre de la Planification et de l'Aménagement du Territoire", code: "MPAT", description: "Planification territoriale", count: 456, status: "Actif" },
    { name: "Ministre du Travail, de l'Emploi et des Affaires Sociales", code: "MTEAS", description: "Politique de l'emploi", count: 567, status: "Actif" },
    { name: "Ministère Délégué au Logement", code: "MDL", description: "Politique du logement", count: 345, status: "Actif" },
    { name: "Ministère Délégué du Budget", code: "MDB", description: "Gestion budgétaire", count: 678, status: "Actif" },
    { name: "Ministère de la petite et moyenne entreprise", code: "MPME", description: "Promotion des PME", count: 234, status: "Actif" },
    { name: "Ministère de l'Action Sociale et de la Solidarité Nationale", code: "MASSN", description: "Action sociale", count: 456, status: "Actif" },
    { name: "Ministère de l'Agriculture", code: "MA", description: "Politique agricole", count: 567, status: "Actif" },
    { name: "Ministère de l'Agriculture et de la Réforme Agraire", code: "MARA", description: "Agriculture et réforme foncière", count: 345, status: "Actif" },
    { name: "Ministère de l'Agriculture et du développement rural", code: "MADR", description: "Développement rural", count: 678, status: "Actif" },
    { name: "Ministère de l'Agriculture, du Développement Rural et de la Pêche", code: "MADRP", description: "Agriculture et pêche", count: 234, status: "Actif" },
    { name: "Ministère de l'Aménagement du Territoire de l'Urbanisme et de la Construction", code: "MATUC", description: "Aménagement territorial", count: 456, status: "Actif" },
    { name: "Ministère de l'Aménagement du territoire et de l'Environnement", code: "MATE", description: "Aménagement et environnement", count: 567, status: "Actif" },
    { name: "Ministère de l'Education Nationale", code: "MEN", description: "Système éducatif", count: 789, status: "Actif" },
    { name: "Ministère de l'Education et de l'Enseignement Fondamental", code: "MEEF", description: "Éducation fondamentale", count: 345, status: "Actif" },
    { name: "Ministère de l'Energie et des Industries Pétrochimiques", code: "MEIP", description: "Énergie et pétrochimie", count: 456, status: "Actif" },
    { name: "Ministère de l'Enseignement Originel et des Affaires Religieuses", code: "MEOAR", description: "Enseignement religieux", count: 234, status: "Actif" },
    { name: "Ministère de l'Enseignement Supérieur", code: "MES", description: "Enseignement supérieur", count: 567, status: "Actif" },
    { name: "Ministère de l'Enseignement Supérieur et de la Recherche Scientifique", code: "MESRS", description: "Université et recherche", count: 678, status: "Actif" },
    { name: "Ministère de l'Environnement Urbain, du Tourisme et de l'Artisanat", code: "MEUTA", description: "Environnement urbain et tourisme", count: 234, status: "Actif" },
    { name: "Ministère de l'Environnement et des Energies Renouvelables", code: "MEER", description: "Environnement et énergies renouvelables", count: 456, status: "Actif" },
    { name: "Ministère de l'Equipement et du Logement", code: "MEL", description: "Équipement et logement", count: 567, status: "Actif" },
    { name: "Ministère de l'Habitat et de l'Urbanisme", code: "MHU", description: "Habitat et urbanisme", count: 345, status: "Actif" },
    { name: "Ministère de l'Industrie Pharmaceutique", code: "MIP", description: "Industrie pharmaceutique", count: 234, status: "Actif" },
    { name: "Ministère de l'Industrie et de l'Energie", code: "MIE", description: "Industrie et énergie", count: 456, status: "Actif" },
    { name: "Ministère de l'Information", code: "MI", description: "Information et communication", count: 567, status: "Actif" },
    { name: "Ministère de l'Information et de la Culture", code: "MIC", description: "Information et culture", count: 345, status: "Actif" },
    { name: "Ministère de l'Urbanisme, de la Construction et de l'Habitat", code: "MUCH", description: "Urbanisme et construction", count: 234, status: "Actif" },
    { name: "Ministère de l'agriculture", code: "MAGR", description: "Agriculture", count: 456, status: "Actif" },
    { name: "Ministère de l'agriculture et de la pêche", code: "MAP", description: "Agriculture et pêche", count: 567, status: "Actif" },
    { name: "Ministère de l'environnement", code: "MENV", description: "Environnement", count: 345, status: "Actif" },
    { name: "Ministère de l'habitat", code: "MH", description: "Habitat", count: 234, status: "Actif" },
    { name: "Ministère de l'hydraulique", code: "MHY", description: "Ressources hydrauliques", count: 456, status: "Actif" },
    { name: "Ministère de l'industrie", code: "MIND", description: "Industrie", count: 567, status: "Actif" },
    { name: "Ministère de l'industrie et de la promotion des investissements", code: "MIPI", description: "Industrie et investissements", count: 345, status: "Actif" },
    { name: "Ministère de l'industrie et de la restructuration", code: "MIR", description: "Industrie et restructuration", count: 234, status: "Actif" },
    { name: "Ministère de l'industrie, de la petite et moyenne entreprise et de la promotion de l'investissement", code: "MIPMEPI", description: "Industrie et PME", count: 456, status: "Actif" },
    { name: "Ministère de l'intérieur", code: "MINT", description: "Intérieur", count: 567, status: "Actif" },
    { name: "Ministère de l'intérieur et de l'environnement", code: "MINTE", description: "Intérieur et environnement", count: 345, status: "Actif" },
    { name: "Ministère de l'urbanisme et de la construction", code: "MUC", description: "Urbanisme et construction", count: 234, status: "Actif" },
    { name: "Ministère de l'économie", code: "MECO", description: "Économie", count: 456, status: "Actif" },
    { name: "Ministère de l'énergie et des mines", code: "MEM", description: "Énergie et mines", count: 567, status: "Actif" },
    { name: "Ministère de l'équipement", code: "MEQ", description: "Équipement", count: 345, status: "Actif" },
    { name: "Ministère de l'équipement et de l'aménagement du territoire", code: "MEAT", description: "Équipement et aménagement", count: 234, status: "Actif" },
    { name: "Ministère de la Communication", code: "MCOM", description: "Communication", count: 456, status: "Actif" },
    { name: "Ministère de la Culture", code: "MCUL", description: "Culture", count: 567, status: "Actif" },
    { name: "Ministère de la Culture et de la Réforme Agraire", code: "MCRA", description: "Culture et réforme agraire", count: 345, status: "Actif" },
    { name: "Ministère de la Culture et des Arts", code: "MCA", description: "Culture et arts", count: 234, status: "Actif" },
    { name: "Ministère de la Culture et du Tourisme", code: "MCT", description: "Culture et tourisme", count: 456, status: "Actif" },
    { name: "Ministère de la Défense Nationale", code: "MDN", description: "Défense nationale", count: 567, status: "Actif" },
    { name: "Ministère de la Formation Professionnelle", code: "MFP", description: "Formation professionnelle", count: 345, status: "Actif" },
    { name: "Ministère de la Formation Professionnelle et du Travail", code: "MFPT", description: "Formation et travail", count: 234, status: "Actif" },
    { name: "Ministère de la Formation et de l'Enseignement Professionnel", code: "MFEP", description: "Formation et enseignement professionnel", count: 456, status: "Actif" },
    { name: "Ministère de la Jeunesse", code: "MJ", description: "Jeunesse", count: 567, status: "Actif" },
    { name: "Ministère de la Jeunesse et des Sports", code: "MJS", description: "Jeunesse et sports", count: 345, status: "Actif" },
    { name: "Ministère de la Justice", code: "MJUS", description: "Justice", count: 234, status: "Actif" },
    { name: "Ministère de la Participation et de la Coordination des Réformes", code: "MPCR", description: "Participation et réformes", count: 456, status: "Actif" },
    { name: "Ministère de la Planification", code: "MPLAN", description: "Planification", count: 567, status: "Actif" },
    { name: "Ministère de la Poste et des Technologies de l'Information et de la Communication", code: "MPTIC", description: "Poste et TIC", count: 345, status: "Actif" },
    { name: "Ministère de la Poste, des Télécommunications, des Technologies et du Numérique", code: "MPTTN", description: "Poste et numérique", count: 234, status: "Actif" },
    { name: "Ministère de la Prospective et des Statistiques", code: "MPS", description: "Prospective et statistiques", count: 456, status: "Actif" },
    { name: "Ministère de la Protection Sociale", code: "MPROS", description: "Protection sociale", count: 567, status: "Actif" },
    { name: "Ministère de la Recherche Scientifique", code: "MRS", description: "Recherche scientifique", count: 345, status: "Actif" },
    { name: "Ministère de la Recherche, à la Technologie et à l'Environnement", code: "MRTE", description: "Recherche et technologie", count: 234, status: "Actif" },
    { name: "Ministère de la Reconstruction, des Travaux Publics et des Transports", code: "MRTPT", description: "Reconstruction et transports", count: 456, status: "Actif" },
    { name: "Ministère de la Santé et des Affaires Sociales et des Universités", code: "MSASU", description: "Santé et affaires sociales", count: 567, status: "Actif" },
    { name: "Ministère de la Santé, de la Population et de la Réforme Hospitalière", code: "MSPRH", description: "Santé et réforme hospitalière", count: 345, status: "Actif" },
    { name: "Ministère de la Solidarité Nationale", code: "MSN", description: "Solidarité nationale", count: 234, status: "Actif" },
    { name: "Ministère de la Solidarité Nationale de la Famille et de la Condition de la Femme", code: "MSNFCF", description: "Solidarité et famille", count: 456, status: "Actif" },
    { name: "Ministère de la Solidarité Nationale, de la Famille et de la Communauté Nationale à l'Etranger", code: "MSNFCNE", description: "Solidarité et communauté", count: 567, status: "Actif" },
    { name: "Ministère de la Ville", code: "MV", description: "Politique de la ville", count: 345, status: "Actif" },
    { name: "Ministère de la culture et de la communication", code: "MCULCOM", description: "Culture et communication", count: 234, status: "Actif" },
    { name: "Ministère de la micro-entreprise, des start-ups et de l'économie de la connaissance", code: "MMSEC", description: "Micro-entreprise et start-ups", count: 456, status: "Actif" },
    { name: "Ministère de la numérisation et des statistiques", code: "MNS", description: "Numérisation et statistiques", count: 567, status: "Actif" },
    { name: "Ministère de la petite et moyenne entreprise et de l'artisanat", code: "MPMEA", description: "PME et artisanat", count: 345, status: "Actif" },
    { name: "Ministère de la poste et des télécommunications", code: "MPT", description: "Poste et télécommunications", count: 234, status: "Actif" },
    { name: "Ministère de la pêche et des productions halieutiques", code: "MPPH", description: "Pêche et productions halieutiques", count: 456, status: "Actif" },
    { name: "Ministère de la pêche et des ressources halieutiques", code: "MPRH", description: "Pêche et ressources halieutiques", count: 567, status: "Actif" },
    { name: "Ministère de la santé", code: "MSAN", description: "Santé", count: 345, status: "Actif" },
    { name: "Ministère de la transition énergétique et des énergies renouvelables", code: "MTEER", description: "Transition énergétique", count: 234, status: "Actif" },
    { name: "Ministère de l'Emploi et de la Solidarité Nationale", code: "MESN", description: "Emploi et solidarité", count: 456, status: "Actif" },
    { name: "Ministère de l'Industrie et des Mines", code: "MIM", description: "Industrie et mines", count: 567, status: "Actif" },
    { name: "Ministère de l'Intérieur, des Collectivités Locales et de l'Aménagement du Territoire", code: "MICLAT", description: "Intérieur et collectivités", count: 345, status: "Actif" },
    { name: "Ministère de l'aménagement du territoire, du tourisme et de l'artisanat", code: "MATTA", description: "Aménagement et tourisme", count: 234, status: "Actif" },
    { name: "Ministère de l'habitat, de l'urbanisme et de la ville", code: "MHUV", description: "Habitat et ville", count: 456, status: "Actif" },
    { name: "Ministère de l'hydraulique de l'environnement et des forêts", code: "MHEF", description: "Hydraulique et forêts", count: 567, status: "Actif" },
    { name: "Ministère de l'intérieur, des collectivités locales, de l'environnement et de la réforme administrative", code: "MICLERA", description: "Intérieur et réforme", count: 345, status: "Actif" },
    { name: "Ministère de l'Énergie", code: "MENER", description: "Énergie", count: 234, status: "Actif" },
    { name: "Ministère de l'énergie et des industries chimiques et pétrochimiques", code: "MEICP", description: "Énergie et chimie", count: 456, status: "Actif" },
    { name: "Ministère des Affaires Etrangères", code: "MAE", description: "Affaires étrangères", count: 567, status: "Actif" },
    { name: "Ministère des Affaires Etrangères et de la Communauté Nationale à l'Etranger", code: "MAECNE", description: "Affaires étrangères et diaspora", count: 345, status: "Actif" },
    { name: "Ministère des Affaires Etrangères et de la Coopération Internationale", code: "MAECI", description: "Affaires étrangères et coopération", count: 234, status: "Actif" },
    { name: "Ministère des Affaires Religieuses et des Wakfs", code: "MARW", description: "Affaires religieuses", count: 456, status: "Actif" },
    { name: "Ministère des Anciens Moudjahidine", code: "MAM", description: "Anciens combattants", count: 567, status: "Actif" },
    { name: "Ministère des Collectivités Locales", code: "MCL", description: "Collectivités locales", count: 345, status: "Actif" },
    { name: "Ministère des Finances", code: "MF", description: "Finances", count: 234, status: "Actif" },
    { name: "Ministère des Finances et du Plan", code: "MFP2", description: "Finances et planification", count: 456, status: "Actif" },
    { name: "Ministère des Finances, de l'Intérieur, des Collectivités Locales, de l'Environnement et de la Réforme Administrative", code: "MFICLERA", description: "Finances et administration", count: 567, status: "Actif" },
    { name: "Ministère des Industries Légères", code: "MIL", description: "Industries légères", count: 345, status: "Actif" },
    { name: "Ministère des Participations et de la Promotion des Investissements", code: "MPPI", description: "Participations et investissements", count: 234, status: "Actif" },
    { name: "Ministère des Postes et Télécommunications et des Transports", code: "MPTT", description: "Postes et transports", count: 456, status: "Actif" },
    { name: "Ministère des Ressources en Eau", code: "MRE", description: "Ressources en eau", count: 567, status: "Actif" },
    { name: "Ministère des Ressources en Eau et de la Sécurité Hydrique", code: "MRESH", description: "Ressources en eau et sécurité hydrique", count: 345, status: "Actif" },
    { name: "Ministère des Transports", code: "MT", description: "Transports", count: 234, status: "Actif" },
    { name: "Ministère des Transports et de la Pêche", code: "MTP", description: "Transports et pêche", count: 456, status: "Actif" },
    { name: "Ministère des Travaux Publics et de la Construction", code: "MTPC", description: "Travaux publics et construction", count: 567, status: "Actif" },
    { name: "Ministère des Travaux Publics, de l'Aménagement du Territoire, de l'Environnement et de l'Urbanisme", code: "MTPATEU", description: "Travaux publics et aménagement", count: 345, status: "Actif" },
    { name: "Ministère des Universités", code: "MU", description: "Universités", count: 234, status: "Actif" },
    { name: "Ministère des Universités et de la Recherche Scientifique", code: "MURS", description: "Universités et recherche", count: 456, status: "Actif" },
    { name: "Ministère des affaires sociales", code: "MAS", description: "Affaires sociales", count: 567, status: "Actif" },
    { name: "Ministère des enseignements primaire et secondaire", code: "MEPS", description: "Enseignements primaire et secondaire", count: 345, status: "Actif" },
    { name: "Ministère des mines", code: "MM", description: "Mines", count: 234, status: "Actif" },
    { name: "Ministère des moudjahidine et des ayants droit", code: "MMAD", description: "Moudjahidine et ayants droit", count: 456, status: "Actif" },
    { name: "Ministère des relations avec le Parlement", code: "MRP", description: "Relations avec le Parlement", count: 567, status: "Actif" },
    { name: "Ministère des ressources en eau et de l'environnement", code: "MREE", description: "Ressources en eau et environnement", count: 345, status: "Actif" },
    { name: "Ministère des sports", code: "MSPORT", description: "Sports", count: 234, status: "Actif" },
    { name: "Ministère des travaux publics", code: "MTRPUB", description: "Travaux publics", count: 456, status: "Actif" },
    { name: "Ministère du Commerce", code: "MCOM2", description: "Commerce", count: 567, status: "Actif" },
    { name: "Ministère du Commerce et de la Promotion des Exportations", code: "MCPE", description: "Commerce et exportations", count: 345, status: "Actif" },
    { name: "Ministère du Tourisme", code: "MTOUR", description: "Tourisme", count: 234, status: "Actif" },
    { name: "Ministère du Tourisme et de l'Artisanat", code: "MTA", description: "Tourisme et artisanat", count: 456, status: "Actif" },
    { name: "Ministère du Travail", code: "MTRAV", description: "Travail", count: 567, status: "Actif" },
    { name: "Ministère du Travail et de la Sécurité Sociale", code: "MTSS", description: "Travail et sécurité sociale", count: 345, status: "Actif" },
    { name: "Ministère du Travail et des Affaires sociales", code: "MTAS", description: "Travail et affaires sociales", count: 234, status: "Actif" },
    { name: "Ministère du Travail, de l'Emploi et de la Sécurité Sociale", code: "MTESS", description: "Travail, emploi et sécurité sociale", count: 456, status: "Actif" },
    { name: "Ministère du développement industriel et de la promotion de l'investissement", code: "MDIPI", description: "Développement industriel", count: 567, status: "Actif" },
    { name: "Ministère du tourisme, de l'artisanat et du travail familial", code: "MTATF", description: "Tourisme et travail familial", count: 345, status: "Actif" },
    { name: "Ministère du travail de la protection sociale et de la formation professionnelle", code: "MTPSFP", description: "Travail et protection sociale", count: 234, status: "Actif" },
    { name: "Ministère du travail et de la protection sociale", code: "MTPS", description: "Travail et protection sociale", count: 456, status: "Actif" },
    { name: "Ministère délégué au Trésor", code: "MDT", description: "Trésor", count: 567, status: "Actif" },
    { name: "Ministère l'Aménagement du territoire, de l'Environnement et du Tourisme", code: "MATET", description: "Aménagement, environnement et tourisme", count: 345, status: "Actif" },
    { name: "Ministère des Travaux Publics et des Transports", code: "MTPPT", description: "Travaux publics et transports", count: 234, status: "Actif" },
    { name: "Organe national de la protection et de la promotion de l'enfance", code: "ONPPE", description: "Protection de l'enfance", count: 456, status: "Actif" },
    { name: "Premier Ministère", code: "PM", description: "Premier Ministère", count: 567, status: "Actif" },
    { name: "Présidence de la république", code: "PR", description: "Présidence de la République", count: 345, status: "Actif" },
    { name: "Médiateur de la République", code: "MR", description: "Médiation républicaine", count: 234, status: "Actif" }
  ];

  // Nouvelles données pour les signataires
  const allSignatories = [
    { name: "Abdelmadjid Tebboune", position: "Président de la République", organization: "Présidence de la République", count: 145, status: "Actif" },
    { name: "Ayman Benabderrahmane", position: "Premier Ministre", organization: "Premier Ministère", count: 234, status: "Actif" },
    { name: "Abderrachid Tabi", position: "Ministre de la Justice", organization: "Ministère de la Justice", count: 89, status: "Actif" },
    { name: "Kamal Beldjoud", position: "Ministre de l'Intérieur", organization: "Ministère de l'Intérieur", count: 156, status: "Actif" },
    { name: "Ramtane Lamamra", position: "Ministre des Affaires Étrangères", organization: "Ministère des Affaires Étrangères", count: 67, status: "Actif" },
    { name: "Abderrahmane Benbouzid", position: "Ministre de la Santé", organization: "Ministère de la Santé", count: 123, status: "Actif" },
    { name: "Abdelhakim Belaabes", position: "Ministre de l'Éducation", organization: "Ministère de l'Éducation Nationale", count: 98, status: "Actif" },
    { name: "Mohamed Arkab", position: "Ministre de l'Énergie", organization: "Ministère de l'Énergie", count: 76, status: "Actif" },
    { name: "Ahmed Zeghdar", position: "Ministre des Finances", organization: "Ministère des Finances", count: 189, status: "Actif" },
    { name: "Youcef Chorfa", position: "Ministre du Commerce", organization: "Ministère du Commerce", count: 112, status: "Actif" },
    { name: "Kamel Rezig", position: "Ministre des Moudjahidine", organization: "Ministère des Anciens Moudjahidine", count: 45, status: "Actif" },
    { name: "Abdelkader Ouali", position: "Ministre des Travaux Publics", organization: "Ministère des Travaux Publics", count: 87, status: "Actif" },
    { name: "Mohamed Abdellah Houary", position: "Ministre de l'Industrie", organization: "Ministère de l'Industrie", count: 134, status: "Actif" },
    { name: "Cherif Omari", position: "Ministre de la Formation Professionnelle", organization: "Ministère de la Formation Professionnelle", count: 56, status: "Actif" },
    { name: "Abderrazak Djamel Sayadi", position: "Ministre de l'Habitat", organization: "Ministère de l'Habitat", count: 78, status: "Actif" },
    { name: "Hani Seif El Islam Berrebeh", position: "Ministre de la Jeunesse et des Sports", organization: "Ministère de la Jeunesse et des Sports", count: 65, status: "Actif" },
    { name: "Soraya Mouloudji", position: "Ministre de la Solidarité Nationale", organization: "Ministère de la Solidarité Nationale", count: 91, status: "Actif" },
    { name: "Boualem Mochouri", position: "Ministre de l'Enseignement Supérieur", organization: "Ministère de l'Enseignement Supérieur", count: 103, status: "Actif" },
    { name: "Youcef Benmassaoud", position: "Ministre du Tourisme", organization: "Ministère du Tourisme", count: 42, status: "Actif" },
    { name: "Sid Ali Khaldi", position: "Ministre de la Communication", organization: "Ministère de la Communication", count: 58, status: "Actif" }
  ];

  // Filtrage des types de textes
  const filteredLegalTypes = allLegalTypes.filter(type => 
    type.name.toLowerCase().includes(legalTypesFilter.toLowerCase()) ||
    type.code.toLowerCase().includes(legalTypesFilter.toLowerCase()) ||
    type.description.toLowerCase().includes(legalTypesFilter.toLowerCase())
  );

  // Filtrage des organisations
  const filteredOrganizations = allOrganizations.filter(org => 
    org.name.toLowerCase().includes(organizationsFilter.toLowerCase()) ||
    org.code.toLowerCase().includes(organizationsFilter.toLowerCase()) ||
    org.description.toLowerCase().includes(organizationsFilter.toLowerCase())
  );

  // Filtrage des signataires
  const filteredSignatories = allSignatories.filter(sig => 
    sig.name.toLowerCase().includes(signatoriesFilter.toLowerCase()) ||
    sig.position.toLowerCase().includes(signatoriesFilter.toLowerCase()) ||
    sig.organization.toLowerCase().includes(signatoriesFilter.toLowerCase())
  );

  // Pagination pour les types de textes
  const {
    currentData: paginatedLegalTypes,
    currentPage: legalTypesCurrentPage,
    totalPages: legalTypesTotalPages,
    itemsPerPage: legalTypesItemsPerPage,
    totalItems: legalTypesTotalItems,
    setCurrentPage: setLegalTypesCurrentPage,
    setItemsPerPage: setLegalTypesItemsPerPage
  } = usePagination({
    data: filteredLegalTypes,
    itemsPerPage: 10
  });

  // Pagination pour les organisations
  const {
    currentData: paginatedOrganizations,
    currentPage: organizationsCurrentPage,
    totalPages: organizationsTotalPages,
    itemsPerPage: organizationsItemsPerPage,
    totalItems: organizationsTotalItems,
    setCurrentPage: setOrganizationsCurrentPage,
    setItemsPerPage: setOrganizationsItemsPerPage
  } = usePagination({
    data: filteredOrganizations,
    itemsPerPage: 10
  });

  // Pagination pour les signataires
  const {
    currentData: paginatedSignatories,
    currentPage: signatoriesCurrentPage,
    totalPages: signatoriesTotalPages,
    itemsPerPage: signatoriesItemsPerPage,
    totalItems: signatoriesTotalItems,
    setCurrentPage: setSignatoriesCurrentPage,
    setItemsPerPage: setSignatoriesItemsPerPage
  } = usePagination({
    data: filteredSignatories,
    itemsPerPage: 10
  });

  // Pagination pour les organisations (20 par page)
  const organizationsPerPage = 20;
  const totalOrganizationsPages = Math.ceil(filteredOrganizations.length / organizationsPerPage);
  const startOrganizationsIndex = (currentOrganizationsPage - 1) * organizationsPerPage;
  const endOrganizationsIndex = startOrganizationsIndex + organizationsPerPage;
  const currentOrganizations = filteredOrganizations.slice(startOrganizationsIndex, endOrganizationsIndex);

  // Pagination pour les signataires (10 par page)
  const signatoriesPerPage = 10;
  const totalSignatoriesPages = Math.ceil(filteredSignatories.length / signatoriesPerPage);
  const startSignatoriesIndex = (currentSignatoriesPage - 1) * signatoriesPerPage;
  const endSignatoriesIndex = startSignatoriesIndex + signatoriesPerPage;
  const currentSignatories = filteredSignatories.slice(startSignatoriesIndex, endSignatoriesIndex);

  const procedureCategories = [
    { name: "État Civil", code: "ETI", description: "Actes et documents d'état civil", count: 45, status: "Actif" },
    { name: "Urbanisme", code: "URB", description: "Permis et autorisations d'urbanisme", count: 67, status: "Actif" },
    { name: "Commerce", code: "COM", description: "Registre du commerce et activités", count: 89, status: "Actif" },
    { name: "Emploi", code: "EMP", description: "Demandes d'emploi et formation", count: 123, status: "Actif" },
    { name: "Santé", code: "SAN", description: "Cartes et services de santé", count: 78, status: "Actif" },
    { name: "Éducation", code: "EDU", description: "Inscriptions et diplômes", count: 156, status: "Actif" },
    { name: "Transport", code: "TRA", description: "Permis et autorisations de transport", count: 234, status: "Actif" },
    { name: "Fiscalité", code: "FIS", description: "Déclarations et paiements fiscaux", count: 345, status: "Actif" },
    { name: "Logement", code: "LOG", description: "Demandes de logement social", count: 112, status: "Actif" },
    { name: "Agriculture", code: "AGR", description: "Subventions et autorisations agricoles", count: 89, status: "Actif" },
    { name: "Environnement", code: "ENV", description: "Autorisations environnementales", count: 67, status: "Actif" },
    { name: "Culture", code: "CUL", description: "Subventions culturelles", count: 45, status: "Actif" },
    { name: "Sports", code: "SPO", description: "Licences et autorisations sportives", count: 78, status: "Actif" },
    { name: "Tourisme", code: "TOU", description: "Autorisations touristiques", count: 56, status: "Actif" },
    { name: "Industrie", code: "IND", description: "Autorisations industrielles", count: 134, status: "Actif" },
    { name: "Mines", code: "MIN", description: "Concessions minières", count: 23, status: "Actif" }
  ].filter(cat => 
    cat.name.toLowerCase().includes(proceduresFilter.toLowerCase()) ||
    cat.code.toLowerCase().includes(proceduresFilter.toLowerCase()) ||
    cat.description.toLowerCase().includes(proceduresFilter.toLowerCase())
  );

  const legalDomains = [
    { name: "Droit Civil", code: "CIV", description: "Personnes, biens, obligations", count: 45, status: "Actif" },
    { name: "Droit Pénal", code: "PEN", description: "Infractions et sanctions", count: 67, status: "Actif" },
    { name: "Droit Commercial", code: "COM", description: "Activités commerciales", count: 89, status: "Actif" },
    { name: "Droit Administratif", code: "ADM", description: "Administration publique", count: 123, status: "Actif" },
    { name: "Droit du Travail", code: "TRA", description: "Relations de travail", count: 78, status: "Actif" },
    { name: "Droit Fiscal", code: "FIS", description: "Impôts et taxes", count: 156, status: "Actif" },
    { name: "Droit International", code: "INT", description: "Relations internationales", count: 34, status: "Actif" },
    { name: "Droit de la Famille", code: "FAM", description: "Mariage, divorce, filiation", count: 98, status: "Actif" },
    { name: "Droit Constitutionnel", code: "CON", description: "Organisation des pouvoirs", count: 23, status: "Actif" },
    { name: "Droit Social", code: "SOC", description: "Sécurité sociale et protection", count: 67, status: "Actif" },
    { name: "Droit Bancaire", code: "BAN", description: "Activités bancaires et financières", count: 45, status: "Actif" },
    { name: "Droit de l'Environnement", code: "ENV", description: "Protection environnementale", count: 56, status: "Actif" },
    { name: "Droit de la Propriété Intellectuelle", code: "PRO", description: "Brevets, marques, droits d'auteur", count: 34, status: "Actif" },
    { name: "Droit Maritime", code: "MAR", description: "Navigation et commerce maritime", count: 12, status: "Actif" },
    { name: "Droit Aérien", code: "AIR", description: "Transport aérien", count: 18, status: "Actif" },
    { name: "Droit de la Consommation", code: "CONS", description: "Protection des consommateurs", count: 29, status: "Actif" },
    { name: "Droit de la Santé", code: "SANT", description: "Santé publique et médical", count: 41, status: "Actif" },
    { name: "Droit de l'Éducation", code: "EDUC", description: "Système éducatif", count: 38, status: "Actif" }
  ].filter(domain => 
    domain.name.toLowerCase().includes(domainsFilter.toLowerCase()) ||
    domain.code.toLowerCase().includes(domainsFilter.toLowerCase()) ||
    domain.description.toLowerCase().includes(domainsFilter.toLowerCase())
  );

  // Pagination pour les catégories de procédures
  const proceduresPerPage = 6;
  const [currentProceduresPage, setCurrentProceduresPage] = useState(1);
  const proceduresTotalPages = Math.ceil(procedureCategories.length / proceduresPerPage);
  const startProceduresIndex = (currentProceduresPage - 1) * proceduresPerPage;
  const endProceduresIndex = startProceduresIndex + proceduresPerPage;
  const currentProcedures = procedureCategories.slice(startProceduresIndex, endProceduresIndex);

  // Pagination pour les domaines juridiques
  const domainsPerPage = 6;
  const [currentDomainsPage, setCurrentDomainsPage] = useState(1);
  const domainsTotalPages = Math.ceil(legalDomains.length / domainsPerPage);
  const startDomainsIndex = (currentDomainsPage - 1) * domainsPerPage;
  const endDomainsIndex = startDomainsIndex + domainsPerPage;
  const currentDomains = legalDomains.slice(startDomainsIndex, endDomainsIndex);

  const PaginationControls = ({ currentPage, totalPages, onPageChange }: { currentPage: number, totalPages: number, onPageChange: (page: number) => void }) => (
    <div className="flex items-center justify-center gap-2 mt-4">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="w-4 h-4" />
      </Button>
      <span className="text-sm text-gray-600">
        Page {currentPage} sur {totalPages}
      </span>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );

  // Gestionnaires pour les modales
  const handleLegalTypeSave = (data: Record<string, unknown>) => {
    console.log('Type de texte ajouté:', data);
    // Logique d'ajout du type de texte
  };

  const handleCategorySave = (data: Record<string, unknown>) => {
    console.log('Catégorie ajoutée:', data);
    // Logique d'ajout de la catégorie
  };

  const handleDomainSave = (data: Record<string, unknown>) => {
    console.log('Domaine ajouté:', data);
    // Logique d'ajout du domaine
  };

  const handleOrganizationSave = (data: Record<string, unknown>) => {
    console.log('Organisation ajoutée:', data);
    // Logique d'ajout de l'organisation
  };

  const handleSignatorySave = (data: Record<string, unknown>) => {
    console.log('Signataire ajouté:', data);
    // Logique d'ajout du signataire
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="legal-types" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="legal-types">Types de Textes</TabsTrigger>
          <TabsTrigger value="procedures">Catégories Procédures</TabsTrigger>
          <TabsTrigger value="domains">Domaines Juridiques</TabsTrigger>
          <TabsTrigger value="organizations">Organisations</TabsTrigger>
          <TabsTrigger value="signatories">Signataires</TabsTrigger>
          <TabsTrigger value="form-generator">
            <Wand2 className="w-4 h-4 mr-2" />
            Générateur de formulaires
          </TabsTrigger>
        </TabsList>

        <TabsContent value="legal-types" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Rechercher un type de texte..."
                className="pl-10"
                value={legalTypesFilter}
                onChange={(e) => {
                  setLegalTypesFilter(e.target.value);
                  setCurrentLegalTypesPage(1);
                }}
              />
            </div>
            <Button className="ml-4" onClick={() => setIsLegalTypeModalOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Ajouter un Type
            </Button>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {paginatedLegalTypes.map((type, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold text-gray-900">{type.name}</h4>
                          <Badge variant="outline">{type.code}</Badge>
                          <Badge className="bg-green-100 text-green-800">{type.status}</Badge>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">{type.description}</p>
                        <p className="text-xs text-gray-500">{type.count} textes associés</p>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={buttonHandlers.generic(`Modifier type: ${type.name}`, 'Modification du type de texte', 'Configuration')}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={buttonHandlers.generic(`Supprimer type: ${type.name}`, 'Suppression du type de texte', 'Configuration')}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Pagination pour les types de textes */}
            <Pagination
              currentPage={legalTypesCurrentPage}
              totalPages={legalTypesTotalPages}
              totalItems={legalTypesTotalItems}
              itemsPerPage={legalTypesItemsPerPage}
              onPageChange={setLegalTypesCurrentPage}
              onItemsPerPageChange={setLegalTypesItemsPerPage}
            />
          </div>
        </TabsContent>

        <TabsContent value="procedures" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Rechercher une catégorie..."
                className="pl-10"
                value={proceduresFilter}
                onChange={(e) => setProceduresFilter(e.target.value)}
              />
            </div>
            <Button className="ml-4" onClick={() => setIsCategoryModalOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Ajouter une Catégorie
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentProcedures.map((category, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold text-gray-900">{category.name}</h4>
                        <Badge variant="outline">{category.code}</Badge>
                        <Badge className="bg-green-100 text-green-800">{category.status}</Badge>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">{category.description}</p>
                      <p className="text-xs text-gray-500">{category.count} procédures associées</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Pagination pour les catégories de procédures */}
          <Pagination
            currentPage={currentProceduresPage}
            totalPages={proceduresTotalPages}
            totalItems={procedureCategories.length}
            itemsPerPage={proceduresPerPage}
            onPageChange={setCurrentProceduresPage}
            onItemsPerPageChange={() => {}}
          />
        </TabsContent>

        <TabsContent value="domains" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Rechercher un domaine..."
                className="pl-10"
                value={domainsFilter}
                onChange={(e) => setDomainsFilter(e.target.value)}
              />
            </div>
            <Button className="ml-4" onClick={() => setIsDomainModalOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Ajouter un Domaine
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentDomains.map((domain, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold text-gray-900">{domain.name}</h4>
                        <Badge variant="outline">{domain.code}</Badge>
                        <Badge className="bg-green-100 text-green-800">{domain.status}</Badge>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">{domain.description}</p>
                      <p className="text-xs text-gray-500">{domain.count} éléments associés</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Pagination pour les domaines juridiques */}
          <Pagination
            currentPage={currentDomainsPage}
            totalPages={domainsTotalPages}
            totalItems={legalDomains.length}
            itemsPerPage={domainsPerPage}
            onPageChange={setCurrentDomainsPage}
            onItemsPerPageChange={() => {}}
          />
        </TabsContent>

        <TabsContent value="organizations" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Rechercher une organisation..."
                className="pl-10"
                value={organizationsFilter}
                onChange={(e) => {
                  setOrganizationsFilter(e.target.value);
                  setCurrentOrganizationsPage(1);
                }}
              />
            </div>
            <Button className="ml-4" onClick={() => setIsOrganizationModalOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Ajouter une Organisation
            </Button>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {paginatedOrganizations.map((org, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold text-gray-900">{org.name}</h4>
                          <Badge variant="outline">{org.code}</Badge>
                          <Badge className="bg-green-100 text-green-800">{org.status}</Badge>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">{org.description}</p>
                        <p className="text-xs text-gray-500">{org.count} documents associés</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Pagination pour les organisations */}
            <Pagination
              currentPage={organizationsCurrentPage}
              totalPages={organizationsTotalPages}
              totalItems={organizationsTotalItems}
              itemsPerPage={organizationsItemsPerPage}
              onPageChange={setOrganizationsCurrentPage}
              onItemsPerPageChange={setOrganizationsItemsPerPage}
            />
          </div>
        </TabsContent>

        <TabsContent value="signatories" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Rechercher un signataire..."
                className="pl-10"
                value={signatoriesFilter}
                onChange={(e) => {
                  setSignatoriesFilter(e.target.value);
                  setCurrentSignatoriesPage(1);
                }}
              />
            </div>
            <Button className="ml-4" onClick={() => setIsSignatoryModalOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Ajouter un Signataire
            </Button>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {paginatedSignatories.map((sig, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <UserCheck className="w-4 h-4 text-blue-600" />
                          <h4 className="font-semibold text-gray-900">{sig.name}</h4>
                          <Badge className="bg-green-100 text-green-800">{sig.status}</Badge>
                        </div>
                        <p className="text-sm font-medium text-blue-600 mb-1">{sig.position}</p>
                        <p className="text-gray-600 text-sm mb-2">{sig.organization}</p>
                        <p className="text-xs text-gray-500">{sig.count} documents signés</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Pagination pour les signataires */}
            <Pagination
              currentPage={signatoriesCurrentPage}
              totalPages={signatoriesTotalPages}
              totalItems={signatoriesTotalItems}
              itemsPerPage={signatoriesItemsPerPage}
              onPageChange={setSignatoriesCurrentPage}
              onItemsPerPageChange={setSignatoriesItemsPerPage}
            />
          </div>
        </TabsContent>

        <TabsContent value="form-generator">
          <FormGeneratorTab />
        </TabsContent>
      </Tabs>

      {/* Modales d'ajout */}
      <ManagementModal
        isOpen={isLegalTypeModalOpen}
        onClose={() => setIsLegalTypeModalOpen(false)}
        type="textType"
        onSave={handleLegalTypeSave}
      />

      <ManagementModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        type="category"
        onSave={handleCategorySave}
      />

      <ManagementModal
        isOpen={isDomainModalOpen}
        onClose={() => setIsDomainModalOpen(false)}
        type="domain"
        onSave={handleDomainSave}
      />

      <ManagementModal
        isOpen={isOrganizationModalOpen}
        onClose={() => setIsOrganizationModalOpen(false)}
        type="organization"
        onSave={handleOrganizationSave}
      />

      <SignatoryManagementModal
        isOpen={isSignatoryModalOpen}
        onClose={() => setIsSignatoryModalOpen(false)}
        onSave={handleSignatorySave}
      />
    </div>
  );
}

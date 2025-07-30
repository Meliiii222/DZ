import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  HelpCircle, 
  MessageSquare, 
  Phone, 
  Mail, 
  FileText, 
  Clock, 
  CheckCircle,
  AlertCircle,
  Info,
  BookOpen,
  Video,
  Download,
  Send,
  User,
  Building
} from "lucide-react";

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SupportModal({ isOpen, onClose }: SupportModalProps) {
  const [activeTab, setActiveTab] = useState('contact');
  const [ticketForm, setTicketForm] = useState({
    subject: '',
    category: '',
    priority: 'medium',
    description: '',
    attachments: [] as File[]
  });

  const [contactForm, setContactForm] = useState({
    name: 'Ahmed Benali',
    email: 'ahmed.benali@justice.gov.dz',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmitTicket = () => {
    const ticket = {
      id: `TICKET-${Date.now()}`,
      ...ticketForm,
      status: 'open',
      createdAt: new Date(),
      userId: 'user-123'
    };

    // Sauvegarder le ticket
    const tickets = JSON.parse(localStorage.getItem('supportTickets') || '[]');
    tickets.push(ticket);
    localStorage.setItem('supportTickets', JSON.stringify(tickets));

    // Notification de succès
    const event = new CustomEvent('showNotification', {
      detail: {
        type: 'success',
        message: `Ticket créé avec succès (${ticket.id})`,
        duration: 5000
      }
    });
    window.dispatchEvent(event);

    // Reset form
    setTicketForm({
      subject: '',
      category: '',
      priority: 'medium',
      description: '',
      attachments: []
    });

    onClose();
  };

  const handleSubmitContact = () => {
    // Simuler l'envoi du message de contact
    const contactMessage = {
      id: `CONTACT-${Date.now()}`,
      ...contactForm,
      sentAt: new Date()
    };

    // Notification de succès
    const event = new CustomEvent('showNotification', {
      detail: {
        type: 'success',
        message: 'Message envoyé avec succès. Nous vous répondrons dans les 24h.',
        duration: 5000
      }
    });
    window.dispatchEvent(event);

    // Reset form
    setContactForm({
      name: 'Ahmed Benali',
      email: 'ahmed.benali@justice.gov.dz',
      phone: '',
      subject: '',
      message: ''
    });

    onClose();
  };

  const faqItems = [
    {
      question: "Comment accéder aux textes juridiques ?",
      answer: "Utilisez le menu 'Textes Juridiques' dans la barre de navigation principale. Vous pouvez filtrer par type, date, ou utiliser la recherche avancée."
    },
    {
      question: "Comment créer une nouvelle procédure ?",
      answer: "Allez dans 'Procédures Administratives' > 'Ajouter une procédure'. Remplissez le formulaire avec les informations requises."
    },
    {
      question: "Comment utiliser l'OCR pour extraire du texte ?",
      answer: "Dans la section 'OCR et Extraction', téléchargez votre document. L'IA analysera automatiquement le contenu et extraira les informations pertinentes."
    },
    {
      question: "Comment configurer les notifications ?",
      answer: "Allez dans votre profil > Préférences > Notifications pour personnaliser vos alertes."
    },
    {
      question: "Comment exporter des données ?",
      answer: "Utilisez les boutons d'export disponibles dans chaque section. Les formats supportés sont PDF, Excel et Word."
    }
  ];

  const videoTutorials = [
    {
      title: "Introduction à dalil.dz",
      duration: "5:30",
      description: "Découvrez les fonctionnalités principales de la plateforme"
    },
    {
      title: "Recherche avancée de textes juridiques",
      duration: "8:15",
      description: "Maîtrisez la recherche et les filtres avancés"
    },
    {
      title: "Utilisation de l'OCR",
      duration: "6:45",
      description: "Extraire du texte depuis vos documents scannés"
    },
    {
      title: "Gestion des procédures",
      duration: "10:20",
      description: "Créer et gérer vos procédures administratives"
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5" />
            Assistance et Support
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="contact" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Contact
            </TabsTrigger>
            <TabsTrigger value="ticket" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Ticket
            </TabsTrigger>
            <TabsTrigger value="faq" className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4" />
              FAQ
            </TabsTrigger>
            <TabsTrigger value="tutorials" className="flex items-center gap-2">
              <Video className="w-4 h-4" />
              Tutoriels
            </TabsTrigger>
            <TabsTrigger value="info" className="flex items-center gap-2">
              <Info className="w-4 h-4" />
              Informations
            </TabsTrigger>
          </TabsList>

          <TabsContent value="contact" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Nous contacter</CardTitle>
                <CardDescription>
                  Envoyez-nous un message et nous vous répondrons rapidement
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contactName">Nom complet</Label>
                    <Input
                      id="contactName"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactEmail">Email</Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contactPhone">Téléphone (optionnel)</Label>
                    <Input
                      id="contactPhone"
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactSubject">Sujet</Label>
                    <Input
                      id="contactSubject"
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactMessage">Message</Label>
                  <Textarea
                    id="contactMessage"
                    rows={6}
                    placeholder="Décrivez votre demande ou problème..."
                    value={contactForm.message}
                    onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={onClose}>
                    Annuler
                  </Button>
                  <Button onClick={handleSubmitContact} disabled={!contactForm.subject || !contactForm.message}>
                    <Send className="w-4 h-4 mr-2" />
                    Envoyer le message
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Informations de contact */}
            <Card>
              <CardHeader>
                <CardTitle>Autres moyens de nous contacter</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-medium">Téléphone</p>
                      <p className="text-sm text-gray-600">+213 21 XX XX XX</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-sm text-gray-600">support@dalil.dz</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-medium">Horaires</p>
                      <p className="text-sm text-gray-600">8h-17h (Dim-Jeu)</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ticket" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Créer un ticket de support</CardTitle>
                <CardDescription>
                  Pour un suivi détaillé de votre demande
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="ticketSubject">Sujet du ticket</Label>
                    <Input
                      id="ticketSubject"
                      placeholder="Résumé du problème"
                      value={ticketForm.subject}
                      onChange={(e) => setTicketForm({...ticketForm, subject: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Catégorie</Label>
                    <Select value={ticketForm.category} onValueChange={(value) => setTicketForm({...ticketForm, category: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez une catégorie" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technical">Problème technique</SelectItem>
                        <SelectItem value="feature">Demande de fonctionnalité</SelectItem>
                        <SelectItem value="bug">Signaler un bug</SelectItem>
                        <SelectItem value="account">Problème de compte</SelectItem>
                        <SelectItem value="data">Problème de données</SelectItem>
                        <SelectItem value="other">Autre</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Priorité</Label>
                  <Select value={ticketForm.priority} onValueChange={(value) => setTicketForm({...ticketForm, priority: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          Faible
                        </div>
                      </SelectItem>
                      <SelectItem value="medium">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                          Moyenne
                        </div>
                      </SelectItem>
                      <SelectItem value="high">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                          Élevée
                        </div>
                      </SelectItem>
                      <SelectItem value="urgent">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          Urgente
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ticketDescription">Description détaillée</Label>
                  <Textarea
                    id="ticketDescription"
                    rows={8}
                    placeholder="Décrivez le problème en détail, les étapes pour le reproduire, etc."
                    value={ticketForm.description}
                    onChange={(e) => setTicketForm({...ticketForm, description: e.target.value})}
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={onClose}>
                    Annuler
                  </Button>
                  <Button onClick={handleSubmitTicket} disabled={!ticketForm.subject || !ticketForm.category || !ticketForm.description}>
                    <FileText className="w-4 h-4 mr-2" />
                    Créer le ticket
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="faq" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Questions fréquemment posées</CardTitle>
                <CardDescription>
                  Trouvez rapidement des réponses aux questions les plus courantes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {faqItems.map((item, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <h4 className="font-medium text-green-700 mb-2 flex items-center gap-2">
                        <HelpCircle className="w-4 h-4" />
                        {item.question}
                      </h4>
                      <p className="text-sm text-gray-600">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tutorials" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Tutoriels vidéo</CardTitle>
                <CardDescription>
                  Apprenez à utiliser dalil.dz avec nos guides vidéo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {videoTutorials.map((video, index) => (
                    <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                      <div className="flex items-start gap-3">
                        <Video className="w-8 h-8 text-green-600 mt-1" />
                        <div className="flex-1">
                          <h4 className="font-medium">{video.title}</h4>
                          <p className="text-sm text-gray-600 mb-2">{video.description}</p>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary">
                              <Clock className="w-3 h-3 mr-1" />
                              {video.duration}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="info" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Informations système</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <Label>Version de l'application</Label>
                    <p className="text-gray-600">v2.1.0</p>
                  </div>
                  <div>
                    <Label>Dernière mise à jour</Label>
                    <p className="text-gray-600">15 janvier 2025</p>
                  </div>
                  <div>
                    <Label>Navigateur</Label>
                    <p className="text-gray-600">{navigator.userAgent.split(' ')[0]}</p>
                  </div>
                  <div>
                    <Label>Système d'exploitation</Label>
                    <p className="text-gray-600">{navigator.platform}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Documentation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Guide utilisateur complet
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="w-4 h-4 mr-2" />
                    Manuel d'installation
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="w-4 h-4 mr-2" />
                    Notes de version
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Tag, 
  Eye, 
  Download, 
  Share2,
  Scale,
  BookOpen,
  Building,
  FileText
} from 'lucide-react';
import { LegalText } from './hooks/useLegalTextsData';
import { LegalTextConsultationModal } from '@/components/modals/LegalTextConsultationModal';

interface LegalTextCardProps {
  text: LegalText;
}

export function LegalTextCard({ text }: LegalTextCardProps) {
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);

  const handleConsult = () => {
    setIsConsultationModalOpen(true);
  };

  const handleDownload = () => {
    console.log('Downloading legal text:', text.title);
    // Simulate download
    window.dispatchEvent(new CustomEvent('download-legal-text', { 
      detail: { 
        textId: text.id,
        title: text.title,
        format: 'pdf'
      }
    }));
  };

  const handleShare = () => {
    console.log('Sharing legal text:', text.title);
    // Open share modal
    window.dispatchEvent(new CustomEvent('share-legal-text', { 
      detail: { 
        textId: text.id,
        title: text.title,
        url: `${window.location.origin}/legal-text/${text.id}`
      }
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'En vigueur':
        return 'bg-green-100 text-green-800';
      case 'Abrogé':
        return 'bg-red-100 text-red-800';
      case 'Suspendu':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Loi':
        return Scale;
      case 'Ordonnance':
        return BookOpen;
      case 'Décret':
        return Building;
      default:
        return FileText;
    }
  };

  const TypeIcon = getTypeIcon(text.type);

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <TypeIcon className="w-5 h-5 text-emerald-600" />
              <CardTitle className="text-lg">{text.title}</CardTitle>
              <Badge variant="outline">{text.type}</Badge>
              <Badge className={getStatusColor(text.status)}>
                {text.status}
              </Badge>
            </div>
            <CardDescription className="mb-3">
              {text.description}
            </CardDescription>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Publié le:</span>
                <p className="font-medium flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {text.publishDate}
                </p>
              </div>
              <div>
                <span className="text-gray-500">Catégorie:</span>
                <p className="font-medium flex items-center gap-1">
                  <Tag className="w-4 h-4" />
                  {text.category}
                </p>
              </div>
              <div>
                <span className="text-gray-500">Autorité:</span>
                <p className="font-medium">{text.authority}</p>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-600">
            {text.joNumber}
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleConsult}
            >
              <Eye className="w-4 h-4 mr-1" />
              Consulter
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleDownload}
            >
              <Download className="w-4 h-4 mr-1" />
              Télécharger
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleShare}
            >
              <Share2 className="w-4 h-4 mr-1" />
              Partager
            </Button>
          </div>
        </div>
      </CardContent>
      
      <LegalTextConsultationModal
        isOpen={isConsultationModalOpen}
        onClose={() => setIsConsultationModalOpen(false)}
        text={text}
      />
    </Card>
  );
}

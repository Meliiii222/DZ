
import React from 'react';
import { FileText, Download, Share2, Printer } from 'lucide-react';
import { UnifiedModal } from '../core/UnifiedModal';
import { PDFViewerModalData } from '../core/ModalConfig';

interface PDFViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: PDFViewerModalData;
}

export function PDFViewerModal({ isOpen, onClose, data }: PDFViewerModalProps) {
  const handleDownload = () => {
    if (data.pdfUrl) {
      const link = document.createElement('a');
      link.href = data.pdfUrl;
      link.download = `${data.title}.pdf`;
      link.click();
    }
  };

  const handleShare = async () => {
    if (navigator.share && data.pdfUrl) {
      try {
        await navigator.share({
          title: data.title,
          url: data.pdfUrl
        });
      } catch (error) {
        console.log('Partage annulé');
      }
    }
  };

  const handlePrint = () => {
    if (data.pdfUrl) {
      const printWindow = window.open(data.pdfUrl);
      printWindow?.print();
    }
  };

  return (
    <UnifiedModal
      isOpen={isOpen}
      onClose={onClose}
      title={data.title}
      icon={FileText}
      size="xl"
      id="pdf-viewer"
      secondaryActions={[
        {
          label: 'Télécharger',
          icon: Download,
          onClick: handleDownload,
          variant: 'outline'
        },
        {
          label: 'Partager',
          icon: Share2,
          onClick: handleShare,
          variant: 'outline'
        },
        {
          label: 'Imprimer',
          icon: Printer,
          onClick: handlePrint,
          variant: 'outline'
        }
      ]}
    >
      <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center">
        {data.pdfUrl ? (
          <iframe
            src={data.pdfUrl}
            className="w-full h-full rounded-lg"
            title={data.title}
          />
        ) : (
          <div className="text-center text-gray-500">
            <FileText className="h-16 w-16 mx-auto mb-4" />
            <p>Aucun document disponible</p>
          </div>
        )}
      </div>
    </UnifiedModal>
  );
}


import { useState } from 'react';

export function useDocumentActions() {
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePDFView = (title: string, url?: string) => {
    console.log('Ouverture PDF:', title, url);
    const event = new CustomEvent('open-modal', {
      detail: {
        type: 'pdf-viewer',
        title: `Consultation: ${title}`,
        data: { url: url || `/sample-${title.toLowerCase().replace(/\s+/g, '-')}.pdf` }
      }
    });
    window.dispatchEvent(event);
  };

  const handleShare = (title: string, url?: string) => {
    console.log('Partage:', title, url);
    if (navigator.share) {
      navigator.share({
        title: title,
        url: url || window.location.href
      });
    } else {
      navigator.clipboard.writeText(url || window.location.href);
      alert('Lien copié dans le presse-papiers');
    }
  };

  const handleDownload = (filename: string, url?: string) => {
    console.log('Téléchargement:', filename, url);
    
    // Toast de début
    const startEvent = new CustomEvent('show-toast', {
      detail: {
        type: 'info',
        title: 'Téléchargement',
        description: `Préparation du téléchargement de ${filename}...`
      }
    });
    window.dispatchEvent(startEvent);
    
    // Créer un fichier de démonstration selon le type
    let content = '';
    let mimeType = 'application/pdf';
    
    if (filename.includes('.pdf')) {
      content = 'data:application/pdf;base64,JVBERi0xLjQKJdPr6eEK';
      mimeType = 'application/pdf';
    } else if (filename.includes('.xlsx') || filename.includes('.excel')) {
      content = 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,UEsDBBQABgAIAAAAIQA=';
      mimeType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    } else if (filename.includes('.json')) {
      const jsonData = {
        exportDate: new Date().toISOString(),
        data: 'Exemple de données exportées',
        source: 'dalil.dz'
      };
      content = 'data:application/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(jsonData, null, 2));
      mimeType = 'application/json';
    }
    
    setTimeout(() => {
      const link = document.createElement('a');
      link.href = url || content;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Toast de succès
      const successEvent = new CustomEvent('show-toast', {
        detail: {
          type: 'success',
          title: 'Téléchargement terminé',
          description: `${filename} téléchargé avec succès`
        }
      });
      window.dispatchEvent(successEvent);
    }, 1000);
  };

  const handleImport = (acceptedTypes?: string[]) => {
    console.log('Import de fichiers:', acceptedTypes);
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = acceptedTypes?.join(',') || '*';
    input.multiple = true;
    input.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (files) {
        console.log('Fichiers importés:', Array.from(files).map(f => f.name));
        setIsProcessing(true);
        setTimeout(() => {
          setIsProcessing(false);
          alert(`${files.length} fichier(s) importé(s) avec succès`);
        }, 2000);
      }
    };
    input.click();
  };

  const handleExport = (data: Record<string, unknown>[], filename: string) => {
    console.log('Export des données:', data, filename);
    const jsonData = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return {
    handlePDFView,
    handleShare,
    handleDownload,
    handleImport,
    handleExport,
    isProcessing
  };
}

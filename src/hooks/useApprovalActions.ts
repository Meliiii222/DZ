
import { useState } from 'react';

export function useApprovalActions() {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleExamine = (itemId: string, itemTitle: string) => {
    console.log('Examen de l\'élément:', itemId, itemTitle);
    const event = new CustomEvent('open-modal', {
      detail: {
        type: 'examine',
        title: `Examen: ${itemTitle}`,
        data: { itemId, itemTitle }
      }
    });
    window.dispatchEvent(event);
  };

  const handleApprove = (itemId: string, itemTitle: string) => {
    console.log('Approbation:', itemId, itemTitle);
    if (confirm(`Approuver "${itemTitle}" ?`)) {
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        alert(`"${itemTitle}" approuvé avec succès`);
      }, 1000);
    }
  };

  const handleReject = (itemId: string, itemTitle: string) => {
    console.log('Rejet:', itemId, itemTitle);
    const reason = prompt(`Raison du rejet de "${itemTitle}" :`);
    if (reason) {
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        alert(`"${itemTitle}" rejeté: ${reason}`);
      }, 1000);
    }
  };

  const handleLike = (itemId: string, itemTitle: string) => {
    console.log('Like/Favoris:', itemId, itemTitle);
    const liked = localStorage.getItem(`liked_${itemId}`) === 'true';
    localStorage.setItem(`liked_${itemId}`, (!liked).toString());
    alert(liked ? 'Retiré des favoris' : 'Ajouté aux favoris');
  };

  return {
    handleExamine,
    handleApprove,
    handleReject,
    handleLike,
    isProcessing
  };
}

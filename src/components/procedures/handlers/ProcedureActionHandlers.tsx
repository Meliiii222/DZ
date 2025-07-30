
interface ProcedureActionHandlersProps {
  onAddProcedure?: () => void;
  onOpenApprovalQueue?: () => void;
  children: (handlers: {
    handleAddClick: () => void;
    handleOpenApprovalQueue: () => void;
  }) => React.ReactNode;
}

export function ProcedureActionHandlers({ 
  onAddProcedure, 
  onOpenApprovalQueue, 
  children 
}: ProcedureActionHandlersProps) {
  // Log de débogage pour vérifier la transmission des props
  console.log('ProcedureActionHandlers - onOpenApprovalQueue:', typeof onOpenApprovalQueue, onOpenApprovalQueue);

  const handleAddClick = () => {
    console.log('Bouton vert cliqué - Redirection vers le formulaire');
    if (onAddProcedure) {
      onAddProcedure();
    } else {
      console.error('onAddProcedure function not provided');
    }
  };

  const handleOpenApprovalQueue = () => {
    console.log('ProcedureActionHandlers - handleOpenApprovalQueue appelée');
    if (onOpenApprovalQueue) {
      console.log('ProcedureActionHandlers - Appel de onOpenApprovalQueue');
      onOpenApprovalQueue();
    } else {
      console.error('ProcedureActionHandlers - onOpenApprovalQueue function not provided');
    }
  };

  return (
    <>
      {children({ handleAddClick, handleOpenApprovalQueue })}
    </>
  );
}

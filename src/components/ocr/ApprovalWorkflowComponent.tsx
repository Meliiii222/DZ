import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Pagination } from '@/components/common/Pagination';
import { usePagination } from '@/hooks/usePagination';
import { Eye, Edit, ThumbsUp, ThumbsDown, ClipboardList } from "lucide-react";

interface ApprovalWorkflowProps {
  extractedData?: any;
  onApproval?: (approvedData: any) => void;
  onRejection?: (reason: string) => void;
}

interface WorkflowDocument {
  id: string;
  title: string;
  documentType: 'legal-text' | 'procedure';
  extractionDate: string;
  extractionConfidence: number;
  status: 'pending' | 'under_review' | 'approved' | 'needs_revision' | 'rejected';
  submittedBy: string;
  assignedTo?: string;
  priority: 'low' | 'medium' | 'high';
}

export function ApprovalWorkflowComponent({ extractedData, onApproval, onRejection }: ApprovalWorkflowProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'pending' | 'under_review' | 'approved' | 'needs_revision' | 'rejected'>('all');
  const [documentTypeFilter, setDocumentTypeFilter] = useState<'all' | 'legal-text' | 'procedure'>('all');

  const workflowItems: WorkflowDocument[] = [
    {
      id: '1',
      title: 'Loi relative aux investissements',
      documentType: 'legal-text',
      extractionDate: '2025-01-12',
      extractionConfidence: 94,
      status: 'pending',
      submittedBy: 'Système OCR-IA',
      priority: 'high'
    },
    {
      id: '2',
      title: 'Décret exécutif modalités application',
      documentType: 'legal-text',
      extractionDate: '2025-01-11',
      extractionConfidence: 87,
      status: 'under_review',
      submittedBy: 'Système OCR-IA',
      assignedTo: 'Dr. Amina Khelifi',
      priority: 'medium'
    },
    {
      id: '3',
      title: 'Procédure création entreprise SARL',
      documentType: 'procedure',
      extractionDate: '2025-01-10',
      extractionConfidence: 91,
      status: 'approved',
      submittedBy: 'Système OCR-IA',
      assignedTo: 'M. Karim Benaissa',
      priority: 'medium'
    },
    {
      id: '4',
      title: 'Arrêté ministériel normes environnementales',
      documentType: 'legal-text',
      extractionDate: '2025-01-09',
      extractionConfidence: 83,
      status: 'needs_revision',
      submittedBy: 'Système OCR-IA',
      assignedTo: 'Dr. Leila Mansouri',
      priority: 'low'
    },
    {
      id: '5',
      title: 'Procédure demande passeport biométrique',
      documentType: 'procedure',
      extractionDate: '2025-01-08',
      extractionConfidence: 96,
      status: 'approved',
      submittedBy: 'Système OCR-IA',
      assignedTo: 'Mme. Fatima Benali',
      priority: 'high'
    },
    {
      id: '6',
      title: 'Ordonnance modifiant code commerce',
      documentType: 'legal-text',
      extractionDate: '2025-01-07',
      extractionConfidence: 89,
      status: 'rejected',
      submittedBy: 'Système OCR-IA',
      assignedTo: 'M. Ahmed Taleb',
      priority: 'medium'
    }
  ];

  const filteredDocuments = workflowItems.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.submittedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (doc.assignedTo && doc.assignedTo.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = filter === 'all' || doc.status === filter;
    
    const matchesDocumentType = documentTypeFilter === 'all' ||
      (documentTypeFilter === 'legal-text' && doc.documentType === 'legal-text') ||
      (documentTypeFilter === 'procedure' && doc.documentType === 'procedure');
    
    return matchesSearch && matchesStatus && matchesDocumentType;
  });

  const {
    currentData: paginatedDocuments,
    currentPage,
    totalPages,
    itemsPerPage,
    totalItems,
    setCurrentPage,
    setItemsPerPage
  } = usePagination({
    data: filteredDocuments,
    itemsPerPage: 10
  });

  const getStatistics = () => {
    return {
      total: workflowItems.length,
      pending: workflowItems.filter(d => d.status === 'pending').length,
      underReview: workflowItems.filter(d => d.status === 'under_review').length,
      approved: workflowItems.filter(d => d.status === 'approved').length,
      needsRevision: workflowItems.filter(d => d.status === 'needs_revision').length,
      rejected: workflowItems.filter(d => d.status === 'rejected').length
    };
  };

  const stats = getStatistics();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-800">Approuvé</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">En attente</Badge>;
      case 'under_review':
        return <Badge className="bg-blue-100 text-blue-800">En révision</Badge>;
      case 'needs_revision':
        return <Badge className="bg-orange-100 text-orange-800">À réviser</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800">Rejeté</Badge>;
      default:
        return <Badge>Inconnu</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Fil d'Approbation OCR-IA"
        description="Validation et approbation des documents traités par OCR-IA"
        icon={ClipboardList}
        iconColor="text-orange-600"
      />

      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <Card 
          className={`p-4 bg-gray-50 cursor-pointer hover:shadow-md transition-shadow ${
            filter === 'all' ? 'ring-2 ring-blue-500 shadow-md' : ''
          }`}
          onClick={() => setFilter('all')}
        >
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-700">{stats.total}</p>
            <p className="text-sm text-gray-600">Total</p>
          </div>
        </Card>
        <Card 
          className={`p-4 bg-yellow-50 border-yellow-200 cursor-pointer hover:shadow-md transition-shadow ${
            filter === 'pending' ? 'ring-2 ring-blue-500 shadow-md' : ''
          }`}
          onClick={() => setFilter('pending')}
        >
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-700">{stats.pending}</p>
            <p className="text-sm text-yellow-600">En attente</p>
          </div>
        </Card>
        <Card 
          className={`p-4 bg-blue-50 border-blue-200 cursor-pointer hover:shadow-md transition-shadow ${
            filter === 'under_review' ? 'ring-2 ring-blue-500 shadow-md' : ''
          }`}
          onClick={() => setFilter('under_review')}
        >
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-700">{stats.underReview}</p>
            <p className="text-sm text-blue-600">En révision</p>
          </div>
        </Card>
        <Card 
          className={`p-4 bg-green-50 border-green-200 cursor-pointer hover:shadow-md transition-shadow ${
            filter === 'approved' ? 'ring-2 ring-blue-500 shadow-md' : ''
          }`}
          onClick={() => setFilter('approved')}
        >
          <div className="text-center">
            <p className="text-2xl font-bold text-green-700">{stats.approved}</p>
            <p className="text-sm text-green-600">Approuvés</p>
          </div>
        </Card>
        <Card 
          className={`p-4 bg-orange-50 border-orange-200 cursor-pointer hover:shadow-md transition-shadow ${
            filter === 'needs_revision' ? 'ring-2 ring-blue-500 shadow-md' : ''
          }`}
          onClick={() => setFilter('needs_revision')}
        >
          <div className="text-center">
            <p className="text-2xl font-bold text-orange-700">{stats.needsRevision}</p>
            <p className="text-sm text-orange-600">À réviser</p>
          </div>
        </Card>
        <Card 
          className={`p-4 bg-red-50 border-red-200 cursor-pointer hover:shadow-md transition-shadow ${
            filter === 'rejected' ? 'ring-2 ring-blue-500 shadow-md' : ''
          }`}
          onClick={() => setFilter('rejected')}
        >
          <div className="text-center">
            <p className="text-2xl font-bold text-red-700">{stats.rejected}</p>
            <p className="text-sm text-red-600">Rejetés</p>
          </div>
        </Card>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Rechercher dans les documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <Select value={documentTypeFilter} onValueChange={(value: any) => setDocumentTypeFilter(value)}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Type de document" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les types</SelectItem>
              <SelectItem value="legal-text">Textes juridiques</SelectItem>
              <SelectItem value="procedure">Procédures</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          {paginatedDocuments.map((doc) => (
            <Card key={doc.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant={doc.documentType === 'legal-text' ? 'default' : 'secondary'}>
                        {doc.documentType === 'legal-text' ? 'Texte juridique' : 'Procédure'}
                      </Badge>
                      {getStatusBadge(doc.status)}
                      <Badge variant="outline" className={
                        doc.priority === 'high' ? 'border-red-200 text-red-700' :
                        doc.priority === 'medium' ? 'border-orange-200 text-orange-700' :
                        'border-gray-200 text-gray-700'
                      }>
                        {doc.priority === 'high' ? 'Priorité élevée' :
                         doc.priority === 'medium' ? 'Priorité moyenne' : 'Priorité faible'}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{doc.title}</CardTitle>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-medium">{doc.extractionConfidence}%</span>
                    </div>
                    <p className="text-xs text-gray-500">{doc.extractionDate}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-600">Soumis par :</span>
                      <p className="text-gray-800">{doc.submittedBy}</p>
                    </div>
                    {doc.assignedTo && (
                      <div>
                        <span className="font-medium text-gray-600">Assigné à :</span>
                        <p className="text-gray-800">{doc.assignedTo}</p>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-1" />
                      Examiner
                    </Button>
                    
                    {doc.status === 'pending' && (
                      <>
                        <Button variant="outline" size="sm" className="text-green-600 hover:text-green-700">
                          <ThumbsUp className="w-4 h-4 mr-1" />
                          Approuver
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                          <ThumbsDown className="w-4 h-4 mr-1" />
                          Rejeter
                        </Button>
                      </>
                    )}
                    
                    {doc.status === 'under_review' && (
                      <Button variant="outline" size="sm" className="text-blue-600 hover:text-blue-700">
                        <Edit className="w-4 h-4 mr-1" />
                        Réviser
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={setItemsPerPage}
        />
      </div>
    </div>
  );
}
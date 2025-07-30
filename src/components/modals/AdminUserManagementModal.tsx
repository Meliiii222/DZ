import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Users, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Shield, 
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Settings,
  UserPlus,
  Key
} from 'lucide-react';

interface AdminUserManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  lastLogin: string;
  permissions: string[];
  avatar: string;
  department: string;
}

export function AdminUserManagementModal({ isOpen, onClose }: AdminUserManagementModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: '',
    department: ''
  });

  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'Marie Dupont',
      email: 'marie.dupont@justice.gov.dz',
      role: 'Administrateur',
      status: 'active',
      lastLogin: '2024-01-15 14:30',
      permissions: ['read', 'write', 'admin', 'delete'],
      avatar: 'MD',
      department: 'Direction Juridique'
    },
    {
      id: '2',
      name: 'Ahmed Benali',
      email: 'ahmed.benali@justice.gov.dz',
      role: 'Éditeur',
      status: 'active',
      lastLogin: '2024-01-15 12:15',
      permissions: ['read', 'write'],
      avatar: 'AB',
      department: 'Service Législatif'
    },
    {
      id: '3',
      name: 'Fatima Khalil',
      email: 'fatima.khalil@justice.gov.dz',
      role: 'Lecteur',
      status: 'inactive',
      lastLogin: '2024-01-10 09:45',
      permissions: ['read'],
      avatar: 'FK',
      department: 'Archives'
    },
    {
      id: '4',
      name: 'Omar Zaidi',
      email: 'omar.zaidi@justice.gov.dz',
      role: 'Superviseur',
      status: 'pending',
      lastLogin: 'Jamais connecté',
      permissions: ['read', 'write', 'approve'],
      avatar: 'OZ',
      department: 'Contrôle Qualité'
    }
  ]);

  const roles = [
    { value: 'Administrateur', label: 'Administrateur', color: 'bg-red-100 text-red-800' },
    { value: 'Superviseur', label: 'Superviseur', color: 'bg-orange-100 text-orange-800' },
    { value: 'Éditeur', label: 'Éditeur', color: 'bg-blue-100 text-blue-800' },
    { value: 'Lecteur', label: 'Lecteur', color: 'bg-gray-100 text-gray-800' }
  ];

  const departments = [
    'Direction Juridique',
    'Service Législatif', 
    'Archives',
    'Contrôle Qualité',
    'Documentation',
    'Informatique'
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'inactive': return <XCircle className="w-4 h-4 text-red-500" />;
      case 'pending': return <Clock className="w-4 h-4 text-yellow-500" />;
      default: return null;
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-red-100 text-red-800',
      pending: 'bg-yellow-100 text-yellow-800'
    };
    return styles[status as keyof typeof styles] || 'bg-gray-100 text-gray-800';
  };

  const getRoleColor = (role: string) => {
    const roleObj = roles.find(r => r.value === role);
    return roleObj?.color || 'bg-gray-100 text-gray-800';
  };

  const handleAddUser = () => {
    if (newUser.name && newUser.email && newUser.role && newUser.department) {
      const user: User = {
        id: (users.length + 1).toString(),
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        status: 'pending',
        lastLogin: 'Jamais connecté',
        permissions: newUser.role === 'Administrateur' ? ['read', 'write', 'admin', 'delete'] :
                    newUser.role === 'Superviseur' ? ['read', 'write', 'approve'] :
                    newUser.role === 'Éditeur' ? ['read', 'write'] : ['read'],
        avatar: newUser.name.split(' ').map(n => n[0]).join('').toUpperCase(),
        department: newUser.department
      };
      
      setUsers([...users, user]);
      setNewUser({ name: '', email: '', role: '', department: '' });
      setShowAddUserForm(false);
    }
  };

  const handleToggleStatus = (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' as 'active' | 'inactive' | 'pending' }
        : user
    ));
  };

  const handleDeleteUser = (userId: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Gestion des utilisateurs
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="users" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="users">Utilisateurs</TabsTrigger>
            <TabsTrigger value="roles">Rôles & Permissions</TabsTrigger>
            <TabsTrigger value="security">Sécurité</TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-4">
            {/* Filtres et actions */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4 flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Rechercher un utilisateur..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-80"
                  />
                </div>
                
                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Tous les rôles" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les rôles</SelectItem>
                    {roles.map(role => (
                      <SelectItem key={role.value} value={role.value}>
                        {role.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Tous les statuts" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les statuts</SelectItem>
                    <SelectItem value="active">Actif</SelectItem>
                    <SelectItem value="inactive">Inactif</SelectItem>
                    <SelectItem value="pending">En attente</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={() => setShowAddUserForm(true)}>
                <UserPlus className="w-4 h-4 mr-2" />
                Ajouter un utilisateur
              </Button>
            </div>

            {/* Formulaire d'ajout d'utilisateur */}
            {showAddUserForm && (
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-4">Nouvel utilisateur</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      placeholder="Nom complet"
                      value={newUser.name}
                      onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                    />
                    <Input
                      placeholder="Email"
                      type="email"
                      value={newUser.email}
                      onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                    />
                    <Select value={newUser.role} onValueChange={(value) => setNewUser({...newUser, role: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un rôle" />
                      </SelectTrigger>
                      <SelectContent>
                        {roles.map(role => (
                          <SelectItem key={role.value} value={role.value}>
                            {role.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select value={newUser.department} onValueChange={(value) => setNewUser({...newUser, department: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un département" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map(dept => (
                          <SelectItem key={dept} value={dept}>
                            {dept}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex justify-end gap-2 mt-4">
                    <Button variant="outline" onClick={() => setShowAddUserForm(false)}>
                      Annuler
                    </Button>
                    <Button onClick={handleAddUser}>
                      Ajouter
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Liste des utilisateurs */}
            <div className="space-y-3">
              {filteredUsers.map((user) => (
                <Card key={user.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Avatar className="w-12 h-12 bg-blue-500 text-white">
                          {user.avatar}
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{user.name}</h3>
                          <p className="text-sm text-gray-600">{user.email}</p>
                          <p className="text-xs text-gray-500">{user.department}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <Badge className={`${getRoleColor(user.role)} mb-1`}>
                            {user.role}
                          </Badge>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(user.status)}
                            <Badge className={getStatusBadge(user.status)}>
                              {user.status === 'active' ? 'Actif' : 
                               user.status === 'inactive' ? 'Inactif' : 'En attente'}
                            </Badge>
                          </div>
                        </div>

                        <div className="text-right text-sm text-gray-500">
                          <p>Dernière connexion:</p>
                          <p>{user.lastLogin}</p>
                        </div>

                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleToggleStatus(user.id)}
                          >
                            {user.status === 'active' ? 
                              <XCircle className="w-4 h-4" /> : 
                              <CheckCircle className="w-4 h-4" />
                            }
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleDeleteUser(user.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="roles" className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Rôles et permissions</h3>
                <div className="grid grid-cols-2 gap-6">
                  {roles.map((role) => (
                    <div key={role.value} className="border rounded-lg p-4">
                      <Badge className={role.color}>{role.label}</Badge>
                      <div className="mt-3">
                        <h4 className="font-medium mb-2">Permissions:</h4>
                        <ul className="text-sm space-y-1">
                          {role.value === 'Administrateur' && (
                            <>
                              <li>• Gestion complète des utilisateurs</li>
                              <li>• Configuration système</li>
                              <li>• Accès à toutes les données</li>
                              <li>• Sauvegarde et restauration</li>
                            </>
                          )}
                          {role.value === 'Superviseur' && (
                            <>
                              <li>• Approbation des contenus</li>
                              <li>• Gestion des équipes</li>
                              <li>• Rapports avancés</li>
                              <li>• Modération du contenu</li>
                            </>
                          )}
                          {role.value === 'Éditeur' && (
                            <>
                              <li>• Création de contenu</li>
                              <li>• Modification des textes</li>
                              <li>• Gestion des documents</li>
                              <li>• Soumission pour approbation</li>
                            </>
                          )}
                          {role.value === 'Lecteur' && (
                            <>
                              <li>• Consultation du contenu</li>
                              <li>• Recherche avancée</li>
                              <li>• Téléchargement des documents</li>
                              <li>• Favoris et annotations</li>
                            </>
                          )}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Paramètres de sécurité</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Authentification à deux facteurs</h4>
                      <p className="text-sm text-gray-600">Obligatoire pour les administrateurs</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Activé</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Complexité des mots de passe</h4>
                      <p className="text-sm text-gray-600">Minimum 12 caractères avec caractères spéciaux</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Activé</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Timeout de session</h4>
                      <p className="text-sm text-gray-600">Déconnexion automatique après 30 minutes d'inactivité</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">30 min</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
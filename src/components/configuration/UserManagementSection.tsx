import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Pagination } from "@/components/common/Pagination";
import { usePagination } from "@/hooks/usePagination";
import { useState, useMemo } from "react";
import { 
  Users, 
  UserPlus, 
  Shield, 
  Key, 
  Search,
  Plus,
  Edit,
  Trash2,
  Settings,
  Calendar,
  Clock
} from "lucide-react";
import { UserManagementModal } from "@/components/modals/UserManagementModal";
import { NewRoleModal } from "@/components/modals/NewRoleModal";
import { NewPermissionModal } from "@/components/modals/NewPermissionModal";

interface UserManagementSectionProps {
  language?: string;
}

export function UserManagementSection({ language = "fr" }: UserManagementSectionProps) {
  const [usersFilter, setUsersFilter] = useState("");
  const [rolesFilter, setRolesFilter] = useState("");
  const [permissionsFilter, setPermissionsFilter] = useState("");
  const [sessionsFilter, setSessionsFilter] = useState("");

  // Modal states
  const [userModalOpen, setUserModalOpen] = useState(false);
  const [roleModalOpen, setRoleModalOpen] = useState(false);
  const [permissionModalOpen, setPermissionModalOpen] = useState(false);

  const allUsers = [
    { name: "Ahmed Benali", email: "ahmed.benali@justice.dz", role: "Administrateur", status: "Actif", lastLogin: "2025-01-02 14:30", department: "Justice" },
    { name: "Fatima Khelifi", email: "fatima.khelifi@interieur.dz", role: "Gestionnaire", status: "Actif", lastLogin: "2025-01-02 10:15", department: "Intérieur" },
    { name: "Mohamed Meziane", email: "mohamed.meziane@finances.dz", role: "Juriste", status: "Actif", lastLogin: "2025-01-01 16:45", department: "Finances" },
    { name: "Aicha Brahimi", email: "aicha.brahimi@commerce.dz", role: "Consultant", status: "Inactif", lastLogin: "2024-12-30 09:20", department: "Commerce" },
    { name: "Karim Benaissa", email: "karim.benaissa@travail.dz", role: "Valideur", status: "Actif", lastLogin: "2025-01-02 08:45", department: "Travail" },
    { name: "Samira Belarbi", email: "samira.belarbi@sante.dz", role: "Lecteur", status: "Actif", lastLogin: "2025-01-01 13:20", department: "Santé" },
    { name: "Omar Khadra", email: "omar.khadra@education.dz", role: "Gestionnaire", status: "Suspendu", lastLogin: "2024-12-28 11:30", department: "Éducation" },
    { name: "Nadia Saidi", email: "nadia.saidi@pm.dz", role: "Administrateur", status: "Actif", lastLogin: "2025-01-02 15:10", department: "Premier Ministère" }
  ];

  const filteredUsers = useMemo(() => 
    allUsers.filter(user => 
      user.name.toLowerCase().includes(usersFilter.toLowerCase()) ||
      user.email.toLowerCase().includes(usersFilter.toLowerCase()) ||
      user.role.toLowerCase().includes(usersFilter.toLowerCase()) ||
      user.department.toLowerCase().includes(usersFilter.toLowerCase())
    ), [allUsers, usersFilter]
  );

  // Pagination pour les utilisateurs
  const {
    currentData: paginatedUsers,
    currentPage: usersCurrentPage,
    totalPages: usersTotalPages,
    itemsPerPage: usersItemsPerPage,
    totalItems: usersTotalItems,
    setCurrentPage: setUsersCurrentPage,
    setItemsPerPage: setUsersItemsPerPage
  } = usePagination({
    data: filteredUsers,
    itemsPerPage: 10
  });

  const roles = [
    { name: "Administrateur", users: 15, permissions: 45, description: "Accès complet au système", status: "Actif" },
    { name: "Gestionnaire", users: 89, permissions: 32, description: "Gestion des contenus et utilisateurs", status: "Actif" },
    { name: "Juriste", users: 234, permissions: 28, description: "Consultation et analyse juridique", status: "Actif" },
    { name: "Valideur", users: 67, permissions: 18, description: "Validation des documents", status: "Actif" },
    { name: "Consultant", users: 123, permissions: 15, description: "Consultation en lecture seule", status: "Actif" },
    { name: "Lecteur", users: 456, permissions: 8, description: "Lecture des documents publics", status: "Actif" },
    { name: "Archiviste", users: 23, permissions: 12, description: "Gestion des archives", status: "Inactif" },
    { name: "Support", users: 12, permissions: 22, description: "Support technique et assistance", status: "Actif" },
    { name: "Modérateur", users: 34, permissions: 20, description: "Modération du contenu", status: "Actif" },
    { name: "Analyste", users: 78, permissions: 25, description: "Analyse des données", status: "Actif" },
    { name: "Auditeur", users: 45, permissions: 15, description: "Audit et contrôle", status: "Actif" },
    { name: "Formateur", users: 28, permissions: 18, description: "Formation des utilisateurs", status: "Actif" }
  ].filter(role => 
    role.name.toLowerCase().includes(rolesFilter.toLowerCase()) ||
    role.description.toLowerCase().includes(rolesFilter.toLowerCase())
  );

  const permissions = [
    { name: "Consulter Textes", category: "Lecture", users: 1250, description: "Lecture des textes juridiques" },
    { name: "Modifier Textes", category: "Écriture", users: 234, description: "Modification des textes juridiques" },
    { name: "Publier Textes", category: "Publication", users: 45, description: "Publication des textes juridiques" },
    { name: "Gérer Utilisateurs", category: "Administration", users: 23, description: "Gestion des comptes utilisateurs" },
    { name: "Configurer Système", category: "Administration", users: 12, description: "Configuration du système" },
    { name: "Consulter Statistiques", category: "Analyse", users: 156, description: "Accès aux statistiques" },
    { name: "Exporter Données", category: "Export", users: 89, description: "Export des données" },
    { name: "Gérer Procédures", category: "Procédures", users: 345, description: "Gestion des procédures administratives" },
    { name: "Gérer Alertes", category: "Notifications", users: 67, description: "Gestion des alertes et notifications" },
    { name: "Consulter Logs", category: "Audit", users: 34, description: "Consultation des logs système" },
    { name: "Gérer Sauvegardes", category: "Administration", users: 8, description: "Gestion des sauvegardes" },
    { name: "Approuver Documents", category: "Validation", users: 123, description: "Approbation des documents" }
  ].filter(permission => 
    permission.name.toLowerCase().includes(permissionsFilter.toLowerCase()) ||
    permission.category.toLowerCase().includes(permissionsFilter.toLowerCase())
  );

  const activeSessions = [
    { user: "Ahmed Benali", ip: "192.168.1.100", device: "Chrome/Windows", location: "Alger", start: "14:30", duration: "2h15m", status: "Active" },
    { user: "Fatima Khelifi", ip: "192.168.1.101", device: "Firefox/Linux", location: "Oran", start: "10:15", duration: "5h45m", status: "Active" },
    { user: "Mohamed Meziane", ip: "10.0.0.25", device: "Safari/macOS", location: "Constantine", start: "16:45", duration: "45m", status: "Active" },
    { user: "Karim Benaissa", ip: "172.16.0.50", device: "Edge/Windows", location: "Annaba", start: "08:45", duration: "7h15m", status: "Active" },
    { user: "Samira Belarbi", ip: "192.168.2.75", device: "Chrome/Android", location: "Sétif", start: "13:20", duration: "2h40m", status: "Idle" },
    { user: "Nadia Saidi", ip: "10.1.0.100", device: "Firefox/Windows", location: "Alger", start: "15:10", duration: "50m", status: "Active" },
    { user: "Omar Khadra", ip: "192.168.1.102", device: "Chrome/Linux", location: "Oran", start: "12:00", duration: "3h30m", status: "Active" },
    { user: "Aicha Brahimi", ip: "10.0.0.26", device: "Safari/Windows", location: "Constantine", start: "09:30", duration: "6h20m", status: "Active" },
    { user: "Youssef Mansouri", ip: "172.16.0.51", device: "Edge/macOS", location: "Annaba", start: "11:15", duration: "4h45m", status: "Idle" },
    { user: "Leila Hamidi", ip: "192.168.2.76", device: "Firefox/Android", location: "Sétif", start: "08:20", duration: "8h10m", status: "Active" },
    { user: "Hassan Boudiaf", ip: "10.1.0.101", device: "Chrome/Windows", location: "Alger", start: "13:45", duration: "1h25m", status: "Active" },
    { user: "Zineb Merabet", ip: "192.168.1.103", device: "Safari/Linux", location: "Oran", start: "10:00", duration: "5h15m", status: "Active" }
  ].filter(session => 
    session.user.toLowerCase().includes(sessionsFilter.toLowerCase()) ||
    session.location.toLowerCase().includes(sessionsFilter.toLowerCase()) ||
    session.device.toLowerCase().includes(sessionsFilter.toLowerCase())
  );

  // Pagination pour les rôles
  const {
    currentData: paginatedRoles,
    currentPage: rolesCurrentPage,
    totalPages: rolesTotalPages,
    itemsPerPage: rolesItemsPerPage,
    totalItems: rolesTotalItems,
    setCurrentPage: setRolesCurrentPage,
    setItemsPerPage: setRolesItemsPerPage
  } = usePagination({
    data: roles,
    itemsPerPage: 10
  });

  // Pagination pour les permissions
  const {
    currentData: paginatedPermissions,
    currentPage: permissionsCurrentPage,
    totalPages: permissionsTotalPages,
    itemsPerPage: permissionsItemsPerPage,
    totalItems: permissionsTotalItems,
    setCurrentPage: setPermissionsCurrentPage,
    setItemsPerPage: setPermissionsItemsPerPage
  } = usePagination({
    data: permissions,
    itemsPerPage: 10
  });

  // Pagination pour les sessions
  const {
    currentData: paginatedSessions,
    currentPage: sessionsCurrentPage,
    totalPages: sessionsTotalPages,
    itemsPerPage: sessionsItemsPerPage,
    totalItems: sessionsTotalItems,
    setCurrentPage: setSessionsCurrentPage,
    setItemsPerPage: setSessionsItemsPerPage
  } = usePagination({
    data: activeSessions,
    itemsPerPage: 10
  });

  // Handler functions
  const handleSaveUser = (userData: Record<string, unknown>) => {
    console.log('Nouvel utilisateur créé:', userData);
  };

  const handleSaveRole = (roleData: Record<string, unknown>) => {
    console.log('Nouveau rôle créé:', roleData);
  };

  const handleSavePermission = (permissionData: Record<string, unknown>) => {
    console.log('Nouvelle permission créée:', permissionData);
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="users" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="users">Utilisateurs</TabsTrigger>
          <TabsTrigger value="roles">Rôles</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
          <TabsTrigger value="sessions">Sessions</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Rechercher un utilisateur..."
                className="pl-10"
                value={usersFilter}
                onChange={(e) => setUsersFilter(e.target.value)}
              />
            </div>
            <Button className="ml-4" onClick={() => setUserModalOpen(true)}>
              <UserPlus className="w-4 h-4 mr-2" />
              Nouvel Utilisateur
            </Button>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {paginatedUsers.map((user, index) => (
                <Card key={index}>
                  <CardContent className="pt-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-semibold text-gray-900">{user.name}</h4>
                          <p className="text-sm text-gray-600">{user.email}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline">{user.role}</Badge>
                            <Badge variant="outline">{user.department}</Badge>
                            <Badge className={
                              user.status === 'Actif' ? 'bg-green-100 text-green-800' :
                              user.status === 'Inactif' ? 'bg-gray-100 text-gray-800' :
                              'bg-red-100 text-red-800'
                            }>
                              {user.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">Dernière connexion</p>
                        <p className="text-sm font-medium">{user.lastLogin}</p>
                        <div className="flex gap-2 mt-2">
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Settings className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination pour les utilisateurs */}
            {filteredUsers.length > 0 && (
              <div className="mt-6">
                <Pagination
                  currentPage={usersCurrentPage}
                  totalPages={usersTotalPages}
                  totalItems={usersTotalItems}
                  itemsPerPage={usersItemsPerPage}
                  onPageChange={setUsersCurrentPage}
                  onItemsPerPageChange={setUsersItemsPerPage}
                />
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="roles" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Rechercher un rôle..."
                className="pl-10"
                value={rolesFilter}
                onChange={(e) => setRolesFilter(e.target.value)}
              />
            </div>
            <Button className="ml-4" onClick={() => setRoleModalOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Nouveau Rôle
            </Button>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {paginatedRoles.map((role, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Shield className="w-5 h-5 text-blue-600" />
                        <h4 className="font-semibold text-gray-900">{role.name}</h4>
                        <Badge className={role.status === 'Actif' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                          {role.status}
                        </Badge>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">{role.description}</p>
                      <div className="flex gap-4 text-sm text-gray-500">
                        <span>{role.users} utilisateurs</span>
                        <span>{role.permissions} permissions</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Key className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            </div>
          </div>
          
          {/* Pagination pour les rôles */}
          <Pagination
            currentPage={rolesCurrentPage}
            totalPages={rolesTotalPages}
            totalItems={rolesTotalItems}
            itemsPerPage={rolesItemsPerPage}
            onPageChange={setRolesCurrentPage}
            onItemsPerPageChange={setRolesItemsPerPage}
          />
        </TabsContent>

        <TabsContent value="permissions" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Rechercher une permission..."
                className="pl-10"
                value={permissionsFilter}
                onChange={(e) => setPermissionsFilter(e.target.value)}
              />
            </div>
            <Button className="ml-4" onClick={() => setPermissionModalOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Nouvelle Permission
            </Button>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {paginatedPermissions.map((permission, index) => (
                <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Key className="w-5 h-5 text-orange-600" />
                        <h4 className="font-semibold text-gray-900">{permission.name}</h4>
                        <Badge variant="outline">{permission.category}</Badge>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">{permission.description}</p>
                      <p className="text-xs text-gray-500">{permission.users} utilisateurs affectés</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Users className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            </div>
          </div>
          
          {/* Pagination pour les permissions */}
          <Pagination
            currentPage={permissionsCurrentPage}
            totalPages={permissionsTotalPages}
            totalItems={permissionsTotalItems}
            itemsPerPage={permissionsItemsPerPage}
            onPageChange={setPermissionsCurrentPage}
            onItemsPerPageChange={setPermissionsItemsPerPage}
          />
        </TabsContent>

        <TabsContent value="sessions" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Rechercher une session..."
                className="pl-10"
                value={sessionsFilter}
                onChange={(e) => setSessionsFilter(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Calendar className="w-4 h-4 mr-2" />
                Filtrer par date
              </Button>
              <Button variant="destructive">
                Fermer toutes les sessions
              </Button>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {paginatedSessions.map((session, index) => (
              <Card key={index}>
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarFallback>{session.user.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold text-gray-900">{session.user}</h4>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span>{session.device}</span>
                          <span>{session.ip}</span>
                          <span>{session.location}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-500">Débuté à {session.start} - Durée: {session.duration}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={session.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                        {session.status}
                      </Badge>
                      <div className="flex gap-2 mt-2">
                        <Button variant="outline" size="sm">
                          Détails
                        </Button>
                        <Button variant="destructive" size="sm">
                          Fermer
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            </div>
          </div>
          
          {/* Pagination pour les sessions */}
          <Pagination
            currentPage={sessionsCurrentPage}
            totalPages={sessionsTotalPages}
            totalItems={sessionsTotalItems}
            itemsPerPage={sessionsItemsPerPage}
            onPageChange={setSessionsCurrentPage}
            onItemsPerPageChange={setSessionsItemsPerPage}
          />
        </TabsContent>
      </Tabs>

      {/* Modals */}
      <UserManagementModal
        isOpen={userModalOpen}
        onClose={() => setUserModalOpen(false)}
        action="create"
        onSave={handleSaveUser}
      />

      <NewRoleModal
        isOpen={roleModalOpen}
        onClose={() => setRoleModalOpen(false)}
        onSave={handleSaveRole}
      />

      <NewPermissionModal
        isOpen={permissionModalOpen}
        onClose={() => setPermissionModalOpen(false)}
        onSave={handleSavePermission}
      />
    </div>
  );
}

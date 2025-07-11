//src/features/admin/components/UserManager.tsx
'use client'

import { useState } from 'react'
import {
    MoreVertical,
    Edit,
    Trash2,
    Mail,
    Shield,
    User,
    Crown,
    Eye,
    Ban,
    CheckCircle,
    Search,
    Filter,
    UserPlus,
    Download
} from 'lucide-react'

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { formatDate, getInitials } from '@/shared/lib/utils'
import { useToast } from '@/shared/hooks/use-toast'

type UserRole = 'USER' | 'EDITOR' | 'ADMIN';

interface User {
    id: string
    email: string
    name?: string
    avatar?: string
    role: 'USER' | 'EDITOR' | 'ADMIN'
    isActive: boolean
    createdAt: Date
    lastLoginAt?: Date
    subscription?: {
        plan: 'FREE' | 'PREMIUM' | 'ENTERPRISE'
        status: 'ACTIVE' | 'INACTIVE' | 'CANCELED'
    }
    stats: {
        articlesRead: number
        favoriteCount: number
        subscriptionDays: number
    }
}

interface UserManagerProps {
    users: User[]
    onRefresh?: () => void
}

const getRoleColor = (role: string) => {
    switch (role) {
        case 'ADMIN':
            return 'bg-red-100 text-red-800 border-red-200'
        case 'EDITOR':
            return 'bg-blue-100 text-blue-800 border-blue-200'
        default:
            return 'bg-gray-100 text-gray-800 border-gray-200'
    }
}

const getRoleIcon = (role: string) => {
    switch (role) {
        case 'ADMIN':
            return Shield
        case 'EDITOR':
            return Edit
        default:
            return User
    }
}

const getPlanColor = (plan?: string) => {
    switch (plan) {
        case 'ENTERPRISE':
            return 'bg-purple-100 text-purple-800 border-purple-200'
        case 'PREMIUM':
            return 'bg-yellow-100 text-yellow-800 border-yellow-200'
        default:
            return 'bg-gray-100 text-gray-800 border-gray-200'
    }
}

export function UserManager({ users: initialUsers }: UserManagerProps) {
    const { toast } = useToast()
    const [users, setUsers] = useState(initialUsers)
    const [loadingId, setLoadingId] = useState<string | null>(null)


    // Filtres
    const [searchTerm, setSearchTerm] = useState('')
    const [roleFilter, setRoleFilter] = useState<string>('all')
    const [statusFilter, setStatusFilter] = useState<string>('all')
    const [planFilter, setPlanFilter] = useState<string>('all')

    // Filtrage des utilisateurs
    const filteredUsers = users.filter(user => {
        const matchesSearch = user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.name?.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesRole = roleFilter === 'all' || user.role === roleFilter
        const matchesStatus = statusFilter === 'all' ||
            (statusFilter === 'active' && user.isActive) ||
            (statusFilter === 'inactive' && !user.isActive)
        const matchesPlan = planFilter === 'all' || user.subscription?.plan === planFilter

        return matchesSearch && matchesRole && matchesStatus && matchesPlan
    })

    const handleToggleStatus = async (userId: string, currentStatus: boolean) => {
        try {
            setLoadingId(userId)
            const response = await fetch(`/api/admin/users/${userId}/toggle-status`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ isActive: !currentStatus })
            })

            if (!response.ok) throw new Error('Erreur lors de la mise à jour')

            setUsers(users.map(user =>
                user.id === userId
                    ? { ...user, isActive: !currentStatus }
                    : user
            ))

            toast({
                title: !currentStatus ? 'Utilisateur activé' : 'Utilisateur désactivé',
                description: `L'utilisateur a été ${!currentStatus ? 'activé' : 'désactivé'} avec succès`,
            })
        } catch  {
            toast({
                title: 'Erreur',
                description: 'Impossible de modifier le statut de l\'utilisateur',
                variant: 'destructive',
            })
        } finally {
            setLoadingId(null)
        }
    }

    const handleChangeRole = async (userId: string, newRole: string) => {
        try {
            setLoadingId(userId)
            const response = await fetch(`/api/admin/users/${userId}/role`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ role: newRole })
            })

            if (!response.ok) throw new Error('Erreur lors de la mise à jour')

            setUsers(users.map(user =>
                user.id === userId
                    ? { ...user, role: newRole as UserRole }
                    : user
            ))

            toast({
                title: 'Rôle modifié',
                description: 'Le rôle de l\'utilisateur a été modifié avec succès',
            })
        } catch  {
            toast({
                title: 'Erreur',
                description: 'Impossible de modifier le rôle de l\'utilisateur',
                variant: 'destructive',
            })
        } finally {
            setLoadingId(null)
        }
    }

    const handleDeleteUser = async (userId: string, userEmail: string) => {
        if (!confirm(`Êtes-vous sûr de vouloir supprimer l'utilisateur ${userEmail} ?`)) {
            return
        }

        try {
            setLoadingId(userId)
            const response = await fetch(`/api/admin/users/${userId}`, {
                method: 'DELETE'
            })

            if (!response.ok) throw new Error('Erreur lors de la suppression')

            setUsers(users.filter(user => user.id !== userId))

            toast({
                title: 'Utilisateur supprimé',
                description: 'L\'utilisateur a été supprimé avec succès',
            })
        } catch  {
            toast({
                title: 'Erreur',
                description: 'Impossible de supprimer l\'utilisateur',
                variant: 'destructive',
            })
        } finally {
            setLoadingId(null)
        }
    }

    const exportUsers = () => {
        const csvContent = [
            'Email,Nom,Rôle,Statut,Plan,Articles lus,Favoris,Date création',
            ...filteredUsers.map(user => [
                user.email,
                user.name || '',
                user.role,
                user.isActive ? 'Actif' : 'Inactif',
                user.subscription?.plan || 'FREE',
                user.stats.articlesRead,
                user.stats.favoriteCount,
                formatDate(user.createdAt)
            ].join(','))
        ].join('\n')

        const blob = new Blob([csvContent], { type: 'text/csv' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `utilisateurs-${new Date().toISOString().split('T')[0]}.csv`
        a.click()
        URL.revokeObjectURL(url)
    }

    return (
        <div className="space-y-6">
            {/* Filtres et actions */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Filter className="h-5 w-5" />
                        Filtres et actions
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col lg:flex-row gap-4">
                        {/* Recherche */}
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Rechercher par email ou nom..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                        </div>

                        {/* Filtres */}
                        <Select value={roleFilter} onValueChange={setRoleFilter}>
                            <SelectTrigger className="w-full lg:w-48">
                                <SelectValue placeholder="Rôle" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Tous les rôles</SelectItem>
                                <SelectItem value="USER">Utilisateur</SelectItem>
                                <SelectItem value="EDITOR">Éditeur</SelectItem>
                                <SelectItem value="ADMIN">Administrateur</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-full lg:w-48">
                                <SelectValue placeholder="Statut" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Tous les statuts</SelectItem>
                                <SelectItem value="active">Actifs</SelectItem>
                                <SelectItem value="inactive">Inactifs</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select value={planFilter} onValueChange={setPlanFilter}>
                            <SelectTrigger className="w-full lg:w-48">
                                <SelectValue placeholder="Plan" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Tous les plans</SelectItem>
                                <SelectItem value="FREE">Gratuit</SelectItem>
                                <SelectItem value="PREMIUM">Premium</SelectItem>
                                <SelectItem value="ENTERPRISE">Entreprise</SelectItem>
                            </SelectContent>
                        </Select>

                        {/* Actions */}
                        <div className="flex gap-2">
                            <Button variant="outline" onClick={exportUsers}>
                                <Download className="h-4 w-4 mr-2" />
                                Exporter
                            </Button>
                            <Button>
                                <UserPlus className="h-4 w-4 mr-2" />
                                Inviter
                            </Button>
                        </div>
                    </div>

                    <div className="mt-4 text-sm text-muted-foreground">
                        {filteredUsers.length} utilisateur{filteredUsers.length > 1 ? 's' : ''} trouvé{filteredUsers.length > 1 ? 's' : ''}
                    </div>
                </CardContent>
            </Card>

            {/* Tableau des utilisateurs */}
            <Card>
                <CardContent className="p-0">
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Utilisateur</TableHead>
                                    <TableHead>Rôle</TableHead>
                                    <TableHead>Plan</TableHead>
                                    <TableHead>Statut</TableHead>
                                    <TableHead>Activité</TableHead>
                                    <TableHead>Inscrit le</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredUsers.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                                            Aucun utilisateur trouvé
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredUsers.map((user) => {
                                        const RoleIcon = getRoleIcon(user.role)

                                        return (
                                            <TableRow key={user.id}>
                                                <TableCell>
                                                    <div className="flex items-center gap-3">
                                                        <Avatar className="h-8 w-8">
                                                            <AvatarImage src={user.avatar} />
                                                            <AvatarFallback className="text-xs">
                                                                {getInitials(user.name || user.email)}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <div>
                                                            <p className="font-medium">{user.name || 'Sans nom'}</p>
                                                            <p className="text-sm text-muted-foreground">{user.email}</p>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant="outline" className={getRoleColor(user.role)}>
                                                        <RoleIcon className="h-3 w-3 mr-1" />
                                                        {user.role === 'ADMIN' ? 'Admin' :
                                                            user.role === 'EDITOR' ? 'Éditeur' : 'Utilisateur'}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant="outline" className={getPlanColor(user.subscription?.plan)}>
                                                        {user.subscription?.plan === 'ENTERPRISE' && <Crown className="h-3 w-3 mr-1" />}
                                                        {user.subscription?.plan || 'FREE'}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant={user.isActive ? 'default' : 'secondary'}>
                                                        {user.isActive ? (
                                                            <>
                                                                <CheckCircle className="h-3 w-3 mr-1" />
                                                                Actif
                                                            </>
                                                        ) : (
                                                            <>
                                                                <Ban className="h-3 w-3 mr-1" />
                                                                Inactif
                                                            </>
                                                        )}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="text-sm">
                                                        <div>{user.stats.articlesRead} articles lus</div>
                                                        <div className="text-muted-foreground">
                                                            {user.stats.favoriteCount} favoris
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="text-sm">
                                                        <div>{formatDate(user.createdAt)}</div>
                                                        {user.lastLoginAt && (
                                                            <div className="text-muted-foreground">
                                                                Dernière connexion: {formatDate(user.lastLoginAt)}
                                                            </div>
                                                        )}
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                disabled={loadingId === user.id}
                                                            >
                                                                <MoreVertical className="h-4 w-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuItem>
                                                                <Eye className="mr-2 h-4 w-4" />
                                                                Voir le profil
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem>
                                                                <Mail className="mr-2 h-4 w-4" />
                                                                Envoyer un email
                                                            </DropdownMenuItem>

                                                            <DropdownMenuSeparator />

                                                            <DropdownMenuItem
                                                                onClick={() => handleToggleStatus(user.id, user.isActive)}
                                                            >
                                                                {user.isActive ? (
                                                                    <>
                                                                        <Ban className="mr-2 h-4 w-4" />
                                                                        Désactiver
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <CheckCircle className="mr-2 h-4 w-4" />
                                                                        Activer
                                                                    </>
                                                                )}
                                                            </DropdownMenuItem>

                                                            {user.role !== 'ADMIN' && (
                                                                <DropdownMenuItem
                                                                    onClick={() => handleChangeRole(
                                                                        user.id,
                                                                        user.role === 'USER' ? 'EDITOR' : 'USER'
                                                                    )}
                                                                >
                                                                    <Shield className="mr-2 h-4 w-4" />
                                                                    {user.role === 'USER' ? 'Promouvoir éditeur' : 'Rétrograder utilisateur'}
                                                                </DropdownMenuItem>
                                                            )}

                                                            <DropdownMenuSeparator />

                                                            <DropdownMenuItem
                                                                onClick={() => handleDeleteUser(user.id, user.email)}
                                                                className="text-red-600 focus:text-red-600"
                                                            >
                                                                <Trash2 className="mr-2 h-4 w-4" />
                                                                Supprimer
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { User, Mail, Calendar, Shield } from 'lucide-react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { formatDate, getInitials } from '@/shared/lib/utils'
import { EditProfileDialog } from './EditProfileDialog'

interface UserProfileProps {
    user: {
        id: string
        email: string
        name: string | null
        avatar: string | null
        role: string
        createdAt: Date
        subscription: {
            plan: string
            status: string
        } | null
    }
}

export function UserProfile({ user }: UserProfileProps) {
    const [isEditOpen, setIsEditOpen] = useState(false)
    const router = useRouter()

    const handleEditSuccess = () => {
        setIsEditOpen(false)
        router.refresh()
    }

    return (
        <>
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>Informations personnelles</CardTitle>
                            <CardDescription>
                                Vos informations de compte et de profil
                            </CardDescription>
                        </div>
                        <Button variant="outline" onClick={() => setIsEditOpen(true)}>
                            Modifier
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Avatar et nom */}
                    <div className="flex items-center gap-4">
                        <Avatar className="h-20 w-20">
                            <AvatarImage src={user.avatar || undefined} />
                            <AvatarFallback className="text-lg">
                                {getInitials(user.name || user.email)}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <h3 className="text-xl font-semibold">
                                {user.name || 'Utilisateur'}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                Membre depuis {formatDate(user.createdAt, { month: 'long', year: 'numeric' })}
                            </p>
                        </div>
                    </div>

                    {/* Informations détaillées */}
                    <div className="grid gap-4">
                        <div className="flex items-center gap-3">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <div>
                                <p className="text-sm font-medium">Email</p>
                                <p className="text-sm text-muted-foreground">{user.email}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <div>
                                <p className="text-sm font-medium">Nom</p>
                                <p className="text-sm text-muted-foreground">
                                    {user.name || 'Non renseigné'}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <Shield className="h-4 w-4 text-muted-foreground" />
                            <div>
                                <p className="text-sm font-medium">Rôle</p>
                                <Badge variant="outline" className="mt-1">
                                    {user.role === 'ADMIN' ? 'Administrateur' :
                                        user.role === 'EDITOR' ? 'Éditeur' : 'Utilisateur'}
                                </Badge>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <div>
                                <p className="text-sm font-medium">Date d&#39;inscription</p>
                                <p className="text-sm text-muted-foreground">
                                    {formatDate(user.createdAt)}
                                </p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <EditProfileDialog
                user={user}
                open={isEditOpen}
                onOpenChange={setIsEditOpen}
                onSuccess={handleEditSuccess}
            />
        </>
    )
}
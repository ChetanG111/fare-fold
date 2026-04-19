import { auth } from '@/lib/auth/auth'
import { db } from '@/database'
import { user } from '@/database/schema'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { desc } from 'drizzle-orm'

export default async function AdminUsersPage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    })

    if (!session || session.user.role !== 'admin') {
        redirect('/')
    }

    // Fetch users
    const users = await db.select().from(user).orderBy(desc(user.createdAt)).limit(50)

    return (
        <div className="flex flex-1 flex-col gap-4">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight">Users</h1>
            </div>
            <div className="rounded-md border bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[80px]"></TableHead>
                            <TableHead>User</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Joined</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map((u) => (
                            <TableRow key={u.id}>
                                <TableCell>
                                    <Avatar className="h-9 w-9">
                                        <AvatarImage src={u.image || ''} alt={u.name} />
                                        <AvatarFallback>{u.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                </TableCell>
                                <TableCell>
                                    <div className="flex flex-col">
                                        <span className="font-medium">{u.name}</span>
                                        <span className="text-xs text-muted-foreground">{u.email}</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant={u.role === 'admin' ? 'default' : 'secondary'}>
                                        {u.role}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    {u.createdAt.toLocaleDateString()}
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="sm">Edit</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

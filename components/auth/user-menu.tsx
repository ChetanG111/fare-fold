'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { LogOut, Settings, User } from 'lucide-react'
import { signOut } from '@/lib/auth/auth-client'
import { useRouter } from 'next/navigation'
import { removeFirebaseSession } from '@/app/actions/auth-actions'

interface UserMenuProps {
  user: {
    name?: string | null
    email?: string | null
    image?: string | null
  }
}

export function UserMenu({ user }: UserMenuProps) {
  const router = useRouter()
  const initials = user.name
    ? user.name.split(' ').map(n => n[0]).join('').toUpperCase()
    : user.email ? user.email[0].toUpperCase() : 'U'

  const handleSignOut = async () => {
    // Sign out from Better-Auth
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/login')
        }
      }
    })
    
    // Also clear Firebase session
    await removeFirebaseSession()
    router.refresh()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="relative h-9 w-9 rounded-full outline-none hover:ring-2 hover:ring-primary/20 transition-all focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 overflow-hidden border border-border/50">
          <Avatar className="h-full w-full">
            <AvatarImage src={user.image || undefined} alt={user.name || 'User'} />
            <AvatarFallback className="bg-primary/5 text-primary text-xs font-semibold">{initials}</AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 p-1" align="end" forceMount>
        <DropdownMenuLabel className="font-normal p-2">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-semibold leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground truncate">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => router.push('/dashboard/profile')} className="cursor-pointer py-2">
            <User className="mr-3 h-4 w-4" />
            <span className="font-medium">Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push('/dashboard/settings')} className="cursor-pointer py-2">
            <Settings className="mr-3 h-4 w-4" />
            <span className="font-medium">Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut} className="text-red-600 focus:text-white focus:bg-red-600 cursor-pointer py-2">
          <LogOut className="mr-3 h-4 w-4" />
          <span className="font-medium">Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link'

interface UserMenuProps {
  user: {
    name?: string | null
    email?: string | null
    image?: string | null
  }
}

export function UserMenu({ user }: UserMenuProps) {
  const initials = user.name
    ? user.name.split(' ').map(n => n[0]).join('').toUpperCase()
    : user.email ? user.email[0].toUpperCase() : 'U'

  return (
    <Link 
      href="/dashboard/settings" 
      className="relative h-9 w-9 rounded-full outline-none hover:ring-2 hover:ring-primary/20 transition-all focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 overflow-hidden border border-border/50 block"
      title="Settings & Profile"
    >
      <Avatar className="h-full w-full">
        <AvatarImage src={user.image || undefined} alt={user.name || 'User'} />
        <AvatarFallback className="bg-primary/5 text-primary text-xs font-semibold">{initials}</AvatarFallback>
      </Avatar>
    </Link>
  )
}

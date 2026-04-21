# User Profile Menu Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a user profile menu with an avatar to the application header to indicate the user is logged in and provide quick access to settings and sign out.

**Architecture:** Create a `UserMenu` client component using Radix UI (via Shadcn/UI) `DropdownMenu` and `Avatar`. Pass session data from the server-side layout.

**Tech Stack:** Next.js, Radix UI, Lucide Icons, Better-Auth, Firebase.

---

### Task 1: Commit Existing Changes

**Files:**
- Commit: All pending changes

**Step 1: Stage all changes**
Run: `git add .`

**Step 2: Commit changes**
Run: `git commit -m "feat: integrate firebase authentication and update social login flows"`

---

### Task 3: Create UserMenu Component

**Files:**
- Create: `components/auth/user-menu.tsx`

**Step 1: Implement the UserMenu component**
```tsx
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
        <button className="relative h-8 w-8 rounded-full outline-none hover:opacity-80 transition-opacity">
          <Avatar className="h-8 w-8 border">
            <AvatarImage src={user.image || undefined} alt={user.name || 'User'} />
            <AvatarFallback className="bg-primary/10 text-primary">{initials}</AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => router.push('/dashboard/profile')} className="cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push('/dashboard/settings')} className="cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut} className="text-red-600 focus:text-red-600 cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
```

---

### Task 4: Update AppHeader to include UserMenu

**Files:**
- Modify: `components/app-header.tsx`

**Step 1: Update AppHeader signature**
```tsx
export function AppHeader({ user }: { user?: any }) {
  return (
    <header className='sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container flex h-14 items-center justify-between px-4'>
        <Link href='/dashboard' className='flex items-center gap-2 font-bold text-lg'>
          FareFold
        </Link>
        <div className='flex items-center gap-2'>
          <Button variant='ghost' size='icon' render={<Link href='/dashboard/settings' />}>
            <Settings className='h-5 w-5' />
          </Button>
          <NotificationBell />
          {user && <UserMenu user={user} />}
        </div>
      </div>
    </header>
  )
}
```

---

### Task 5: Update Main Layout to pass user data

**Files:**
- Modify: `app/[locale]/(main)/layout.tsx`

**Step 1: Consolidate user data**
```tsx
  let user = session?.user || null

  if (!user && firebaseSession) {
    try {
      const decodedToken = await adminAuth.verifySessionCookie(firebaseSession, true)
      user = {
        name: decodedToken.name || decodedToken.email?.split('@')[0],
        email: decodedToken.email,
        image: decodedToken.picture,
      }
    } catch (error) {
      console.error('Firebase session verification failed:', error)
    }
  }
```

**Step 2: Pass to AppHeader**
```tsx
<AppHeader user={user} />
```

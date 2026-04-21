import Link from 'next/link'
import { UserMenu } from '@/components/auth/user-menu'

export function AppHeader({ user }: { user?: any }) {
  return (
    <header className='sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container flex h-14 items-center justify-between px-4'>
        <Link href='/dashboard' className='flex items-center gap-2 font-bold text-lg'>
          FareFold
        </Link>
        <div className='flex items-center gap-2'>
          {user && <UserMenu user={user} />}
        </div>
      </div>
    </header>
  )
}

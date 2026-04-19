
import { NotificationBell } from '@/components/notifications/notification-bell'
import Link from 'next/link'
import { Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function AppHeader() {
    return (
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40 w-full">
            <div className="container flex h-14 items-center justify-between px-4">
                <Link href="/dashboard" className="flex items-center gap-2 font-bold text-lg">
                    KyronHQ
                </Link>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href="/dashboard/settings">
                            <Settings className="h-5 w-5" />
                        </Link>
                    </Button>
                    <NotificationBell />
                </div>
            </div>
        </header>
    )
}

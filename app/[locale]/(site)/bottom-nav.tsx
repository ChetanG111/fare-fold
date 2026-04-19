'use client'

import { Link } from '@/i18n/navigation'
import { Home, Layers, CreditCard, User } from 'lucide-react'

export function BottomNav() {
    return (
        <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-sm bg-white/70 dark:bg-black/70 backdrop-blur-md border border-white/20 dark:border-white/10 shadow-2xl rounded-2xl flex justify-around p-2">
            <Link href="/" className="p-3 text-primary hover:text-primary/80 transition-colors">
                <Home className="w-6 h-6" />
                <span className="sr-only">Home</span>
            </Link>
            <Link href="/#features" className="p-3 text-muted-foreground hover:text-foreground transition-colors">
                <Layers className="w-6 h-6" />
                <span className="sr-only">Features</span>
            </Link>
            <Link href="/#pricing" className="p-3 text-muted-foreground hover:text-foreground transition-colors">
                <CreditCard className="w-6 h-6" />
                <span className="sr-only">Pricing</span>
            </Link>
            <Link href="/login" className="p-3 text-muted-foreground hover:text-foreground transition-colors">
                <User className="w-6 h-6" />
                <span className="sr-only">Login</span>
            </Link>
        </div>
    )
}

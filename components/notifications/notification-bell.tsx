
'use client'

import { Bell } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useState } from 'react'

export function NotificationBell() {
    // In a real app, you would fetch notifications here or sync state
    const [notifications, setNotifications] = useState([
        {
            id: '1',
            title: 'Welcome!',
            message: 'Thanks for trying out the SaaS Starter.',
            read: false,
            createdAt: new Date().toISOString()
        }
    ])

    const unreadCount = notifications.filter(n => !n.read).length

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                        <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-600 ring-2 ring-background" />
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-80 p-0">
                <div className="flex items-center justify-between border-b px-4 py-2 font-medium">
                    Notifications
                    {unreadCount > 0 && (
                        <span className="text-xs text-muted-foreground">{unreadCount} unread</span>
                    )}
                </div>
                <ScrollArea className="h-[300px]">
                    {notifications.length === 0 ? (
                        <div className="flex h-20 items-center justify-center text-sm text-muted-foreground">
                            No notifications
                        </div>
                    ) : (
                        <div className="space-y-1">
                            {notifications.map((n) => (
                                <div key={n.id} className={`px-4 py-3 hover:bg-muted/50 ${!n.read ? 'bg-muted/20' : ''}`}>
                                    <h4 className="text-sm font-semibold">{n.title}</h4>
                                    <p className="text-sm text-muted-foreground">{n.message}</p>
                                    <span className="text-xs text-muted-foreground mt-1 block">
                                        {new Date(n.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </ScrollArea>
                <div className="border-t p-2">
                    <Button variant="ghost" size="sm" className="w-full text-xs">
                        Mark all as read
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    )
}

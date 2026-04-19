'use client'

import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Bell } from 'lucide-react'
import { useState } from 'react'

export function NotificationBell() {
  const [notifications] = useState([
    {
      id: '1',
      title: 'Welcome!',
      message: 'Thanks for trying out FareFold.',
      read: false,
      createdAt: new Date().toISOString(),
    },
  ])

  const unreadCount = notifications.filter((notification) => !notification.read).length

  return (
    <Popover>
      <PopoverTrigger
        render={<Button className='relative' size='icon' variant='ghost' />}
      >
        <Bell className='h-5 w-5' />
        {unreadCount > 0 && (
          <span className='absolute top-1 right-1 h-2 w-2 rounded-full bg-red-600 ring-2 ring-background' />
        )}
      </PopoverTrigger>
      <PopoverContent align='end' className='w-80 p-0'>
        <div className='flex items-center justify-between border-b px-4 py-2 font-medium'>
          Notifications
          {unreadCount > 0 && (
            <span className='text-muted-foreground text-xs'>{unreadCount} unread</span>
          )}
        </div>
        <ScrollArea className='h-[300px]'>
          {notifications.length === 0 ? (
            <div className='flex h-20 items-center justify-center text-muted-foreground text-sm'>
              No notifications
            </div>
          ) : (
            <div className='space-y-1'>
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`px-4 py-3 hover:bg-muted/50 ${
                    !notification.read ? 'bg-muted/20' : ''
                  }`}
                >
                  <h4 className='font-semibold text-sm'>{notification.title}</h4>
                  <p className='text-muted-foreground text-sm'>{notification.message}</p>
                  <span className='mt-1 block text-muted-foreground text-xs'>
                    {new Date(notification.createdAt).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
        <div className='border-t p-2'>
          <Button variant='ghost' size='sm' className='w-full text-xs'>
            Mark all as read
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

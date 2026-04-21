'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { LogOut, User, Bell, Shield, ChevronLeft, ChevronRight } from 'lucide-react'
import { signOut } from '@/lib/auth/auth-client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { removeFirebaseSession } from '@/app/actions/auth-actions'

interface SettingsProps {
  user: {
    name?: string | null
    email?: string | null
    image?: string | null
  }
}

export function Settings({ user }: SettingsProps) {
  const router = useRouter()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const initials = user.name
    ? user.name.split(' ').map(n => n[0]).join('').toUpperCase()
    : user.email ? user.email[0].toUpperCase() : 'U'

  const handleSignOut = async () => {
    setIsLoggingOut(true)
    try {
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
    } catch (error) {
      console.error('Sign out failed:', error)
    } finally {
      setIsLoggingOut(false)
    }
  }

  return (
    <div className="container mx-auto py-10 max-w-4xl">
      <div className="flex items-center gap-4 mb-8">
        <Link 
          href="/dashboard" 
          className="p-2 hover:bg-muted rounded-full transition-colors border border-border/40"
          title="Back to Dashboard"
        >
          <ChevronLeft className="size-5" />
        </Link>
        <h1 className="text-3xl font-bold text-[#211b17]">Settings</h1>
      </div>

      <div className="grid gap-8">
        {/* Profile Section */}
        <Card className="border-[#ded3c5] bg-[#fffdf8]">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <User className="size-5 text-[#8f2f24]" />
              Profile Information
            </CardTitle>
            <CardDescription>Manage your public profile and account details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-6 pb-6 border-b border-[#ded3c5]/50">
              <Avatar className="size-20 border-2 border-[#8f2f24]/10">
                <AvatarImage src={user.image || undefined} alt={user.name || 'User'} />
                <AvatarFallback className="bg-[#8f2f24]/5 text-[#8f2f24] text-xl font-bold">{initials}</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-[#211b17]">{user.name}</h3>
                <p className="text-sm text-muted-foreground">{user.email}</p>
                <Button variant="outline" size="sm" className="mt-2 border-[#ded3c5]">
                  Change Avatar
                </Button>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Display Name</Label>
                <Input id="name" defaultValue={user.name || ''} className="border-[#ded3c5]" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" defaultValue={user.email || ''} disabled className="border-[#ded3c5] bg-muted/50" />
              </div>
            </div>
            
            <Button className="bg-[#8f2f24] hover:bg-[#8f2f24]/90 text-white font-bold">
              Save Changes
            </Button>
          </CardContent>
        </Card>

        {/* Preferences & Security */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-[#ded3c5] bg-[#fffdf8]">
            <CardHeader>
              <CardTitle className="text-md flex items-center gap-2">
                <Bell className="size-4 text-[#8f2f24]" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-2 border-b border-[#ded3c5]/30">
                  <span className="text-sm">Price Drop Alerts</span>
                  <div className="h-5 w-9 bg-[#8f2f24] rounded-full relative">
                    <div className="absolute right-0.5 top-0.5 size-4 bg-white rounded-full" />
                  </div>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-[#ded3c5]/30">
                  <span className="text-sm">Marketing Emails</span>
                  <div className="h-5 w-9 bg-[#ded3c5] rounded-full relative">
                    <div className="absolute left-0.5 top-0.5 size-4 bg-white rounded-full" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#ded3c5] bg-[#fffdf8]">
            <CardHeader>
              <CardTitle className="text-md flex items-center gap-2">
                <Shield className="size-4 text-[#8f2f24]" />
                Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="ghost" className="w-full justify-between font-normal text-sm border-b border-[#ded3c5]/30 rounded-none h-auto py-3 px-0">
                Change Password
                <ChevronRight className="size-4 text-muted-foreground" />
              </Button>
              <Button variant="ghost" className="w-full justify-between font-normal text-sm border-b border-[#ded3c5]/30 rounded-none h-auto py-3 px-0">
                Two-Factor Authentication
                <ChevronRight className="size-4 text-muted-foreground" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Danger Zone */}
        <Card className="border-red-200 bg-red-50/30">
          <CardHeader>
            <CardTitle className="text-lg text-red-800">Account Management</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
            <div>
              <p className="text-sm font-medium text-red-900">Sign out of your account</p>
              <p className="text-xs text-red-700/70">You will need to log in again to access your dashboard.</p>
            </div>
            <Button 
              variant="destructive" 
              onClick={handleSignOut}
              disabled={isLoggingOut}
              className="font-bold flex items-center gap-2"
            >
              {isLoggingOut ? 'Signing out...' : <><LogOut className="size-4" /> Sign Out</>}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

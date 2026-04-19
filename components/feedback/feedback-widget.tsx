
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { MessageSquarePlus } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { submitFeedback } from '@/app/actions/operations'
import { useFormStatus } from 'react-dom'

function SubmitButton() {
    const { pending } = useFormStatus()
    return (
        <Button type="submit" disabled={pending}>
            {pending ? 'Sending...' : 'Send Feedback'}
        </Button>
    )
}

export function FeedbackWidget() {
    const [open, setOpen] = useState(false)
    const { toast } = useToast()

    async function action(formData: FormData) {
        const result = await submitFeedback(null, formData)
        if (result.success) {
            setOpen(false)
            toast({
                title: "Thank you!",
                description: result.message,
            })
        } else {
            toast({
                title: "Error",
                description: result.message,
                variant: "destructive"
            })
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="fixed bottom-4 right-4 z-50 h-12 w-12 rounded-full shadow-lg hover:shadow-xl bg-background border-primary/20"
                >
                    <MessageSquarePlus className="h-6 w-6 text-primary" />
                    <span className="sr-only">Feedback</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Send Feedback</DialogTitle>
                    <DialogDescription>
                        Help us improve! Report a bug or suggest a feature.
                    </DialogDescription>
                </DialogHeader>
                <form action={action} className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="type">Type</Label>
                        <Select name="type" defaultValue="general">
                            <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="general">General</SelectItem>
                                <SelectItem value="bug">Bug Report</SelectItem>
                                <SelectItem value="feature">Feature Request</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                            id="message"
                            name="message"
                            placeholder="Tell us what you think..."
                            className="min-h-[100px]"
                            required
                        />
                    </div>
                    <DialogFooter>
                        <SubmitButton />
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { submitFeedback } from '@/app/actions/operations'
import { useToast } from '@/hooks/use-toast'
import { MessageSquarePlus } from 'lucide-react'
import { useState } from 'react'
import { useFormStatus } from 'react-dom'

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type='submit' disabled={pending}>
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
        title: 'Thank you!',
        description: result.message,
      })
    } else {
      toast({
        title: 'Error',
        description: result.message,
        variant: 'destructive',
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button
            className='fixed right-4 bottom-4 z-50 h-12 w-12 rounded-full border-primary/20 bg-background shadow-lg hover:shadow-xl'
            size='icon'
            variant='outline'
          />
        }
      >
        <MessageSquarePlus className='h-6 w-6 text-primary' />
        <span className='sr-only'>Feedback</span>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Send Feedback</DialogTitle>
          <DialogDescription>Help us improve! Report a bug or suggest a feature.</DialogDescription>
        </DialogHeader>
        <form action={action} className='grid gap-4 py-4'>
          <div className='grid gap-2'>
            <Label htmlFor='type'>Type</Label>
            <Select name='type' defaultValue='general'>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='general'>General</SelectItem>
                <SelectItem value='bug'>Bug Report</SelectItem>
                <SelectItem value='feature'>Feature Request</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='message'>Message</Label>
            <Textarea
              className='min-h-[100px]'
              id='message'
              name='message'
              placeholder='Tell us what you think...'
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

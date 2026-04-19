import { toastManager } from '@/components/ui/toast'
import type { ReactNode } from 'react'

interface ToastProps {
    title?: ReactNode
    description?: ReactNode
    variant?: 'default' | 'destructive'
    action?: ReactNode
}

export function useToast() {
    return {
        toast: ({ title, description, variant, action }: ToastProps) => {
            return toastManager.add({
                title,
                description,
                type: variant === 'destructive' ? 'error' : undefined,
                actionProps: action ? { children: action } : undefined,
            })
        },
        dismiss: (toastId: string) => toastManager.close(toastId),
    }
}

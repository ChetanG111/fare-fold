interface GridLayoutProps {
  children: React.ReactNode
  className?: string
}

export const GridLayout = ({ children, className = '' }: GridLayoutProps) => {
  return <div className={`relative min-h-screen ${className}`}>{children}</div>
}

interface SectionDividerProps {
  className?: string
}

export const SectionDivider = ({ className = '' }: SectionDividerProps) => {
  return (
    <div className={className}>
      <div className='h-px w-full bg-[#ded3c5]' />
    </div>
  )
}

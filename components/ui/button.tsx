import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

/**
 * Variantes de style pour le composant Button basées sur class-variance-authority.
 * Intègre la charte dark-tech de PRIAM PANTHEON (#050505 fond, #BEFF39 accent néon).
 */
const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#BEFF39] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer',
  {
    variants: {
      variant: {
        default:
          'bg-[#BEFF39] text-[#050505] font-semibold hover:bg-[#a6e62a] hover:shadow-[0_0_25px_rgba(190,255,57,0.4)]',
        destructive:
          'bg-red-600 text-white hover:bg-red-700 shadow-sm',
        outline:
          'border border-[#BEFF39]/30 bg-[#050505]/80 text-[#BEFF39] hover:bg-[#BEFF39]/10 hover:border-[#BEFF39] hover:shadow-[0_0_15px_rgba(190,255,57,0.2)]',
        secondary:
          'bg-[#151515] text-white hover:bg-[#222222] border border-white/10',
        ghost:
          'text-zinc-300 hover:bg-white/10 hover:text-white',
        link: 'text-[#BEFF39] underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3 text-xs',
        lg: 'h-12 rounded-md px-8 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

/**
 * Interface des propriétés du Bouton.
 * Permet d'étendre les attributs natifs d'un bouton HTML avec les variantes CVA.
 */
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /**
   * Si vrai, le bouton déléguera son rendu à son enfant direct via Radix Slot.
   */
  asChild?: boolean
}

/**
 * Composant Bouton shadcn réutilisable et adapté à la charte PRIAM.
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    // Sélection dynamique du composant conteneur (Slot ou button natif)
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }

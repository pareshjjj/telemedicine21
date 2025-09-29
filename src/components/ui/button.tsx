import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary-hover shadow-soft hover:shadow-medium",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-soft",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground shadow-soft",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary-hover shadow-soft",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        // Healthcare role-based variants
        patient: "gradient-patient text-patient-foreground hover:scale-105 shadow-soft hover:shadow-medium",
        doctor: "gradient-doctor text-doctor-foreground hover:scale-105 shadow-soft hover:shadow-medium",
        pharmacist: "gradient-pharmacist text-pharmacist-foreground hover:scale-105 shadow-soft hover:shadow-medium",
        // Healthcare UI variants
        hero: "gradient-hero text-white hover:scale-105 shadow-medium hover:shadow-strong text-base font-semibold",
        medical: "bg-primary text-primary-foreground hover:bg-primary-hover border border-primary/20 shadow-soft hover:shadow-medium",
        emergency: "bg-destructive text-destructive-foreground hover:bg-destructive/90 animate-pulse shadow-strong",
        success: "bg-secondary text-secondary-foreground hover:bg-secondary-hover shadow-soft hover:shadow-medium",
      },
      size: {
        default: "h-11 px-6 py-3",
        sm: "h-9 px-4 py-2 text-sm",
        lg: "h-13 px-8 py-4 text-base",
        xl: "h-16 px-12 py-5 text-lg font-semibold",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };

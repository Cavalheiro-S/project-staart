import { Slot } from "@radix-ui/react-slot"
import clsx from "clsx"
import React from "react"
import { ReactNode } from "react"

interface ButtonRootProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode,
    styleType?: "primary" | "secondary",
    className?: string,
}

interface ButtonIconProps {
    children?: ReactNode | string,
    className?: string,
}


export const ButtonIcon = ({ children, className }: ButtonIconProps) => {
    return (
        <Slot className={className}>
            {children}
        </Slot>
    )
}

export const ButtonRoot = React.forwardRef<HTMLButtonElement, ButtonRootProps>(({ children, className, styleType = "primary", ...props }, ref) => {

    return (
        <button {...props} ref={ref} className={
            clsx("flex items-center gap-2 justify-center rounded px-4 py-1 font-semibold transition h-10 disabled:hover:bg-white disabled:hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed",
                {
                    "bg-primary outline-primary-hover text-white hover:bg-primary-hover": styleType === "primary",
                    "bg-transparent text-primary border border-primary hover:bg-primary hover:text-white": styleType === "secondary",
                },
                className)
        }>
            {children}
        </button >
    )
})


export const Button = {
    Root: ButtonRoot,
    Icon: ButtonIcon,
}
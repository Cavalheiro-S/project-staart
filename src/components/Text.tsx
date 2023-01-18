import { Slot } from "@radix-ui/react-slot";
import { clsx } from "clsx"
import { ReactNode } from "react";

export interface TextProps extends React.HTMLAttributes<HTMLSpanElement> {
    size?: "sm" | "md" | "lg",
    type?: "error"
    children: ReactNode,
    asChild?: boolean,
    className?: string,
}

export function Text({ size = "md", type,  children, asChild, className }: TextProps) {

    const Comp = asChild ? Slot : 'span'
    return (
        <Comp
            className={
                clsx("font-sans select-auto", {
                    "text-xs": size === "sm",
                    "text-sm": size === "md",
                    "text-md": size === "lg",
                    "text-red-500": type === "error"
                }, className)}>
            {children}
        </Comp>
    )
}
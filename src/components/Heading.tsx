import { Slot } from "@radix-ui/react-slot";
import { clsx } from "clsx"
import { ReactNode } from "react";

export interface HeadingProps {
    size?: "sm" | "md" | "lg" | "xl";
    color?: "primary" | "white" | "black";
    children: ReactNode;
    asChild?: boolean,
    className?: string,
}

export function Heading({ size = "md", children, color = "black", asChild, className }: HeadingProps) {

    const Comp = asChild ? Slot : 'h2'
    return (
        <Comp
            className={
                clsx("font-semibold font-title select-auto", {
                    "text-lg": size === "sm",
                    "text-xl": size === "md",
                    "text-2xl": size === "lg",
                    "text-3xl": size === "xl"
                }, className)}>
            {children}
        </Comp>
    )
}
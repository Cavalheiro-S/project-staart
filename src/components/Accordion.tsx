import { ArrowForwardIosOutlined } from "@mui/icons-material";
import * as Accordion from "@radix-ui/react-accordion";
import clsx from "clsx";
import { ReactNode, useState } from "react";
import { Heading } from "./Heading";

interface AccordionRootProps {
    className?: string;
    children: ReactNode;
    expanded?: string[];
    setExpanded?: React.Dispatch<React.SetStateAction<string[]>>;
}

interface AccordionItemProps {
    className?: string;
    summary: string;
    children: ReactNode;
}

interface AccordionTriggerProps {
    className?: string;
    summary: string;
    children?: ReactNode;
    expanded?: string[];
}

interface AccordionContentProps {
    className?: string;
    children: ReactNode;
}

export const AccordionRoot = ({ children, className, expanded , setExpanded }: AccordionRootProps) => {
    return (
        <Accordion.Root
            type="multiple"
            value={expanded}
            onValueChange={setExpanded}
            className={clsx("py-3 border-b-2 last-of-type:border-b-0", className)}>
            {children}
        </Accordion.Root>
    )
}

export const AccordionItem = ({ summary, children, className }: AccordionItemProps) => {
    return (
        <Accordion.Item className={className} value={summary}>
            {children}
        </Accordion.Item>
    )
}

export const AccordionTrigger = ({ summary, children, expanded, className }: AccordionTriggerProps) => {
    return (
        <Accordion.Trigger className={clsx("flex py-6 w-full h-full", className)}>
            <ArrowForwardIosOutlined className={clsx("transition", {
                "rotate-90": expanded && expanded.includes(summary)
            })} />
            <Heading className="ml-2" size="sm">{summary}</Heading>
            {children}
        </Accordion.Trigger>
    )
}

export const AccordionContent = ({ children, className }: AccordionContentProps) => {
    return (
        <Accordion.Content className={className}>
            {children}
        </Accordion.Content>
    )
}

export const AccordionStyled = {
    Root: AccordionRoot,
    Item: AccordionItem,
    Trigger: AccordionTrigger,
    Content: AccordionContent,
}
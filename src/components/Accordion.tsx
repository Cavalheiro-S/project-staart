import { ArrowForwardIosOutlined } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { ReactNode, useState } from "react";
import { Text } from "./Text";

interface AccordionProps {
    summary: string;
    children: ReactNode;

}

export const AccordionStyled = ({ summary, children }: AccordionProps) => {
    const [expanded, setExpanded] = useState<string | false>(false);

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    return (
        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
            <AccordionSummary
                aria-controls="panel1bh-content"
                id="panel1bh-header">
                {expanded === "panel1" ? <ArrowForwardIosOutlined className="rotate-90" /> : <ArrowForwardIosOutlined />}
                <Text size="lg" className="ml-2">
                    {summary}
                </Text>
            </AccordionSummary>
            <AccordionDetails>
                {children}
            </AccordionDetails>
        </Accordion>
    )

}
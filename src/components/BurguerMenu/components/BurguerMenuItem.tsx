import { Link } from "react-router-dom"
import { Heading } from "../../Heading"
import { Text } from "../../Text"

export interface BurguerMenuItemProps {
    icon: React.ReactNode,
    text: string,
    link: string,
    onClick?: () => void
}


export const BurguerMenuItem = ( item : BurguerMenuItemProps) => {
    return (
        <div className="flex items-center gap-4 text-font">
            {item.icon}
            <Heading asChild>
                <Link to={item.link} onClick={item.onClick}>
                    {item.text}
                </Link>
            </Heading>
        </div>
    )
}
import { Link } from "react-router-dom"
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
            <Text asChild>
                <Link to={item.link} onClick={item.onClick}>
                    {item.text}
                </Link>
            </Text>
        </div>
    )
}
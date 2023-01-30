import { ChromeReaderModeOutlined, ComputerOutlined, ExitToAppOutlined, ListOutlined, Menu } from "@mui/icons-material";
import { Drawer } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Heading } from "../Heading";
import { BurguerMenuItem } from "./components/BurguerMenuItem";
import Logo from "../../assets/images/Logo.svg"
interface BurguerMenuProps {

}

export const BurguerMenu = ({ }: BurguerMenuProps) => {
    const [open, setOpen] = useState(false);
    const { signOut, currentUser } = useAuth();
    const navigate = useNavigate();

    const handleSignout = async () => {
        await signOut();
        navigate('/signin')
    }

    const menuItemsLogged = [
        {
            icon: <ChromeReaderModeOutlined />,
            text: 'Jornadas',
            link: '/journeys'
        },
        {
            icon: <ComputerOutlined />,
            text: 'Cursos',
            link: '/courses'
        },
        {
            icon: <ExitToAppOutlined />,
            text: 'Sair',
            link: '/signin'
        }
    ]

    const menuItemsUnlogged = [
        {
            icon: null,
            text: 'Login',
            link: '/signin'
        },
        {
            icon: null,
            text: 'Criar Conta',
            link: '/signup'
        }
    ]

    const renderMenuItems = () => {
        const menuItems = currentUser ? menuItemsLogged : menuItemsUnlogged
        return menuItems.map((item, index) => <BurguerMenuItem
            icon={item.icon}
            text={item.text}
            link={item.link}
            key={index}
            onClick={() => {
                setOpen(!open)
                if (item.link === '/signin') handleSignout()
            }
            } />)
    }

    return (
        <>
            <nav className="flex items-center h-20 justify-between px-3">
                <img src={Logo} alt="Logo" />
                <Menu className="text-font" onClick={() => setOpen(!open)} />
            </nav>
            {open &&
                <nav className="flex flex-col justify-center h-full gap-6 p-4">
                    {renderMenuItems()}
                </nav>
            }
        </>
    )
}
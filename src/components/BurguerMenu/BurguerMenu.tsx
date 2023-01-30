import { ChromeReaderModeOutlined, ComputerOutlined, ExitToAppOutlined, ListOutlined, Menu } from "@mui/icons-material";
import { Drawer } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Heading } from "../Heading";
import { BurguerMenuItem } from "./components/BurguerMenuItem";
import Logo from "../../assets/images/Logo.svg"
import { ToTop } from "../ToTop";
interface BurguerMenuProps {

}

export const BurguerMenu = ({ }: BurguerMenuProps) => {
    const [open, setOpen] = useState(false);
    const { signOut, currentUser } = useAuth();
    const navigate = useNavigate();

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

    const handleSignout = async () => {
        await signOut();
        navigate('/signin')
    }

    const menuItemsLogged = [
        {
            icon: null,
            text: 'Jornadas',
            link: '/journeys'
        },
        {
            icon: null,
            text: 'Cursos',
            link: '/courses'
        },
        {
            icon: null,
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

    return (
        <>
            <div id="header" className="flex sticky items-center h-20 justify-between px-4">
                <img src={Logo} alt="Logo" />
                <Menu className="text-font" onClick={() => setOpen(!open)} />
                {open &&
                    <nav className=" absolute w-full p-4 translate-y-full bottom-0 z-10 left-0 flex flex-col justify-center gap-6 border shadow-md bg-white">
                        {renderMenuItems()}
                    </nav>
                }
            </div>
            <ToTop/>
        </>
    )
}
import { ChromeReaderModeOutlined, ComputerOutlined, ExitToAppOutlined, Menu as MenuIcon } from "@mui/icons-material";
import { Drawer } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Heading } from "./Heading";
import { Text } from "./Text";

interface BurguerMenuProps {

}

export const BurguerMenu = ({ }: BurguerMenuProps) => {
    const [open, setOpen] = useState(false);
    const { signOut } = useAuth();
    const navigate = useNavigate();

    const handleSignout = async () => {
        await signOut();
        navigate('/signin')
    }
    return (
        <>
            <div className="grid grid-cols-2 absolute right-0 m-4">
                <Heading className="text-primary">Staart Projetos</Heading>
                <MenuIcon className="absolute right-0" onClick={() => setOpen(!open)} />
            </div>
            {open && <Drawer open={open} onClose={() => setOpen(!open)}>
                <div className="flex flex-col gap-4 p-4">
                    <div className="flex items-center gap-2">
                        <ChromeReaderModeOutlined />
                        <Text asChild>
                            <Link to="/journeys">
                                Jornadas
                            </Link>
                        </Text>
                    </div>
                    <div className="flex items-center gap-2">
                        <ComputerOutlined />
                        <Text asChild>
                            <Link to="/courses">
                                Cursos
                            </Link>
                        </Text>
                    </div>
                    <div onClick={() => {
                        setOpen(!open)
                        handleSignout()
                    }} className="flex items-center gap-2 hover:text-primary cursor-pointer">
                        <ExitToAppOutlined />
                        <Text className="" >
                            Sair
                        </Text>
                    </div>
                </div>

            </Drawer>}
        </>
    )
}
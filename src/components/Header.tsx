import { ChromeReaderModeOutlined, ComputerOutlined, ExitToAppOutlined } from "@mui/icons-material"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { useWindowDimensions } from "../hooks/useWindowDimensions"
import { BurguerMenu } from "./BurguerMenu"
import { Heading } from "./Heading"
import { Text } from "./Text"


export const Header = () => {
    const { currentUser, signOut } = useAuth();
    const { width } = useWindowDimensions();
    const navigate = useNavigate();

    const handleSignout = async () => {
        await signOut();
        navigate('/signin')
    }

    const renderMenu = () => {
        if (width < 768)
            return (
                <BurguerMenu />
            )

        return renderMenuItems();
    }

    const renderMenuItems = () => {
        if (currentUser)
            return (
                <nav className="grid h-full grid-cols-2 md:grid-cols-3 grid-rows-1">
                    <div className="flex items-center gap-4">
                        <Heading className="text-primary">Staart Projetos</Heading>
                    </div>
                    <div className="md:flex items-center justify-center gap-4 text-font">
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
                    </div>
                    <div onClick={() => handleSignout()} className="flex items-center justify-self-end justify-end gap-2 hover:text-primary cursor-pointer">
                        <ExitToAppOutlined />
                        <Text className="" >
                            Sair
                        </Text>
                    </div>
                </nav>
            )
        return (
            <div className="flex items-center justify-center gap-4">
                <Text asChild>
                    <Link to="/signin">
                        Login
                    </Link>
                </Text >
                <Text className="text-primary" asChild>
                    <Link to="/signup">
                        Criar Conta
                    </Link>
                </Text>
            </div >
        )
    }

    return (
        <header className="relative shadow-sm px-3 md:px-20 h-[10vh] ">

            {renderMenu()}
        </header >
    )
}
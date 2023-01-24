import { ChromeReaderModeOutlined, ComputerOutlined, ExitToAppOutlined } from "@mui/icons-material"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { Heading } from "./Heading"
import { Text } from "./Text"


export const Header = () => {
    const { currentUser, signOut } = useAuth();
    const navigate = useNavigate();

    const handleSignout = async () => {
        await signOut();
        navigate('/signin')
    }

    return (
        <header className="grid shadow-sm grid-cols-3 grid-rows-1 px-20 h-[10vh]">
            <div className="flex items-center gap-4">
                <Heading className="text-primary">Staart Projetos</Heading>
            </div>
            {currentUser ? (
                <>
                    <div className="flex items-center justify-center gap-4 text-font">
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
                    <div onClick={ () => handleSignout()} className="flex items-center justify-end gap-2 hover:text-primary cursor-pointer">
                        <ExitToAppOutlined/>
                        <Text className="" >
                            Sair
                        </Text>
                    </div>
                </>

            ) : (
                <div className="flex items-center justify-center gap-4">
                    <Text asChild>
                        <Link to="/signin">
                            Login
                        </Link>
                    </Text>
                    <Text className="text-primary" asChild>
                        <Link to="/signup">
                            Criar Conta
                        </Link>
                    </Text>
                </div>
            )
            }

        </header>
    )
}
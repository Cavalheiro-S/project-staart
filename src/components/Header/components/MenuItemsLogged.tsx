import { ExitToAppOutlined } from "@mui/icons-material"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../../hooks/useAuth"
import { Logo } from "../../Logo"
import { Text } from "../../Text"

export const MenuItemsLogged = () => {
    const navigate = useNavigate();
    const { signOut } = useAuth();

    const handleSignout = async () => {
        await signOut();
        navigate('/signin')
    }
    return (
        <nav className="grid h-full grid-cols-2 md:grid-cols-3 grid-rows-1">
            <div className="flex items-center gap-4">
                <Logo/>
            </div>
            <div className="md:flex items-center justify-center gap-4 text-font">
                <Text className="hover:text-primary" asChild>
                    <Link to="/journeys">
                        Jornadas
                    </Link>
                </Text>
                <Text className="hover:text-primary" asChild>
                    <Link to="/courses">
                        Cursos
                    </Link>
                </Text>
            </div>
            <div onClick={() => handleSignout()} className="flex items-center justify-self-end justify-end gap-2 hover:text-primary cursor-pointer">
                <ExitToAppOutlined />
                <Text className="" >
                    Sair
                </Text>
            </div>
        </nav>
    )
}
import { Link } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import { useWindowDimensions } from "../../hooks/useWindowDimensions"
import { BurguerMenu } from "../BurguerMenu/BurguerMenu"
import { Text } from "../Text"
import { MenuItemsLogged } from "./components/MenuItemsLogged"
import Logo from "../../assets/images/Logo.svg"
export const Header = () => {
    const { currentUser } = useAuth();
    const { width } = useWindowDimensions();

    const verifyTypeMenuToRender = () => {
        if (width < 768)
            return <BurguerMenu />

        return (
            <header className="relative shadow-sm px-3 md:px-20 h-[10vh] ">
                {renderMenu()}
            </header >
        )
    }

    const renderMenu = () => {
        if (currentUser)
            return <MenuItemsLogged />
        return (
            <>
                <div className="grid grid-cols-3 grid-rows-1 items-center h-full">
                    <img src={Logo} alt="logo" />
                    <div className="flex items-center gap-4 justify-center">
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
                    </div>
                </div >
            </>
        )
    }

    return verifyTypeMenuToRender();
}
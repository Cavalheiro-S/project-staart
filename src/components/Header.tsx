import { Link } from "react-router-dom"
import { Button } from "./Button"
import { Heading } from "./Heading"
import { Text } from "./Text"


export const Header = () => {
    return (
        <header className="grid shadow-sm grid-cols-3 grid-rows-1 px-20 h-[10vh]">
            <div className="flex items-center gap-4">
                <Heading className="text-primary">Staart Projetos</Heading>
            </div>
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

        </header>
    )
}
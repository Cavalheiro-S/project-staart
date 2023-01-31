import { Logo } from "./Logo"
import { Text } from "./Text"

export const Footer = () => {
    return(
        <footer className="flex border-t-2 mt-12 py-12 text-font items-center">
            <div className="flex flex-col md:px-20 gap-6 w-full">
                <Logo className="h-6" />
                <Text className="text-center">© 2023 Lucas Cavalheiro</Text>
            </div>
        </footer>
    )
}
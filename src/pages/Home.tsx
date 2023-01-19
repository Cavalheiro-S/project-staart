import { Heading } from "../components/Heading"
import { Text } from "../components/Text"

export const Home = () => {
    return (
        <div className="flex w-full h-[90vh] justify-center items-center">
            <div className="w-96 flex flex-col gap-6">
                <div>
                    <Heading size="lg">Home</Heading>
                    <Text>Home page</Text>
                </div>
            </div>
        </div>
    )
}
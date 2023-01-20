import { ChromeReaderModeOutlined } from "@mui/icons-material"
import { useEffect, useState } from "react"
import { Heading } from "../components/Heading"
import { Text } from "../components/Text"
import { api } from "../services/axios"
import { Journey } from "./JourneyList/components/interface"
import { JourneyCard } from "./JourneyList/components/JourneyCard"

export const Home = () => {
    const [journeys, setJourneys] = useState<Journey[]>()
    useEffect(() => {
        const loadJourneys = async () => {
            const { data } = await api.get<Journey[]>('/journeys')
            setJourneys(data)
            console.log(data);
            
        }
        loadJourneys()
    }, [])

    const renderJourneys = () => {
        return journeys?.map((journey, index) => <JourneyCard key={index} journey={journey} />)
    }
    return (
        <div className="flex flex-col w-full h-[90vh]">
            <div className="flex gap-4 items-center">
                <ChromeReaderModeOutlined className="text-primary" />
                <Heading className="text-font">Jornadas de aprendizado</Heading>
            </div>
            <Text className="text-gray-500 mt-1">Selecione uma jornada para começar</Text>
            <div className="flex gap-20 flex-wrap py-20">
                {renderJourneys()}
            </div>
        </div>
    )
}
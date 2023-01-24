import { ChromeReaderModeOutlined } from "@mui/icons-material"
import { useEffect, useState } from "react"
import { Heading } from "../../components/Heading"
import { Loading } from "../../components/Loading"
import { Text } from "../../components/Text"
import { Journey } from "../../interfaces"
import { api } from "../../services/axios"
import { JourneyCard } from "./components/JourneyCard"

export const JourneyList = () => {
    const [journeys, setJourneys] = useState<Journey[]>()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadJourneys = async () => {
            try {
                const { data } = await api.get<Journey[]>(`/journeys`);
                setJourneys(data);
            }
            catch (error) {
                console.log(error)
            }
            finally {
                setLoading(false)
            }

        }
        loadJourneys()
    }, [])

    const renderJourneys = () => {
        return journeys?.map((journey, index) => <JourneyCard key={index} journey={journey} />)
    }
    return loading ? <Loading /> : (
        <div className="flex flex-col w-full h-[90vh]">
            <div className="flex gap-4 items-center">
                <ChromeReaderModeOutlined className="text-primary" />
                <Heading className="text-font">Jornadas de aprendizado</Heading>
            </div>
            <Text className="text-gray-500 mt-1">Selecione uma jornada para começar</Text>
            <div className="flex gap-20 flex-wrap py-20">
                {renderJourneys()}
            </div>
        </div>)

}
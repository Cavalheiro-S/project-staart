import { ChromeReaderModeOutlined, FilePresent, FilterListOutlined } from "@mui/icons-material"
import { FormControl, FormLabel, Icon, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material"
import { ChangeEventHandler, useEffect, useState } from "react"
import { Heading } from "../../components/Heading"
import { Loading } from "../../components/Loading"
import { Text } from "../../components/Text"
import { Journey } from "../../interfaces"
import { api } from "../../services/axios"
import { JourneyCard } from "./components/JourneyCard"
import { SelectFilter } from "../../components/SelectFilter"

export const JourneyList = () => {
    const [journeys, setJourneys] = useState<Journey[]>([]);
    const [loading, setLoading] = useState(true);
    const [filterValue, setFilterValue] = useState('standard');

    useEffect(() => {
        try {
            const loadJourneys = async () => {
                const { data } = await api.get<Journey[]>(`/journeys`);
                setJourneys(data);
            }
            loadJourneys()
        }
        catch (error) {
            console.log(error)
        }
        finally {
            setLoading(false)
        }
    }, [])

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const filter = event.target.value as string;
        setFilterValue(filter);
    };

    const filterJourneys = (filter: string) => {
        const journeyEmpty = [] as Journey[];
        const journeysFiltered = journeyEmpty.concat(...journeys)

        switch (filter) {
            case 'alphabetic':
                journeysFiltered.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'courseTotal':
                journeysFiltered.sort((a, b) => a.coursesID.length - b.coursesID.length);
                break;
            default:
                break;
        }
        return journeysFiltered;
    }

    const renderJourneys = () => {
        const returnJourneys = journeys.map((journey, index) => <JourneyCard key={index} journey={journey} />)
        if (filterValue === 'standard') return returnJourneys;
        const journeysFiltered = filterJourneys(filterValue);
        return journeysFiltered.map((journey, index) => <JourneyCard key={index} journey={journey} />)
    }
    return loading ? <Loading /> : (
        <div className="flex flex-col w-full px-4 md:px-20 py-12 md:h-[90vh] text-font gap-6">
            <div className="flex flex-col">
                <Heading className="text-font">Jornadas de aprendizado</Heading>
                <Text className="text-gray-500">Selecione uma jornada para começar</Text>
            </div>
            <SelectFilter filterValue={filterValue} handleChange={handleChange} />
            <div className="flex gap-12 md:gap-20 flex-wrap">{renderJourneys()}</div>
        </div>)

}
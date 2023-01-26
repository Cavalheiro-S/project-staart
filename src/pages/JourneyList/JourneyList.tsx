import { ChromeReaderModeOutlined, FilePresent, FilterListOutlined } from "@mui/icons-material"
import { FormControl, FormLabel, Icon, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material"
import { ChangeEventHandler, useEffect, useState } from "react"
import { Heading } from "../../components/Heading"
import { Loading } from "../../components/Loading"
import { Text } from "../../components/Text"
import { Journey } from "../../interfaces"
import { api } from "../../services/axios"
import { JourneyCard } from "./components/JourneyCard"

export const JourneyList = () => {
    const [journeys, setJourneys] = useState<Journey[]>([]);
    const [loading, setLoading] = useState(true);
    const [filterValue, setFilterValue] = useState('standard');

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
        <div className="flex flex-col w-full h-[90vh] text-font gap-3 md:gap-6">
            <div>
                <div className="flex flex-col md:flex-row md:gap-4 md:items-center mt-3 md:mt-0">
                    <ChromeReaderModeOutlined className="text-primary" />
                    <Heading className="text-font">Jornadas de aprendizado</Heading>
                </div>
                <Text className="text-gray-500">Selecione uma jornada para começar</Text>
            </div>
            <FormControl className="flex flex-col items-start">
                <Text asChild>
                    <FormLabel component="legend">
                        Filtrar por:
                    </FormLabel>
                </Text>
                <TextField
                    sx={{ margin: '0.5rem 0' }}
                    className="w-full md:w-fit"
                    select
                    size="small"
                    value={filterValue}
                    InputProps={{
                        startAdornment: <FilterListOutlined className="text-primary mr-2" />
                    }}
                    onChange={handleChange}>
                    <MenuItem value="standard">Padrão</MenuItem>
                    <MenuItem value="alphabetic">Alfabética</MenuItem>
                    <MenuItem value="courseTotal">Total de Cursos</MenuItem>
                </TextField>
            </FormControl>
            <div className="flex md:gap-20 flex-wrap">
                {renderJourneys()}
            </div>
        </div>)

}
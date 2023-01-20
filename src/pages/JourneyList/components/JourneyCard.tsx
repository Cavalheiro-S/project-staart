import { ArrowBackIosOutlined, ComputerOutlined } from "@mui/icons-material";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heading } from "../../../components/Heading";
import { Text } from "../../../components/Text";
import { Journey, JourneySlug } from "./interface";


export const JourneyCard = ({ journey }: { journey: Journey }) => {

    const [color, setColor] = useState('text-gray-700')
    const navigate = useNavigate();
    const verifyDescriptionSize = () => {
        if (journey.description.length > 100)
            return journey.description.substring(0, 200) + '...'
        return journey.description
    }

    useEffect(() => {
        returnColorByJourneyTitle()
    }, [])

    const returnColorByJourneyTitle = () => {
        switch (journey.title) {
            case "Desenvolvimento Back End":
                setColor('text-red-700')
                break;
            case 'Desenvolvimento Front End':
                setColor('text-emerald-700')
                break;
            case 'Habilidades Digitais':
                setColor('text-purple-700')
                break;
            case 'Dados':
                setColor('text-green-700')
                break;
            default:
                setColor('text-gray-700')
                break;
        }
    }

    return (
        <div
            onClick={() => navigate("/journey/" + journey.pathID)}
            className={
                clsx("flex flex-col gap-4 justify-between items-start max-w-xs p-4 rounded transition", {
                    'hover:bg-red-100': journey.title === 'Desenvolvimento Back End',
                    'hover:bg-emerald-100': journey.title === 'Desenvolvimento Front End',
                    'hover:bg-purple-100': journey.title === 'Habilidades Digitais',
                    'hover:bg-green-100': journey.title === 'Dados'

                })}>
            <img className="w-12" src={journey.medias.thumb} alt={journey.title} />
            <div>
                <Text>Jornada</Text>
                <Heading size="sm" className={color}>{journey.title}</Heading>
            </div>
            <Text className="text-gray-500">
                {verifyDescriptionSize()}
            </Text>
            <div className="flex gap-4">
                <div className="flex gap-2 items-center">
                    <ComputerOutlined className="text-font" />
                    <Text className="text-font">{journey.coursesID.length} Cursos</Text>
                </div>
                <Link to={`/journey/${journey.pathID}`}>
                    <ArrowBackIosOutlined className="text-primary rotate-180" />
                    <Text className="text-primary">Acessar</Text>
                </Link>
            </div>
        </div>
    )
}
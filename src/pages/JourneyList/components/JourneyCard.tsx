import { ArrowBackIosOutlined, ComputerOutlined } from "@mui/icons-material";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heading } from "../../../components/Heading";
import { Text } from "../../../components/Text";
import { Journey } from "../../../interfaces";
import { returnColorByJourneyTitle, verifyTextSize } from "../../../utils";


export const JourneyCard = ({ journey }: { journey: Journey }) => {

    const [color, setColor] = useState('text-gray-700')
    const navigate = useNavigate();
    

    useEffect(() => {
        const color = returnColorByJourneyTitle(journey.title)
        setColor(color)
    }, [journey.title])

    return (
        <div
            onClick={() => navigate("/journey/" + journey.pathID)}
            className={
                clsx("flex flex-col gap-4 justify-between items-start max-w-xs py-4 md:p-4 rounded transition", {
                    'md:hover:bg-red-100': journey.title === 'Desenvolvimento Back End',
                    'md:hover:bg-teal-100': journey.title === 'Desenvolvimento Front End',
                    'md:hover:bg-purple-100': journey.title === 'Habilidades Digitais',
                    'md:hover:bg-green-100': journey.title === 'Dados'

                })}>
            <img className="w-12" src={journey.medias.thumb} alt={journey.title} />
            <div>
                <Text>Jornada</Text>
                <Heading size="sm" className={color}>{journey.title}</Heading>
            </div>
            <Text className="text-gray-500">
                {verifyTextSize(journey.description)}
            </Text>
            <div className="flex gap-4">
                <div className="flex gap-2 items-center">
                    <ComputerOutlined className="text-font" />
                    <Text className="text-font">{journey.coursesID.length} Cursos</Text>
                </div>
                <Link to={`journey/${journey.pathID}`}>
                    <ArrowBackIosOutlined className="text-primary rotate-180" />
                    <Text className="text-primary">Acessar</Text>
                </Link>
            </div>
        </div>
    )
}
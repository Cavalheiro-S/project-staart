import { ArrowBackIosOutlined, ComputerOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { Heading } from "../../../components/Heading";
import { Text } from "../../../components/Text";
import { Journey, JourneySlug } from "./interface";


export const JourneyCard = ({ journey }: { journey: Journey }) => {


    const verifyDescriptionSize = () => {
        if (journey.description.length > 100) {
            return journey.description.substring(0, 200) + '...'
        }
        return journey.description
    }

    const returnColorByJourneySlug = () => {
        console.log(journey.slug);

        switch (journey.slug.toString()) {
            case "jornada-desenvolvimento-back-end":
                return 'text-red-500'
            case 'jornada-desenvolvimento-front-end':
                return 'text-green-500'
            case 'habilidades-digitais':
                return 'text-purple-500'
            case 'jornada-de-dados':
                return 'text-emerald-500'
            default:
                return 'text-gray-500'
        }
    }

    return (
        <div className="flex flex-col gap-4 justify-between items-start max-w-xs">
            <img className="w-12" src={journey.medias.thumb} alt={journey.title} />
            <div>
                <Text>Jornada</Text>
                <Heading size="sm" className={returnColorByJourneySlug()}>{journey.title}</Heading>
            </div>
            <Text className="text-gray-500">
                {verifyDescriptionSize()}
            </Text>
            <div className="flex gap-4">
                <div className="flex gap-2 items-center">
                    <ComputerOutlined className="text-gray-500" />
                    <Text>{journey.coursesID.length} Cursos</Text>
                </div>
                <Link to={`/journey/${journey.pathID}`}>
                    <ArrowBackIosOutlined className="text-primary rotate-180" />
                    <Text className="text-primary">Acessar</Text>
                </Link>
            </div>
        </div>
    )
}
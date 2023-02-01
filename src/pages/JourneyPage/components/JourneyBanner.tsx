import { ComputerOutlined, TimerOutlined } from "@mui/icons-material";
import { Heading } from "../../../components/Heading";
import { Text } from "../../../components/Text";
import { useWindowDimensions } from "../../../hooks/useWindowDimensions";
import { Journey } from "../../../interfaces";

interface JourneyBannerProps {
    journey: Journey
    duration?: string
}

export const JourneyBanner = ({ journey, duration}: JourneyBannerProps) => {
    const { width } = useWindowDimensions();

    const renderBanner = () => {
        if (!journey.medias) return (<div></div>)
        if (journey.medias.banner && width > 768) {
            return (
                <div className="relative">
                    <img src={journey.medias.banner} className="w-screen" alt="banner" />
                    <div className="absolute flex items-center w-full bottom-0 h-52 px-20 bg-font bg-opacity-70">
                        {renderBannerInfo()}
                    </div>
                </div>
            )
        }
        return (
            <div className="flex bg-font px-4 md:px-20 py-12">
                {renderBannerInfo()}
            </div>
        )
    }

    const renderBannerInfo = () => {
        return (
            <div className="flex flex-col text-white gap-2">
                <Text>Jornada</Text>
                <div className="flex items-center gap-2">
                    <img src={journey.medias.thumb ?? ""} className="w-12 md:block" alt="thumb" />
                    <Heading size={width > 768 ? "lg" : "md"}>{journey?.title}</Heading>
                </div>
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex gap-4 items-center ">
                        <ComputerOutlined />
                        <div>
                            <Text>Total de cursos</Text>
                            <Heading size="sm">{journey.coursesID.length ?? 0}</Heading>
                        </div>
                    </div>
                    <div className="flex gap-4 items-center ">
                        <TimerOutlined />
                        <div>
                            <Text>Tempo estimado</Text>
                            <Heading size="sm">{duration ?? 0}</Heading>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return renderBanner();
}
import { ArrowBackIosNewOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/Button";
import { Heading } from "../../../components/Heading";
import { Text } from "../../../components/Text";
import { Course } from "../../../interfaces";

interface CourseBannerProps {
    course: Course
}


export const CourseBanner = ({ course }: CourseBannerProps) => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/course/${course?.id}`);
    }
    return (
        <div className="flex gap-6">
            <img className="max-w-[50%] rounded" src={course?.medias?.thumb} alt={course?.title} />
            <div className="flex flex-col gap-6 justify-center">
                <Heading>{course?.title}</Heading>
                <Text className="text-gray-500">{course?.description}</Text>
                <Button.Root onClick={handleClick} className="self-start" styleType="secondary">
                    <Button.Icon>
                        <ArrowBackIosNewOutlined  className="rotate-180"/>
                    </Button.Icon>
                    Acessar
                </Button.Root>
            </div>
        </div>
    )
}
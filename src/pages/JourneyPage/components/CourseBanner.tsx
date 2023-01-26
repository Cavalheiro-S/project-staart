import { ArrowBackIosNewOutlined } from "@mui/icons-material";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/Button";
import { Heading } from "../../../components/Heading";
import { Text } from "../../../components/Text";
import { Course } from "../../../interfaces";
import { verifyTextSize } from "../../../utils";

interface CourseBannerProps {
    course: Course,
    className?: string

}


export const CourseBanner = ({ course, className }: CourseBannerProps) => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/course/${course?.id}`);
    }
    return (
        <div className={clsx("flex flex-col gap-6", className)}>
            <img className="w-full md:max-w-[50%] rounded" src={course?.medias?.thumb} alt={course?.title} />
            <div className="flex flex-col gap-6 justify-center">
                <Heading>{course?.title}</Heading>
                <Text className="text-gray-500">{verifyTextSize(course?.description ?? "", 200)}</Text>
                <Button.Root onClick={handleClick} className="md:self-start" styleType="secondary">
                    <Button.Icon>
                        <ArrowBackIosNewOutlined className="rotate-180" />
                    </Button.Icon>
                    Acessar
                </Button.Root>
            </div>
        </div>
    )
}
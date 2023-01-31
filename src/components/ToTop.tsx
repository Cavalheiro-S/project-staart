import { ArrowUpwardOutlined } from "@mui/icons-material"
import { useGetScroll } from "../hooks/useGetScroll"
import { useWindowDimensions } from "../hooks/useWindowDimensions";


export const ToTop = () => {
    const { scrollY } = useGetScroll();
    const { width } = useWindowDimensions();
    return scrollY > 0 && width < 768 ? (
        <div className="fixed bottom-10 right-4 z-10">
            <a href="#header" className="bg-primary rounded-full p-4">
                <ArrowUpwardOutlined className="text-white" />
            </a>
        </div>
    ) : null
}
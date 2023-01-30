import { ArrowUpwardOutlined } from "@mui/icons-material"
import { useGetScroll } from "../hooks/useGetScroll"


export const ToTop = () => {
    const { scrollY } = useGetScroll();
    return scrollY > 0 ? (
        <div className="fixed bottom-10 right-4 z-10">
            <a href="#header" className="bg-primary rounded-full p-4">
                <ArrowUpwardOutlined className="text-white" />
            </a>
        </div>
    ) : null
}
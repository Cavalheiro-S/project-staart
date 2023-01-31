import { useEffect, useState } from "react"

export const useGetScroll = () => {
    const [scrollX, setScrollX] = useState(0)
    const [scrollY, setScrollY] = useState(0)

    const handleScroll = () => {
        setScrollX(window.scrollX)
        setScrollY(window.scrollY)
    }

    useEffect(() => {

        window.addEventListener("scroll", handleScroll)

        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])

    return { scrollX, scrollY }
}
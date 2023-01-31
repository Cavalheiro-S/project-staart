import LogoImage from "../assets/images/Logo.svg"

interface LogoProps extends React.HTMLAttributes<HTMLImageElement> {}

export const Logo = ({...props} : LogoProps) => {
    return <img id="header" {...props} src={LogoImage} alt="logo" />
}
import { Email, RemoveRedEyeOutlined, VisibilityOffOutlined, LockOutlined } from "@mui/icons-material"
import { SyntheticEvent, useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { Input } from "../components/Input"
import { Text } from "../components/Text"


export const Signup = () => {
    const [showPassword, setShowPassword] = useState(
        {
            password: false,
            confirmPassword: false
        }
    );
    const handleShowPassword = (event: SyntheticEvent, inputName: "password" | "confirmPassword") => {
        const input = event.currentTarget.previousElementSibling as HTMLInputElement;
        input.type = input.type === "password" ? "text" : "password"
        setShowPassword({ ...showPassword, [inputName]: !showPassword[inputName] })
    }
    return (
        <div className="flex w-full h-[90vh] justify-center items-center">
            <form className="w-96 flex flex-col gap-6">
                <div>
                    <Heading size="lg">Criar Conta</Heading>
                    <Text>Informe seus dados para criar uma conta</Text>
                </div>
                <label className="flex flex-col gap-2">
                    Nome
                    <Input.Root>
                        <Input.Input />
                    </Input.Root>
                </label>
                <label className="flex flex-col gap-2">
                    Email
                    <Input.Root>
                        <Input.Icon>
                            <Email className="text-gray-500 ml-2" />
                        </Input.Icon>
                        <Input.Input />
                    </Input.Root>
                </label>
                <label className="flex flex-col gap-2">
                    Senha
                    <Input.Root>
                        <Input.Icon><LockOutlined className="ml-2 text-gray-500" /></Input.Icon>
                        <Input.Input name="password" type="password" />
                        <Input.Icon>
                            {showPassword.password ? (
                                <RemoveRedEyeOutlined className="text-font mr-2" onClick={event => handleShowPassword(event, "password")} />
                            ) : (
                                <VisibilityOffOutlined className="text-font mr-2" onClick={event => handleShowPassword(event, "password")} />
                            )}
                        </Input.Icon>
                    </Input.Root>
                </label>
                <label className="flex flex-col gap-2">
                    Confirme sua senha
                    <Input.Root>
                        <Input.Icon><LockOutlined className="ml-2 text-gray-500" /></Input.Icon>
                        <Input.Input name="confirmPassword" type="password" />
                        <Input.Icon>
                            {showPassword.confirmPassword ? (
                                <RemoveRedEyeOutlined className="text-font mr-2" onClick={event => handleShowPassword(event, "confirmPassword")} />
                            ) : (
                                <VisibilityOffOutlined className="text-font mr-2" onClick={event => handleShowPassword(event, "confirmPassword")} />
                            )}
                        </Input.Icon>
                    </Input.Root>
                </label>
                <div className="flex flex-col gap-4">
                    <Button.Root className="w-full">
                        Criar conta
                    </Button.Root>
                </div>
                <div className="text-center">
                        <Text className="text-center">Já possui uma conta ? </Text>
                        <Text className="text-primary" asChild>
                            <Link to="/signin">
                                Entrar agora
                            </Link>
                        </Text>
                    </div>
            </form>
        </div>
    )
}
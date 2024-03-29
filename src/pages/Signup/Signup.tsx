import { EmailOutlined, LockOutlined, RemoveRedEyeOutlined, VisibilityOffOutlined } from "@mui/icons-material"
import { FirebaseError } from "firebase/app"
import { SyntheticEvent, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "../../components/Button"
import { Heading } from "../../components/Heading"
import { Input } from "../../components/Input"
import { Text } from "../../components/Text"
import { useAuth } from "../../hooks/useAuth"
import { returnErrorMessage } from "../../services/firebase"
import { Inputs } from "./interface"


export const Signup = () => {
    const [showPassword, setShowPassword] = useState(
        {
            password: false,
            confirmPassword: false
        }
    );
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState: { errors }, setError , getValues} = useForm<Inputs>();
    const { signUp } = useAuth();
    const navigate = useNavigate();
    const onSubmit: SubmitHandler<Inputs> = async (data, event) => {
        try {
            setLoading(true);
            event?.preventDefault();
            await signUp(data.email, data.password);
            navigate("/home");
        }
        catch (error) {

            if (error instanceof FirebaseError)
                setError("name", { type: "manual", message: returnErrorMessage(error.code) })
        }
        setLoading(false);
    }
    const handleShowPassword = (event: SyntheticEvent, inputName: "password" | "confirmPassword") => {
        const input = event.currentTarget.previousElementSibling as HTMLInputElement;
        input.type = input.type === "password" ? "text" : "password"
        setShowPassword({ ...showPassword, [inputName]: !showPassword[inputName] })
    }
    return (
        <div className="flex md:px-0 px-4 w-full h-[90vh] justify-center mt-12 md:items-center">
            <form onSubmit={handleSubmit(onSubmit)} className="w-96 flex flex-col gap-6">
                <div>
                    <Heading size="lg">Criar Conta</Heading>
                    <Text>Informe seus dados para criar uma conta</Text>
                </div>
                <label className="flex flex-col gap-2">
                    Nome
                    <Input.Root>
                        <Input.Input {...register("name")} />
                    </Input.Root>
                    {errors.name && <Text className="text-red-800">{errors.name.message}</Text>}
                </label>
                <label className="flex flex-col gap-2">
                    Email
                    <Input.Root>
                        <Input.Icon>
                            <EmailOutlined className="text-gray-500 ml-2" />
                        </Input.Icon>
                        <Input.Input type="email" {...register("email")} />
                    </Input.Root>
                </label>
                <label className="flex flex-col gap-2">
                    Senha
                    <Input.Root>
                        <Input.Icon><LockOutlined className="ml-2 text-gray-500" /></Input.Icon>
                        <Input.Input type="password" {...register("password")} />
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
                        <Input.Input type="password" {...register("confirmPassword", {validate: value => value === getValues("password")})} />
                        <Input.Icon>
                            {showPassword.confirmPassword ? (
                                <RemoveRedEyeOutlined className="text-font mr-2" onClick={event => handleShowPassword(event, "confirmPassword")} />
                            ) : (
                                <VisibilityOffOutlined className="text-font mr-2" onClick={event => handleShowPassword(event, "confirmPassword")} />
                            )}
                        </Input.Icon>
                    </Input.Root>
                    {errors.confirmPassword?.type === "validate" && <Text className="text-red-800">As senhas não coincidem</Text>}
                </label>
                <div className="flex flex-col gap-4">
                    <Button.Root className="w-full" disabled={loading}>
                        {loading ? <Button.Loading /> : null}
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
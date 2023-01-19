import { EmailOutlined, LockOutlined, RemoveRedEyeOutlined, VisibilityOffOutlined, HourglassEmptyOutlined } from "@mui/icons-material";
import { FirebaseError } from "firebase/app";
import { SyntheticEvent, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import { Heading } from "../../components/Heading";
import { Input } from "../../components/Input";
import { Text } from "../../components/Text";
import { useAuth } from "../../hooks/useAuth";
import { returnErrorMessage } from "../../services/firebase";
import { Inputs } from "./interface";


export const Signin = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const { register, handleSubmit, formState: { errors }, setError } = useForm<Inputs>();
    const { signIn } = useAuth();
    const navigate = useNavigate();
    const handleShowPassword = (event: SyntheticEvent) => {
        const input = event.currentTarget.previousElementSibling as HTMLInputElement
        input.type = input.type === "password" ? "text" : "password"
        setShowPassword(!showPassword)
    }

    const onSubmit: SubmitHandler<Inputs> = async (data, event) => {
        try {
            setLoading(true);
            event?.preventDefault();
            await signIn(data.email, data.password);
            navigate("/home");
        }
        catch (error) {
            if (error instanceof FirebaseError)
                setError("email", { type: "manual", message: returnErrorMessage(error.code) })
        }
        setLoading(false);
    };
    return (
        <div className="flex w-full h-[90vh] justify-center items-center">
            <form onSubmit={handleSubmit(onSubmit)} className="w-96 flex flex-col gap-6">
                <div>
                    <Heading size="lg">Login</Heading>
                    <Text>Insira suas credenciais para acessar a plataforma</Text>
                </div>
                <label className="flex flex-col gap-2">
                    Email
                    <Input.Root>
                        <Input.Icon><EmailOutlined className="text-gray-500 ml-2" /></Input.Icon>
                        <Input.Input {...register("email")} />
                    </Input.Root>
                    {errors.email && <Text className="text-red-500">{errors.email.message}</Text>}
                </label>
                <label className="flex flex-col gap-2">
                    Senha
                    <Input.Root>
                        <Input.Icon><LockOutlined className="text-gray-500 ml-2" /></Input.Icon>
                        <Input.Input {...register("password")} type="password" />
                        <Input.Icon>
                            {showPassword ? (
                                <RemoveRedEyeOutlined className="text-font mr-2" onClick={handleShowPassword} />
                            ) : (
                                <VisibilityOffOutlined className="text-font mr-2" onClick={handleShowPassword} />
                            )}
                        </Input.Icon>
                    </Input.Root>
                    <Text className="text-end" asChild>
                        <Link to="/forgetPassword">Esqueceu sua senha ?</Link>
                    </Text>
                </label>
                <div className="flex flex-col gap-4">
                    <Button.Root type="submit" className="w-full">
                        {loading && (
                            <Button.Icon><HourglassEmptyOutlined className="animate-spin" /></Button.Icon>
                        )}
                        Entrar
                    </Button.Root>
                    <div className="text-center">
                        <Text className="text-center">Não possui uma conta ? </Text>
                        <Text className="text-primary" asChild>
                            <Link to="/signup">
                                Crie uma agora
                            </Link>
                        </Text>
                    </div>
                </div>
            </form>
        </div>
    );
};

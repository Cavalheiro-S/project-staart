import { EmailOutlined } from "@mui/icons-material";
import { FirebaseError } from "firebase/app";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { Input } from "../components/Input";
import { Text } from "../components/Text";
import { useAuth } from "../hooks/useAuth";
import { returnErrorMessage } from "../services/firebase";


export const ForgetPassword = () => {
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState: { errors }, setError } = useForm<{ email: string }>();
    const [linkSent, setLinkSent] = useState(false);

    const { recoverPassword } = useAuth();
    const onSubmit: SubmitHandler<{ email: string }> = async (data, event) => {
        try {
            setLoading(true);
            event?.preventDefault();
            await recoverPassword(data.email);
            setLinkSent(true);
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
                    <Heading size="lg">Recuperar senha</Heading>
                    <Text>Digite seu email para receber um link de recuperação de senha</Text>
                </div>
                <label className="flex flex-col gap-2">
                    Email
                    <Input.Root>
                        <Input.Icon><EmailOutlined className="text-gray-500 ml-2" /></Input.Icon>
                        <Input.Input {...register("email")} type="email"/>
                    </Input.Root>
                    {errors.email && <Text className="text-red-500">{errors.email.message}</Text>}
                    {linkSent && <Text className="text-green-500">Link de recuperação de senha enviado para o email</Text>}
                </label>

                <div className="flex flex-col gap-4">
                    <Button.Root type="submit" className="w-full" disabled={loading}>
                        {loading && <Button.Loading />}
                        Enviar email
                    </Button.Root>
                </div>
            </form>
        </div>
    );
};

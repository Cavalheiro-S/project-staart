import { EmailOutlined, LockOutlined, RemoveRedEyeOutlined, VisibilityOffOutlined } from "@mui/icons-material";
import { SyntheticEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { Input } from "../components/Input";
import { Text } from "../components/Text";


export const ForgetPassword = () => {
    return (
        <div className="flex w-full h-[90vh] justify-center items-center">
            <form className="w-96 flex flex-col gap-6">
                <div>
                    <Heading size="lg">Recuperar senha</Heading>
                    <Text>Digite seu email para receber um link de recuperação de senha</Text>
                </div>
                <label className="flex flex-col gap-2">
                    Email
                    <Input.Root>
                        <Input.Icon><EmailOutlined className="text-gray-500 ml-2" /></Input.Icon>
                        <Input.Input />
                    </Input.Root>
                </label>
                
                <div className="flex flex-col gap-4">
                    <Button.Root className="w-full">
                        Enviar email
                    </Button.Root>
                </div>
            </form>
        </div>
    );
};

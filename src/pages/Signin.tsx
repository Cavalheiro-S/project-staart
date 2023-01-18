import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { Input } from "../components/Input";
import { Text } from "../components/Text";


export const Signin = () => {
    return (
        <div className="flex w-full h-[90vh] justify-center items-center">
            <form className="w-96 flex flex-col gap-6">
                <div>
                    <Heading size="lg">Login</Heading>
                    <Text>Insira suas credenciais para acessar a plataforma</Text>
                </div>
                <label className="flex flex-col">
                    Email
                    <Input.Root>
                        <Input.Input />
                    </Input.Root>
                </label>
                <label className="flex flex-col gap-2">
                    Senha
                    <Input.Root>
                        <Input.Input type="password" />
                    </Input.Root>
                    <Text className="text-end" asChild>
                        <Link to="/forgetPassword">Esqueceu sua senha ?</Link>
                    </Text>
                </label>
                <div className="flex flex-col gap-4">
                    <Button.Root className="w-full">
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

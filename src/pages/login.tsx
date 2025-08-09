import type { ComponentPropsWithoutRef } from "react";
import { useState } from "react";
import { cn } from "../lib/utils";
import { Button } from "../components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

interface LoginFormProps extends ComponentPropsWithoutRef<"div"> {
    onShowRegister?: () => void;
}

export function LoginForm({
    className,
    onShowRegister,
    ...props
}: LoginFormProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Login attempted with:", { email, password });
        // Add your login logic here
    };

         return (
         <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
             <div className={cn("flex flex-col gap-6 w-full max-w-2xl", className)} {...props}>
            <Card className="w-full min-w-[500px]">
                <CardHeader className="px-12 pt-8">
                    <CardTitle>Login to your account</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent className="px-12 pb-8">
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-3">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="grid gap-3">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                    <a
                                        href="#"
                                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                    >
                                        Forgot your password?
                                    </a>
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    required
                                />
                            </div>
                            <div className="flex flex-col gap-3">
                                <Button type="submit" className="w-full">
                                    Login
                                </Button>
                                <Button variant="outline" className="w-full">
                                    Login with Google
                                </Button>
                            </div>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Don&apos;t have an account?{" "}
                            <button
                                type="button"
                                onClick={onShowRegister}
                                className="underline underline-offset-4 hover:text-primary"
                            >
                                Sign up
                            </button>
                        </div>
                    </form>
                </CardContent>
            </Card>
            </div>
        </div>
    );
}

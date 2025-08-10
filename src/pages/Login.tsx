import type { ComponentPropsWithoutRef, FormEvent } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "../lib/utils";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

// Example placeholders — adjust to your actual imports
// import { login } from "../auth";
// import { useNavigate } from "react-router-dom";

interface LoginFormProps extends ComponentPropsWithoutRef<"div"> {
  onShowRegister?: () => void;
}

export function LoginForm({ className, onShowRegister, ...props }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState("");

  // const navigate = useNavigate();
    const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        const jwt = data.bearerToken.token;
        const refresh = data.refreshToken.token;

        // login({ email, token: jwt, refreshToken: refresh });
        // navigate("/");

        setLoginMessage("Login successful!");
      } else {
        setLoginMessage(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      setLoginMessage("An error occurred. Please try again.");
    }
  };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div
                className={cn(
                    "flex flex-col gap-6 w-full max-w-2xl",
                    className
                )}
                {...props}
            >
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
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        required
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <div className="flex items-center">
                                        <Label htmlFor="password">
                                            Password
                                        </Label>
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
                                    <Button
                                        variant="outline"
                                        className="w-full"
                                    >
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

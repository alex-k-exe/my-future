import type { ComponentPropsWithoutRef } from "react";
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

interface RegisterFormProps extends ComponentPropsWithoutRef<"div"> {
    onBackToLogin?: () => void;
}

export function RegisterForm({
    className,
    onBackToLogin,
    ...props
}: RegisterFormProps) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [accountType, setAccountType] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [address1, setAddress1] = useState("");
    const [address2, setAddress2] = useState("");
    const [accountImage, setAccountImage] = useState<File | null>(null);
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Register attempted with:", {
            firstName,
            lastName,
            email,
            accountType,
            password,
            confirmPassword,
            address1,
            address2,
            accountImage: accountImage?.name
        });
        // Add your registration logic here
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setAccountImage(file);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div
                className={cn(
                    "flex flex-col gap-6 w-full max-w-4xl",
                    className
                )}
                {...props}
            >
                <Card>
                    <CardHeader>
                        <CardTitle>Register Your Info</CardTitle>
                        <CardDescription>
                            Create your account by filling in the information
                            below
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Left Column */}
                                <div className="space-y-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="firstName">
                                            First Name
                                        </Label>
                                        <Input
                                            id="firstName"
                                            type="text"
                                            value={firstName}
                                            onChange={(e) =>
                                                setFirstName(e.target.value)
                                            }
                                            required
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={email}
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                            required
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="password">
                                            Password
                                        </Label>
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

                                    <div className="grid gap-2">
                                        <Label htmlFor="address">Address</Label>
                                        <Input
                                            id="address1"
                                            type="text"
                                            placeholder="Address Line 1"
                                            value={address1}
                                            onChange={(e) =>
                                                setAddress1(e.target.value)
                                            }
                                            required
                                        />
                                        <Input
                                            id="address2"
                                            type="text"
                                            placeholder="Address Line 2"
                                            value={address2}
                                            onChange={(e) =>
                                                setAddress2(e.target.value)
                                            }
                                            className="mt-2"
                                        />
                                    </div>
                                </div>

                                {/* Right Column */}
                                <div className="space-y-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="lastName">
                                            Last Name
                                        </Label>
                                        <Input
                                            id="lastName"
                                            type="text"
                                            value={lastName}
                                            onChange={(e) =>
                                                setLastName(e.target.value)
                                            }
                                            required
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="accountType">
                                            Account Type
                                        </Label>
                                        <select
                                            id="accountType"
                                            value={accountType}
                                            onChange={(e) =>
                                                setAccountType(e.target.value)
                                            }
                                            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                            required
                                        >
                                            <option value="">
                                                Select account type
                                            </option>
                                            <option value="personal">
                                                Personal
                                            </option>
                                            <option value="business">
                                                Business
                                            </option>
                                            <option value="premium">
                                                Premium
                                            </option>
                                        </select>
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="confirmPassword">
                                            Confirm Password
                                        </Label>
                                        <Input
                                            id="confirmPassword"
                                            type="password"
                                            value={confirmPassword}
                                            onChange={(e) =>
                                                setConfirmPassword(
                                                    e.target.value
                                                )
                                            }
                                            required
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="accountImage">
                                            Account Image
                                        </Label>
                                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                            <input
                                                id="accountImage"
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                                className="hidden"
                                            />
                                            <label
                                                htmlFor="accountImage"
                                                className="cursor-pointer text-sm text-gray-600 hover:text-gray-800"
                                            >
                                                {accountImage ? (
                                                    <div>
                                                        <p className="font-medium">
                                                            {accountImage.name}
                                                        </p>
                                                        <p className="text-xs text-gray-500 mt-1">
                                                            Click to change
                                                        </p>
                                                    </div>
                                                ) : (
                                                    <div>
                                                        <p>Drag a file here</p>
                                                        <p className="text-xs text-gray-500 mt-1">
                                                            or click to select
                                                        </p>
                                                    </div>
                                                )}
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col gap-3 mt-6">
                                <Button type="submit" className="w-full">
                                    Create Account
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="w-full"
                                    onClick={() => navigate("/login")}
                                >
                                    Back to Login
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { HiEye, HiEyeOff } from "react-icons/hi";

const formSchema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormData = z.infer<typeof formSchema>;

export function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
    });

    const router = useRouter();

    const onSubmit = (data: FormData) => {
        const { email, password } = data;

        if (email === "admin@gmail.com" && password === "Kasradash@2025") {
            document.cookie = "isLoggedIn=true; path=/";
            document.cookie = "role=admin; path=/";
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("role", "admin");

            router.push("/");
        } else {
            alert("Invalid credentials");
        }
    };

    return (
        <Card className="w-full max-w-md rounded-2xl p-6 shadow-lg">
            <CardContent>
                <h1 className="text-center text-2xl font-semibold mb-2">SEO.Connect</h1>
                <h2 className="text-center text-lg mb-6">Welcome Back</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" {...register("email")} />
                        {errors.email && (
                            <p className="text-red-500 text-sm">{errors.email.message}</p>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="password">Password</Label>
                        <div className="relative">
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                {...register("password")}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? (
                                    <HiEye className="h-5 w-5" />
                                ) : (
                                    <HiEyeOff className="h-5 w-5" />
                                )}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="text-red-500 text-sm">{errors.password.message}</p>
                        )}
                        <p className="text-right text-sm text-gray-500 italic flex justify-end w-full">
                            Forgot your password?
                        </p>
                    </div>

                    <Button type="submit" className="w-full">
                        Log In
                    </Button>
                </form>

                <p className="mt-4 text-center text-sm">
                    Don’t have an account?{" "}
                    <Link href="/register" className="text-blue-600 hover:underline">
                        Sign up
                    </Link>
                </p>
            </CardContent>
        </Card>
    );
}

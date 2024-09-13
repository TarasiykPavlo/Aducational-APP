"use client";
// app/auth/login/page.js
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button, TextField, Typography } from "@mui/material";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSubmit = async e => {
        e.preventDefault();
        const result = await signIn("credentials", {
            redirect: false,
            username,
            password,
        });

        if (result.ok) {
            router.push("/");
        } else {
            console.error(result.error);
        }
    };

    return (
        <div className="max-w-4xl h-full p-3 space-y-6">
            <Typography
                variant="h4"
                component="h1"
            >
                Login
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Password"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    fullWidth
                    margin="normal"
                />

                <div className="flex justify-between pt-10">
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                    >
                        Sign In
                    </Button>
                    <Button
                        variant="text"
                        href="/registration"
                    >
                        Don`t have account?
                    </Button>
                    <Button
                        variant="text"
                        href="/"
                    >
                        home
                    </Button>
                </div>
            </form>
        </div>
    );
}

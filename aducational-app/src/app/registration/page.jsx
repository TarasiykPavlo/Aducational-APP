"use client";

import { useState } from "react";

import {
    Button,
    IconButton,
    InputAdornment,
    TextField,
    Typography,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { test } from "../lib/actions";

export default function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState(null);
    const handleRegister = async e => {
        const formData = new FormData(e.target);
        setErrors(null);

        const result = await test(formData);
        if (result.errors) {
            // Display validation errors from Zod
            setErrors(result.errors);
            console.log(result.errors);
        } else if (response.status === 200) {
            // Handle successful registration (e.g., redirect)
            alert(result.message);
        } else {
            // Handle other types of errors (e.g., server issues)
            alert(result.message || "An unexpected error occurred.");
        }
    };

    const handleClickShowPassword = () => setShowPassword(show => !show);

    return (
        <div className="max-w-2xl h-full p-3 space-y-6 w-full">
            <Typography
                variant="h4"
                component="h1"
            >
                Register
            </Typography>
            <form
                // onSubmit={handleRegister}
                action={() => handleRegister()}
            >
                <TextField
                    label="Username"
                    id="username"
                    margin="normal"
                    name="username"
                />
                <div className="flex items-center">
                    <TextField
                        id="password"
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        margin="normal"
                        name="password"
                    />
                    <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        className="  h-fit "
                    >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                </div>

                <div className="flex justify-between pt-10 ">
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                    >
                        Register
                    </Button>
                    <Button
                        variant="text"
                        href="/login"
                    >
                        I have account
                    </Button>
                </div>
            </form>
        </div>
    );
}

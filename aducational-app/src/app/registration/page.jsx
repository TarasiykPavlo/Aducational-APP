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
import { registerSchema } from "../lib/schema";

export default function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({
        password: "",
        username: "",
    });
    const [data, setData] = useState({
        password: "",
        username: "",
    });

    const handleData = event => {
        const { name, value } = event.target;
        setData(prevData => ({
            ...prevData,
            [name]: value,
        }));
        const parsedData = registerSchema.safeParse({ ...data, [name]: value });
        if (!parsedData.success) {
            const fieldErrors = parsedData.error.errors.reduce((acc, error) => {
                acc[error.path[0]] = error.message;
                return acc;
            }, {});
            setErrors(fieldErrors);

            console.log(fieldErrors);
        } else {
            // Clear errors for the field being updated
            setErrors(prevErrors => ({
                ...prevErrors,
                [name]: "",
            }));
        }
    };

    const handleClickShowPassword = () => setShowPassword(show => !show);

    return (
        <div className="max-w-96 h-full p-3 space-y-6 w-full">
            <Typography
                variant="h4"
                component="h1"
            >
                Register
            </Typography>
            <form
                // onSubmit={handleRegister}
                action={test}
            >
                <TextField
                    label="Username"
                    id="username"
                    margin="normal"
                    name="username"
                    onChange={handleData}
                    error={errors.username}
                    helperText={errors.username}
                    fullWidth
                />
                <TextField
                    id="password"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    margin="normal"
                    name="password"
                    helperText={errors.password}
                    error={errors.password}
                    onChange={handleData}
                    fullWidth
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    className="  h-fit "
                                >
                                    {showPassword ? (
                                        <VisibilityOff />
                                    ) : (
                                        <Visibility />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />

                <div className={`flex justify-between pt-10 `}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={
                            errors.password ||
                            errors.username ||
                            !data.password ||
                            !data.username
                        }
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

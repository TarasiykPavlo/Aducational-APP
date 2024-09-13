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
import { createUser } from "../lib/actions";
import { registerSchema } from "../lib/schema";
import { red } from "@mui/material/colors";

export default function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({
        password: "",
        username: "",
        email: "",
    });
    const [data, setData] = useState({
        password: "",
        username: "",
        email: "",
    });
    const [mainError, setMainError] = useState(null);

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
        } else {
            // Clear errors for the field being updated
            setErrors(prevErrors => ({
                ...prevErrors,
                [name]: "",
            }));
        }
    };
    const handleRegister = async formData => {
        const result = await createUser(formData);

        // Check if the result contains an error
        if (result.error) {
            // If there's an error, set it to the main error state
            setMainError(result.error);
        } else {
            // Clear any existing main error
            setMainError(null);
            // Handle successful registration here, e.g., redirect the user or show a success message
            console.log("User registered successfully:", result);
        }
    };
    const handleClickShowPassword = () => setShowPassword(show => !show);

    return (
        <div className="max-w-96 h-full p-3 space-y-6 w-full">
            <Typography
                variant="h4"
                component="h1"
            >
                Registration
            </Typography>
            <form
                // onSubmit={handleRegister}
                action={handleRegister}
            >
                {mainError && (
                    <Typography
                        variant="overline"
                        display="block"
                        gutterBottom
                        color={red[500]}
                    >
                        {mainError}
                    </Typography>
                )}
                <TextField
                    label="Username"
                    id="username"
                    margin="normal"
                    name="username"
                    onChange={handleData}
                    error={errors.username}
                    helperText={errors.username}
                    fullWidth
                    autoComplete="name"
                />
                <TextField
                    label="Email"
                    id="email"
                    margin="normal"
                    name="email"
                    onChange={handleData}
                    error={errors.email}
                    helperText={errors.email}
                    fullWidth
                    type="email"
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
                    autoComplete="current-password"
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
                            errors.email ||
                            !data.email ||
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

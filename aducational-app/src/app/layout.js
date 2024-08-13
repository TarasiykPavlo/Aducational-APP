import "./globals.css";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import theme from "./theme";
export const metadata = {
    title: "Aducational APP",
    description: "Aducational APP powered by Next JS",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <AppRouterCacheProvider options={{ key: "css" }}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <body>{children}</body>
                </ThemeProvider>
            </AppRouterCacheProvider>
        </html>
    );
}

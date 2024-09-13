import { Button } from "@mui/material";
import Image from "next/image";
import NavComponent from "./components/nav/NavComponent";
import PDFReader from "./components/PDFReader.jsx/PDFReader";

export default function Home() {
    return (
        <main className="space-x-1 w-full">
            <NavComponent />
            <PDFReader></PDFReader>
            <Button
                href="/registration"
                variant="contained"
            >
                registration
            </Button>
            <Button
                href="/login"
                variant="contained"
            >
                login
            </Button>
        </main>
    );
}

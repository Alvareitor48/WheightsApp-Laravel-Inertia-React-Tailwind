import React from "react";
import {Head} from "@inertiajs/react";
import {Header} from "@/Layouts/Header.jsx";
import {Footer} from "@/Layouts/Footer.jsx";
import MainLayout from "@/Layouts/MainLayout.jsx";

export default function Home() {
    return (
        <MainLayout>
            <Head title="Home" />
            <h1 className="text-4xl font-bold text-white">
                Home
            </h1>
        </MainLayout>
    );}

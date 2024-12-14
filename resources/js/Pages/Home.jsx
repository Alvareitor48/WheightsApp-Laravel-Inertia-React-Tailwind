import React from "react";
import {Head} from "@inertiajs/react";
import {Header} from "@/Layouts/Header.jsx";
import {Footer} from "@/Layouts/Footer.jsx";
import MainLayout from "@/Layouts/MainLayout.jsx";
import {FirstHomeMainContainer} from "@/Layouts/FirstHomeMainContainer.jsx";

export default function Home() {
    return (
        <MainLayout>
            <Head title="Home" />
            <FirstHomeMainContainer></FirstHomeMainContainer>
        </MainLayout>
    );}

import React from "react";
import {Head} from "@inertiajs/react";
import {Header} from "@/Layouts/Header.jsx";
import {Footer} from "@/Layouts/Footer.jsx";
import MainLayout from "@/Layouts/MainLayout.jsx";
import {FirstHomeMainContainer} from "@/Layouts/FirstHomeMainContainer.jsx";
import {MobileAndDesktopHomeContainer} from "@/Layouts/MobileAndDesktopHomeContainer.jsx";

export default function Home() {
    return (
        <MainLayout>
            <Head title="Home" />
            <FirstHomeMainContainer></FirstHomeMainContainer>
            <MobileAndDesktopHomeContainer
                Imageorientation={'left'}
                title={'CONTROLA TUS RUTINAS'}
                li={<>
                    <li>Registro de <span className="text-lilaPrincipal">series y repes</span></li>
                    <li>Control preciso del RIR</li>
                    <li><span className="text-lilaPrincipal">Acceso rapido</span> al historial</li>
                    <li>Control de las cargas</li>
                    <li>Monitoreo de <span className="text-lilaPrincipal">descansos</span></li>
                </>}>
            </MobileAndDesktopHomeContainer>
            <MobileAndDesktopHomeContainer
                Imageorientation={'right'}
                title={'PRIORIZA TUS OBJETIVOS'}
                li={<>
                    <li className="text-lilaPrincipal">Rutinas personalizadas</li>
                    <li>Hechas por profesionales</li>
                    <li>Conoce tus <span className="text-lilaPrincipal">calorias</span> necesarias</li>
                    <li>Busca tu objetivo</li>
                    <li>Calcula tu <span className="text-lilaPrincipal">repeticion maxima</span></li>
                </>}>
            </MobileAndDesktopHomeContainer>
        </MainLayout>
    );}

import React from "react";
import {Head} from "@inertiajs/react";
import {Header} from "@/Layouts/Header.jsx";
import {Footer} from "@/Layouts/Footer.jsx";

export default function Home() {
    return (
        <div className='grid grid-rows-[auto,1fr,auto]'>
            <Head title="Home"/>
            <Header></Header>
            <main className='mt-14 p-2 bg-black'>
                <h1 className="text-4xl font-bold text-white">
                    Home
                </h1>
            </main>
            <Footer></Footer>
        </div>
    );}

import {Header} from "@/Layouts/Header.jsx";
import {Footer} from "@/Layouts/Footer.jsx";

export default function MainLayout({ children}) {


    return (
        <>
            <div className='grid grid-rows-[auto,1fr,auto]'>
                <Header></Header>
                <main className='mt-14 p-2 bg-black'>
                    {children}
                </main>
                <Footer></Footer>
            </div>
        </>
    );
}

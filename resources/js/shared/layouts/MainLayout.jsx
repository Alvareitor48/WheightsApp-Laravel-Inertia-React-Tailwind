import {Header} from "@/shared/components/Header.jsx";
import {Footer} from "@/shared/components/Footer.jsx";
import { LazyMotion, domAnimation,m } from "motion/react"
import {useLanternAnimation} from "@/shared/hooks/useLanternAnimation.js";

export default function MainLayout({ children}) {
    const {cursorPosition} = useLanternAnimation();

    return (
        <>
            <LazyMotion features={domAnimation}>
            <div className='grid grid-rows-[auto,1fr,auto]'>
                <Header></Header>
                <main className='mt-14 p-2 pb-12 bg-black'>
                    <m.div
                        className="fixed pointer-events-none bg-white rounded-full"
                        style={{
                            width: "1400px",
                            height: "1400px",
                            background: 'radial-gradient(circle, rgba(106, 5, 116, 0.6), transparent 55%)',
                            x: cursorPosition.x-700,
                            y: cursorPosition.y-750,
                        }}
                        transition={{type: "spring", damping: 20, stiffness: 500}}
                    />
                    {children}
                </main>
                <Footer></Footer>
            </div>
            </LazyMotion>
        </>
    );
}

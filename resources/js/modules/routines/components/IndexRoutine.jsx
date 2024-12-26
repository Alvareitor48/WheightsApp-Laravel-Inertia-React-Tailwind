import {m} from "motion/react";
import {router} from "@inertiajs/react";
export function IndexRoutine({name,day,description,id}) {
    return (
        <>
            <div className="w-responsive-index-width mx-6 my-6">

                <div
                    className="m-auto w-full h-full glass flex flex-col items-start justify-start">

                    <div
                        className="px-2 pt-6 pb-2 w-full text-start rounded-t-xl border border-gray-300 border-b-0 z-10 bg-custom-gradient3">
                        <h2 className="text-start text-responsive-index-title font-semibold inline-block underline">{name}</h2>
                    </div>

                    <div className="px-2 py-1 w-full text-start border border-gray-300 border-t-0 border-b-0">
                        <h3 className="text-start text-responsive-index text-gray-400 inline-block">{day}</h3>
                    </div>

                    <div className="px-2 py-1 w-full text-start border border-gray-300 border-t-0 border-b-0">
                        <p className="text-start text-responsive-index text-gray-400 inline-block">{description}</p>
                    </div>

                    <div className="px-2 py-1 rounded-b-xl w-full border border-gray-300 border-t-0">
                        <m.button
                            className="bg-lilaPrincipal pb-1 m-2 w-responsive-index-button-width h-responsive-index-button-height text-responsive-index rounded-xl"
                            whileHover={{backgroundColor: "#8F3985", scale: 1.1}}
                            onClick={() => router.visit(route('AdminRoutines',id))}
                        >
                            Comenzar Rutina
                        </m.button>
                    </div>
                    {
                        /*Muñeco con los musculos implicados*/
                    }
                </div>
            </div>
        </>
    );
}

import React from 'react';
import shoulder_press from '@/assets/images/shoulder_press.png'
export function PrincipalTable() {
    return (
        <>
            <div className="m-auto w-[90%] mt-6 mb-6">
                <div
                    className="border border-gray-300 border-b-0 rounded-t-xl glasstop grid grid-cols-4 items-center justify-between mt-8 mb-1">
                    <div className="flex justify-center m-1">
                        <div
                            className="h-responsive-height-table-image w-responsive-width-table-image rounded-full bg-cover bg-center"
                            style={{backgroundImage: `url(${shoulder_press})`}}
                        ></div>
                    </div>

                    {/* Título del Ejercicio */}
                    <div className="text-center px-2 py-3">
                        <h2 className="text-responsive-table font-semibold inline-block">Press Militar</h2>
                    </div>

                    {/* Notas */}
                    <div className="text-center px-2 py-3">
                        <p className="text-responsive-note-table text-gray-400 inline-block">Anotaciones varias</p>
                    </div>

                    {/* Temporizador (No funcional) */}
                    <div className="text-center px-2 py-3">
                        <p className="text-responsive-table font-medium text-gray-400 inline-block">03:00</p>
                    </div>
                </div>

                <table
                    className="text-responsive-table border-separate border-spacing-0 glassbottom border border-gray-300 border-t-0 rounded-b-xl w-full">
                    <thead>
                    <tr className="text-white uppercase leading-normal">
                        <th className="w-1/4 py-3 px-2 text-center">Serie</th>
                        <th className="w-1/4 py-3 px-2 text-center">Reps</th>
                        <th className="w-1/4 py-3 px-2 text-center">Peso</th>
                        <th className="w-1/4 py-3 px-2 text-center">RIR</th>
                    </tr>
                    </thead>
                    <tbody className="text-gray-700">
                    <tr className="border-b border-gray-200 hover:bg-lilaPrincipal">
                        <td className="py-3 px-2 text-center whitespace-nowrap">1</td>
                        <td className="py-3 px-2 text-center">5</td>
                        <td className="py-3 px-2 text-center">20</td>
                        <td className="py-3 px-2 text-center">2</td>
                    </tr>
                    <tr className="border-b border-gray-200 hover:bg-lilaPrincipal">
                        <td className="py-3 px-2 text-center whitespace-nowrap">2</td>
                        <td className="py-3 px-2 text-center">5</td>
                        <td className="py-3 px-2 text-center">20</td>
                        <td className="py-3 px-2 text-center">2</td>
                    </tr>
                    <tr className="border-b border-gray-200 hover:bg-lilaPrincipal">
                        <td className="py-3 px-2 text-center whitespace-nowrap">3</td>
                        <td className="py-3 px-2 text-center">5</td>
                        <td className="py-3 px-2 text-center">20</td>
                        <td className="py-3 px-2 text-center">2</td>
                    </tr>
                    <tr className="border-b border-gray-200 hover:bg-lilaPrincipal">
                        <td className="py-3 px-2 text-center whitespace-nowrap">4</td>
                        <td className="py-3 px-2 text-center">5</td>
                        <td className="py-3 px-2 text-center">20</td>
                        <td className="py-3 px-2 text-center">2</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
}

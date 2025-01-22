import React from "react";
import { router } from "@inertiajs/react";
import { m } from "motion/react";

export default function Pagination({ links }) {
    if (!links) return null;

    return (
        <div className="flex justify-center items-center space-x-4 mt-6">
            <m.button
                onClick={() => links.first && router.visit(links.first)}
                className={`${
                    links.first ? "bg-lilaPrincipal" : "bg-gray-400"
                } m-2 p-3 pt-1 w-responsive-normal-button-width h-responsive-normal-button-height text-responsive-note-table rounded-xl custom-flex-wrap-first-title:m-1 custom-flex-wrap-first-title:px-1`}
                disabled={!links.first}
                whileHover={
                    links.first
                        ? { backgroundColor: "#8F3985", scale: 1.1 }
                        : {}
                }
            >
                Primero
            </m.button>
            <m.button
                onClick={() => links.prev && router.visit(links.prev)}
                className={`${
                    links.prev ? "bg-lilaPrincipal" : "bg-gray-400"
                } m-2 p-3 pt-1 w-responsive-normal-button-width h-responsive-normal-button-height text-responsive-note-table rounded-xl custom-flex-wrap-first-title:m-1 custom-flex-wrap-first-title:px-1`}
                disabled={!links.prev}
                whileHover={
                    links.prev ? { backgroundColor: "#8F3985", scale: 1.1 } : {}
                }
            >
                Anterior
            </m.button>
            <m.button
                onClick={() => links.next && router.visit(links.next)}
                className={`${
                    links.next ? "bg-lilaPrincipal" : "bg-gray-400"
                } m-2 p-3 pt-1 w-responsive-normal-button-width h-responsive-normal-button-height text-responsive-note-table rounded-xl custom-flex-wrap-first-title:m-1 custom-flex-wrap-first-title:px-1`}
                disabled={!links.next}
                whileHover={
                    links.next ? { backgroundColor: "#8F3985", scale: 1.1 } : {}
                }
            >
                Siguiente
            </m.button>
            <m.button
                onClick={() => links.last && router.visit(links.last)}
                className={`${
                    links.last ? "bg-lilaPrincipal" : "bg-gray-400"
                } m-2 p-3 pt-1 w-responsive-normal-button-width h-responsive-normal-button-height text-responsive-note-table rounded-xl custom-flex-wrap-first-title:m-1 custom-flex-wrap-first-title:px-1`}
                disabled={!links.last}
                whileHover={
                    links.last ? { backgroundColor: "#8F3985", scale: 1.1 } : {}
                }
            >
                Último
            </m.button>
        </div>
    );
}

import { useUpdate } from "@/modules/routines/hooks/useUpdate";

export function GridTableBase({ tds }) {
    const { data } = useUpdate();
    return (
        <>
            <tr className="border-b border-gray-200 hover:bg-lilaPrincipal">
                {tds.map((td, index) => (
                    <td key={index} className="py-3 px-2 text-center">
                        {td}
                    </td>
                ))}
            </tr>
        </>
    );
}

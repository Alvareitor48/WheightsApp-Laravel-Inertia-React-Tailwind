import { useTranslation } from "@/shared/hooks/useTranslation";

export function PrincipalTableBase({ headDivs, tbody, aditionalDivs }) {
    const t = useTranslation();
    return (
        <>
            <div className="m-auto w-[90%] mt-6 mb-6 relative">
                <div className="border border-gray-300 border-b-0 rounded-t-xl glasstop grid grid-cols-4 items-center justify-between mt-8 mb-1">
                    {headDivs.map((headDiv, index) => (
                        <div key={index}>{headDiv}</div>
                    ))}
                </div>

                <table className="text-responsive-table border-separate border-spacing-0 glassfull border border-gray-300 border-t-0 w-full">
                    <thead>
                        <tr className="text-white uppercase leading-normal">
                            <th className="w-1/4 py-3 px-2 text-center">
                                {t("principal_table_base_series")}
                            </th>
                            <th className="w-1/4 py-3 px-2 text-center">
                                {t("principal_table_base_reps")}
                            </th>
                            <th className="w-1/4 py-3 px-2 text-center">
                                {t("principal_table_base_weight")}
                            </th>
                            <th className="w-1/4 py-3 px-2 text-center">RIR</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">{tbody}</tbody>
                </table>
                {aditionalDivs}
            </div>
        </>
    );
}

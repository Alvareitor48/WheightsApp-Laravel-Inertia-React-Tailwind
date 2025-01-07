export function PrincipalTableBase({ headDivs, tbody, aditionalDivs }) {
    return (
        <>
            <div className="m-auto w-[90%] mt-6 mb-6">
                <div className="border border-gray-300 border-b-0 rounded-t-xl glasstop grid grid-cols-4 items-center justify-between mt-8 mb-1">
                    {headDivs.map((headDiv, index) => (
                        <div key={index}>{headDiv}</div>
                    ))}
                </div>

                <table className="text-responsive-table border-separate border-spacing-0 glassbottom border border-gray-300 border-t-0 rounded-b-xl w-full">
                    <thead>
                        <tr className="text-white uppercase leading-normal">
                            <th className="w-1/4 py-3 px-2 text-center">
                                Serie
                            </th>
                            <th className="w-1/4 py-3 px-2 text-center">
                                Reps
                            </th>
                            <th className="w-1/4 py-3 px-2 text-center">
                                Peso
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

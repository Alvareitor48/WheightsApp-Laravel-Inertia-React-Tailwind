import { useUpdate } from '@/modules/routines/hooks/useUpdate';

export function GridTableShow({seriesIndex,principalIndex}) {
    const {data} = useUpdate();
    return (
        <>
        <tr className="border-b border-gray-200 hover:bg-lilaPrincipal">
            <td className="py-3 px-2 text-center whitespace-nowrap">
                {seriesIndex+1}
            </td>
            <td className="py-3 px-2 text-center">
                {data.exercises[principalIndex].data.series[principalIndex][seriesIndex]["repetitions"]}
            </td>
            <td className="py-3 px-2 text-center">
                {data.exercises[principalIndex].data.series[principalIndex][seriesIndex]["weight"]}
            </td>
            <td className="py-3 px-2 text-center">
                {data.exercises[principalIndex].data.series[principalIndex][seriesIndex].failure === 1 ?
                    'F':
                    data.exercises[principalIndex].data.series[principalIndex][seriesIndex].RIR
                }
            </td>
        </tr>
</>
)
}

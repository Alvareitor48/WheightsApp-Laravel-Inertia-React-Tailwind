import { useUpdate } from '@/modules/routines/hooks/useUpdate';
import { GridTableBase } from '@/modules/routines/components/GridTableBase';

export function GridTableShow({seriesIndex,principalIndex}) {
    const {data} = useUpdate();
    const tds = [
        seriesIndex+1,
        data.exercises[principalIndex].data.series[principalIndex][seriesIndex]["repetitions"],
        data.exercises[principalIndex].data.series[principalIndex][seriesIndex]["weight"],
        data.exercises[principalIndex].data.series[principalIndex][seriesIndex].failure === 1 ?
            'F':
            data.exercises[principalIndex].data.series[principalIndex][seriesIndex].RIR
    ]
    return (
        <>
        <GridTableBase tds={tds}></GridTableBase>
        </>
)
}

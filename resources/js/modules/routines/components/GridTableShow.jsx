import { useUpdate } from "@/modules/routines/hooks/useUpdate";
import { GridTableBase } from "@/modules/routines/components/GridTableBase";

export function GridTableShow({ seriesIndex, principalIndex }) {
    const { data } = useUpdate();
    const tds = [
        seriesIndex + 1,
        data.exercises[principalIndex].series[seriesIndex]["repetitions"],
        data.exercises[principalIndex].series[seriesIndex]["weight"],
        data.exercises[principalIndex].series[seriesIndex].failure === 1
            ? "F"
            : data.exercises[principalIndex].series[seriesIndex].RIR,
    ];
    return (
        <>
            <GridTableBase tds={tds}></GridTableBase>
        </>
    );
}

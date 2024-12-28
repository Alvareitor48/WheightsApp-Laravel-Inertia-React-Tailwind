import shoulder_press from '@/modules/routines/assets/images/shoulder_press.png'
import { GridTableShow } from "@/modules/routines/components/GridTableShow.jsx";
import { useUpdate } from '@/modules/routines/hooks/useUpdate';
import { PrincipalTableBase } from './PrincipalTableBase';
export function PrincipalTableShow({ index, series }) {
    const { data } = useUpdate()
    const headDivs = [
        <div className='flex justify-center m-1'>
            <div
                className="h-responsive-height-table-image w-responsive-width-table-image rounded-full bg-cover bg-center"
                style={{ backgroundImage: `url(${shoulder_press})` }}
            ></div>
        </div>,
        <div className='text-center px-2 py-3'>
            <h2 className='text-responsive-table font-semibold inline-block'>{data.exercises[index].data.exercise[index].name}</h2>
        </div>,
        <div className='text-center px-2 py-3'>
            <p className='text-responsive-note-table text-gray-400 inline-block'> {data.exercises[index].data.note}</p>
        </div>,
        <div className='text-center px-2 py-3'>
            <p className='text-responsive-table font-medium text-gray-400 inline-block'>03:00</p>
        </div>
        ]

    const tbody = series.map(function (serie, seriesIndex) {
        return (
            <GridTableShow key={`${serie.id}.${index}`} seriesIndex={seriesIndex}
                principalIndex={index}></GridTableShow>
        )
    })
    return (
        <>
            <PrincipalTableBase headDivs={headDivs} tbody={tbody}></PrincipalTableBase>
        </>
    );
}

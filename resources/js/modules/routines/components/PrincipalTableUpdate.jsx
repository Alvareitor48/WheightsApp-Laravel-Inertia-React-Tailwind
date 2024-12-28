import shoulder_press from '@/modules/routines/assets/images/shoulder_press.png'
import { GridTableUpdate } from "@/modules/routines/components/GridTableUpdate.jsx";
import { m } from "motion/react"
import { useUpdate } from '@/modules/routines/hooks/useUpdate';
import { useCreateSeries } from '../hooks/useCreateSeries';
import { PrincipalTableBase } from './PrincipalTableBase';
export function PrincipalTableUpdate({ index, series }) {
    const { update, data } = useUpdate()
    const { createSeries } = useCreateSeries()
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
        <div className='text-center'>
            <textarea
                rows={1}
                className='text-responsive-note-table leading-normal resize-none w-responsive-mini-input text-gray-400 inline-block bg-transparent border-0'
                value={data.exercises[index].data.note}
                onChange={(e) => update(e.target.value, true, 'note', index)}
                onInput={(e) => {
                    e.target.style.height = "auto";
                    e.target.style.height = `${e.target.scrollHeight}px`;
                }}
            />
        </div>,
        <div className='text-center px-2 py-3'>
            <p className='text-responsive-table font-medium text-gray-400 inline-block'>03:00</p>
        </div>
    ]

    const tbody = series.map(function (serie, seriesIndex) {
        return (
            <GridTableUpdate key={`${serie.id}.${index}`} seriesIndex={seriesIndex}
                principalIndex={index}></GridTableUpdate>
        )
    });

    const aditionalDivs = (
        <m.button
            type="button"
            className="glass pb-1 mt-5 w-full h-responsive-normal-button-height text-responsive-h4"
            whileHover={{ scale: 1.1 }}
            onClick={(e) => {
                e.preventDefault();
                createSeries(index);
            }}
        >
            + Añadir Serie
        </m.button>
    )
    return (
        <>
            <PrincipalTableBase headDivs={headDivs} tbody={tbody} aditionalDivs={aditionalDivs}></PrincipalTableBase>
        </>
    );
}

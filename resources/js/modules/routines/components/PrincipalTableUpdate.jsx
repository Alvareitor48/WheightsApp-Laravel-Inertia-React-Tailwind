import shoulder_press from '@/modules/routines/assets/images/shoulder_press.png'
import { GridTableUpdate } from "@/modules/routines/components/GridTableUpdate.jsx";
import { m } from "motion/react"
import { useUpdate } from '@/modules/routines/hooks/useUpdate';
import { useCreateSeries } from '../hooks/useCreateSeries';
import { PrincipalTableBase } from './PrincipalTableBase';
import { handleErrors } from '../functions/handleErrors';
export function PrincipalTableUpdate({ index }) {
    const { update, data, errors } = useUpdate()
    const { createSeries } = useCreateSeries()
    const headDivs = [
        <div className='flex justify-center m-1'>
            <div
                className="h-responsive-height-table-image w-responsive-width-table-image rounded-full bg-cover bg-center"
                style={{ backgroundImage: `url(${shoulder_press})` }}
            ></div>
        </div>,
        <div className='text-center px-2 py-3'>
            <h2 className='text-responsive-table font-semibold inline-block'>{data.exercises[index].exercise.name}</h2>
        </div>,
        <div className='text-center'>
            <textarea
                rows={1}
                className='text-responsive-note-table leading-normal resize-none w-responsive-mini-input text-gray-400 inline-block bg-transparent border-0'
                value={data.exercises[index].note}
                onChange={(e) => update(e.target.value, true, 'note', index)}
                onInput={(e) => {
                    e.target.style.height = "auto";
                    e.target.style.height = `${e.target.scrollHeight}px`;
                }}
            />
            {errors[`exercises.${index}.data.note`] && (
                <p className="text-red-500 text-responsive-note-table mt-1">{errors[`exercises.${index}.data.note`]}</p>
            )}
        </div>,
        <div className='text-center px-2 py-3'>
            <p className='text-responsive-table font-medium text-gray-400 inline-block'>03:00</p>
        </div>
    ]

    const tbody = data.exercises[index].series.map(function (serie, seriesIndex) {
        return (
            <GridTableUpdate key={`${serie.id}.${index}`} seriesIndex={seriesIndex}
                principalIndex={index}></GridTableUpdate>
        )
    });

    const aditionalDivs = (
        <>
            {handleErrors(index, errors) === 'both' ? (
                <p className="text-red-500 text-responsive-note-table mt-1">¡Hay errores en las repeticiones y los pesos!</p>
            ) : handleErrors(index, errors) === 'repetitions' ? (
                <p className="text-red-500 text-responsive-note-table mt-1">¡Hay errores en las repeticiones!</p>
            ) : handleErrors(index, errors) === 'weight' ? (
                <p className="text-red-500 text-responsive-note-table mt-1">¡Hay errores en los pesos!</p>
            ) : null}
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
        </>
    )
    return (
        <>
            <PrincipalTableBase headDivs={headDivs} tbody={tbody} aditionalDivs={aditionalDivs}></PrincipalTableBase>
        </>
    );
}

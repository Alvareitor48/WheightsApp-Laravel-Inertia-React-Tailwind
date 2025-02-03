import shoulder_press from "@/modules/routines/assets/images/shoulder_press.png";
import { GridTableShow } from "@/modules/routines/components/GridTableShow.jsx";
import { useUpdate } from "@/modules/routines/hooks/useUpdate";
import { PrincipalTableBase } from "./PrincipalTableBase";
import VideoThumbnail from "@/shared/components/VideoThumbnail";
export function PrincipalTableShow({ index }) {
    const { data } = useUpdate();
    const headDivs = [
        <div className="flex justify-center m-1">
            <VideoThumbnail
                mediaSrc={data.exercises[index].exercise.url}
                imgClassname="h-responsive-height-table-image w-responsive-width-table-image rounded-full bg-cover bg-center"
                title={data.exercises[index].exercise.name}
            />
        </div>,
        <div className="text-center px-2 py-3">
            <h2 className="text-responsive-table font-semibold inline-block break-all">
                {data.exercises[index].exercise.name}
            </h2>
        </div>,
        <div className="text-center px-2 py-3">
            <p className="text-responsive-note-table text-gray-400 inline-block break-all">
                {" "}
                {data.exercises[index].note}
            </p>
        </div>,
        <div className="text-center px-2 py-3">
            <p className="text-responsive-table font-medium text-gray-400 inline-block break-all">
                03:00
            </p>
        </div>,
    ];

    const tbody = data.exercises[index].series.map(function (
        serie,
        seriesIndex
    ) {
        return (
            <GridTableShow
                key={`${serie.id}.${index}`}
                seriesIndex={seriesIndex}
                principalIndex={index}
            ></GridTableShow>
        );
    });
    return (
        <>
            <PrincipalTableBase
                headDivs={headDivs}
                tbody={tbody}
            ></PrincipalTableBase>
        </>
    );
}

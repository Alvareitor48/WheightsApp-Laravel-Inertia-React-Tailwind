import { useEffect, useRef, useState } from "react";

const VideoThumbnail = ({ mediaSrc, imgClassname, titulo }) => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [thumbnail, setThumbnail] = useState(null);
    const baseURL = "http://laravel-react.test/"; // Cambiar en producción

    useEffect(() => {
        if (mediaSrc.endsWith(".mp4")) {
            const video = videoRef.current;
            video.crossOrigin = "anonymous";
            video.src = baseURL + mediaSrc;
            video.load();
            video.onloadeddata = () => {
                video.currentTime = 0.1; // Capturar el primer frame
            };
            video.onseeked = () => {
                const canvas = canvasRef.current;
                const ctx = canvas.getContext("2d");
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                setThumbnail(canvas.toDataURL("image/png"));
            };
        } else {
            setThumbnail(baseURL + mediaSrc);
        }
    }, [mediaSrc]);

    return (
        <div>
            {thumbnail ? (
                <img src={thumbnail} alt={titulo} className={imgClassname} />
            ) : (
                <p>Cargando...</p>
            )}
            {mediaSrc.endsWith(".mp4") && (
                <video
                    ref={videoRef}
                    style={{ display: "none" }}
                    className={imgClassname}
                    alt={titulo}
                />
            )}
            <canvas
                ref={canvasRef}
                style={{ display: "none" }}
                className={imgClassname}
                alt={titulo}
            />
        </div>
    );
};

export default VideoThumbnail;

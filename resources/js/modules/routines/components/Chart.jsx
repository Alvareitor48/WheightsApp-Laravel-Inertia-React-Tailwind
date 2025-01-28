import { useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

const Chart = ({ data, height, width }) => {
    const [metric, setMetric] = useState("Repeticiones Totales");

    const handleMetricChange = (e) => {
        setMetric(e.target.value);
    };

    return (
        <div className="mt-7 flex flex-col items-center justify-center">
            <div className="mb-4">
                <select
                    id="metric"
                    value={metric}
                    onChange={handleMetricChange}
                    className="border p-2 rounded bg-black text-responsive-select text-white"
                >
                    <option value="Repeticiones Totales">
                        Repeticiones Totales
                    </option>
                    <option value="Peso Levantado">Peso Levantado</option>
                </select>
            </div>

            <ResponsiveContainer width={width} height={height}>
                <LineChart
                    data={data}
                    margin={{
                        top: 20,
                        right: 60,
                        left: 0,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid stroke="#fff" />
                    <XAxis dataKey="date" tick={{ fill: "#fff" }} />
                    <YAxis tick={{ fill: "#fff" }} />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: "#000", // Fondo negro
                            color: "#fff", // Texto blanco
                            borderRadius: "5px", // Bordes redondeados
                            border: "none", // Sin borde
                        }}
                        itemStyle={{
                            color: "#fff", // Texto blanco para elementos
                        }}
                        labelStyle={{
                            color: "#8884d8", // Color del texto de la etiqueta
                        }}
                    />
                    <Line
                        type="monotone"
                        dataKey={metric} // Cambia entre "repetitionsCount" y "weightCount"
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Chart;

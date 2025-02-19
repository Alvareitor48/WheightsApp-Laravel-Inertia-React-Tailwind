import { useTranslation } from "@/shared/hooks/useTranslation";
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
    const t = useTranslation();
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
                        {t("chart_total_reps")}
                    </option>
                    <option value="Peso Levantado">
                        {t("chart_total_weight")}
                    </option>
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
                            backgroundColor: "#000",
                            color: "#fff",
                            borderRadius: "5px",
                            border: "none",
                        }}
                        itemStyle={{
                            color: "#fff",
                        }}
                        labelStyle={{
                            color: "#8884d8",
                        }}
                    />
                    <Line
                        type="monotone"
                        dataKey={metric}
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Chart;

import {
  Legend,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";

import './styles/chartStyles.css'


export interface ChartDataInterface {
  style: string;
  value: number;
  fullMark: number;
}

interface Props {
  name: string;
  data: ChartDataInterface[];
}

export function Chart({ name, data }: Props) {
  return (
    <div className="chart-container w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" data={data}>
          <PolarGrid gridType="circle" stroke="#646262" strokeWidth={0.8} />

          <PolarAngleAxis
            dataKey="style"
            tick={{ fill: "#4B5563", fontSize: 14, fontWeight: 500 }}
            tickLine={{ stroke: "#9CA3AF" }}
          />

          <PolarRadiusAxis
            angle={30}
            domain={[0, 100]}
            tickCount={6}
            tick={{ fill: "#6B7280", fontSize: 14 }}
            axisLine={{ stroke: "#D1D5DB" }}
          />

          {data.map((entry, index) => {
            const angle = (index * 360) / data.length - 90;
            const radian = (angle * Math.PI) / 180;
            const radius = 0.85; // (ajustar según necesidad)

            const xBase = 50 + radius * 50 * Math.cos(radian);
            const yBase = 50 + radius * 50 * Math.sin(radian);

            const offset = 1; // valor para el desplazamiento
            const x = xBase + Math.cos(radian) * offset;
            const y = yBase + Math.sin(radian) * offset;

            return (
              <text
                key={`value-${index}`}
                x={`${x}%`}
                y={`${y}%`}
                textAnchor="middle"
                fill="#4F46E5"
                fontSize={14}
                fontWeight="bold"
                dominantBaseline="middle"
              >
                {`${entry.value} %`}
              </text>
            );
          })}

          <Radar
            name={name}
            dataKey="value"
            stroke="#4F46E5"
            strokeWidth={2}
            fill="#818CF8"
            fillOpacity={0.6}
            dot={{ fill: "#4F46E5", strokeWidth: 2, r: 4 }}
            animationEasing="ease-out"
            animationDuration={800}
          />

          <Legend
            wrapperStyle={{ paddingTop: "10px" }}
            formatter={(value) => (
              <span className="text-gray-700 text-sm">{value}</span>
            )}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

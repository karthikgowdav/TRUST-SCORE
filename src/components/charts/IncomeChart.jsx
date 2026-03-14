import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";

function IncomeChart({data}) {

  return (
    <LineChart width={400} height={200} data={data}>
      <XAxis dataKey="day"/>
      <YAxis/>
      <Tooltip/>
      <Line type="monotone" dataKey="income" stroke="#4f46e5"/>
    </LineChart>
  );
}

export default IncomeChart;
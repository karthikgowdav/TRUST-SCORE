import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";

function ExpenseChart({data}) {

  return (
    <BarChart width={400} height={200} data={data}>
      <XAxis dataKey="day"/>
      <YAxis/>
      <Tooltip/>
      <Bar dataKey="expense" fill="#ef4444"/>
    </BarChart>
  );
}

export default ExpenseChart;
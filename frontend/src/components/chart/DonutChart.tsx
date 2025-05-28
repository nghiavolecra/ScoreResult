import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'

type ChartData = {
  name: string
  value: number
}

type RenderDoughnutChartProps = {
  data: ChartData[]
  colorArray: string[]
}
const scoreRanges: Record<string, string> = {
  excellent: '≥ 8',
  good: '6 - 7.99',
  average: '4 - 5.99',
  poor: '< 4'
}
/* eslint-disable  @typescript-eslint/no-explicit-any */
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length > 0) {
    const { name, value } = payload[0]
    return (
      <div style={{ background: '#fff', padding: 10, border: '1px solid #ccc', borderRadius: 4 }}>
        <p>
          <strong>{name}</strong>
        </p>
        <p>Students: {value}</p>
        <p>Score Range: {scoreRanges[name] ?? 'N/A'}</p>
      </div>
    )
  }
  return null
}
export const DonutChart = ({ data, colorArray }: RenderDoughnutChartProps) => {
  return (
    <ResponsiveContainer width='100%' height={300}>
      <PieChart>
        <Pie
          data={data}
          cx='50%'
          cy='50%'
          innerRadius={70}
          outerRadius={100}
          fill='#8884d8'
          dataKey='value'
          stroke='#fff'
          strokeWidth={3}
        >
          {data?.map((_entry, index) => <Cell key={`cell-${index}`} fill={colorArray[index % colorArray.length]} />)}
        </Pie>
        <Tooltip content={<CustomTooltip />} />

        <Legend
          iconType='circle'
          layout='vertical'
          verticalAlign='top'
          fontSize={12}
          align='right'
          wrapperStyle={{
            top: '50%',
            right: 10,
            paddingLeft: 20,
            paddingTop: 20,
            transform: 'translateY(-50%)'
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}

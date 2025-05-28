import { LineChart, CartesianGrid, XAxis, YAxis, Legend, Tooltip, Line, ResponsiveContainer } from 'recharts'

type ScoreBucket = {
  range: string
  frequency: number
}

const LineChart_ = ({ data }: { data: ScoreBucket[] }) => {
  return (
    <ResponsiveContainer width='100%' height={300}>
      <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray={'5 5'} strokeOpacity={'0.2'} vertical={false} />
        <XAxis stroke='#888888' fontSize={12} tickLine={false} axisLine={false} padding={{ left: 5, right: 5 }} />
        <YAxis stroke='#888888' fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
        <Tooltip />
        <Legend />
        <Line type='monotone' dataKey='frequency' stroke='#8884d8' />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default LineChart_

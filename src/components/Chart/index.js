import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'
import './index.css'

const Chart = props => {
  const {data1} = props
  let lost = 0
  let won = 0
  let draw = 0
  for (const i of data1) {
    if (i.matchStatus === 'Lost') {
      lost += 1
    } else if (i.matchStatus === 'Won') {
      won += 1
    } else if (i.matchStatus === 'Drawn') {
      draw += 1
    }
  }
  const data = [
    {
      count: won,
      language: 'won',
    },
    {
      count: lost,
      language: 'lost',
    },
    {
      count: draw,
      language: 'draw',
    },
  ]

  return (
    <ResponsiveContainer width="50%" height={300} className="container-pie">
      <PieChart>
        <Pie
          cx="70%"
          cy="40%"
          data={data}
          startAngle={0}
          endAngle={360}
          innerRadius="0%"
          outerRadius="70%"
          dataKey="count"
        >
          <Cell name="won" fill="#17e31a" />
          <Cell name="lost" fill="#eb0e28" />
          <Cell name="drawn" fill="#e3d917" />
        </Pie>
        <Legend
          iconType="square"
          layout="vertical"
          verticalAlign="middle"
          align="left"
        />
      </PieChart>
    </ResponsiveContainer>
  )
}

export default Chart

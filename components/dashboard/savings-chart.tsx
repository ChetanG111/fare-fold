'use client'

import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { format } from 'date-fns'

interface SavingsChartProps {
  data: {
    timestamp: string
    savings: number
  }[]
}

export function SavingsChart({ data }: SavingsChartProps) {
  if (!data || data.length === 0) return null

  return (
    <Card className="border-[#ded3c5] bg-[#fffdf8]">
      <CardHeader>
        <CardTitle className="text-sm uppercase tracking-wider font-extrabold text-[#211b17]">
          Savings Growth
        </CardTitle>
      </CardHeader>
      <CardContent className="h-[200px] w-full pt-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorSavings" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#246b50" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#246b50" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ded3c5" />
            <XAxis 
              dataKey="timestamp" 
              hide
            />
            <YAxis 
              tick={{ fontSize: 10, fill: '#6d6259' }} 
              axisLine={false} 
              tickLine={false}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fffdf8', 
                border: '1px solid #ded3c5',
                borderRadius: '8px',
                fontSize: '12px'
              }}
              labelFormatter={(label) => format(new Date(label), 'MMM d, HH:mm')}
            />
            <Area 
              type="monotone" 
              dataKey="savings" 
              stroke="#246b50" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorSavings)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

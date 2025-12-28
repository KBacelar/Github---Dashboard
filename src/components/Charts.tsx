import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, CartesianGrid
} from 'recharts';
import type { WeeklyCommitActivity, LanguageData } from '../types';

// Cores personalizadas
const COLORS = [
  '#2563eb', // Azul
  '#10b981', // Verde
  '#f59e0b', // Laranja
  '#ef4444', // Vermelho
  '#8b5cf6'  // Roxo
];

interface CommitChartProps {
  data: WeeklyCommitActivity[];
}

export const CommitChart: React.FC<CommitChartProps> = ({ data }) => {
  const formattedData = data.map((item, index) => ({
    name: `Semana ${index + 1}`,
    commits: item.total
  }));

  return (
    <div className="chart-box">
      <h3 style={{ marginBottom: '20px', fontWeight: 'bold' }}>Atividade de Commits (4 Semanas)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={formattedData}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip 
            contentStyle={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
            itemStyle={{ color: 'var(--text-primary)' }}
          />
          <Line type="monotone" dataKey="commits" stroke="#2563eb" strokeWidth={3} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

interface LanguageChartProps {
  data: LanguageData;
}

export const LanguageChart: React.FC<LanguageChartProps> = ({ data }) => {
  const totalBytes = Object.values(data).reduce((acc, curr) => acc + curr, 0);

  const chartData = Object.entries(data).map(([name, value]) => ({
    name,
    value,
    percent: totalBytes > 0 ? ((value / totalBytes) * 100).toFixed(1) : '0'
  })).slice(0, 5); // Pega top 5

  return (
    <div className="chart-box">
      <h3 style={{ marginBottom: '20px', fontWeight: 'bold' }}>Linguagens</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
            stroke="none"
          >
            {chartData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
             contentStyle={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
             formatter={(value: number, name: string, props: any) => [`${props.payload.percent}%`, name]}
          />
        </PieChart>
      </ResponsiveContainer>
      
      <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', marginTop: '10px', fontSize: '12px' }}>
        {chartData.map((entry, index) => (
          <div key={entry.name} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <div style={{ width: 10, height: 10, backgroundColor: COLORS[index % COLORS.length], borderRadius: '50%' }}></div>
            <span style={{ color: 'var(--text-primary)' }}>
              {entry.name} ({entry.percent}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
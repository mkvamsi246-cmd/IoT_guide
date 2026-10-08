import React, { useState, useEffect } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, AreaChart, Area, BarChart, Bar
} from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: '#161616', border: '1px solid rgba(255,34,34,0.3)', borderRadius: 8, padding: '8px 14px', fontSize: 12 }}>
        <p style={{ color: '#888', marginBottom: 4 }}>{label}s</p>
        {payload.map((p, i) => (
          <p key={i} style={{ color: p.color || '#ff4444', fontFamily: 'JetBrains Mono, monospace' }}>
            {p.value?.toFixed?.(1) ?? p.value} {p.name}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function SensorChart({ sensor, timeWindow = 30 }) {
  const [data, setData] = useState([]);
  const [chartType, setChartType] = useState('area');
  const [window, setWindow] = useState(timeWindow);

  useEffect(() => {
    // Initialize with historical data
    const initial = Array.from({ length: window }, (_, i) => {
      const val = generateValue(sensor);
      return { time: -(window - i), ...val };
    });
    setData(initial);

    const interval = setInterval(() => {
      setData(prev => {
        const val = generateValue(sensor);
        const next = [...prev.slice(-window + 1), { time: Date.now(), ...val }];
        return next.map((d, i) => ({ ...d, time: i - next.length + 1 }));
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [sensor?.id, window]);

  function generateValue(s) {
    if (!s) return { value: 0 };
    switch (s.id) {
      case 'dht11':
      case 'dht22':
        return { temp: +(Math.random() * 10 + 22).toFixed(1), humidity: +(Math.random() * 20 + 50).toFixed(1) };
      case 'bmp280':
        return { pressure: +(Math.random() * 20 + 1000).toFixed(1), altitude: +(Math.random() * 20 + 200).toFixed(1) };
      case 'mpu6050':
        return { ax: +(Math.random() * 2 - 1).toFixed(2), ay: +(Math.random() * 2 - 1).toFixed(2), az: +(Math.random() * 0.5 + 0.8).toFixed(2) };
      case 'mq2':
        return { ppm: Math.round(Math.random() * 200 + 50) };
      case 'ldr':
      case 'soil-moisture':
        return { value: Math.round(Math.random() * 40 + 40) };
      case 'ultrasonic':
        return { distance: Math.round(Math.random() * 100 + 10) };
      case 'gps-module':
        return { speed: Math.round(Math.random() * 60) };
      default:
        return { value: +(Math.random() * 80 + 20).toFixed(1) };
    }
  }

  const keys = data.length > 0 ? Object.keys(data[0]).filter(k => k !== 'time') : ['value'];
  const COLORS = ['#ff4444', '#44aaff', '#44ff88', '#ffcc00', '#aa44ff'];

  const chartProps = {
    data,
    margin: { top: 5, right: 10, left: -20, bottom: 0 },
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        {['area', 'line', 'bar'].map(t => (
          <button key={t} onClick={() => setChartType(t)}
            style={{
              padding: '6px 14px', borderRadius: 20, fontSize: 13, cursor: 'pointer', border: '1px solid',
              background: chartType === t ? 'rgba(255,34,34,0.12)' : 'transparent',
              color: chartType === t ? '#ff4444' : '#888',
              borderColor: chartType === t ? 'rgba(255,34,34,0.3)' : 'rgba(255,255,255,0.08)',
              fontFamily: 'Inter, sans-serif', textTransform: 'capitalize',
            }}>
            {t}
          </button>
        ))}
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
          {[10, 30, 60].map(w => (
            <button key={w} onClick={() => setWindow(w)}
              style={{
                padding: '6px 12px', borderRadius: 20, fontSize: 12.5, cursor: 'pointer', border: '1px solid',
                background: window === w ? 'rgba(255,34,34,0.12)' : 'transparent',
                color: window === w ? '#ff4444' : '#777',
                borderColor: window === w ? 'rgba(255,34,34,0.3)' : 'rgba(255,255,255,0.06)',
                fontFamily: 'Inter, sans-serif',
              }}>
              {w}s
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        {chartType === 'area' ? (
          <AreaChart {...chartProps}>
            <defs>
              {keys.map((k, i) => (
                <linearGradient key={k} id={`grad-${k}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={COLORS[i % COLORS.length]} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={COLORS[i % COLORS.length]} stopOpacity={0} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis dataKey="time" tick={{ fill: '#777', fontSize: 11.5 }} tickLine={false} axisLine={false} unit="s" />
            <YAxis tick={{ fill: '#777', fontSize: 11.5 }} tickLine={false} axisLine={false} />
            <Tooltip content={<CustomTooltip />} />
            {keys.map((k, i) => (
              <Area key={k} type="monotone" dataKey={k} stroke={COLORS[i % COLORS.length]}
                fill={`url(#grad-${k})`} strokeWidth={2} dot={false} name={k} />
            ))}
          </AreaChart>
        ) : chartType === 'line' ? (
          <LineChart {...chartProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis dataKey="time" tick={{ fill: '#777', fontSize: 11.5 }} tickLine={false} axisLine={false} unit="s" />
            <YAxis tick={{ fill: '#777', fontSize: 11.5 }} tickLine={false} axisLine={false} />
            <Tooltip content={<CustomTooltip />} />
            {keys.map((k, i) => (
              <Line key={k} type="monotone" dataKey={k} stroke={COLORS[i % COLORS.length]}
                strokeWidth={2} dot={false} name={k} />
            ))}
          </LineChart>
        ) : (
          <BarChart {...chartProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis dataKey="time" tick={{ fill: '#777', fontSize: 11.5 }} tickLine={false} axisLine={false} />
            <YAxis tick={{ fill: '#777', fontSize: 11.5 }} tickLine={false} axisLine={false} />
            <Tooltip content={<CustomTooltip />} />
            {keys.map((k, i) => (
              <Bar key={k} dataKey={k} fill={COLORS[i % COLORS.length]} name={k} radius={[3, 3, 0, 0]} />
            ))}
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}

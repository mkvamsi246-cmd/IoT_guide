import React, { useState, useEffect, useRef } from 'react';

const SENSORS_SIM = [
  { id: 'temperature', label: 'Temperature', unit: '°C', icon: '🌡️', min: 10, max: 60, default: 28, color: '#ff4444' },
  { id: 'humidity', label: 'Humidity', unit: '%', icon: '💧', min: 0, max: 100, default: 60, color: '#44aaff' },
  { id: 'light', label: 'Light Level', unit: '%', icon: '☀️', min: 0, max: 100, default: 70, color: '#ffcc00' },
  { id: 'distance', label: 'Distance', unit: 'cm', icon: '📏', min: 2, max: 400, default: 50, color: '#44ff88' },
  { id: 'gas', label: 'Gas Level', unit: 'ppm', icon: '💨', min: 0, max: 1000, default: 100, color: '#ff8844' },
  { id: 'pressure', label: 'Pressure', unit: 'hPa', icon: '🌀', min: 900, max: 1100, default: 1013, color: '#aa44ff' },
  { id: 'soilmoisture', label: 'Soil Moisture', unit: '%', icon: '🌱', min: 0, max: 100, default: 45, color: '#44ffaa' },
  { id: 'motion', label: 'Motion', unit: '', icon: '🏃', min: 0, max: 1, default: 0, color: '#ff44aa' },
];

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

export default function SimulatorPage() {
  const [values, setValues] = useState(
    Object.fromEntries(SENSORS_SIM.map(s => [s.id, s.default]))
  );
  const [history, setHistory] = useState(
    Object.fromEntries(SENSORS_SIM.map(s => [s.id, Array.from({ length: 20 }, (_, i) => ({ t: i - 20, v: s.default }))]))
  );
  const [noiseEnabled, setNoiseEnabled] = useState(true);
  const [selectedSensor, setSelectedSensor] = useState('temperature');
  const [speed, setSpeed] = useState(1000);

  useEffect(() => {
    const interval = setInterval(() => {
      setValues(prev => {
        const next = { ...prev };
        if (noiseEnabled) {
          SENSORS_SIM.forEach(s => {
            const noise = (Math.random() - 0.5) * (s.max - s.min) * 0.03;
            next[s.id] = Math.max(s.min, Math.min(s.max, parseFloat((prev[s.id] + noise).toFixed(s.id === 'motion' ? 0 : 1))));
          });
        }
        return next;
      });

      setHistory(prev => {
        const next = { ...prev };
        SENSORS_SIM.forEach(s => {
          next[s.id] = [...prev[s.id].slice(-29), { t: Date.now(), v: values[s.id] }].map((d, i, arr) => ({ ...d, t: i - arr.length + 1 }));
        });
        return next;
      });
    }, speed);

    return () => clearInterval(interval);
  }, [values, noiseEnabled, speed]);

  const sensor = SENSORS_SIM.find(s => s.id === selectedSensor);
  const currentVal = values[selectedSensor];
  const chartData = history[selectedSensor];

  function getStatus(s, v) {
    const pct = (v - s.min) / (s.max - s.min);
    if (s.id === 'motion') return v === 1 ? '🚨 Motion!' : '✅ No Motion';
    if (pct < 0.2) return '🔵 Very Low';
    if (pct < 0.4) return '🟢 Low';
    if (pct < 0.6) return '🟡 Normal';
    if (pct < 0.8) return '🟠 High';
    return '🔴 Critical';
  }

  return (
    <div>
      <div className="hero-section">
        <div className="hero-grid" />
        <div className="hero-content">
          <div className="hero-label">🔬 Live IoT Simulator</div>
          <h1 className="hero-title">IoT Simulator</h1>
          <p style={{ color: '#aaa', fontSize: 14, maxWidth: 550 }}>
            Simulate real IoT sensor environments. Adjust sliders to change environmental conditions and watch the dashboard update in real time.
          </p>
        </div>
      </div>

      <div className="page-container">
        <div style={{ display: 'grid', gridTemplateColumns: '340px 1fr', gap: 24, alignItems: 'start' }}>

          {/* Controls Panel */}
          <div>
            <div style={{ background: '#141414', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: 20, marginBottom: 16 }}>
              <h3 style={{ fontFamily: 'Orbitron, monospace', fontSize: 13, marginBottom: 16, color: '#fff' }}>⚙️ Environment Controls</h3>

              {SENSORS_SIM.map(s => (
                <div key={s.id} className="slider-control" style={{ marginBottom: 18 }}
                  onClick={() => setSelectedSensor(s.id)}>
                  <div className="slider-label">
                    <span style={{ color: selectedSensor === s.id ? '#fff' : '#aaa', fontWeight: selectedSensor === s.id ? 600 : 400 }}>
                      {s.icon} {s.label}
                    </span>
                    <span className="slider-value" style={{ color: s.color }}>
                      {s.id === 'motion' ? (values[s.id] ? 'ON' : 'OFF') : `${Number(values[s.id]).toFixed(s.id === 'pressure' ? 1 : 1)}${s.unit}`}
                    </span>
                  </div>
                  <input type="range" min={s.min} max={s.max} step={s.id === 'motion' ? 1 : (s.max - s.min) / 100}
                    value={values[s.id]}
                    onChange={e => setValues(v => ({ ...v, [s.id]: parseFloat(e.target.value) }))}
                    style={{ accentColor: s.color }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9, color: '#444' }}>
                    <span>{s.min}{s.unit}</span><span>{s.max}{s.unit}</span>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ background: '#141414', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, padding: 16 }}>
              <h4 style={{ fontSize: 12, color: '#666', marginBottom: 12 }}>Simulation Settings</h4>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <span style={{ fontSize: 12, color: '#aaa' }}>Noise Effect</span>
                <button onClick={() => setNoiseEnabled(n => !n)}
                  style={{ padding: '4px 12px', borderRadius: 20, fontSize: 11, cursor: 'pointer', border: '1px solid', background: noiseEnabled ? 'rgba(0,255,136,0.1)' : '#0d0d0d', color: noiseEnabled ? '#00ff88' : '#666', borderColor: noiseEnabled ? 'rgba(0,255,136,0.3)' : 'rgba(255,255,255,0.08)', fontFamily: 'Inter, sans-serif' }}>
                  {noiseEnabled ? 'ON' : 'OFF'}
                </button>
              </div>
              <div className="slider-label">
                <span style={{ fontSize: 12, color: '#aaa' }}>Update Speed</span>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#ff4444' }}>{speed}ms</span>
              </div>
              <input type="range" min={200} max={3000} step={100} value={speed}
                onChange={e => setSpeed(Number(e.target.value))} style={{ marginTop: 6 }} />
            </div>
          </div>

          {/* Dashboard */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Main Chart */}
            <div style={{ background: '#141414', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                <div>
                  <h3 style={{ fontFamily: 'Orbitron, monospace', fontSize: 18, color: sensor?.color }}>
                    {sensor?.icon} {sensor?.label}
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 4 }}>
                    <span style={{ fontFamily: 'Orbitron, monospace', fontSize: 40, fontWeight: 700, color: sensor?.color, textShadow: `0 0 20px ${sensor?.color}66` }}>
                      {sensor?.id === 'motion' ? (currentVal ? '1' : '0') : Number(currentVal).toFixed(1)}
                    </span>
                    <span style={{ fontSize: 16, color: '#555' }}>{sensor?.unit}</span>
                  </div>
                </div>
                <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                  <div style={{ fontSize: 11, color: '#555', marginBottom: 4 }}>Status</div>
                  <div style={{ fontFamily: 'Orbitron, monospace', fontSize: 12 }}>{getStatus(sensor, currentVal)}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8, justifyContent: 'flex-end' }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#00ff88', display: 'block', animation: 'pulse-dot 1.5s infinite' }} />
                    <span style={{ fontSize: 10, color: '#00ff88' }}>LIVE</span>
                  </div>
                </div>
              </div>

              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="simGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={sensor?.color} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={sensor?.color} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey="t" tick={{ fill: '#444', fontSize: 10 }} tickLine={false} axisLine={false} unit="s" />
                  <YAxis tick={{ fill: '#444', fontSize: 10 }} tickLine={false} axisLine={false} domain={[sensor?.min || 0, sensor?.max || 100]} />
                  <Tooltip formatter={v => [`${Number(v).toFixed(1)} ${sensor?.unit}`, sensor?.label]} contentStyle={{ background: '#161616', border: '1px solid rgba(255,34,34,0.3)', borderRadius: 8, fontSize: 12 }} />
                  <Area type="monotone" dataKey="v" stroke={sensor?.color} fill="url(#simGrad)" strokeWidth={2} dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* All Sensors Dashboard */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
              {SENSORS_SIM.map(s => {
                const v = values[s.id];
                const pct = s.id === 'motion' ? (v ? 100 : 0) : ((v - s.min) / (s.max - s.min)) * 100;
                return (
                  <div key={s.id} onClick={() => setSelectedSensor(s.id)}
                    style={{ background: selectedSensor === s.id ? `${s.color}0f` : '#0d0d0d', border: `1px solid ${selectedSensor === s.id ? s.color + '44' : 'rgba(255,255,255,0.05)'}`, borderRadius: 12, padding: '14px 12px', cursor: 'pointer', transition: 'all 0.2s' }}>
                    <div style={{ fontSize: 18, marginBottom: 6 }}>{s.icon}</div>
                    <div style={{ fontFamily: 'Orbitron, monospace', fontSize: 16, fontWeight: 700, color: s.color, lineHeight: 1 }}>
                      {s.id === 'motion' ? (v ? 'ON' : 'OFF') : Number(v).toFixed(1)}
                      <span style={{ fontSize: 9, color: '#555', fontFamily: 'Inter, sans-serif', marginLeft: 2 }}>{s.unit}</span>
                    </div>
                    <div style={{ fontSize: 10, color: '#555', marginBottom: 6 }}>{s.label}</div>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${s.color}88, ${s.color})` }} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* IoT Data Flow */}
            <div style={{ background: '#141414', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: 24 }}>
              <h3 style={{ fontFamily: 'Orbitron, monospace', fontSize: 13, marginBottom: 16, color: '#fff' }}>🌐 IoT Data Flow</h3>
              <div className="flow-diagram">
                {[
                  { label: 'Sensor', color: '#44aaff', icon: '📡' },
                  { label: 'ESP32', color: '#ff4444', icon: '🖥️' },
                  { label: 'Wi-Fi', color: '#44ff88', icon: '📶' },
                  { label: 'MQTT', color: '#ffcc00', icon: '🔄' },
                  { label: 'Cloud', color: '#aa44ff', icon: '☁️' },
                  { label: 'Dashboard', color: '#ff8844', icon: '📊' },
                ].map((node, i, arr) => (
                  <React.Fragment key={node.label}>
                    <div className="flow-node">
                      <div className="flow-node-box" style={{ borderColor: node.color + '44', background: node.color + '0d', color: node.color, fontSize: 11, minWidth: 80 }}>
                        <div style={{ fontSize: 18, marginBottom: 4 }}>{node.icon}</div>
                        {node.label}
                      </div>
                    </div>
                    {i < arr.length - 1 && (
                      <div className="flow-arrow" style={{ animation: 'pulse-dot 1.5s infinite', animationDelay: `${i * 0.3}s` }}>→</div>
                    )}
                  </React.Fragment>
                ))}
              </div>
              <div style={{ marginTop: 16, padding: '10px 14px', background: '#0d0d0d', borderRadius: 8, border: '1px solid rgba(255,255,255,0.04)', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: '#888' }}>
                <span style={{ color: '#44aaff' }}>MQTT Topic:</span> <span style={{ color: '#44ff88' }}>iot/sensor/{sensor?.id}</span> → <span style={{ color: '#ffcc00' }}>"{Number(currentVal).toFixed(1)}{sensor?.unit}"</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

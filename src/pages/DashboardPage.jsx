import React, { useState, useEffect } from 'react';
import { stats, allComponents } from '../data/components';
import ComponentThumb from '../components/ComponentThumb';
import ComponentDetailModal from '../components/ComponentDetailModal';
import SensorChart from '../components/SensorChart';
import PrividLogo from '../components/PrividLogo';

const STAT_CARDS = [
  { key: 'totalComponents', label: 'Total Components', icon: '📦', color: '#ff4444', bgColor: 'rgba(255,34,34,0.08)' },
  { key: 'sensors', label: 'Sensors', icon: '📡', color: '#44aaff', bgColor: 'rgba(68,136,255,0.08)' },
  { key: 'developmentBoards', label: 'Dev Boards', icon: '🖥️', color: '#44ff88', bgColor: 'rgba(68,255,136,0.08)' },
  { key: 'communicationModules', label: 'Comm Modules', icon: '📶', color: '#ffcc00', bgColor: 'rgba(255,204,0,0.08)' },
  { key: 'actuators', label: 'Actuators', icon: '⚙️', color: '#aa44ff', bgColor: 'rgba(170,68,255,0.08)' },
  { key: 'displays', label: 'Displays', icon: '🖥️', color: '#00ccff', bgColor: 'rgba(0,204,255,0.08)' },
  { key: 'powerModules', label: 'Power Modules', icon: '🔋', color: '#ff8844', bgColor: 'rgba(255,136,68,0.08)' },
  { key: 'advancedComponents', label: 'Advanced', icon: '🚀', color: '#ff44aa', bgColor: 'rgba(255,68,170,0.08)' },
];

const QUICK_LINKS = [
  { label: 'Start Learning IoT', page: 'basics', icon: '🟢', color: '#00ff88', desc: 'Perfect for beginners' },
  { label: '3D Component Lab', page: '3dlab', icon: '🔬', color: '#ff4444', desc: 'Explore 3D models' },
  { label: 'IoT Simulator', page: 'simulator', icon: '📊', color: '#44aaff', desc: 'Real-time simulation' },
  { label: 'Circuit Builder', page: 'circuit', icon: '🔌', color: '#44ff88', desc: 'Build circuits visually' },
  { label: 'Golden Rules', page: 'golden', icon: '⚡', color: '#ffcc00', desc: 'Safety & best practices' },
  { label: 'View Projects', page: 'projects', icon: '🚀', color: '#aa44ff', desc: 'Real IoT projects' },
];

function LiveTicker() {
  const [readings, setReadings] = useState([
    { sensor: 'DHT22 – Temp', value: '24.6°C', status: 'Normal', color: '#44aaff' },
    { sensor: 'DHT22 – Humidity', value: '62%', status: 'Good', color: '#44ff88' },
    { sensor: 'BMP280 – Pressure', value: '1013.2 hPa', status: 'Normal', color: '#aa44ff' },
    { sensor: 'MQ-2 – Gas', value: '87 ppm', status: 'Safe', color: '#44ffaa' },
    { sensor: 'HC-SR04 – Distance', value: '45 cm', status: 'Active', color: '#ffcc00' },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setReadings([
        { sensor: 'DHT22 – Temp', value: `${(Math.random() * 10 + 22).toFixed(1)}°C`, status: 'Normal', color: '#44aaff' },
        { sensor: 'DHT22 – Humidity', value: `${Math.round(Math.random() * 25 + 50)}%`, status: 'Good', color: '#44ff88' },
        { sensor: 'BMP280 – Pressure', value: `${(Math.random() * 20 + 1003).toFixed(1)} hPa`, status: 'Normal', color: '#aa44ff' },
        { sensor: 'MQ-2 – Gas', value: `${Math.round(Math.random() * 150 + 50)} ppm`, status: 'Safe', color: '#44ffaa' },
        { sensor: 'HC-SR04 – Distance', value: `${Math.round(Math.random() * 100 + 10)} cm`, status: 'Active', color: '#ffcc00' },
      ]);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 6 }}>
      {readings.map((r, i) => (
        <div key={i} style={{ flexShrink: 0, background: '#0d0d0d', border: `1px solid ${r.color}30`, borderRadius: 10, padding: '12px 16px', minWidth: 150 }}>
          <div style={{ fontSize: 12.5, color: '#777', marginBottom: 4, fontWeight: 500 }}>{r.sensor}</div>
          <div style={{ fontFamily: 'Orbitron, monospace', fontSize: 18, fontWeight: 700, color: r.color, marginBottom: 4 }}>{r.value}</div>
          <div style={{ fontSize: 12, color: r.color + 'cc', fontWeight: 600 }}>● {r.status}</div>
        </div>
      ))}
    </div>
  );
}

export default function DashboardPage({ onNavigate }) {
  const [recentComponent, setRecentComponent] = useState(null);
  const [progress] = useState({ beginner: 35, intermediate: 15, advanced: 5 });

  const featuredComponents = allComponents.slice(0, 6);

  return (
    <div>
      {/* Hero */}
      <div className="hero-section">
        <div className="hero-grid" />
        <div className="hero-glow hero-glow-1" />
        <div className="hero-glow hero-glow-2" />
        <div className="hero-content">
          <div className="hero-label">
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor', display: 'inline-block', animation: 'pulse-dot 1.5s infinite' }} />
            Welcome to Privid
          </div>
          <div style={{ margin: '14px 0 10px 0' }}>
            <PrividLogo height={62} showTagline={false} />
          </div>
          <h1 className="hero-title" style={{ fontSize: 26, letterSpacing: 1, marginTop: 4 }}>
            Interactive IoT 3D Laboratory
          </h1>
          <p className="hero-description">
            Your complete virtual IoT laboratory. Explore components in 3D, understand circuits, simulate sensor data, build projects, and master IoT — from ESP32 to LoRaWAN.
          </p>

          <div style={{ display: 'flex', gap: 12, marginBottom: 32, flexWrap: 'wrap' }}>
            <button className="btn btn-primary btn-lg" onClick={() => onNavigate('basics')}>
              🚀 Start Learning
            </button>
            <button className="btn btn-secondary btn-lg" onClick={() => onNavigate('3dlab')}>
              🔬 Open 3D Lab
            </button>
          </div>

          <div className="hero-stats">
            {[
              { v: '60+', l: 'Components' },
              { v: '22', l: 'Sensors' },
              { v: '3D', l: 'Models' },
              { v: '∞', l: 'Simulations' },
            ].map((s, i) => (
              <div key={i} className="hero-stat">
                <span className="hero-stat-value">{s.v}</span>
                <div className="hero-stat-label">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="page-container">

        {/* Live Sensor Ticker */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#00ff88', display: 'block', animation: 'pulse-dot 1.5s infinite' }} />
            <h3 style={{ fontFamily: 'Orbitron, monospace', fontSize: 14.5, color: '#00ff88' }}>LIVE SENSOR FEED</h3>
            <span style={{ fontSize: 12.5, color: '#666', marginLeft: 'auto' }}>Simulated · Updates every 2.5s</span>
          </div>
          <LiveTicker />
        </div>

        {/* Stats Grid */}
        <h2 className="section-title">📊 Lab Overview</h2>
        <div className="grid-4" style={{ marginBottom: 32 }}>
          {STAT_CARDS.map(card => (
            <div key={card.key} className="stat-card">
              <div className="stat-icon" style={{ background: card.bgColor }}>
                <span style={{ fontSize: 24 }}>{card.icon}</span>
              </div>
              <div className="stat-info">
                <div className="stat-value" style={{ color: card.color }}>{stats[card.key]}</div>
                <div className="stat-label" style={{ fontSize: 13.5 }}>{card.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Links */}
        <h2 className="section-title">⚡ Quick Access</h2>
        <div className="grid-3" style={{ marginBottom: 32 }}>
          {QUICK_LINKS.map(link => (
            <div key={link.page} onClick={() => onNavigate(link.page)}
              style={{ background: '#141414', border: `1px solid ${link.color}22`, borderRadius: 14, padding: '20px 24px', cursor: 'pointer', transition: 'all 0.3s', display: 'flex', alignItems: 'center', gap: 16 }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = link.color + '55'; e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 8px 32px ${link.color}22`; e.currentTarget.style.background = `${link.color}08`; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = link.color + '22'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.background = '#141414'; }}>
              <div style={{ fontSize: 34, flexShrink: 0 }}>{link.icon}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 16, color: link.color, marginBottom: 4 }}>{link.label}</div>
                <div style={{ fontSize: 13.5, color: '#777' }}>{link.desc}</div>
              </div>
              <div style={{ marginLeft: 'auto', color: link.color + 'aa', fontSize: 20 }}>→</div>
            </div>
          ))}
        </div>

        {/* Learning Progress */}
        <div className="grid-2" style={{ marginBottom: 32 }}>
          <div>
            <h2 className="section-title">📈 Learning Progress</h2>
            <div style={{ background: '#141414', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: 22 }}>
              {[
                { label: '🟢 Level 1 – Beginner', pct: progress.beginner, color: '#00ff88' },
                { label: '🟡 Level 2 – Intermediate', pct: progress.intermediate, color: '#ffcc00' },
                { label: '🔴 Level 3 – Advanced', pct: progress.advanced, color: '#ff4444' },
              ].map((level, i) => (
                <div key={i} style={{ marginBottom: 20 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span style={{ fontSize: 13.5, color: '#ccc' }}>{level.label}</span>
                    <span style={{ fontFamily: 'Orbitron, monospace', fontSize: 13.5, color: level.color, fontWeight: 700 }}>{level.pct}%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${level.pct}%`, background: `linear-gradient(90deg, ${level.color}88, ${level.color})` }} />
                  </div>
                </div>
              ))}
              <div className="info-box info-box-tip" style={{ fontSize: 13.5 }}>
                💡 Explore more components and projects to increase your progress level!
              </div>
            </div>
          </div>

          <div>
            <h2 className="section-title">📡 Live Chart Demo</h2>
            <div style={{ background: '#141414', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: 20 }}>
              <SensorChart sensor={{ id: 'dht11' }} />
            </div>
          </div>
        </div>

        {/* Featured Components */}
        <h2 className="section-title">⭐ Featured Components</h2>
        <div className="grid-3">
          {featuredComponents.map(comp => (
            <div key={comp.id} style={{ background: '#141414', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, overflow: 'hidden', cursor: 'pointer', transition: 'all 0.3s' }}
              onClick={() => setRecentComponent(comp)}
              onMouseEnter={e => { e.currentTarget.style.borderColor = `${comp.color || '#ff4444'}44`; e.currentTarget.style.transform = 'translateY(-3px)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.transform = 'none'; }}>
              <div style={{ height: 120, borderBottom: `1px solid ${comp.color || '#ff4444'}22` }}>
                <ComponentThumb componentId={comp.id} color={comp.color} height={120} />
              </div>
              <div style={{ padding: '16px 18px' }}>
                <div style={{ fontWeight: 700, fontSize: 15.5, color: comp.color || '#fff', marginBottom: 4 }}>{comp.name}</div>
                <div style={{ fontSize: 13, color: '#777' }}>{comp.category} · {comp.level}</div>
              </div>
            </div>
          ))}
        </div>

        {/* IoT Ecosystem */}
        <div style={{ marginTop: 40 }}>
          <h2 className="section-title">🌐 IoT Ecosystem Flow</h2>
          <div style={{ background: '#141414', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: 28, overflowX: 'auto' }}>
            <div className="flow-diagram" style={{ minWidth: 600 }}>
              {[
                { label: 'Physical World', color: '#44aaff', icon: '🌍', sub: 'Temperature, Motion, Light' },
                { label: 'Sensors', color: '#44ff88', icon: '📡', sub: 'DHT22, PIR, LDR' },
                { label: 'ESP32', color: '#ff4444', icon: '🖥️', sub: 'Process & Control' },
                { label: 'Wi-Fi/LoRa', color: '#ffcc00', icon: '📶', sub: 'Wireless Transmission' },
                { label: 'Cloud', color: '#aa44ff', icon: '☁️', sub: 'Firebase, MQTT, ThingSpeak' },
                { label: 'Dashboard', color: '#ff8844', icon: '📊', sub: 'Charts, Alerts, Control' },
              ].map((node, i, arr) => (
                <React.Fragment key={node.label}>
                  <div className="flow-node">
                    <div style={{ fontSize: 30, textAlign: 'center', marginBottom: 6 }}>{node.icon}</div>
                    <div className="flow-node-box" style={{ borderColor: node.color + '44', background: node.color + '0d', color: node.color, fontSize: 13, textAlign: 'center', fontWeight: 600 }}>
                      {node.label}
                    </div>
                    <div style={{ fontSize: 11.5, color: '#666', textAlign: 'center', marginTop: 6, maxWidth: 90 }}>{node.sub}</div>
                  </div>
                  {i < arr.length - 1 && (
                    <div style={{ padding: '0 4px', color: '#ff4444', fontSize: 22, paddingBottom: 24, animation: `pulse-dot ${1 + i * 0.2}s infinite` }}>→</div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>

      {recentComponent && <ComponentDetailModal component={recentComponent} onClose={() => setRecentComponent(null)} />}
    </div>
  );
}

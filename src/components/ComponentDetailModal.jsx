import React, { useState, useEffect } from 'react';
import ThreeViewer from './ThreeViewer';
import SensorChart from './SensorChart';

const LEVEL_COLORS = { beginner: '#00ff88', intermediate: '#ffcc00', advanced: '#ff4444' };

function LiveReadingDisplay({ sensor }) {
  const [reading, setReading] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (!sensor) return;
    const update = () => {
      const val = generateSimReading(sensor);
      setReading(val);
      setHistory(h => [...h.slice(-50), val]);
    };
    update();
    const interval = setInterval(update, 2000);
    return () => clearInterval(interval);
  }, [sensor?.id]);

  function generateSimReading(s) {
    switch (s.id) {
      case 'dht11': case 'dht22':
        return { temp: (Math.random() * 12 + 22).toFixed(1) + ' °C', humidity: Math.round(Math.random() * 25 + 50) + ' %RH', heatIndex: (Math.random() * 5 + 24).toFixed(1) + ' °C' };
      case 'bmp280':
        return { pressure: (Math.random() * 20 + 1000).toFixed(1) + ' hPa', temperature: (Math.random() * 8 + 22).toFixed(1) + ' °C', altitude: Math.round(Math.random() * 30 + 200) + ' m' };
      case 'mpu6050':
        return { accelX: (Math.random() * 2 - 1).toFixed(3) + ' g', accelY: (Math.random() * 2 - 1).toFixed(3) + ' g', accelZ: (Math.random() * 0.5 + 0.7).toFixed(3) + ' g', gyroX: Math.round(Math.random() * 10 - 5) + ' °/s' };
      case 'mq2':
        return { gasLevel: Math.round(Math.random() * 200 + 50) + ' ppm', status: Math.random() > 0.85 ? '⚠️ Alert!' : '✅ Normal' };
      case 'ldr':
        return { lightLevel: Math.round(Math.random() * 40 + 40) + ' %', condition: Math.random() > 0.5 ? '☀️ Bright' : '🌙 Dark' };
      case 'ir-sensor':
        return { detection: Math.random() > 0.5 ? '🔴 Object Detected' : '🟢 Clear', distance: '< 15 cm' };
      case 'pir-sensor':
        return { motion: Math.random() > 0.6 ? '🚨 Motion!' : '🟢 No Motion', sensitivity: 'Medium' };
      case 'ultrasonic':
        return { distance: Math.round(Math.random() * 150 + 5) + ' cm', status: 'OK' };
      case 'soil-moisture':
        const m = Math.round(Math.random() * 60 + 20);
        return { moisture: m + ' %', condition: m < 30 ? '🌵 Dry' : m > 70 ? '💧 Wet' : '✅ Good' };
      case 'gps-module':
        return { latitude: (17.38 + Math.random() * 0.01).toFixed(6) + ' °N', longitude: (78.48 + Math.random() * 0.01).toFixed(6) + ' °E', speed: Math.round(Math.random() * 60) + ' km/h', satellites: Math.round(Math.random() * 4 + 6) };
      case 'rfid':
        return { lastCard: Math.random() > 0.8 ? 'A3 F2 88 1C' : 'Waiting...', status: Math.random() > 0.8 ? '✅ Access Granted' : '⏳ Scanning' };
      default:
        return { value: (Math.random() * 80 + 20).toFixed(1) + ` ${s.simulatedUnit || ''}`, status: '✅ Active' };
    }
  }

  if (!reading) return <div style={{ color: '#555', fontSize: 13 }}>Loading...</div>;

  const entries = Object.entries(reading);
  const primary = entries[0];
  const secondary = entries.slice(1);

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#00ff88', display: 'block', animation: 'pulse-dot 1.5s infinite' }} />
        <span style={{ fontSize: 13, color: '#00ff88', fontWeight: 600 }}>LIVE</span>
        <span style={{ fontSize: 13, color: '#777', marginLeft: 'auto' }}>{new Date().toLocaleTimeString()}</span>
      </div>

      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 13.5, color: '#888', textTransform: 'capitalize', marginBottom: 4 }}>{primary[0]}</div>
        <div style={{ fontFamily: 'Orbitron, monospace', fontSize: 34, fontWeight: 700, color: '#ff4444', textShadow: '0 0 20px rgba(255,34,34,0.4)', lineHeight: 1 }}>
          {primary[1]}
        </div>
      </div>

      {secondary.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
          {secondary.map(([k, v]) => (
            <div key={k} style={{ background: '#0d0d0d', borderRadius: 8, padding: '10px 12px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ fontSize: 12.5, color: '#777', textTransform: 'capitalize', marginBottom: 3 }}>{k}</div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 14.5, color: '#ccc' }}>{v}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ComponentDetailModal({ component, onClose }) {
  const [activeTab, setActiveTab] = useState('overview');

  if (!component) return null;

  const levelColor = LEVEL_COLORS[component.level] || '#888';
  const tabs = ['overview', 'connection', 'live data', 'code', 'applications'];

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-panel" style={{ maxWidth: 1080 }}>
        {/* Header */}
        <div className="modal-header">
          <div style={{
            width: 48, height: 48, borderRadius: 10,
            background: `linear-gradient(135deg, ${component.color || '#ff2222'}, ${component.color || '#ff4444'}88)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0,
            boxShadow: `0 0 20px ${component.color || '#ff4444'}44`,
          }}>
            📡
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <h2 className="modal-title">{component.name}</h2>
            <div style={{ display: 'flex', gap: 8, marginTop: 6, flexWrap: 'wrap' }}>
              <span className="tag tag-gray">{component.category}</span>
              {component.subcategory && <span className="tag tag-gray">{component.subcategory}</span>}
              <span className="tag" style={{ background: `${levelColor}15`, color: levelColor, border: `1px solid ${levelColor}30` }}>
                {component.level?.toUpperCase()}
              </span>
              {component.protocol && <span className="tag tag-blue">{component.protocol}</span>}
              {component.voltage && <span className="tag tag-red">{component.voltage}</span>}
            </div>
          </div>
          <button className="modal-close" onClick={onClose}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '0 20px', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
          {tabs.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              style={{
                padding: '14px 18px', border: 'none', background: 'none', cursor: 'pointer',
                fontSize: 14, fontWeight: 600, fontFamily: 'Inter, sans-serif', textTransform: 'capitalize',
                color: activeTab === tab ? '#ff4444' : '#888',
                borderBottom: `2px solid ${activeTab === tab ? '#ff4444' : 'transparent'}`,
                transition: 'all 0.2s', whiteSpace: 'nowrap',
              }}>
              {tab}
            </button>
          ))}
        </div>

        {/* Body */}
        <div className="modal-body" style={{ maxHeight: '76vh', overflowY: 'auto' }}>

          {activeTab === 'overview' && (
            <div className="modal-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              {/* Left: 3D Model */}
              <div>
                <div style={{
                  background: '#0c0f17',
                  borderRadius: 14,
                  overflow: 'hidden',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.45)',
                  marginBottom: 16,
                }}>
                  <ThreeViewer componentId={component.id} color={component.color} height={420} showControls={true} />
                </div>
                <div>
                  <h4 style={{ fontSize: 15, color: '#aaa', fontWeight: 600, marginBottom: 8 }}>What is it?</h4>
                  <p style={{ fontSize: 14.5, color: '#ddd', lineHeight: 1.7 }}>{component.description}</p>
                </div>
                {component.howWorks && (
                  <div style={{ marginTop: 16 }}>
                    <h4 style={{ fontSize: 15, color: '#aaa', fontWeight: 600, marginBottom: 8 }}>How does it work?</h4>
                    <p style={{ fontSize: 14.5, color: '#ddd', lineHeight: 1.7 }}>{component.howWorks}</p>
                  </div>
                )}
              </div>

              {/* Right: Specs & Pins */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                {component.specifications && (
                  <div>
                    <h4 style={{ fontSize: 15, color: '#aaa', marginBottom: 10, fontWeight: 700 }}>Specifications</h4>
                    <div style={{ background: '#0d0d0d', borderRadius: 10, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)' }}>
                      {Object.entries(component.specifications).map(([k, v], i) => (
                        <div key={k} style={{ display: 'flex', gap: 14, padding: '10px 16px', borderBottom: i < Object.keys(component.specifications).length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                          <span style={{ width: 140, flexShrink: 0, fontSize: 13.5, color: '#888' }}>{k}</span>
                          <span style={{ fontSize: 14, color: '#eee', fontFamily: 'JetBrains Mono, monospace' }}>{v}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {component.pins && (
                  <div>
                    <h4 style={{ fontSize: 15, color: '#aaa', marginBottom: 10, fontWeight: 700 }}>Pin Configuration</h4>
                    <div style={{ background: '#0d0d0d', borderRadius: 10, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)' }}>
                      {component.pins.map((pin, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '10px 16px', borderBottom: i < component.pins.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13.5, color: '#ff4444', width: 90, flexShrink: 0, fontWeight: 700 }}>{pin.name}</span>
                          <span style={{ fontSize: 14, color: '#ccc' }}>{pin.function}</span>
                          {pin.color && <span style={{ fontSize: 12, color: '#888', marginLeft: 'auto' }}>{pin.color}</span>}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {component.tip && (
                  <div className="info-box info-box-tip" style={{ fontSize: 14 }}>
                    💡 <strong>Tip:</strong> {component.tip}
                  </div>
                )}
                {component.safetyWarning && (
                  <div className="info-box info-box-danger" style={{ fontSize: 14 }}>
                    ⚠️ <strong>Safety:</strong> {component.safetyWarning}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'connection' && (
            <div className="modal-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              <div>
                <h3 style={{ fontFamily: 'Orbitron, monospace', fontSize: 16, marginBottom: 16, color: '#fff', fontWeight: 700 }}>
                  ESP32 Connection Diagram
                </h3>
                {component.esp32Connection ? (
                  <table className="connection-table">
                    <thead>
                      <tr>
                        <th>Component Pin</th>
                        <th>ESP32 Pin</th>
                        <th>Type</th>
                      </tr>
                    </thead>
                    <tbody>
                      {component.esp32Connection.map((conn, i) => (
                        <tr key={i}>
                          <td><span className="pin-name">{conn.component}</span></td>
                          <td><span className="pin-esp">{conn.esp32}</span></td>
                          <td><span style={{ fontSize: 13, color: '#aaa' }}>{conn.type}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="info-box info-box-info">Connection details not available for this component.</div>
                )}

                {component.safetyWarning && (
                  <div className="info-box info-box-danger" style={{ marginTop: 16, fontSize: 14 }}>
                    ⚠️ {component.safetyWarning}
                  </div>
                )}
              </div>

              <div>
                <h3 style={{ fontFamily: 'Orbitron, monospace', fontSize: 16, marginBottom: 16, color: '#fff', fontWeight: 700 }}>
                  Visual Connection
                </h3>
                <div style={{
                  background: '#050505', borderRadius: 12, padding: 24,
                  border: '1px solid rgba(255,255,255,0.08)',
                  backgroundImage: 'radial-gradient(circle, rgba(255,34,34,0.03) 1px, transparent 1px)',
                  backgroundSize: '20px 20px', minHeight: 200,
                }}>
                  {/* Visual wiring diagram */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <div style={{ textAlign: 'center', fontFamily: 'Orbitron, monospace', fontSize: 14, fontWeight: 700, color: '#ff4444', padding: '10px 18px', border: '1px solid rgba(255,34,34,0.35)', borderRadius: 8, background: 'rgba(255,34,34,0.08)' }}>
                      ESP32 DevKit
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {(component.esp32Connection || []).slice(0, 5).map((conn, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13 }}>
                          <span style={{ fontFamily: 'JetBrains Mono', color: '#00ccff', width: 90, textAlign: 'right', flexShrink: 0, fontWeight: 600 }}>{conn.esp32.split(' ')[0]}</span>
                          <div style={{ flex: 1, height: 2, background: `linear-gradient(90deg, #00ccff, ${getWireColor(conn.type)})`, borderRadius: 1 }} />
                          <span style={{ fontFamily: 'JetBrains Mono', color: '#ff4444', width: 90, flexShrink: 0, fontWeight: 600 }}>{conn.component}</span>
                        </div>
                      ))}
                    </div>
                    <div style={{ textAlign: 'center', fontFamily: 'Orbitron, monospace', fontSize: 14, fontWeight: 700, color: component.color || '#ff4444', padding: '10px 18px', border: `1px solid ${component.color || '#ff4444'}44`, borderRadius: 8, background: `${component.color || '#ff4444'}0e` }}>
                      {component.name}
                    </div>
                  </div>
                </div>

                {component.tip && (
                  <div className="info-box info-box-tip" style={{ marginTop: 16, fontSize: 14 }}>
                    💡 {component.tip}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'live data' && (
            <div className="modal-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              <div>
                <h3 style={{ fontFamily: 'Orbitron, monospace', fontSize: 16, marginBottom: 16, color: '#fff', fontWeight: 700 }}>
                  Simulated Live Reading
                </h3>
                <div style={{ background: '#0d0d0d', borderRadius: 12, padding: 22, border: '1px solid rgba(255,255,255,0.08)' }}>
                  <LiveReadingDisplay sensor={component} />
                </div>
              </div>
              <div>
                <h3 style={{ fontFamily: 'Orbitron, monospace', fontSize: 16, marginBottom: 16, color: '#fff', fontWeight: 700 }}>
                  Live Chart
                </h3>
                <div style={{ background: '#0d0d0d', borderRadius: 12, padding: 22, border: '1px solid rgba(255,255,255,0.08)' }}>
                  <SensorChart sensor={component} />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'code' && (
            <div>
              <h3 style={{ fontFamily: 'Orbitron, monospace', fontSize: 16, marginBottom: 16, color: '#fff', fontWeight: 700 }}>
                Example Arduino / ESP32 Code
              </h3>
              {component.code ? (
                <div className="code-block">
                  <div className="code-header">
                    <span>📄 {component.name} – ESP32 Example</span>
                    <span style={{ color: '#888' }}>Arduino IDE / PlatformIO</span>
                  </div>
                  <div style={{ padding: 18 }}>
                    <pre style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13.5, color: '#e0e0e0', lineHeight: 1.75 }}>
                      {component.code}
                    </pre>
                  </div>
                </div>
              ) : (
                <div className="info-box info-box-info">
                  No specific code example available. Refer to component datasheet and library documentation.
                </div>
              )}
              <div style={{ marginTop: 16 }} className="info-box info-box-warning">
                💡 <strong>Library Note:</strong> Install required libraries via Arduino IDE → Tools → Manage Libraries before uploading.
              </div>
            </div>
          )}

          {activeTab === 'applications' && (
            <div className="modal-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              <div>
                <h3 style={{ fontFamily: 'Orbitron, monospace', fontSize: 16, marginBottom: 16, color: '#fff', fontWeight: 700 }}>Real-World Applications</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {(component.applications || ['IoT Projects', 'Smart Systems', 'Education']).map((app, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', background: '#0d0d0d', borderRadius: 8, border: '1px solid rgba(255,255,255,0.06)', fontSize: 14.5, color: '#ccc' }}>
                      <span style={{ color: '#ff4444', fontSize: 16 }}>→</span> {app}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 style={{ fontFamily: 'Orbitron, monospace', fontSize: 16, marginBottom: 16, color: '#fff', fontWeight: 700 }}>Related Components</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {(component.relatedComponents || ['ESP32', 'Resistor', 'LED', 'Breadboard']).map((r, i) => (
                    <div key={i} style={{ padding: '8px 16px', background: 'rgba(255,34,34,0.08)', border: '1px solid rgba(255,34,34,0.25)', borderRadius: 20, fontSize: 13.5, color: '#ff4444', fontWeight: 600 }}>
                      {r}
                    </div>
                  ))}
                </div>
                {component.tip && (
                  <div style={{ marginTop: 20 }}>
                    <h4 style={{ fontSize: 15, color: '#aaa', marginBottom: 10, fontWeight: 700 }}>Important Tip</h4>
                    <div className="info-box info-box-tip">{component.tip}</div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function getWireColor(type) {
  if (!type) return '#888';
  if (type.includes('Power') || type.includes('VCC')) return '#ff4444';
  if (type.includes('Ground') || type.includes('GND')) return '#4444ff';
  if (type.includes('Clock') || type.includes('SCL')) return '#ffaa00';
  if (type.includes('Data') || type.includes('SDA')) return '#44ff88';
  if (type.includes('Analog')) return '#ff8844';
  return '#888888';
}

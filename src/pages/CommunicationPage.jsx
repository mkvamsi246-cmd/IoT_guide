import React, { useState } from 'react';
import { communicationModules, protocols, cloudPlatforms } from '../data/components';
import ComponentDetailModal from '../components/ComponentDetailModal';

const PROTOCOL_COMPARISON = [
  { name: 'UART', wires: 2, speed: '2 Mbps', devices: 2, distance: '15m', use: 'GPS, GSM, Bluetooth' },
  { name: 'I2C', wires: 2, speed: '400 kHz', devices: '128', distance: '1m', use: 'OLED, BMP280, MPU6050' },
  { name: 'SPI', wires: '4+', speed: '10 MHz', devices: 'Many', distance: '1m', use: 'SD, TFT, RFID, LoRa' },
  { name: 'Wi-Fi', wires: 0, speed: '150 Mbps', devices: 'Network', distance: '50m', use: 'MQTT, HTTP, WebSocket' },
  { name: 'Bluetooth', wires: 0, speed: '3 Mbps', devices: '7', distance: '10m', use: 'BLE sensors, apps' },
  { name: 'LoRa', wires: 0, speed: '37.5 kbps', devices: 'Network', distance: '15km', use: 'Smart agriculture, city' },
  { name: 'Zigbee', wires: 0, speed: '250 kbps', devices: '65535', distance: '100m', use: 'Smart home mesh' },
  { name: '4G/5G', wires: 0, speed: '1 Gbps', devices: 'Global', distance: 'Global', use: 'Remote IoT, tracking' },
];

export default function CommunicationPage() {
  const [activeTab, setActiveTab] = useState('modules');
  const [selected, setSelected] = useState(null);
  const [expandedProtocol, setExpandedProtocol] = useState(null);

  return (
    <div>
      <div className="hero-section">
        <div className="hero-grid" />
        <div className="hero-glow hero-glow-1" style={{ background: 'radial-gradient(circle, rgba(255,136,0,0.1) 0%, transparent 70%)' }} />
        <div className="hero-content">
          <div className="hero-label" style={{ color: '#ff8844', borderColor: 'rgba(255,136,68,0.3)' }}>📶 Communication & Protocols</div>
          <h1 className="hero-title" style={{ background: 'linear-gradient(135deg, #fff, #ff8844)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Communication Lab
          </h1>
          <p style={{ color: '#ccc', fontSize: 16, maxWidth: 580, lineHeight: 1.6 }}>
            Master IoT communication from basic UART to long-range LoRa and cellular 5G. Understand protocols, modules, and cloud integration.
          </p>
        </div>
      </div>

      <div className="page-container">
        <div className="tabs">
          {['modules', 'protocols', 'cloud', 'comparison'].map(t => (
            <button key={t} className={`tab-btn ${activeTab === t ? 'active' : ''}`} onClick={() => setActiveTab(t)} style={{ textTransform: 'capitalize' }}>{t}</button>
          ))}
        </div>

        {activeTab === 'modules' && (
          <div>
            <div className="grid-auto">
              {communicationModules.map(mod => (
                <div key={mod.id} style={{ background: '#141414', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: 20, cursor: 'pointer', transition: 'all 0.3s' }}
                  onClick={() => setSelected(mod)}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = `${mod.color}44`; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.transform = 'none'; }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                    <span style={{ padding: '3px 10px', background: '#0d0d0d', borderRadius: 20, fontSize: 12.5, color: '#aaa', border: '1px solid rgba(255,255,255,0.08)' }}>{mod.subcategory}</span>
                    <span style={{ padding: '3px 10px', background: `${mod.color}15`, borderRadius: 20, fontSize: 12.5, color: mod.color, border: `1px solid ${mod.color}35`, fontWeight: 600 }}>{mod.technology}</span>
                  </div>
                  <h3 style={{ fontWeight: 700, fontSize: 16, color: '#fff', marginBottom: 8 }}>{mod.name}</h3>
                  <p style={{ fontSize: 13.5, color: '#999', lineHeight: 1.6, marginBottom: 14 }}>{mod.description}</p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                    {[
                      { l: 'Range', v: mod.range },
                      { l: 'Data Rate', v: mod.dataRate },
                      { l: 'Frequency', v: mod.frequency },
                      { l: 'Interface', v: mod.protocol },
                    ].map(({ l, v }) => (
                      <div key={l} style={{ background: '#0d0d0d', borderRadius: 8, padding: '8px 10px', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <div style={{ fontSize: 12, color: '#777', marginBottom: 2 }}>{l}</div>
                        <div style={{ fontSize: 13, color: '#ccc', fontFamily: 'JetBrains Mono, monospace', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{v}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'protocols' && (
          <div>
            {protocols.map(proto => (
              <div key={proto.id} style={{ marginBottom: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '16px 20px', background: '#141414', borderRadius: expandedProtocol === proto.id ? '12px 12px 0 0' : 12, border: '1px solid rgba(255,255,255,0.07)', cursor: 'pointer' }}
                  onClick={() => setExpandedProtocol(expandedProtocol === proto.id ? null : proto.id)}>
                  <div style={{ width: 40, height: 40, borderRadius: 8, background: 'rgba(255,136,68,0.12)', border: '1px solid rgba(255,136,68,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Orbitron, monospace', fontSize: 13, color: '#ff8844', fontWeight: 700, flexShrink: 0 }}>
                    {proto.wires}W
                  </div>
                  <div>
                    <div style={{ fontFamily: 'Orbitron, monospace', fontSize: 16, fontWeight: 700 }}>{proto.name}</div>
                    <div style={{ fontSize: 13, color: '#777', marginTop: 2 }}>Speed: {proto.speed} · Max Devices: {proto.maxDevices}</div>
                  </div>
                  <span className={`tag ${proto.level === 'beginner' ? 'tag-green' : proto.level === 'intermediate' ? 'tag-yellow' : 'tag-red'}`} style={{ marginLeft: 'auto', fontSize: 12.5 }}>{proto.level}</span>
                  <span style={{ color: '#777', fontSize: 14 }}>{expandedProtocol === proto.id ? '▲' : '▼'}</span>
                </div>
                {expandedProtocol === proto.id && (
                  <div style={{ background: '#0d0d0d', border: '1px solid rgba(255,255,255,0.06)', borderTop: 'none', borderRadius: '0 0 12px 12px', padding: 24 }}>
                    <div className="grid-2">
                      <div>
                        <p style={{ fontSize: 14.5, color: '#ccc', lineHeight: 1.7, marginBottom: 14 }}>{proto.description}</p>
                        <p style={{ fontSize: 14, color: '#aaa', lineHeight: 1.7, marginBottom: 14 }}>{proto.howWorks}</p>
                        {proto.esp32Pins && (
                          <div>
                            <div style={{ fontSize: 13, color: '#888', marginBottom: 8, fontWeight: 600 }}>ESP32 Default Pins:</div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                              {Object.entries(proto.esp32Pins).map(([pin, gpio]) => (
                                <span key={pin} style={{ padding: '4px 12px', background: '#141414', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 4, fontSize: 13, fontFamily: 'JetBrains Mono, monospace', color: '#ff8844' }}>
                                  {pin}: {gpio}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      <div>
                        {proto.pros && (
                          <div style={{ marginBottom: 14 }}>
                            <div style={{ fontSize: 13.5, color: '#00ff88', fontWeight: 600, marginBottom: 8 }}>✅ Advantages</div>
                            {proto.pros.map((p, i) => <div key={i} style={{ fontSize: 13.5, color: '#bbb', marginBottom: 4 }}>→ {p}</div>)}
                          </div>
                        )}
                        {proto.cons && (
                          <div style={{ marginBottom: 14 }}>
                            <div style={{ fontSize: 13.5, color: '#ff4444', fontWeight: 600, marginBottom: 8 }}>❌ Disadvantages</div>
                            {proto.cons.map((c, i) => <div key={i} style={{ fontSize: 13.5, color: '#bbb', marginBottom: 4 }}>→ {c}</div>)}
                          </div>
                        )}
                        {proto.applications && (
                          <div>
                            <div style={{ fontSize: 13.5, color: '#44aaff', fontWeight: 600, marginBottom: 8 }}>🔧 Common Applications</div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                              {proto.applications.map((a, i) => (
                                <span key={i} style={{ padding: '3px 10px', background: 'rgba(68,136,255,0.08)', border: '1px solid rgba(68,136,255,0.2)', borderRadius: 20, fontSize: 12.5, color: '#44aaff' }}>{a}</span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    {proto.code && (
                      <div style={{ marginTop: 18 }}>
                        <div style={{ fontSize: 13, color: '#777', marginBottom: 8 }}>Example Code:</div>
                        <div className="code-block">
                          <pre style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, color: '#e0e0e0', lineHeight: 1.7 }}>{proto.code}</pre>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === 'cloud' && (
          <div>
            <div className="grid-3">
              {cloudPlatforms.map(platform => (
                <div key={platform.id} style={{ background: '#141414', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: 22, transition: 'all 0.3s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(170,68,255,0.4)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.transform = 'none'; }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                    <span className={`tag ${platform.level === 'beginner' ? 'tag-green' : 'tag-yellow'}`} style={{ fontSize: 12.5 }}>{platform.level}</span>
                  </div>
                  <h3 style={{ fontFamily: 'Orbitron, monospace', fontSize: 16, fontWeight: 700, marginBottom: 8, color: '#aa44ff' }}>{platform.name}</h3>
                  <p style={{ fontSize: 13.5, color: '#999', lineHeight: 1.6, marginBottom: 14 }}>{platform.description}</p>
                  {platform.features && (
                    <div>
                      <div style={{ fontSize: 12.5, color: '#777', marginBottom: 6, fontWeight: 600 }}>Features:</div>
                      {platform.features.slice(0, 4).map((f, i) => (
                        <div key={i} style={{ fontSize: 13, color: '#bbb', marginBottom: 4 }}>
                          <span style={{ color: '#aa44ff' }}>→</span> {f}
                        </div>
                      ))}
                    </div>
                  )}
                  {platform.code && (
                    <div style={{ marginTop: 14 }}>
                      <div style={{ fontSize: 12.5, color: '#777', marginBottom: 6, fontWeight: 600 }}>Example Code</div>
                      <div className="code-block">
                        <pre style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12.5, color: '#ccc', lineHeight: 1.7, maxHeight: 200, overflow: 'auto' }}>{platform.code}</pre>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'comparison' && (
          <div>
            <h3 style={{ fontFamily: 'Orbitron, monospace', fontSize: 16, marginBottom: 16, color: '#fff' }}>📊 Communication Technology Comparison</h3>
            <div style={{ overflowX: 'auto' }}>
              <table className="connection-table" style={{ minWidth: 700 }}>
                <thead>
                  <tr>
                    <th>Technology</th>
                    <th>Wires</th>
                    <th>Speed</th>
                    <th>Devices</th>
                    <th>Range</th>
                    <th>Common Use</th>
                  </tr>
                </thead>
                <tbody>
                  {PROTOCOL_COMPARISON.map((p, i) => (
                    <tr key={i}>
                      <td><span style={{ fontFamily: 'Orbitron, monospace', fontSize: 13.5, color: '#ff8844', fontWeight: 600 }}>{p.name}</span></td>
                      <td style={{ fontSize: 13.5 }}>{p.wires}</td>
                      <td style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, color: '#44ff88' }}>{p.speed}</td>
                      <td style={{ fontSize: 13.5 }}>{p.devices}</td>
                      <td style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, color: '#44aaff' }}>{p.distance}</td>
                      <td style={{ fontSize: 13, color: '#888' }}>{p.use}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {selected && <ComponentDetailModal component={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

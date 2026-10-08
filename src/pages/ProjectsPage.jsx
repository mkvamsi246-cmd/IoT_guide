import React, { useState } from 'react';
import { projects } from '../data/components';

const ALL_PROJECTS = [
  ...projects,
  { id: 'smart-traffic', name: 'Smart Traffic Management', category: 'Projects', level: 'advanced', difficulty: 5, components: ['ESP32', 'Ultrasonic Sensors (x4)', 'Traffic Light LEDs', 'LoRa Module', 'Camera Module'], description: 'AI-powered traffic management system with adaptive signal control and emergency vehicle prioritization.', working: 'Ultrasonic sensors count vehicles per lane. ESP32 runs adaptive algorithm to optimize signal timing. LoRa connects multiple intersections. Emergency vehicle detection via sound sensor overrides normal cycle.', applications: ['Smart cities', 'Traffic optimization', 'Emergency response', 'Pollution reduction'] },
  { id: 'iot-healthcare', name: 'IoT Healthcare Monitor', category: 'Projects', level: 'advanced', difficulty: 5, components: ['ESP32', 'Pulse Oximeter (MAX30102)', 'Temperature Sensor (MLX90614)', 'OLED Display', 'GSM Module', 'LiPo Battery'], description: 'Remote patient monitoring system for elderly care with vital sign tracking and emergency alerts.', working: 'MAX30102 measures heart rate and SpO2. MLX90614 measures body temperature contactlessly. Data displayed on OLED and uploaded to cloud every minute. GSM sends SMS alert if readings are abnormal.', applications: ['Elderly care', 'Remote patient monitoring', 'Telemedicine', 'Emergency response'] },
  { id: 'smart-parking', name: 'Smart Parking System', category: 'Projects', level: 'intermediate', difficulty: 3, components: ['ESP32', 'Ultrasonic Sensors', 'LED Indicators', 'OLED Display', 'Wi-Fi'], description: 'Real-time parking space monitoring with mobile app integration and availability display.', working: 'Ultrasonic sensors detect vehicle presence in each slot. ESP32 tracks availability count. LED shows green/red per slot. Web dashboard shows live parking map. Alerts when full or has vacancy.', applications: ['Shopping malls', 'Office parking', 'Smart city', 'Airport parking'] },
  { id: 'industrial-iot', name: 'Industrial IoT Monitor', category: 'Projects', level: 'advanced', difficulty: 5, components: ['ESP32', 'RS485 Module', 'Current Sensor (SCT013)', 'Vibration Sensor', 'Temperature Sensor', 'LoRa Gateway', 'Industrial Enclosure'], description: 'Industrial machine health monitoring with predictive maintenance alerts and SCADA integration.', working: 'Current sensor monitors motor current draw. Vibration sensor detects abnormal patterns. Temperature monitors motor heat. RS485 communicates with PLCs. Data sent to SCADA via Modbus protocol.', applications: ['Factory automation', 'Predictive maintenance', 'Energy monitoring', 'Machine health'] },
  { id: 'smart-energy', name: 'Smart Energy Meter', category: 'Projects', level: 'intermediate', difficulty: 4, components: ['ESP32', 'PZEM-004T Energy Module', 'OLED Display', 'SD Card', 'Wi-Fi'], description: 'Real-time electricity consumption monitor with cloud logging, alerts, and energy analysis.', working: 'PZEM-004T measures voltage, current, power, and energy. Data displayed on OLED. Logged to SD card and uploaded to ThingSpeak every 30 seconds. Email alert when consumption exceeds threshold.', applications: ['Home energy monitoring', 'Industrial energy audit', 'Billing systems', 'Green energy'] },
  { id: 'smart-city', name: 'Smart City Node', category: 'Projects', level: 'advanced', difficulty: 5, components: ['ESP32', 'Air Quality Sensor', 'Noise Sensor', 'GPS Module', 'LoRaWAN', 'Solar Panel + Battery'], description: 'Complete urban environmental monitoring node for smart city infrastructure with LoRaWAN connectivity.', working: 'Measures air quality (PM2.5, CO2, NOx), noise levels, temperature, humidity. GPS provides exact location. Solar powered for autonomous operation. Sends data to city LoRaWAN network every 10 minutes.', applications: ['Smart city', 'Environmental monitoring', 'Urban planning', 'Public health'] },
];

const DIFFICULTY_LABELS = ['', '⭐ Beginner', '⭐⭐ Easy', '⭐⭐⭐ Intermediate', '⭐⭐⭐⭐ Advanced', '⭐⭐⭐⭐⭐ Expert'];
const LEVEL_COLORS = { beginner: '#00ff88', intermediate: '#ffcc00', advanced: '#ff4444' };

export default function ProjectsPage() {
  const [levelFilter, setLevelFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const filtered = ALL_PROJECTS.filter(p => levelFilter === 'all' || p.level === levelFilter);

  return (
    <div>
      <div className="hero-section">
        <div className="hero-grid" />
        <div className="hero-glow hero-glow-1" style={{ background: 'radial-gradient(circle, rgba(170,68,255,0.1) 0%, transparent 70%)' }} />
        <div className="hero-content">
          <div className="hero-label" style={{ color: '#aa44ff', borderColor: 'rgba(170,68,255,0.3)' }}>🚀 Projects Lab</div>
          <h1 className="hero-title" style={{ background: 'linear-gradient(135deg, #fff, #aa44ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            IoT Projects
          </h1>
          <p style={{ color: '#aaa', fontSize: 14, maxWidth: 550 }}>
            {ALL_PROJECTS.length} real-world IoT projects from beginner to expert level. Each project includes components, circuit connections, working principle, and code guidance.
          </p>
          <div className="hero-stats" style={{ marginTop: 20 }}>
            {['beginner', 'intermediate', 'advanced'].map(l => (
              <div key={l} className="hero-stat">
                <span className="hero-stat-value" style={{ color: LEVEL_COLORS[l], textShadow: `0 0 16px ${LEVEL_COLORS[l]}66`, fontSize: 22 }}>
                  {ALL_PROJECTS.filter(p => p.level === l).length}
                </span>
                <div className="hero-stat-label" style={{ textTransform: 'capitalize' }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="page-container">
        <div className="filter-bar">
          {['all', 'beginner', 'intermediate', 'advanced'].map(l => (
            <button key={l} onClick={() => setLevelFilter(l)} className={`filter-btn ${levelFilter === l ? 'active' : ''}`} style={{ textTransform: 'capitalize' }}>{l}</button>
          ))}
        </div>

        <div className="grid-auto">
          {filtered.map(project => {
            const lc = LEVEL_COLORS[project.level] || '#888';
            return (
              <div key={project.id} style={{ background: '#141414', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: 20, cursor: 'pointer', transition: 'all 0.3s' }}
                onClick={() => setSelectedProject(project)}
                onMouseEnter={e => { e.currentTarget.style.borderColor = lc + '44'; e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 8px 32px ${lc}22`; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}>

                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10 }}>
                  <span style={{ padding: '3px 10px', background: `${lc}15`, color: lc, border: `1px solid ${lc}30`, borderRadius: 20, fontSize: 10, fontWeight: 600 }}>
                    {project.level?.toUpperCase()}
                  </span>
                  <span style={{ fontSize: 12, color: '#555' }}>{DIFFICULTY_LABELS[project.difficulty]}</span>
                </div>

                <h3 style={{ fontWeight: 700, fontSize: 15, marginBottom: 8, color: '#fff', lineHeight: 1.3 }}>{project.name}</h3>
                <p style={{ fontSize: 12, color: '#777', lineHeight: 1.6, marginBottom: 14, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {project.description}
                </p>

                <div style={{ marginBottom: 14 }}>
                  <div style={{ fontSize: 10, color: '#555', marginBottom: 6 }}>Components ({project.components?.length})</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                    {project.components?.slice(0, 4).map((c, i) => (
                      <span key={i} style={{ padding: '2px 7px', background: '#0d0d0d', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 4, fontSize: 9, color: '#888' }}>{c}</span>
                    ))}
                    {project.components?.length > 4 && <span style={{ padding: '2px 7px', background: '#0d0d0d', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 4, fontSize: 9, color: '#555' }}>+{project.components.length - 4} more</span>}
                  </div>
                </div>

                <button style={{ width: '100%', padding: '8px', background: `${lc}12`, border: `1px solid ${lc}30`, borderRadius: 8, color: lc, fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
                  View Project →
                </button>
              </div>
            );
          })}
        </div>

        {/* Project Detail Modal */}
        {selectedProject && (
          <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setSelectedProject(null)}>
            <div className="modal-panel" style={{ maxWidth: 800 }}>
              <div className="modal-header">
                <div>
                  <h2 className="modal-title">{selectedProject.name}</h2>
                  <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
                    <span className="tag" style={{ background: `${LEVEL_COLORS[selectedProject.level]}15`, color: LEVEL_COLORS[selectedProject.level], border: `1px solid ${LEVEL_COLORS[selectedProject.level]}30` }}>
                      {selectedProject.level?.toUpperCase()}
                    </span>
                    <span className="tag tag-gray">{DIFFICULTY_LABELS[selectedProject.difficulty]}</span>
                  </div>
                </div>
                <button className="modal-close" onClick={() => setSelectedProject(null)}>✕</button>
              </div>
              <div className="modal-body" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                  <div>
                    <h4 style={{ fontSize: 13, color: '#888', marginBottom: 8 }}>📋 Description</h4>
                    <p style={{ fontSize: 13, color: '#ccc', lineHeight: 1.7, marginBottom: 16 }}>{selectedProject.description}</p>

                    <h4 style={{ fontSize: 13, color: '#888', marginBottom: 8 }}>⚙️ How It Works</h4>
                    <p style={{ fontSize: 13, color: '#ccc', lineHeight: 1.7, marginBottom: 16 }}>{selectedProject.working}</p>

                    <h4 style={{ fontSize: 13, color: '#888', marginBottom: 8 }}>🌍 Applications</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                      {selectedProject.applications?.map((app, i) => (
                        <div key={i} style={{ display: 'flex', gap: 8, fontSize: 13, color: '#aaa' }}>
                          <span style={{ color: '#ff4444' }}>→</span> {app}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 style={{ fontSize: 13, color: '#888', marginBottom: 8 }}>🧰 Components Required</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                      {selectedProject.components?.map((comp, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', background: '#0d0d0d', borderRadius: 8, border: '1px solid rgba(255,255,255,0.04)', fontSize: 13, color: '#bbb' }}>
                          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#ff4444', display: 'block', flexShrink: 0 }} />
                          {comp}
                        </div>
                      ))}
                    </div>
                    <div style={{ marginTop: 16 }} className="info-box info-box-tip">
                      💡 Start with a breadboard prototype before moving to PCB. Test each component individually first.
                    </div>
                    <div style={{ marginTop: 10 }} className="info-box info-box-warning">
                      ⚠️ Always power off before changing wiring. Use a multimeter to verify connections.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

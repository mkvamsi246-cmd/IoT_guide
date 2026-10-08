import React, { useState } from 'react';
import { basicComponents } from '../data/components';
import ComponentDetailModal from '../components/ComponentDetailModal';
import ComponentThumb from '../components/ComponentThumb';

const IOT_CONCEPTS = [
  {
    id: 'what-is-iot',
    title: 'What is IoT?',
    icon: '🌐',
    content: `The Internet of Things (IoT) is a network of physical devices embedded with sensors, software, and connectivity that enables them to collect and exchange data over the internet.

Think of IoT as giving "smart intelligence" to everyday objects:
• A smart refrigerator that orders groceries automatically
• A smartwatch that monitors your heart rate and shares it with your doctor
• Smart street lights that dim when no one is around

The global IoT market is expected to exceed 30 billion connected devices by 2030.`,
    examples: ['Smart Home', 'Industrial Monitoring', 'Precision Agriculture', 'Smart Cities', 'Healthcare IoT', 'Wearables'],
  },
  {
    id: 'iot-architecture',
    title: 'IoT Architecture',
    icon: '🏗️',
    content: `IoT systems follow a layered architecture:

1. PERCEPTION LAYER (Sensors & Actuators)
   Physical devices that sense the environment and take actions.

2. NETWORK LAYER (Communication)
   Transfers data using Wi-Fi, Bluetooth, LoRa, Zigbee, 4G/5G.

3. PROCESSING LAYER (Edge/Fog/Cloud)
   Processes, stores, and analyzes collected data.

4. APPLICATION LAYER (User Interface)
   Mobile apps, dashboards, and automated control systems.`,
    flow: ['Sensors', 'Processing', 'Communication', 'Cloud', 'User'],
  },
  {
    id: 'how-iot-works',
    title: 'How IoT Works',
    icon: '⚙️',
    content: `An IoT system follows this data flow:

Step 1: SENSE
A sensor measures a physical parameter (temperature, motion, light).

Step 2: PROCESS
The microcontroller (ESP32/Arduino) reads sensor data and processes it.

Step 3: CONNECT
Data is transmitted wirelessly via Wi-Fi, Bluetooth, or cellular.

Step 4: ANALYZE
Cloud platforms (Firebase, ThingSpeak) store and analyze the data.

Step 5: ACT
Alerts are sent, actuators are triggered, or dashboards are updated.`,
  },
];

const BASIC_ELECTRONICS = [
  { term: 'Voltage (V)', symbol: 'V', unit: 'Volts', description: 'Electrical potential difference – the "pressure" that drives current flow. Like water pressure in a pipe.', formula: 'V = I × R', example: 'ESP32 uses 3.3V; Arduino uses 5V' },
  { term: 'Current (I)', symbol: 'I', unit: 'Amperes (A) / mA', description: 'Rate of electron flow through a conductor. Like water flow rate in a pipe.', formula: 'I = V / R', example: 'LED needs ~20mA; Motor needs 200mA–2A' },
  { term: 'Resistance (R)', symbol: 'Ω', unit: 'Ohms', description: 'Opposition to current flow. Used to control current levels.', formula: 'R = V / I', example: '220Ω resistor limits LED current' },
  { term: 'GPIO', symbol: '📌', unit: 'Digital 0 or 1', description: 'General Purpose Input/Output – pins that can read or output digital HIGH (3.3V) or LOW (0V) signals.', formula: 'HIGH = 3.3V; LOW = 0V', example: 'LED control, button reading' },
  { term: 'ADC', symbol: '📊', unit: '0–4095 (12-bit)', description: 'Analog-to-Digital Converter – converts analog voltage (0–3.3V) to a digital number.', formula: 'Value = (Vin/3.3V) × 4095', example: 'Reading potentiometer, LDR, soil sensor' },
  { term: 'PWM', symbol: '〰️', unit: '0–255 duty cycle', description: 'Pulse Width Modulation – simulates analog output by rapidly switching digital signal. Duty cycle controls average power.', formula: 'Vavg = (duty/255) × 3.3V', example: 'LED dimming, servo control, motor speed' },
  { term: 'VCC', symbol: '+ 3.3V/5V', unit: 'Volts', description: 'Positive power supply terminal. The voltage source connection for components.', formula: 'Common: 3.3V, 5V, 12V', example: 'Always check component VCC requirement!' },
  { term: 'GND', symbol: '⏚', unit: '0V reference', description: 'Ground – the zero voltage reference point. All circuits need a common GND connection.', formula: '0V', example: 'All components share common GND' },
  { term: 'Digital Signal', symbol: '⬛⬜', unit: 'HIGH/LOW', description: 'Binary signal – only two states: HIGH (3.3V) or LOW (0V). Used for ON/OFF control.', formula: 'HIGH = 1, LOW = 0', example: 'Button, relay, LED on/off' },
  { term: 'Analog Signal', symbol: '〜', unit: '0–3.3V continuous', description: 'Continuous signal that can be any value between min and max. Requires ADC to read with microcontroller.', formula: '0V to 3.3V (ESP32)', example: 'Temperature sensor, potentiometer output' },
];

export default function IoTBasicsPage() {
  const [activeSection, setActiveSection] = useState('intro');
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [expandedConcept, setExpandedConcept] = useState(null);

  return (
    <div>
      <div className="hero-section">
        <div className="hero-grid" />
        <div className="hero-glow hero-glow-1" style={{ background: 'radial-gradient(circle, rgba(68,136,255,0.1) 0%, transparent 70%)' }} />
        <div className="hero-content">
          <div className="hero-label" style={{ color: '#44aaff', borderColor: 'rgba(68,136,255,0.3)' }}>🟢 Beginner Level</div>
          <h1 className="hero-title" style={{ background: 'linear-gradient(135deg, #fff, #44aaff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            IoT Basics
          </h1>
          <p style={{ color: '#ccc', fontSize: 16, maxWidth: 580, lineHeight: 1.6 }}>
            Start your IoT journey here. Learn the fundamentals of IoT, basic electronics, and explore your first components with 3D models and simple explanations.
          </p>
        </div>
      </div>

      <div className="page-container">
        {/* Section Navigation */}
        <div className="tabs">
          {[
            { id: 'intro', label: '🌐 IoT Introduction' },
            { id: 'electronics', label: '⚡ Basic Electronics' },
            { id: 'components', label: '🔧 Basic Components' },
          ].map(tab => (
            <button key={tab.id} className={`tab-btn ${activeSection === tab.id ? 'active' : ''}`} onClick={() => setActiveSection(tab.id)}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* IoT Introduction */}
        {activeSection === 'intro' && (
          <div>
            {IOT_CONCEPTS.map(concept => (
              <div key={concept.id} style={{ marginBottom: 24 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '16px 20px', background: '#141414', borderRadius: 12, border: '1px solid rgba(255,255,255,0.07)', cursor: 'pointer', transition: 'all 0.2s' }}
                  onClick={() => setExpandedConcept(expandedConcept === concept.id ? null : concept.id)}>
                  <span style={{ fontSize: 26 }}>{concept.icon}</span>
                  <span style={{ fontFamily: 'Orbitron, monospace', fontSize: 16, fontWeight: 700 }}>{concept.title}</span>
                  <span style={{ marginLeft: 'auto', color: '#777', fontSize: 14 }}>{expandedConcept === concept.id ? '▲' : '▼'}</span>
                </div>
                {expandedConcept === concept.id && (
                  <div style={{ background: '#0d0d0d', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '0 0 12px 12px', padding: 24, borderTop: 'none', animation: 'slideIn 0.2s ease' }}>
                    <pre style={{ fontFamily: 'Inter, sans-serif', fontSize: 14.5, color: '#ddd', lineHeight: 1.8, whiteSpace: 'pre-wrap', marginBottom: concept.examples ? 16 : 0 }}>
                      {concept.content}
                    </pre>
                    {concept.examples && (
                      <div>
                        <div style={{ fontSize: 13, color: '#777', marginBottom: 8, fontWeight: 600 }}>Real-World Examples:</div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                          {concept.examples.map((ex, i) => (
                            <span key={i} style={{ padding: '4px 12px', background: 'rgba(68,136,255,0.08)', border: '1px solid rgba(68,136,255,0.2)', borderRadius: 20, fontSize: 13, color: '#44aaff' }}>{ex}</span>
                          ))}
                        </div>
                      </div>
                    )}
                    {concept.flow && (
                      <div>
                        <div style={{ fontSize: 13, color: '#777', marginBottom: 10, fontWeight: 600 }}>Data Flow:</div>
                        <div className="flow-diagram" style={{ overflowX: 'auto' }}>
                          {concept.flow.map((node, i, arr) => (
                            <React.Fragment key={node}>
                              <div className="flow-node">
                                <div className="flow-node-box" style={{ borderColor: '#44aaff44', background: '#44aaff0d', color: '#44aaff', fontSize: 13, fontWeight: 600 }}>{node}</div>
                              </div>
                              {i < arr.length - 1 && <div className="flow-arrow" style={{ fontSize: 18 }}>→</div>}
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Basic Electronics */}
        {activeSection === 'electronics' && (
          <div>
            <div className="info-box info-box-info" style={{ marginBottom: 24, fontSize: 14 }}>
              💡 Understanding these fundamental concepts is essential for building any IoT project successfully.
            </div>
            <div className="grid-2">
              {BASIC_ELECTRONICS.map((item, i) => (
                <div key={i} style={{ background: '#141414', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, padding: 22, transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(68,136,255,0.3)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.transform = 'none'; }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                    <div style={{ fontFamily: 'Orbitron, monospace', fontSize: 22, color: '#44aaff' }}>{item.symbol}</div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 16, color: '#fff' }}>{item.term}</div>
                      <div style={{ fontSize: 12.5, color: '#777', fontFamily: 'JetBrains Mono, monospace' }}>Unit: {item.unit}</div>
                    </div>
                  </div>
                  <p style={{ fontSize: 14, color: '#aaa', lineHeight: 1.6, marginBottom: 14 }}>{item.description}</p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                    <div style={{ padding: '8px 12px', background: '#0d0d0d', borderRadius: 6, border: '1px solid rgba(255,255,255,0.05)' }}>
                      <div style={{ fontSize: 12, color: '#777', marginBottom: 2 }}>Formula</div>
                      <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, color: '#ffcc00' }}>{item.formula}</div>
                    </div>
                    <div style={{ padding: '8px 12px', background: '#0d0d0d', borderRadius: 6, border: '1px solid rgba(255,255,255,0.05)' }}>
                      <div style={{ fontSize: 12, color: '#777', marginBottom: 2 }}>Example</div>
                      <div style={{ fontSize: 13, color: '#bbb' }}>{item.example}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Basic Components */}
        {activeSection === 'components' && (
          <div>
            <div className="info-box info-box-tip" style={{ marginBottom: 20, fontSize: 14 }}>
              🎯 Click any component card to explore its 3D model, pinout, ESP32 connection, and example code.
            </div>
            <div className="grid-auto">
              {basicComponents.map(comp => (
                <div key={comp.id} style={{ background: '#141414', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, overflow: 'hidden', cursor: 'pointer', transition: 'all 0.3s' }}
                  onClick={() => setSelectedComponent(comp)}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = `${comp.color}44`; e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 8px 24px ${comp.color}22`; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}>
                  <div style={{ height: 120, position: 'relative', borderBottom: `2px solid ${comp.color}22` }}>
                    <ComponentThumb componentId={comp.id} color={comp.color} height={120} />
                    <div style={{ position: 'absolute', top: 8, left: 8, padding: '3px 10px', background: 'rgba(0,0,0,0.75)', borderRadius: 20, fontSize: 12, color: '#aaa', border: '1px solid rgba(255,255,255,0.12)' }}>
                      {comp.level}
                    </div>
                  </div>
                  <div style={{ padding: 16 }}>
                    <div style={{ fontWeight: 700, fontSize: 16, color: comp.color, marginBottom: 6 }}>{comp.name}</div>
                    <p style={{ fontSize: 13.5, color: '#999', lineHeight: 1.55, marginBottom: 12, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {comp.description}
                    </p>
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                      <span style={{ padding: '3px 9px', background: '#0d0d0d', borderRadius: 4, fontSize: 12, color: '#888', border: '1px solid rgba(255,255,255,0.05)', fontFamily: 'JetBrains Mono, monospace' }}>{comp.protocol}</span>
                      <span style={{ padding: '3px 9px', background: '#0d0d0d', borderRadius: 4, fontSize: 12, color: '#ff4444', border: '1px solid rgba(255,34,34,0.12)', fontFamily: 'JetBrains Mono, monospace' }}>{comp.voltage}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {selectedComponent && <ComponentDetailModal component={selectedComponent} onClose={() => setSelectedComponent(null)} />}
    </div>
  );
}

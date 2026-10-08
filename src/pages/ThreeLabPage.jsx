import React, { useState } from 'react';
import { allComponents } from '../data/components';
import ComponentDetailModal from '../components/ComponentDetailModal';
import ThreeViewer from '../components/ThreeViewer';
import ComponentThumb from '../components/ComponentThumb';

const FEATURED_3D = [
  { id: 'esp32', name: 'ESP32 DevKit', tag: 'Dual-Core SoC · 38 Pins', icon: '⚡' },
  { id: 'bmp280', name: 'BMP280 Sensor', tag: 'Purple PCB · I2C Bus', icon: '🧭' },
  { id: 'mq2', name: 'MQ-2 Gas Sensor', tag: 'Wire Mesh Dome · 4 Pins', icon: '💨' },
  { id: 'ir-sensor', name: 'IR Obstacle', tag: 'Dual LEDs · 3 Pins', icon: '🔴' },
  { id: 'soil-moisture', name: 'Soil Moisture', tag: 'Fork Probe · Gold Tracks', icon: '🌱' },
  { id: 'led', name: 'LED (5mm Diode)', tag: 'Polarized · Long Anode', icon: '💡' },
  { id: 'resistor', name: '1kΩ Resistor', tag: '4 Color Bands · Axial', icon: '〰️' },
  { id: 'capacitor', name: '1000µF Capacitor', tag: 'Electrolytic · Safety Vent', icon: '🔋' },
  { id: 'pushbutton', name: 'Push Button', tag: '6×6mm Tactile · 4 Legs', icon: '🔘' },
  { id: 'potentiometer', name: '10kΩ Potentiometer', tag: 'Rotary Shaft · 3 Lugs', icon: '🎛️' },
  { id: 'buzzer', name: 'Piezo Buzzer', tag: 'Active 3–5V · Sound Port', icon: '🔔' },
  { id: 'raspberry-pi', name: 'Raspberry Pi 4', tag: 'Broadcom BCM2711 · 40 GPIO', icon: '🍓' },
  { id: 'esp32cam', name: 'ESP32-CAM', tag: 'OV2640 Lens · Flash LED', icon: '📷' },
  { id: 'esp8266', name: 'ESP8266 NodeMCU', tag: 'ESP-12E Shield · Wi-Fi', icon: '📶' },
  { id: 'hc-sr04', name: 'HC-SR04 Ultrasonic', tag: 'Dual Sonar · 40kHz', icon: '📡' },
  { id: 'oled-i2c', name: 'OLED Display', tag: 'SSD1306 128×64 · 4 Pins', icon: '🖥️' },
];

const LEVEL_COLORS = { beginner: '#00ff88', intermediate: '#ffcc00', advanced: '#ff4444' };

export default function ThreeLabPage() {
  const [active3DId, setActive3DId] = useState('esp32');
  const [selectedModalComp, setSelectedModalComp] = useState(null);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [levelFilter, setLevelFilter] = useState('all');
  const [inspectedPin, setInspectedPin] = useState(null);

  const activeCompData = allComponents.find((c) => c.id === active3DId) || allComponents.find((c) => c.id === 'esp32');

  const categories = [
    { id: 'all', label: 'All Components' },
    { id: 'Basic', label: 'Basic' },
    { id: 'Sensors', label: 'Sensors' },
    { id: 'Board', label: 'Boards' },
    { id: 'Communication', label: 'Communication' },
    { id: 'Actuators', label: 'Actuators' },
    { id: 'Displays', label: 'Displays' },
  ];

  const filtered = allComponents.filter((c) => {
    const matchCat = filter === 'all' || c.category === filter;
    const matchLevel = levelFilter === 'all' || c.level === levelFilter;
    const matchSearch =
      !search ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.description?.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchLevel && matchSearch;
  });

  return (
    <div>
      {/* Hero Header */}
      <div className="hero-section" style={{ padding: '32px' }}>
        <div className="hero-grid" />
        <div className="hero-glow hero-glow-1" />
        <div className="hero-content">
          <div className="hero-label">⬡ Privid 3D Hardware Lab</div>
          <h1 className="hero-title">Privid 3D Component Studio</h1>
          <p style={{ color: '#aaa', fontSize: 14, maxWidth: 640 }}>
            Inspect microcontrollers, sensors, and actuators in ultra-high visual clarity. Toggle floating 3D pin callouts,
            explode internal layers, rotate 360°, and tap any pin to view its full pinout function, multiplexing, and safe voltage limits.
          </p>
        </div>
      </div>

      <div className="page-container">
        {/* ─── 3D Interactive Workbench Stage ─── */}
        <section
          style={{
            background: 'linear-gradient(180deg, #12141c 0%, #0d0f14 100%)',
            border: '1px solid rgba(255, 68, 68, 0.25)',
            borderRadius: 18,
            padding: 24,
            marginBottom: 36,
            boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
          }}
        >
          {/* Component Selector Bar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 18 }}>
            <div>
              <div style={{ fontFamily: 'Orbitron, monospace', fontSize: 15, color: '#ff4444', letterSpacing: 1.5, marginBottom: 4, fontWeight: 700 }}>
                🔬 3D HARDWARE WORKBENCH
              </div>
              <div style={{ fontSize: 13.5, color: '#aaa' }}>
                Select a component to inspect in high-fidelity 3D with live pin callouts & exploded view:
              </div>
            </div>

            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {FEATURED_3D.map((item) => {
                const isActive = active3DId === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActive3DId(item.id);
                      setInspectedPin(null);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      padding: '8px 14px',
                      borderRadius: 8,
                      border: `1px solid ${isActive ? '#ff4444' : 'rgba(255,255,255,0.1)'}`,
                      background: isActive ? 'rgba(255, 68, 68, 0.18)' : 'rgba(255,255,255,0.04)',
                      color: isActive ? '#fff' : '#ccc',
                      cursor: 'pointer',
                      fontSize: 13.5,
                      fontWeight: isActive ? 700 : 500,
                      transition: 'all 0.2s',
                    }}
                  >
                    <span>{item.icon}</span>
                    <span>{item.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Workbench Grid: 3D Canvas + Hardware Spec / Pinout Matrix */}
          <div className="workbench-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.6fr) minmax(0, 1fr)', gap: 20 }}>
            {/* Left: 3D High-Fidelity Canvas */}
            <div>
              <ThreeViewer
                componentId={active3DId}
                color={activeCompData?.color || '#ff4444'}
                height={460}
                showControls={true}
                onSelectPin={(pin) => setInspectedPin(pin)}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12, fontSize: 13.5, color: '#aaa', flexWrap: 'wrap', gap: 8 }}>
                <span>💡 Left click + drag: Rotate · Right click: Pan · Scroll: Zoom in/out</span>
                <button
                  onClick={() => setSelectedModalComp(activeCompData)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#ff4444',
                    cursor: 'pointer',
                    fontSize: 14,
                    fontWeight: 700,
                    textDecoration: 'underline',
                  }}
                >
                  View Full Specs & Arduino Code →
                </button>
              </div>
            </div>

            {/* Right: Live Pinout Matrix & Specs */}
            <div
              className="workbench-specs-panel"
              style={{
                background: '#0a0d13',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 14,
                padding: 20,
                display: 'flex',
                flexDirection: 'column',
                height: 460,
                overflowY: 'auto',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14, borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: 12 }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#fff' }}>{activeCompData?.name}</h3>
                  <div style={{ fontSize: 13, color: '#94a3b8', marginTop: 3 }}>{activeCompData?.category} · {activeCompData?.subcategory || 'Module'}</div>
                </div>
                <div style={{ display: 'flex', gap: 6 }}>
                  <span className="tag tag-red">{activeCompData?.voltage}</span>
                  <span className="tag tag-gray">{activeCompData?.protocol || 'GPIO'}</span>
                </div>
              </div>

              {/* Inspected Pin Highlight */}
              {inspectedPin ? (
                <div
                  style={{
                    background: 'rgba(255, 68, 68, 0.1)',
                    border: '1px solid rgba(255, 68, 68, 0.35)',
                    borderRadius: 10,
                    padding: 14,
                    marginBottom: 16,
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <span style={{ fontWeight: 700, color: inspectedPin.color || '#ff4444', fontSize: 14.5 }}>
                      📍 {inspectedPin.name}
                    </span>
                    <span style={{ fontSize: 12, color: '#ff4444', background: 'rgba(255,68,68,0.18)', padding: '3px 8px', borderRadius: 4, fontWeight: 600 }}>
                      {inspectedPin.voltage || 'Signal'}
                    </span>
                  </div>
                  <div style={{ fontSize: 13, color: '#ccc', lineHeight: 1.5 }}>{inspectedPin.desc}</div>
                </div>
              ) : (
                <div style={{ fontSize: 13, color: '#aaa', background: 'rgba(255,255,255,0.03)', padding: '10px 14px', borderRadius: 8, marginBottom: 16 }}>
                  ℹ️ Click any pin label or solder pad in the 3D model to see full electrical specs and alternate GPIO modes.
                </div>
              )}

              {/* Pinout List */}
              <div style={{ flex: 1, minHeight: 0 }}>
                <div style={{ fontSize: 12.5, fontWeight: 700, color: '#aaa', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 }}>
                  Component Pin List
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {activeCompData?.pins ? (
                    activeCompData.pins.map((pin, i) => (
                      <div
                        key={i}
                        onClick={() =>
                          setInspectedPin({
                            name: pin.name,
                            desc: pin.function,
                            voltage: activeCompData.voltage,
                            pinType: pin.color || 'Signal',
                            color: '#00e5ff',
                          })
                        }
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          background: '#121620',
                          border: '1px solid rgba(255,255,255,0.06)',
                          borderRadius: 8,
                          padding: '9px 12px',
                          cursor: 'pointer',
                          transition: 'all 0.15s',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(255,68,68,0.45)')}
                        onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)')}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <span style={{ width: 8, height: 8, borderRadius: '50%', background: pin.color?.includes('Ground') ? '#888' : '#ff4444' }} />
                          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13.5, fontWeight: 700, color: '#fff' }}>
                            {pin.name}
                          </span>
                        </div>
                        <span style={{ fontSize: 12.5, color: '#aaa' }}>{pin.function}</span>
                      </div>
                    ))
                  ) : (
                    <div style={{ fontSize: 13, color: '#888' }}>Standard hardware pinout displayed on 3D model callouts.</div>
                  )}
                </div>
              </div>

              {/* ESP32 Wiring Tip */}
              {activeCompData?.tip && (
                <div style={{ marginTop: 14, paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.08)', fontSize: 13, color: '#ffaa44', lineHeight: 1.5 }}>
                  ⚡ <strong>Tip:</strong> {activeCompData.tip}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ─── All Components Catalog Filter & Search ─── */}
        <div style={{ marginBottom: 20 }}>
          <h2 className="section-title">📦 All IoT Components ({filtered.length})</h2>
          <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 240, position: 'relative' }}>
              <svg
                style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#666' }}
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search components by name, protocol, or function..."
                style={{
                  width: '100%',
                  background: '#141414',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: 10,
                  padding: '11px 14px 11px 40px',
                  color: '#fff',
                  fontSize: 14.5,
                  outline: 'none',
                  fontFamily: 'Inter, sans-serif',
                }}
              />
            </div>
            {['all', 'beginner', 'intermediate', 'advanced'].map((l) => (
              <button
                key={l}
                onClick={() => setLevelFilter(l)}
                className={`filter-btn ${levelFilter === l ? 'active' : ''}`}
                style={{ textTransform: 'capitalize' }}
              >
                {l}
              </button>
            ))}
          </div>

          <div className="filter-bar">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`filter-btn ${filter === cat.id ? 'active' : ''}`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Components Grid */}
        <div className="grid-auto">
          {filtered.map((comp) => {
            const lc = LEVEL_COLORS[comp.level] || '#888';
            return (
              <div key={comp.id} className="component-card" onClick={() => setSelectedModalComp(comp)}>
                <div className="component-card-header">
                  <div className="component-3d-preview" style={{ height: 80, width: 80 }}>
                    <ComponentThumb componentId={comp.id} color={comp.color} height={80} />
                  </div>
                  <div className="component-info">
                    <div className="component-name">{comp.name}</div>
                    <div className="component-category">{comp.subcategory || comp.category}</div>
                    <div className="component-meta">
                      <span
                        className="tag"
                        style={{ background: `${lc}15`, color: lc, border: `1px solid ${lc}30`, fontSize: 11.5 }}
                      >
                        {comp.level}
                      </span>
                      {comp.protocol && <span className="tag tag-blue">{comp.protocol}</span>}
                    </div>
                  </div>
                </div>
                <p className="component-description">{comp.description}</p>
                <div className="component-card-footer">
                  <span className="component-protocol">{comp.measures || comp.technology || 'General'}</span>
                  <span className="component-voltage">{comp.voltage}</span>
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#555' }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
            <p>No components found matching your search.</p>
          </div>
        )}
      </div>

      {selectedModalComp && (
        <ComponentDetailModal component={selectedModalComp} onClose={() => setSelectedModalComp(null)} />
      )}
    </div>
  );
}

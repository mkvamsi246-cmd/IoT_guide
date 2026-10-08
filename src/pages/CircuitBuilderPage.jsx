import React, { useState } from 'react';

const CIRCUIT_COMPONENTS = [
  { id: 'esp32', label: 'ESP32 DevKit', icon: '🖥️', color: '#ff4444', pins: ['GPIO 4', 'GPIO 5', 'GPIO 13', 'GPIO 16', 'GPIO 17', 'GPIO 18', 'GPIO 19', 'GPIO 21', 'GPIO 22', 'GPIO 23', '3.3V', '5V (Vin)', 'GND'] },
  { id: 'dht11', label: 'DHT11', icon: '🌡️', color: '#44aaff', connects: { VCC: '3.3V', GND: 'GND', DATA: 'GPIO 4' }, protocol: 'Single-Wire', note: '10kΩ pull-up on DATA' },
  { id: 'dht22', label: 'DHT22', icon: '🌡️', color: '#44ccff', connects: { VCC: '3.3V', GND: 'GND', DATA: 'GPIO 4' }, protocol: 'Single-Wire', note: '4.7kΩ pull-up on DATA' },
  { id: 'oled', label: 'OLED 0.96"', icon: '🖥️', color: '#ffffff', connects: { VCC: '3.3V', GND: 'GND', SCL: 'GPIO 22', SDA: 'GPIO 21' }, protocol: 'I2C', note: 'Address 0x3C' },
  { id: 'lcd-i2c', label: 'LCD I2C', icon: '📺', color: '#00ff88', connects: { VCC: '5V (Vin)', GND: 'GND', SCL: 'GPIO 22', SDA: 'GPIO 21' }, protocol: 'I2C', note: 'Address 0x27' },
  { id: 'led', label: 'LED', icon: '💡', color: '#ffdd44', connects: { Anode: 'GPIO 5 (via 220Ω)', Cathode: 'GND' }, protocol: 'GPIO', note: 'Use 220Ω resistor' },
  { id: 'relay', label: 'Relay Module', icon: '⚡', color: '#aa44ff', connects: { VCC: '5V (Vin)', GND: 'GND', IN: 'GPIO 26' }, protocol: 'GPIO (Active LOW)', note: 'Active LOW signal' },
  { id: 'servo', label: 'SG90 Servo', icon: '🔧', color: '#ff8844', connects: { VCC: 'External 5V', GND: 'GND (common)', Signal: 'GPIO 13' }, protocol: 'PWM 50Hz', note: 'Use external 5V!' },
  { id: 'ultrasonic', label: 'HC-SR04', icon: '📏', color: '#44ffaa', connects: { VCC: '5V (Vin)', GND: 'GND', TRIG: 'GPIO 5', ECHO: 'GPIO 18 (voltage divider!)' }, protocol: 'GPIO Trig/Echo', note: 'ECHO needs 3.3V divider!' },
  { id: 'mq2', label: 'MQ-2 Gas', icon: '💨', color: '#ff8844', connects: { VCC: '5V (Vin)', GND: 'GND', AO: 'GPIO 34 (ADC)', DO: 'GPIO 4' }, protocol: 'Analog + Digital', note: 'Preheat 20 seconds!' },
  { id: 'ldr', label: 'LDR', icon: '☀️', color: '#ffdd44', connects: { 'LDR + 10kΩ to': '3.3V → GND divider', Output: 'GPIO 34 (ADC)' }, protocol: 'Analog (ADC)', note: 'Voltage divider needed' },
  { id: 'pir', label: 'PIR Sensor', icon: '🏃', color: '#ff44aa', connects: { VCC: '5V (Vin)', GND: 'GND', OUT: 'GPIO 13' }, protocol: 'GPIO Digital', note: '30s warm-up time' },
  { id: 'rfid', label: 'RC522 RFID', icon: '🪪', color: '#ff44aa', connects: { VCC: '3.3V ONLY', GND: 'GND', SCK: 'GPIO 18', MOSI: 'GPIO 23', MISO: 'GPIO 19', SDA: 'GPIO 5', RST: 'GPIO 22' }, protocol: 'SPI', note: '3.3V ONLY – 5V destroys it!' },
  { id: 'motor-l298n', label: 'DC Motor + L298N', icon: '⚙️', color: '#44ff88', connects: { 'L298N VCC': 'External 12V', 'L298N GND': 'GND (common)', 'L298N IN1': 'GPIO 27', 'L298N IN2': 'GPIO 26', 'L298N ENA': 'GPIO 14 (PWM)' }, protocol: 'PWM + GPIO', note: 'Never direct to GPIO!' },
];

function WiringLine({ fromColor, label }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '5px 0' }}>
      <div style={{ width: 24, height: 3, borderRadius: 2, background: fromColor || '#888', flexShrink: 0 }} />
      <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: '#ccc' }}>{label}</span>
    </div>
  );
}

function getWireColor(pin) {
  const p = pin?.toLowerCase() || '';
  if (p.includes('vcc') || p.includes('3.3v') || p.includes('5v') || p.includes('anode')) return '#ff4444';
  if (p.includes('gnd') || p.includes('cathode')) return '#4466ff';
  if (p.includes('sda') || p.includes('data')) return '#44ff88';
  if (p.includes('scl') || p.includes('sck') || p.includes('clk')) return '#ffcc00';
  if (p.includes('mosi') || p.includes('tx')) return '#ff8844';
  if (p.includes('miso') || p.includes('rx')) return '#aa44ff';
  if (p.includes('trig')) return '#44ffcc';
  if (p.includes('echo')) return '#ff44aa';
  if (p.includes('signal') || p.includes('in')) return '#44aaff';
  return '#888888';
}

export default function CircuitBuilderPage() {
  const [selectedComponents, setSelectedComponents] = useState(['esp32']);
  const [validationResult, setValidationResult] = useState(null);

  const toggleComponent = (id) => {
    if (id === 'esp32') return;
    setSelectedComponents(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
    setValidationResult(null);
  };

  const validate = () => {
    const issues = [];
    const tips = [];
    const selected = selectedComponents.filter(id => id !== 'esp32');

    // Check for conflicts
    if (selected.includes('oled') && selected.includes('lcd-i2c')) {
      tips.push('Both OLED and LCD use I2C – check I2C addresses (OLED: 0x3C, LCD: 0x27). They can co-exist if addresses differ.');
    }
    if (selected.includes('rfid') && selected.includes('oled')) {
      issues.push('RFID uses SPI (GPIO 22 for RST) and OLED uses I2C (GPIO 22 for SCL). GPIO 22 conflict! Change RFID RST to GPIO 4.');
    }
    if (selected.includes('ultrasonic') && selected.includes('rfid')) {
      tips.push('HC-SR04 uses GPIO 18 for ECHO; RFID uses GPIO 18 for SCK. Conflict! Use different GPIO for ECHO.');
    }
    if (selected.includes('servo') && selected.includes('relay')) {
      tips.push('Servo and Relay both need external power. Use a dedicated 5V power supply, not USB only.');
    }
    if (selected.includes('mq2')) {
      tips.push('MQ-2 AO output is 0-5V but ESP32 ADC is 3.3V max. Use a voltage divider on AO pin!');
    }

    setValidationResult({ issues, tips, valid: issues.length === 0 });
  };

  const activeComponents = CIRCUIT_COMPONENTS.filter(c => selectedComponents.includes(c.id));
  const esp32 = CIRCUIT_COMPONENTS.find(c => c.id === 'esp32');
  const activeNonESP = activeComponents.filter(c => c.id !== 'esp32');

  return (
    <div>
      <div className="hero-section">
        <div className="hero-grid" />
        <div className="hero-content">
          <div className="hero-label" style={{ color: '#44ff88', borderColor: 'rgba(0,255,136,0.3)' }}>🔧 Interactive Circuit Builder</div>
          <h1 className="hero-title" style={{ background: 'linear-gradient(135deg, #fff, #44ff88)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Circuit Builder
          </h1>
          <p style={{ color: '#aaa', fontSize: 14, maxWidth: 550 }}>
            Select components to build your ESP32 circuit. View pin connections, detect conflicts, and get wiring guidance.
          </p>
        </div>
      </div>

      <div className="page-container">
        <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: 24 }}>

          {/* Component Palette */}
          <div>
            <h3 style={{ fontFamily: 'Orbitron, monospace', fontSize: 13, marginBottom: 16, color: '#fff' }}>📦 Component Palette</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {CIRCUIT_COMPONENTS.map(comp => {
                const active = selectedComponents.includes(comp.id);
                const isESP = comp.id === 'esp32';
                return (
                  <div key={comp.id} onClick={() => toggleComponent(comp.id)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px',
                      background: active ? `${comp.color}0f` : '#141414',
                      border: `1px solid ${active ? comp.color + '44' : 'rgba(255,255,255,0.06)'}`,
                      borderRadius: 10, cursor: isESP ? 'default' : 'pointer', transition: 'all 0.2s',
                    }}>
                    <span style={{ fontSize: 18 }}>{comp.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 12, fontWeight: 600, color: active ? comp.color : '#aaa' }}>{comp.label}</div>
                      {comp.protocol && <div style={{ fontSize: 10, color: '#555' }}>{comp.protocol}</div>}
                    </div>
                    {!isESP && (
                      <div style={{ width: 16, height: 16, borderRadius: 4, border: `2px solid ${active ? comp.color : '#444'}`, background: active ? comp.color : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: '#000', fontWeight: 700, flexShrink: 0 }}>
                        {active ? '✓' : ''}
                      </div>
                    )}
                    {isESP && <span style={{ fontSize: 10, color: '#666' }}>Fixed</span>}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Circuit Diagram */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <h3 style={{ fontFamily: 'Orbitron, monospace', fontSize: 13, color: '#fff' }}>🔌 Wiring Diagram</h3>
              <button onClick={validate} style={{ marginLeft: 'auto', padding: '7px 16px', background: 'linear-gradient(135deg, #cc0000, #ff2222)', border: 'none', borderRadius: 8, color: '#fff', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
                ✓ Validate Circuit
              </button>
            </div>

            {/* Validation Result */}
            {validationResult && (
              <div style={{ marginBottom: 16 }}>
                {validationResult.valid ? (
                  <div style={{ background: 'rgba(0,255,136,0.06)', border: '1px solid rgba(0,255,136,0.25)', borderRadius: 10, padding: 14, fontSize: 13, color: '#00ff88' }}>
                    ✅ Circuit looks valid! No critical conflicts detected.
                  </div>
                ) : (
                  <div style={{ background: 'rgba(255,34,34,0.06)', border: '1px solid rgba(255,34,34,0.25)', borderRadius: 10, padding: 14 }}>
                    {validationResult.issues.map((issue, i) => (
                      <div key={i} style={{ fontSize: 13, color: '#ff4444', marginBottom: 4 }}>❌ {issue}</div>
                    ))}
                  </div>
                )}
                {validationResult.tips.length > 0 && (
                  <div style={{ background: 'rgba(255,204,0,0.05)', border: '1px solid rgba(255,204,0,0.2)', borderRadius: 10, padding: 14, marginTop: 8 }}>
                    {validationResult.tips.map((tip, i) => (
                      <div key={i} style={{ fontSize: 12, color: '#ffcc00', marginBottom: 4 }}>⚠️ {tip}</div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Canvas */}
            <div className="circuit-canvas" style={{ padding: 24, minHeight: 400 }}>
              {/* ESP32 Center */}
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
                <div style={{ background: '#1a0a0a', border: '2px solid rgba(255,34,34,0.4)', borderRadius: 12, padding: '16px 24px', boxShadow: '0 0 24px rgba(255,34,34,0.2)' }}>
                  <div style={{ fontFamily: 'Orbitron, monospace', fontSize: 14, color: '#ff4444', textAlign: 'center', marginBottom: 8 }}>🖥️ ESP32 DevKit</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
                    {['3.3V', '5V(Vin)', 'GND', 'GPIO 4', 'GPIO 5', 'GPIO 13', 'GPIO 18', 'GPIO 19', 'GPIO 21', 'GPIO 22', 'GPIO 23', 'GPIO 26', 'GPIO 34'].map(pin => (
                      <div key={pin} style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 9, color: getWireColor(pin), padding: '2px 6px', background: '#0a0a0a', borderRadius: 3, border: `1px solid ${getWireColor(pin)}33` }}>
                        {pin}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Connected Components */}
              {activeNonESP.length === 0 ? (
                <div style={{ textAlign: 'center', color: '#333', padding: 40 }}>
                  <div style={{ fontSize: 48, marginBottom: 12 }}>🔌</div>
                  <p style={{ fontSize: 14 }}>Select components from the palette to build your circuit</p>
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
                  {activeNonESP.map(comp => (
                    <div key={comp.id} style={{ background: `${comp.color}08`, border: `1px solid ${comp.color}33`, borderRadius: 12, padding: 16, position: 'relative' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                        <span style={{ fontSize: 20 }}>{comp.icon}</span>
                        <span style={{ fontFamily: 'Orbitron, monospace', fontSize: 12, color: comp.color }}>{comp.label}</span>
                        <span style={{ marginLeft: 'auto', fontSize: 10, color: '#555', background: '#0d0d0d', padding: '2px 6px', borderRadius: 4, border: '1px solid rgba(255,255,255,0.04)' }}>{comp.protocol}</span>
                      </div>

                      <div style={{ borderTop: `1px solid ${comp.color}22`, paddingTop: 10 }}>
                        {Object.entries(comp.connects || {}).map(([pin, target]) => (
                          <div key={pin} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5, fontSize: 11 }}>
                            <span style={{ fontFamily: 'JetBrains Mono', color: comp.color, minWidth: 60 }}>{pin}</span>
                            <div style={{ flex: 1, height: 2, background: `linear-gradient(90deg, ${comp.color}88, ${getWireColor(target)})`, borderRadius: 1 }} />
                            <span style={{ fontFamily: 'JetBrains Mono', color: getWireColor(target), minWidth: 80, textAlign: 'right' }}>{target}</span>
                          </div>
                        ))}
                      </div>

                      {comp.note && (
                        <div style={{ marginTop: 10, padding: '6px 10px', background: 'rgba(255,204,0,0.06)', borderRadius: 6, fontSize: 10, color: '#ffcc00', border: '1px solid rgba(255,204,0,0.2)' }}>
                          ⚠️ {comp.note}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Summary Table */}
            {activeNonESP.length > 0 && (
              <div style={{ marginTop: 20 }}>
                <h4 style={{ fontFamily: 'Orbitron, monospace', fontSize: 12, color: '#888', marginBottom: 12 }}>Complete Wiring Summary</h4>
                <table className="connection-table">
                  <thead>
                    <tr><th>Module</th><th>Module Pin</th><th>ESP32 Pin</th><th>Wire Color</th></tr>
                  </thead>
                  <tbody>
                    {activeNonESP.flatMap(comp =>
                      Object.entries(comp.connects || {}).map(([pin, target], i) => (
                        <tr key={`${comp.id}-${i}`}>
                          <td style={{ fontSize: 12 }}>{comp.icon} {comp.label}</td>
                          <td><span className="pin-name">{pin}</span></td>
                          <td><span className="pin-esp">{target}</span></td>
                          <td><div style={{ width: 40, height: 4, borderRadius: 2, background: getWireColor(target) }} /></td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

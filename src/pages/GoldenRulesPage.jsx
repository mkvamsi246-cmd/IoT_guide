import React, { useState } from 'react';
import { goldenRules } from '../data/components';

export default function GoldenRulesPage() {
  const [expanded, setExpanded] = useState(null);

  return (
    <div>
      <div className="hero-section">
        <div className="hero-grid" />
        <div className="hero-glow hero-glow-1" style={{ background: 'radial-gradient(circle, rgba(255,204,0,0.1) 0%, transparent 70%)' }} />
        <div className="hero-content">
          <div className="hero-label" style={{ color: '#ffcc00', borderColor: 'rgba(255,204,0,0.3)' }}>⚡ Safety & Best Practices</div>
          <h1 className="hero-title" style={{ background: 'linear-gradient(135deg, #fff, #ffcc00)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Golden Rules of IoT
          </h1>
          <p style={{ color: '#ccc', fontSize: 16, maxWidth: 580, lineHeight: 1.6 }}>
            Essential rules every IoT developer must follow. These principles prevent component damage, protect your microcontroller, and ensure safe, reliable circuits.
          </p>
        </div>
      </div>

      <div className="page-container">
        {/* Alert Banner */}
        <div style={{ background: 'rgba(255,204,0,0.06)', border: '1px solid rgba(255,204,0,0.25)', borderRadius: 12, padding: '18px 22px', marginBottom: 32, display: 'flex', gap: 14, alignItems: 'flex-start' }}>
          <span style={{ fontSize: 26, flexShrink: 0 }}>📋</span>
          <div>
            <div style={{ fontWeight: 700, color: '#ffcc00', marginBottom: 4, fontSize: 15.5 }}>Before you build any IoT circuit, read this:</div>
            <div style={{ fontSize: 14, color: '#bbb', lineHeight: 1.6 }}>
              Violating these rules is the #1 reason students damage ESP32 boards, sensors, and components. Following them will save you time, money, and frustration.
            </div>
          </div>
        </div>

        {/* Rules Grid */}
        <div className="grid-2">
          {goldenRules.map(rule => (
            <div key={rule.id} className="golden-rule-card">
              <div className="golden-rule-header" style={{ background: `${rule.color}08`, borderBottom: `1px solid ${rule.color}25` }}>
                <div className="golden-rule-icon" style={{ width: 44, height: 44, borderRadius: 10, background: `${rule.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0, border: `1px solid ${rule.color}30` }}>
                  {rule.icon}
                </div>
                <div>
                  <div className="golden-rule-title" style={{ color: rule.color }}>{rule.title}</div>
                  <div style={{ fontSize: 13, color: '#777', marginTop: 2 }}>{rule.rules.length} rules</div>
                </div>
              </div>
              <div className="golden-rule-list">
                {rule.rules.map((r, i) => (
                  <div key={i} className="golden-rule-item">{r}</div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ESP32 Quick Reference */}
        <div style={{ marginTop: 40 }}>
          <h2 className="section-title">⚡ ESP32 GPIO Quick Reference</h2>
          <div style={{ background: '#141414', borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div style={{ padding: '16px 20px', background: '#1a1a1a', borderBottom: '1px solid rgba(255,255,255,0.05)', fontFamily: 'Orbitron, monospace', fontSize: 14.5, color: '#ff4444' }}>
              ESP32 DevKit GPIO Reference Card
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table className="connection-table" style={{ border: 'none' }}>
                <thead>
                  <tr>
                    <th>GPIO</th>
                    <th>Input</th>
                    <th>Output</th>
                    <th>ADC</th>
                    <th>PWM</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { gpio: '0', input: '⚠️', output: '✅', adc: '✅', pwm: '✅', note: 'Boot mode – avoid for input' },
                    { gpio: '1 (TX0)', input: '⚠️', output: '✅', adc: '❌', pwm: '✅', note: 'UART TX – debug output' },
                    { gpio: '2', input: '✅', output: '✅', adc: '✅', pwm: '✅', note: 'Onboard LED (active HIGH)' },
                    { gpio: '3 (RX0)', input: '✅', output: '⚠️', adc: '❌', pwm: '✅', note: 'UART RX – normally input' },
                    { gpio: '4', input: '✅', output: '✅', adc: '✅', pwm: '✅', note: 'Safe for general use' },
                    { gpio: '5', input: '✅', output: '✅', adc: '❌', pwm: '✅', note: 'SPI SS / Safe' },
                    { gpio: '12', input: '⚠️', output: '✅', adc: '✅', pwm: '✅', note: 'Boot fails if HIGH at boot' },
                    { gpio: '13', input: '✅', output: '✅', adc: '✅', pwm: '✅', note: 'Safe for general use' },
                    { gpio: '18', input: '✅', output: '✅', adc: '❌', pwm: '✅', note: 'SPI SCK – safe' },
                    { gpio: '19', input: '✅', output: '✅', adc: '❌', pwm: '✅', note: 'SPI MISO – safe' },
                    { gpio: '21', input: '✅', output: '✅', adc: '❌', pwm: '✅', note: 'I2C SDA (default)' },
                    { gpio: '22', input: '✅', output: '✅', adc: '❌', pwm: '✅', note: 'I2C SCL (default)' },
                    { gpio: '23', input: '✅', output: '✅', adc: '❌', pwm: '✅', note: 'SPI MOSI – safe' },
                    { gpio: '34', input: '✅', output: '❌', adc: '✅', pwm: '❌', note: 'INPUT ONLY – no output' },
                    { gpio: '35', input: '✅', output: '❌', adc: '✅', pwm: '❌', note: 'INPUT ONLY – no output' },
                    { gpio: '36', input: '✅', output: '❌', adc: '✅', pwm: '❌', note: 'INPUT ONLY (VP)' },
                    { gpio: '39', input: '✅', output: '❌', adc: '✅', pwm: '❌', note: 'INPUT ONLY (VN)' },
                  ].map((row, i) => (
                    <tr key={i}>
                      <td><span style={{ fontFamily: 'JetBrains Mono, monospace', color: '#ff4444', fontSize: 13.5 }}>GPIO {row.gpio}</span></td>
                      <td style={{ fontSize: 14 }}>{row.input}</td>
                      <td style={{ fontSize: 14 }}>{row.output}</td>
                      <td style={{ fontSize: 14 }}>{row.adc}</td>
                      <td style={{ fontSize: 14 }}>{row.pwm}</td>
                      <td style={{ fontSize: 13, color: '#888' }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Common Mistakes */}
        <div style={{ marginTop: 40 }}>
          <h2 className="section-title">⚠️ Common Mistakes to Avoid</h2>
          <div className="grid-3">
            {[
              { icon: '💀', title: '5V to GPIO', desc: 'Never connect 5V sensor outputs directly to ESP32 GPIO pins. Use a voltage divider (1kΩ + 2kΩ) or logic level shifter.', severity: 'danger' },
              { icon: '🔥', title: 'Motor from GPIO', desc: 'Connecting motors or relays directly to GPIO pins. Always use a motor driver IC (L298N, L293D) or transistor circuit.', severity: 'danger' },
              { icon: '💥', title: 'Missing Ground', desc: 'Not connecting all component grounds together. Every module must share GND with the ESP32.', severity: 'warning' },
              { icon: '🚫', title: 'No Pull-up on I2C', desc: 'I2C lines (SDA, SCL) need pull-up resistors to VCC. Without them, the bus won\'t work reliably.', severity: 'warning' },
              { icon: '⚡', title: 'Wrong Battery', desc: 'Using wrong power supply for sensors. MQ-2 needs 5V, RC522 needs 3.3V. Always check datasheets.', severity: 'warning' },
              { icon: '🌡️', title: 'DHT Timing', desc: 'Reading DHT11/22 more than once per second causes NaN errors. Always wait at least 2000ms between reads.', severity: 'tip' },
              { icon: '📡', title: 'LoRa No Antenna', desc: 'Running LoRa/nRF24L01 without connecting the antenna can permanently damage the RF transceiver.', severity: 'danger' },
              { icon: '🔋', title: 'LiPo Short', desc: 'Short-circuiting lithium batteries can cause fire or explosion. Always use fuses and BMS protection boards.', severity: 'danger' },
              { icon: '🔌', title: 'RC522 at 5V', desc: 'RFID RC522 module is 3.3V only. Connecting its VCC to 5V will permanently burn the chip.', severity: 'danger' },
            ].map((m, i) => (
              <div key={i} style={{
                background: m.severity === 'danger' ? 'rgba(255,34,34,0.05)' : m.severity === 'warning' ? 'rgba(255,204,0,0.05)' : 'rgba(0,255,136,0.05)',
                border: `1px solid ${m.severity === 'danger' ? 'rgba(255,34,34,0.2)' : m.severity === 'warning' ? 'rgba(255,204,0,0.2)' : 'rgba(0,255,136,0.2)'}`,
                borderRadius: 12, padding: 18,
              }}>
                <div style={{ fontSize: 30, marginBottom: 10 }}>{m.icon}</div>
                <div style={{ fontWeight: 700, marginBottom: 8, fontSize: 16, color: m.severity === 'danger' ? '#ff4444' : m.severity === 'warning' ? '#ffcc00' : '#00ff88' }}>
                  {m.title}
                </div>
                <div style={{ fontSize: 13.5, color: '#bbb', lineHeight: 1.6 }}>{m.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

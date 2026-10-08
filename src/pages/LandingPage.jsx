import React from 'react';
import PrividLogo from '../components/PrividLogo';

export default function LandingPage({ onGetStarted, onExploreCategory, onOpenHelp }) {

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#07090e',
        color: '#fff',
        fontFamily: 'Inter, sans-serif',
        position: 'relative',
        overflowX: 'hidden',
      }}
    >
      {/* Background Matrix & Subtle Cyber Red Glows */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          maxWidth: 1400,
          height: 650,
          backgroundImage:
            'radial-gradient(circle at 50% 15%, rgba(255, 34, 68, 0.15) 0%, transparent 65%), radial-gradient(circle at 85% 45%, rgba(255, 68, 68, 0.08) 0%, transparent 45%), radial-gradient(circle at 15% 45%, rgba(68, 136, 255, 0.05) 0%, transparent 45%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          opacity: 0.6,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Top Navigation Bar */}
      <header
        style={{
          position: 'relative',
          zIndex: 10,
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
          background: 'rgba(7, 9, 14, 0.85)',
          backdropFilter: 'blur(16px)',
        }}
      >
        <div
          className="landing-container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 16,
            paddingTop: 16,
            paddingBottom: 16,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <PrividLogo height={42} showTagline={false} />
            <span
              style={{
                fontFamily: 'Orbitron, monospace',
                fontSize: 11,
                color: '#ff4444',
                padding: '3px 8px',
                borderRadius: 4,
                background: 'rgba(255,68,68,0.1)',
                border: '1px solid rgba(255,68,68,0.25)',
                fontWeight: 700,
                letterSpacing: 1,
              }}
            >
              STUDENT LAB v2.0
            </span>
          </div>

          {/* Quick Nav Links on Laptop */}
          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 24,
              fontSize: 14.5,
              fontWeight: 500,
              color: '#a0aec0',
            }}
          >
            <a
              href="#modules"
              style={{ color: '#cbd5e1', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={(e) => (e.target.style.color = '#ff4444')}
              onMouseLeave={(e) => (e.target.style.color = '#cbd5e1')}
            >
              Lab Modules
            </a>
            <a
              href="#features"
              style={{ color: '#cbd5e1', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={(e) => (e.target.style.color = '#ff4444')}
              onMouseLeave={(e) => (e.target.style.color = '#cbd5e1')}
            >
              Why Privid
            </a>
            <a
              href="#curriculum"
              style={{ color: '#cbd5e1', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={(e) => (e.target.style.color = '#ff4444')}
              onMouseLeave={(e) => (e.target.style.color = '#cbd5e1')}
            >
              Curriculum
            </a>
          </nav>

          {/* Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <button
              onClick={onOpenHelp}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.14)',
                borderRadius: 8,
                padding: '9px 16px',
                color: '#e2e8f0',
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 7,
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 68, 68, 0.5)';
                e.currentTarget.style.color = '#ff4444';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.14)';
                e.currentTarget.style.color = '#e2e8f0';
              }}
            >
              <span style={{ fontSize: 15 }}>💬</span>
              <span>Ask Admin / Help</span>
            </button>

            <button
              onClick={onGetStarted}
              style={{
                background: 'linear-gradient(135deg, #ff3344 0%, #b80018 100%)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: 8,
                padding: '9px 20px',
                color: '#fff',
                fontSize: 14.5,
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 4px 18px rgba(255, 51, 68, 0.45)',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 6px 22px rgba(255, 51, 68, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = '0 4px 18px rgba(255, 51, 68, 0.45)';
              }}
            >
              <span>Enter Lab</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Showcase Section - Centered, Spacious & Clean for Laptops */}
      <section style={{ position: 'relative', zIndex: 1, padding: '64px 0 54px 0', textAlign: 'center' }}>
        <div className="landing-container" style={{ maxWidth: 1040, margin: '0 auto' }}>
          {/* Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '8px 20px',
              borderRadius: 30,
              background: 'rgba(255, 68, 68, 0.08)',
              border: '1px solid rgba(255, 68, 68, 0.28)',
              fontSize: 13,
              color: '#ff4444',
              fontWeight: 700,
              marginBottom: 24,
              letterSpacing: 1,
            }}
          >
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#ff4444', display: 'inline-block', animation: 'pulse-dot 1.5s infinite' }} />
            <span>🎓 VIRTUAL IOT & EMBEDDED SYSTEMS 3D LAB · FOR STUDENTS</span>
          </div>

          {/* Headline */}
          <h1
            style={{
              fontSize: 'clamp(34px, 4.4vw, 58px)',
              fontWeight: 800,
              lineHeight: 1.18,
              letterSpacing: '-0.8px',
              margin: '0 auto 22px auto',
              maxWidth: 900,
              background: 'linear-gradient(180deg, #ffffff 30%, #a4b3c6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Master IoT Components, Circuits & Microcontrollers in Immersive 3D
          </h1>

          {/* Informative Educational Paragraph */}
          <p
            style={{
              fontSize: 'clamp(16px, 1.35vw, 19px)',
              color: '#94a3b8',
              lineHeight: 1.75,
              margin: '0 auto 36px auto',
              maxWidth: 820,
            }}
          >
            Privid gives engineering students and IoT makers a hands-on virtual laboratory.
            Inspect <strong style={{ color: '#fff' }}>ESP32, Arduino Uno, individual sensors, actuators, and basic electronic parts</strong> with
            individual photorealistic 3D models, ultra-clear pinout callouts, exploded layer views, live simulated telemetry,
            and beginner wiring rules — without burning physical hardware.
          </p>

          {/* Primary Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, flexWrap: 'wrap', marginBottom: 44 }}>
            <button
              onClick={onGetStarted}
              style={{
                background: 'linear-gradient(135deg, #ff3344 0%, #b80018 100%)',
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.25)',
                borderRadius: 12,
                padding: '16px 36px',
                fontSize: 16.5,
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                boxShadow: '0 8px 30px rgba(255, 51, 68, 0.5)',
                minHeight: 54,
                transition: 'all 0.25s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 12px 38px rgba(255, 51, 68, 0.7)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(255, 51, 68, 0.5)';
              }}
            >
              <span>🚀 Enter Privid Lab</span>
              <span>→</span>
            </button>

            <button
              onClick={onOpenHelp}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.16)',
                borderRadius: 12,
                padding: '16px 28px',
                fontSize: 15.5,
                fontWeight: 600,
                color: '#e2e8f0',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                minHeight: 54,
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 68, 68, 0.4)';
                e.currentTarget.style.color = '#fff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.16)';
                e.currentTarget.style.color = '#e2e8f0';
              }}
            >
              <span>💬 Have Doubts? Ask Admin</span>
            </button>
          </div>

          {/* Student Trust Highlights */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14, textAlign: 'left' }}>
            {[
              { icon: '🔬', text: '38+ Real 3D Hardware Modules', sub: 'Individual 3D models for each part' },
              { icon: '🛡️', text: 'Zero Risk of Damaging Chips', sub: 'Learn without burning circuits' },
              { icon: '📊', text: 'Live Sensor Telemetry Sim', sub: 'Interactive simulated graphs' },
              { icon: '🎓', text: '100% Free For Engineering Students', sub: 'Built for practical lab courses' },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 12,
                  padding: '14px 16px',
                  background: 'rgba(15, 20, 30, 0.65)',
                  borderRadius: 10,
                  border: '1px solid rgba(255, 255, 255, 0.07)',
                }}
              >
                <span style={{ fontSize: 22, lineHeight: 1 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: 13.5, color: '#f1f5f9', fontWeight: 600 }}>{item.text}</div>
                  <div style={{ fontSize: 11.5, color: '#64748b', marginTop: 3 }}>{item.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Beginner Connection Rules Banner (from infographic) */}
      <section id="rules" style={{ padding: '36px 0', borderTop: '1px solid rgba(255, 255, 255, 0.06)', background: 'rgba(11, 15, 24, 0.5)' }}>
        <div className="landing-container">
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(255, 68, 68, 0.08) 0%, rgba(30, 41, 59, 0.6) 100%)',
              border: '1px solid rgba(255, 68, 68, 0.25)',
              borderRadius: 16,
              padding: '24px 28px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18, flexWrap: 'wrap' }}>
              <span style={{ background: '#ff3344', color: '#fff', fontSize: 12, fontWeight: 800, padding: '4px 10px', borderRadius: 4, letterSpacing: 0.5 }}>
                MUST-KNOW FOR STUDENTS
              </span>
              <h3 style={{ fontSize: 19, fontWeight: 800, color: '#fff', margin: 0 }}>
                ⚡ Beginner Connection Rules for IoT Circuits
              </h3>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
                gap: 14,
              }}
            >
              {[
                { num: '1', title: 'LED → Resistor Required', desc: 'Always use a current limiting resistor with LED (220Ω - 1kΩ) to prevent burning.', color: '#ff4444' },
                { num: '2', title: 'Polarized Parts → Check + / -', desc: 'Follow + and - markings for capacitors, buzzers and diodes. Reversing polarity blows parts.', color: '#4488ff' },
                { num: '3', title: 'Potentiometer → Middle is Wiper', desc: 'Middle pin is the wiper for variable voltage (0 - 3.3V) into ADC pins.', color: '#00cc88' },
                { num: '4', title: 'Push Button → Across Gap', desc: 'Place tactile push buttons across breadboard center gap to avoid shorting poles.', color: '#ffaa00' },
                { num: '5', title: 'Buzzer → Check Voltage & Polar', desc: 'Connect + to control pin and - to GND. Active buzzers need continuous DC voltage.', color: '#aa44ff' },
              ].map((rule) => (
                <div
                  key={rule.num}
                  style={{
                    background: 'rgba(7, 9, 14, 0.7)',
                    borderRadius: 10,
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    padding: '14px 16px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                    <span
                      style={{
                        width: 22,
                        height: 22,
                        borderRadius: '50%',
                        background: rule.color,
                        color: '#fff',
                        fontSize: 12,
                        fontWeight: 800,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {rule.num}
                    </span>
                    <span style={{ fontSize: 13.5, fontWeight: 700, color: '#fff' }}>{rule.title}</span>
                  </div>
                  <p style={{ fontSize: 12.5, color: '#94a3b8', lineHeight: 1.5, margin: 0 }}>{rule.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 1: "Why Students Choose Privid Lab" */}
      <section id="features" style={{ padding: '60px 0', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
        <div className="landing-container">
          <div style={{ textAlign: 'center', marginBottom: 44 }}>
            <span style={{ fontSize: 12.5, fontWeight: 700, color: '#ff4444', letterSpacing: 1.5, textTransform: 'uppercase' }}>
              BUILT FOR PRACTICAL ENGINEERING EDUCATION
            </span>
            <h2 style={{ fontSize: 'clamp(26px, 3vw, 38px)', fontWeight: 800, marginTop: 8, color: '#fff' }}>
              Why Students & Educators Choose Privid 3D Lab
            </h2>
            <p style={{ fontSize: 16, color: '#94a3b8', maxWidth: 640, margin: '12px auto 0 auto', lineHeight: 1.6 }}>
              Traditional breadboards break pins and burn chips. Privid brings every component to life with 3D tactile precision.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 24,
            }}
          >
            {[
              {
                icon: '🔬',
                title: 'Real-Time 3D Pinout Inspection',
                desc: 'Rotate, zoom, and explode IC chips, RF shields, and header pins to see exact multiplexed pinout functions (ADC, PWM, I2C, SPI, UART).',
                tag: 'Studio 3D',
              },
              {
                icon: '🛡️',
                title: '100% Risk-Free Circuit Learning',
                desc: 'Learn safely without blowing up expensive ESP32 microcontrollers, frying sensitive sensors, or short-circuiting Li-ion cells in university labs.',
                tag: 'Zero Hardware Burn',
              },
              {
                icon: '📈',
                title: 'Live Waveform & Sensor Telemetry',
                desc: 'Watch simulated live sensor data update in real-time. Understand temperature, humidity, gas ppm, and distance changes interactively.',
                tag: 'Real-Time Graphs',
              },
              {
                icon: '⚡',
                title: 'Industry Communication Protocols',
                desc: 'Master the backbone of IoT: UART, I2C, SPI, LoRa, BLE, and MQTT with interactive connection wiring diagrams and code snippets.',
                tag: 'Protocol Mastery',
              },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  background: 'linear-gradient(180deg, #121622 0%, #0b0e15 100%)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: 14,
                  padding: 26,
                  transition: 'all 0.25s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 68, 68, 0.4)';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.transform = 'none';
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <span style={{ fontSize: 32 }}>{item.icon}</span>
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      color: '#ff4444',
                      background: 'rgba(255, 68, 68, 0.1)',
                      border: '1px solid rgba(255, 68, 68, 0.25)',
                      padding: '4px 10px',
                      borderRadius: 20,
                    }}
                  >
                    {item.tag}
                  </span>
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 10 }}>{item.title}</h3>
                <p style={{ fontSize: 14.5, color: '#94a3b8', lineHeight: 1.65, margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2: "Explore The Laboratory Modules" */}
      <section id="modules" style={{ padding: '60px 0', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
        <div className="landing-container">
          <div style={{ textAlign: 'center', marginBottom: 44 }}>
            <span style={{ fontSize: 12.5, fontWeight: 700, color: '#ff4444', letterSpacing: 1.5, textTransform: 'uppercase' }}>
              COMPLETE INTERACTIVE CATALOG
            </span>
            <h2 style={{ fontSize: 'clamp(26px, 3vw, 38px)', fontWeight: 800, marginTop: 8, color: '#fff' }}>
              Explore The Laboratory Modules
            </h2>
            <p style={{ fontSize: 16, color: '#94a3b8', maxWidth: 640, margin: '12px auto 0 auto', lineHeight: 1.6 }}>
              Click any module below to dive directly into detailed 3D models, pinout references, wiring tables, and example code.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 20,
            }}
          >
            {[
              {
                id: 'sensors',
                icon: '📡',
                title: 'Sensors Laboratory',
                count: '38+ Sensors',
                desc: 'Environmental (DHT11/22, BMP280, BME680), Motion (HC-SR04, PIR, MPU6050), Gas & Optical sensors with real-time waveform telemetry.',
                color: '#44aaff',
              },
              {
                id: 'boards',
                icon: '🖥️',
                title: 'Development Boards',
                count: 'MCU & SBCs',
                desc: 'ESP32 NodeMCU, Arduino Uno R3, Raspberry Pi 4B, and Pi Pico with interactive 38-pin pinout explorer and specs comparison.',
                color: '#00ff88',
              },
              {
                id: 'communication',
                icon: '📶',
                title: 'Communication & Protocols',
                count: 'Protocols & Cloud',
                desc: 'Hardware buses (UART, I2C, SPI) alongside wireless technologies (Wi-Fi, BLE, LoRa, Zigbee) and cloud brokers (MQTT, HTTP).',
                color: '#ff8844',
              },
              {
                id: 'actuators',
                icon: '🕹️',
                title: 'Actuators & Motors',
                count: 'Physical Output',
                desc: 'Micro Servos (SG90), DC Motors, Stepper Motors, 5V Relays, and Solenoids with transistor driver wiring guides.',
                color: '#aa44ff',
              },
              {
                id: 'displays',
                icon: '📺',
                title: 'Displays & Visual Output',
                count: 'Screen Modules',
                desc: 'SSD1306 0.96" OLED displays, 16×2 HD44780 LCD with I2C backpacks, 7-Segment displays, and RGB LED rings.',
                color: '#00ccff',
              },
              {
                id: 'power',
                icon: '🔋',
                title: 'Power & Battery Systems',
                count: 'Power Management',
                desc: 'Interactive Power Calculator (P=V×I), Li-ion 18650 cells, TP4056 chargers, LM2596 buck converters, and solar panels.',
                color: '#ffcc00',
              },
            ].map((cat) => (
              <div
                key={cat.id}
                onClick={() => onExploreCategory ? onExploreCategory(cat.id) : onGetStarted()}
                style={{
                  background: 'linear-gradient(180deg, #121622 0%, #0a0d14 100%)',
                  border: `1px solid ${cat.color}22`,
                  borderRadius: 14,
                  padding: 24,
                  cursor: 'pointer',
                  transition: 'all 0.25s',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${cat.color}66`;
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = `0 10px 30px ${cat.color}15`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = `${cat.color}22`;
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <span style={{ fontSize: 32 }}>{cat.icon}</span>
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 700,
                        color: cat.color,
                        background: `${cat.color}15`,
                        border: `1px solid ${cat.color}35`,
                        padding: '4px 10px',
                        borderRadius: 20,
                      }}
                    >
                      {cat.count}
                    </span>
                  </div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 8 }}>{cat.title}</h3>
                  <p style={{ fontSize: 14, color: '#94a3b8', lineHeight: 1.6, margin: '0 0 16px 0' }}>{cat.desc}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13.5, fontWeight: 700, color: cat.color }}>
                  <span>Open Module</span>
                  <span>→</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: "Student Learning Pathways" */}
      <section id="curriculum" style={{ padding: '60px 0', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
        <div className="landing-container">
          <div style={{ textAlign: 'center', marginBottom: 44 }}>
            <span style={{ fontSize: 12.5, fontWeight: 700, color: '#ff4444', letterSpacing: 1.5, textTransform: 'uppercase' }}>
              STEP-BY-STEP SYLLABUS
            </span>
            <h2 style={{ fontSize: 'clamp(26px, 3vw, 38px)', fontWeight: 800, marginTop: 8, color: '#fff' }}>
              3-Stage Student Learning Roadmap
            </h2>
            <p style={{ fontSize: 16, color: '#94a3b8', maxWidth: 640, margin: '12px auto 0 auto', lineHeight: 1.6 }}>
              Whether you are in first year of engineering or completing your final year IoT capstone, Privid guides your journey.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
              gap: 24,
            }}
          >
            {[
              {
                level: '🟢 Stage 1: Beginner',
                badge: 'Electronics & Basics',
                color: '#00ff88',
                topics: [
                  "Ohm's Law (V = I × R) & Power Calculator",
                  'Analog (0-4095 ADC) vs Digital (HIGH/LOW) Signals',
                  'Basic components: Resistors, LEDs, Capacitors, Buttons',
                  'ESP32 Pinout Anatomy & Safe Power Voltages (3.3V vs 5V)',
                ],
              },
              {
                level: '🟡 Stage 2: Intermediate',
                badge: 'Sensors & Actuators',
                color: '#ffcc00',
                topics: [
                  'Interfacing I2C (SDA/SCL) Sensors: BMP280, OLED',
                  'PWM Motor Speed Control & Servo SG90 angles',
                  'Relay Switching with optocoupler isolation',
                  'Level shifting 5V outputs to safe 3.3V GPIO inputs',
                ],
              },
              {
                level: '🔴 Stage 3: Advanced',
                badge: 'Cloud & Telemetry',
                color: '#ff4444',
                topics: [
                  'Wi-Fi HTTP Web Servers & REST APIs',
                  'MQTT Publish/Subscribe architecture with brokers',
                  'Long-Range LoRa point-to-point wireless transmission',
                  'Low-power Deep Sleep modes for battery-powered nodes',
                ],
              },
            ].map((path, i) => (
              <div
                key={i}
                style={{
                  background: 'linear-gradient(180deg, #131722 0%, #0a0d13 100%)',
                  borderRadius: 14,
                  border: `1px solid ${path.color}33`,
                  padding: 26,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                  <span style={{ fontSize: 16, fontWeight: 700, color: path.color }}>{path.level}</span>
                  <span
                    style={{
                      fontSize: 11.5,
                      fontWeight: 700,
                      color: path.color,
                      background: `${path.color}15`,
                      border: `1px solid ${path.color}35`,
                      padding: '3px 8px',
                      borderRadius: 12,
                    }}
                  >
                    {path.badge}
                  </span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 16 }}>
                  {path.topics.map((t, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 14, color: '#cbd5e1' }}>
                      <span style={{ color: path.color, fontWeight: 700 }}>✓</span>
                      <span style={{ lineHeight: 1.5 }}>{t}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Student Doubt Desk & Mentorship */}
      <section style={{ padding: '60px 0', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
        <div className="landing-container">
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(255, 68, 68, 0.12) 0%, rgba(18, 22, 34, 0.9) 100%)',
              border: '1px solid rgba(255, 68, 68, 0.35)',
              borderRadius: 18,
              padding: '40px clamp(20px, 4vw, 56px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 24,
            }}
          >
            <div style={{ maxWidth: 650 }}>
              <span
                style={{
                  fontFamily: 'Orbitron, monospace',
                  fontSize: 12,
                  fontWeight: 700,
                  color: '#ff4444',
                  letterSpacing: 1.5,
                  textTransform: 'uppercase',
                }}
              >
                STUDENT SUPPORT & ADMIN DESK
              </span>
              <h2 style={{ fontSize: 'clamp(24px, 2.5vw, 34px)', fontWeight: 800, color: '#fff', margin: '8px 0 12px 0' }}>
                Have Doubts in Your Circuit or IoT Project?
              </h2>
              <p style={{ fontSize: 15.5, color: '#cbd5e1', lineHeight: 1.65, margin: 0 }}>
                Whether you have an issue with ESP32 pinouts, breadboard connections, or software code, submit your query directly to the lab admin or instructor for guidance.
              </p>
            </div>

            <button
              onClick={onOpenHelp}
              style={{
                background: 'linear-gradient(135deg, #ff3344 0%, #b80018 100%)',
                border: '1px solid rgba(255,255,255,0.25)',
                borderRadius: 10,
                padding: '16px 32px',
                fontSize: 16,
                fontWeight: 700,
                color: '#fff',
                cursor: 'pointer',
                boxShadow: '0 8px 25px rgba(255, 51, 68, 0.45)',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                whiteSpace: 'nowrap',
              }}
            >
              <span>💬 Ask Admin Now</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          background: '#05070a',
          padding: '40px 0',
        }}
      >
        <div
          className="landing-container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 20,
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <PrividLogo height={32} showTagline={false} />
              <span style={{ fontSize: 14, color: '#94a3b8' }}>Interactive IoT 3D Lab</span>
            </div>
            <div style={{ fontSize: 13.5, color: '#64748b' }}>
              Engineered for electronics & embedded systems students worldwide.
            </div>
          </div>

          <div style={{ display: 'flex', gap: 20, fontSize: 14, color: '#94a3b8' }}>
            <button
              onClick={onGetStarted}
              style={{ background: 'none', border: 'none', color: '#ff4444', fontWeight: 600, cursor: 'pointer', fontSize: 14 }}
            >
              Launch Virtual Lab →
            </button>
            <button
              onClick={onOpenHelp}
              style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: 14 }}
            >
              Contact Admin
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

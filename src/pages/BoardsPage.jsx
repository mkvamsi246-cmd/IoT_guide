import React, { useState } from 'react';
import { developmentBoards } from '../data/components';
import ComponentDetailModal from '../components/ComponentDetailModal';
import ComponentThumb from '../components/ComponentThumb';

const SUBCATS = ['All', 'Beginner Boards', 'ESP Family', 'Raspberry Pi Family'];

export default function BoardsPage() {
  const [selected, setSelected] = useState(null);
  const [sub, setSub] = useState('All');
  const [expandedPin, setExpandedPin] = useState(null);

  const filtered = sub === 'All' ? developmentBoards : developmentBoards.filter(b => b.subcategory === sub);

  function InfoRow({ label, value }) {
    return (
      <div style={{ display: 'flex', gap: 12, padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.06)', alignItems: 'flex-start' }}>
        <span style={{ width: 120, flexShrink: 0, fontSize: 13.5, color: '#777', paddingTop: 1 }}>{label}</span>
        <span style={{ fontSize: 14, color: '#ccc', fontFamily: 'JetBrains Mono, monospace', flex: 1 }}>{value}</span>
      </div>
    );
  }

  function BoardCard({ board }) {
    const isExpanded = expandedPin === board.id;
    return (
      <div style={{ background: '#141414', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, overflow: 'hidden', transition: 'all 0.3s' }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,34,34,0.3)'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 0 24px rgba(255,34,34,0.15)'; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}>

        {/* 3D Preview Badge */}
        <div style={{ height: 160, position: 'relative' }}>
          <ComponentThumb componentId={board.id} color={board.color} height={160} />
          <div style={{ position: 'absolute', top: 10, right: 10, padding: '4px 12px', background: 'rgba(0,0,0,0.75)', borderRadius: 20, fontSize: 12.5, color: '#aaa', border: '1px solid rgba(255,255,255,0.12)' }}>
            {board.subcategory}
          </div>
        </div>

        <div style={{ padding: 20 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 16 }}>
            <div>
              <h3 style={{ fontFamily: 'Orbitron, monospace', fontSize: 17, fontWeight: 700, marginBottom: 6 }}>{board.name}</h3>
              <p style={{ fontSize: 14, color: '#999', lineHeight: 1.55 }}>{board.description}</p>
            </div>
          </div>

          {/* Key Specs */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 16 }}>
            {[
              { l: '⚡ Processor', v: board.processor?.split(' ')[0] + '...' || 'N/A' },
              { l: '📌 GPIO Pins', v: board.gpioCount || 'N/A' },
              { l: '📶 Wi-Fi', v: board.wifi ? '✅ Yes' : '❌ No' },
              { l: '🔵 Bluetooth', v: board.bluetooth ? '✅ Yes' : '❌ No' },
              { l: '⚡ Voltage', v: board.voltage || 'N/A' },
              { l: '💾 Flash', v: board.flash || board.ram || 'N/A' },
            ].map(({ l, v }) => (
              <div key={l} style={{ background: '#0d0d0d', borderRadius: 8, padding: '9px 12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ fontSize: 12.5, color: '#666', marginBottom: 3 }}>{l}</div>
                <div style={{ fontSize: 13.5, color: '#ccc', fontFamily: 'JetBrains Mono, monospace', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{v}</div>
              </div>
            ))}
          </div>

          {/* Projects */}
          {board.projects && (
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 13, color: '#777', marginBottom: 8 }}>Common Projects</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {board.projects.map((p, i) => (
                  <span key={i} style={{ padding: '4px 10px', background: 'rgba(255,34,34,0.06)', border: '1px solid rgba(255,34,34,0.2)', borderRadius: 20, fontSize: 12.5, color: '#ff4444' }}>{p}</span>
                ))}
              </div>
            </div>
          )}

          {/* Pinout Explorer */}
          {board.pinout && (
            <div>
              <button onClick={() => setExpandedPin(isExpanded ? null : board.id)}
                style={{ width: '100%', padding: '10px 14px', minHeight: 40, background: 'rgba(255,34,34,0.08)', border: '1px solid rgba(255,34,34,0.25)', borderRadius: 8, color: '#ff4444', fontSize: 13.5, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                {isExpanded ? '▲' : '▼'} Pin Explorer
              </button>
              {isExpanded && (
                <div style={{ marginTop: 12, background: '#0d0d0d', borderRadius: 8, padding: 14, border: '1px solid rgba(255,255,255,0.06)' }}>
                  {Object.entries(board.pinout).map(([group, pins]) => (
                    <div key={group} style={{ marginBottom: 12 }}>
                      <div style={{ fontSize: 12, color: '#777', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8, fontWeight: 600 }}>{group}</div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                        {pins.map((pin, i) => (
                          <span key={i} style={{ padding: '3px 10px', background: '#141414', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 4, fontSize: 12.5, color: '#aaa', fontFamily: 'JetBrains Mono, monospace' }}>{pin}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          <button onClick={() => setSelected(board)}
            style={{ width: '100%', marginTop: 14, padding: '10px 16px', minHeight: 42, background: 'linear-gradient(135deg, #cc0000, #ff2222)', border: 'none', borderRadius: 8, color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif', letterSpacing: 0.5 }}>
            View Full Details + 3D
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="hero-section">
        <div className="hero-grid" />
        <div className="hero-glow hero-glow-1" style={{ background: 'radial-gradient(circle, rgba(0,200,100,0.1) 0%, transparent 70%)' }} />
        <div className="hero-content">
          <div className="hero-label" style={{ color: '#00ff88', borderColor: 'rgba(0,255,136,0.3)' }}>🖥️ Development Boards</div>
          <h1 className="hero-title" style={{ background: 'linear-gradient(135deg, #fff, #00ff88)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Boards Lab</h1>
          <p style={{ color: '#ccc', fontSize: 16, maxWidth: 580, lineHeight: 1.6 }}>
            Explore microcontroller and single-board computers from Arduino to ESP32, Raspberry Pi, and advanced IoT modules with interactive pin explorers.
          </p>
        </div>
      </div>

      <div className="page-container">
        <div className="filter-bar">
          {SUBCATS.map(s => (
            <button key={s} onClick={() => setSub(s)} className={`filter-btn ${sub === s ? 'active' : ''}`}>{s}</button>
          ))}
        </div>

        <div className="grid-3">
          {filtered.map(board => <BoardCard key={board.id} board={board} />)}
        </div>
      </div>

      {selected && <ComponentDetailModal component={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

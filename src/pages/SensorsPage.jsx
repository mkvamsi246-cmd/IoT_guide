import React, { useState } from 'react';
import { sensors } from '../data/components';
import ComponentDetailModal from '../components/ComponentDetailModal';
import ComponentThumb from '../components/ComponentThumb';

const CATEGORIES = [
  { id: 'all', label: 'All Sensors' },
  { id: 'Basic', label: '🔵 Basic' },
  { id: 'Environmental', label: '🌿 Environmental' },
  { id: 'Motion & Position', label: '🎯 Motion' },
  { id: 'Advanced', label: '🚀 Advanced' },
];

const LEVEL_COLORS = { beginner: '#00ff88', intermediate: '#ffcc00', advanced: '#ff4444' };

function SensorCard({ sensor, onClick }) {
  const lc = LEVEL_COLORS[sensor.level] || '#888';
  return (
    <div className="component-card" onClick={() => onClick(sensor)}>
      <div className="component-card-header">
        <div className="component-3d-preview">
          <ComponentThumb componentId={sensor.id} color={sensor.color} height={70} />
        </div>
        <div className="component-info">
          <div className="component-name">{sensor.name}</div>
          <div className="component-category">{sensor.subcategory}</div>
          <div className="component-meta">
            <span className="tag" style={{ background: `${lc}15`, color: lc, border: `1px solid ${lc}30`, fontSize: 12 }}>{sensor.level}</span>
            <span className="tag tag-blue">{sensor.protocol}</span>
          </div>
        </div>
      </div>
      <p className="component-description">{sensor.description}</p>
      <div className="component-card-footer">
        <span className="component-protocol">Measures: {sensor.measures}</span>
        <span className="component-voltage">{sensor.voltage}</span>
      </div>
    </div>
  );
}

export default function SensorsPage() {
  const [selected, setSelected] = useState(null);
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [level, setLevel] = useState('all');

  const filtered = sensors.filter(s => {
    const matchCat = category === 'all' || s.subcategory === category;
    const matchLevel = level === 'all' || s.level === level;
    const matchSearch = !search || s.name.toLowerCase().includes(search.toLowerCase()) || s.measures?.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchLevel && matchSearch;
  });

  return (
    <div>
      <div className="hero-section">
        <div className="hero-grid" />
        <div className="hero-glow hero-glow-1" style={{ background: 'radial-gradient(circle, rgba(68,136,255,0.12) 0%, transparent 70%)' }} />
        <div className="hero-content">
          <div className="hero-label" style={{ color: '#44aaff', borderColor: 'rgba(68,136,255,0.3)' }}>📡 Sensor Laboratory</div>
          <h1 className="hero-title" style={{ background: 'linear-gradient(135deg, #fff, #44aaff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Sensors Lab
          </h1>
          <p style={{ color: '#ccc', fontSize: 16, maxWidth: 580, lineHeight: 1.6 }}>
            Explore {sensors.length} IoT sensors with 3D models, live simulated readings, ESP32 wiring diagrams, and example code. From basic LDR to advanced GPS.
          </p>
          <div className="hero-stats" style={{ marginTop: 24 }}>
            {[
              { v: sensors.filter(s => s.subcategory === 'Basic').length, l: 'Basic' },
              { v: sensors.filter(s => s.subcategory === 'Environmental').length, l: 'Environmental' },
              { v: sensors.filter(s => s.subcategory === 'Motion & Position').length, l: 'Motion' },
              { v: sensors.filter(s => s.subcategory === 'Advanced').length, l: 'Advanced' },
            ].map((stat, i) => (
              <div className="hero-stat" key={i}>
                <span className="hero-stat-value" style={{ color: '#44aaff', textShadow: '0 0 16px rgba(68,136,255,0.4)', fontSize: 24 }}>{stat.v}</span>
                <div className="hero-stat-label" style={{ fontSize: 13 }}>{stat.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="page-container">
        {/* Filters */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 200, position: 'relative' }}>
            <svg style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#666' }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search sensors..."
              style={{ width: '100%', background: '#141414', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '11px 14px 11px 42px', color: '#fff', fontSize: 14.5, outline: 'none', fontFamily: 'Inter, sans-serif' }} />
          </div>
          {['all', 'beginner', 'intermediate', 'advanced'].map(l => (
            <button key={l} onClick={() => setLevel(l)} className={`filter-btn ${level === l ? 'active' : ''}`} style={{ textTransform: 'capitalize' }}>{l}</button>
          ))}
        </div>
        <div className="filter-bar">
          {CATEGORIES.map(cat => (
            <button key={cat.id} onClick={() => setCategory(cat.id)} className={`filter-btn ${category === cat.id ? 'active' : ''}`}>{cat.label}</button>
          ))}
        </div>

        {/* Sensor Grid */}
        {CATEGORIES.filter(c => c.id !== 'all').map(cat => {
          const items = filtered.filter(s => s.subcategory === cat.id.replace('🔵 ', '').replace('🌿 ', '').replace('🎯 ', '').replace('🚀 ', ''));
          if (category !== 'all' && category !== cat.id.split(' ').slice(1).join(' ')) return null;
          const catFiltered = category === 'all' ? filtered.filter(s => s.subcategory === cat.id.split(' ').slice(1).join(' ') || (cat.id === 'Basic' && s.subcategory === 'Basic')) : filtered;

          return null; // Handled below
        })}

        <div className="grid-auto">
          {filtered.map(s => <SensorCard key={s.id} sensor={s} onClick={setSelected} />)}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: 60, color: '#555' }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>📡</div>
            <p>No sensors found.</p>
          </div>
        )}
      </div>

      {selected && <ComponentDetailModal component={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

import React, { useState, useEffect, useRef } from 'react';
import { allComponents, actuators, displays } from './data/components';
import ComponentThumb from './components/ComponentThumb';
import ThreeViewer from './components/ThreeViewer';
import PrividLogo from './components/PrividLogo';

// Pages
import DashboardPage from './pages/DashboardPage';
import IoTBasicsPage from './pages/IoTBasicsPage';
import SensorsPage from './pages/SensorsPage';
import BoardsPage from './pages/BoardsPage';
import CommunicationPage from './pages/CommunicationPage';
import ThreeLabPage from './pages/ThreeLabPage';
import SimulatorPage from './pages/SimulatorPage';
import CircuitBuilderPage from './pages/CircuitBuilderPage';
import ProjectsPage from './pages/ProjectsPage';
import GoldenRulesPage from './pages/GoldenRulesPage';
import ComponentDetailModal from './components/ComponentDetailModal';
import LandingPage from './pages/LandingPage';
import AdminHelpModal from './components/AdminHelpModal';

// Additional simple pages rendered inline
function ActuatorsPage({ onNavigate }) {
  const [selected, setSelected] = useState(null);

  return (
    <div>
      <div className="hero-section">
        <div className="hero-grid" />
        <div className="hero-content">
          <div className="hero-label" style={{ color: '#aa44ff', borderColor: 'rgba(170,68,255,0.3)' }}>⚙️ Actuators Lab</div>
          <h1 className="hero-title" style={{ background: 'linear-gradient(135deg, #fff, #aa44ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Actuators</h1>
          <p style={{ color: '#aaa', fontSize: 14 }}>Devices that convert electrical signals into physical movement or action.</p>
        </div>
      </div>
      <div className="page-container">
        <div className="grid-auto">
          {actuators.map(a => (
            <div key={a.id} style={{ background: '#141414', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, overflow: 'hidden', cursor: 'pointer', transition: 'all 0.3s' }}
              onClick={() => setSelected(a)}
              onMouseEnter={e => { e.currentTarget.style.borderColor = `${a.color}44`; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.transform = 'none'; }}>
              <div style={{ height: 120 }}>
                <ComponentThumb componentId={a.id} color={a.color} height={120} />
              </div>
              <div style={{ padding: 16 }}>
                <div style={{ fontWeight: 700, fontSize: 16, color: a.color, marginBottom: 6 }}>{a.name}</div>
                <p style={{ fontSize: 13.5, color: '#999', lineHeight: 1.6, marginBottom: 10 }}>{a.description}</p>
                <div style={{ display: 'flex', gap: 6 }}>
                  <span className="tag tag-gray">{a.protocol}</span>
                  <span className="tag tag-red">{a.voltage}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {selected && <ComponentDetailModal component={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

function DisplaysPage() {
  const [selected, setSelected] = useState(null);
  const [oledTick, setOledTick] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setOledTick(x => x + 1), 2000);
    return () => clearInterval(t);
  }, []);

  const oledData = {
    temp: (22 + Math.random() * 5).toFixed(1),
    hum: Math.round(55 + Math.random() * 20),
    time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
  };

  return (
    <div>
      <div className="hero-section">
        <div className="hero-grid" />
        <div className="hero-content">
          <div className="hero-label" style={{ color: '#00ccff', borderColor: 'rgba(0,204,255,0.3)' }}>🖥️ Displays Lab</div>
          <h1 className="hero-title" style={{ background: 'linear-gradient(135deg, #fff, #00ccff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Displays & Output</h1>
        </div>
      </div>
      <div className="page-container">
        <div className="grid-2" style={{ marginBottom: 24 }}>
          {/* Simulated OLED */}
          <div style={{ background: '#141414', border: '1px solid rgba(0,204,255,0.2)', borderRadius: 14, padding: 20 }}>
            <h3 style={{ fontFamily: 'Orbitron, monospace', fontSize: 15, color: '#00ccff', marginBottom: 16 }}>📺 Simulated OLED Display</h3>
            <div style={{ background: '#000633', border: '2px solid #00ccff44', borderRadius: 8, padding: '20px 24px', fontFamily: 'JetBrains Mono, monospace', boxShadow: '0 0 20px rgba(0,100,255,0.2)', maxWidth: 280, margin: '0 auto' }}>
              <div style={{ fontSize: 15, color: '#00ccff', marginBottom: 6, letterSpacing: 2 }}>PRIVID LAB</div>
              <div style={{ height: 1, background: '#00ccff33', marginBottom: 8 }} />
              <div style={{ fontSize: 13.5, color: '#4488ff', marginBottom: 4 }}>Temp: {(22 + oledTick % 3).toFixed(1)} °C</div>
              <div style={{ fontSize: 13.5, color: '#4488ff', marginBottom: 4 }}>Hum:  {55 + oledTick % 10} %</div>
              <div style={{ height: 1, background: '#00ccff22', margin: '8px 0' }} />
              <div style={{ fontSize: 12.5, color: '#2244aa' }}>{new Date().toLocaleTimeString('en-US', { hour12: false })}</div>
            </div>
          </div>

          {/* Simulated LCD */}
          <div style={{ background: '#141414', border: '1px solid rgba(0,255,136,0.2)', borderRadius: 14, padding: 20 }}>
            <h3 style={{ fontFamily: 'Orbitron, monospace', fontSize: 15, color: '#00ff88', marginBottom: 16 }}>📺 Simulated 16×2 LCD</h3>
            <div style={{ background: '#1a4a1a', border: '2px solid #00ff8844', borderRadius: 4, padding: '16px 20px', fontFamily: 'JetBrains Mono, monospace', maxWidth: 280, margin: '0 auto' }}>
              <div style={{ fontSize: 15, color: '#00ff88', letterSpacing: 2, marginBottom: 6 }}>Privid Lab 🌡️</div>
              <div style={{ fontSize: 15, color: '#00ff88', letterSpacing: 2 }}>T:{(22 + oledTick % 3).toFixed(0)}C H:{55 + oledTick % 10}%</div>
            </div>
          </div>
        </div>

        <div className="grid-auto">
          {displays.map(d => (
            <div key={d.id} style={{ background: '#141414', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, overflow: 'hidden', cursor: 'pointer', transition: 'all 0.3s' }}
              onClick={() => setSelected(d)}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,204,255,0.3)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.transform = 'none'; }}>
              <div style={{ height: 120 }}>
                <ComponentThumb componentId={d.id} color={d.color} height={120} />
              </div>
              <div style={{ padding: 16 }}>
                <div style={{ fontWeight: 700, fontSize: 16, color: '#00ccff', marginBottom: 6 }}>{d.name}</div>
                <div style={{ fontSize: 13, color: '#888', marginBottom: 6 }}>{d.protocol} · {d.resolution}</div>
                <p style={{ fontSize: 13.5, color: '#aaa', lineHeight: 1.6 }}>{d.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {selected && <ComponentDetailModal component={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

function PowerPage() {
  const [voltage, setVoltage] = useState(5);
  const [current, setCurrent] = useState(0.5);
  const power = (voltage * current).toFixed(2);

  return (
    <div>
      <div className="hero-section">
        <div className="hero-grid" />
        <div className="hero-content">
          <div className="hero-label" style={{ color: '#ff8844', borderColor: 'rgba(255,136,68,0.3)' }}>🔋 Power & Energy</div>
          <h1 className="hero-title" style={{ background: 'linear-gradient(135deg, #fff, #ff8844)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Power Lab</h1>
        </div>
      </div>
      <div className="page-container">
        <div className="grid-2">
          {/* Power Calculator */}
          <div>
            <h2 className="section-title">⚡ Power Calculator</h2>
            <div style={{ background: '#141414', border: '1px solid rgba(255,136,68,0.2)', borderRadius: 16, padding: 24 }}>
              <div className="slider-control" style={{ marginBottom: 20 }}>
                <div className="slider-label">
                  <span style={{ fontSize: 14.5 }}>Voltage (V)</span>
                  <span className="slider-value" style={{ fontSize: 15 }}>{voltage}V</span>
                </div>
                <input type="range" min="1" max="24" step="0.1" value={voltage} onChange={e => setVoltage(parseFloat(e.target.value))} />
              </div>
              <div className="slider-control" style={{ marginBottom: 24 }}>
                <div className="slider-label">
                  <span style={{ fontSize: 14.5 }}>Current (A)</span>
                  <span className="slider-value" style={{ fontSize: 15 }}>{current}A ({(current * 1000).toFixed(0)}mA)</span>
                </div>
                <input type="range" min="0.01" max="5" step="0.01" value={current} onChange={e => setCurrent(parseFloat(e.target.value))} />
              </div>
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 16 }}>
                <div style={{ fontSize: 13.5, color: '#777', marginBottom: 8 }}>P = V × I</div>
                <div style={{ fontFamily: 'Orbitron, monospace', fontSize: 38, fontWeight: 700, color: '#ff8844', textShadow: '0 0 20px rgba(255,136,68,0.4)' }}>
                  {power} W
                </div>
                <div style={{ fontSize: 13.5, color: '#888', marginTop: 6 }}>{voltage}V × {current}A = {power}W</div>
              </div>
              <div style={{ marginTop: 20, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 10 }}>
                {[
                  { l: 'ESP32 (typical)', v: '3.3V × 0.24A = 0.8W' },
                  { l: 'SG90 Servo', v: '5V × 0.15A = 0.75W' },
                  { l: 'DC Motor', v: '12V × 0.5A = 6W' },
                  { l: 'Relay Coil', v: '5V × 0.08A = 0.4W' },
                ].map(({ l, v }) => (
                  <div key={l} style={{ background: '#0d0d0d', borderRadius: 8, padding: '10px 12px', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div style={{ fontSize: 12.5, color: '#777', marginBottom: 3 }}>{l}</div>
                    <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, color: '#bbb' }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Power Modules */}
          <div>
            <h2 className="section-title">🔋 Power Components</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { name: 'Li-ion 18650 Cell', icon: '🔋', v: '3.7V nominal', cap: '1800–3500mAh', tip: 'Most popular rechargeable cell for IoT projects' },
                { name: 'LiPo Battery', icon: '🔋', v: '3.7V / 7.4V', cap: 'Flexible capacity', tip: 'Lightweight, flexible shape – ideal for wearables' },
                { name: 'TP4056 Charger', icon: '⚡', v: 'Input: 5V, Output: 4.2V', cap: '1A max charge', tip: 'USB Li-ion charger IC. Add protection board for safety!' },
                { name: 'Buck Converter', icon: '📉', v: 'Input: 4–40V, Output: adjustable', cap: 'Up to 5A', tip: 'Step-down switching regulator. Efficient: >90%' },
                { name: 'Boost Converter', icon: '📈', v: 'Input: 2–24V, Output: higher', cap: 'Up to 3A', tip: 'Step-up switching regulator. Used for LED drivers' },
                { name: 'Solar Panel', icon: '☀️', v: '5V–18V (varies)', cap: '100mW–10W', tip: 'Add TP4056 + Li-ion for solar-powered IoT nodes' },
              ].map((m, i) => (
                <div key={i} style={{ background: '#141414', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 10, padding: '14px 18px', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 26 }}>{m.icon}</span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15, color: '#ff8844', marginBottom: 4 }}>{m.name}</div>
                    <div style={{ fontSize: 13, color: '#888', marginBottom: 4, fontFamily: 'JetBrains Mono, monospace' }}>{m.v} · {m.cap}</div>
                    <div style={{ fontSize: 13.5, color: '#aaa', lineHeight: 1.5 }}>{m.tip}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Navigation config (simulator, circuit, projects temporarily removed as requested)
const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: '🏠', section: 'main' },
  { id: 'basics', label: 'IoT Basics', icon: '🟢', section: 'learn', badge: 'START' },
  { id: 'sensors', label: 'Sensors Lab', icon: '📡', section: 'learn' },
  { id: 'boards', label: 'Dev Boards', icon: '🖥️', section: 'learn' },
  { id: 'communication', label: 'Communication', icon: '📶', section: 'learn' },
  { id: 'actuators', label: 'Actuators', icon: '⚙️', section: 'learn' },
  { id: 'displays', label: 'Displays', icon: '🖥️', section: 'learn' },
  { id: 'power', label: 'Power & Energy', icon: '🔋', section: 'learn' },
  { id: '3dlab', label: '3D Component Lab', icon: '🔬', section: 'tools', badge: 'NEW' },
  { id: 'golden', label: 'Golden Rules', icon: '⚡', section: 'tools' },
  { id: 'help', label: 'Ask Admin / Help', icon: '🆘', section: 'support', isHelp: true },
];

const SECTIONS = {
  main: 'MAIN',
  learn: 'LEARN',
  tools: 'TOOLS & LABS',
  support: 'SUPPORT & DOUBTS',
};

export default function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [activePage, setActivePage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [searchModal, setSearchModal] = useState(null);
  const searchRef = useRef();

  const navigate = (page) => {
    if (page === 'help') {
      setShowHelpModal(true);
      return;
    }
    setActivePage(page);
    setMobileOpen(false);
    window.scrollTo(0, 0);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.length < 2) { setSearchResults([]); setShowSearch(false); return; }
    const results = allComponents.filter(c =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.description?.toLowerCase().includes(query.toLowerCase()) ||
      c.category?.toLowerCase().includes(query.toLowerCase()) ||
      c.protocol?.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 8);
    setSearchResults(results);
    setShowSearch(true);
  };

  useEffect(() => {
    const handleClick = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSearch(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard': return <DashboardPage onNavigate={navigate} />;
      case 'basics': return <IoTBasicsPage />;
      case 'sensors': return <SensorsPage />;
      case 'boards': return <BoardsPage />;
      case 'communication': return <CommunicationPage />;
      case 'actuators': return <ActuatorsPage onNavigate={navigate} />;
      case 'displays': return <DisplaysPage />;
      case 'power': return <PowerPage />;
      case '3dlab': return <ThreeLabPage />;
      case 'simulator': return <SimulatorPage />;
      case 'circuit': return <CircuitBuilderPage />;
      case 'projects': return <ProjectsPage />;
      case 'golden': return <GoldenRulesPage />;
      default: return <DashboardPage onNavigate={navigate} />;
    }
  };

  const groupedNav = Object.entries(SECTIONS).map(([key, label]) => ({
    label,
    items: NAV_ITEMS.filter(n => n.section === key),
  }));

  if (!hasStarted) {
    return (
      <>
        <LandingPage
          onGetStarted={() => {
            setHasStarted(true);
            window.scrollTo(0, 0);
          }}
          onExploreCategory={(cat) => {
            setHasStarted(true);
            setActivePage(cat);
            window.scrollTo(0, 0);
          }}
          onOpenHelp={() => setShowHelpModal(true)}
        />
        <AdminHelpModal isOpen={showHelpModal} onClose={() => setShowHelpModal(false)} />
      </>
    );
  }

  return (
    <div className="app-layout">
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 999 }} onClick={() => setMobileOpen(false)} />
      )}

      {/* Sidebar */}
      <nav className={`sidebar ${!sidebarOpen ? 'hidden' : ''} ${mobileOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-logo" style={{ padding: '16px 14px 14px 14px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <PrividLogo height={32} showTagline={true} />
        </div>

        <nav className="sidebar-nav">
          {groupedNav.map(group => (
            <div key={group.label} className="nav-section">
              <div className="nav-section-label">{group.label}</div>
              {group.items.map(item => (
                <div key={item.id} className={`nav-item ${activePage === item.id ? 'active' : ''}`} onClick={() => navigate(item.id)}>
                  <span className="nav-item-icon">{item.icon}</span>
                  <span>{item.label}</span>
                  {item.badge && <span className="nav-item-badge">{item.badge}</span>}
                </div>
              ))}
            </div>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div style={{ marginBottom: 4, color: '#ff4444', fontFamily: 'Orbitron, monospace', fontSize: 12.5, fontWeight: 700 }}>PRIVID v2.0</div>
          <div style={{ fontSize: 12, color: '#888' }}>Interactive IoT 3D Lab 🔬</div>
        </div>
      </nav>

      {/* Mobile Backdrop */}
      {mobileOpen && <div className="sidebar-backdrop" onClick={() => setMobileOpen(false)} />}

      {/* Main Content */}
      <main className={`main-content ${!sidebarOpen ? 'sidebar-collapsed' : ''}`}>
        {/* Topbar */}
        <header className="topbar">
          <button className="topbar-toggle" onClick={() => { setSidebarOpen(s => !s); setMobileOpen(m => !m); }} aria-label="Toggle sidebar">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>

          {/* Search */}
          <div className="topbar-search" ref={searchRef}>
            <svg className="topbar-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
            <input
              placeholder="Search components, sensors, boards..."
              value={searchQuery}
              onChange={e => handleSearch(e.target.value)}
              onFocus={() => searchQuery.length >= 2 && setShowSearch(true)}
              style={{ fontSize: 14.5 }}
            />
            {showSearch && searchResults.length > 0 && (
              <div className="search-results">
                {searchResults.map(comp => (
                  <div key={comp.id} className="search-result-item" onClick={() => { setSearchModal(comp); setShowSearch(false); setSearchQuery(''); }}>
                    <div style={{ width: 36, height: 36, borderRadius: 8, background: `${comp.color || '#ff4444'}15`, border: `1px solid ${comp.color || '#ff4444'}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>
                      📡
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 14.5, fontWeight: 600, color: '#fff' }}>{comp.name}</div>
                      <div style={{ fontSize: 12.5, color: '#777' }}>{comp.category} · {comp.level}</div>
                    </div>
                    <div style={{ fontSize: 12.5, color: comp.color || '#ff4444', fontFamily: 'JetBrains Mono' }}>{comp.voltage}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="topbar-right">
            {/* Ask Admin Help Button */}
            <button
              onClick={() => setShowHelpModal(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '7px 14px',
                minHeight: 38,
                background: 'rgba(255, 68, 68, 0.14)',
                border: '1px solid rgba(255, 68, 68, 0.4)',
                borderRadius: 20,
                color: '#ff4444',
                fontSize: 13.5,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              <span style={{ fontSize: 15 }}>💬</span>
              <span>Ask Admin</span>
            </button>

            {/* Back to Welcome */}
            <button
              onClick={() => setHasStarted(false)}
              title="Return to Welcome Landing Page"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 5,
                padding: '7px 12px',
                minHeight: 38,
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: 20,
                color: '#ccc',
                fontSize: 13,
                cursor: 'pointer',
              }}
            >
              <span style={{ fontSize: 14 }}>🏠</span>
              <span>Welcome</span>
            </button>

            {/* Current Level */}
            <div className="level-badge beginner" style={{ fontSize: 12.5, minHeight: 32, padding: '4px 12px' }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'currentColor', display: 'block' }} />
              Beginner
            </div>

            {/* Live indicator */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12.5, fontWeight: 600, color: '#00ff88', padding: '6px 12px', background: 'rgba(0,255,136,0.08)', border: '1px solid rgba(0,255,136,0.2)', borderRadius: 20 }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#00ff88', display: 'block', animation: 'pulse-dot 1.5s infinite' }} />
              LIVE
            </div>
          </div>
        </header>

        {/* Page Content */}
        {renderPage()}
      </main>

      {/* Search Result Modal */}
      {searchModal && <ComponentDetailModal component={searchModal} onClose={() => setSearchModal(null)} />}

      {/* Admin Help Modal */}
      <AdminHelpModal isOpen={showHelpModal} onClose={() => setShowHelpModal(false)} />
    </div>
  );
}

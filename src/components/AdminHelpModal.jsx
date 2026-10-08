import React, { useState, useEffect } from 'react';

export default function AdminHelpModal({ isOpen, onClose }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('Doubt / Question');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [priority, setPriority] = useState('Normal');
  const [submittedTicket, setSubmittedTicket] = useState(null);
  const [pastTickets, setPastTickets] = useState([]);
  const [activeTab, setActiveTab] = useState('new'); // 'new' | 'history'

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('privid_admin_tickets') || '[]');
      setPastTickets(saved);
    } catch {}
  }, [submittedTicket]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) return;

    const ticketId = `PRV-${Math.floor(10000 + Math.random() * 90000)}`;
    const newTicket = {
      id: ticketId,
      name,
      email,
      category,
      subject,
      message,
      priority,
      status: 'Submitted · Pending Admin Review',
      date: new Date().toLocaleString(),
    };

    try {
      const updated = [newTicket, ...pastTickets];
      localStorage.setItem('privid_admin_tickets', JSON.stringify(updated));
      setPastTickets(updated);
    } catch {}

    setSubmittedTicket(newTicket);
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
    setSubmittedTicket(null);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(5, 7, 12, 0.85)',
        backdropFilter: 'blur(10px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 620,
          background: 'linear-gradient(180deg, #161a24 0%, #0d1017 100%)',
          border: '1px solid rgba(255, 68, 68, 0.35)',
          borderRadius: 18,
          boxShadow: '0 20px 60px rgba(0,0,0,0.8), 0 0 30px rgba(255, 68, 68, 0.15)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '90vh',
        }}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'rgba(255, 68, 68, 0.05)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                background: 'rgba(255, 68, 68, 0.15)',
                border: '1px solid rgba(255, 68, 68, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 20,
              }}
            >
              🆘
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: 19, fontWeight: 700, color: '#fff', letterSpacing: 0.5 }}>
                Privid Helpdesk & Admin Support
              </h2>
              <div style={{ fontSize: 13.5, color: '#aaa', marginTop: 3 }}>
                Submit any issues, component doubts, or questions to the administrator
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: '#aaa',
              cursor: 'pointer',
              fontSize: 22,
              padding: 6,
            }}
          >
            ✕
          </button>
        </div>

        {/* Tab switchers if past tickets exist */}
        {pastTickets.length > 0 && (
          <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '0 24px' }}>
            <button
              onClick={() => { setActiveTab('new'); setSubmittedTicket(null); }}
              style={{
                padding: '14px 18px',
                border: 'none',
                background: 'none',
                cursor: 'pointer',
                fontSize: 14,
                fontWeight: 600,
                color: activeTab === 'new' ? '#ff4444' : '#888',
                borderBottom: `2px solid ${activeTab === 'new' ? '#ff4444' : 'transparent'}`,
              }}
            >
              ✍️ New Doubt / Issue
            </button>
            <button
              onClick={() => setActiveTab('history')}
              style={{
                padding: '14px 18px',
                border: 'none',
                background: 'none',
                cursor: 'pointer',
                fontSize: 14,
                fontWeight: 600,
                color: activeTab === 'history' ? '#ff4444' : '#888',
                borderBottom: `2px solid ${activeTab === 'history' ? '#ff4444' : 'transparent'}`,
              }}
            >
              📋 My Submitted Tickets ({pastTickets.length})
            </button>
          </div>
        )}

        {/* Modal Body */}
        <div style={{ padding: '24px', overflowY: 'auto', flex: 1 }}>
          {submittedTicket ? (
            <div style={{ textAlign: 'center', padding: '24px 12px' }}>
              <div
                style={{
                  width: 68,
                  height: 68,
                  borderRadius: '50%',
                  background: 'rgba(0, 255, 136, 0.15)',
                  border: '2px solid #00ff88',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 32,
                  margin: '0 auto 16px auto',
                }}
              >
                ✅
              </div>
              <h3 style={{ fontSize: 22, color: '#fff', marginBottom: 8 }}>Doubt Submitted Successfully!</h3>
              <p style={{ color: '#ccc', fontSize: 15, maxWidth: 460, margin: '0 auto 22px auto', lineHeight: 1.6 }}>
                Your doubt has been registered and dispatched to the Privid Lab Admin team. A response will be sent to{' '}
                <strong style={{ color: '#00e5ff' }}>{submittedTicket.email}</strong>.
              </p>

              <div
                style={{
                  background: '#0d1017',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 12,
                  padding: 18,
                  maxWidth: 440,
                  margin: '0 auto 24px auto',
                  textAlign: 'left',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: 13, color: '#888' }}>Ticket ID:</span>
                  <span style={{ fontSize: 14, fontFamily: 'JetBrains Mono, monospace', color: '#ff4444', fontWeight: 700 }}>
                    #{submittedTicket.id}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: 13, color: '#888' }}>Category:</span>
                  <span style={{ fontSize: 13.5, color: '#ddd' }}>{submittedTicket.category}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: 13, color: '#888' }}>Subject:</span>
                  <span style={{ fontSize: 13.5, color: '#ddd' }}>{submittedTicket.subject}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 13, color: '#888' }}>Status:</span>
                  <span style={{ fontSize: 13, color: '#00ff88', fontWeight: 600 }}>● {submittedTicket.status}</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                <button
                  onClick={handleReset}
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    color: '#fff',
                    borderRadius: 10,
                    padding: '11px 22px',
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Submit Another Doubt
                </button>
                <button
                  onClick={onClose}
                  style={{
                    background: 'linear-gradient(135deg, #ff4444, #cc0000)',
                    border: 'none',
                    color: '#fff',
                    borderRadius: 10,
                    padding: '11px 28px',
                    fontSize: 14,
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Done
                </button>
              </div>
            </div>
          ) : activeTab === 'history' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {pastTickets.map((t) => (
                <div
                  key={t.id}
                  style={{
                    background: '#0d1017',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 12,
                    padding: 18,
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, flexWrap: 'wrap', gap: 6 }}>
                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13.5, color: '#ff4444', fontWeight: 700 }}>
                      #{t.id} · {t.category}
                    </span>
                    <span style={{ fontSize: 12, color: '#00ff88', background: 'rgba(0,255,136,0.12)', padding: '3px 10px', borderRadius: 4, fontWeight: 600 }}>
                      {t.status}
                    </span>
                  </div>
                  <div style={{ fontWeight: 700, fontSize: 15, color: '#fff', marginBottom: 6 }}>{t.subject}</div>
                  <div style={{ fontSize: 13.5, color: '#bbb', lineHeight: 1.5, marginBottom: 10 }}>{t.message}</div>
                  <div style={{ fontSize: 12, color: '#777' }}>Submitted: {t.date}</div>
                </div>
              ))}
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {/* Row 1: Name & Email */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: 16 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 14, color: '#ddd', marginBottom: 6, fontWeight: 600 }}>
                    Your Name / Student ID *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vamsi / CS-2024"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{
                      width: '100%',
                      background: '#0d1017',
                      border: '1px solid rgba(255,255,255,0.15)',
                      borderRadius: 10,
                      padding: '12px 16px',
                      color: '#fff',
                      fontSize: 14.5,
                      outline: 'none',
                      fontFamily: 'Inter, sans-serif',
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 14, color: '#ddd', marginBottom: 6, fontWeight: 600 }}>
                    Email Address (for response) *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. student@iot.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      width: '100%',
                      background: '#0d1017',
                      border: '1px solid rgba(255,255,255,0.15)',
                      borderRadius: 10,
                      padding: '12px 16px',
                      color: '#fff',
                      fontSize: 14.5,
                      outline: 'none',
                      fontFamily: 'Inter, sans-serif',
                    }}
                  />
                </div>
              </div>

              {/* Row 2: Category & Priority */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: 16 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 14, color: '#ddd', marginBottom: 6, fontWeight: 600 }}>
                    Issue / Doubt Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    style={{
                      width: '100%',
                      background: '#0d1017',
                      border: '1px solid rgba(255,255,255,0.15)',
                      borderRadius: 10,
                      padding: '12px 16px',
                      color: '#fff',
                      fontSize: 14.5,
                      outline: 'none',
                      fontFamily: 'Inter, sans-serif',
                    }}
                  >
                    <option value="Hardware Doubt">🔬 Hardware / Component Doubt</option>
                    <option value="Pinout & Wiring">🔌 Pinout & Wiring Question</option>
                    <option value="ESP32 Programming">⚡ ESP32 / Arduino Code Issue</option>
                    <option value="Communication Protocol">📶 MQTT / Protocol Question</option>
                    <option value="Bug / Error">🐛 Website Bug or Display Glitch</option>
                    <option value="Feature Request">💡 Suggest New Component / Idea</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 14, color: '#ddd', marginBottom: 6, fontWeight: 600 }}>
                    Priority
                  </label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    style={{
                      width: '100%',
                      background: '#0d1017',
                      border: '1px solid rgba(255,255,255,0.15)',
                      borderRadius: 10,
                      padding: '12px 16px',
                      color: '#fff',
                      fontSize: 14.5,
                      outline: 'none',
                      fontFamily: 'Inter, sans-serif',
                    }}
                  >
                    <option value="Normal">Normal Question</option>
                    <option value="Urgent">Urgent / Lab Project Due</option>
                  </select>
                </div>
              </div>

              {/* Subject */}
              <div>
                <label style={{ display: 'block', fontSize: 14, color: '#ddd', marginBottom: 6, fontWeight: 600 }}>
                  Subject / Summary *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Doubt regarding ESP32 GPIO12 strapping pin voltage"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  style={{
                    width: '100%',
                    background: '#0d1017',
                    border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: 10,
                    padding: '12px 16px',
                    color: '#fff',
                    fontSize: 14.5,
                    outline: 'none',
                    fontFamily: 'Inter, sans-serif',
                  }}
                />
              </div>

              {/* Message */}
              <div>
                <label style={{ display: 'block', fontSize: 14, color: '#ddd', marginBottom: 6, fontWeight: 600 }}>
                  Detailed Description *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe your question or the issue in detail. If asking about a component, mention its name (e.g. DHT11 pull-up resistor or HC-SR04 level shifting)..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  style={{
                    width: '100%',
                    background: '#0d1017',
                    border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: 10,
                    padding: '12px 16px',
                    color: '#fff',
                    fontSize: 14.5,
                    outline: 'none',
                    fontFamily: 'Inter, sans-serif',
                    resize: 'vertical',
                    lineHeight: 1.6,
                  }}
                />
              </div>

              {/* Submit Buttons */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 8 }}>
                <button
                  type="button"
                  onClick={onClose}
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.14)',
                    color: '#ccc',
                    borderRadius: 10,
                    padding: '12px 22px',
                    fontSize: 14.5,
                    fontWeight: 600,
                    cursor: 'pointer',
                    minHeight: 44,
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    background: 'linear-gradient(135deg, #ff4444 0%, #cc0000 100%)',
                    border: 'none',
                    color: '#fff',
                    borderRadius: 10,
                    padding: '12px 28px',
                    fontSize: 15,
                    fontWeight: 700,
                    cursor: 'pointer',
                    boxShadow: '0 4px 18px rgba(255,68,68,0.45)',
                    minHeight: 44,
                  }}
                >
                  Submit to Admin 🚀
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

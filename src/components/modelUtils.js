import * as THREE from 'three';

// ─── Shared Utilities & Materials ──────────────────────────────────────────

export const cvs = (w, h) => {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  return c;
};

export const tex = (c, lin = false) => {
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = lin ? THREE.LinearSRGBColorSpace : THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
};

export const PM = (color, metalness = 0, roughness = 0.5, opts = {}) => {
  return new THREE.MeshPhysicalMaterial({
    color,
    metalness,
    roughness,
    ...opts,
  });
};

// Rounded box geometry helper
export function rb(w, h, d, b = 0.12) {
  const s = new THREE.Shape();
  s.moveTo(-(w - 2 * b) / 2, -(d - 2 * b) / 2);
  s.lineTo((w - 2 * b) / 2, -(d - 2 * b) / 2);
  s.lineTo((w - 2 * b) / 2, (d - 2 * b) / 2);
  s.lineTo(-(w - 2 * b) / 2, (d - 2 * b) / 2);
  s.closePath();
  const dep = h - 2 * b;
  const g = new THREE.ExtrudeGeometry(s, {
    depth: dep,
    bevelEnabled: true,
    bevelThickness: b,
    bevelSize: b,
    bevelSegments: 2,
  });
  g.rotateX(-Math.PI / 2);
  g.translate(0, -dep / 2, 0);
  return g;
}

export function B(w, h, d) {
  return new THREE.BoxGeometry(w, h, d);
}

// ─── High DPI Callout Sprite Generator ─────────────────────────────────────
export function makeCalloutTag(text, color = '#5ba2e8', w = 5.6, h = 2.2, fs = 38, subtext = '') {
  const scale = 45;
  const W = Math.round(w * scale);
  const H = Math.round(h * scale);
  const c = cvs(W, H);
  const g = c.getContext('2d');

  // Pill badge background with glass tint
  g.fillStyle = 'rgba(10, 14, 22, 0.90)';
  if (g.roundRect) {
    g.beginPath();
    g.roundRect(4, 4, W - 8, H - 8, (H - 8) / 2);
    g.fill();
    g.strokeStyle = color;
    g.lineWidth = 4;
    g.stroke();
  } else {
    g.fillRect(4, 4, W - 8, H - 8);
    g.strokeStyle = color;
    g.lineWidth = 4;
    g.strokeRect(4, 4, W - 8, H - 8);
  }

  // Accent indicator dot
  g.fillStyle = color;
  g.beginPath();
  g.arc(18, H / 2, 6, 0, Math.PI * 2);
  g.fill();

  // Pin text
  g.fillStyle = '#ffffff';
  g.font = `700 ${fs}px 'JetBrains Mono', monospace, Arial`;
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  g.fillText(text, W / 2 + 6, H / 2 + 1);

  const t = tex(c);
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: t, depthTest: false, transparent: true }));
  s.scale.set(w, h, 1);
  s.renderOrder = 20;
  s.userData = { isCallout: true, pinName: text, color };
  return s;
}

// Helper to register parts for raycasting and explosion
export function createModelContext() {
  const root = new THREE.Group();
  const parts = [];
  const groups = [];
  const labels = new THREE.Group();
  root.add(labels);

  const G = (ex) => {
    const g = new THREE.Group();
    g.userData.ex = ex;
    root.add(g);
    groups.push(g);
    return g;
  };

  const mk = (geo, mat, x, y, z, name, desc = '', pinType = '', voltage = '', grp = null) => {
    const m = new THREE.Mesh(geo, mat);
    m.position.set(x, y, z);
    m.castShadow = true;
    m.receiveShadow = true;
    m.userData = { name, desc, pinType, voltage };
    (grp || root).add(m);
    if (name) parts.push(m);
    return m;
  };

  return { root, parts, groups, labels, G, mk };
}

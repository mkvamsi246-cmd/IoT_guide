import * as THREE from 'three';
import { cvs, tex, PM, rb, B, makeCalloutTag, createModelContext } from './modelUtils.js';

// ─── 1. LED (Light Emitting Diode) ──────────────────────────────────────────
export function buildLED(options = {}) {
  const ctx = createModelContext();
  const { root, parts, groups, labels, G, mk } = ctx;

  const ledColorHex = options.color ? new THREE.Color(options.color).getHex() : 0xff2233;
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: ledColorHex,
    emissive: ledColorHex,
    emissiveIntensity: 0.25,
    roughness: 0.12,
    metalness: 0.05,
    transmission: 0.65,
    transparent: true,
    opacity: 0.95,
    ior: 1.52,
  });

  const tin = PM(0xdcdde1, 1, 0.25);
  const silver = PM(0xf1f2f6, 1, 0.15);

  const ledGroup = G([0, 8, 0]);

  // Dome lens (Cylinder body + hemisphere top)
  const cylGeo = new THREE.CylinderGeometry(3.2, 3.2, 6.5, 32);
  const domeGeo = new THREE.SphereGeometry(3.2, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2);
  domeGeo.translate(0, 3.25, 0);

  mk(cylGeo, glassMat, 0, 4.5, 0, 'LED Epoxy Lens Body', 'Diffused epoxy resin lens focusing light emission', 'Lens', '', ledGroup);
  mk(domeGeo, glassMat, 0, 4.5, 0, 'LED Dome Cap', 'Spherical optical dome providing wide viewing angle', 'Optics', '', ledGroup);

  // Bottom rim flange with flat cathode notch
  const rimGeo = new THREE.CylinderGeometry(3.6, 3.6, 1.0, 32);
  mk(rimGeo, glassMat, 0, 0.8, 0, 'Cathode Index Flange', 'Base rim with flat edge indicating negative cathode lead', 'Flange', '', ledGroup);

  // Internal leadframe & cup (visible through epoxy)
  const cupMat = PM(0xe0e0e0, 1, 0.3);
  mk(B(0.8, 3, 1.6), cupMat, -0.7, 3.5, 0, 'Cathode Anvil & Reflector Cup', 'Carries the semiconductor die inside reflective cup', 'Lead Frame', '', ledGroup);
  mk(B(0.6, 3, 0.8), cupMat, 0.7, 3.5, 0, 'Anode Post', 'Connects gold bond wire to positive terminal', 'Lead Frame', '', ledGroup);

  // Die emitter
  mk(B(0.5, 0.4, 0.5), PM(0xffffff, 0, 0.1, { emissive: 0xffeedd, emissiveIntensity: 0.8 }), -0.7, 4.8, 0, 'Gallium Arsenide Die', 'P-N junction crystal that emits photons via electroluminescence', 'Semiconductor', '1.8V–3.3V', ledGroup);

  // Anode (+) longer wire lead
  mk(new THREE.CylinderGeometry(0.35, 0.35, 18, 16), silver, 1.1, -8.5, 0, 'Anode (+) Lead', 'Longer positive lead wire · Connects to voltage supply via current-limiting resistor', 'Anode', '1.8V–3.3V', root);

  // Cathode (–) shorter wire lead
  mk(new THREE.CylinderGeometry(0.35, 0.35, 13, 16), silver, -1.1, -6.0, 0, 'Cathode (–) Lead', 'Shorter negative lead wire · Connects to circuit Ground (GND)', 'Cathode', '0V (GND)', root);

  // Callout tags
  const pAnode = makeCalloutTag('Anode (+)', '#ff4444', 4.8, 1.8, 32);
  pAnode.position.set(1.1, -18.5, 2);
  pAnode.userData = { name: 'Anode (+) Terminal', desc: 'Longer leg · Connect to GPIO / 3.3V via 220Ω–1kΩ resistor', pinType: 'Positive', voltage: '1.8V–3.3V', color: '#ff4444' };
  labels.add(pAnode);

  const pCathode = makeCalloutTag('Cathode (–)', '#4488ff', 5.0, 1.8, 32);
  pCathode.position.set(-1.1, -13.5, 2);
  pCathode.userData = { name: 'Cathode (–) Terminal', desc: 'Shorter leg (flat rim side) · Connect to Ground (GND)', pinType: 'Negative', voltage: '0V (GND)', color: '#4488ff' };
  labels.add(pCathode);

  return {
    root,
    parts,
    groups,
    labels,
    cameraPos: [-28, 18, 34],
    target: [0, -2, 0],
    minDistance: 12,
    maxDistance: 90,
  };
}

// ─── 2. Resistor (Axial Through-Hole) ─────────────────────────────────────────
export function buildResistor(options = {}) {
  const ctx = createModelContext();
  const { root, parts, groups, labels, G, mk } = ctx;

  const tin = PM(0xd0d5dd, 1, 0.2);
  const ceramicMat = PM(0xe4cfb0, 0, 0.5); // Warm beige resistor ceramic

  const resGroup = G([0, 0, 0]);

  // Main ceramic barrel
  const bodyGeo = new THREE.CylinderGeometry(2.2, 2.2, 10, 32);
  bodyGeo.rotateZ(Math.PI / 2);
  mk(bodyGeo, ceramicMat, 0, 0, 0, 'Resistor Body', 'Ceramic core coated with metal film resistive layer', 'Body', '', resGroup);

  // Bulged ends
  const bulbL = new THREE.SphereGeometry(2.35, 24, 16);
  bulbL.scale(0.8, 1, 1);
  mk(bulbL, ceramicMat, -4.8, 0, 0, 'Ceramic End Cap', 'Insulated end seal', 'Body', '', resGroup);
  const bulbR = new THREE.SphereGeometry(2.35, 24, 16);
  bulbR.scale(0.8, 1, 1);
  mk(bulbR, ceramicMat, 4.8, 0, 0, 'Ceramic End Cap', 'Insulated end seal', 'Body', '', resGroup);

  // 4 Color Code Bands (Brown, Black, Red, Gold = 1 kΩ, 5%)
  const bandMatBrown = PM(0x5c3818, 0, 0.4);
  const bandMatBlack = PM(0x181818, 0, 0.4);
  const bandMatRed = PM(0xd92d20, 0, 0.4);
  const bandMatGold = PM(0xd4af37, 1, 0.25);

  const mkBand = (mat, x, name, val) => {
    const bGeo = new THREE.CylinderGeometry(2.28, 2.28, 0.85, 32);
    bGeo.rotateZ(Math.PI / 2);
    mk(bGeo, mat, x, 0, 0, name, val, 'Color Band', '', resGroup);
  };

  mkBand(bandMatBrown, -3.2, '1st Band: Brown (1)', 'First significant digit = 1');
  mkBand(bandMatBlack, -1.3, '2nd Band: Black (0)', 'Second significant digit = 0');
  mkBand(bandMatRed, 0.8, '3rd Band: Red (×100)', 'Multiplier: 10 × 100 = 1,000 Ω (1 kΩ)');
  mkBand(bandMatGold, 3.4, '4th Band: Gold (±5%)', 'Tolerance: ±5% precision rating');

  // Axial bent lead wires (protrude horizontally, bend down 90°)
  const mkLead = (xStart, xBend) => {
    const hLead = new THREE.CylinderGeometry(0.38, 0.38, Math.abs(xBend - xStart), 16);
    hLead.rotateZ(Math.PI / 2);
    mk(hLead, tin, (xStart + xBend) / 2, 0, 0, 'Axial Lead Wire', 'Tinned copper lead', 'Lead', '', root);

    const corner = new THREE.SphereGeometry(0.42, 16, 12);
    mk(corner, tin, xBend, 0, 0, 'Lead Bend', '90° breadboard insertion bend', 'Lead', '', root);

    const vLead = new THREE.CylinderGeometry(0.38, 0.38, 12, 16);
    mk(vLead, tin, xBend, -6.0, 0, 'Through-Hole Lead Pin', 'Standard breadboard pitch terminal', 'Lead', '', root);
  };

  mkLead(-4.8, -8.5);
  mkLead(4.8, 8.5);

  // Callouts
  const p1 = makeCalloutTag('Pin 1', '#f59e0b', 4.4, 1.8, 30);
  p1.position.set(-8.5, -13, 2);
  p1.userData = { name: 'Resistor Pin 1', desc: 'First terminal (Non-polarized) · Connect to signal or power', pinType: 'Terminal', voltage: 'Any', color: '#f59e0b' };
  labels.add(p1);

  const p2 = makeCalloutTag('Pin 2', '#3b82f6', 4.4, 1.8, 30);
  p2.position.set(8.5, -13, 2);
  p2.userData = { name: 'Resistor Pin 2', desc: 'Second terminal (Non-polarized) · Connect to component or GND', pinType: 'Terminal', voltage: 'Any', color: '#3b82f6' };
  labels.add(p2);

  return {
    root,
    parts,
    groups,
    labels,
    cameraPos: [0, 20, 36],
    target: [0, -3, 0],
    minDistance: 12,
    maxDistance: 90,
  };
}

// ─── 3. Electrolytic Capacitor ───────────────────────────────────────────────
export function buildCapacitor(options = {}) {
  const ctx = createModelContext();
  const { root, parts, groups, labels, G, mk } = ctx;

  const tin = PM(0xd0d5dd, 1, 0.2);
  const silverVent = PM(0xdcdde1, 1, 0.35);
  const sleeveMat = PM(0x181e28, 0, 0.45); // Dark metallic sleeve

  const capGroup = G([0, 5, 0]);

  // Cylinder can
  mk(new THREE.CylinderGeometry(4.5, 4.5, 14, 36), sleeveMat, 0, 5, 0, 'Electrolytic Can Sleeve', 'Insulating PVC sleeve with capacity & voltage ratings', 'Can', '', capGroup);

  // Silver embossed top vent with pressure relief score
  mk(new THREE.CylinderGeometry(4.45, 4.45, 0.6, 36), silverVent, 0, 12.1, 0, 'Safety Pressure Vent', 'Scored aluminum top relieves gas safely during overvoltage', 'Vent', '', capGroup);
  mk(B(6.5, 0.2, 0.5), PM(0x8a929e, 1, 0.3), 0, 12.45, 0, 'Safety Score K-Cut', 'Pressure relief groove', 'Vent', '', capGroup);
  mk(B(0.5, 0.2, 6.5), PM(0x8a929e, 1, 0.3), 0, 12.45, 0, 'Safety Score K-Cut', 'Pressure relief groove', 'Vent', '', capGroup);

  // Negative polarity white stripe along the side
  const stripe = new THREE.CylinderGeometry(4.55, 4.55, 13.8, 16, 1, false, -0.4, 0.8);
  mk(stripe, PM(0xf1f5f9, 0, 0.4), 0, 5, 0, 'Negative Polarity Stripe', 'White stripe indicating cathode lead with minus (–) symbols', 'Stripe', '', capGroup);

  // Bottom rubber bung
  mk(new THREE.CylinderGeometry(4.3, 4.3, 1.2, 32), PM(0x101012, 0, 0.8), 0, -2.4, 0, 'Rubber Seal Bung', 'Hermetic rubber plug sealing internal electrolyte', 'Seal', '', capGroup);

  // Positive (+) longer lead
  mk(new THREE.CylinderGeometry(0.38, 0.38, 15, 16), tin, 2.0, -9.5, 0, 'Positive (+) Anode Lead', 'Longer lead wire · Connects to positive voltage rail', 'Anode', 'Up to 16V', root);

  // Negative (–) shorter lead
  mk(new THREE.CylinderGeometry(0.38, 0.38, 10, 16), tin, -2.0, -7.0, 0, 'Negative (–) Cathode Lead', 'Shorter lead wire aligned with stripe · Connects to Ground (GND)', 'Cathode', '0V (GND)', root);

  // Callout tags
  const pPos = makeCalloutTag('Positive (+)', '#ef4444', 5.2, 1.8, 30);
  pPos.position.set(2.0, -18, 2);
  pPos.userData = { name: 'Positive (+) Lead', desc: 'Longer lead wire · Connect to +VCC power rail', pinType: 'Positive', voltage: '16V Max', color: '#ef4444' };
  labels.add(pPos);

  const pNeg = makeCalloutTag('Negative (–)', '#3b82f6', 5.2, 1.8, 30);
  pNeg.position.set(-2.0, -13, 2);
  pNeg.userData = { name: 'Negative (–) Lead', desc: 'Shorter lead wire (aligned with stripe) · Connect to GND', pinType: 'Negative', voltage: '0V (GND)', color: '#3b82f6' };
  labels.add(pNeg);

  return {
    root,
    parts,
    groups,
    labels,
    cameraPos: [-28, 22, 34],
    target: [0, 0, 0],
    minDistance: 15,
    maxDistance: 95,
  };
}

// ─── 4. Push Button (Tactile Switch) ─────────────────────────────────────────
export function buildPushButton(options = {}) {
  const ctx = createModelContext();
  const { root, parts, groups, labels, G, mk } = ctx;

  const tin = PM(0xd5d8dc, 1, 0.2);
  const bodyMat = PM(0x18191c, 0, 0.6); // Black thermoplastic
  const plateMat = PM(0xd0d5dd, 1, 0.25); // Silver metal bracket
  const btnMat = PM(0x111215, 0, 0.4); // Plunger

  const swGroup = G([0, 2, 0]);

  // Main square plastic housing
  mk(rb(11, 4.5, 11, 0.2), bodyMat, 0, 1, 0, 'Tactile Switch Housing', 'Molded UL94V-0 thermoplastic base housing', 'Body', '', swGroup);

  // Silver metal top bracket with 4 corner rivets
  mk(B(10.8, 0.6, 10.8), plateMat, 0, 3.5, 0, 'Metal Retaining Cover', 'Stamped steel retaining plate keeping internal dome in place', 'Cover', '', swGroup);

  // Round black center button plunger
  mk(new THREE.CylinderGeometry(2.8, 2.8, 3.2, 32), btnMat, 0, 5.0, 0, 'Actuator Plunger Button', 'Tactile momentary push button actuator', 'Actuator', '', swGroup);

  // 4 Gull-wing curved through-hole lead legs (A1, A2, B1, B2)
  const pinCoords = [
    { name: 'A1', x: -6.4, z: -3.8, desc: 'Common Side A Terminal 1 · Internally linked to A2', type: 'Input', c: '#ef4444' },
    { name: 'A2', x: -6.4, z: 3.8, desc: 'Common Side A Terminal 2 · Internally linked to A1', type: 'Input', c: '#ef4444' },
    { name: 'B1', x: 6.4, z: -3.8, desc: 'Common Side B Terminal 1 · Linked to B2 (Press bridges A to B)', type: 'Output', c: '#3b82f6' },
    { name: 'B2', x: 6.4, z: 3.8, desc: 'Common Side B Terminal 2 · Linked to B1 (Press bridges A to B)', type: 'Output', c: '#3b82f6' },
  ];

  pinCoords.forEach((p) => {
    // Horizontal pin tab
    mk(B(2.2, 0.5, 1.2), tin, p.x > 0 ? p.x - 0.8 : p.x + 0.8, 0.8, p.z, `${p.name} Tab`, 'Lead frame tab', 'Pin', '', swGroup);
    // Vertical leg
    mk(B(0.6, 6, 1.0), tin, p.x, -2.8, p.z, `${p.name} Leg`, 'Breadboard pin', 'Pin', '', root);

    const s = makeCalloutTag(p.name, p.c, 3.6, 1.6, 30);
    s.position.set(p.x * 1.3, -6.5, p.z * 1.3);
    s.userData = { name: `Pin ${p.name}`, desc: p.desc, pinType: p.type, voltage: '3.3V / 5V', color: p.c };
    labels.add(s);
  });

  return {
    root,
    parts,
    groups,
    labels,
    cameraPos: [-28, 26, 32],
    target: [0, 0, 0],
    minDistance: 12,
    maxDistance: 85,
  };
}

// ─── 5. Rotary Potentiometer ────────────────────────────────────────────────
export function buildPotentiometer(options = {}) {
  const ctx = createModelContext();
  const { root, parts, groups, labels, G, mk } = ctx;

  const tin = PM(0xd0d5dd, 1, 0.2);
  const brass = PM(0xc8963e, 1, 0.3); // Threaded collar
  const metalCan = PM(0xc8ccd2, 1, 0.3); // Round metal body
  const waferMat = PM(0x6b3f20, 0, 0.6); // Brown phenolic plate

  const potGroup = G([0, 0, 0]);

  // Round metal casing
  mk(new THREE.CylinderGeometry(7.2, 7.2, 5.5, 36), metalCan, 0, 0, 0, 'Potentiometer Metal Shell', 'Stamped zinc-plated steel protective casing', 'Shell', '', potGroup);

  // Phenolic terminal wafer plate (front flat face)
  mk(rb(12, 1.2, 6, 0.1), waferMat, 0, -2.8, 4.5, 'Phenolic Terminal Board', 'High dielectric insulating mounting wafer', 'Wafer', '', potGroup);

  // Threaded neck bushing collar
  mk(new THREE.CylinderGeometry(3.6, 3.6, 4.5, 28), brass, 0, 4.8, 0, 'Threaded Mounting Bushing', 'M7 brass threaded collar with mounting nut', 'Bushing', '', potGroup);
  // Hex nut
  mk(new THREE.CylinderGeometry(4.8, 4.8, 1.2, 6), brass, 0, 4.0, 0, 'Hexagonal Mounting Nut', 'Panel mount fastener', 'Fastener', '', potGroup);

  // Knurled rotary shaft
  const shaftMat = PM(0xdcdde1, 1, 0.2);
  mk(new THREE.CylinderGeometry(2.4, 2.4, 11, 28), shaftMat, 0, 11.5, 0, 'Rotary Knurled Shaft', '18-tooth knurled 6mm metal rotation shaft', 'Shaft', '', potGroup);

  // 3 Solder lug terminals (Pin 1, Pin 2 Wiper, Pin 3)
  const termData = [
    { name: 'Pin 1', x: -4.4, desc: 'Outer terminal 1 · One end of 10kΩ carbon track', c: '#f59e0b' },
    { name: 'Pin 2 (Wiper)', x: 0, desc: 'Middle wiper terminal · Variable analog voltage (0V to VCC)', c: '#10b981' },
    { name: 'Pin 3', x: 4.4, desc: 'Outer terminal 2 · Other end of 10kΩ carbon track', c: '#3b82f6' },
  ];

  termData.forEach((t) => {
    // Solder lug tab with hole
    mk(B(1.6, 7.5, 0.6), tin, t.x, -7.0, 6.2, `${t.name} Lug`, t.desc, 'Terminal', '', root);

    const s = makeCalloutTag(t.name, t.c, 4.8, 1.7, 28);
    s.position.set(t.x, -12.5, 6.5);
    s.userData = { name: `${t.name} Terminal`, desc: t.desc, pinType: 'Terminal', voltage: '0V–3.3V', color: t.c };
    labels.add(s);
  });

  return {
    root,
    parts,
    groups,
    labels,
    cameraPos: [-28, 22, 38],
    target: [0, 2, 0],
    minDistance: 15,
    maxDistance: 95,
  };
}

// ─── 6. Active Piezo Buzzer ─────────────────────────────────────────────────
export function buildBuzzer(options = {}) {
  const ctx = createModelContext();
  const { root, parts, groups, labels, G, mk } = ctx;

  const tin = PM(0xd0d5dd, 1, 0.2);
  const bodyMat = PM(0x16181b, 0, 0.55); // Matte black casing

  const bzGroup = G([0, 4, 0]);

  // Cylinder casing
  mk(new THREE.CylinderGeometry(6.5, 6.5, 7.5, 36), bodyMat, 0, 3.5, 0, 'Piezo Buzzer Casing', 'Sealed PBT acoustic resonance cavity', 'Chamber', '', bzGroup);

  // Sound aperture hole on top
  mk(new THREE.CylinderGeometry(1.6, 1.6, 0.8, 24), PM(0x08090a, 0, 0.9), 0, 7.2, 0, 'Sound Hole Aperture', 'Acoustic sound wave emission port', 'Aperture', '', bzGroup);

  // White "+" silkscreen indicator on top surface
  mk(B(1.8, 0.1, 0.4), PM(0xffffff, 0, 0.3), 3.4, 7.3, 0, 'Positive Polar Marking', '+ Polarity indicator for positive terminal', 'Marking', '', bzGroup);
  mk(B(0.4, 0.1, 1.8), PM(0xffffff, 0, 0.3), 3.4, 7.3, 0, 'Positive Polar Marking', '+ Polarity indicator for positive terminal', 'Marking', '', bzGroup);

  // Leads
  mk(new THREE.CylinderGeometry(0.38, 0.38, 12, 16), tin, 2.8, -6.0, 0, 'Positive (+) Terminal Pin', 'Longer lead wire · Connects to 3–5V control pin', 'Anode', '3V–5V', root);
  mk(new THREE.CylinderGeometry(0.38, 0.38, 8, 16), tin, -2.8, -4.0, 0, 'Negative (–) Terminal Pin', 'Shorter lead wire · Connects to circuit Ground (GND)', 'Cathode', '0V (GND)', root);

  // Callouts
  const pPos = makeCalloutTag('Positive (+)', '#ef4444', 5.0, 1.8, 30);
  pPos.position.set(2.8, -13, 2);
  pPos.userData = { name: 'Positive (+) Lead', desc: 'Connect to GPIO / PWM or +V supply (3V–5V DC)', pinType: 'Positive', voltage: '3V–5V', color: '#ef4444' };
  labels.add(pPos);

  const pNeg = makeCalloutTag('Negative (–)', '#3b82f6', 5.0, 1.8, 30);
  pNeg.position.set(-2.8, -9.5, 2);
  pNeg.userData = { name: 'Negative (–) Lead', desc: 'Connect to Ground (GND)', pinType: 'Negative', voltage: '0V (GND)', color: '#3b82f6' };
  labels.add(pNeg);

  return {
    root,
    parts,
    groups,
    labels,
    cameraPos: [-26, 24, 32],
    target: [0, 0, 0],
    minDistance: 12,
    maxDistance: 90,
  };
}

// ─── 7. BMP280 Barometric Pressure & Temp Sensor ────────────────────────────
export function buildBMP280(options = {}) {
  const ctx = createModelContext();
  const { root, parts, groups, labels, G, mk } = ctx;

  const purplePCB = PM(0x6b21a8, 0, 0.35, { clearcoat: 0.4 }); // Iconic Purple BMP280 board
  const gold = PM(0xe0b04a, 1, 0.28);
  const silverChip = PM(0xd0d5dd, 1, 0.2); // Bosch metal LGA
  const passives = PM(0x18191c, 0, 0.5);

  const pcbGroup = G([0, 0, 0]);

  // Purple rectangular PCB
  mk(rb(14, 1.4, 20, 0.2), purplePCB, 0, 0, 0, 'BMP280 Purple PCB', 'High-accuracy barometric pressure breakout board', 'PCB', '', pcbGroup);

  // Gold plated corner mounting hole
  mk(new THREE.CylinderGeometry(1.2, 1.2, 1.6, 20), gold, -4.2, 0, -6.8, 'M2 Mounting Hole', 'Plated mounting hole', 'Hole', '', pcbGroup);

  // Bosch BMP280 sensor package (silver rectangular metal cap with vent hole)
  mk(rb(3.6, 1.0, 4.2, 0.1), silverChip, 1.2, 1.2, -2.0, 'Bosch BMP280 Sensor LGA', 'Piezoresistive pressure + temperature MEMS sensor package', 'MEMS Sensor', '3.3V', pcbGroup);
  mk(new THREE.CylinderGeometry(0.35, 0.35, 0.4, 16), PM(0x0a0a0c, 0, 0.9), 1.2, 1.8, -2.0, 'Barometric Sensing Port', 'Atmospheric intake aperture', 'Port', '', pcbGroup);

  // SMD pull-up resistors & capacitors
  mk(B(1.2, 0.6, 0.8), passives, -2.4, 0.9, 0.5, 'Pull-Up Resistor', 'I2C line pull-up network', 'SMD', '', pcbGroup);
  mk(B(1.2, 0.6, 0.8), passives, 2.4, 0.9, 2.5, 'Decoupling Capacitor', 'Power supply noise filtering', 'SMD', '', pcbGroup);

  // 4 Gold Header Pins (VCC, GND, SCL, SDA)
  const pins = [
    { x: -4.5, name: 'VCC', desc: 'Power Supply Input (3.3V – 5V with onboard regulator)', type: 'Power In', v: '3.3V–5V', c: '#ef4444' },
    { x: -1.5, name: 'GND', desc: 'Power Ground Reference', type: 'Ground', v: '0V', c: '#94a3b8' },
    { x: 1.5, name: 'SCL', desc: 'I2C Serial Clock Bus Line', type: 'Clock', v: '3.3V', c: '#f59e0b' },
    { x: 4.5, name: 'SDA', desc: 'I2C Serial Data Bus Line (Default Address 0x76)', type: 'Data', v: '3.3V', c: '#06b6d4' },
  ];

  pins.forEach((p) => {
    mk(B(0.64, 8, 0.64), gold, p.x, -4.5, 8.2, p.name, p.desc, p.type, p.v, root);
    const s = makeCalloutTag(p.name, p.c, 4.0, 1.6, 28);
    s.position.set(p.x, -9.5, 8.5);
    s.userData = { name: `${p.name} Pin`, desc: p.desc, pinType: p.type, voltage: p.v, color: p.c };
    labels.add(s);
  });

  return {
    root,
    parts,
    groups,
    labels,
    cameraPos: [-28, 28, 38],
    target: [0, -1, 0],
    minDistance: 12,
    maxDistance: 90,
  };
}

// ─── 8. IR Sensor (Obstacle / Line Tracking Sensor) ─────────────────────────
export function buildIRSensor(options = {}) {
  const ctx = createModelContext();
  const { root, parts, groups, labels, G, mk } = ctx;

  const bluePCB = PM(0x1d4ed8, 0, 0.35, { clearcoat: 0.3 }); // Classic blue breakout PCB
  const gold = PM(0xe0b04a, 1, 0.28);
  const chipMat = PM(0x111317, 0, 0.5);

  const pcbGroup = G([0, 0, 0]);

  // PCB board
  mk(rb(16, 1.4, 34, 0.2), bluePCB, 0, 0, 0, 'IR Sensor PCB', 'FR4 comparator breakout board', 'PCB', '', pcbGroup);

  // Dual 5mm LEDs pointing forward on top edge
  // 1. Black photodiode receiver
  const photoMat = PM(0x0f1115, 0, 0.15, { roughness: 0.1 });
  mk(new THREE.CylinderGeometry(1.9, 1.9, 5, 24), photoMat, -4.0, 1.8, -17.5, 'Photodiode Receiver', 'Dark epoxy 5mm phototransistor detects reflected 940nm infrared light', 'Sensor', '', pcbGroup);
  const pDome = new THREE.SphereGeometry(1.9, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2);
  pDome.translate(-4.0, 4.3, -17.5);
  mk(pDome, photoMat, 0, 0, 0, 'Photodiode Lens', 'Infrared focusing dome', 'Optics', '', pcbGroup);

  // 2. Clear IR emitter LED
  const irClearMat = new THREE.MeshPhysicalMaterial({ color: 0xffffff, transmission: 0.8, opacity: 0.9, transparent: true, roughness: 0.1 });
  mk(new THREE.CylinderGeometry(1.9, 1.9, 5, 24), irClearMat, 4.0, 1.8, -17.5, 'IR Transmitter LED', '940nm infrared emitting diode sends continuous beam', 'Emitter', '', pcbGroup);
  const irDome = new THREE.SphereGeometry(1.9, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2);
  irDome.translate(4.0, 4.3, -17.5);
  mk(irDome, irClearMat, 0, 0, 0, 'IR Emitter Lens', 'Beam focusing dome', 'Optics', '', pcbGroup);

  // Blue square potentiometer trimmer with brass adjustment screw
  mk(rb(6, 4.5, 6, 0.1), PM(0x2563eb, 0, 0.4), 0, 3.2, 0, 'Sensitivity Trimpot', 'Adjusts detection threshold distance (2cm – 30cm)', 'Potentiometer', '', pcbGroup);
  mk(new THREE.CylinderGeometry(1.4, 1.4, 0.6, 20), PM(0xc8963e, 1, 0.3), 0, 5.6, 0, 'Brass Calibrator Screw', 'Distance sensitivity tuning screw', 'Tuning', '', pcbGroup);

  // LM393 Dual Comparator IC
  mk(rb(5, 1.2, 7, 0.1), chipMat, 0, 1.4, 8, 'LM393 Comparator IC', 'High-speed analog comparator chip', 'IC', '3.3V–5V', pcbGroup);

  // Power & D-OUT Status LEDs
  mk(B(1.6, 0.8, 1.2), PM(0xef4444, 0, 0.3, { emissive: 0x550000 }), -4.5, 1.2, 8, 'Power LED (Red)', 'Indicates 3.3V/5V supply', 'LED', '', pcbGroup);
  mk(B(1.6, 0.8, 1.2), PM(0x10b981, 0, 0.3, { emissive: 0x005500 }), 4.5, 1.2, 8, 'Obstacle LED (Green)', 'Lights when obstacle is detected within range', 'LED', '', pcbGroup);

  // 3 Header pins (VCC, GND, OUT)
  const pins = [
    { x: -4.0, name: 'VCC', desc: 'Power Supply (3.3V – 5V DC)', type: 'Power In', v: '3.3V–5V', c: '#ef4444' },
    { x: 0, name: 'GND', desc: 'Circuit Ground', type: 'Ground', v: '0V', c: '#94a3b8' },
    { x: 4.0, name: 'OUT', desc: 'Digital Output (LOW / 0 when obstacle detected; HIGH / 1 when clear)', type: 'Digital Out', v: '3.3V', c: '#10b981' },
  ];

  pins.forEach((p) => {
    mk(B(0.64, 8, 0.64), gold, p.x, -4.5, 15.5, p.name, p.desc, p.type, p.v, root);
    const s = makeCalloutTag(p.name, p.c, 4.0, 1.6, 28);
    s.position.set(p.x, -9.5, 15.8);
    s.userData = { name: `${p.name} Pin`, desc: p.desc, pinType: p.type, voltage: p.v, color: p.c };
    labels.add(s);
  });

  return {
    root,
    parts,
    groups,
    labels,
    cameraPos: [-32, 34, 44],
    target: [0, 0, 0],
    minDistance: 15,
    maxDistance: 100,
  };
}

// ─── 9. MQ-2 Gas & Smoke Sensor Module ──────────────────────────────────────
export function buildMQ2(options = {}) {
  const ctx = createModelContext();
  const { root, parts, groups, labels, G, mk } = ctx;

  const bluePCB = PM(0x1d4ed8, 0, 0.35, { clearcoat: 0.3 });
  const gold = PM(0xe0b04a, 1, 0.28);
  const meshMat = PM(0xd0d5dd, 1, 0.4); // Silver stainless steel mesh hood

  const mqGroup = G([0, 0, 0]);

  // Base PCB
  mk(rb(22, 1.4, 32, 0.2), bluePCB, 0, 0, 0, 'MQ-2 Breakout PCB', 'Double-sided FR4 carrier board with LM393 comparator circuit', 'PCB', '', mqGroup);

  // Big Silver Wire Mesh Sensor Hood Cylinder
  mk(new THREE.CylinderGeometry(8.5, 8.5, 10, 36), meshMat, 0, 6.5, -4.5, 'Stainless Steel Mesh Hood', 'Double-layer explosion-proof stainless steel mesh protecting internal sensor coil', 'Mesh Hood', '', mqGroup);

  // Mesh Top Dome Ring
  mk(new THREE.CylinderGeometry(8.6, 8.6, 1.0, 36), PM(0xe2e8f0, 1, 0.2), 0, 11.8, -4.5, 'Stainless Steel Rim Cap', 'Top protective bezel', 'Cap', '', mqGroup);

  // Internal glowing ceramic heater tube
  mk(new THREE.CylinderGeometry(3.5, 3.5, 7, 24), PM(0xf97316, 0, 0.4, { emissive: 0xea580c, emissiveIntensity: 0.4 }), 0, 6.5, -4.5, 'Al2O3 Ceramic Heating Element', 'SnO2 gas-sensitive semiconductor coating heated by internal coil', 'Heater', '5V Heating', mqGroup);

  // Blue calibration potentiometer trimmer
  mk(rb(6, 4, 6, 0.1), PM(0x2563eb, 0, 0.4), 0, 2.8, 9, 'Threshold Tuning Potentiometer', 'Calibrates analog trigger threshold for digital alarm output', 'Trimpot', '', mqGroup);

  // 4 Header pins (VCC, GND, DO, AO)
  const pins = [
    { x: -5.4, name: 'VCC', desc: '5V Power Supply Input (Required for internal heater coil)', type: 'Power In', v: '5V', c: '#ef4444' },
    { x: -1.8, name: 'GND', desc: 'Circuit Ground', type: 'Ground', v: '0V', c: '#94a3b8' },
    { x: 1.8, name: 'DO', desc: 'Digital Output (Threshold alert: LOW when gas detected)', type: 'Digital Out', v: '5V/0V', c: '#f59e0b' },
    { x: 5.4, name: 'AO', desc: 'Analog Output (Voltage increases with gas concentration)', type: 'Analog Out', v: '0V–5V', c: '#06b6d4' },
  ];

  pins.forEach((p) => {
    mk(B(0.64, 8, 0.64), gold, p.x, -4.5, 14.5, p.name, p.desc, p.type, p.v, root);
    const s = makeCalloutTag(p.name, p.c, 3.8, 1.6, 28);
    s.position.set(p.x, -9.5, 14.8);
    s.userData = { name: `${p.name} Pin`, desc: p.desc, pinType: p.type, voltage: p.v, color: p.c };
    labels.add(s);
  });

  return {
    root,
    parts,
    groups,
    labels,
    cameraPos: [-36, 36, 48],
    target: [0, 2, 0],
    minDistance: 16,
    maxDistance: 110,
  };
}

// ─── 10. MPU6050 6-Axis Gyroscope & Accelerometer ───────────────────────────
export function buildMPU6050(options = {}) {
  const ctx = createModelContext();
  const { root, parts, groups, labels, G, mk } = ctx;

  const bluePCB = PM(0x1e40af, 0, 0.35, { clearcoat: 0.3 }); // Dark blue PCB
  const gold = PM(0xe0b04a, 1, 0.28);
  const qfnChip = PM(0x111317, 0, 0.45);

  const mpuGroup = G([0, 0, 0]);

  // Deep blue PCB
  mk(rb(16, 1.4, 22, 0.2), bluePCB, 0, 0, 0, 'MPU6050 Blue PCB', '6-axis MotionTracking breakout board', 'PCB', '', mpuGroup);

  // MPU6050 IC (Square black QFN-24)
  mk(rb(5.5, 0.9, 5.5, 0.08), qfnChip, 0, 1.1, -2.5, 'MPU-6050 MEMS IC', '3-axis MEMS accelerometer + 3-axis gyroscope with onboard Digital Motion Processor (DMP)', 'Motion IC', '3.3V', mpuGroup);
  // Gold orientation pin 1 dot
  mk(new THREE.CylinderGeometry(0.3, 0.3, 0.2, 16), gold, -2.0, 1.6, -4.5, 'Pin 1 Index Dot', 'IC orientation reference mark', 'Dot', '', mpuGroup);

  // Onboard low-dropout regulator & power LED
  mk(rb(2.8, 1.0, 1.6, 0.05), qfnChip, -4.5, 1.1, 4.0, '3.3V LDO Regulator', 'KB33 3.3V ultra-low noise voltage regulator', 'Regulator', '3.3V', mpuGroup);
  mk(B(1.4, 0.6, 0.9), PM(0xef4444, 0, 0.2, { emissive: 0x660000 }), 4.5, 1.0, 4.0, 'Power LED', 'Indicates supply voltage', 'LED', '', mpuGroup);

  // 8 Gold Header Pins
  const pins = [
    { x: -5.6, name: 'VCC', desc: 'Power Supply (3.3V – 5V)', type: 'Power In', v: '3.3V–5V', c: '#ef4444' },
    { x: -4.0, name: 'GND', desc: 'Circuit Ground', type: 'Ground', v: '0V', c: '#94a3b8' },
    { x: -2.4, name: 'SCL', desc: 'I2C Serial Clock', type: 'Clock', v: '3.3V', c: '#f59e0b' },
    { x: -0.8, name: 'SDA', desc: 'I2C Serial Data', type: 'Data', v: '3.3V', c: '#06b6d4' },
    { x: 0.8, name: 'XDA', desc: 'Auxiliary I2C Data (for external magnetometer)', type: 'Aux Data', v: '3.3V', c: '#8b5cf6' },
    { x: 2.4, name: 'XCL', desc: 'Auxiliary I2C Clock', type: 'Aux Clock', v: '3.3V', c: '#a855f7' },
    { x: 4.0, name: 'AD0', desc: 'I2C Address Select (LOW=0x68, HIGH=0x69)', type: 'Address', v: '3.3V', c: '#ec4899' },
    { x: 5.6, name: 'INT', desc: 'Motion Interrupt Output Pin', type: 'Interrupt', v: '3.3V', c: '#10b981' },
  ];

  pins.forEach((p) => {
    mk(B(0.58, 8, 0.58), gold, p.x, -4.5, 9.2, p.name, p.desc, p.type, p.v, root);
    const s = makeCalloutTag(p.name, p.c, 3.4, 1.5, 26);
    s.position.set(p.x, -9.5, 9.5);
    s.userData = { name: `${p.name} Pin`, desc: p.desc, pinType: p.type, voltage: p.v, color: p.c };
    labels.add(s);
  });

  return {
    root,
    parts,
    groups,
    labels,
    cameraPos: [-30, 30, 40],
    target: [0, 0, 0],
    minDistance: 14,
    maxDistance: 95,
  };
}

// ─── 11. Soil Moisture Sensor (Dual-Prong Probe + Module) ───────────────────
export function buildSoilMoisture(options = {}) {
  const ctx = createModelContext();
  const { root, parts, groups, labels, G, mk } = ctx;

  const bluePCB = PM(0x1d4ed8, 0, 0.35, { clearcoat: 0.3 });
  const gold = PM(0xe0b04a, 1, 0.28);

  const probeGroup = G([0, 0, 0]);

  // Dual-prong fork probe
  mk(rb(16, 1.4, 14, 0.1), bluePCB, 0, 0, -18, 'Soil Probe Top Header', 'Connecting header plate', 'Probe', '', probeGroup);

  // Left prong with exposed gold zigzag conductive traces
  mk(rb(5, 1.4, 36, 0.1), bluePCB, -4.5, 0, 4, 'Left Fork Prong', 'Corrosion-resistant FR4 probe arm', 'Prong', '', probeGroup);
  mk(B(3.8, 0.2, 32), gold, -4.5, 0.8, 4, 'Gold Contact Track L', 'Exposed immersion gold track measuring soil volumetric water content', 'Trace', '', probeGroup);

  // Right prong with exposed gold zigzag conductive traces
  mk(rb(5, 1.4, 36, 0.1), bluePCB, 4.5, 0, 4, 'Right Fork Prong', 'Corrosion-resistant FR4 probe arm', 'Prong', '', probeGroup);
  mk(B(3.8, 0.2, 32), gold, 4.5, 0.8, 4, 'Gold Contact Track R', 'Exposed immersion gold track completing conduction circuit', 'Trace', '', probeGroup);

  // Probe terminal header pins
  const pins = [
    { x: -4.5, name: 'VCC', desc: 'Power Supply (3.3V – 5V)', type: 'Power In', v: '3.3V–5V', c: '#ef4444' },
    { x: -1.5, name: 'GND', desc: 'Circuit Ground', type: 'Ground', v: '0V', c: '#94a3b8' },
    { x: 1.5, name: 'AO', desc: 'Analog Output (Voltage decreases as soil moisture increases)', type: 'Analog Out', v: '0V–3.3V', c: '#06b6d4' },
    { x: 4.5, name: 'DO', desc: 'Digital Output (Threshold alert: triggers when soil is dry)', type: 'Digital Out', v: '3.3V', c: '#f59e0b' },
  ];

  pins.forEach((p) => {
    mk(B(0.64, 8, 0.64), gold, p.x, -4.5, -24, p.name, p.desc, p.type, p.v, root);
    const s = makeCalloutTag(p.name, p.c, 3.8, 1.6, 28);
    s.position.set(p.x, -9.5, -24.5);
    s.userData = { name: `${p.name} Pin`, desc: p.desc, pinType: p.type, voltage: p.v, color: p.c };
    labels.add(s);
  });

  return {
    root,
    parts,
    groups,
    labels,
    cameraPos: [-36, 38, 52],
    target: [0, 0, -2],
    minDistance: 16,
    maxDistance: 110,
  };
}

// ─── 12. GPS Module (NEO-6M with Ceramic Patch Antenna) ─────────────────────
export function buildGPS(options = {}) {
  const ctx = createModelContext();
  const { root, parts, groups, labels, G, mk } = ctx;

  const bluePCB = PM(0x1d4ed8, 0, 0.35, { clearcoat: 0.3 });
  const gold = PM(0xe0b04a, 1, 0.28);
  const ceramicAntMat = PM(0xd1c7b7, 0, 0.6); // Tan square ceramic antenna

  const gpsGroup = G([0, 0, 0]);

  // Blue PCB base
  mk(rb(24, 1.4, 28, 0.2), bluePCB, 0, 0, 0, 'GPS Breakout PCB', 'u-blox NEO-6M receiver carrier board', 'PCB', '', gpsGroup);

  // Ceramic Patch Antenna (Square tan block with silver center pickup)
  mk(rb(19, 4.5, 19, 0.2), ceramicAntMat, 0, 3.2, -3.0, 'Ceramic GPS Patch Antenna', 'High-gain 25×25mm ceramic patch tuned to 1575.42 MHz GPS L1 frequency', 'Antenna', '', gpsGroup);
  mk(new THREE.CylinderGeometry(1.2, 1.2, 0.4, 20), PM(0xd0d5dd, 1, 0.2), 0, 5.6, -3.0, 'Antenna Feed Element', 'Silver central resonance feed point', 'Feed', '', gpsGroup);

  // Backup Coin Battery
  mk(new THREE.CylinderGeometry(3.0, 3.0, 1.8, 24), PM(0xc8ccd2, 1, 0.25), -7.5, 1.8, 9.5, 'MS621FE Rechargeable Battery', 'Provides RTC and SRAM backup for warm/hot instant GPS fix', 'Battery', '3V', gpsGroup);

  // 4 Gold Header Pins (VCC, GND, TXD, RXD)
  const pins = [
    { x: -4.5, name: 'VCC', desc: 'Power Supply Input (3.3V – 5V with onboard regulator)', type: 'Power In', v: '3.3V–5V', c: '#ef4444' },
    { x: -1.5, name: 'GND', desc: 'Circuit Ground', type: 'Ground', v: '0V', c: '#94a3b8' },
    { x: 1.5, name: 'TXD', desc: 'UART Transmit Pin (Sends NMEA GPS sentences at 9600 baud to MCU RX)', type: 'Serial TX', v: '3.3V', c: '#10b981' },
    { x: 4.5, name: 'RXD', desc: 'UART Receive Pin (Connect to MCU TX for configuration)', type: 'Serial RX', v: '3.3V', c: '#06b6d4' },
  ];

  pins.forEach((p) => {
    mk(B(0.64, 8, 0.64), gold, p.x, -4.5, 12.5, p.name, p.desc, p.type, p.v, root);
    const s = makeCalloutTag(p.name, p.c, 3.8, 1.6, 28);
    s.position.set(p.x, -9.5, 12.8);
    s.userData = { name: `${p.name} Pin`, desc: p.desc, pinType: p.type, voltage: p.v, color: p.c };
    labels.add(s);
  });

  return {
    root,
    parts,
    groups,
    labels,
    cameraPos: [-32, 34, 46],
    target: [0, 2, 0],
    minDistance: 15,
    maxDistance: 100,
  };
}

// ─── 13. RFID RC522 Module ──────────────────────────────────────────────────
export function buildRFID(options = {}) {
  const ctx = createModelContext();
  const { root, parts, groups, labels, G, mk } = ctx;

  const bluePCB = PM(0x133e68, 0, 0.35, { clearcoat: 0.3 }); // Dark navy blue PCB
  const gold = PM(0xe0b04a, 1, 0.28);
  const qfnChip = PM(0x111317, 0, 0.45);

  const rfidGroup = G([0, 0, 0]);

  // PCB Board
  mk(rb(26, 1.4, 40, 0.2), bluePCB, 0, 0, 0, 'RC522 RFID PCB', '13.56 MHz contactless reader carrier board', 'PCB', '', rfidGroup);

  // Concentric silkscreen circular loop antenna pattern on card zone
  const loopMat = PM(0xffffff, 0, 0.4);
  for (let r = 5; r <= 10; r += 1.8) {
    const ring = new THREE.RingGeometry(r, r + 0.35, 36);
    ring.rotateX(-Math.PI / 2);
    mk(ring, loopMat, 0, 0.72, 8, `Antenna Coil Loop ${r}`, '13.56 MHz electromagnetic coupling induction antenna', 'Loop', '', rfidGroup);
  }

  // MFRC522 IC
  mk(rb(6, 1.0, 6, 0.08), qfnChip, 0, 1.2, -10, 'MFRC522 Transceiver IC', 'Philips/NXP highly integrated 13.56MHz contactless reader chip', 'Reader IC', '3.3V', rfidGroup);

  // Quartz Crystal Oscillator (Silver metallic can)
  mk(rb(3.2, 1.5, 7.5, 0.2), PM(0xd0d5dd, 1, 0.2), -7.5, 1.4, -10, '27.12 MHz Crystal', 'Precision clock reference', 'Crystal', '', rfidGroup);

  // 8 Gold Header Pins (SDA, SCK, MOSI, MISO, IRQ, GND, RST, 3.3V)
  const pins = [
    { x: -5.6, name: 'SDA', desc: 'SPI Chip Select / Slave Select (CS / SS)', type: 'SPI CS', v: '3.3V', c: '#f59e0b' },
    { x: -4.0, name: 'SCK', desc: 'SPI Serial Clock Bus Line', type: 'SPI Clock', v: '3.3V', c: '#f59e0b' },
    { x: -2.4, name: 'MOSI', desc: 'SPI Master Out Slave In', type: 'SPI MOSI', v: '3.3V', c: '#06b6d4' },
    { x: -0.8, name: 'MISO', desc: 'SPI Master In Slave Out', type: 'SPI MISO', v: '3.3V', c: '#06b6d4' },
    { x: 0.8, name: 'IRQ', desc: 'Interrupt Output Pin', type: 'Interrupt', v: '3.3V', c: '#8b5cf6' },
    { x: 2.4, name: 'GND', desc: 'Circuit Ground', type: 'Ground', v: '0V', c: '#94a3b8' },
    { x: 4.0, name: 'RST', desc: 'Hardware Reset / Power-Down Input', type: 'Reset', v: '3.3V', c: '#ec4899' },
    { x: 5.6, name: '3.3V', desc: 'Power Supply (⚠️ 3.3V ONLY! 5V will burn chip)', type: 'Power In', v: '3.3V', c: '#ef4444' },
  ];

  pins.forEach((p) => {
    mk(B(0.58, 8, 0.58), gold, p.x, -4.5, -18.5, p.name, p.desc, p.type, p.v, root);
    const s = makeCalloutTag(p.name, p.c, 3.4, 1.5, 26);
    s.position.set(p.x, -9.5, -18.8);
    s.userData = { name: `${p.name} Pin`, desc: p.desc, pinType: p.type, voltage: p.v, color: p.c };
    labels.add(s);
  });

  return {
    root,
    parts,
    groups,
    labels,
    cameraPos: [-36, 42, 48],
    target: [0, 0, 0],
    minDistance: 16,
    maxDistance: 110,
  };
}

// ─── 14. Raspberry Pi 4 Model B ─────────────────────────────────────────────
export function buildRaspberryPi4(options = {}) {
  const ctx = createModelContext();
  const { root, parts, groups, labels, G, mk } = ctx;

  const rpiGreen = PM(0x15803d, 0, 0.4, { clearcoat: 0.3 }); // Emerald Pi Green PCB
  const silverMetal = PM(0xd0d5dd, 1, 0.25);
  const gold = PM(0xe0b04a, 1, 0.28);
  const blackPlastic = PM(0x18191c, 0, 0.6);
  const blueUSB = PM(0x1d4ed8, 0, 0.4);

  const piGroup = G([0, 0, 0]);

  // Main PCB (85 x 56 mm)
  mk(rb(48, 1.6, 34, 0.3), rpiGreen, 0, 0, 0, 'Raspberry Pi 4 PCB', 'High-density 6-layer FR4 motherboard', 'Motherboard', '', piGroup);

  // Broadcom BCM2711 SoC CPU (Silver heatspreader)
  mk(rb(9, 1.4, 9, 0.1), silverMetal, -4, 1.5, 0, 'Broadcom BCM2711 SoC', 'Quad-core ARM Cortex-A72 (ARM v8) 64-bit SoC @ 1.5GHz', 'CPU SoC', '', piGroup);

  // LPDDR4 SDRAM IC
  mk(rb(6, 1.0, 6, 0.08), blackPlastic, -4, 1.3, -9, 'LPDDR4 SDRAM', '2GB / 4GB / 8GB high-speed memory chip', 'RAM', '', piGroup);

  // Gigabit Ethernet RJ45 metal jack (right top)
  mk(B(11, 8.5, 10), silverMetal, 18, 5.0, -11, 'Gigabit Ethernet Port', 'Full-throughput true Gigabit RJ45 port with PoE header pins', 'Ethernet', '', piGroup);

  // USB 3.0 dual stack (blue interior, middle right)
  mk(B(11, 8.5, 9), silverMetal, 18, 5.0, 0, 'Dual USB 3.0 Ports', 'SuperSpeed USB 3.0 ports with up to 5Gbps transfer bandwidth', 'USB 3.0', '', piGroup);
  mk(B(1.0, 1.8, 5.0), blueUSB, 23.6, 6.2, 0, 'USB 3.0 Blue Key', 'USB 3.0 standard color indicator', 'Port', '', piGroup);

  // USB 2.0 dual stack (black interior, bottom right)
  mk(B(11, 8.5, 9), silverMetal, 18, 5.0, 10.5, 'Dual USB 2.0 Ports', 'High-speed USB 2.0 peripheral ports', 'USB 2.0', '', piGroup);

  // Dual micro-HDMI ports (silver metal along bottom edge)
  mk(B(5.5, 2.8, 4.5), silverMetal, -6.5, 2.0, 15, 'Micro-HDMI 0', '4Kp60 video output port', 'HDMI', '', piGroup);
  mk(B(5.5, 2.8, 4.5), silverMetal, 2.5, 2.0, 15, 'Micro-HDMI 1', 'Dual 4K display output', 'HDMI', '', piGroup);

  // USB-C Power Port
  mk(B(6.0, 2.8, 4.5), silverMetal, -16.5, 2.0, 15, 'USB-C Power In', '5V / 3.0A DC power supply input', 'Power', '5V 3A', piGroup);

  // 40-Pin GPIO Header (Dual row 2x20 gold pins along top edge)
  mk(rb(28, 4.2, 3.8, 0.1), blackPlastic, -4, 2.8, -14.5, '40-Pin GPIO Header Block', 'Standard Raspberry Pi 40-pin general-purpose I/O header', 'GPIO', '', piGroup);

  const piPins = [
    { x: -16, name: '3.3V', desc: 'Pin 1 · 3.3V Power Out', type: 'Power', v: '3.3V', c: '#f59e0b' },
    { x: -14, name: '5V', desc: 'Pin 2 / 4 · 5V Power Supply', type: 'Power', v: '5V', c: '#ef4444' },
    { x: -10, name: 'SDA', desc: 'GPIO 2 · I2C Data bus', type: 'I2C Data', v: '3.3V', c: '#06b6d4' },
    { x: -6, name: 'SCL', desc: 'GPIO 3 · I2C Clock bus', type: 'I2C Clock', v: '3.3V', c: '#06b6d4' },
    { x: -2, name: 'GND', desc: 'Pin 6 / 9 / 14 / 20 / 25 · Ground', type: 'Ground', v: '0V', c: '#94a3b8' },
    { x: 2, name: 'TXD', desc: 'GPIO 14 · UART Transmit', type: 'UART TX', v: '3.3V', c: '#10b981' },
    { x: 6, name: 'RXD', desc: 'GPIO 15 · UART Receive', type: 'UART RX', v: '3.3V', c: '#8b5cf6' },
  ];

  piPins.forEach((p) => {
    mk(B(0.5, 5.5, 0.5), gold, p.x, 3.5, -14.5, p.name, p.desc, p.type, p.v, root);
    const s = makeCalloutTag(p.name, p.c, 3.6, 1.5, 26);
    s.position.set(p.x, 8.5, -16.5);
    s.userData = { name: `Pi Pin ${p.name}`, desc: p.desc, pinType: p.type, voltage: p.v, color: p.c };
    labels.add(s);
  });

  return {
    root,
    parts,
    groups,
    labels,
    cameraPos: [-42, 44, 52],
    target: [0, 2, 0],
    minDistance: 18,
    maxDistance: 130,
  };
}

// ─── 15. ESP32-CAM Development Board ────────────────────────────────────────
export function buildESP32CAM(options = {}) {
  const ctx = createModelContext();
  const { root, parts, groups, labels, G, mk } = ctx;

  const blackPCB = PM(0x18191c, 0, 0.45);
  const gold = PM(0xe0b04a, 1, 0.28);
  const flexYellow = PM(0xd97706, 0, 0.4); // Yellow FPC ribbon cable
  const camLensMat = PM(0x0f1115, 0, 0.2);

  const camGroup = G([0, 0, 0]);

  // Main Black PCB
  mk(rb(20, 1.4, 28, 0.2), blackPCB, 0, 0, 0, 'ESP32-CAM PCB', 'Compact AI camera IoT development board', 'PCB', '', camGroup);

  // Yellow Flex Ribbon Cable holding the camera
  mk(B(10, 0.3, 12), flexYellow, 0, 0.9, -4, 'FPC Camera Flex Cable', 'Flexible flat printed circuit interconnect', 'FPC Cable', '', camGroup);

  // OV2640 Camera Cube Housing
  mk(rb(8.5, 4.5, 8.5, 0.2), camLensMat, 0, 3.2, -4, 'OV2640 2MP Camera Sensor', 'OmniVision 2-Megapixel UXGA image sensor module', 'Camera', '', camGroup);
  // Glass Lens Ring
  mk(new THREE.CylinderGeometry(2.8, 2.8, 1.2, 32), PM(0x050608, 0, 0.1), 0, 5.8, -4, 'Optical Lens Ring', 'High clarity optical lens aperture with focal ring', 'Lens', '', camGroup);

  // Super-bright White/Yellow Flash SMD LED
  mk(B(2.4, 1.2, 2.4), PM(0xfef08a, 0, 0.2, { emissive: 0xfef08a, emissiveIntensity: 0.6 }), -6.5, 1.3, 6, 'High-Power Flash LED', 'Onboard flashlight / night-vision illumination LED', 'Flash', '', camGroup);

  // Tactile Reset button
  mk(rb(2.8, 1.6, 2.8, 0.1), PM(0xd0d5dd, 1, 0.3), 6.5, 1.4, 6, 'Reset Switch', 'Hardware restart button', 'Button', '', camGroup);

  // Dual Row Header Pins (8 on left, 8 on right)
  const leftPins = [
    { z: -10, name: '5V', desc: '5V Power Input (Required for reliable camera streaming)', c: '#ef4444' },
    { z: -7, name: 'GND', desc: 'Ground', c: '#94a3b8' },
    { z: -4, name: 'U0R', desc: 'UART RX0 (Connect to USB-TTL TX)', c: '#06b6d4' },
    { z: -1, name: 'U0T', desc: 'UART TX0 (Connect to USB-TTL RX)', c: '#10b981' },
    { z: 2, name: 'IO0', desc: 'GPIO 0 · Connect to GND to enter flash upload mode', c: '#f59e0b' },
    { z: 5, name: 'RST', desc: 'Hardware Reset', c: '#ec4899' },
    { z: 8, name: '3.3V', desc: '3.3V Output', c: '#f59e0b' },
  ];

  leftPins.forEach((p) => {
    mk(B(0.64, 8, 0.64), gold, -8.5, -4.5, p.z, p.name, p.desc, 'Pin', '', root);
    const s = makeCalloutTag(p.name, p.c, 3.4, 1.5, 26);
    s.position.set(-13, -9.0, p.z);
    s.userData = { name: `${p.name} Pin`, desc: p.desc, pinType: 'Pin', voltage: '3.3V/5V', color: p.c };
    labels.add(s);
  });

  return {
    root,
    parts,
    groups,
    labels,
    cameraPos: [-32, 34, 46],
    target: [0, 1, 0],
    minDistance: 15,
    maxDistance: 100,
  };
}

// ─── 16. ESP8266 (NodeMCU v2) ───────────────────────────────────────────────
export function buildESP8266(options = {}) {
  const ctx = createModelContext();
  const { root, parts, groups, labels, G, mk } = ctx;

  const blackPCB = PM(0x18191c, 0, 0.45);
  const silverShield = PM(0xd0d5dd, 1, 0.25);
  const gold = PM(0xe0b04a, 1, 0.28);

  const espGroup = G([0, 0, 0]);

  // Narrow Black PCB
  mk(rb(22, 1.4, 44, 0.2), blackPCB, 0, 0, 0, 'ESP8266 NodeMCU PCB', 'Tensilica 32-bit Wi-Fi IoT development board', 'PCB', '', espGroup);

  // Silver ESP-12E RF Shield Can
  mk(rb(14, 2.2, 18, 0.1), silverShield, 0, 1.8, 6, 'ESP-12E Metal RF Shield', 'FCC certified RF shielded module housing ESP8266EX chip + 4MB SPI Flash', 'RF Shield', '', espGroup);

  // Serpentine PCB copper antenna trace on top edge
  const antMat = PM(0xe0b04a, 1, 0.25);
  mk(B(12, 0.2, 4), antMat, 0, 0.8, -16.5, '2.4 GHz Meandered Inverted-F Antenna', 'Onboard PCB copper trace Wi-Fi antenna', 'Antenna', '', espGroup);

  // Micro USB connector at bottom
  mk(B(7, 3, 5), silverShield, 0, 1.8, 20, 'Micro-USB Connector', 'Power and programming serial communication port', 'USB', '5V', espGroup);

  // Key pins callouts
  const pins = [
    { x: -9.5, z: -16, name: 'VIN', desc: '5V Power Supply Input', c: '#ef4444' },
    { x: -9.5, z: -12, name: 'GND', desc: 'Ground Reference', c: '#94a3b8' },
    { x: -9.5, z: -4, name: 'D1 (SCL)', desc: 'GPIO 5 · I2C SCL Clock', c: '#f59e0b' },
    { x: -9.5, z: 0, name: 'D2 (SDA)', desc: 'GPIO 4 · I2C SDA Data', c: '#06b6d4' },
    { x: 9.5, z: -16, name: '3V3', desc: '3.3V Output from onboard regulator', c: '#f59e0b' },
    { x: 9.5, z: -12, name: 'RST', desc: 'Active-low Reset Pin', c: '#ec4899' },
    { x: 9.5, z: 4, name: 'TXD', desc: 'UART0 Transmit (GPIO 1)', c: '#10b981' },
    { x: 9.5, z: 8, name: 'RXD', desc: 'UART0 Receive (GPIO 3)', c: '#8b5cf6' },
  ];

  pins.forEach((p) => {
    mk(B(0.64, 8, 0.64), gold, p.x, -4.5, p.z, p.name, p.desc, 'Pin', '', root);
    const s = makeCalloutTag(p.name, p.c, 3.6, 1.5, 26);
    s.position.set(p.x > 0 ? p.x + 4.5 : p.x - 4.5, -9.0, p.z);
    s.userData = { name: `${p.name} Pin`, desc: p.desc, pinType: 'Pin', voltage: '3.3V/5V', color: p.c };
    labels.add(s);
  });

  return {
    root,
    parts,
    groups,
    labels,
    cameraPos: [-36, 38, 48],
    target: [0, 1, 0],
    minDistance: 16,
    maxDistance: 110,
  };
}

// ─── 17. HC-05 Bluetooth Module ─────────────────────────────────────────────
export function buildHC05(options = {}) {
  const ctx = createModelContext();
  const { root, parts, groups, labels, G, mk } = ctx;

  const bluePCB = PM(0x1d4ed8, 0, 0.35, { clearcoat: 0.3 });
  const greenSub = PM(0x16a34a, 0, 0.35); // Castellated green daughterboard
  const gold = PM(0xe0b04a, 1, 0.28);

  const btGroup = G([0, 0, 0]);

  // Blue base carrier board
  mk(rb(16, 1.4, 34, 0.2), bluePCB, 0, 0, 0, 'HC-05 Carrier Board', 'Breakout board with 3.3V LDO regulator and level shifting', 'PCB', '', btGroup);

  // Green Bluetooth submodule soldered on top
  mk(rb(13, 0.8, 24, 0.1), greenSub, 0, 1.1, -2, 'CSR BC417 Bluetooth 2.0 Module', 'Green castellated submodule containing CSR BlueCore chip + 8MB Flash', 'Module', '', btGroup);

  // Gold meandering chip antenna at top of submodule
  mk(B(8, 0.2, 3.5), gold, 0, 1.6, -12, '2.4 GHz Bluetooth Antenna', 'Trace antenna for wireless pairing up to 10 meters', 'Antenna', '', btGroup);

  // Mode push button for AT Command mode
  mk(rb(2.5, 1.5, 2.5, 0.1), PM(0xd0d5dd, 1, 0.3), 5.5, 1.4, 8, 'AT Mode Push Button', 'Hold while powering up to enter 38400 baud AT configuration mode', 'Button', '', btGroup);

  // 6 Gold Header Pins (EN, VCC, GND, TXD, RXD, STATE)
  const pins = [
    { x: -5.0, name: 'EN', desc: 'Enable / KEY (HIGH enters AT command mode)', c: '#f59e0b' },
    { x: -3.0, name: 'VCC', desc: 'Power Supply Input (5V)', c: '#ef4444' },
    { x: -1.0, name: 'GND', desc: 'Ground', c: '#94a3b8' },
    { x: 1.0, name: 'TXD', desc: 'UART Transmit Pin (Connect to MCU RX)', c: '#10b981' },
    { x: 3.0, name: 'RXD', desc: 'UART Receive Pin (Connect to MCU TX, 3.3V level)', c: '#06b6d4' },
    { x: 5.0, name: 'STATE', desc: 'State Output (HIGH when paired, pulses when disconnected)', c: '#8b5cf6' },
  ];

  pins.forEach((p) => {
    mk(B(0.64, 8, 0.64), gold, p.x, -4.5, 15.5, p.name, p.desc, 'Pin', '', root);
    const s = makeCalloutTag(p.name, p.c, 3.4, 1.5, 26);
    s.position.set(p.x, -9.5, 15.8);
    s.userData = { name: `${p.name} Pin`, desc: p.desc, pinType: 'Pin', voltage: '3.3V/5V', color: p.c };
    labels.add(s);
  });

  return {
    root,
    parts,
    groups,
    labels,
    cameraPos: [-32, 34, 46],
    target: [0, 0, 0],
    minDistance: 15,
    maxDistance: 100,
  };
}

// ─── 18. nRF24L01+ 2.4GHz RF Module ─────────────────────────────────────────
export function buildNRF24L01(options = {}) {
  const ctx = createModelContext();
  const { root, parts, groups, labels, G, mk } = ctx;

  const blackPCB = PM(0x18191c, 0, 0.45);
  const gold = PM(0xe0b04a, 1, 0.28);
  const qfnChip = PM(0x111317, 0, 0.45);

  const rfGroup = G([0, 0, 0]);

  // Compact Black PCB
  mk(rb(15, 1.4, 28, 0.2), blackPCB, 0, 0, 0, 'nRF24L01 PCB', 'Compact 2.4GHz ultra low-power RF transceiver', 'PCB', '', rfGroup);

  // Iconic Etched Zig-Zag Serpentine PCB Trace Antenna at top
  mk(B(11, 0.2, 5.5), gold, 0, 0.8, -10, 'Zig-Zag Trace Antenna', 'Meandered dipole PCB antenna tuned to 2.4 GHz ISM band', 'Antenna', '', rfGroup);

  // Nordic nRF24L01+ Transceiver IC
  mk(rb(4.5, 0.8, 4.5, 0.08), qfnChip, 0, 1.1, -1, 'Nordic nRF24L01+ IC', 'Single chip 2.4GHz transceiver with Enhanced ShockBurst packet engine', 'Transceiver IC', '3.3V', rfGroup);

  // 16 MHz Quartz Crystal (Silver cylindrical can)
  mk(new THREE.CylinderGeometry(1.2, 1.2, 5.5, 16), PM(0xd0d5dd, 1, 0.2), -4.5, 1.4, 0, '16 MHz Crystal', 'Precision reference oscillator', 'Crystal', '', rfGroup);

  // 2x4 Header pins (VCC, GND, CE, CSN, SCK, MOSI, MISO, IRQ)
  const pins = [
    { x: -3.5, z: 8.5, name: 'GND', desc: 'Ground Reference', c: '#94a3b8' },
    { x: 3.5, z: 8.5, name: 'VCC', desc: '⚠️ Power Supply 3.3V ONLY! (5V will destroy chip)', c: '#ef4444' },
    { x: -3.5, z: 10.5, name: 'CE', desc: 'Chip Enable (Activates RX or TX mode)', c: '#f59e0b' },
    { x: 3.5, z: 10.5, name: 'CSN', desc: 'SPI Chip Select Not (Active LOW)', c: '#f59e0b' },
    { x: -3.5, z: 12.5, name: 'SCK', desc: 'SPI Clock Line', c: '#06b6d4' },
    { x: 3.5, z: 12.5, name: 'MOSI', desc: 'SPI Master Out Slave In', c: '#06b6d4' },
    { x: -3.5, z: 14.5, name: 'MISO', desc: 'SPI Master In Slave Out', c: '#10b981' },
    { x: 3.5, z: 14.5, name: 'IRQ', desc: 'Interrupt Request Pin (Active LOW)', c: '#8b5cf6' },
  ];

  pins.forEach((p) => {
    mk(B(0.64, 8, 0.64), gold, p.x, -4.5, p.z, p.name, p.desc, 'Pin', '', root);
    const s = makeCalloutTag(p.name, p.c, 3.2, 1.4, 26);
    s.position.set(p.x > 0 ? p.x + 4.5 : p.x - 4.5, -9.0, p.z);
    s.userData = { name: `${p.name} Pin`, desc: p.desc, pinType: 'Pin', voltage: '3.3V', color: p.c };
    labels.add(s);
  });

  return {
    root,
    parts,
    groups,
    labels,
    cameraPos: [-30, 32, 42],
    target: [0, 0, 0],
    minDistance: 14,
    maxDistance: 95,
  };
}

// ─── 19. SIM800L GSM / GPRS Module ──────────────────────────────────────────
export function buildSIM800L(options = {}) {
  const ctx = createModelContext();
  const { root, parts, groups, labels, G, mk } = ctx;

  const redPCB = PM(0xd92d20, 0, 0.35, { clearcoat: 0.3 }); // Red mini PCB
  const gold = PM(0xe0b04a, 1, 0.28);
  const goldShield = PM(0xd4af37, 1, 0.3);

  const gsmGroup = G([0, 0, 0]);

  // Red PCB
  mk(rb(20, 1.4, 22, 0.2), redPCB, 0, 0, 0, 'SIM800L Red PCB', 'Micro SIM GSM/GPRS breakout board', 'PCB', '', gsmGroup);

  // Gold SIM800L Shield Module in center
  mk(rb(15, 2.2, 15, 0.1), goldShield, 0, 1.8, 1.5, 'SIM800L Gold Shield Can', 'Quad-Band 850/900/1800/1900MHz GSM/GPRS module capable of SMS, calls & data', 'GSM Core', '3.7V–4.2V', gsmGroup);

  // Coiled Helical Gold Wire Spring Antenna
  const coilGroup = new THREE.Group();
  for (let i = 0; i < 9; i++) {
    const ring = new THREE.TorusGeometry(1.6, 0.3, 12, 24);
    ring.rotateX(Math.PI / 2);
    const ringMesh = new THREE.Mesh(ring, gold);
    ringMesh.position.set(0, i * 1.5, 0);
    coilGroup.add(ringMesh);
  }
  coilGroup.position.set(-6.5, 3.5, -8.0);
  gsmGroup.add(coilGroup);

  // 6 Gold Header Pins (VCC, GND, TXD, RXD, RST, NET)
  const pins = [
    { x: -5.0, name: 'VCC', desc: 'Power Supply (3.7V – 4.2V LiPo battery · Needs up to 2A burst current)', c: '#ef4444' },
    { x: -3.0, name: 'GND', desc: 'Ground Reference', c: '#94a3b8' },
    { x: -1.0, name: 'TXD', desc: 'UART Transmit (Connect to MCU RX)', c: '#10b981' },
    { x: 1.0, name: 'RXD', desc: 'UART Receive (Requires voltage divider from 5V MCU)', c: '#06b6d4' },
    { x: 3.0, name: 'RST', desc: 'Hardware Reset Pin', c: '#ec4899' },
    { x: 5.0, name: 'NET', desc: 'Network Status Antenna Signal', c: '#f59e0b' },
  ];

  pins.forEach((p) => {
    mk(B(0.64, 8, 0.64), gold, p.x, -4.5, 9.5, p.name, p.desc, 'Pin', '', root);
    const s = makeCalloutTag(p.name, p.c, 3.4, 1.5, 26);
    s.position.set(p.x, -9.5, 9.8);
    s.userData = { name: `${p.name} Pin`, desc: p.desc, pinType: 'Pin', voltage: '3.7V–4.2V', color: p.c };
    labels.add(s);
  });

  return {
    root,
    parts,
    groups,
    labels,
    cameraPos: [-32, 34, 44],
    target: [0, 2, 0],
    minDistance: 15,
    maxDistance: 100,
  };
}

// ─── 20. Mini Brushed DC Motor ──────────────────────────────────────────────
export function buildDCMotor(options = {}) {
  const ctx = createModelContext();
  const { root, parts, groups, labels, G, mk } = ctx;

  const tin = PM(0xd0d5dd, 1, 0.2);
  const silverCan = PM(0xe2e8f0, 1, 0.2); // Polished metal cylindrical can
  const brass = PM(0xc8963e, 1, 0.3); // Front bearing boss

  const motorGroup = G([0, 0, 0]);

  // Cylindrical metallic can body
  const bodyGeo = new THREE.CylinderGeometry(6.5, 6.5, 18, 36);
  bodyGeo.rotateX(Math.PI / 2);
  mk(bodyGeo, silverCan, 0, 0, 0, 'DC Motor Steel Casing', 'Standard 130-size hobby DC permanent magnet motor', 'Stator Can', '', motorGroup);

  // Front brass bearing collar
  const bearingGeo = new THREE.CylinderGeometry(2.4, 2.4, 2.5, 24);
  bearingGeo.rotateX(Math.PI / 2);
  mk(bearingGeo, brass, 0, 0, 9.8, 'Bronze Oilite Bushing', 'Front sintered bronze drive shaft bearing', 'Bearing', '', motorGroup);

  // Output drive shaft (shiny silver rotating shaft)
  const shaftGeo = new THREE.CylinderGeometry(1.0, 1.0, 10, 24);
  shaftGeo.rotateX(Math.PI / 2);
  mk(shaftGeo, PM(0xf8fafc, 1, 0.15), 0, 0, 15, 'Hardened Steel Output Shaft', '2mm diameter steel rotating drive shaft for gears and wheels', 'Shaft', '', motorGroup);

  // Rear molded plastic endcap
  const capGeo = new THREE.CylinderGeometry(6.4, 6.4, 2.2, 36);
  capGeo.rotateX(Math.PI / 2);
  mk(capGeo, PM(0x18191c, 0, 0.6), 0, 0, -9.5, 'Plastic Commutator Endcap', 'Molded endcap carrying carbon/copper brush assemblies', 'Endcap', '', motorGroup);

  // Solder terminal tabs with red (+) and black (-) wires
  mk(B(1.6, 0.4, 3.5), tin, -3.2, 0, -11.5, 'Terminal 1 (+)', 'Positive solder tab', 'Terminal', '', motorGroup);
  mk(B(1.6, 0.4, 3.5), tin, 3.2, 0, -11.5, 'Terminal 2 (–)', 'Negative solder tab', 'Terminal', '', motorGroup);

  // Flexible Red Wire
  mk(new THREE.CylinderGeometry(0.6, 0.6, 12, 16), PM(0xef4444, 0, 0.4), -3.2, -6, -12, 'Red Wire (+)', 'Positive supply wire (+3V to +6V)', 'Wire', '+V', root);
  // Flexible Black Wire
  mk(new THREE.CylinderGeometry(0.6, 0.6, 12, 16), PM(0x18191c, 0, 0.6), 3.2, -6, -12, 'Black Wire (–)', 'Negative supply wire (GND)', 'Wire', 'GND', root);

  // Callouts
  const pPos = makeCalloutTag('Terminal 1 (+)', '#ef4444', 5.0, 1.8, 28);
  pPos.position.set(-3.2, -13, -12);
  pPos.userData = { name: 'Terminal 1 (+ Positive)', desc: 'Connect to Motor Driver (L298N/L293D) or positive voltage (3V–6V DC)', pinType: 'Positive', voltage: '3V–6V', color: '#ef4444' };
  labels.add(pPos);

  const pNeg = makeCalloutTag('Terminal 2 (–)', '#3b82f6', 5.0, 1.8, 28);
  pNeg.position.set(3.2, -13, -12);
  pNeg.userData = { name: 'Terminal 2 (– Negative)', desc: 'Connect to Motor Driver or circuit Ground (Reversing polarity reverses rotation direction)', pinType: 'Negative', voltage: 'GND', color: '#3b82f6' };
  labels.add(pNeg);

  return {
    root,
    parts,
    groups,
    labels,
    cameraPos: [-30, 24, 36],
    target: [0, 0, 2],
    minDistance: 14,
    maxDistance: 95,
  };
}

// ─── 21. Solderless Breadboard (Half-Size 400 Tie-Points) ────────────────────
export function buildBreadboard(options = {}) {
  const ctx = createModelContext();
  const { root, parts, groups, labels, G, mk } = ctx;

  const whiteABS = PM(0xf8fafc, 0, 0.45);
  const tin = PM(0x8a929e, 1, 0.3);

  const bbGroup = G([0, 0, 0]);

  // Main white plastic breadboard body (400 tie-points)
  mk(rb(46, 5.0, 28, 0.2), whiteABS, 0, 0, 0, 'Breadboard Housing Body', 'Impact-resistant white ABS plastic solderless breadboard body', 'Breadboard', '', bbGroup);

  // Central IC separation groove
  mk(B(42, 1.0, 1.8), PM(0xe2e8f0, 0, 0.6), 0, 2.2, 0, 'Central IC Isolation Trough', 'Standard 0.3-inch gap preventing DIP IC pins from shorting together', 'Channel', '', bbGroup);

  // Red (+) Power Rail Silk Lines
  mk(B(40, 0.1, 0.6), PM(0xef4444, 0, 0.3), 0, 2.55, -11.5, 'Positive Red Rail Line (+)', 'Positive voltage distribution bus line', 'Power Rail', '+V', bbGroup);
  mk(B(40, 0.1, 0.6), PM(0xef4444, 0, 0.3), 0, 2.55, 11.5, 'Positive Red Rail Line (+)', 'Positive voltage distribution bus line', 'Power Rail', '+V', bbGroup);

  // Blue (–) Ground Rail Silk Lines
  mk(B(40, 0.1, 0.6), PM(0x3b82f6, 0, 0.3), 0, 2.55, -10.0, 'Negative Blue Rail Line (–)', 'Ground (GND) distribution bus line', 'Ground Rail', 'GND', bbGroup);
  mk(B(40, 0.1, 0.6), PM(0x3b82f6, 0, 0.3), 0, 2.55, 10.0, 'Negative Blue Rail Line (–)', 'Ground (GND) distribution bus line', 'Ground Rail', 'GND', bbGroup);

  // Grid holes / tie-points samples
  [-16, -10, -4, 2, 8, 14].forEach((x) => {
    [-6, -4, -2, 2, 4, 6].forEach((z) => {
      mk(B(0.9, 0.4, 0.9), tin, x, 2.45, z, `Tie Point (${x}, ${z})`, 'Phosphor bronze spring clip socket (2.54mm pitch)', 'Tie Socket', '', bbGroup);
    });
  });

  // Callouts
  const pRed = makeCalloutTag('Red Line (+V)', '#ef4444', 4.6, 1.7, 28);
  pRed.position.set(-14, 5.5, -12);
  pRed.userData = { name: 'Positive Power Rail (+)', desc: 'Vertically/horizontally connected rail for +3.3V or +5V supply', pinType: 'Power', voltage: '+V', color: '#ef4444' };
  labels.add(pRed);

  const pBlue = makeCalloutTag('Blue Line (GND)', '#3b82f6', 4.8, 1.7, 28);
  pBlue.position.set(14, 5.5, 12);
  pBlue.userData = { name: 'Ground Power Rail (–)', desc: 'Continuous bus rail for circuit Ground (0V)', pinType: 'Ground', voltage: '0V (GND)', color: '#3b82f6' };
  labels.add(pBlue);

  const pRow = makeCalloutTag('Tie Rows (A–E)', '#10b981', 4.8, 1.7, 28);
  pRow.position.set(0, 5.5, -5);
  pRow.userData = { name: 'Terminal Strip Rows', desc: 'Sets of 5 holes connected electrically under the surface', pinType: 'Terminal', voltage: 'Signal', color: '#10b981' };
  labels.add(pRow);

  return {
    root,
    parts,
    groups,
    labels,
    cameraPos: [-38, 38, 46],
    target: [0, 0, 0],
    minDistance: 18,
    maxDistance: 120,
  };
}

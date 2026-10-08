import * as THREE from 'three';
export { cvs, tex, PM, rb, B, makeCalloutTag, createModelContext } from './modelUtils.js';
import { cvs, tex, PM, rb, B, makeCalloutTag, createModelContext } from './modelUtils.js';

import {
  buildLED,
  buildResistor,
  buildCapacitor,
  buildPushButton,
  buildPotentiometer,
  buildBuzzer,
  buildBMP280,
  buildIRSensor,
  buildMQ2,
  buildMPU6050,
  buildSoilMoisture,
  buildGPS,
  buildRFID,
  buildRaspberryPi4,
  buildESP32CAM,
  buildESP8266,
  buildHC05,
  buildNRF24L01,
  buildSIM800L,
  buildDCMotor,
  buildBreadboard,
} from './additionalModels.js';

// ─── 1. ESP32 DevKit (ESP-WROOM-32) ─────────────────────────────────────────

export function buildESP32(options = {}) {
  const ctx = createModelContext();
  const { root, parts, groups, labels, G, mk } = ctx;

  const mask = PM(0x0a0b0e, 0, 0.38, { clearcoat: 0.5, clearcoatRoughness: 0.35 });
  const gold = PM(0xe0b04a, 1, 0.28);
  const tin = PM(0xd5d8dc, 1, 0.32);
  const plastic = PM(0x0b0b0c, 0, 0.55);
  const chip = PM(0x101114, 0, 0.5, { clearcoat: 0.3 });

  const gMod = G(10);
  const gChip = G(6);
  const gUsb = G(4);
  const gBtn = G(4);

  // Pinout arrays (38 pins total)
  const L = ['3V3', 'EN', 'VP 36', 'VN 39', '34', '35', '32', '33', '25', '26', '27', '14', '12', 'GND', '13', 'SD2', 'SD3', 'CMD', '5V'];
  const R = ['GND', '23', '22', 'TX0', 'RX0', '21', 'GND', '19', '18', '5', '17', '16', '4', '0', '2', '15', 'SD1', 'SD0', 'CLK'];

  const pinInfoESP32 = {
    '3V3': { desc: '3.3V Regulated Output (up to 500mA for sensors)', type: 'Power', v: '3.3V', c: '#ff4a4a' },
    'EN': { desc: 'Enable / Reset Pin. Active LOW to reset ESP32 chip.', type: 'System', v: '3.3V', c: '#a06be0' },
    'VP 36': { desc: 'GPIO36 (ADC1_CH0, RTC_GPIO0). Input Only. Low noise.', type: 'Analog In', v: '3.3V max', c: '#00e5ff' },
    'VN 39': { desc: 'GPIO39 (ADC1_CH3, RTC_GPIO3). Input Only. Low noise.', type: 'Analog In', v: '3.3V max', c: '#00e5ff' },
    '34': { desc: 'GPIO34 (ADC1_CH6, RTC_GPIO4). Input Only. No pullup.', type: 'Analog In', v: '3.3V max', c: '#00e5ff' },
    '35': { desc: 'GPIO35 (ADC1_CH7, RTC_GPIO5). Input Only. No pullup.', type: 'Analog In', v: '3.3V max', c: '#00e5ff' },
    '32': { desc: 'GPIO32 (ADC1_CH4, TOUCH9, RTC9). General I/O, PWM.', type: 'GPIO/Touch', v: '3.3V', c: '#5ba2e8' },
    '33': { desc: 'GPIO33 (ADC1_CH5, TOUCH8, RTC8). General I/O, PWM.', type: 'GPIO/Touch', v: '3.3V', c: '#5ba2e8' },
    '25': { desc: 'GPIO25 (DAC1, ADC2_CH8, RTC6). True 8-bit Analog Out.', type: 'DAC/GPIO', v: '3.3V', c: '#ff9a1f' },
    '26': { desc: 'GPIO26 (DAC2, ADC2_CH9, RTC7). True 8-bit Analog Out.', type: 'DAC/GPIO', v: '3.3V', c: '#ff9a1f' },
    '27': { desc: 'GPIO27 (ADC2_CH7, TOUCH7, RTC17). General I/O, PWM.', type: 'GPIO/Touch', v: '3.3V', c: '#5ba2e8' },
    '14': { desc: 'GPIO14 (ADC2_CH6, TOUCH6, HSPI_CLK). Strapping pin.', type: 'GPIO/SPI', v: '3.3V', c: '#5ba2e8' },
    '12': { desc: 'GPIO12 (ADC2_CH5, TOUCH5, HSPI_MISO). Boot strap pin (Keep LOW).', type: 'Boot/GPIO', v: '3.3V', c: '#ff7ac0' },
    'GND': { desc: '0V Ground Reference. Connect to peripheral common ground.', type: 'Ground', v: '0V', c: '#9aa3ad' },
    '13': { desc: 'GPIO13 (ADC2_CH4, TOUCH4, HSPI_MOSI). General I/O, PWM.', type: 'GPIO/SPI', v: '3.3V', c: '#5ba2e8' },
    'SD2': { desc: 'GPIO9 (SD2). Connected to internal SPI Flash. DO NOT USE.', type: 'Reserved Flash', v: '3.3V', c: '#ff3333' },
    'SD3': { desc: 'GPIO10 (SD3). Connected to internal SPI Flash. DO NOT USE.', type: 'Reserved Flash', v: '3.3V', c: '#ff3333' },
    'CMD': { desc: 'GPIO11 (CMD). Connected to internal SPI Flash. DO NOT USE.', type: 'Reserved Flash', v: '3.3V', c: '#ff3333' },
    '5V': { desc: '5V / VIN Power Input (from USB or regulated 5V power source).', type: 'Power In', v: '5.0V', c: '#ff4a4a' },
    '23': { desc: 'GPIO23 (VSPI MOSI). SPI Master Out Slave In, PWM, General I/O.', type: 'GPIO/SPI', v: '3.3V', c: '#5ba2e8' },
    '22': { desc: 'GPIO22 (I2C SCL). Hardware default I2C Clock line.', type: 'I2C Clock', v: '3.3V', c: '#f2c230' },
    'TX0': { desc: 'GPIO1 (U0TXD). Hardware Serial TX to USB-UART chip.', type: 'UART TX', v: '3.3V', c: '#f2c230' },
    'RX0': { desc: 'GPIO3 (U0RXD). Hardware Serial RX from USB-UART chip.', type: 'UART RX', v: '3.3V', c: '#f2c230' },
    '21': { desc: 'GPIO21 (I2C SDA). Hardware default I2C Data line.', type: 'I2C Data', v: '3.3V', c: '#f2c230' },
    '19': { desc: 'GPIO19 (VSPI MISO). SPI Master In Slave Out, PWM, General I/O.', type: 'GPIO/SPI', v: '3.3V', c: '#5ba2e8' },
    '18': { desc: 'GPIO18 (VSPI SCK). High speed SPI Clock line, PWM.', type: 'GPIO/SPI', v: '3.3V', c: '#5ba2e8' },
    '5': { desc: 'GPIO5 (VSPI SS). SPI Chip Select. Strapping pin.', type: 'GPIO/SPI', v: '3.3V', c: '#5ba2e8' },
    '17': { desc: 'GPIO17 (U2TXD). Hardware UART2 TX, PWM, General I/O.', type: 'GPIO/UART', v: '3.3V', c: '#5ba2e8' },
    '16': { desc: 'GPIO16 (U2RXD). Hardware UART2 RX, PWM, General I/O.', type: 'GPIO/UART', v: '3.3V', c: '#5ba2e8' },
    '4': { desc: 'GPIO4 (ADC2_CH0, TOUCH0). General I/O, PWM.', type: 'GPIO/Touch', v: '3.3V', c: '#5ba2e8' },
    '0': { desc: 'GPIO0 (BOOT button). Bootloader strap pin. LOW=flashing, HIGH=run.', type: 'Boot Pin', v: '3.3V', c: '#ff7ac0' },
    '2': { desc: 'GPIO2 (Onboard Blue LED). Strapping pin. Keep LOW during upload.', type: 'Boot/LED', v: '3.3V', c: '#00e5ff' },
    '15': { desc: 'GPIO15 (ADC2_CH3, TOUCH3, HSPI_SS). Strapping pin.', type: 'GPIO/SPI', v: '3.3V', c: '#5ba2e8' },
    'SD1': { desc: 'GPIO8 (SD1). Connected to internal SPI Flash. DO NOT USE.', type: 'Reserved Flash', v: '3.3V', c: '#ff3333' },
    'SD0': { desc: 'GPIO7 (SD0). Connected to internal SPI Flash. DO NOT USE.', type: 'Reserved Flash', v: '3.3V', c: '#ff3333' },
    'CLK': { desc: 'GPIO6 (CLK). Internal SPI Flash Clock line. DO NOT USE.', type: 'Reserved Flash', v: '3.3V', c: '#ff3333' },
  };

  const pins = [];
  L.forEach((n, i) => pins.push([-12.7, -23.2 + i * 2.54, n]));
  R.forEach((n, i) => pins.push([12.7, -23.2 + i * 2.54, n]));
  const nm = (n) => (/^\d+$/.test(n) ? 'IO' + n : n);

  // Main PCB
  mk(rb(28, 1.6, 51, 0.15), mask, 0, 0, 0, 'ESP32 PCB', '28 × 51 mm FR-4 black solder-mask board');

  // Silkscreen texture with high detail traces, gold annular rings, via holes
  (() => {
    const S = 30;
    const c = cvs(28 * S, 51 * S);
    const g = c.getContext('2d');
    g.fillStyle = '#0b0c10';
    g.fillRect(0, 0, c.width, c.height);

    let s = 7;
    const rnd = () => (s = (s * 16807) % 2147483647) / 2147483647;
    g.lineCap = 'round';
    g.lineJoin = 'round';

    // Copper traces
    for (let i = 0; i < 150; i++) {
      g.strokeStyle = rnd() > 0.5 ? '#14161c' : '#101218';
      g.lineWidth = 2 + rnd() * 3;
      g.beginPath();
      let x = rnd() * c.width;
      let y = rnd() * c.height;
      g.moveTo(x, y);
      for (let k = 0; k < 4; k++) {
        if (k % 2) x += (rnd() - 0.5) * 160;
        else y += (rnd() - 0.5) * 160;
        g.lineTo(x, y);
      }
      g.stroke();
    }

    // Gold via holes
    for (let i = 0; i < 110; i++) {
      g.fillStyle = '#4a3d1e';
      g.beginPath();
      g.arc(rnd() * c.width, rnd() * c.height, 3, 0, 6.3);
      g.fill();
    }

    const X = (x) => (x + 14) * S;
    const Z = (z) => (z + 25.5) * S;

    pins.forEach(([x, z, n]) => {
      g.fillStyle = '#e0b04a';
      g.beginPath();
      g.arc(X(x), Z(z), 0.95 * S, 0, 6.3);
      g.fill();
      g.fillStyle = '#050505';
      g.beginPath();
      g.arc(X(x), Z(z), 0.5 * S, 0, 6.3);
      g.fill();
      g.fillStyle = '#d9dbde';
      g.font = '600 22px Arial, sans-serif';
      g.textBaseline = 'middle';
      g.textAlign = x < 0 ? 'left' : 'right';
      g.fillText(nm(n), X(x < 0 ? -11.3 : 11.3), Z(z) + 1);
    });

    g.textAlign = 'center';
    g.font = '700 26px Arial, sans-serif';
    g.fillStyle = '#e0b04a';
    g.fillText('BOOT', X(-8.5), Z(16.6));
    g.fillText('EN', X(8.5), Z(16.6));

    g.font = '700 24px Arial, sans-serif';
    g.fillStyle = '#c8cacd';
    g.fillText('ESP32 DEVKIT', X(0), Z(18.2));

    const p = new THREE.Mesh(
      new THREE.PlaneGeometry(28, 51),
      new THREE.MeshPhysicalMaterial({
        map: tex(c),
        roughness: 0.42,
        metalness: 0.05,
        clearcoat: 0.4,
        clearcoatRoughness: 0.4,
      })
    );
    p.rotation.x = -Math.PI / 2;
    p.position.y = 0.802;
    p.receiveShadow = true;
    root.add(p);
  })();

  // Module carrier PCB with antenna trace
  mk(rb(18, 0.8, 25.5, 0.08), mask, 0, 1.2, -12.25, 'ESP-WROOM-32 PCB', 'Carrier board for ESP32 SoC', 'Carrier', '3.3V', gMod);
  (() => {
    const S = 40;
    const c = cvs(18 * S, 25.5 * S);
    const g = c.getContext('2d');
    g.fillStyle = '#0c0d10';
    g.fillRect(0, 0, c.width, c.height);

    // Meandering inverted-F PCB antenna in gold
    g.strokeStyle = '#d6ad4b';
    g.lineWidth = 13;
    g.lineJoin = 'miter';
    g.beginPath();
    g.moveTo(40, 250);
    g.lineTo(40, 150);
    for (let i = 0; i < 5; i++) {
      const x = 40 + i * 128;
      g.lineTo(x, 40);
      g.lineTo(x + 64, 40);
      g.lineTo(x + 64, 150);
      g.lineTo(x + 128, 150);
    }
    g.lineTo(680, 150);
    g.lineTo(680, 40);
    g.stroke();

    g.fillStyle = '#d6ad4b';
    for (let i = 0; i < 9; i++) {
      const y = (8 + i * 1.27) * S;
      g.fillRect(0, y, 38, 24);
      g.fillRect(c.width - 38, y, 38, 24);
    }
    for (let i = 0; i < 14; i++) g.fillRect((1.9 + i * 1.1) * S, c.height - 40, 26, 40);

    const p = new THREE.Mesh(
      new THREE.PlaneGeometry(18, 25.5),
      new THREE.MeshPhysicalMaterial({ map: tex(c), roughness: 0.4, metalness: 0.1 })
    );
    p.rotation.x = -Math.PI / 2;
    p.position.set(0, 1.602, -12.25);
    p.receiveShadow = true;
    p.userData = { name: 'PCB Antenna', desc: '2.4 GHz Wi-Fi & Bluetooth inverted-F trace antenna', pinType: 'RF', voltage: 'RF Signal' };
    gMod.add(p);
    parts.push(p);
  })();

  // Brushed metal RF Shield with realistic labels
  const rn = cvs(256, 256);
  const rg = rn.getContext('2d');
  rg.fillStyle = '#8a8a8a';
  rg.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 900; i++) {
    rg.fillStyle = 'rgba(' + (i % 2 ? '255,255,255' : '0,0,0') + ',0.07)';
    rg.fillRect(0, Math.random() * 256, 256, 1 + Math.random() * 2);
  }
  const rmap = tex(rn, true);
  const shM = PM(0xc7c3b8, 1, 0.42, { roughnessMap: rmap });
  mk(rb(16.2, 2.4, 17.4, 0.2), shM, 0, 2.8, -9.3, 'ESP-WROOM-32 Shield', 'RF Shield covering ESP32 dual-core Xtensa LX6 SoC & 4MB SPI Flash', 'RF Shield', 'GND', gMod);

  (() => {
    const c = cvs(324, 348);
    const g = c.getContext('2d');
    g.fillStyle = '#d2cec3';
    g.fillRect(0, 0, 324, 348);
    g.fillStyle = '#3d3a33';
    g.textAlign = 'center';
    g.font = 'bold 26px Arial, sans-serif';
    g.fillText('ESP-WROOM-32', 162, 60);
    g.strokeStyle = '#3d3a33';
    g.lineWidth = 4;
    g.strokeRect(34, 140, 120, 64);
    g.font = 'bold 34px Arial, sans-serif';
    g.fillText('Wi-Fi', 94, 185);
    g.beginPath();
    g.arc(228, 172, 30, 0, 6.3);
    g.stroke();
    g.fillText('B', 228, 184);
    g.font = 'bold 44px Arial, sans-serif';
    g.fillText('CE', 100, 300);
    g.font = '14px Arial';
    g.fillText('FCC ID: 2AC7Z-ESPWROOM32', 210, 300);

    const p = new THREE.Mesh(
      new THREE.PlaneGeometry(15.8, 17),
      new THREE.MeshPhysicalMaterial({ map: tex(c), metalness: 0.85, roughness: 0.4, roughnessMap: rmap })
    );
    p.rotation.x = -Math.PI / 2;
    p.position.set(0, 4.012, -9.3);
    p.userData = { name: 'ESP-WROOM-32 Module', desc: 'Dual-core 240MHz Xtensa 32-bit MCU with 520KB SRAM and 2.4GHz Wi-Fi + BLE', pinType: 'Core SoC', voltage: '3.3V' };
    gMod.add(p);
    parts.push(p);
  })();

  // AMS1117 3.3V Voltage Regulator (SOT-223)
  mk(rb(3.5, 1.5, 6.4, 0.1), chip, 5, 1.55, 5, '3.3V LDO Regulator', 'AMS1117-3.3: Steps down 5V USB to 3.3V system power (up to 800mA)', 'Power LDO', '5V In / 3.3V Out', gChip);
  for (let i = 0; i < 3; i++) mk(B(1.2, 0.25, 0.7), tin, 5 - 2.2, 0.95, 3.3 + i * 2.3, 'Regulator Lead', 'AMS1117 SOT-223 pin', 'Pin', '3.3V', gChip);
  mk(B(1.6, 0.25, 3.2), tin, 5 + 2.4, 0.95, 5, 'Regulator Heat Tab', 'AMS1117 heat dissipation tab (connected to Vout)', 'Tab', '3.3V', gChip);

  // CP2102 USB-to-UART Bridge QFN Chip
  mk(rb(5.2, 0.4, 5.2, 0.05), tin, 0, 1.0, 12, 'USB-UART Pads', 'SMD solder footprint for CP2102/CH340', 'IC Pads', 'GND', gChip);
  mk(rb(5, 0.9, 5, 0.1), chip, 0, 1.45, 12, 'CP2102 USB Bridge', 'Silicon Labs CP2102 USB-to-UART bridge IC for programming & serial monitor', 'UART Bridge', '3.3V', gChip);

  // Tantalum filter capacitors
  [
    [-6, 3, 0],
    [-8.4, 8.5, 1],
    [8.5, 11, 0],
    [9.4, 15, 1],
    [-4.5, 16, 0],
    [6.5, 0.5, 1],
  ].forEach(([x, z, r]) => {
    const w = r ? 1.6 : 3.2;
    const d = r ? 3.2 : 1.6;
    mk(rb(w, 1.4, d, 0.12), PM(0xc9902f, 0.1, 0.45), x, 1.5, z, 'Tantalum Capacitor', 'Power rail decoupling & noise filtering capacitor (10µF–22µF)', 'Capacitor', 'Power', gChip);
    mk(B(r ? 1.6 : 0.5, 1.42, r ? 0.5 : 1.6), PM(0x5a3a12, 0, 0.6), x + (r ? 0 : -1.35), 1.5, z + (r ? -1.35 : 0), 'Capacitor Polarity', 'Positive polarity indicator stripe', 'Mark', 'Power', gChip);
  });

  // SMD 0805 resistors
  for (let i = 0; i < 14; i++) {
    const x = -9 + (i % 7) * 3;
    const z = -1.5 + Math.floor(i / 7) * 4.3 + ((i * 0.37) % 1);
    mk(rb(1.6, 0.5, 0.8, 0.05), PM(0x16171a, 0, 0.5), x, 1.05, z + 6, 'SMD Resistor', 'Pull-up / Current limiting resistor (10kΩ / 1kΩ)', 'Resistor', 'Passive', gChip);
    mk(B(0.3, 0.5, 0.8), tin, x - 0.65, 1.05, z + 6, 'Resistor Pad', '', 'Pad', '', gChip);
    mk(B(0.3, 0.5, 0.8), tin, x + 0.65, 1.05, z + 6, 'Resistor Pad', '', 'Pad', '', gChip);
  }

  // LEDs (Red Power + Blue Status IO2)
  mk(rb(1.6, 0.6, 0.8, 0.05), PM(0xff3030, 0, 0.3, { emissive: 0xff1111, emissiveIntensity: 0.8 }), -9.8, 1.1, 10, 'Power LED (Red)', 'Lights up red when 3.3V system power is present', 'LED Indicator', '3.3V', gChip);
  mk(rb(1.6, 0.6, 0.8, 0.05), PM(0x3070ff, 0, 0.3, { emissive: 0x2266ff, emissiveIntensity: 0.8 }), -9.8, 1.1, 12, 'Status LED (Blue)', 'Connected to GPIO 2. Blinks during boot and user sketches', 'LED Indicator', 'GPIO 2', gChip);

  // Micro-USB connector
  (() => {
    const o = [
      [-3.75, 1.4],
      [3.75, 1.4],
      [3.75, -0.3],
      [2.8, -1.4],
      [-2.8, -1.4],
      [-3.75, -0.3],
    ];
    const k = 0.83;
    const s = new THREE.Shape();
    o.forEach((p, i) => (i ? s.lineTo(...p) : s.moveTo(...p)));
    s.closePath();
    const h = new THREE.Path();
    o.forEach((p, i) => (i ? h.lineTo(p[0] * k, p[1] * k) : h.moveTo(p[0] * k, p[1] * k)));
    h.closePath();
    s.holes.push(h);
    const g = new THREE.ExtrudeGeometry(s, { depth: 5.2, bevelEnabled: false });
    mk(g, PM(0xc9ccd0, 1, 0.3), 0, 2.2, 21.8, 'Micro-USB Connector', '5V Power input and serial communication for code flashing', 'USB Port', '5.0V', gUsb);
    mk(rb(5.6, 0.5, 3.8, 0.05), plastic, 0, 2.0, 23.2, 'USB Tongue', 'Insulating plastic tongue holding 5 USB contacts', 'Connector', '5V/Data', gUsb);
    for (let i = 0; i < 5; i++) {
      mk(B(0.3, 0.1, 1.4), gold, -1.8 + i * 0.9, 2.3, 24.4, 'USB Contact Pin', 'USB Pin (VBUS, D-, D+, ID, GND)', 'Contact', '5V/Data', gUsb);
    }
    mk(B(8.2, 0.3, 3), tin, 0, 0.95, 22.5, 'USB Solder Tabs', 'Mechanical reinforcement tabs soldered to PCB ground', 'Tab', 'GND', gUsb);
  })();

  // Tactile buttons (BOOT & EN)
  [
    [-8.5, 'BOOT Button (GPIO0)', 'Hold during upload to enter ESP32 serial bootloader mode', 'Switch', '3.3V'],
    [8.5, 'EN Reset Button', 'Press to reset ESP32 microcontroller (pulls EN pin LOW)', 'Switch', '3.3V'],
  ].forEach(([x, n, d, type, volt]) => {
    mk(rb(4.4, 1.5, 4, 0.12), PM(0xb9bdc2, 1, 0.35), x, 1.55, 20.8, n, d, type, volt, gBtn);
    mk(new THREE.CylinderGeometry(1.15, 1.15, 1.3, 28), PM(0x0a0a0a, 0, 0.35, { clearcoat: 0.4 }), x, 2.9, 20.8, n, d, type, volt, gBtn);
    [-1, 1].forEach((a) =>
      [-1, 1].forEach((b) => mk(B(0.9, 0.3, 0.7), tin, x + a * 2.4, 0.95, 20.8 + b * 1.4, 'Button Lead', 'Mechanical solder pin', 'Pad', volt, gBtn))
    );
  });

  // Dual Header sockets (2.54mm pitch)
  mk(rb(2.54, 2.5, 19 * 2.54, 0.1), plastic, -12.7, -2.05, -23.2 + 9 * 2.54, 'Left Header Socket', '19-pin 2.54 mm pitch header', 'Header', 'Multi');
  mk(rb(2.54, 2.5, 19 * 2.54, 0.1), plastic, 12.7, -2.05, -23.2 + 9 * 2.54, 'Right Header Socket', '19-pin 2.54 mm pitch header', 'Header', 'Multi');

  // Gold header pins (Instanced for high performance)
  const N = pins.length;
  const dm = new THREE.Object3D();
  const body = new THREE.InstancedMesh(B(0.64, 11.1, 0.64), gold, N);
  const tipG = new THREE.CylinderGeometry(0.12, 0.45, 0.6, 4);
  tipG.rotateY(Math.PI / 4);
  const tt = new THREE.InstancedMesh(tipG, gold, N);
  const tb = new THREE.InstancedMesh(tipG, gold, N);

  pins.forEach(([x, z], i) => {
    dm.rotation.set(0, 0, 0);
    dm.position.set(x, -2.55, z);
    dm.updateMatrix();
    body.setMatrixAt(i, dm.matrix);

    dm.position.set(x, 3.3, z);
    dm.updateMatrix();
    tt.setMatrixAt(i, dm.matrix);

    dm.rotation.x = Math.PI;
    dm.position.set(x, -8.4, z);
    dm.updateMatrix();
    tb.setMatrixAt(i, dm.matrix);
  });

  [body, tt, tb].forEach((m) => {
    m.castShadow = true;
    m.receiveShadow = true;
    m.userData = { name: 'Header Pin', desc: 'Gold plated 2.54mm square pin', pinType: 'Pin', voltage: '3.3V/5V' };
    root.add(m);
    parts.push(m);
  });

  // Callouts: 3D Floating Pill Tags with high clarity
  pins.forEach(([x, z, n]) => {
    const info = pinInfoESP32[n] || { c: '#5ba2e8', desc: 'General I/O', type: 'GPIO', v: '3.3V' };
    const s = makeCalloutTag(nm(n), info.c, 4.8, 1.9, 32);
    s.position.set(x + (x < 0 ? -4.6 : 4.6), 1.6, z);
    s.userData = {
      name: `${nm(n)} Pin`,
      desc: info.desc,
      pinType: info.type,
      voltage: info.v,
      color: info.c,
    };
    labels.add(s);
  });

  // BOOT & EN Callouts
  [
    [-8.5, 'BOOT · IO0', '#ff7ac0', 'Hold during upload to flash firmware', 'Boot Pin', '3.3V'],
    [8.5, 'EN · RESET', '#a06be0', 'Press to reset ESP32 processor', 'Reset Pin', '3.3V'],
  ].forEach(([x, t, c, d, pt, v]) => {
    const s = makeCalloutTag(t, c, 8.4, 2.2, 30);
    s.position.set(x, 10, 20.8);
    s.userData = { name: t, desc: d, pinType: pt, voltage: v, color: c };
    labels.add(s);
    const lineMat = new THREE.LineBasicMaterial({ color: c });
    const lineGeo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(x, 3.8, 20.8), new THREE.Vector3(x, 8.9, 20.8)]);
    labels.add(new THREE.Line(lineGeo, lineMat));
  });

  return {
    root,
    parts,
    groups,
    labels,
    pins,
    pinInfo: pinInfoESP32,
    cameraPos: [-42, 48, 66],
    target: [0, 0, 0],
    minDistance: 25,
    maxDistance: 180,
  };
}

// ─── 2. Arduino Uno R3 ──────────────────────────────────────────────────────

export function buildArduinoUno(options = {}) {
  const ctx = createModelContext();
  const { root, parts, groups, labels, G, mk } = ctx;

  const bluePCB = PM(0x0e4d7a, 0, 0.4, { clearcoat: 0.5 });
  const gold = PM(0xe0b04a, 1, 0.28);
  const tin = PM(0xd5d8dc, 1, 0.32);
  const plastic = PM(0x111111, 0, 0.6);
  const chip = PM(0x101114, 0, 0.5, { clearcoat: 0.3 });

  const gChips = G(8);
  const gPorts = G(5);

  const arduinoPins = [
    // Digital Pins (Top)
    [-24, 18, 'D0 / RX', 'UART RX (Receive from PC)', 'UART RX', '5V', '#f2c230'],
    [-21.5, 18, 'D1 / TX', 'UART TX (Transmit to PC)', 'UART TX', '5V', '#f2c230'],
    [-19, 18, 'D2', 'External Interrupt INT0', 'Digital In/Out', '5V', '#5ba2e8'],
    [-16.5, 18, 'D3 ~', 'PWM Output (Timer 2) / INT1', 'Digital PWM', '5V', '#00e5ff'],
    [-14, 18, 'D4', 'Digital I/O', 'Digital In/Out', '5V', '#5ba2e8'],
    [-11.5, 18, 'D5 ~', 'PWM Output (Timer 0)', 'Digital PWM', '5V', '#00e5ff'],
    [-9, 18, 'D6 ~', 'PWM Output (Timer 0)', 'Digital PWM', '5V', '#00e5ff'],
    [-6.5, 18, 'D7', 'Digital I/O', 'Digital In/Out', '5V', '#5ba2e8'],
    [-2, 18, 'D8', 'Digital I/O', 'Digital In/Out', '5V', '#5ba2e8'],
    [0.5, 18, 'D9 ~', 'PWM Output (Timer 1, 16-bit)', 'Digital PWM', '5V', '#00e5ff'],
    [3, 18, 'D10 ~', 'SPI SS / PWM Output (Timer 1)', 'Digital PWM/SPI', '5V', '#00e5ff'],
    [5.5, 18, 'D11 ~', 'SPI MOSI / PWM Output (Timer 2)', 'Digital PWM/SPI', '5V', '#00e5ff'],
    [8, 18, 'D12', 'SPI MISO line', 'Digital/SPI', '5V', '#5ba2e8'],
    [10.5, 18, 'D13', 'SPI SCK line & Built-in LED', 'Digital/SPI/LED', '5V', '#ff9a1f'],
    [13, 18, 'GND', 'Digital Ground connection', 'Ground', '0V', '#9aa3ad'],
    [15.5, 18, 'AREF', 'Analog ADC Reference voltage', 'Analog Ref', '0-5V', '#f2c230'],
    // Power & Analog (Bottom)
    [-24, -18, 'IOREF', 'I/O Voltage reference (5.0V on Uno)', 'Power Ref', '5V', '#ff4a4a'],
    [-21.5, -18, 'RESET', 'Pull LOW to reset ATmega328P', 'Reset', '5V', '#a06be0'],
    [-19, -18, '3.3V', '3.3V Regulated Output (max 150mA)', 'Power Out', '3.3V', '#ff4a4a'],
    [-16.5, -18, '5V', '5V System Power Output / Input', 'Power Out', '5.0V', '#ff4a4a'],
    [-14, -18, 'GND', '0V Ground reference', 'Ground', '0V', '#9aa3ad'],
    [-11.5, -18, 'GND', '0V Ground reference', 'Ground', '0V', '#9aa3ad'],
    [-9, -18, 'VIN', 'External 7-12V Power Input', 'Power In', '7-12V', '#ff4a4a'],
    [-3, -18, 'A0', 'Analog Input 0 (10-bit ADC: 0-1023)', 'Analog In', '0-5V', '#00e5ff'],
    [-0.5, -18, 'A1', 'Analog Input 1 (10-bit ADC)', 'Analog In', '0-5V', '#00e5ff'],
    [2, -18, 'A2', 'Analog Input 2 (10-bit ADC)', 'Analog In', '0-5V', '#00e5ff'],
    [4.5, -18, 'A3', 'Analog Input 3 (10-bit ADC)', 'Analog In', '0-5V', '#00e5ff'],
    [7, -18, 'A4', 'Analog Input 4 / I2C SDA data line', 'Analog / I2C', '0-5V', '#f2c230'],
    [9.5, -18, 'A5', 'Analog Input 5 / I2C SCL clock line', 'Analog / I2C', '0-5V', '#f2c230'],
  ];

  // Arduino PCB (68.6 × 53.4 mm)
  mk(rb(68, 1.8, 53, 0.2), bluePCB, 0, 0, 0, 'Arduino Uno PCB', 'Standard Italian blue double-sided FR-4 PCB');

  // Silkscreen
  (() => {
    const c = cvs(680, 530);
    const g = c.getContext('2d');
    g.fillStyle = '#0e4d7a';
    g.fillRect(0, 0, 680, 530);

    // Text & markings
    g.fillStyle = '#ffffff';
    g.font = '700 36px Arial, sans-serif';
    g.fillText('ARDUINO', 260, 240);
    g.font = '700 24px Arial, sans-serif';
    g.fillStyle = '#f2c230';
    g.fillText('UNO', 440, 240);

    g.font = '600 16px monospace';
    g.fillStyle = '#d0e0ff';
    g.fillText('DIGITAL (PWM ~)', 180, 80);
    g.fillText('POWER', 130, 480);
    g.fillText('ANALOG IN', 360, 480);

    const p = new THREE.Mesh(
      new THREE.PlaneGeometry(68, 53),
      new THREE.MeshPhysicalMaterial({ map: tex(c), roughness: 0.45, clearcoat: 0.4 })
    );
    p.rotation.x = -Math.PI / 2;
    p.position.y = 0.91;
    root.add(p);
  })();

  // ATmega328P DIP-28 Chip & Socket
  mk(rb(36, 4, 9, 0.2), plastic, 8, 2.5, 0, 'DIP-28 Socket', '28-pin dual inline socket holding the microcontroller', 'Socket', '5V', gChips);
  mk(rb(35, 2.5, 8.5, 0.15), chip, 8, 4.5, 0, 'ATmega328P Microcontroller', '8-bit AVR RISC MCU, 32KB Flash, 2KB SRAM, 16MHz Clock', 'MCU Core', '5.0V', gChips);

  // 16MHz Crystal Oscillator
  mk(rb(11, 3.5, 4.5, 0.2), tin, -8, 2.5, 3, '16MHz Crystal', 'Quartz crystal oscillator providing 16MHz system clock', 'Oscillator', 'Clock', gChips);

  // USB Type-B Port
  mk(rb(12, 11, 12, 0.3), tin, -28, 6, 12, 'USB Type-B Port', 'Standard USB Type-B port for power & computer connection', 'Port', '5.0V', gPorts);

  // DC Barrel Jack (7-12V Input)
  mk(rb(14, 11, 9, 0.3), plastic, -28, 6, -16, 'DC Power Jack', '2.1mm center-positive DC power socket (7–12V input)', 'Power Port', '7-12V', gPorts);

  // Reset Button
  mk(rb(6, 4, 6, 0.2), tin, -28, 2.5, 22, 'Reset Button', 'Tactile button to reset ATmega328P', 'Button', '5V', gPorts);
  mk(new THREE.CylinderGeometry(1.5, 1.5, 2, 16), PM(0xcc2222), -28, 5, 22, 'Reset Plunger', 'Reset actuator', 'Button', '5V', gPorts);

  // Pin Headers & Pins
  arduinoPins.forEach(([x, z, name, desc, type, volt, color]) => {
    // Header plastic block
    mk(B(2.4, 8, 2.4), plastic, x, 4, z, '', '', '', '', root);
    // Gold contact pin
    mk(B(0.64, 9, 0.64), gold, x, 4.5, z, `${name} Pin`, desc, type, volt, root);

    // Callout Tag
    const s = makeCalloutTag(name, color, 4.6, 1.8, 30);
    s.position.set(x, 10, z + (z > 0 ? 4 : -4));
    s.userData = { name: `${name} Pin`, desc, pinType: type, voltage: volt, color };
    labels.add(s);
  });

  return {
    root,
    parts,
    groups,
    labels,
    cameraPos: [-55, 60, 65],
    target: [0, 0, 0],
    minDistance: 25,
    maxDistance: 200,
  };
}

// ─── 3. DHT11 / DHT22 Humidity & Temp Sensor ───────────────────────────────

export function buildDHT11(options = {}) {
  const ctx = createModelContext();
  const { root, parts, groups, labels, G, mk } = ctx;

  const isDHT22 = options.isDHT22 || false;
  const bodyColor = isDHT22 ? 0xf0f3f6 : 0x1e88e5;
  const bodyMat = PM(bodyColor, 0, 0.35, { clearcoat: 0.3 });
  const gold = PM(0xe0b04a, 1, 0.28);
  const tin = PM(0xd5d8dc, 1, 0.32);
  const plastic = PM(0x111111, 0, 0.6);

  const gShell = G(8);

  const dhtPins = [
    { x: -4.5, name: 'Pin 1: VCC', desc: 'Power supply: 3.3V to 5V DC', type: 'Power In', v: '3.3V-5V', c: '#ff4a4a' },
    { x: -1.5, name: 'Pin 2: DATA', desc: 'Single-bus bidirectional data signal (Requires 4.7kΩ–10kΩ pull-up)', type: 'Digital Data', v: '3.3V/5V', c: '#00e5ff' },
    { x: 1.5, name: 'Pin 3: NC', desc: 'No Connection (Leave floating or not connected)', type: 'No Connect', v: 'N/A', c: '#888888' },
    { x: 4.5, name: 'Pin 4: GND', desc: 'Ground power connection (0V)', type: 'Ground', v: '0V', c: '#9aa3ad' },
  ];

  // Slotted protective casing
  mk(rb(16, 22, 7, 0.5), bodyMat, 0, 11, 0, isDHT22 ? 'DHT22 Housing' : 'DHT11 Blue Housing', 'Perforated polymer casing allowing airflow across internal sensor', 'Housing', '', gShell);

  // Ventilation grilles on front
  for (let i = 0; i < 4; i++) {
    mk(B(12, 1.2, 0.4), PM(0x0a101d, 0, 0.8), 0, 7 + i * 3.5, 3.5, 'Ventilation Slit', 'Allows atmospheric moisture and air to reach internal sensing element', 'Aperture', '', gShell);
  }

  // Internal humidity sensing substrate (resistive polymer)
  mk(rb(10, 8, 2, 0.1), PM(0xd0b030, 0.2, 0.5), 0, 11, 0, 'Humidity Sensing Substrate', 'Moisture-holding conductive polymer substrate whose resistance changes with relative humidity', 'Sensor Element', 'Analog', root);

  // Header base plastic
  mk(rb(14, 3, 2.54, 0.1), plastic, 0, -1.5, 0, 'Header Base', '2.54mm pitch terminal base', 'Header', '', root);

  // 4 Pins & Callouts
  dhtPins.forEach((p) => {
    mk(B(0.64, 12, 0.64), gold, p.x, -6, 0, p.name, p.desc, p.type, p.v, root);

    const s = makeCalloutTag(p.name.split(':')[1]?.trim() || p.name, p.c, 4.4, 1.7, 30);
    s.position.set(p.x, -13, 0);
    s.userData = { name: p.name, desc: p.desc, pinType: p.type, voltage: p.v, color: p.c };
    labels.add(s);
  });

  return {
    root,
    parts,
    groups,
    labels,
    cameraPos: [-28, 22, 45],
    target: [0, 4, 0],
    minDistance: 15,
    maxDistance: 120,
  };
}

// ─── 4. HC-SR04 Ultrasonic Distance Sensor ─────────────────────────────────

export function buildHCSR04(options = {}) {
  const ctx = createModelContext();
  const { root, parts, groups, labels, G, mk } = ctx;

  const bluePCB = PM(0x0e5a94, 0, 0.4, { clearcoat: 0.4 });
  const tin = PM(0xdcdfe4, 1, 0.25);
  const meshMat = PM(0x88929e, 0.8, 0.4);
  const gold = PM(0xe0b04a, 1, 0.28);
  const chip = PM(0x101114, 0, 0.5);

  const gSensors = G(8);

  const hcPins = [
    { x: -4.5, name: 'VCC', desc: '5V Power Supply Input (4.5V – 5.5V)', type: 'Power In', v: '5.0V', c: '#ff4a4a' },
    { x: -1.5, name: 'TRIG', desc: 'Trigger Input: Send a 10µs TTL pulse to start 40kHz ultrasound burst', type: 'Digital In', v: '3.3V/5V', c: '#00e5ff' },
    { x: 1.5, name: 'ECHO', desc: 'Echo Output: High for duration of sound return. Use level shifter with ESP32!', type: 'Digital Out', v: '5.0V Out', c: '#f2c230' },
    { x: 4.5, name: 'GND', desc: '0V Ground power connection', type: 'Ground', v: '0V', c: '#9aa3ad' },
  ];

  // PCB (45 × 20 mm)
  mk(rb(45, 1.6, 20, 0.2), bluePCB, 0, 0, 0, 'HC-SR04 PCB', '45 × 20 mm breakout PCB holding dual transducers and driver ICs');

  // Dual Ultrasound Transducers (Transmitter 'T' & Receiver 'R')
  [-13, 13].forEach((x, i) => {
    // Metal cylinder horn
    mk(new THREE.CylinderGeometry(8, 8, 12, 32), tin, x, 7, 0, i === 0 ? 'Transmitter (T)' : 'Receiver (R)', i === 0 ? 'Transmits 40 kHz ultrasound acoustic pulses' : 'Receives reflected 40 kHz acoustic echo pulses', 'Transducer', '40kHz Piezo', gSensors);
    // Front mesh grill
    mk(new THREE.CylinderGeometry(7.6, 7.6, 0.4, 32), meshMat, x, 13, 0, 'Protective Mesh Grill', 'Acoustically transparent wire mesh protective face', 'Grill', '', gSensors);
  });

  // Processing ICs on rear/front
  mk(rb(10, 1.2, 5, 0.1), chip, 0, 1, 5, 'LM324 Quad Op-Amp', 'Dual-stage acoustic signal amplifier and bandpass filter IC', 'IC', '5V', root);
  mk(rb(8, 3, 3, 0.2), tin, 0, 1.8, -5, 'Oscillator Crystal', 'Piezoelectric clock reference for 40kHz frequency synthesis', 'Crystal', 'Clock', root);

  // 4 Pins & Callouts
  hcPins.forEach((p) => {
    mk(B(0.64, 8, 0.64), gold, p.x, -4.5, -9, p.name, p.desc, p.type, p.v, root);

    const s = makeCalloutTag(p.name, p.c, 4.4, 1.7, 30);
    s.position.set(p.x, -9, -9);
    s.userData = { name: `${p.name} Pin`, desc: p.desc, pinType: p.type, voltage: p.v, color: p.c };
    labels.add(s);
  });

  return {
    root,
    parts,
    groups,
    labels,
    cameraPos: [-36, 32, 50],
    target: [0, 4, 0],
    minDistance: 20,
    maxDistance: 130,
  };
}

// ─── 5. PIR Motion Sensor (HC-SR501) ───────────────────────────────────────

export function buildPIR(options = {}) {
  const ctx = createModelContext();
  const { root, parts, groups, labels, G, mk } = ctx;

  const greenPCB = PM(0x135824, 0, 0.4, { clearcoat: 0.4 });
  const fresnelMat = PM(0xffffff, 0, 0.2, { transmission: 0.85, opacity: 0.9, transparent: true, roughness: 0.2 });
  const gold = PM(0xe0b04a, 1, 0.28);
  const plastic = PM(0xff9900, 0, 0.5);

  const gDome = G(10);

  const pirPins = [
    { x: -3, name: 'VCC', desc: '5V to 12V DC power input', type: 'Power In', v: '5-12V', c: '#ff4a4a' },
    { x: 0, name: 'OUT', desc: 'Output Signal: 3.3V TTL High when motion is detected; 0V Low when idle', type: 'Digital Out', v: '3.3V TTL', c: '#00e5ff' },
    { x: 3, name: 'GND', desc: '0V Ground power connection', type: 'Ground', v: '0V', c: '#9aa3ad' },
  ];

  // PCB (32 × 24 mm)
  mk(rb(32, 1.6, 24, 0.2), greenPCB, 0, 0, 0, 'PIR Sensor PCB', 'HC-SR501 breakout board with BISS0001 IC and adjustment trimpots');

  // Fresnel Dome Lens
  mk(new THREE.SphereGeometry(11, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.5), fresnelMat, 0, 1, 0, 'Fresnel Dome Lens', 'Segmented optical lens focusing infrared light zones onto internal pyroelectric sensor', 'Optical Lens', '', gDome);

  // Dual Orange Adjustment Potentiometers
  mk(new THREE.CylinderGeometry(2.5, 2.5, 3, 16), plastic, -9, 2.5, -8, 'Sensitivity Trimpot', 'Adjusts infrared detection range from 3 meters to 7 meters', 'Potentiometer', 'Analog', root);
  mk(new THREE.CylinderGeometry(2.5, 2.5, 3, 16), plastic, 9, 2.5, -8, 'Time Delay Trimpot', 'Adjusts output HIGH pulse hold duration from 3 seconds to 5 minutes', 'Potentiometer', 'Analog', root);

  // 3 Pins & Callouts
  pirPins.forEach((p) => {
    mk(B(0.64, 8, 0.64), gold, p.x, -4.5, 10.5, p.name, p.desc, p.type, p.v, root);

    const s = makeCalloutTag(p.name, p.c, 4.4, 1.7, 30);
    s.position.set(p.x, -9, 10.5);
    s.userData = { name: `${p.name} Pin`, desc: p.desc, pinType: p.type, voltage: p.v, color: p.c };
    labels.add(s);
  });

  return {
    root,
    parts,
    groups,
    labels,
    cameraPos: [-32, 34, 45],
    target: [0, 4, 0],
    minDistance: 20,
    maxDistance: 120,
  };
}

// ─── 6. SSD1306 0.96" OLED Display ─────────────────────────────────────────

export function buildOLED(options = {}) {
  const ctx = createModelContext();
  const { root, parts, groups, labels, G, mk } = ctx;

  const bluePCB = PM(0x0e3b68, 0, 0.4, { clearcoat: 0.4 });
  const glass = PM(0x030712, 0.1, 0.1, { clearcoat: 0.9, clearcoatRoughness: 0.1 });
  const gold = PM(0xe0b04a, 1, 0.28);

  const gScreen = G(6);

  const oledPins = [
    { x: -4.5, name: 'GND', desc: '0V Ground power reference', type: 'Ground', v: '0V', c: '#9aa3ad' },
    { x: -1.5, name: 'VCC', desc: '3.3V or 5V Power supply (onboard step-up converter)', type: 'Power In', v: '3.3V-5V', c: '#ff4a4a' },
    { x: 1.5, name: 'SCL', desc: 'I2C Clock line (Connect to ESP32 GPIO 22 or Arduino A5)', type: 'I2C Clock', v: '3.3V/5V', c: '#f2c230' },
    { x: 4.5, name: 'SDA', desc: 'I2C Data line (Connect to ESP32 GPIO 21 or Arduino A4)', type: 'I2C Data', v: '3.3V/5V', c: '#f2c230' },
  ];

  // PCB (27 × 27 mm)
  mk(rb(27, 1.6, 27, 0.2), bluePCB, 0, 0, 0, 'OLED PCB', 'Carrier board with I2C address jumper and charge-pump power circuit');

  // Glass display panel
  mk(rb(25, 1.2, 16, 0.1), glass, 0, 1.4, -2, 'OLED Glass Panel', '0.96 inch 128×64 pixel monochrome organic light-emitting diode display', 'Display', '3.3V', gScreen);

  // Live graphic screen texture
  (() => {
    const c = cvs(256, 128);
    const g = c.getContext('2d');
    g.fillStyle = '#00081c';
    g.fillRect(0, 0, 256, 128);

    g.strokeStyle = '#00e5ff';
    g.lineWidth = 2;
    g.strokeRect(6, 6, 244, 116);

    g.fillStyle = '#00e5ff';
    g.font = '700 18px monospace';
    g.fillText('IoT 3D LAB v2.0', 16, 28);
    g.font = '14px monospace';
    g.fillText('TEMP: 24.8 C', 16, 54);
    g.fillText('HUM:  62 %RH', 16, 76);
    g.fillStyle = '#ff9900';
    g.fillText('STATUS: ONLINE', 16, 102);

    const p = new THREE.Mesh(
      new THREE.PlaneGeometry(24, 15),
      new THREE.MeshBasicMaterial({ map: tex(c) })
    );
    p.rotation.x = -Math.PI / 2;
    p.position.set(0, 2.05, -2);
    gScreen.add(p);
  })();

  // 4 Pins & Callouts
  oledPins.forEach((p) => {
    mk(B(0.64, 8, 0.64), gold, p.x, -4.5, 11.5, p.name, p.desc, p.type, p.v, root);

    const s = makeCalloutTag(p.name, p.c, 4.4, 1.7, 30);
    s.position.set(p.x, -9, 11.5);
    s.userData = { name: `${p.name} Pin`, desc: p.desc, pinType: p.type, voltage: p.v, color: p.c };
    labels.add(s);
  });

  return {
    root,
    parts,
    groups,
    labels,
    cameraPos: [-28, 32, 40],
    target: [0, 2, 0],
    minDistance: 15,
    maxDistance: 110,
  };
}

// ─── 7. SG90 Micro Servo Motor ─────────────────────────────────────────────

export function buildServo(options = {}) {
  const ctx = createModelContext();
  const { root, parts, groups, labels, G, mk } = ctx;

  const bluePlastic = PM(0x1976d2, 0, 0.3, { transmission: 0.6, transparent: true, opacity: 0.9, roughness: 0.25 });
  const whitePlastic = PM(0xeeeeee, 0, 0.4);
  const tin = PM(0xdcdfe4, 1, 0.25);

  const gHorn = G(6);

  const servoPins = [
    { name: 'GND (Brown)', desc: 'Ground connection (0V)', type: 'Ground', v: '0V', c: '#8d6e63' },
    { name: 'VCC (Red)', desc: 'Power supply: 4.8V to 6.0V DC (Use external power supply for high loads)', type: 'Power In', v: '4.8V-6V', c: '#ff4a4a' },
    { name: 'PWM (Orange)', desc: 'Pulse-width modulation signal (50Hz / 20ms period, 1ms–2ms pulse)', type: 'PWM Signal', v: '3.3V/5V', c: '#ff9800' },
  ];

  // Servo main case
  mk(rb(23, 22, 12, 0.4), bluePlastic, 0, 11, 0, 'SG90 Polycarbonate Case', 'Micro 9g servo casing housing nylon gears and DC coreless motor', 'Enclosure', '', root);

  // Output spline gear
  mk(new THREE.CylinderGeometry(3, 3, 4, 24), tin, 6, 23, 0, 'Output Spline Shaft', 'Toothed nylon/metal output spline coupling to servo horn', 'Spline', '', root);

  // Rotating White Servo Horn
  mk(new THREE.CylinderGeometry(3.5, 3.5, 1.5, 24), whitePlastic, 6, 25.5, 0, 'Servo Horn Hub', 'Central hub secured with mounting screw', 'Horn', '', gHorn);
  mk(rb(18, 1.5, 4.5, 0.2), whitePlastic, 12, 25.5, 0, 'Servo Arm Horn', 'Dual-arm horn with linkage holes for pushrods and mechanical linkages', 'Horn', '', gHorn);

  // 3-wire ribbon cable
  [-1.2, 0, 1.2].forEach((x, i) => {
    const c = [0x8d6e63, 0xef5350, 0xff9800][i];
    mk(new THREE.CylinderGeometry(0.8, 0.8, 14, 16), PM(c, 0, 0.5), -11.5, 2 - i * 0.4, x, servoPins[i].name, servoPins[i].desc, servoPins[i].type, servoPins[i].v, root);

    const s = makeCalloutTag(servoPins[i].name.split(' ')[0], servoPins[i].c, 4.6, 1.7, 30);
    s.position.set(-18, 2 - i * 4, x);
    s.userData = { name: servoPins[i].name, desc: servoPins[i].desc, pinType: servoPins[i].type, voltage: servoPins[i].v, color: servoPins[i].c };
    labels.add(s);
  });

  return {
    root,
    parts,
    groups,
    labels,
    cameraPos: [-36, 35, 45],
    target: [0, 12, 0],
    minDistance: 20,
    maxDistance: 130,
  };
}

// ─── 8. 5V Relay Module ────────────────────────────────────────────────────

export function buildRelay(options = {}) {
  const ctx = createModelContext();
  const { root, parts, groups, labels, G, mk } = ctx;

  const bluePCB = PM(0x0e4d7a, 0, 0.4);
  const relayCube = PM(0x1565c0, 0, 0.35);
  const termBlock = PM(0x2e7d32, 0, 0.5);
  const gold = PM(0xe0b04a, 1, 0.28);
  const tin = PM(0xdcdfe4, 1, 0.25);
  const chip = PM(0x101114, 0, 0.5);

  const gCube = G(6);

  const relayPins = [
    { x: -3, z: 18, name: 'VCC', desc: '5V DC power supply to energize the internal coil', type: 'Power In', v: '5.0V', c: '#ff4a4a' },
    { x: 0, z: 18, name: 'IN', desc: 'Active LOW/HIGH control trigger from microcontroller (optocoupler isolated)', type: 'Digital Control', v: '3.3V/5V', c: '#00e5ff' },
    { x: 3, z: 18, name: 'GND', desc: '0V Ground power return', type: 'Ground', v: '0V', c: '#9aa3ad' },
    // High Voltage Terminals
    { x: -8, z: -18, name: 'NO', desc: 'Normally Open terminal: Connected to COM only when relay is energized', type: 'Load Terminal', v: 'Up to 250VAC', c: '#ff9800' },
    { x: 0, z: -18, name: 'COM', desc: 'Common terminal: Connects to appliance live wire / load source', type: 'Load Terminal', v: 'Up to 250VAC', c: '#f2c230' },
    { x: 8, z: -18, name: 'NC', desc: 'Normally Closed terminal: Connected to COM when relay is idle / de-energized', type: 'Load Terminal', v: 'Up to 250VAC', c: '#00e5ff' },
  ];

  // PCB (50 × 26 mm)
  mk(rb(26, 1.6, 50, 0.2), bluePCB, 0, 0, 0, 'Relay Module PCB', 'Optoisolated relay module with protection flyback diode');

  // Songle Blue Relay Cube
  mk(rb(19, 15, 15, 0.3), relayCube, 0, 8.5, -4, 'Songle 5V Relay Block', 'Electromechanical relay rated for 10A 250VAC / 10A 30VDC loads', 'Relay', '250VAC', gCube);

  // 3-Pin Screw Terminal Block (Green)
  mk(rb(20, 10, 10, 0.2), termBlock, 0, 6, -18, 'Screw Terminal Block', 'Industrial screw terminals for safe high-voltage AC/DC connection', 'Terminal', '250VAC', root);
  [-6, 0, 6].forEach((x) => mk(new THREE.CylinderGeometry(1.5, 1.5, 4, 16), tin, x, 11, -18, 'Terminal Screw', 'Locking clamp screw', 'Terminal', '', root));

  // Optocoupler IC (PC817)
  mk(rb(6, 3, 4, 0.1), chip, -6, 2.5, 9, 'PC817 Optocoupler', 'Galvanic optical isolation safeguarding ESP32/Arduino from voltage spikes', 'Optoisolator', '5V', root);

  // Transistor & Flyback Diode
  mk(rb(3, 4, 2, 0.1), chip, 6, 2.8, 9, 'Driver Transistor', 'Amplifies trigger signal to drive coil current', 'Transistor', '5V', root);

  // Status & Power LEDs
  mk(rb(1.6, 0.6, 0.8, 0.05), PM(0xff3030, 0, 0.3, { emissive: 0xff1111 }), -8, 1.1, 14, 'Power LED', 'Indicates 5V power supply present', 'LED', '5V', root);
  mk(rb(1.6, 0.6, 0.8, 0.05), PM(0x00e676, 0, 0.3, { emissive: 0x00e676 }), 8, 1.1, 14, 'Relay Active LED', 'Lights green when relay coil is energized', 'LED', '5V', root);

  // Pins & Callouts
  relayPins.forEach((p) => {
    if (p.z > 0) {
      mk(B(0.64, 8, 0.64), gold, p.x, -4.5, p.z, p.name, p.desc, p.type, p.v, root);
    }
    const s = makeCalloutTag(p.name, p.c, 4.4, 1.7, 30);
    s.position.set(p.x, 8, p.z + (p.z > 0 ? 5 : -5));
    s.userData = { name: `${p.name} Terminal`, desc: p.desc, pinType: p.type, voltage: p.v, color: p.c };
    labels.add(s);
  });

  return {
    root,
    parts,
    groups,
    labels,
    cameraPos: [-36, 36, 48],
    target: [0, 4, 0],
    minDistance: 20,
    maxDistance: 130,
  };
}

// ─── 9. Generic Fallback Sensor Model ──────────────────────────────────────

export function buildGenericSensor(options = {}) {
  const ctx = createModelContext();
  const { root, parts, groups, labels, G, mk } = ctx;

  const col = options.color ? new THREE.Color(options.color).getHex() : 0x0e4d7a;
  const pcbMat = PM(col, 0, 0.4, { clearcoat: 0.4 });
  const gold = PM(0xe0b04a, 1, 0.28);
  const chip = PM(0x101114, 0, 0.5, { clearcoat: 0.3 });

  mk(rb(24, 1.6, 32, 0.2), pcbMat, 0, 0, 0, 'Breakout Board PCB', 'FR-4 multi-layer electronics breakout board');
  mk(rb(8, 1.2, 8, 0.1), chip, 0, 1.4, 0, 'Integrated Sensor IC', 'MEMS / Analog sensor transducer IC', 'Sensor IC', '3.3V-5V', root);

  const pins = [
    { x: -6, name: 'VCC', desc: 'Power supply input', type: 'Power In', v: '3.3V-5V', c: '#ff4a4a' },
    { x: -2, name: 'GND', desc: 'Ground power reference', type: 'Ground', v: '0V', c: '#9aa3ad' },
    { x: 2, name: 'SCL/SCLK', desc: 'Serial clock line', type: 'Clock', v: '3.3V', c: '#f2c230' },
    { x: 6, name: 'SDA/DATA', desc: 'Serial data line', type: 'Data', v: '3.3V', c: '#00e5ff' },
  ];

  pins.forEach((p) => {
    mk(B(0.64, 8, 0.64), gold, p.x, -4.5, 14, p.name, p.desc, p.type, p.v, root);
    const s = makeCalloutTag(p.name, p.c, 4.2, 1.7, 28);
    s.position.set(p.x, -9, 14);
    s.userData = { name: `${p.name} Pin`, desc: p.desc, pinType: p.type, voltage: p.v, color: p.c };
    labels.add(s);
  });

  return {
    root,
    parts,
    groups,
    labels,
    cameraPos: [-36, 38, 52],
    target: [0, -2, 0],
    minDistance: 15,
    maxDistance: 120,
  };
}

// ─── Dispatch Table ────────────────────────────────────────────────────────

export const BUILDER_MAP = {
  // Microcontrollers & Dev Boards
  esp32: buildESP32,
  esp32cam: buildESP32CAM,
  esp8266: buildESP8266,
  'arduino-uno': buildArduinoUno,
  'arduino-nano': buildArduinoUno,
  'raspberry-pi': buildRaspberryPi4,

  // Environmental & Acoustic Sensors
  dht11: buildDHT11,
  dht22: (opts) => buildDHT11({ ...opts, isDHT22: true }),
  ultrasonic: buildHCSR04,
  'hc-sr04': buildHCSR04,
  'pir-sensor': buildPIR,
  bmp280: buildBMP280,
  mq2: buildMQ2,
  mpu6050: buildMPU6050,
  'ir-sensor': buildIRSensor,
  ir: buildIRSensor,
  'soil-moisture': buildSoilMoisture,
  soil: buildSoilMoisture,
  'gps-module': buildGPS,
  gps: buildGPS,
  rfid: buildRFID,

  // Basic Electronic Components (From Infographic)
  led: buildLED,
  resistor: buildResistor,
  capacitor: buildCapacitor,
  pushbutton: buildPushButton,
  'push-button': buildPushButton,
  button: buildPushButton,
  potentiometer: buildPotentiometer,
  pot: buildPotentiometer,
  buzzer: buildBuzzer,
  breadboard: buildBreadboard,

  // Wireless & Communication Modules
  hc05: buildHC05,
  'hc-05': buildHC05,
  nrf24l01: buildNRF24L01,
  nrf24: buildNRF24L01,
  'lora-sx1278': buildGenericSensor,
  sim800l: buildSIM800L,
  sim800: buildSIM800L,

  // Displays & Actuators
  'oled-i2c': buildOLED,
  'lcd-i2c': buildOLED,
  'sg90-servo': buildServo,
  relay: buildRelay,
  'dc-motor': buildDCMotor,
  motor: buildDCMotor,
};

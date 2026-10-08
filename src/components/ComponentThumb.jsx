import React from 'react';

// ─── High-Fidelity Vector Graphic Component Visuals Matching Uploaded Photos ───
export function ComponentGraphic({ id, color = '#ff4444', size = 64 }) {
  const s = size;

  switch (id) {
    case 'led':
      return (
        <svg width={s} height={s} viewBox="0 0 64 64" fill="none">
          {/* Wire Leads */}
          <line x1="28" y1="38" x2="28" y2="60" stroke="#d5d8dc" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="36" y1="38" x2="36" y2="52" stroke="#d5d8dc" strokeWidth="2.5" strokeLinecap="round" />
          {/* Flange Rim Base */}
          <rect x="22" y="34" width="20" height="5" rx="2" fill="#d92534" stroke="#ff4455" strokeWidth="1" />
          {/* Main Dome Body */}
          <path d="M24 35 V20 C24 11 40 11 40 20 V35 Z" fill="url(#ledGrad)" stroke="#ff4455" strokeWidth="1.2" />
          {/* Internal Reflector Cup & Anvil */}
          <path d="M29 32 L31 25 L33 25 L35 32 Z" fill="#ffffff" opacity="0.85" />
          {/* High-Gloss Dome Specular Reflection */}
          <path d="M27 18 Q32 13 37 18" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" opacity="0.75" />
          <defs>
            <linearGradient id="ledGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff4455" />
              <stop offset="60%" stopColor="#d92534" />
              <stop offset="100%" stopColor="#991122" />
            </linearGradient>
          </defs>
        </svg>
      );

    case 'resistor':
      return (
        <svg width={s} height={s} viewBox="0 0 64 64" fill="none">
          {/* Axial Leads */}
          <path d="M6 32 H17" stroke="#d5d8dc" strokeWidth="3" strokeLinecap="round" />
          <path d="M47 32 H58" stroke="#d5d8dc" strokeWidth="3" strokeLinecap="round" />
          {/* Ceramic Body */}
          <rect x="17" y="24" width="30" height="16" rx="6" fill="#e8cca4" stroke="#cbb086" strokeWidth="1.5" />
          {/* Color Bands (Brown, Black, Red, Gold) */}
          <rect x="23" y="24" width="3.5" height="16" fill="#5c3818" />
          <rect x="29" y="24" width="3.5" height="16" fill="#181818" />
          <rect x="35" y="24" width="3.5" height="16" fill="#d92d20" />
          <rect x="42" y="24" width="3.5" height="16" fill="#d4af37" />
          {/* Cylindrical Highlight */}
          <line x1="19" y1="27" x2="45" y2="27" stroke="#ffffff" strokeWidth="1.5" opacity="0.6" />
        </svg>
      );

    case 'capacitor':
      return (
        <svg width={s} height={s} viewBox="0 0 64 64" fill="none">
          {/* Wire Leads */}
          <line x1="28" y1="46" x2="28" y2="60" stroke="#d5d8dc" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="36" y1="46" x2="36" y2="53" stroke="#d5d8dc" strokeWidth="2.5" strokeLinecap="round" />
          {/* Cylindrical Can Body */}
          <rect x="22" y="14" width="20" height="32" rx="4" fill="#1a202c" stroke="#2d3748" strokeWidth="1.5" />
          {/* Negative Polarity Stripe with Minus Signs */}
          <rect x="35" y="14" width="6" height="32" fill="#e2e8f0" />
          <line x1="37" y1="22" x2="40" y2="22" stroke="#1a202c" strokeWidth="1.5" />
          <line x1="37" y1="30" x2="40" y2="30" stroke="#1a202c" strokeWidth="1.5" />
          <line x1="37" y1="38" x2="40" y2="38" stroke="#1a202c" strokeWidth="1.5" />
          {/* Top Aluminum Vent with Cross Scored Vent */}
          <ellipse cx="32" cy="14" rx="10" ry="3.5" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1" />
          <line x1="28" y1="14" x2="36" y2="14" stroke="#64748b" strokeWidth="1" />
          <line x1="32" y1="11.5" x2="32" y2="16.5" stroke="#64748b" strokeWidth="1" />
        </svg>
      );

    case 'pushbutton':
    case 'push-button':
    case 'button':
      return (
        <svg width={s} height={s} viewBox="0 0 64 64" fill="none">
          {/* 4 Corner Legs */}
          <line x1="12" y1="20" x2="18" y2="20" stroke="#d5d8dc" strokeWidth="3" strokeLinecap="round" />
          <line x1="12" y1="44" x2="18" y2="44" stroke="#d5d8dc" strokeWidth="3" strokeLinecap="round" />
          <line x1="46" y1="20" x2="52" y2="20" stroke="#d5d8dc" strokeWidth="3" strokeLinecap="round" />
          <line x1="46" y1="44" x2="52" y2="44" stroke="#d5d8dc" strokeWidth="3" strokeLinecap="round" />
          {/* Black Base Housing */}
          <rect x="18" y="18" width="28" height="28" rx="4" fill="#18181b" stroke="#27272a" strokeWidth="1.5" />
          {/* Silver Metal Bracket Cover */}
          <rect x="20" y="20" width="24" height="24" rx="3" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1" />
          {/* 4 Corner Rivets */}
          <circle cx="23" cy="23" r="1.2" fill="#64748b" />
          <circle cx="41" cy="23" r="1.2" fill="#64748b" />
          <circle cx="23" cy="41" r="1.2" fill="#64748b" />
          <circle cx="41" cy="41" r="1.2" fill="#64748b" />
          {/* Center Round Black Plunger Button */}
          <circle cx="32" cy="32" r="7.5" fill="#18181b" stroke="#09090b" strokeWidth="1.5" />
          <circle cx="32" cy="32" r="5.5" fill="#27272a" />
        </svg>
      );

    case 'potentiometer':
    case 'pot':
      return (
        <svg width={s} height={s} viewBox="0 0 64 64" fill="none">
          {/* 3 Solder Lugs at bottom */}
          <rect x="22" y="46" width="3" height="12" rx="1.5" fill="#cbd5e1" />
          <rect x="30.5" y="46" width="3" height="12" rx="1.5" fill="#10b981" />
          <rect x="39" y="46" width="3" height="12" rx="1.5" fill="#cbd5e1" />
          {/* Round Metal Housing Can */}
          <circle cx="32" cy="30" r="18" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.5" />
          {/* Threaded Bushing Collar */}
          <circle cx="32" cy="30" r="10" fill="#d97706" stroke="#b45309" strokeWidth="1.5" />
          {/* Hex Nut */}
          <polygon points="32,18 41,24 41,36 32,42 23,36 23,24" fill="none" stroke="#b45309" strokeWidth="1.5" />
          {/* Central Knurled Metal Shaft */}
          <circle cx="32" cy="30" r="6" fill="#64748b" stroke="#334155" strokeWidth="1" />
          <line x1="28" y1="30" x2="36" y2="30" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'buzzer':
      return (
        <svg width={s} height={s} viewBox="0 0 64 64" fill="none">
          {/* Lead Pins */}
          <line x1="26" y1="46" x2="26" y2="58" stroke="#d5d8dc" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="38" y1="46" x2="38" y2="54" stroke="#d5d8dc" strokeWidth="2.5" strokeLinecap="round" />
          {/* Black Piezo Cylinder Body */}
          <rect x="17" y="16" width="30" height="30" rx="6" fill="#18181b" stroke="#27272a" strokeWidth="1.5" />
          {/* Top Sound Hole Aperture */}
          <circle cx="32" cy="31" r="5" fill="#09090b" stroke="#3f3f46" strokeWidth="1.5" />
          {/* Plus Polarity White Mark */}
          <path d="M22 24 H26 M24 22 V26" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );

    case 'bmp280':
      return (
        <svg width={s} height={s} viewBox="0 0 64 64" fill="none">
          {/* Purple Breakout PCB */}
          <rect x="18" y="10" width="28" height="44" rx="4" fill="#7e22ce" stroke="#9333ea" strokeWidth="1.5" />
          {/* Gold Mounting Hole */}
          <circle cx="24" cy="16" r="2.5" fill="#09090b" stroke="#fbbf24" strokeWidth="1.2" />
          {/* Bosch Silver Sensor Package with Port */}
          <rect x="26" y="24" width="12" height="10" rx="1.5" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1" />
          <circle cx="30" cy="29" r="1.2" fill="#334155" />
          {/* Text BMP280 */}
          <text x="32" y="38" fontSize="5" fill="#f3e8ff" fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">BMP280</text>
          {/* 4 Gold Header Pins */}
          <circle cx="23" cy="48" r="1.8" fill="#fbbf24" />
          <circle cx="29" cy="48" r="1.8" fill="#fbbf24" />
          <circle cx="35" cy="48" r="1.8" fill="#fbbf24" />
          <circle cx="41" cy="48" r="1.8" fill="#fbbf24" />
        </svg>
      );

    case 'ir-sensor':
    case 'ir':
      return (
        <svg width={s} height={s} viewBox="0 0 64 64" fill="none">
          {/* Blue PCB */}
          <rect x="20" y="16" width="24" height="40" rx="3" fill="#1d4ed8" stroke="#3b82f6" strokeWidth="1.5" />
          {/* Forward Dual LEDs: Black Receiver & Clear Transmitter */}
          <rect x="24" y="6" width="5" height="10" rx="2.5" fill="#18181b" stroke="#27272a" strokeWidth="1" />
          <rect x="35" y="6" width="5" height="10" rx="2.5" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="1" opacity="0.9" />
          {/* Blue Trim Potentiometer with Brass Screw */}
          <rect x="26" y="26" width="12" height="10" rx="2" fill="#2563eb" stroke="#1e40af" strokeWidth="1" />
          <circle cx="32" cy="31" r="2.5" fill="#d97706" />
          <line x1="30.5" y1="31" x2="33.5" y2="31" stroke="#ffffff" strokeWidth="0.8" />
          {/* 3 Gold Header Pins */}
          <circle cx="26" cy="51" r="1.8" fill="#fbbf24" />
          <circle cx="32" cy="51" r="1.8" fill="#fbbf24" />
          <circle cx="38" cy="51" r="1.8" fill="#fbbf24" />
        </svg>
      );

    case 'mq2':
      return (
        <svg width={s} height={s} viewBox="0 0 64 64" fill="none">
          {/* Blue Carrier PCB */}
          <rect x="16" y="14" width="32" height="42" rx="4" fill="#1d4ed8" stroke="#3b82f6" strokeWidth="1.5" />
          {/* Big Silver Mesh Dome Cylinder */}
          <circle cx="32" cy="28" r="13" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="2" />
          {/* Wire Mesh Texture Circles & Grid */}
          <circle cx="32" cy="28" r="9" fill="none" stroke="#64748b" strokeWidth="1" strokeDasharray="2,2" />
          <circle cx="32" cy="28" r="5" fill="#ea580c" opacity="0.85" />
          {/* 4 Header Pins */}
          <circle cx="23" cy="50" r="1.8" fill="#fbbf24" />
          <circle cx="29" cy="50" r="1.8" fill="#fbbf24" />
          <circle cx="35" cy="50" r="1.8" fill="#fbbf24" />
          <circle cx="41" cy="50" r="1.8" fill="#fbbf24" />
        </svg>
      );

    case 'mpu6050':
      return (
        <svg width={s} height={s} viewBox="0 0 64 64" fill="none">
          {/* Dark Blue PCB */}
          <rect x="18" y="12" width="28" height="42" rx="3" fill="#1e40af" stroke="#3b82f6" strokeWidth="1.5" />
          {/* MPU-6050 QFN-24 Chip in center */}
          <rect x="25" y="22" width="14" height="14" rx="1.5" fill="#09090b" stroke="#27272a" strokeWidth="1" />
          <circle cx="28" cy="25" r="1" fill="#fbbf24" />
          <text x="32" y="31" fontSize="4.5" fill="#cbd5e1" fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">MPU</text>
          {/* 8 Gold Header Pins */}
          {[21, 24, 27, 30, 33, 36, 39, 42].map((x, i) => (
            <circle key={i} cx={x} cy="48" r="1.2" fill="#fbbf24" />
          ))}
        </svg>
      );

    case 'soil-moisture':
    case 'soil':
      return (
        <svg width={s} height={s} viewBox="0 0 64 64" fill="none">
          {/* Top Header Plate */}
          <rect x="20" y="8" width="24" height="16" rx="2" fill="#1d4ed8" stroke="#3b82f6" strokeWidth="1.2" />
          {/* Dual Fork Prongs */}
          <rect x="22" y="24" width="7" height="34" rx="3.5" fill="#1d4ed8" stroke="#3b82f6" strokeWidth="1" />
          <rect x="35" y="24" width="7" height="34" rx="3.5" fill="#1d4ed8" stroke="#3b82f6" strokeWidth="1" />
          {/* Gold Zigzag Tracks on Prongs */}
          <line x1="25.5" y1="28" x2="25.5" y2="52" stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="38.5" y1="28" x2="38.5" y2="52" stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" />
          {/* Pins on top */}
          <circle cx="28" cy="14" r="1.5" fill="#fbbf24" />
          <circle cx="36" cy="14" r="1.5" fill="#fbbf24" />
        </svg>
      );

    case 'gps-module':
    case 'gps':
      return (
        <svg width={s} height={s} viewBox="0 0 64 64" fill="none">
          {/* Blue Carrier PCB */}
          <rect x="16" y="14" width="32" height="38" rx="3" fill="#1d4ed8" stroke="#3b82f6" strokeWidth="1.5" />
          {/* Square Tan Ceramic Patch Antenna */}
          <rect x="20" y="18" width="24" height="24" rx="2" fill="#d1c7b7" stroke="#b8a994" strokeWidth="1.5" />
          {/* Central Silver Dot */}
          <circle cx="32" cy="30" r="2.5" fill="#94a3b8" stroke="#475569" strokeWidth="1" />
          {/* 4 Header Pins at bottom */}
          <circle cx="23" cy="47" r="1.8" fill="#fbbf24" />
          <circle cx="29" cy="47" r="1.8" fill="#fbbf24" />
          <circle cx="35" cy="47" r="1.8" fill="#fbbf24" />
          <circle cx="41" cy="47" r="1.8" fill="#fbbf24" />
        </svg>
      );

    case 'rfid':
      return (
        <svg width={s} height={s} viewBox="0 0 64 64" fill="none">
          {/* Navy Blue Card PCB */}
          <rect x="18" y="10" width="28" height="44" rx="3" fill="#0f172a" stroke="#2563eb" strokeWidth="1.5" />
          {/* Circular Silkscreen Antenna Loops */}
          <circle cx="32" cy="36" r="11" fill="none" stroke="#e2e8f0" strokeWidth="1" opacity="0.85" />
          <circle cx="32" cy="36" r="8" fill="none" stroke="#e2e8f0" strokeWidth="1" opacity="0.85" />
          <circle cx="32" cy="36" r="5" fill="none" stroke="#e2e8f0" strokeWidth="1" opacity="0.85" />
          {/* RC522 Chip at top */}
          <rect x="27" y="16" width="10" height="10" rx="1" fill="#1e293b" stroke="#475569" strokeWidth="1" />
          {/* 8 Header Pins */}
          {[22, 25, 28, 31, 34, 37, 40, 43].map((x, i) => (
            <circle key={i} cx={x} cy="50" r="1.1" fill="#fbbf24" />
          ))}
        </svg>
      );

    case 'raspberry-pi':
      return (
        <svg width={s} height={s} viewBox="0 0 64 64" fill="none">
          {/* Emerald Green PCB */}
          <rect x="12" y="14" width="40" height="36" rx="4" fill="#15803d" stroke="#16a34a" strokeWidth="1.5" />
          {/* Broadcom CPU SoC (Silver) */}
          <rect x="25" y="24" width="10" height="10" rx="1" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1" />
          {/* Ethernet Jack (Metal) */}
          <rect x="42" y="16" width="9" height="11" rx="1.5" fill="#94a3b8" stroke="#64748b" strokeWidth="1" />
          {/* Dual USB Ports (Blue & Black) */}
          <rect x="42" y="30" width="9" height="8" rx="1.5" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="1" />
          <rect x="42" y="40" width="9" height="8" rx="1.5" fill="#18181b" stroke="#3f3f46" strokeWidth="1" />
          {/* 40-Pin GPIO Header (Dual row on top) */}
          <rect x="18" y="15" width="22" height="4" fill="#18181b" stroke="#fbbf24" strokeWidth="0.8" />
        </svg>
      );

    case 'esp32cam':
      return (
        <svg width={s} height={s} viewBox="0 0 64 64" fill="none">
          {/* Black PCB */}
          <rect x="18" y="12" width="28" height="40" rx="3" fill="#18181b" stroke="#27272a" strokeWidth="1.5" />
          {/* Yellow FPC Ribbon Cable */}
          <rect x="25" y="18" width="14" height="18" rx="1" fill="#d97706" />
          {/* OV2640 Camera Lens Module */}
          <rect x="27" y="21" width="10" height="10" rx="2" fill="#09090b" stroke="#3f3f46" strokeWidth="1" />
          <circle cx="32" cy="26" r="3.5" fill="#1e293b" stroke="#64748b" strokeWidth="1" />
          {/* High-Power Flash LED */}
          <rect x="22" y="38" width="4" height="4" rx="1" fill="#fef08a" stroke="#facc15" strokeWidth="0.8" />
          {/* Header Pin Rows */}
          <line x1="20" y1="16" x2="20" y2="48" stroke="#fbbf24" strokeWidth="2" strokeDasharray="2,2" />
          <line x1="44" y1="16" x2="44" y2="48" stroke="#fbbf24" strokeWidth="2" strokeDasharray="2,2" />
        </svg>
      );

    case 'esp8266':
      return (
        <svg width={s} height={s} viewBox="0 0 64 64" fill="none">
          {/* Slender Black PCB */}
          <rect x="20" y="8" width="24" height="48" rx="3" fill="#18181b" stroke="#27272a" strokeWidth="1.5" />
          {/* Silver ESP-12E RF Shield Can */}
          <rect x="24" y="22" width="16" height="18" rx="1.5" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1" />
          {/* Serpentine Copper Trace Antenna at top */}
          <path d="M25 12 H39 M27 15 H37 M29 18 H35" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" />
          {/* Micro USB Port at bottom */}
          <rect x="27" y="52" width="10" height="3" rx="1" fill="#94a3b8" />
          {/* Pin Headers along edges */}
          <line x1="22" y1="18" x2="22" y2="50" stroke="#fbbf24" strokeWidth="1.8" strokeDasharray="2,2" />
          <line x1="42" y1="18" x2="42" y2="50" stroke="#fbbf24" strokeWidth="1.8" strokeDasharray="2,2" />
        </svg>
      );

    case 'hc05':
    case 'hc-05':
      return (
        <svg width={s} height={s} viewBox="0 0 64 64" fill="none">
          {/* Blue Carrier PCB */}
          <rect x="20" y="12" width="24" height="42" rx="3" fill="#1d4ed8" stroke="#3b82f6" strokeWidth="1.5" />
          {/* Green Solder-on Bluetooth Submodule */}
          <rect x="23" y="16" width="18" height="26" rx="2" fill="#16a34a" stroke="#22c55e" strokeWidth="1" />
          {/* Gold Serpentine Antenna at top */}
          <path d="M26 19 H38" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" />
          {/* 6 Header Pins at bottom */}
          {[23, 26.5, 30, 33.5, 37, 40.5].map((x, i) => (
            <circle key={i} cx={x} cy="50" r="1.3" fill="#fbbf24" />
          ))}
        </svg>
      );

    case 'nrf24l01':
    case 'nrf24':
      return (
        <svg width={s} height={s} viewBox="0 0 64 64" fill="none">
          {/* Black PCB */}
          <rect x="20" y="14" width="24" height="38" rx="2.5" fill="#18181b" stroke="#27272a" strokeWidth="1.5" />
          {/* Zig-Zag Trace Antenna at top */}
          <path d="M24 18 L28 22 L32 18 L36 22 L40 18" stroke="#fbbf24" strokeWidth="1.6" strokeLinecap="round" fill="none" />
          {/* Transceiver Chip in center */}
          <rect x="27" y="27" width="10" height="10" rx="1" fill="#09090b" stroke="#3f3f46" strokeWidth="0.8" />
          {/* 2x4 Header pins at bottom */}
          <rect x="25" y="42" width="14" height="6" fill="#09090b" stroke="#fbbf24" strokeWidth="1" />
        </svg>
      );

    case 'sim800l':
    case 'sim800':
      return (
        <svg width={s} height={s} viewBox="0 0 64 64" fill="none">
          {/* Crimson Red PCB */}
          <rect x="18" y="16" width="28" height="32" rx="3" fill="#dc2626" stroke="#ef4444" strokeWidth="1.5" />
          {/* Gold Shield Can in center */}
          <rect x="23" y="22" width="18" height="18" rx="2" fill="#d4af37" stroke="#b45309" strokeWidth="1.2" />
          {/* Coiled Helical Gold Wire Spring Antenna */}
          <path d="M22 18 C20 15, 26 15, 24 12 C22 9, 28 9, 26 6" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" fill="none" />
          {/* Pins at bottom */}
          {[23, 27, 31, 35, 39, 43].map((x, i) => (
            <circle key={i} cx={x} cy="44" r="1.2" fill="#fbbf24" />
          ))}
        </svg>
      );

    case 'dc-motor':
    case 'motor':
      return (
        <svg width={s} height={s} viewBox="0 0 64 64" fill="none">
          {/* Red and Black Wires at rear */}
          <path d="M26 44 C24 50, 20 54, 16 58" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M38 44 C40 50, 44 54, 48 58" stroke="#18181b" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          {/* Metallic Can Cylindrical Body */}
          <rect x="22" y="20" width="20" height="26" rx="4" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.5" />
          {/* Front Brass Collar */}
          <rect x="28" y="14" width="8" height="6" rx="1.5" fill="#d97706" />
          {/* Shiny Steel Drive Shaft */}
          <rect x="30.5" y="4" width="3" height="10" rx="1.5" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1" />
        </svg>
      );

    case 'breadboard':
      return (
        <svg width={s} height={s} viewBox="0 0 64 64" fill="none">
          {/* Crisp White Breadboard Body */}
          <rect x="10" y="16" width="44" height="32" rx="3" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
          {/* Red & Blue Power Rails */}
          <line x1="14" y1="20" x2="50" y2="20" stroke="#ef4444" strokeWidth="1.5" />
          <line x1="14" y1="23" x2="50" y2="23" stroke="#3b82f6" strokeWidth="1.5" />
          <line x1="14" y1="41" x2="50" y2="41" stroke="#3b82f6" strokeWidth="1.5" />
          <line x1="14" y1="44" x2="50" y2="44" stroke="#ef4444" strokeWidth="1.5" />
          {/* Center Isolation Groove */}
          <line x1="14" y1="32" x2="50" y2="32" stroke="#94a3b8" strokeWidth="2" />
          {/* Tie Point Dots */}
          {[18, 26, 34, 42].map((x) => (
            <React.Fragment key={x}>
              <circle cx={x} cy="27" r="1" fill="#64748b" />
              <circle cx={x} cy="37" r="1" fill="#64748b" />
            </React.Fragment>
          ))}
        </svg>
      );

    case 'esp32':
      return (
        <svg width={s} height={s} viewBox="0 0 64 64" fill="none">
          {/* Black PCB */}
          <rect x="18" y="10" width="28" height="44" rx="3" fill="#18181b" stroke="#27272a" strokeWidth="1.5" />
          {/* Silver ESP-WROOM-32 Metal RF Can */}
          <rect x="22" y="18" width="20" height="20" rx="1.5" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1" />
          {/* Wi-Fi Antenna Trace at top */}
          <path d="M23 13 H41" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
          {/* Dual Row Gold Pins along sides */}
          <line x1="20" y1="18" x2="20" y2="48" stroke="#fbbf24" strokeWidth="2" strokeDasharray="2,2" />
          <line x1="44" y1="18" x2="44" y2="48" stroke="#fbbf24" strokeWidth="2" strokeDasharray="2,2" />
        </svg>
      );

    case 'arduino-uno':
    case 'arduino-nano':
      return (
        <svg width={s} height={s} viewBox="0 0 64 64" fill="none">
          {/* Arduino Blue PCB */}
          <rect x="14" y="14" width="36" height="36" rx="3" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.5" />
          {/* Silver USB Port */}
          <rect x="12" y="18" width="8" height="9" rx="1" fill="#cbd5e1" stroke="#64748b" strokeWidth="1" />
          {/* Black DC Barrel Jack */}
          <rect x="12" y="34" width="8" height="10" rx="1" fill="#18181b" stroke="#3f3f46" strokeWidth="1" />
          {/* ATmega328P DIP IC in center */}
          <rect x="26" y="24" width="18" height="7" rx="1" fill="#09090b" stroke="#27272a" strokeWidth="1" />
          {/* Header Rows */}
          <rect x="24" y="15" width="22" height="3" fill="#18181b" stroke="#fbbf24" strokeWidth="0.8" />
          <rect x="24" y="46" width="22" height="3" fill="#18181b" stroke="#fbbf24" strokeWidth="0.8" />
        </svg>
      );

    case 'dht11':
    case 'dht22':
      const is22 = id === 'dht22';
      return (
        <svg width={s} height={s} viewBox="0 0 64 64" fill="none">
          {/* 4 Header Pins at bottom */}
          <line x1="26" y1="46" x2="26" y2="56" stroke="#d5d8dc" strokeWidth="2" strokeLinecap="round" />
          <line x1="30" y1="46" x2="30" y2="56" stroke="#d5d8dc" strokeWidth="2" strokeLinecap="round" />
          <line x1="34" y1="46" x2="34" y2="56" stroke="#d5d8dc" strokeWidth="2" strokeLinecap="round" />
          <line x1="38" y1="46" x2="38" y2="56" stroke="#d5d8dc" strokeWidth="2" strokeLinecap="round" />
          {/* Case Body (Blue for DHT11, White for DHT22) */}
          <rect x="20" y="16" width="24" height="30" rx="3" fill={is22 ? '#f8fafc' : '#0284c7'} stroke={is22 ? '#cbd5e1' : '#38bdf8'} strokeWidth="1.5" />
          {/* Horizontal Grill Vents */}
          {[22, 26, 30, 34, 38].map((y) => (
            <line key={y} x1="24" y1={y} x2="40" y2={y} stroke={is22 ? '#94a3b8' : '#0369a1'} strokeWidth="2" strokeLinecap="round" />
          ))}
        </svg>
      );

    case 'ultrasonic':
    case 'hc-sr04':
      return (
        <svg width={s} height={s} viewBox="0 0 64 64" fill="none">
          {/* Blue PCB Base */}
          <rect x="10" y="20" width="44" height="24" rx="3" fill="#1d4ed8" stroke="#3b82f6" strokeWidth="1.5" />
          {/* Dual Silver Transducer Cylinders (T and R) */}
          <circle cx="23" cy="32" r="9" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.5" />
          <circle cx="23" cy="32" r="6" fill="#cbd5e1" stroke="#64748b" strokeWidth="1" />
          <circle cx="41" cy="32" r="9" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.5" />
          <circle cx="41" cy="32" r="6" fill="#cbd5e1" stroke="#64748b" strokeWidth="1" />
          {/* 4 Header Pins at bottom */}
          <line x1="26" y1="44" x2="26" y2="52" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
          <line x1="30" y1="44" x2="30" y2="52" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
          <line x1="34" y1="44" x2="34" y2="52" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
          <line x1="38" y1="44" x2="38" y2="52" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'pir-sensor':
      return (
        <svg width={s} height={s} viewBox="0 0 64 64" fill="none">
          {/* Green PCB */}
          <rect x="16" y="22" width="32" height="26" rx="3" fill="#15803d" stroke="#22c55e" strokeWidth="1.5" />
          {/* White Fresnel Dome Lens */}
          <circle cx="32" cy="32" r="12" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
          <circle cx="32" cy="32" r="8" fill="none" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="2,2" />
          <circle cx="32" cy="32" r="4" fill="none" stroke="#cbd5e1" strokeWidth="1" />
        </svg>
      );

    case 'oled-i2c':
    case 'lcd-i2c':
      return (
        <svg width={s} height={s} viewBox="0 0 64 64" fill="none">
          {/* Blue PCB */}
          <rect x="14" y="14" width="36" height="36" rx="3" fill="#1d4ed8" stroke="#3b82f6" strokeWidth="1.5" />
          {/* OLED Screen Glass Panel */}
          <rect x="18" y="22" width="28" height="20" rx="2" fill="#09090b" stroke="#27272a" strokeWidth="1.2" />
          {/* Blue Display Glow Graphics */}
          <line x1="22" y1="28" x2="36" y2="28" stroke="#00e5ff" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="22" y1="33" x2="42" y2="33" stroke="#00e5ff" strokeWidth="1.2" strokeLinecap="round" />
          {/* 4 Header Pins at top */}
          {[23, 29, 35, 41].map((x, i) => (
            <circle key={i} cx={x} cy="18" r="1.5" fill="#fbbf24" />
          ))}
        </svg>
      );

    case 'relay':
      return (
        <svg width={s} height={s} viewBox="0 0 64 64" fill="none">
          {/* Carrier PCB */}
          <rect x="16" y="12" width="32" height="40" rx="3" fill="#18181b" stroke="#3f3f46" strokeWidth="1.5" />
          {/* Blue Songle Relay Cube */}
          <rect x="20" y="16" width="24" height="24" rx="2" fill="#0284c7" stroke="#0369a1" strokeWidth="1.2" />
          <text x="32" y="30" fontSize="5" fill="#ffffff" fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">RELAY</text>
          {/* Terminal Blocks */}
          <rect x="20" y="42" width="24" height="7" rx="1.5" fill="#15803d" stroke="#16a34a" strokeWidth="1" />
        </svg>
      );

    case 'sg90-servo':
      return (
        <svg width={s} height={s} viewBox="0 0 64 64" fill="none">
          {/* Blue Translucent Plastic Body */}
          <rect x="18" y="22" width="28" height="22" rx="3" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.5" />
          {/* Mounting Tabs */}
          <rect x="14" y="28" width="5" height="4" fill="#0284c7" />
          <rect x="45" y="28" width="5" height="4" fill="#0284c7" />
          {/* White Servo Horn */}
          <circle cx="28" cy="20" r="5" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
          <rect x="26" y="10" width="4" height="14" rx="2" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
        </svg>
      );

    default:
      return (
        <svg width={s} height={s} viewBox="0 0 64 64" fill="none">
          <rect x="16" y="16" width="32" height="32" rx="4" fill="#18181b" stroke={color} strokeWidth="1.5" />
          <rect x="24" y="24" width="16" height="16" rx="2" fill="#27272a" />
          <circle cx="32" cy="32" r="4" fill={color} />
        </svg>
      );
  }
}

export default function ComponentThumb({
  componentId,
  color = '#ff4444',
  height = 80,
  pins = null,
}) {
  return (
    <div
      style={{
        width: '100%',
        height,
        borderRadius: 10,
        background: `radial-gradient(circle at 50% 40%, rgba(255,255,255,0.04) 0%, #0d1017 100%)`,
        border: `1px solid ${color}33`,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        boxShadow: `inset 0 0 24px rgba(0,0,0,0.7)`,
        transition: 'all 0.25s ease',
      }}
    >
      {/* High-Fidelity 3D Visual Illustration matching user uploaded photos */}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2,
          filter: `drop-shadow(0 6px 12px rgba(0,0,0,0.6)) drop-shadow(0 0 10px ${color}25)`,
        }}
      >
        <ComponentGraphic id={componentId} color={color} size={Math.min(height * 0.78, 64)} />
      </div>

      {/* 3D Interactive Badge */}
      <div
        style={{
          position: 'absolute',
          bottom: 5,
          right: 6,
          fontSize: 10,
          fontWeight: 800,
          fontFamily: 'JetBrains Mono, monospace',
          color: color,
          background: 'rgba(0,0,0,0.65)',
          padding: '2px 5px',
          borderRadius: 4,
          border: `1px solid ${color}44`,
          letterSpacing: 0.5,
          zIndex: 3,
        }}
      >
        3D MODEL
      </div>
    </div>
  );
}

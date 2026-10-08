// ==================== IoT Component Database ====================

export const basicComponents = [
  {
    id: 'led',
    name: 'LED',
    category: 'Basic',
    subcategory: 'Output',
    level: 'beginner',
    voltage: '1.8V - 3.3V',
    current: '10-20mA',
    protocol: 'GPIO',
    color: '#ff4444',
    description: 'Light Emitting Diode – a semiconductor device that emits light when current flows through it.',
    howWorks: 'When forward biased with proper voltage, electrons recombine with holes in the semiconductor, releasing energy as photons (light). The color depends on the semiconductor material.',
    specifications: {
      'Forward Voltage': '1.8V – 3.3V (depends on color)',
      'Forward Current': '10–20 mA (max 30mA)',
      'Wavelength': '400–700 nm',
      'Luminous Intensity': '10–100 mcd',
      'Viewing Angle': '15°–170°',
    },
    symbol: 'LED Arrow Symbol',
    applications: ['Status indicators', 'Display backlights', 'Traffic signals', 'Night lights', 'Data transmission'],
    pins: [
      { name: 'Anode (+)', function: 'Positive terminal', color: 'longer leg' },
      { name: 'Cathode (–)', function: 'Negative terminal', color: 'shorter leg / flat side' },
    ],
    esp32Connection: [
      { component: 'Anode (+)', esp32: 'GPIO (via 220Ω resistor)', type: 'Signal' },
      { component: 'Cathode (–)', esp32: 'GND', type: 'Ground' },
    ],
    tip: 'Always use a current-limiting resistor (220Ω–1kΩ) to protect the LED and ESP32 GPIO pin.',
    safetyWarning: 'Never connect LED directly to 5V without a resistor. Always calculate: R = (Vsupply - Vf) / If',
    relatedComponents: ['resistor', 'transistor', 'relay', 'buzzer'],
    code: `// Blink LED on GPIO 2
#define LED_PIN 2

void setup() {
  pinMode(LED_PIN, OUTPUT);
}

void loop() {
  digitalWrite(LED_PIN, HIGH); // Turn ON
  delay(1000);
  digitalWrite(LED_PIN, LOW);  // Turn OFF
  delay(1000);
}`,
  },
  {
    id: 'resistor',
    name: 'Resistor',
    category: 'Basic',
    subcategory: 'Passive',
    level: 'beginner',
    voltage: 'Any',
    current: 'Depends on resistance',
    protocol: 'Passive',
    color: '#ffaa44',
    description: 'A passive two-terminal electrical component that limits current flow according to Ohm\'s Law (V = IR).',
    howWorks: 'Resistors oppose the flow of electrical current. The resistance is determined by the material, length, and cross-sectional area of the resistive element. Heat is generated as current passes through.',
    specifications: {
      'Resistance Range': '1Ω – 10MΩ (standard)',
      'Tolerance': '±1%, ±5%, ±10%',
      'Power Rating': '0.25W, 0.5W, 1W, 2W',
      'Temperature Coefficient': '±100 ppm/°C',
    },
    applications: ['Current limiting for LEDs', 'Voltage dividers', 'Pull-up/pull-down resistors', 'Signal conditioning'],
    pins: [
      { name: 'Lead 1', function: 'First terminal (non-polarized)' },
      { name: 'Lead 2', function: 'Second terminal (non-polarized)' },
    ],
    esp32Connection: [
      { component: 'Lead 1', esp32: 'GPIO or VCC', type: 'Signal/Power' },
      { component: 'Lead 2', esp32: 'Component or GND', type: 'Signal/Ground' },
    ],
    tip: 'Use the color band code to identify resistance: Brown-Black-Red = 1kΩ (4-band). Use online calculators for quick readings.',
    safetyWarning: 'Ensure power rating is sufficient. A 0.25W resistor with 5V @ 100mA will exceed its rating and overheat.',
    code: `// Ohm's Law Calculator
// R = V / I
// 3.3V supply, 20mA LED current
// R = 3.3 / 0.02 = 165Ω → use 220Ω`,
  },
  {
    id: 'capacitor',
    name: 'Capacitor',
    category: 'Basic',
    subcategory: 'Passive',
    level: 'beginner',
    voltage: 'Depends on type',
    current: 'Transient',
    protocol: 'Passive',
    color: '#4488ff',
    description: 'An energy-storage device that stores electric charge in an electric field between two conductive plates.',
    howWorks: 'Two conducting plates separated by a dielectric material store charge when voltage is applied. Energy stored = ½CV². Capacitors block DC and allow AC to pass.',
    specifications: {
      'Capacitance': '1pF – 10,000µF',
      'Voltage Rating': '6.3V – 1000V',
      'Types': 'Electrolytic, Ceramic, Tantalum, Film',
      'ESR': 'Low ESR for decoupling',
    },
    applications: ['Power supply filtering', 'Decoupling noise', 'Timer circuits', 'Coupling/blocking DC', 'Energy storage'],
    pins: [
      { name: 'Positive (+)', function: 'Anode (polarized types)' },
      { name: 'Negative (–)', function: 'Cathode (marked with stripe)' },
    ],
    esp32Connection: [
      { component: '+', esp32: 'VCC (power rail)', type: 'Power' },
      { component: '–', esp32: 'GND', type: 'Ground' },
    ],
    tip: 'Place 100nF ceramic capacitors close to ESP32 power pins to reduce noise and improve stability.',
    safetyWarning: 'Electrolytic capacitors are polarized – wrong polarity can cause explosion! Always check (+) and (–) markings.',
  },
  {
    id: 'pushbutton',
    name: 'Push Button',
    category: 'Basic',
    subcategory: 'Input',
    level: 'beginner',
    voltage: '3.3V',
    current: '<1mA',
    protocol: 'GPIO Digital',
    color: '#44ff88',
    description: 'A momentary switch that connects two terminals when pressed, and disconnects when released.',
    howWorks: 'When pressed, internal spring-loaded contacts connect. When released, spring returns contacts to open position. Debouncing is required in software to prevent false triggers.',
    specifications: {
      'Contact Rating': '12V DC, 50mA',
      'Contact Resistance': '<100mΩ',
      'Operating Force': '1.5N',
      'Bounce Time': '5–10ms (debounce required)',
    },
    applications: ['User input', 'Reset button', 'Mode selector', 'Emergency stop', 'Menu navigation'],
    pins: [
      { name: 'Pin 1', function: 'Common terminal A' },
      { name: 'Pin 2', function: 'Common terminal B' },
      { name: 'Pin 3', function: 'Normally Open A' },
      { name: 'Pin 4', function: 'Normally Open B' },
    ],
    esp32Connection: [
      { component: 'One side', esp32: 'GPIO (with pull-up)', type: 'Signal' },
      { component: 'Other side', esp32: 'GND', type: 'Ground' },
    ],
    tip: 'Enable internal pull-up: pinMode(BUTTON_PIN, INPUT_PULLUP). Button reads HIGH normally, LOW when pressed.',
    safetyWarning: 'Always use pull-up or pull-down resistors. Floating inputs cause random false triggers.',
    code: `#define BTN_PIN 4

void setup() {
  pinMode(BTN_PIN, INPUT_PULLUP);
  Serial.begin(115200);
}

void loop() {
  if (digitalRead(BTN_PIN) == LOW) {
    Serial.println("Button Pressed!");
    delay(50); // debounce
  }
}`,
  },
  {
    id: 'potentiometer',
    name: 'Potentiometer',
    category: 'Basic',
    subcategory: 'Input',
    level: 'beginner',
    voltage: '3.3V',
    current: '<1mA',
    protocol: 'Analog (ADC)',
    color: '#ff8844',
    description: 'A variable resistor with three terminals that acts as an adjustable voltage divider.',
    howWorks: 'A resistive track with a sliding wiper divides the total resistance. Rotating the knob changes the wiper position, varying the output voltage from 0V to Vcc proportionally.',
    specifications: {
      'Resistance': '1kΩ, 10kΩ, 100kΩ (common values)',
      'Power Rating': '0.5W typically',
      'Rotation': '270° or 360° (multi-turn)',
      'Taper': 'Linear or Logarithmic',
    },
    applications: ['Volume control', 'Speed control', 'Brightness adjustment', 'Calibration', 'User input'],
    pins: [
      { name: 'Left Pin', function: 'Connect to GND or VCC' },
      { name: 'Middle Pin (Wiper)', function: 'Output signal' },
      { name: 'Right Pin', function: 'Connect to VCC or GND' },
    ],
    esp32Connection: [
      { component: 'Left Pin', esp32: 'GND', type: 'Ground' },
      { component: 'Middle (Wiper)', esp32: 'GPIO 34 (ADC)', type: 'Analog Signal' },
      { component: 'Right Pin', esp32: '3.3V', type: 'Power' },
    ],
    tip: 'ESP32 ADC reads 0–4095 (12-bit). Map to useful range: map(analogRead(pin), 0, 4095, 0, 100)',
    safetyWarning: 'ESP32 ADC pins are 3.3V max. Never apply 5V to ADC pins.',
    code: `#define POT_PIN 34

void setup() {
  Serial.begin(115200);
}

void loop() {
  int raw = analogRead(POT_PIN);
  int percent = map(raw, 0, 4095, 0, 100);
  Serial.printf("Position: %d%%\\n", percent);
  delay(100);
}`,
  },
  {
    id: 'buzzer',
    name: 'Buzzer',
    category: 'Basic',
    subcategory: 'Output',
    level: 'beginner',
    voltage: '3.3V – 5V',
    current: '20–30mA',
    protocol: 'GPIO / PWM',
    color: '#ff4488',
    description: 'An electromechanical or piezoelectric device that produces sound when energized.',
    howWorks: 'Active buzzers contain an internal oscillator and produce sound when powered. Passive buzzers require an external frequency (PWM) to produce sound and can play different tones.',
    specifications: {
      'Operating Voltage': '3.3V – 5V DC',
      'Current Consumption': '20–30mA',
      'Sound Level': '85–95 dB',
      'Frequency': 'Active: 2kHz fixed; Passive: 1Hz–10kHz variable',
      'Types': 'Active (built-in oscillator), Passive (requires PWM)',
    },
    applications: ['Alarms', 'Notifications', 'Audio feedback', 'Doorbells', 'Security systems'],
    pins: [
      { name: '+', function: 'Positive terminal (VCC)' },
      { name: '–', function: 'Negative terminal (GND)' },
    ],
    esp32Connection: [
      { component: '+', esp32: 'GPIO 5 (via transistor for 5V buzzers)', type: 'Signal/Power' },
      { component: '–', esp32: 'GND', type: 'Ground' },
    ],
    tip: 'For passive buzzers, use tone() function. For active buzzers, just digitalWrite HIGH/LOW.',
    safetyWarning: 'Buzzers can draw more current than GPIO can supply (8mA max). Use a transistor for protection.',
    code: `#define BUZZER_PIN 5

void setup() {
  pinMode(BUZZER_PIN, OUTPUT);
}

void loop() {
  // Beep pattern
  tone(BUZZER_PIN, 1000, 200); // 1kHz for 200ms
  delay(400);
  tone(BUZZER_PIN, 2000, 200);
  delay(600);
}`,
  },
  {
    id: 'relay',
    name: 'Relay',
    category: 'Basic',
    subcategory: 'Output',
    level: 'intermediate',
    voltage: 'Coil: 5V/12V; Contacts: 250VAC/30VDC',
    current: '70–80mA coil; up to 10A contacts',
    protocol: 'GPIO Digital',
    color: '#8844ff',
    description: 'An electrically-operated switch that allows low-power circuits to control high-power loads safely.',
    howWorks: 'An electromagnetic coil creates a magnetic field when energized, attracting a metal armature that closes (or opens) switch contacts. Allows ESP32 (3.3V) to control AC mains (230V) safely.',
    specifications: {
      'Coil Voltage': '5V or 12V DC',
      'Coil Current': '70–80mA',
      'Contact Rating': '10A at 250VAC / 30VDC',
      'Switch Types': 'NO (Normally Open), NC (Normally Closed), COM (Common)',
    },
    applications: ['Home automation', 'Light switching', 'Motor control', 'Appliance control', 'Industrial control'],
    pins: [
      { name: 'VCC', function: '5V power supply' },
      { name: 'GND', function: 'Ground' },
      { name: 'IN', function: 'Control signal from microcontroller' },
      { name: 'COM', function: 'Common contact of switch' },
      { name: 'NO', function: 'Normally Open contact' },
      { name: 'NC', function: 'Normally Closed contact' },
    ],
    esp32Connection: [
      { component: 'VCC', esp32: '5V (external supply)', type: 'Power' },
      { component: 'GND', esp32: 'GND', type: 'Ground' },
      { component: 'IN', esp32: 'GPIO 26', type: 'Signal (Active LOW)' },
    ],
    tip: 'Most relay modules are Active-LOW (LOW = ON). Always use a flyback diode across the coil to protect against voltage spikes.',
    safetyWarning: '⚠️ HIGH VOLTAGE HAZARD. Never touch AC wiring while powered. Use properly insulated enclosures. AC mains can be fatal.',
    code: `#define RELAY_PIN 26

void setup() {
  pinMode(RELAY_PIN, OUTPUT);
  digitalWrite(RELAY_PIN, HIGH); // Relay OFF (active LOW)
}

void loop() {
  digitalWrite(RELAY_PIN, LOW);  // Turn ON
  delay(2000);
  digitalWrite(RELAY_PIN, HIGH); // Turn OFF
  delay(2000);
}`,
  },
  {
    id: 'breadboard',
    name: 'Breadboard',
    category: 'Basic',
    subcategory: 'Tool',
    level: 'beginner',
    voltage: 'Any (up to rated voltage)',
    current: 'Up to 1A per row',
    protocol: 'Physical Connection',
    color: '#44ffaa',
    description: 'A solderless prototyping board that allows temporary circuit assembly using wire connections.',
    howWorks: 'Rows of spring-loaded metal clips make electrical connections between components. Horizontal rows in the center are connected. Vertical rails (+/–) run along the edges for power distribution.',
    specifications: {
      'Tie Points': '400, 830, or 1660 (common sizes)',
      'Hole Spacing': '2.54mm (0.1 inch)',
      'Max Current': '1A per row',
      'Max Voltage': '300V',
      'Compatible': 'DIP ICs, wires, resistors, LEDs',
    },
    applications: ['Circuit prototyping', 'Testing', 'Learning electronics', 'Quick assembly'],
    tip: 'Power rails run vertically (+/–). Central rows run horizontally. IC chips straddle the center gap to prevent pin shorts.',
    safetyWarning: 'Breadboard connections can be loose. Always double-check before powering up. Not suitable for high-current or high-frequency circuits.',
  },
  {
    id: 'jumperwires',
    name: 'Jumper Wires',
    category: 'Basic',
    subcategory: 'Tool',
    level: 'beginner',
    voltage: 'Up to 5V typical',
    current: 'Up to 0.5A',
    protocol: 'Physical Connection',
    color: '#ffdd44',
    description: 'Pre-made wire connectors used to make temporary connections between components on a breadboard or between modules.',
    howWorks: 'Flexible wires with pre-crimped dupont connectors on each end. Available in Male-to-Male (M-M), Male-to-Female (M-F), and Female-to-Female (F-F) configurations.',
    specifications: {
      'Types': 'Male-Male, Male-Female, Female-Female',
      'Length': '10cm, 15cm, 20cm (common)',
      'AWG': '28 AWG typical',
      'Colors': 'Multiple colors for organization',
    },
    applications: ['Breadboard prototyping', 'Module connections', 'Sensor wiring', 'Arduino/ESP32 projects'],
    tip: 'Use color coding: Red = VCC/Power, Black/Blue = GND, Yellow/Green = Signal, Orange = SCL, White = SDA.',
    safetyWarning: 'Ensure secure connections. Loose jumper wires can cause intermittent faults and damage components.',
  },
  {
    id: 'diode',
    name: 'Diode',
    category: 'Basic',
    subcategory: 'Passive',
    level: 'beginner',
    voltage: '0.6V – 1.2V forward drop',
    current: '1A (1N4007)',
    protocol: 'Passive',
    color: '#ff6688',
    description: 'A semiconductor device that allows current to flow in one direction only (one-way valve for electricity).',
    howWorks: 'The P-N junction in a diode creates a built-in electric field. In forward bias (+ to Anode), current flows. In reverse bias, current is blocked up to the breakdown voltage.',
    specifications: {
      'Forward Voltage Drop': '0.6V (Si), 0.3V (Ge), 0.3V (Schottky)',
      'Peak Reverse Voltage': '1000V (1N4007)',
      'Average Current': '1A (1N4007)',
      'Types': '1N4007, 1N4148, Schottky, Zener',
    },
    applications: ['Reverse polarity protection', 'Flyback protection for relays', 'Rectifiers', 'Clipping circuits'],
    pins: [
      { name: 'Anode (A)', function: 'Positive terminal – current flows IN' },
      { name: 'Cathode (K)', function: 'Negative terminal – stripe end' },
    ],
    esp32Connection: [
      { component: 'Anode', esp32: 'Across relay coil (positive side)', type: 'Protection' },
      { component: 'Cathode', esp32: 'Across relay coil (VCC side)', type: 'Protection' },
    ],
    tip: 'The silver/grey stripe marks the Cathode. Current flows from Anode → Cathode (in conventional current direction).',
    safetyWarning: 'Installing backwards blocks all current and nothing will work. Check polarity before installation.',
  },
];

export const sensors = [
  // ========= BASIC SENSORS =========
  {
    id: 'ldr',
    name: 'LDR (Light Sensor)',
    category: 'Sensors',
    subcategory: 'Basic',
    level: 'beginner',
    voltage: '3.3V – 5V',
    protocol: 'Analog',
    measures: 'Light intensity',
    range: '0 – 100%',
    color: '#ffdd44',
    unit: 'lux / %',
    description: 'A Light Dependent Resistor (LDR) or photoresistor changes resistance based on ambient light intensity.',
    howWorks: 'Made from cadmium sulfide (CdS), resistance decreases as light increases (photoconductivity). Used in a voltage divider circuit to convert light to voltage for ADC reading.',
    specifications: {
      'Resistance (dark)': '10kΩ – 1MΩ',
      'Resistance (bright)': '100Ω – 1kΩ',
      'Max Power': '90mW',
      'Response Time': '20ms (dark→light)',
      'Operating Voltage': '3.3V – 5V',
    },
    pins: [
      { name: 'Pin 1', function: 'One side of LDR' },
      { name: 'Pin 2', function: 'Other side of LDR (non-polarized)' },
    ],
    esp32Connection: [
      { component: 'LDR Pin 1', esp32: '3.3V', type: 'Power' },
      { component: 'LDR Pin 2', esp32: 'GPIO 34 + 10kΩ to GND', type: 'Analog Signal' },
    ],
    applications: ['Automatic street lights', 'Screen brightness control', 'Solar trackers', 'Security systems'],
    tip: 'Connect LDR in voltage divider with 10kΩ resistor. Output goes to ESP32 ADC pin (GPIO 34, 35, 36, 39).',
    safetyWarning: 'ADC pins on ESP32 are limited to 3.3V. Never connect directly to 5V signal.',
    simulatedValue: () => Math.round(Math.random() * 40 + 40),
    simulatedUnit: '%',
    code: `#define LDR_PIN 34

void setup() {
  Serial.begin(115200);
}

void loop() {
  int raw = analogRead(LDR_PIN);
  int light = map(raw, 0, 4095, 0, 100);
  Serial.printf("Light: %d%%\\n", light);
  if (light < 30) {
    Serial.println("Dark - Activate lights!");
  }
  delay(500);
}`,
  },
  {
    id: 'ir-sensor',
    name: 'IR Sensor',
    category: 'Sensors',
    subcategory: 'Basic',
    level: 'beginner',
    voltage: '3.3V – 5V',
    protocol: 'GPIO Digital',
    measures: 'Object proximity/reflection',
    range: '2 – 30 cm',
    color: '#ff8844',
    unit: 'Detected / Not Detected',
    description: 'Infrared Proximity Sensor that detects objects using an IR LED transmitter and IR photodiode receiver pair.',
    howWorks: 'IR LED emits infrared light. When an object reflects the IR back, the photodiode detects it and outputs a digital LOW signal. Used for obstacle detection and line following.',
    specifications: {
      'Operating Voltage': '3.3V – 5V',
      'Output': 'Digital HIGH/LOW',
      'Detection Range': '2 – 30 cm (adjustable)',
      'Detection Angle': '35°',
      'Response Time': '2ms',
    },
    pins: [
      { name: 'VCC', function: 'Power supply (3.3V–5V)' },
      { name: 'GND', function: 'Ground' },
      { name: 'OUT', function: 'Digital output (LOW = detected)' },
    ],
    esp32Connection: [
      { component: 'VCC', esp32: '3.3V', type: 'Power' },
      { component: 'GND', esp32: 'GND', type: 'Ground' },
      { component: 'OUT', esp32: 'GPIO 4', type: 'Digital Signal' },
    ],
    applications: ['Line-following robots', 'Obstacle detection', 'Object counting', 'Automatic doors'],
    tip: 'Sensitivity is adjustable via the onboard potentiometer. Tune in a consistent light environment.',
    safetyWarning: 'Bright sunlight can blind the IR sensor. Use in shaded environments for best results.',
    simulatedValue: () => Math.random() > 0.6 ? 1 : 0,
    simulatedUnit: 'Detection',
    code: `#define IR_PIN 4

void setup() {
  pinMode(IR_PIN, INPUT);
  Serial.begin(115200);
}

void loop() {
  int detected = !digitalRead(IR_PIN); // LOW = detected
  Serial.println(detected ? "Object Detected!" : "Clear");
  delay(100);
}`,
  },
  {
    id: 'pir-sensor',
    name: 'PIR Motion Sensor',
    category: 'Sensors',
    subcategory: 'Basic',
    level: 'beginner',
    voltage: '5V – 12V',
    protocol: 'GPIO Digital',
    measures: 'Human/animal motion',
    range: '3 – 7 meters',
    color: '#ff4488',
    unit: 'Motion/No Motion',
    description: 'Passive Infrared (PIR) sensor detects infrared radiation emitted by warm bodies (humans/animals) in motion.',
    howWorks: 'Uses a pyroelectric sensor that detects IR radiation changes. Fresnel lens focuses IR on two sensor areas. Motion creates differential IR signals, triggering the output.',
    specifications: {
      'Operating Voltage': '5V – 12V',
      'Detection Range': '3 – 7 meters',
      'Detection Angle': '110°',
      'Trigger Time': '5 – 200 seconds (adjustable)',
      'Output': 'Digital HIGH (3.3V) on detection',
    },
    pins: [
      { name: 'VCC', function: 'Power supply (5V–12V)' },
      { name: 'GND', function: 'Ground' },
      { name: 'OUT', function: 'Digital output (HIGH = motion)' },
    ],
    esp32Connection: [
      { component: 'VCC', esp32: '5V (external or Vin)', type: 'Power' },
      { component: 'GND', esp32: 'GND', type: 'Ground' },
      { component: 'OUT', esp32: 'GPIO 13', type: 'Digital Signal' },
    ],
    applications: ['Security alarms', 'Automatic lights', 'Burglar detection', 'Smart home motion sensing'],
    tip: 'PIR has two adjustable pots: sensitivity (range) and time delay (how long output stays HIGH after detection).',
    safetyWarning: 'Allow 30–60 seconds warm-up time after power-on for calibration.',
    simulatedValue: () => Math.random() > 0.7 ? 1 : 0,
    simulatedUnit: 'Motion',
    code: `#define PIR_PIN 13

void setup() {
  pinMode(PIR_PIN, INPUT);
  Serial.begin(115200);
  Serial.println("PIR Warming up...");
  delay(30000); // 30s warmup
}

void loop() {
  if (digitalRead(PIR_PIN) == HIGH) {
    Serial.println("🚨 Motion Detected!");
    delay(2000);
  }
}`,
  },
  {
    id: 'ultrasonic',
    name: 'Ultrasonic Sensor HC-SR04',
    category: 'Sensors',
    subcategory: 'Basic',
    level: 'beginner',
    voltage: '5V',
    protocol: 'GPIO (Trig/Echo)',
    measures: 'Distance',
    range: '2 cm – 4 m',
    color: '#44aaff',
    unit: 'cm',
    description: 'Measures distance using ultrasonic sound waves. Sends a sound pulse and measures the echo return time.',
    howWorks: 'Sends a 40kHz ultrasonic burst (TRIG pulse). Sound bounces off object, ECHO pin goes HIGH for the return time. Distance = (time × 0.034) / 2',
    specifications: {
      'Operating Voltage': '5V DC',
      'Measuring Range': '2 cm – 400 cm',
      'Accuracy': '±3mm',
      'Frequency': '40 kHz',
      'Beam Angle': '15°',
      'Trigger Pulse': '10µs TTL pulse',
    },
    pins: [
      { name: 'VCC', function: '5V power supply' },
      { name: 'TRIG', function: 'Trigger input (send pulse)' },
      { name: 'ECHO', function: 'Echo output (measure return)' },
      { name: 'GND', function: 'Ground' },
    ],
    esp32Connection: [
      { component: 'VCC', esp32: '5V (Vin)', type: 'Power' },
      { component: 'TRIG', esp32: 'GPIO 5', type: 'Output Signal' },
      { component: 'ECHO', esp32: 'GPIO 18 (via voltage divider)', type: 'Input Signal (use 3.3V divider!)' },
      { component: 'GND', esp32: 'GND', type: 'Ground' },
    ],
    applications: ['Obstacle avoidance robots', 'Smart parking', 'Water level sensing', 'People counting'],
    tip: 'HC-SR04 outputs 5V on ECHO but ESP32 is 3.3V logic! Use a voltage divider (1kΩ + 2kΩ) or level shifter on ECHO pin.',
    safetyWarning: 'Direct connection of ECHO to ESP32 GPIO will damage the ESP32! Always use voltage divider.',
    simulatedValue: () => Math.round(Math.random() * 150 + 5),
    simulatedUnit: 'cm',
    code: `#define TRIG_PIN 5
#define ECHO_PIN 18

void setup() {
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);
  Serial.begin(115200);
}

void loop() {
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);
  
  long duration = pulseIn(ECHO_PIN, HIGH);
  float distance = (duration * 0.034) / 2;
  
  Serial.printf("Distance: %.1f cm\\n", distance);
  delay(500);
}`,
  },
  {
    id: 'dht11',
    name: 'DHT11 Temperature & Humidity Sensor',
    category: 'Sensors',
    subcategory: 'Environmental',
    level: 'beginner',
    voltage: '3.3V – 5V',
    protocol: 'Single-Wire Digital',
    measures: 'Temperature & Humidity',
    range: 'Temp: 0–50°C, Humidity: 20–80%',
    color: '#44ffaa',
    unit: '°C / %RH',
    description: 'DHT11 is a low-cost digital sensor for measuring ambient temperature and relative humidity.',
    howWorks: 'Uses a capacitive humidity sensor and thermistor for measurement. Communicates via a single-wire proprietary protocol, sending 40-bit data packets. Requires a 4.7kΩ–10kΩ pull-up resistor on data line.',
    specifications: {
      'Temperature Range': '0°C to 50°C (±2°C accuracy)',
      'Humidity Range': '20% to 80% RH (±5% accuracy)',
      'Sampling Rate': '1 reading per second (max)',
      'Resolution': 'Temperature: 1°C, Humidity: 1%',
      'Operating Voltage': '3.3V – 5.5V',
      'Cable Length': 'Up to 20m with proper pull-up',
    },
    pins: [
      { name: 'VCC', function: 'Power supply (3.3V or 5V)' },
      { name: 'DATA', function: 'Single-wire data line (requires 4.7–10kΩ pull-up)' },
      { name: 'NC', function: 'Not connected (pin 3)' },
      { name: 'GND', function: 'Ground' },
    ],
    esp32Connection: [
      { component: 'VCC', esp32: '3.3V', type: 'Power' },
      { component: 'DATA', esp32: 'GPIO 4 (with 10kΩ to 3.3V)', type: 'Single-Wire Signal' },
      { component: 'GND', esp32: 'GND', type: 'Ground' },
    ],
    applications: ['Weather stations', 'Smart home climate control', 'Greenhouse monitoring', 'HVAC systems'],
    tip: 'Always add a 4.7kΩ–10kΩ pull-up resistor between DATA and VCC. Use DHT library: DHT dht(4, DHT11);',
    safetyWarning: 'Do not read DHT11 more than once per second – this causes timing errors and returns NaN values.',
    simulatedValue: () => ({ temp: (Math.random() * 15 + 20).toFixed(1), humidity: Math.round(Math.random() * 30 + 50) }),
    simulatedUnit: '°C / %RH',
    code: `#include <DHT.h>
#define DHT_PIN 4
DHT dht(DHT_PIN, DHT11);

void setup() {
  Serial.begin(115200);
  dht.begin();
}

void loop() {
  delay(2000); // Min 2s between readings
  float temp = dht.readTemperature();
  float humidity = dht.readHumidity();
  
  if (isnan(temp) || isnan(humidity)) {
    Serial.println("DHT11 Read Error!");
    return;
  }
  Serial.printf("Temp: %.1f°C | Humidity: %.1f%%\\n", temp, humidity);
}`,
  },
  {
    id: 'dht22',
    name: 'DHT22 Temperature & Humidity Sensor',
    category: 'Sensors',
    subcategory: 'Environmental',
    level: 'intermediate',
    voltage: '3.3V – 5V',
    protocol: 'Single-Wire Digital',
    measures: 'Temperature & Humidity',
    range: 'Temp: -40 to 80°C, Humidity: 0–100%',
    color: '#44ffcc',
    unit: '°C / %RH',
    description: 'Higher accuracy version of DHT11 with wider measurement range, decimal resolution, and better accuracy.',
    howWorks: 'Same principle as DHT11 but with improved capacitive humidity sensor and NTC thermistor. Provides 0.1°C resolution and ±0.5°C accuracy.',
    specifications: {
      'Temperature Range': '-40°C to 80°C (±0.5°C accuracy)',
      'Humidity Range': '0% to 100% RH (±2% accuracy)',
      'Resolution': 'Temperature: 0.1°C, Humidity: 0.1%',
      'Sampling Rate': '0.5 Hz (one reading per 2 seconds)',
      'Operating Voltage': '3.3V – 5.5V',
    },
    pins: [
      { name: 'VCC', function: '3.3V or 5V power supply' },
      { name: 'DATA', function: 'Single-wire data (4.7kΩ pull-up required)' },
      { name: 'NC', function: 'Not connected' },
      { name: 'GND', function: 'Ground' },
    ],
    esp32Connection: [
      { component: 'VCC', esp32: '3.3V', type: 'Power' },
      { component: 'DATA', esp32: 'GPIO 4 (with 4.7kΩ to 3.3V)', type: 'Single-Wire Signal' },
      { component: 'GND', esp32: 'GND', type: 'Ground' },
    ],
    applications: ['Precision weather stations', 'Industrial climate monitoring', 'Cold chain monitoring', 'Smart greenhouses'],
    tip: 'DHT22 provides decimal values (e.g., 23.4°C vs DHT11\'s 23°C). Wait 2 seconds minimum between readings.',
    safetyWarning: 'Use DHT22 (AM2302) library. Don\'t confuse with DHT11 in code – different timing protocol.',
    simulatedValue: () => ({ temp: (Math.random() * 20 + 15).toFixed(1), humidity: (Math.random() * 40 + 40).toFixed(1) }),
    simulatedUnit: '°C / %RH',
    code: `#include <DHT.h>
#define DHT_PIN 4
DHT dht(DHT_PIN, DHT22); // Note: DHT22 not DHT11

void setup() {
  Serial.begin(115200);
  dht.begin();
}

void loop() {
  delay(2000);
  float temp = dht.readTemperature();
  float hum = dht.readHumidity();
  float hic = dht.computeHeatIndex(temp, hum, false);
  
  Serial.printf("Temp: %.1f°C | Humidity: %.1f%% | Heat Index: %.1f°C\\n", temp, hum, hic);
}`,
  },
  {
    id: 'bmp280',
    name: 'BMP280 Pressure Sensor',
    category: 'Sensors',
    subcategory: 'Environmental',
    level: 'intermediate',
    voltage: '1.8V – 3.6V',
    protocol: 'I2C / SPI',
    measures: 'Atmospheric pressure & Temperature',
    range: '300–1100 hPa',
    color: '#4488ff',
    unit: 'hPa / °C',
    description: 'High-precision barometric pressure and temperature sensor from Bosch. Used for altitude calculation and weather forecasting.',
    howWorks: 'Piezoresistive pressure sensing element measures the mechanical deformation caused by atmospheric pressure. Also includes a calibrated temperature sensor for compensation.',
    specifications: {
      'Pressure Range': '300–1100 hPa',
      'Pressure Accuracy': '±1 hPa',
      'Altitude Accuracy': '±1 meter',
      'Temperature Range': '-40°C to +85°C',
      'Interface': 'I2C (addr: 0x76 or 0x77) / SPI',
      'Supply Voltage': '1.8V – 3.6V',
    },
    pins: [
      { name: 'VCC', function: '3.3V power' },
      { name: 'GND', function: 'Ground' },
      { name: 'SCL', function: 'I2C Clock' },
      { name: 'SDA', function: 'I2C Data' },
      { name: 'CSB', function: 'Chip Select (SPI mode)' },
      { name: 'SDO', function: 'I2C address select (GND=0x76, VCC=0x77)' },
    ],
    esp32Connection: [
      { component: 'VCC', esp32: '3.3V', type: 'Power' },
      { component: 'GND', esp32: 'GND', type: 'Ground' },
      { component: 'SCL', esp32: 'GPIO 22 (I2C SCL)', type: 'I2C Clock' },
      { component: 'SDA', esp32: 'GPIO 21 (I2C SDA)', type: 'I2C Data' },
    ],
    applications: ['Weather stations', 'Altitude measurement in drones/aircraft', 'Indoor navigation', 'GPS altitude correction'],
    tip: 'Calculate altitude: altitude = 44330 × (1 - (pressure/sea_level_pressure)^0.1903). Standard sea level = 1013.25 hPa',
    safetyWarning: 'BMP280 is 3.3V only! Do NOT connect to 5V. Use Adafruit_BMP280 library.',
    simulatedValue: () => ({ pressure: (Math.random() * 30 + 990).toFixed(1), altitude: Math.round(Math.random() * 100 + 200) }),
    simulatedUnit: 'hPa',
    code: `#include <Adafruit_BMP280.h>
Adafruit_BMP280 bmp;

void setup() {
  Serial.begin(115200);
  bmp.begin(0x76);
}

void loop() {
  float temp = bmp.readTemperature();
  float pressure = bmp.readPressure() / 100.0F; // hPa
  float altitude = bmp.readAltitude(1013.25); // sea level pressure
  
  Serial.printf("Temp: %.1f°C | Pressure: %.1f hPa | Altitude: %.1f m\\n",
                temp, pressure, altitude);
  delay(2000);
}`,
  },
  {
    id: 'mq2',
    name: 'MQ-2 Gas Sensor',
    category: 'Sensors',
    subcategory: 'Environmental',
    level: 'intermediate',
    voltage: '5V',
    protocol: 'Analog / Digital',
    measures: 'LPG, Smoke, H2, CO',
    range: '300–10000 ppm',
    color: '#ff8844',
    unit: 'ppm',
    description: 'Metal oxide semiconductor gas sensor for detecting combustible gases including LPG, smoke, propane, hydrogen, and carbon monoxide.',
    howWorks: 'Heated metal oxide sensor (SnO2) changes resistance when gas molecules interact with the surface. Higher gas concentration = lower resistance = higher analog voltage reading.',
    specifications: {
      'Detectable Gas': 'LPG, Smoke, Alcohol, Propane, H2, CO',
      'Concentration Range': '300–10000 ppm',
      'Heater Power': '0.5W',
      'Preheat Time': '20 seconds minimum',
      'Operating Voltage': '5V (heater) + 3.3V (logic)',
    },
    pins: [
      { name: 'VCC', function: '5V power supply (heater)' },
      { name: 'GND', function: 'Ground' },
      { name: 'AO', function: 'Analog output (concentration level)' },
      { name: 'DO', function: 'Digital output (HIGH when gas detected)' },
    ],
    esp32Connection: [
      { component: 'VCC', esp32: '5V (Vin)', type: 'Power' },
      { component: 'GND', esp32: 'GND', type: 'Ground' },
      { component: 'AO', esp32: 'GPIO 34 (via voltage divider!)', type: 'Analog Signal' },
      { component: 'DO', esp32: 'GPIO 4', type: 'Digital Signal' },
    ],
    applications: ['Gas leak detection', 'LPG safety alarm', 'CO detector', 'Air quality monitoring', 'Industrial safety'],
    tip: 'Allow 20 seconds preheat time. AO output is 0–5V but ESP32 ADC is 3.3V max – use voltage divider or level shifter!',
    safetyWarning: '⚠️ This sensor gets HOT during operation. Do not touch the sensor element. Requires 5V power supply.',
    simulatedValue: () => Math.round(Math.random() * 200 + 50),
    simulatedUnit: 'ppm',
    code: `#define MQ2_AO 34
#define MQ2_DO 4

void setup() {
  pinMode(MQ2_DO, INPUT);
  Serial.begin(115200);
  Serial.println("MQ2 Preheating...");
  delay(20000); // 20s preheat
}

void loop() {
  int raw = analogRead(MQ2_AO);
  int ppm = map(raw, 0, 4095, 0, 10000);
  bool alarm = !digitalRead(MQ2_DO); // Active LOW
  
  Serial.printf("Gas Level: %d ppm | Alarm: %s\\n",
                ppm, alarm ? "YES!" : "No");
  delay(1000);
}`,
  },
  {
    id: 'mpu6050',
    name: 'MPU6050 IMU Sensor',
    category: 'Sensors',
    subcategory: 'Motion & Position',
    level: 'intermediate',
    voltage: '3.3V',
    protocol: 'I2C',
    measures: '3-axis Acceleration & 3-axis Gyroscope',
    range: 'Accel: ±2g–±16g, Gyro: ±250–±2000 dps',
    color: '#aa44ff',
    unit: 'g / °/s',
    description: '6-axis Inertial Measurement Unit (IMU) combining a 3-axis accelerometer and 3-axis gyroscope on a single chip.',
    howWorks: 'Accelerometer uses MEMS capacitive sensing to measure linear acceleration. Gyroscope uses Coriolis effect on vibrating MEMS structure. Built-in Digital Motion Processor (DMP) combines both for orientation data.',
    specifications: {
      'Accelerometer Range': '±2g, ±4g, ±8g, ±16g (configurable)',
      'Gyroscope Range': '±250, ±500, ±1000, ±2000 dps',
      'ADC Resolution': '16-bit',
      'Interface': 'I2C (0x68 or 0x69)',
      'DMP': 'Built-in Digital Motion Processor',
      'Temperature Sensor': '±1°C accuracy',
    },
    pins: [
      { name: 'VCC', function: '3.3V power' },
      { name: 'GND', function: 'Ground' },
      { name: 'SCL', function: 'I2C Clock' },
      { name: 'SDA', function: 'I2C Data' },
      { name: 'XDA', function: 'Auxiliary I2C Data' },
      { name: 'XCL', function: 'Auxiliary I2C Clock' },
      { name: 'INT', function: 'Interrupt output' },
      { name: 'AD0', function: 'I2C address select (GND=0x68, VCC=0x69)' },
    ],
    esp32Connection: [
      { component: 'VCC', esp32: '3.3V', type: 'Power' },
      { component: 'GND', esp32: 'GND', type: 'Ground' },
      { component: 'SCL', esp32: 'GPIO 22', type: 'I2C Clock' },
      { component: 'SDA', esp32: 'GPIO 21', type: 'I2C Data' },
    ],
    applications: ['Drone flight controllers', 'Gesture recognition', 'Balancing robots', 'Step counting', 'Game controllers'],
    tip: 'Use the MPU6050 library with DMP support for pre-processed quaternion/Euler angle data instead of raw sensor fusion.',
    safetyWarning: 'MPU6050 is 3.3V only. Some modules have onboard voltage regulators. Check before connecting to 5V.',
    simulatedValue: () => ({
      ax: (Math.random() * 2 - 1).toFixed(2),
      ay: (Math.random() * 2 - 1).toFixed(2),
      az: (Math.random() * 0.5 + 0.8).toFixed(2),
      gx: Math.round(Math.random() * 10 - 5),
      gy: Math.round(Math.random() * 10 - 5),
      gz: Math.round(Math.random() * 5 - 2),
    }),
    simulatedUnit: 'g / °/s',
    code: `#include <MPU6050_light.h>
MPU6050 mpu(Wire);

void setup() {
  Serial.begin(115200);
  Wire.begin();
  mpu.begin();
  mpu.calcOffsets(); // Auto-calibrate
}

void loop() {
  mpu.update();
  Serial.printf("X:%.1f Y:%.1f Z:%.1f | Pitch:%.1f Roll:%.1f\\n",
    mpu.getAngleX(), mpu.getAngleY(), mpu.getAngleZ(),
    mpu.getAngleX(), mpu.getAngleY());
  delay(100);
}`,
  },
  {
    id: 'soil-moisture',
    name: 'Soil Moisture Sensor',
    category: 'Sensors',
    subcategory: 'Basic',
    level: 'beginner',
    voltage: '3.3V – 5V',
    protocol: 'Analog / Digital',
    measures: 'Soil moisture level',
    range: '0 – 100%',
    color: '#44ff88',
    unit: '%',
    description: 'Measures soil moisture content using electrical resistance between two conductive probes inserted in soil.',
    howWorks: 'Two metal probes conduct electricity through the soil. Wet soil has lower resistance (conducts more), dry soil has higher resistance. The analog output reflects soil moisture percentage.',
    specifications: {
      'Operating Voltage': '3.3V – 5V',
      'Output': 'Analog 0–3.3V + Digital threshold',
      'Probe Material': 'Nickel-plated steel',
      'Response Time': '<1 second',
    },
    pins: [
      { name: 'VCC', function: 'Power supply' },
      { name: 'GND', function: 'Ground' },
      { name: 'AO', function: 'Analog output (moisture level)' },
      { name: 'DO', function: 'Digital output (dry threshold)' },
    ],
    esp32Connection: [
      { component: 'VCC', esp32: '3.3V', type: 'Power' },
      { component: 'GND', esp32: 'GND', type: 'Ground' },
      { component: 'AO', esp32: 'GPIO 34 (ADC)', type: 'Analog Signal' },
      { component: 'DO', esp32: 'GPIO 4', type: 'Digital Signal' },
    ],
    applications: ['Smart irrigation', 'Plant care systems', 'Agriculture IoT', 'Greenhouse automation'],
    tip: 'Invert the reading: dry soil = high ADC value, wet soil = low ADC value. Map: dry=4095→0%, wet=0→100%',
    safetyWarning: 'Prolonged exposure to moisture corrodes the nickel probes. Consider capacitive moisture sensors for longer life.',
    simulatedValue: () => Math.round(Math.random() * 60 + 20),
    simulatedUnit: '%',
    code: `#define MOISTURE_AO 34

void setup() {
  Serial.begin(115200);
}

void loop() {
  int raw = analogRead(MOISTURE_AO);
  // Dry = high value, Wet = low value
  int moisture = map(raw, 4095, 0, 0, 100);
  
  Serial.printf("Moisture: %d%%", moisture);
  if (moisture < 30) Serial.println(" -> DRY! Water needed.");
  else if (moisture > 70) Serial.println(" -> WET");
  else Serial.println(" -> OK");
  delay(1000);
}`,
  },
  {
    id: 'gps-module',
    name: 'GPS Module (NEO-6M)',
    category: 'Sensors',
    subcategory: 'Advanced',
    level: 'advanced',
    voltage: '3.3V – 5V',
    protocol: 'UART',
    measures: 'Location (Lat/Long), Speed, Altitude',
    range: 'Global',
    color: '#44ddff',
    unit: '°Lat / °Long',
    description: 'GPS receiver module that provides accurate geographic position data using satellite signals (NMEA sentences via UART).',
    howWorks: 'Receives signals from multiple GPS satellites simultaneously. Triangulates position by measuring signal travel time from 4+ satellites. Outputs standard NMEA 0183 sentences over UART at 9600 baud.',
    specifications: {
      'Chipset': 'u-blox NEO-6M',
      'Channels': '50 channels',
      'Position Accuracy': '2.5 meters CEP',
      'Update Rate': '1 Hz (up to 5 Hz)',
      'Interface': 'UART 9600 baud, TTL 3.3V',
      'Acquisition Time': 'Cold: 27s, Hot: 1s',
    },
    pins: [
      { name: 'VCC', function: '3.3V – 5V power' },
      { name: 'GND', function: 'Ground' },
      { name: 'TX', function: 'UART Transmit (to ESP32 RX)' },
      { name: 'RX', function: 'UART Receive (to ESP32 TX)' },
    ],
    esp32Connection: [
      { component: 'VCC', esp32: '3.3V or 5V', type: 'Power' },
      { component: 'GND', esp32: 'GND', type: 'Ground' },
      { component: 'TX', esp32: 'GPIO 16 (Serial2 RX)', type: 'UART' },
      { component: 'RX', esp32: 'GPIO 17 (Serial2 TX)', type: 'UART' },
    ],
    applications: ['Vehicle tracking', 'Drone GPS navigation', 'Asset tracking', 'Geofencing', 'Fleet management'],
    tip: 'Use TinyGPS++ library. First fix (cold start) takes up to 60 seconds. Use near a window or outdoors.',
    safetyWarning: 'GPS module antenna must have clear sky view. Works poorly indoors or in metal enclosures.',
    simulatedValue: () => ({ lat: (17.38 + Math.random() * 0.01).toFixed(6), lng: (78.48 + Math.random() * 0.01).toFixed(6), speed: Math.round(Math.random() * 60) }),
    simulatedUnit: '°Lat/Long',
    code: `#include <TinyGPS++.h>
TinyGPSPlus gps;

void setup() {
  Serial.begin(115200);
  Serial2.begin(9600, SERIAL_8N1, 16, 17); // RX=16, TX=17
}

void loop() {
  while (Serial2.available()) {
    gps.encode(Serial2.read());
  }
  if (gps.location.isUpdated()) {
    Serial.printf("Lat: %.6f, Lng: %.6f, Speed: %.1f km/h\\n",
      gps.location.lat(), gps.location.lng(),
      gps.speed.kmph());
  }
}`,
  },
  {
    id: 'rfid',
    name: 'RFID Module (RC522)',
    category: 'Sensors',
    subcategory: 'Advanced',
    level: 'intermediate',
    voltage: '3.3V',
    protocol: 'SPI',
    measures: 'RFID/NFC card UID',
    range: '0–5 cm',
    color: '#ff44aa',
    unit: 'UID (hex)',
    description: 'Radio Frequency Identification module for reading and writing RFID cards/tags. Used for access control, attendance, and identification systems.',
    howWorks: 'Generates a 13.56 MHz electromagnetic field. When an RFID card enters the field, it receives power inductively and transmits its unique ID back. Works with ISO 14443-A cards/tags.',
    specifications: {
      'Frequency': '13.56 MHz',
      'Reading Distance': '0 – 5 cm',
      'Interface': 'SPI (up to 10 Mbps)',
      'Protocols': 'ISO 14443-A, MIFARE',
      'Operating Voltage': '2.5V – 3.3V',
      'Memory': 'MIFARE 1K = 1KB',
    },
    pins: [
      { name: 'SDA/SS', function: 'SPI Slave Select' },
      { name: 'SCK', function: 'SPI Clock' },
      { name: 'MOSI', function: 'SPI Master Out' },
      { name: 'MISO', function: 'SPI Master In' },
      { name: 'IRQ', function: 'Interrupt output' },
      { name: 'GND', function: 'Ground' },
      { name: 'RST', function: 'Reset' },
      { name: 'VCC', function: '3.3V power ONLY' },
    ],
    esp32Connection: [
      { component: 'VCC', esp32: '3.3V ONLY', type: 'Power' },
      { component: 'GND', esp32: 'GND', type: 'Ground' },
      { component: 'SDA/SS', esp32: 'GPIO 5', type: 'SPI SS' },
      { component: 'SCK', esp32: 'GPIO 18', type: 'SPI Clock' },
      { component: 'MOSI', esp32: 'GPIO 23', type: 'SPI MOSI' },
      { component: 'MISO', esp32: 'GPIO 19', type: 'SPI MISO' },
      { component: 'RST', esp32: 'GPIO 22', type: 'Reset' },
    ],
    applications: ['Access control systems', 'Student attendance', 'Smart lockers', 'Cashless payments', 'Inventory management'],
    tip: 'RC522 is 3.3V ONLY! Connecting to 5V will permanently damage it. Use MFRC522 library.',
    safetyWarning: '⚠️ Never connect RC522 VCC to 5V. The chip will be permanently destroyed.',
    code: `#include <MFRC522.h>
#define SS_PIN 5
#define RST_PIN 22
MFRC522 rfid(SS_PIN, RST_PIN);

void setup() {
  Serial.begin(115200);
  SPI.begin();
  rfid.PCD_Init();
  Serial.println("Scan RFID card...");
}

void loop() {
  if (!rfid.PICC_IsNewCardPresent() || !rfid.PICC_ReadCardSerial()) return;
  
  Serial.print("Card UID: ");
  for (byte i = 0; i < rfid.uid.size; i++) {
    Serial.printf("%02X ", rfid.uid.uidByte[i]);
  }
  Serial.println();
  rfid.PICC_HaltA();
}`,
  },
];

export const developmentBoards = [
  {
    id: 'esp32',
    name: 'ESP32 DevKit',
    category: 'Development Boards',
    subcategory: 'ESP Family',
    level: 'intermediate',
    processor: 'Xtensa LX6 Dual-Core 240MHz',
    flash: '4MB',
    sram: '520KB',
    gpioCount: 34,
    adc: '18 channels (12-bit)',
    pwm: '16 channels',
    wifi: 'IEEE 802.11 b/g/n 2.4GHz',
    bluetooth: 'BT 4.2 + BLE',
    voltage: '3.3V (5V via USB)',
    interfaces: ['UART', 'SPI', 'I2C', 'I2S', 'CAN', 'USB'],
    programming: 'Arduino IDE, ESP-IDF, MicroPython',
    color: '#ff4444',
    description: 'The ESP32 is a low-cost, low-power microcontroller with integrated Wi-Fi and Bluetooth, making it ideal for IoT projects.',
    applications: ['IoT nodes', 'Smart home', 'Wi-Fi sensors', 'Bluetooth devices', 'Web servers', 'OTA updates'],
    pinout: {
      power: ['3.3V (multiple)', 'GND (multiple)', 'Vin (5V)', 'EN (Enable)'],
      gpio: ['GPIO 0-39 (various functions)', 'GPIO 34-39 (Input only)'],
      i2c: ['SDA: GPIO 21', 'SCL: GPIO 22'],
      spi: ['MOSI: GPIO 23', 'MISO: GPIO 19', 'SCK: GPIO 18', 'SS: GPIO 5'],
      uart: ['TX0: GPIO 1', 'RX0: GPIO 3', 'TX2: GPIO 17', 'RX2: GPIO 16'],
    },
    tip: 'GPIO 34, 35, 36, 39 are input-only pins. GPIO 0, 2, 12, 15 have boot mode functions. Avoid these for general I/O.',
    projects: ['Smart Weather Station', 'Home Automation Hub', 'IoT Security Camera', 'Bluetooth Speaker Controller'],
  },
  {
    id: 'esp32cam',
    name: 'ESP32-CAM',
    category: 'Development Boards',
    subcategory: 'ESP Family',
    level: 'intermediate',
    processor: 'Xtensa LX6 Dual-Core 240MHz',
    flash: '4MB',
    sram: '520KB + 4MB PSRAM',
    gpioCount: 10,
    camera: 'OV2640 (2MP) or OV5640 (5MP)',
    wifi: 'IEEE 802.11 b/g/n 2.4GHz',
    bluetooth: 'BT 4.2 + BLE',
    voltage: '5V (AMS1117 3.3V regulator)',
    color: '#ff6644',
    description: 'ESP32 module with integrated OV2640 camera, microSD card slot, and external antenna connector. Perfect for surveillance and image processing.',
    applications: ['IP Camera', 'Face recognition', 'QR code scanner', 'Wildlife monitoring', 'Baby monitor'],
    tip: 'Use FTDI programmer for uploading. GPIO 0 to GND while programming. Remove after upload.',
    projects: ['Home Security Camera', 'Face Recognition Door', 'Time-Lapse Camera', 'Plant Monitoring Camera'],
  },
  {
    id: 'esp8266',
    name: 'ESP8266 (NodeMCU)',
    category: 'Development Boards',
    subcategory: 'ESP Family',
    level: 'beginner',
    processor: 'Tensilica L106 80/160MHz',
    flash: '1MB – 4MB',
    gpioCount: 11,
    wifi: 'IEEE 802.11 b/g/n 2.4GHz',
    voltage: '3.3V (5V via USB)',
    color: '#ff8844',
    description: 'Affordable Wi-Fi microcontroller module. Great entry-level IoT board before moving to ESP32.',
    applications: ['Simple IoT sensors', 'Wi-Fi switch', 'Web server', 'MQTT client', 'Smart plug'],
    tip: 'GPIO pins are 3.3V. Only GPIO 0, 2, 15 available during boot – avoid external connections on these during startup.',
    projects: ['Temperature Monitor', 'Smart Switch', 'IoT Weather Station', 'Garage Door Opener'],
  },
  {
    id: 'arduino-uno',
    name: 'Arduino UNO',
    category: 'Development Boards',
    subcategory: 'Beginner Boards',
    level: 'beginner',
    processor: 'ATmega328P 16MHz',
    flash: '32KB',
    sram: '2KB',
    gpioCount: 20,
    adc: '6 channels (10-bit)',
    pwm: '6 channels',
    voltage: '5V (7-12V input)',
    color: '#44aaff',
    description: 'The most popular beginner microcontroller board. 5V logic, great community support, and hundreds of compatible shields.',
    applications: ['Learning electronics', 'Basic robotics', 'LED control', 'Sensor reading', 'Motor control'],
    tip: 'No built-in Wi-Fi/Bluetooth – add ESP8266 or HC-05 modules for wireless connectivity.',
    projects: ['LED Matrix', 'Servo Controller', 'MIDI Controller', 'Line-Following Robot'],
  },
  {
    id: 'arduino-nano',
    name: 'Arduino Nano',
    category: 'Development Boards',
    subcategory: 'Beginner Boards',
    level: 'beginner',
    processor: 'ATmega328P 16MHz',
    flash: '32KB',
    sram: '2KB',
    gpioCount: 22,
    voltage: '5V (7-12V input)',
    color: '#44bbff',
    description: 'Compact version of Arduino UNO. Same capability in a smaller form factor, perfect for space-constrained projects.',
    applications: ['Wearables', 'Small robots', 'Breadboard projects', 'Sensor nodes'],
    tip: 'Mini USB connector (older versions). Breadboard-friendly design fits across the center gap perfectly.',
    projects: ['Gesture Glove', 'Miniature Robot', 'LED Wristband', 'Pulse Oximeter'],
  },
  {
    id: 'raspberry-pi',
    name: 'Raspberry Pi 4',
    category: 'Development Boards',
    subcategory: 'Raspberry Pi Family',
    level: 'advanced',
    processor: 'Broadcom BCM2711 Quad-core Cortex-A72 1.5GHz',
    ram: '2GB, 4GB, or 8GB LPDDR4',
    os: 'Raspberry Pi OS (Linux)',
    gpioCount: 40,
    wifi: 'IEEE 802.11ac 2.4GHz/5GHz',
    bluetooth: 'BT 5.0 + BLE',
    voltage: '5V via USB-C',
    color: '#ff44aa',
    description: 'Full single-board computer running Linux. Not a microcontroller – runs complex applications, computer vision, AI/ML at the edge.',
    applications: ['Edge computing', 'Computer vision', 'AI/ML inference', 'IoT gateway', 'Home server', 'Retro gaming'],
    tip: 'Raspberry Pi runs Linux – use Python, Node.js, or any language. GPIO is 3.3V logic. Max 16mA per GPIO.',
    projects: ['Smart Mirror', 'AI Security Camera', 'Home Automation Hub', 'Digital Signage'],
  },
];

export const communicationModules = [
  {
    id: 'hc05',
    name: 'HC-05 Bluetooth Module',
    category: 'Communication',
    subcategory: 'Basic',
    level: 'beginner',
    technology: 'Bluetooth Classic 2.0',
    frequency: '2.4 GHz',
    range: '10 meters (class 2)',
    dataRate: '2.1 Mbps',
    power: '~35mA',
    protocol: 'UART',
    color: '#4444ff',
    description: 'Classic Bluetooth UART module for wireless serial communication between devices. Master/Slave configurable.',
    esp32Connection: [
      { component: 'VCC', esp32: '5V (internal regulator)', type: 'Power' },
      { component: 'GND', esp32: 'GND', type: 'Ground' },
      { component: 'TX', esp32: 'GPIO 16 (Serial2 RX) via voltage divider', type: 'UART RX' },
      { component: 'RX', esp32: 'GPIO 17 (Serial2 TX)', type: 'UART TX' },
    ],
    applications: ['Bluetooth serial terminal', 'Robot control', 'Sensor data wireless', 'Android app control'],
    tip: 'HC-05 TX outputs 3.3V but module VCC is 5V. Use voltage divider on TX before connecting to ESP32 RX.',
  },
  {
    id: 'nrf24l01',
    name: 'nRF24L01 RF Module',
    category: 'Communication',
    subcategory: 'Wireless',
    level: 'intermediate',
    technology: 'Radio Frequency (RF)',
    frequency: '2.4 GHz ISM band',
    range: '100m (up to 1km with PA+LNA)',
    dataRate: '250kbps, 1Mbps, 2Mbps',
    power: '11.3mA TX / 13.5mA RX',
    protocol: 'SPI + proprietary Enhanced ShockBurst',
    color: '#44ff44',
    description: '2.4GHz RF transceiver for low-power wireless communication. Point-to-point or network of up to 6 nodes.',
    esp32Connection: [
      { component: 'VCC', esp32: '3.3V (use capacitor for stability)', type: 'Power' },
      { component: 'GND', esp32: 'GND', type: 'Ground' },
      { component: 'CE', esp32: 'GPIO 4', type: 'Chip Enable' },
      { component: 'CSN', esp32: 'GPIO 5 (SPI SS)', type: 'SPI SS' },
      { component: 'SCK', esp32: 'GPIO 18', type: 'SPI Clock' },
      { component: 'MOSI', esp32: 'GPIO 23', type: 'SPI MOSI' },
      { component: 'MISO', esp32: 'GPIO 19', type: 'SPI MISO' },
    ],
    applications: ['Remote controls', 'Multi-sensor networks', 'Wireless joystick', 'Home automation sub-network'],
    tip: 'Power supply noise causes communication failures. Place a 10µF + 100nF capacitor between VCC and GND on the nRF24L01.',
  },
  {
    id: 'lora-sx1278',
    name: 'LoRa Module (SX1278)',
    category: 'Communication',
    subcategory: 'Wireless',
    level: 'advanced',
    technology: 'LoRa (Long Range)',
    frequency: '433 MHz (SX1278) / 868/915 MHz (SX1276)',
    range: '2–15 km (line of sight)',
    dataRate: '0.3–37.5 kbps',
    power: '100mW max TX',
    protocol: 'SPI',
    color: '#ff8800',
    description: 'Long Range (LoRa) wireless module for IoT over very long distances with low power consumption.',
    esp32Connection: [
      { component: 'VCC', esp32: '3.3V', type: 'Power' },
      { component: 'GND', esp32: 'GND', type: 'Ground' },
      { component: 'SCK', esp32: 'GPIO 18', type: 'SPI Clock' },
      { component: 'MISO', esp32: 'GPIO 19', type: 'SPI MISO' },
      { component: 'MOSI', esp32: 'GPIO 23', type: 'SPI MOSI' },
      { component: 'NSS', esp32: 'GPIO 5', type: 'SPI SS' },
      { component: 'DIO0', esp32: 'GPIO 2', type: 'Interrupt' },
      { component: 'RST', esp32: 'GPIO 14', type: 'Reset' },
    ],
    applications: ['Smart agriculture', 'Smart city sensors', 'Asset tracking', 'LoRaWAN networks', 'Long-range sensor nodes'],
    tip: 'Always connect antenna! Running without antenna can damage the RF transceiver. Use LoRa library by Sandeep Mistry.',
  },
  {
    id: 'sim800l',
    name: 'SIM800L GSM/GPRS Module',
    category: 'Communication',
    subcategory: 'Cellular',
    level: 'advanced',
    technology: 'GSM/GPRS',
    frequency: 'Quad-band 850/900/1800/1900 MHz',
    range: 'Global cellular network',
    dataRate: '85.6 kbps GPRS',
    power: '500mA–2A peak',
    protocol: 'UART (AT commands)',
    color: '#ff4444',
    description: 'Compact GSM/GPRS module for SMS, phone calls, and internet connectivity via cellular network. Requires SIM card.',
    esp32Connection: [
      { component: 'VCC', esp32: 'Dedicated 4.2V supply (LiPo)', type: 'Power (NOT 3.3V!)' },
      { component: 'GND', esp32: 'GND (common)', type: 'Ground' },
      { component: 'TX', esp32: 'GPIO 16 (Serial2 RX)', type: 'UART' },
      { component: 'RX', esp32: 'GPIO 17 (Serial2 TX)', type: 'UART' },
    ],
    applications: ['SMS alerts', 'Remote monitoring', 'Vehicle tracking', 'Emergency alerts', 'No-Wi-Fi IoT'],
    tip: 'SIM800L needs 4.0–4.2V and peak current of 2A during transmission. Use a dedicated Li-ion battery, not 3.3V regulator.',
  },
];

export const actuators = [
  {
    id: 'sg90-servo',
    name: 'SG90 Micro Servo',
    category: 'Actuators',
    subcategory: 'Motion',
    level: 'beginner',
    voltage: '4.8V – 6V',
    current: '150–250mA',
    protocol: 'PWM',
    color: '#ffaa44',
    description: 'Small plastic gear servo motor for position control. Rotates 0–180°, controlled by PWM signal.',
    howWorks: 'Internal feedback system maintains position. PWM pulse width (1ms–2ms) determines angle. 1ms = 0°, 1.5ms = 90°, 2ms = 180°. Frequency: 50Hz.',
    specifications: {
      'Torque': '1.8 kg/cm at 4.8V',
      'Speed': '0.1 sec/60° at 4.8V',
      'Angle': '0° – 180°',
      'Weight': '9g',
      'Control': 'PWM 50Hz, 1–2ms pulse',
    },
    pins: [
      { name: 'Brown/Black', function: 'GND' },
      { name: 'Red', function: 'VCC (4.8V–6V)' },
      { name: 'Orange/Yellow', function: 'PWM Signal' },
    ],
    esp32Connection: [
      { component: 'GND (Brown)', esp32: 'GND', type: 'Ground' },
      { component: 'VCC (Red)', esp32: 'External 5V (NOT ESP32 3.3V!)', type: 'Power' },
      { component: 'Signal (Orange)', esp32: 'GPIO 13', type: 'PWM Signal' },
    ],
    tip: 'Use ESP32 Servo library: servo.attach(pin); servo.write(angle);. Power servo from external 5V supply, not ESP32.',
    safetyWarning: 'Never stall a servo (force against resistance) – motor overheats. Always program movement limits.',
    code: `#include <ESP32Servo.h>
Servo myServo;
#define SERVO_PIN 13

void setup() {
  myServo.attach(SERVO_PIN);
}

void loop() {
  myServo.write(0);    // 0 degrees
  delay(1000);
  myServo.write(90);   // 90 degrees
  delay(1000);
  myServo.write(180);  // 180 degrees
  delay(1000);
}`,
  },
  {
    id: 'dc-motor',
    name: 'DC Motor',
    category: 'Actuators',
    subcategory: 'Basic',
    level: 'beginner',
    voltage: '3V – 12V',
    current: '200mA – 2A',
    protocol: 'PWM (via motor driver)',
    color: '#aa44ff',
    description: 'Direct Current motor that converts electrical energy to rotational mechanical energy. Speed controlled by voltage/PWM.',
    howWorks: 'Commutator switches current direction in rotating coils, creating continuous rotation in a magnetic field. Speed proportional to voltage, torque proportional to current.',
    pins: [
      { name: 'M+', function: 'Positive terminal' },
      { name: 'M–', function: 'Negative terminal (swap polarity to reverse)' },
    ],
    esp32Connection: [
      { component: 'Motor (+)', esp32: 'L298N OUT1', type: 'Via Motor Driver' },
      { component: 'Motor (–)', esp32: 'L298N OUT2', type: 'Via Motor Driver' },
    ],
    tip: 'NEVER connect DC motor directly to GPIO! Use L298N, L293D, or TB6612FNG motor driver. Always use flyback diodes.',
    safetyWarning: 'Direct GPIO connection WILL damage ESP32. Use a motor driver IC or H-bridge.',
    code: `// Using L298N Motor Driver
#define ENA 14  // PWM speed
#define IN1 27  // Direction
#define IN2 26  // Direction

void setup() {
  pinMode(ENA, OUTPUT);
  pinMode(IN1, OUTPUT);
  pinMode(IN2, OUTPUT);
}

void loop() {
  // Forward at 50% speed
  digitalWrite(IN1, HIGH);
  digitalWrite(IN2, LOW);
  analogWrite(ENA, 128);
  delay(2000);
  
  // Stop
  analogWrite(ENA, 0);
  delay(500);
}`,
  },
];

export const displays = [
  {
    id: 'oled-i2c',
    name: 'OLED Display (0.96" I2C)',
    category: 'Displays',
    subcategory: 'OLED',
    level: 'beginner',
    voltage: '3.3V – 5V',
    protocol: 'I2C',
    resolution: '128×64 pixels',
    color: '#ffffff',
    description: '128×64 pixel monochrome OLED display with I2C interface. Self-emissive – no backlight needed. Crystal clear visibility.',
    specifications: {
      'Resolution': '128 × 64 pixels',
      'Driver': 'SSD1306',
      'Interface': 'I2C (addr 0x3C or 0x3D)',
      'Color': 'White or Blue pixels',
      'Viewing Angle': '160°',
      'Power': '~20mA typical',
    },
    pins: [
      { name: 'VCC', function: '3.3V or 5V power' },
      { name: 'GND', function: 'Ground' },
      { name: 'SCL', function: 'I2C Clock (GPIO 22)' },
      { name: 'SDA', function: 'I2C Data (GPIO 21)' },
    ],
    esp32Connection: [
      { component: 'VCC', esp32: '3.3V', type: 'Power' },
      { component: 'GND', esp32: 'GND', type: 'Ground' },
      { component: 'SCL', esp32: 'GPIO 22', type: 'I2C Clock' },
      { component: 'SDA', esp32: 'GPIO 21', type: 'I2C Data' },
    ],
    applications: ['Sensor dashboards', 'Menu systems', 'Clock displays', 'Debug screens', 'Wearables'],
    tip: 'Use Adafruit_SSD1306 library. Run I2C scanner sketch to find address (0x3C common). No pull-up resistors needed on most modules.',
    code: `#include <Adafruit_SSD1306.h>
Adafruit_SSD1306 display(128, 64, &Wire, -1);

void setup() {
  display.begin(SSD1306_SWITCHCAPVCC, 0x3C);
  display.clearDisplay();
  display.setTextSize(2);
  display.setTextColor(WHITE);
  display.setCursor(0, 0);
  display.println("IoT 3D Lab");
  display.display();
}`,
  },
  {
    id: 'lcd-i2c',
    name: '16×2 LCD with I2C',
    category: 'Displays',
    subcategory: 'LCD',
    level: 'beginner',
    voltage: '5V',
    protocol: 'I2C (via PCF8574 backpack)',
    resolution: '16 characters × 2 rows',
    color: '#00ff88',
    description: 'Classic 16-character, 2-row character LCD display with I2C backpack for easy 4-wire connection.',
    pins: [
      { name: 'VCC', function: '5V power supply' },
      { name: 'GND', function: 'Ground' },
      { name: 'SCL', function: 'I2C Clock (GPIO 22)' },
      { name: 'SDA', function: 'I2C Data (GPIO 21)' },
    ],
    esp32Connection: [
      { component: 'VCC', esp32: '5V (Vin pin)', type: 'Power' },
      { component: 'GND', esp32: 'GND', type: 'Ground' },
      { component: 'SCL', esp32: 'GPIO 22', type: 'I2C Clock' },
      { component: 'SDA', esp32: 'GPIO 21', type: 'I2C Data' },
    ],
    tip: 'Adjust contrast with the small blue potentiometer on the I2C backpack. Use LiquidCrystal_I2C library.',
    code: `#include <LiquidCrystal_I2C.h>
LiquidCrystal_I2C lcd(0x27, 16, 2);

void setup() {
  lcd.init();
  lcd.backlight();
  lcd.setCursor(0, 0);
  lcd.print("IoT 3D Lab");
  lcd.setCursor(0, 1);
  lcd.print("Hello World!");
}`,
  },
];

export const powerModules = [
  {
    id: 'tp4056',
    name: 'TP4056 Li-ion Charger',
    category: 'Power',
    subcategory: 'Charging',
    level: 'intermediate',
    inputVoltage: '4V – 8V (via USB 5V)',
    outputVoltage: '4.2V (full charge)',
    chargeCurrent: '1A max',
    color: '#ff4444',
    description: 'Single-cell Li-ion/LiPo battery charger IC module. Provides complete constant-current/constant-voltage charging.',
    specifications: {
      'Charge Current': 'Up to 1A (adjustable)',
      'Charge Voltage': '4.2V ± 1%',
      'Input': '4V–8V (typically 5V USB)',
      'Protection': 'Over-voltage, over-current, over-temperature',
    },
    tip: 'TP4056 module without protection circuit – add DW01A protection board for battery safety. Models with B+ and B– have protection built-in.',
    safetyWarning: '⚠️ Li-ion batteries can catch fire if overcharged or short-circuited. Always use proper BMS/protection circuits.',
  },
];

export const protocols = [
  {
    id: 'i2c',
    name: 'I2C Protocol',
    category: 'Protocols',
    level: 'intermediate',
    wires: 2,
    maxDevices: 128,
    speed: '100kHz (Standard), 400kHz (Fast), 3.4MHz (High Speed)',
    description: 'Inter-Integrated Circuit – a two-wire synchronous serial protocol for connecting multiple ICs on the same bus.',
    howWorks: 'Master device generates clock (SCL) and initiates transfers. Data (SDA) is bidirectional. Each device has a unique 7-bit address. Data framed in bytes with ACK/NACK.',
    pros: ['Only 2 wires for many devices', 'Easy daisy-chaining', 'Built-in addressing'],
    cons: ['Slower than SPI', 'Shorter cable lengths', 'Requires pull-up resistors'],
    esp32Pins: { SDA: 'GPIO 21', SCL: 'GPIO 22' },
    applications: ['OLED display', 'BMP280', 'MPU6050', 'LCD backpack', 'RTC modules'],
    code: `#include <Wire.h>

void setup() {
  Wire.begin(21, 22); // SDA=21, SCL=22
  Wire.beginTransmission(0x3C); // Device address
  Wire.write(0x00); // Command
  Wire.endTransmission();
}`,
  },
  {
    id: 'spi',
    name: 'SPI Protocol',
    category: 'Protocols',
    level: 'intermediate',
    wires: 4,
    maxDevices: 'Unlimited (with separate SS pins)',
    speed: '10MHz – 80MHz',
    description: 'Serial Peripheral Interface – a high-speed 4-wire synchronous full-duplex serial protocol.',
    howWorks: 'Master controls clock (SCK), data flows both ways simultaneously (MOSI out, MISO in). Each slave has dedicated Slave Select (SS) line pulled low for active communication.',
    pros: ['High speed', 'Full duplex', 'Simple hardware'],
    cons: ['4 wires + 1 SS per device', 'No acknowledgment', 'More complex wiring for multiple devices'],
    esp32Pins: { MOSI: 'GPIO 23', MISO: 'GPIO 19', SCK: 'GPIO 18', SS: 'GPIO 5' },
    applications: ['SD card', 'RFID', 'TFT display', 'LoRa', 'nRF24L01', 'MAX6675'],
  },
  {
    id: 'uart',
    name: 'UART Protocol',
    category: 'Protocols',
    level: 'beginner',
    wires: 2,
    maxDevices: 2,
    speed: '300bps – 2Mbps',
    description: 'Universal Asynchronous Receiver/Transmitter – the most basic serial communication protocol. Point-to-point, asynchronous.',
    howWorks: 'TX sends data, RX receives. No shared clock – both sides agree on baud rate. Each byte framed with start bit, 8 data bits, optional parity, 1-2 stop bits.',
    pros: ['Simple, only 2 wires', 'Universally supported', 'Easy debugging'],
    cons: ['Only 2 devices', 'Must agree on baud rate', 'No error detection (without parity)'],
    esp32Pins: { TX0: 'GPIO 1', RX0: 'GPIO 3', TX1: 'GPIO 10', RX1: 'GPIO 9', TX2: 'GPIO 17', RX2: 'GPIO 16' },
    applications: ['Serial monitor', 'GPS module', 'GSM module', 'Bluetooth HC-05', 'LoRa'],
    code: `// ESP32 Serial2 example
Serial2.begin(9600, SERIAL_8N1, 16, 17); // RX=16, TX=17

// Send data
Serial2.println("AT"); // AT command

// Receive data
while (Serial2.available()) {
  char c = Serial2.read();
  Serial.print(c);
}`,
  },
];

export const cloudPlatforms = [
  {
    id: 'mqtt',
    name: 'MQTT Protocol',
    category: 'Cloud',
    level: 'intermediate',
    description: 'Message Queuing Telemetry Transport – lightweight publish/subscribe protocol ideal for IoT communication.',
    broker: 'Mosquitto, HiveMQ, AWS IoT, Google Cloud IoT',
    port: '1883 (TCP) / 8883 (SSL)',
    features: ['Publish/Subscribe model', 'Quality of Service (QoS 0,1,2)', 'Retained messages', 'Last Will Testament'],
    applications: ['IoT sensor data', 'Smart home', 'Industrial monitoring', 'Mobile push notifications'],
    code: `#include <PubSubClient.h>
#include <WiFi.h>

WiFiClient espClient;
PubSubClient client(espClient);

void callback(char* topic, byte* payload, unsigned int length) {
  String msg = "";
  for (int i=0;i<length;i++) msg += (char)payload[i];
  Serial.printf("Message [%s]: %s\\n", topic, msg.c_str());
}

void setup() {
  WiFi.begin("SSID", "PASSWORD");
  client.setServer("broker.mqtt.cool", 1883);
  client.setCallback(callback);
  client.connect("ESP32Client");
  client.subscribe("iot/sensor/#");
}

void loop() {
  float temp = readTemperature(); // your sensor function
  char payload[50];
  sprintf(payload, "%.1f", temp);
  client.publish("iot/sensor/temperature", payload);
  client.loop();
  delay(5000);
}`,
  },
  {
    id: 'firebase',
    name: 'Firebase Realtime DB',
    category: 'Cloud',
    level: 'intermediate',
    description: 'Google Firebase Realtime Database – NoSQL cloud database with real-time synchronization across all clients.',
    features: ['Real-time sync', 'REST API', 'Offline support', 'Firebase Auth', 'Google Cloud integration'],
    applications: ['IoT dashboards', 'Real-time monitoring', 'Multi-device sync', 'Mobile + IoT integration'],
  },
  {
    id: 'thingspeak',
    name: 'ThingSpeak',
    category: 'Cloud',
    level: 'beginner',
    description: 'MathWorks IoT cloud platform for collecting, analyzing, and visualizing IoT sensor data with built-in MATLAB analytics.',
    features: ['Free tier available', 'REST API', 'MATLAB analytics', 'Built-in charts', 'Alerts and notifications'],
    applications: ['Student IoT projects', 'Weather monitoring', 'Environmental sensing', 'Agriculture monitoring'],
  },
];

export const projects = [
  {
    id: 'auto-street-light',
    name: 'Automatic Street Light',
    category: 'Projects',
    level: 'beginner',
    difficulty: 1,
    components: ['ESP32', 'LDR', 'LED', 'Resistor (10kΩ)', 'Resistor (220Ω)', 'Breadboard', 'Jumper Wires'],
    description: 'Automatically turns street lights ON at dark and OFF when bright using an LDR sensor.',
    working: 'LDR detects ambient light level. When light drops below threshold (dark), ESP32 turns on LED. When light is detected (bright), LED turns off.',
    applications: ['Street lighting', 'Garden lights', 'Staircase lighting', 'Security lighting'],
  },
  {
    id: 'weather-station',
    name: 'IoT Weather Station',
    category: 'Projects',
    level: 'intermediate',
    difficulty: 3,
    components: ['ESP32', 'DHT22', 'BMP280', 'OLED (0.96")', 'Jumper Wires'],
    description: 'Measures temperature, humidity, and pressure, displays locally on OLED, and uploads to cloud dashboard.',
    working: 'DHT22 reads temperature & humidity. BMP280 reads pressure & calculates altitude. Data displayed on OLED and uploaded via MQTT to cloud every 30 seconds.',
    applications: ['Home weather monitoring', 'Agriculture', 'Climate research'],
  },
  {
    id: 'smart-home',
    name: 'Smart Home Controller',
    category: 'Projects',
    level: 'intermediate',
    difficulty: 4,
    components: ['ESP32', 'Relay Module (4ch)', 'DHT11', 'PIR Sensor', 'OLED', 'Jumper Wires'],
    description: 'Control home appliances via mobile app, with motion detection, temperature monitoring, and automation.',
    working: 'ESP32 hosts web server. Users control relays via mobile browser. PIR triggers alerts. Temperature data displayed. Schedules supported.',
    applications: ['Home automation', 'Energy saving', 'Security', 'Elderly care'],
  },
  {
    id: 'smart-agriculture',
    name: 'Smart Agriculture System',
    category: 'Projects',
    level: 'advanced',
    difficulty: 5,
    components: ['ESP32', 'Soil Moisture Sensor', 'DHT22', 'BMP280', 'Relay', 'Water Pump', 'LoRa Module', 'Solar Panel', 'LiPo Battery'],
    description: 'Complete IoT agriculture system with automated irrigation, environmental monitoring, and long-range LoRa communication.',
    working: 'Soil moisture sensor triggers irrigation relay when dry. Weather data logged to cloud. LoRa sends data to gateway up to 5km away. Solar-powered for field deployment.',
    applications: ['Crop irrigation', 'Greenhouse monitoring', 'Precision agriculture', 'Food security'],
  },
];

export const goldenRules = [
  {
    id: 'voltage',
    icon: '⚡',
    title: 'Voltage Rules',
    color: '#ff4444',
    rules: [
      'ESP32 GPIO pins operate at 3.3V logic – not 5V tolerant on most pins.',
      'Never directly apply 5V to ESP32 GPIO – use level shifters or voltage dividers.',
      'Always verify operating voltage of each sensor/module before connecting.',
      'Power voltage ≠ Logic voltage (e.g., HC-SR04 needs 5V power but 3.3V logic on ECHO).',
    ],
  },
  {
    id: 'ground',
    icon: '🔌',
    title: 'Common Ground',
    color: '#4488ff',
    rules: [
      'All components in the same circuit MUST share a common GND.',
      'If using an external power supply, connect its GND to ESP32 GND.',
      'Multiple GND connections are always acceptable – connect as many as needed.',
      'Floating grounds cause unpredictable behavior and false readings.',
    ],
  },
  {
    id: 'current',
    icon: '🔋',
    title: 'Current Rules',
    color: '#ff8844',
    rules: [
      'ESP32 GPIO maximum output current: 40mA total, 12mA per pin.',
      'Never power motors directly from GPIO – use motor driver ICs.',
      'High-current devices (motors, solenoids) need dedicated power supplies.',
      'Always calculate: P = V × I before selecting power supply.',
    ],
  },
  {
    id: 'pullup',
    icon: '📌',
    title: 'Pull-up / Pull-down',
    color: '#44ff88',
    rules: [
      'I2C lines (SDA, SCL) require pull-up resistors (2.2kΩ–10kΩ to VCC).',
      'Most modules include onboard pull-ups – check before adding your own.',
      'Use INPUT_PULLUP in Arduino code to enable internal pull-up resistors.',
      'Floating digital inputs cause random values – always use pull-up or pull-down.',
    ],
  },
  {
    id: 'safety',
    icon: '⚠️',
    title: 'Safety Rules',
    color: '#ffdd44',
    rules: [
      'Always disconnect power before changing wiring.',
      'Check polarity (+ and –) before applying power to polarized components.',
      'Use proper fuses/breakers when working with high-current systems.',
      'Li-ion batteries can catch fire – never short-circuit, puncture, or overcharge.',
      'High voltage AC mains can be FATAL – use proper insulation and enclosures.',
      'When in doubt, measure with multimeter before connecting.',
    ],
  },
  {
    id: 'protection',
    icon: '🔥',
    title: 'Protection Circuits',
    color: '#ff4488',
    rules: [
      'Add flyback/freewheeling diode across relay coils and motor terminals.',
      'Use series resistors (220Ω) for LEDs – never connect directly to GPIO.',
      'Add decoupling capacitors (100nF) near sensor power pins for noise reduction.',
      'Use transistors/MOSFETs to switch loads greater than 12mA from GPIO.',
    ],
  },
];

export const allComponents = [
  ...basicComponents,
  ...sensors,
  ...developmentBoards.map(b => ({ ...b, category: 'Board', subcategory: b.subcategory })),
  ...communicationModules,
  ...actuators,
  ...displays,
];

export const stats = {
  totalComponents: 60,
  sensors: 22,
  developmentBoards: 9,
  communicationModules: 12,
  actuators: 8,
  displays: 6,
  powerModules: 8,
  advancedComponents: 15,
};

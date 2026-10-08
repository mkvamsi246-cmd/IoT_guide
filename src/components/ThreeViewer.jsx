import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { BUILDER_MAP, buildGenericSensor } from './threeModels';

export default function ThreeViewer({
  componentId = 'esp32',
  color = '#ff4444',
  height = 360,
  showControls = true,
  autoRotateDefault = false,
  onSelectPin = null,
}) {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);
  const modelContextRef = useRef(null);
  const animFrameRef = useRef(null);

  // Interactive UI State
  const [calloutsVisible, setCalloutsVisible] = useState(true);
  const [exploded, setExploded] = useState(false);
  const [isRotating, setIsRotating] = useState(autoRotateDefault);
  const [inspectedPart, setInspectedPart] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isWhiteBg, setIsWhiteBg] = useState(true); // Default studio white for 3D visibility

  // Targets for animation
  const explodeTargetRef = useRef(0);
  const explodeCurrentRef = useRef(0);
  const isAnimatingRef = useRef(true);

  // Request render trigger
  const requestRender = () => {
    isAnimatingRef.current = true;
  };

  // Toggle handlers
  const handleToggleCallouts = () => {
    setCalloutsVisible((prev) => {
      const next = !prev;
      if (modelContextRef.current?.labels) {
        modelContextRef.current.labels.visible = next;
      }
      requestRender();
      return next;
    });
  };

  const handleToggleExplode = () => {
    setExploded((prev) => {
      const next = !prev;
      explodeTargetRef.current = next ? 1 : 0;
      requestRender();
      return next;
    });
  };

  const handleToggleRotate = () => {
    setIsRotating((prev) => {
      const next = !prev;
      if (controlsRef.current) {
        controlsRef.current.autoRotate = next;
      }
      requestRender();
      return next;
    });
  };

  const handleSetView = (viewType) => {
    if (!cameraRef.current || !controlsRef.current || !modelContextRef.current) return;
    const cam = cameraRef.current;
    const ctl = controlsRef.current;
    const target = modelContextRef.current.target || [0, 0, 0];
    const dist = (modelContextRef.current.minDistance || 25) * 2.2;

    switch (viewType) {
      case 'top':
        cam.position.set(target[0], target[1] + dist * 1.3, target[2] + 0.1);
        break;
      case 'side':
        cam.position.set(target[0] + dist * 1.4, target[1] + 4, target[2]);
        break;
      case 'back':
        cam.position.set(target[0], target[1] - dist * 1.2, target[2] + 0.1);
        break;
      case 'front':
        cam.position.set(target[0], target[1] + 10, target[2] + dist * 1.3);
        break;
      case 'angled':
      default:
        const defPos = modelContextRef.current.cameraPos || [-42, 48, 66];
        cam.position.set(...defPos);
        break;
    }
    ctl.target.set(...target);
    ctl.update();
    requestRender();
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Initialize and build Three.js Scene
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Dimensions
    const width = container.clientWidth || 400;
    const canvasHeight = typeof height === 'number' ? height : parseInt(height, 10) || 360;

    // Fast, lightweight WebGLRenderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
      precision: 'mediump',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(width, canvasHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(36, width / canvasHeight, 1, 500);
    cameraRef.current = camera;

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;
    controls.autoRotate = isRotating;
    controls.autoRotateSpeed = 2.0;
    controls.maxPolarAngle = Math.PI * 0.72;
    controlsRef.current = controls;

    // Studio Lighting: High performance & realistic specular reflections
    const hemiLight = new THREE.HemisphereLight(0xe8f0fe, 0x0f1420, 0.75);
    scene.add(hemiLight);

    const dl = new THREE.DirectionalLight(0xffffff, 1.3);
    dl.position.set(30, 70, 35);
    dl.castShadow = true;
    dl.shadow.mapSize.set(512, 512); // Optimized 512x512
    dl.shadow.camera.left = -40;
    dl.shadow.camera.right = 40;
    dl.shadow.camera.top = 40;
    dl.shadow.camera.bottom = -40;
    dl.shadow.camera.near = 10;
    dl.shadow.camera.far = 180;
    dl.shadow.bias = -0.0004;
    scene.add(dl);

    const fillLight = new THREE.DirectionalLight(0xff4444, 0.35);
    fillLight.position.set(-30, -15, -25);
    scene.add(fillLight);

    // Floor shadow receiver
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(300, 300),
      new THREE.ShadowMaterial({ opacity: 0.3 })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -9;
    floor.receiveShadow = true;
    scene.add(floor);

    // Build the 3D Model
    const builder = BUILDER_MAP[componentId] || buildGenericSensor;
    const modelContext = builder({ color });
    modelContextRef.current = modelContext;
    scene.add(modelContext.root);

    // Initial Camera
    const camPos = modelContext.cameraPos || [-42, 48, 66];
    const targetPos = modelContext.target || [0, 0, 0];
    camera.position.set(...camPos);
    controls.target.set(...targetPos);
    controls.minDistance = modelContext.minDistance || 20;
    controls.maxDistance = modelContext.maxDistance || 180;
    controls.update();

    if (modelContext.labels) {
      modelContext.labels.visible = calloutsVisible;
    }

    // Raycasting for interactive pin / component inspection
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let pointerDownPos = null;

    const onPointerDown = (e) => {
      pointerDownPos = [e.clientX, e.clientY];
    };

    const onPointerUp = (e) => {
      if (!pointerDownPos) return;
      const dist = Math.hypot(e.clientX - pointerDownPos[0], e.clientY - pointerDownPos[1]);
      if (dist > 6) return;

      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);

      if (modelContext.labels && modelContext.labels.visible) {
        const spriteHits = raycaster.intersectObjects(modelContext.labels.children, true);
        if (spriteHits.length > 0) {
          const hit = spriteHits[0].object;
          if (hit.userData?.name) {
            setInspectedPart(hit.userData);
            if (onSelectPin) onSelectPin(hit.userData);
            requestRender();
            return;
          }
        }
      }

      const intersects = raycaster.intersectObjects(modelContext.parts, true);
      const hit = intersects.find((x) => x.object.userData?.name || x.instanceId != null);

      if (hit) {
        let name = hit.object.userData.name;
        let desc = hit.object.userData.desc;
        let pinType = hit.object.userData.pinType || 'Component';
        let voltage = hit.object.userData.voltage || '';
        let pinColor = hit.object.userData.color || '#ff4444';

        if (hit.instanceId != null && modelContext.pins) {
          const pinData = modelContext.pins[hit.instanceId];
          if (pinData) {
            const pinName = pinData[2];
            const info = modelContext.pinInfo?.[pinName] || {};
            name = `Pin ${pinName}`;
            desc = info.desc || 'Microcontroller hardware pin';
            pinType = info.type || 'GPIO / Signal';
            voltage = info.v || '3.3V';
            pinColor = info.c || '#5ba2e8';
          }
        }

        const detail = { name, desc, pinType, voltage, color: pinColor };
        setInspectedPart(detail);
        if (onSelectPin) onSelectPin(detail);
        requestRender();
      }
    };

    renderer.domElement.addEventListener('pointerdown', onPointerDown);
    renderer.domElement.addEventListener('pointerup', onPointerUp);

    // Controls change triggers render
    controls.addEventListener('change', requestRender);

    // Resize Observer
    const resizeObserver = new ResizeObserver(() => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight || canvasHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      requestRender();
    });
    resizeObserver.observe(container);

    // High performance Render Loop
    let running = true;
    let framesStill = 0;

    const animate = () => {
      if (!running) return;
      animFrameRef.current = requestAnimationFrame(animate);

      // Interpolate explosion
      const diff = explodeTargetRef.current - explodeCurrentRef.current;
      if (Math.abs(diff) > 0.001) {
        explodeCurrentRef.current += diff * 0.12;
        if (modelContext.groups) {
          modelContext.groups.forEach((g) => {
            if (g.userData.ex !== undefined) {
              g.position.y = explodeCurrentRef.current * g.userData.ex;
            }
          });
        }
        isAnimatingRef.current = true;
      }

      // Check if autoRotate is active
      if (controls.autoRotate) {
        isAnimatingRef.current = true;
      }

      controls.update();

      // Only render if scene changed, or keep rendering for damping
      if (isAnimatingRef.current) {
        renderer.render(scene, camera);
        framesStill++;
        if (framesStill > 30 && !controls.autoRotate && Math.abs(diff) <= 0.001) {
          isAnimatingRef.current = false;
          framesStill = 0;
        }
      }
    };
    animate();

    // Thorough resource cleanup to prevent any memory leak
    return () => {
      running = false;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      resizeObserver.disconnect();
      renderer.domElement.removeEventListener('pointerdown', onPointerDown);
      renderer.domElement.removeEventListener('pointerup', onPointerUp);
      controls.removeEventListener('change', requestRender);

      // Dispose geometries & materials
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
          else obj.material.dispose();
        }
      });

      renderer.dispose();
      if (container) container.innerHTML = '';
    };
  }, [componentId, color, height, onSelectPin]);

  const isCompact = height <= 150;

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: isFullscreen ? '100vh' : height,
        borderRadius: isFullscreen ? 0 : 14,
        overflow: 'hidden',
        background: isWhiteBg
          ? 'radial-gradient(ellipse at 50% 40%, #ffffff 0%, #f1f5f9 55%, #e2e8f0 100%)'
          : 'radial-gradient(ellipse at 50% 35%, #151821 0%, #080a0f 100%)',
        border: isWhiteBg ? '1px solid rgba(0, 0, 0, 0.12)' : '1px solid rgba(255, 68, 68, 0.2)',
        boxShadow: isWhiteBg
          ? 'inset 0 0 60px rgba(0, 0, 0, 0.03), 0 8px 30px rgba(0, 0, 0, 0.12)'
          : 'inset 0 0 40px rgba(0, 0, 0, 0.8), 0 8px 32px rgba(0, 0, 0, 0.6)',
      }}
    >
      <div ref={containerRef} style={{ width: '100%', height: '100%', display: 'block' }} />

      {/* Top Left Header / Part Inspector HUD */}
      {!isCompact && (
        <div
          style={{
            position: 'absolute',
            top: 10,
            left: 10,
            zIndex: 10,
            pointerEvents: 'auto',
          }}
        >
          {inspectedPart ? (
            <div
              style={{
                background: 'rgba(10, 14, 22, 0.94)',
                backdropFilter: 'blur(12px)',
                border: `1px solid ${inspectedPart.color || '#ff4444'}88`,
                borderRadius: 8,
                padding: '8px 12px',
                maxWidth: 280,
                boxShadow: `0 4px 18px rgba(0, 0, 0, 0.7), 0 0 15px ${inspectedPart.color || '#ff4444'}22`,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginBottom: 4 }}>
                <span style={{ fontWeight: 700, fontSize: 13, color: inspectedPart.color || '#fff', letterSpacing: 0.5 }}>
                  {inspectedPart.name}
                </span>
                <div style={{ display: 'flex', gap: 4 }}>
                  {inspectedPart.pinType && (
                    <span
                      style={{
                        fontSize: 11,
                        padding: '2px 6px',
                        borderRadius: 4,
                        background: 'rgba(255,255,255,0.08)',
                        color: '#ccc',
                        fontWeight: 600,
                      }}
                    >
                      {inspectedPart.pinType}
                    </span>
                  )}
                  {inspectedPart.voltage && (
                    <span
                      style={{
                        fontSize: 11,
                        padding: '2px 6px',
                        borderRadius: 4,
                        background: `${inspectedPart.color || '#ff4444'}22`,
                        color: inspectedPart.color || '#ff4444',
                        fontWeight: 600,
                      }}
                    >
                      {inspectedPart.voltage}
                    </span>
                  )}
                  <button
                    onClick={() => setInspectedPart(null)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#888',
                      cursor: 'pointer',
                      fontSize: 13,
                      padding: '1px 3px',
                    }}
                  >
                    ✕
                  </button>
                </div>
              </div>
              <p style={{ margin: 0, fontSize: 12.5, color: '#ccc', lineHeight: 1.45 }}>{inspectedPart.desc}</p>
            </div>
          ) : (
            <div
              style={{
                background: 'rgba(8, 11, 18, 0.72)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: 20,
                padding: '4px 10px',
                fontSize: 12,
                color: '#aaa',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                pointerEvents: 'none',
              }}
            >
              <span style={{ color: '#00ff88', fontSize: 10 }}>●</span>
              <span>Click pins to inspect</span>
            </div>
          )}
        </div>
      )}

      {/* Top Right Tool Buttons */}
      {!isCompact && (
        <div style={{ position: 'absolute', top: 10, right: 10, zIndex: 10, display: 'flex', gap: 6 }}>
          <button
            onClick={() => setIsWhiteBg((b) => !b)}
            title="Toggle 3D Viewport Theme"
            style={{
              background: 'rgba(15, 20, 30, 0.88)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.16)',
              borderRadius: 6,
              padding: '6px 11px',
              color: isWhiteBg ? '#00e5ff' : '#ddd',
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
            }}
          >
            {isWhiteBg ? '☀️ White' : '🌙 Dark'}
          </button>

          <button
            onClick={toggleFullscreen}
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen 3D Mode'}
            style={{
              background: 'rgba(15, 20, 30, 0.88)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.16)',
              borderRadius: 6,
              padding: '6px 11px',
              color: '#ddd',
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
            }}
          >
            {isFullscreen ? '↙ Standard' : '⛶ Full'}
          </button>
        </div>
      )}

      {/* Unified Single-Row Bottom Control Pill Toolbar */}
      {!isCompact && showControls && (
        <div
          style={{
            position: 'absolute',
            bottom: 10,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            padding: '4px 6px',
            background: 'rgba(10, 14, 22, 0.92)',
            backdropFilter: 'blur(12px)',
            borderRadius: 24,
            border: '1px solid rgba(255, 255, 255, 0.16)',
            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.6)',
            maxWidth: 'calc(100% - 20px)',
            overflowX: 'auto',
            whiteSpace: 'nowrap',
            pointerEvents: 'auto',
          }}
        >
          <button
            onClick={handleToggleCallouts}
            title="Toggle Pin Callouts"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 12,
              fontWeight: 600,
              color: calloutsVisible ? '#00e5ff' : '#bbb',
              background: calloutsVisible ? 'rgba(0, 229, 255, 0.18)' : 'transparent',
              border: `1px solid ${calloutsVisible ? 'rgba(0, 229, 255, 0.5)' : 'transparent'}`,
              borderRadius: 16,
              padding: '5px 10px',
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
          >
            🏷️ Pins
          </button>

          <button
            onClick={handleToggleExplode}
            title="Explode 3D Layers"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 12,
              fontWeight: 600,
              color: exploded ? '#ff4444' : '#bbb',
              background: exploded ? 'rgba(255, 68, 68, 0.18)' : 'transparent',
              border: `1px solid ${exploded ? 'rgba(255, 68, 68, 0.5)' : 'transparent'}`,
              borderRadius: 16,
              padding: '5px 10px',
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
          >
            💥 Explode
          </button>

          <button
            onClick={handleToggleRotate}
            title="Auto-Rotate Model"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 12,
              fontWeight: 600,
              color: isRotating ? '#00ff88' : '#bbb',
              background: isRotating ? 'rgba(0, 255, 136, 0.18)' : 'transparent',
              border: `1px solid ${isRotating ? 'rgba(0, 255, 136, 0.5)' : 'transparent'}`,
              borderRadius: 16,
              padding: '5px 10px',
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
          >
            🔄 Rotate
          </button>

          {/* Slim Divider */}
          <div style={{ width: 1, height: 16, background: 'rgba(255, 255, 255, 0.16)', margin: '0 3px' }} />

          {/* View Angle Shortcuts */}
          {[
            { id: 'angled', label: '📐 Angled' },
            { id: 'top', label: '🔝 Top' },
            { id: 'side', label: '↔️ Side' },
            { id: 'back', label: '↩️ Back' },
          ].map((v) => (
            <button
              key={v.id}
              onClick={() => handleSetView(v.id)}
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 12,
                fontWeight: 600,
                color: '#ccc',
                background: 'transparent',
                border: '1px solid transparent',
                borderRadius: 16,
                padding: '5px 8px',
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}
              onMouseEnter={(e) => (e.target.style.background = 'rgba(255,255,255,0.12)')}
              onMouseLeave={(e) => (e.target.style.background = 'transparent')}
            >
              {v.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

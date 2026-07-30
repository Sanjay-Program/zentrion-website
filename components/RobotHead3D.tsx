'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function RobotHead3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const width = container.clientWidth || 1;
    const height = container.clientHeight || 1;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0.15, 5.4);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    const disposables: { dispose: () => void }[] = [];
    const track = <T extends { dispose: () => void }>(item: T): T => {
      disposables.push(item);
      return item;
    };

    const bust = new THREE.Group();
    scene.add(bust);

    // --- Cranium -----------------------------------------------------
    const craniumGeo = track(new THREE.IcosahedronGeometry(1.05, 2));
    const craniumMat = track(
      new THREE.MeshBasicMaterial({ color: 0x2f6bff, wireframe: true, transparent: true, opacity: 0.55 }),
    );
    const cranium = new THREE.Mesh(craniumGeo, craniumMat);
    cranium.scale.set(1, 1.12, 1);
    bust.add(cranium);

    // --- Inner core glow ----------------------------------------------
    const coreGeo = track(new THREE.IcosahedronGeometry(0.55, 1));
    const coreMat = track(
      new THREE.MeshBasicMaterial({ color: 0x00d4ff, wireframe: true, transparent: true, opacity: 0.35 }),
    );
    const core = new THREE.Mesh(coreGeo, coreMat);
    bust.add(core);

    // --- Visor ---------------------------------------------------------
    const visorGeo = track(new THREE.TorusGeometry(0.62, 0.05, 8, 40, Math.PI));
    const visorMat = track(new THREE.MeshBasicMaterial({ color: 0x00d4ff, transparent: true, opacity: 0.85 }));
    const visor = new THREE.Mesh(visorGeo, visorMat);
    visor.rotation.set(0, 0, Math.PI);
    visor.position.set(0, 0.08, 0.85);
    bust.add(visor);

    // --- Eye dots --------------------------------------------------------
    const eyeGeo = track(new THREE.SphereGeometry(0.07, 12, 12));
    const eyeMat = track(new THREE.MeshBasicMaterial({ color: 0x00d4ff }));
    const eyeL = new THREE.Mesh(eyeGeo, eyeMat);
    eyeL.position.set(-0.32, 0.08, 0.98);
    const eyeR = new THREE.Mesh(eyeGeo, eyeMat.clone());
    eyeR.position.set(0.32, 0.08, 0.98);
    bust.add(eyeL, eyeR);

    // --- Jaw plate ------------------------------------------------------
    const jawGeo = track(new THREE.BoxGeometry(0.9, 0.32, 0.7));
    const jawMat = track(
      new THREE.MeshBasicMaterial({ color: 0x2f6bff, wireframe: true, transparent: true, opacity: 0.6 }),
    );
    const jaw = new THREE.Mesh(jawGeo, jawMat);
    jaw.position.set(0, -0.72, 0.28);
    bust.add(jaw);

    // --- Side panels ------------------------------------------------------
    const panelGeo = track(new THREE.BoxGeometry(0.16, 0.5, 0.5));
    const panelMat = track(
      new THREE.MeshBasicMaterial({ color: 0x7c5cff, wireframe: true, transparent: true, opacity: 0.55 }),
    );
    const panelL = new THREE.Mesh(panelGeo, panelMat);
    panelL.position.set(-1.0, -0.05, 0.05);
    const panelR = new THREE.Mesh(panelGeo, panelMat.clone());
    panelR.position.set(1.0, -0.05, 0.05);
    bust.add(panelL, panelR);

    // --- Neck + collar ------------------------------------------------------
    const neckGeo = track(new THREE.CylinderGeometry(0.32, 0.42, 0.5, 16, 1, true));
    const neckMat = track(
      new THREE.MeshBasicMaterial({ color: 0x2f6bff, wireframe: true, transparent: true, opacity: 0.4 }),
    );
    const neck = new THREE.Mesh(neckGeo, neckMat);
    neck.position.set(0, -1.35, 0);
    bust.add(neck);

    const collarGeo = track(new THREE.TorusGeometry(0.56, 0.05, 10, 40));
    const collarMat = track(new THREE.MeshBasicMaterial({ color: 0x00d4ff, transparent: true, opacity: 0.55 }));
    const collar = new THREE.Mesh(collarGeo, collarMat);
    collar.rotation.x = Math.PI / 2;
    collar.position.set(0, -1.6, 0);
    bust.add(collar);

    // --- Antenna --------------------------------------------------------
    const antennaGeo = track(new THREE.CylinderGeometry(0.015, 0.015, 0.4, 6));
    const antennaMat = track(new THREE.MeshBasicMaterial({ color: 0x00d4ff, transparent: true, opacity: 0.7 }));
    const antenna = new THREE.Mesh(antennaGeo, antennaMat);
    antenna.position.set(0, 1.5, 0);
    bust.add(antenna);

    const antennaTipGeo = track(new THREE.SphereGeometry(0.06, 10, 10));
    const antennaTipMat = track(new THREE.MeshBasicMaterial({ color: 0x00d4ff }));
    const antennaTip = new THREE.Mesh(antennaTipGeo, antennaTipMat);
    antennaTip.position.set(0, 1.72, 0);
    bust.add(antennaTip);

    // --- Orbit rings (HUD halo, matches the rest of the site's language) --
    const ringGeo = track(new THREE.TorusGeometry(1.9, 0.01, 12, 120));
    const ringMat = track(new THREE.MeshBasicMaterial({ color: 0x7c5cff, transparent: true, opacity: 0.45 }));
    const ring1 = new THREE.Mesh(ringGeo, ringMat);
    ring1.rotation.set(Math.PI / 2.3, 0, 0);
    scene.add(ring1);

    const ring2 = new THREE.Mesh(ringGeo.clone(), ringMat.clone());
    ring2.rotation.set(Math.PI / 1.6, Math.PI / 4, 0);
    scene.add(ring2);

    let raf = 0;
    let visible = true;
    let t = 0;

    function onVisibility() {
      visible = document.visibilityState === 'visible';
    }
    document.addEventListener('visibilitychange', onVisibility);

    function animate() {
      if (visible) {
        const speed = prefersReduced ? 0.0008 : 0.0026;
        t += speed;
        bust.rotation.y += speed;
        bust.position.y = Math.sin(t * 1.4) * 0.05;
        core.rotation.y -= speed * 2;
        core.rotation.x += speed;
        ring1.rotation.z += speed * 1.6;
        ring2.rotation.z -= speed * 1.2;
        const pulse = 0.6 + Math.sin(t * 3) * 0.25;
        (eyeMat as THREE.MeshBasicMaterial).opacity = pulse;
        renderer.render(scene, camera);
      }
      raf = requestAnimationFrame(animate);
    }
    animate();

    function handleResize() {
      const w = container!.clientWidth || 1;
      const h = container!.clientHeight || 1;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }
    const ro = new ResizeObserver(handleResize);
    ro.observe(container);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
      if (renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="h-full w-full" aria-hidden="true" />;
}

"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

function makeWedgeGeometry() {
  const vertices = new Float32Array([
    -2.5,-0.55, 0.9,   2.55,-0.55, 0.9,   2.55,-0.55,-0.9,  -2.5,-0.55,-0.9,
    -1.95, 0.45, 0.9,   1.25, 0.78, 0.9,   2.15, 0.10, 0.9,
    -1.95, 0.45,-0.9,   1.25, 0.78,-0.9,   2.15, 0.10,-0.9
  ]);

  const indices = [
    0,1,2, 0,2,3,
    0,4,5, 0,5,1,
    1,5,6, 1,6,2,
    3,2,9, 3,9,7,
    2,6,9,
    3,7,4, 3,4,0,
    4,7,8, 4,8,5,
    5,8,9, 5,9,6,
    7,9,8
  ];

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

export default function TruckScene() {
  const mount = useRef(null);

  useEffect(() => {
    const host = mount.current;
    if (!host) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.set(7.2, 3.4, 7.8);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = true;
    host.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const metal = new THREE.MeshStandardMaterial({
      color: 0xaeb4b7,
      metalness: 0.94,
      roughness: 0.23,
      flatShading: true
    });

    const dark = new THREE.MeshStandardMaterial({
      color: 0x111315,
      metalness: 0.55,
      roughness: 0.35
    });

    const glass = new THREE.MeshPhysicalMaterial({
      color: 0x182328,
      metalness: 0.3,
      roughness: 0.08,
      transmission: 0.05,
      transparent: true,
      opacity: 0.88
    });

    const body = new THREE.Mesh(makeWedgeGeometry(), metal);
    body.castShadow = true;
    body.receiveShadow = true;
    group.add(body);

    const windshield = new THREE.Mesh(new THREE.PlaneGeometry(1.85, 1.28), glass);
    windshield.position.set(1.02, 0.57, 0.912);
    windshield.rotation.z = -0.25;
    group.add(windshield);

    const lightbar = new THREE.Mesh(
      new THREE.BoxGeometry(1.2, 0.035, 0.03),
      new THREE.MeshBasicMaterial({ color: 0xe8f3f4 })
    );
    lightbar.position.set(2.17, 0.02, 0.91);
    group.add(lightbar);

    const wheelGeo = new THREE.CylinderGeometry(0.59, 0.59, 0.42, 24);
    const rimGeo = new THREE.CylinderGeometry(0.26, 0.26, 0.44, 16);
    [
      [-1.45,-0.55, 1.0], [1.45,-0.55, 1.0],
      [-1.45,-0.55,-1.0], [1.45,-0.55,-1.0]
    ].forEach(([x,y,z]) => {
      const wheel = new THREE.Mesh(wheelGeo, dark);
      wheel.rotation.x = Math.PI / 2;
      wheel.position.set(x,y,z);
      wheel.castShadow = true;
      group.add(wheel);

      const rim = new THREE.Mesh(rimGeo, metal);
      rim.rotation.x = Math.PI / 2;
      rim.position.set(x,y,z);
      group.add(rim);
    });

    const frame = new THREE.LineSegments(
      new THREE.EdgesGeometry(makeWedgeGeometry(), 20),
      new THREE.LineBasicMaterial({ color: 0xe5ebec, transparent: true, opacity: 0.38 })
    );
    group.add(frame);

    const ground = new THREE.GridHelper(22, 22, 0x7d8588, 0x34393b);
    ground.position.y = -1.18;
    ground.material.transparent = true;
    ground.material.opacity = 0.23;
    scene.add(ground);

    const key = new THREE.DirectionalLight(0xffffff, 4.2);
    key.position.set(5, 8, 6);
    key.castShadow = true;
    scene.add(key);

    const rim = new THREE.DirectionalLight(0xa7c4cc, 2.4);
    rim.position.set(-6, 3, -5);
    scene.add(rim);

    scene.add(new THREE.AmbientLight(0xffffff, 0.55));

    let pointerX = 0;
    let pointerY = 0;
    let frameId;

    const pointerMove = (e) => {
      const rect = host.getBoundingClientRect();
      pointerX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      pointerY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    host.addEventListener("pointermove", pointerMove);

    const resize = () => {
      const w = Math.max(host.clientWidth, 1);
      const h = Math.max(host.clientHeight, 1);
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(host);
    resize();

    const clock = new THREE.Clock();
    const animate = () => {
      const t = clock.getElapsedTime();
      group.rotation.y += ((-0.52 + pointerX * 0.13) - group.rotation.y) * 0.035;
      group.rotation.x += ((0.02 - pointerY * 0.035) - group.rotation.x) * 0.035;
      group.position.y = Math.sin(t * 0.85) * 0.035;
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      host.removeEventListener("pointermove", pointerMove);
      ro.disconnect();
      renderer.dispose();
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose?.();
        if (obj.material) {
          const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
          mats.forEach(m => m.dispose?.());
        }
      });
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={mount} className="truck-scene" aria-label="Animated futuristic delivery truck visualization" />;
}

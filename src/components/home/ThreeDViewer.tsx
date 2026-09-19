"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Sparkles, Eye, RotateCw, Layers } from "lucide-react";

export default function ThreeDViewer() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [materialTheme, setMaterialTheme] = useState<"travertine" | "obsidian">("travertine");
  const [lightMood, setLightMood] = useState<"daylight" | "golden">("golden");
  const [isMobile, setIsMobile] = useState(false);

  // Scene references to update materials dynamically
  const sceneRef = useRef<THREE.Scene | null>(null);
  const floorMeshRef = useRef<THREE.Mesh | null>(null);
  const islandMeshRef = useRef<THREE.Mesh | null>(null);
  const dirLightRef = useRef<THREE.DirectionalLight | null>(null);
  const ambientLightRef = useRef<THREE.AmbientLight | null>(null);

  useEffect(() => {
    // Check mobile viewport
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile || !mountRef.current) return;

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x141414);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(7, 5, 8);
    camera.lookAt(0, 1, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    mountRef.current.innerHTML = "";
    mountRef.current.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xfff4e6, 0.9);
    scene.add(ambientLight);
    ambientLightRef.current = ambientLight;

    const dirLight = new THREE.DirectionalLight(0xffecd2, 1.8);
    dirLight.position.set(8, 12, 6);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    scene.add(dirLight);
    dirLightRef.current = dirLight;

    // Architectural Floor
    const floorGeo = new THREE.BoxGeometry(10, 0.2, 10);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0xe8e2d8,
      roughness: 0.35,
      metalness: 0.05,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.position.y = -0.1;
    floor.receiveShadow = true;
    scene.add(floor);
    floorMeshRef.current = floor;

    // Blueprint Grid Lines on Floor
    const gridHelper = new THREE.GridHelper(10, 20, 0xc5a880, 0x333333);
    gridHelper.position.y = 0.01;
    scene.add(gridHelper);

    // Back Minimalist Wall
    const wallGeo = new THREE.BoxGeometry(10, 4, 0.3);
    const wallMat = new THREE.MeshStandardMaterial({
      color: 0x222222,
      roughness: 0.8,
    });
    const backWall = new THREE.Mesh(wallGeo, wallMat);
    backWall.position.set(0, 2, -4.85);
    backWall.receiveShadow = true;
    scene.add(backWall);

    // Side Wall with architectural slot window
    const sideWallGeo = new THREE.BoxGeometry(0.3, 4, 6);
    const sideWall = new THREE.Mesh(sideWallGeo, wallMat);
    sideWall.position.set(-4.85, 2, -1.85);
    sideWall.receiveShadow = true;
    scene.add(sideWall);

    // Monolithic Architectural Kitchen Island / Counter
    const islandGeo = new THREE.BoxGeometry(4.2, 1.1, 1.6);
    const islandMat = new THREE.MeshStandardMaterial({
      color: 0xf5f3ee,
      roughness: 0.2,
      metalness: 0.1,
    });
    const island = new THREE.Mesh(islandGeo, islandMat);
    island.position.set(0, 0.55, -0.5);
    island.castShadow = true;
    island.receiveShadow = true;
    scene.add(island);
    islandMeshRef.current = island;

    // Architectural Column / Feature Tower
    const columnGeo = new THREE.CylinderGeometry(0.3, 0.3, 4, 32);
    const columnMat = new THREE.MeshStandardMaterial({
      color: 0xc5a880,
      metalness: 0.8,
      roughness: 0.3,
    });
    const column = new THREE.Mesh(columnGeo, columnMat);
    column.position.set(3.8, 2, -3.5);
    column.castShadow = true;
    scene.add(column);

    // Minimalist Lounge Bench
    const benchGeo = new THREE.BoxGeometry(3, 0.45, 1.1);
    const benchMat = new THREE.MeshStandardMaterial({
      color: 0x4a3b32,
      roughness: 0.7,
    });
    const bench = new THREE.Mesh(benchGeo, benchMat);
    bench.position.set(0, 0.22, 2.6);
    bench.castShadow = true;
    bench.receiveShadow = true;
    scene.add(bench);

    // Mouse Interaction for smooth camera orbit
    let isDragging = false;
    let prevMousePos = { x: 0, y: 0 };
    let spherical = { radius: 12, phi: Math.PI / 4, theta: Math.PI / 4 };

    const updateCameraPos = () => {
      // Clamp angles
      spherical.phi = Math.max(0.2, Math.min(Math.PI / 2.3, spherical.phi));
      camera.position.x =
        spherical.radius * Math.sin(spherical.phi) * Math.sin(spherical.theta);
      camera.position.y = spherical.radius * Math.cos(spherical.phi);
      camera.position.z =
        spherical.radius * Math.sin(spherical.phi) * Math.cos(spherical.theta);
      camera.lookAt(0, 1.2, 0);
    };
    updateCameraPos();

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMousePos.x;
      const deltaY = e.clientY - prevMousePos.y;

      spherical.theta -= deltaX * 0.006;
      spherical.phi -= deltaY * 0.006;
      updateCameraPos();

      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    // Touch Interaction for Tablet devices
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        prevMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - prevMousePos.x;
      const deltaY = e.touches[0].clientY - prevMousePos.y;

      spherical.theta -= deltaX * 0.006;
      spherical.phi -= deltaY * 0.006;
      updateCameraPos();

      prevMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const onTouchEnd = () => {
      isDragging = false;
    };

    const dom = mountRef.current;
    dom.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    dom.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

    // Render loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isDragging) {
        // Subtle ambient slow drift
        spherical.theta += 0.001;
        updateCameraPos();
      }
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!mountRef.current) return;
      const newW = mountRef.current.clientWidth;
      const newH = mountRef.current.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      dom.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      dom.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("resize", handleResize);
      if (dom.contains(renderer.domElement)) {
        dom.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isMobile]);

  // Update dynamic materials when buttons are clicked
  const handleMaterialChange = (theme: "travertine" | "obsidian") => {
    setMaterialTheme(theme);
    if (!floorMeshRef.current || !islandMeshRef.current) return;

    if (theme === "travertine") {
      (floorMeshRef.current.material as THREE.MeshStandardMaterial).color.set(0xe8e2d8);
      (islandMeshRef.current.material as THREE.MeshStandardMaterial).color.set(0xf5f3ee);
    } else {
      (floorMeshRef.current.material as THREE.MeshStandardMaterial).color.set(0x1e1e1e);
      (islandMeshRef.current.material as THREE.MeshStandardMaterial).color.set(0x3a3836);
    }
  };

  const handleLightChange = (mood: "daylight" | "golden") => {
    setLightMood(mood);
    if (!dirLightRef.current || !ambientLightRef.current) return;

    if (mood === "daylight") {
      dirLightRef.current.color.set(0xffffff);
      dirLightRef.current.intensity = 2.0;
      ambientLightRef.current.color.set(0xf0f4f8);
    } else {
      dirLightRef.current.color.set(0xffc58d);
      dirLightRef.current.intensity = 2.4;
      ambientLightRef.current.color.set(0xffe8d1);
    }
  };

  return (
    <section className="py-24 sm:py-32 bg-[#121212] text-[#FBF9F5] relative overflow-hidden border-b border-white/10">
      {/* Blueprint grid background */}
      <div className="absolute inset-0 architectural-grid-dark opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between border-b border-white/10 pb-8 mb-10 gap-6">
          <div>
            <span className="text-[11px] font-mono-tech uppercase tracking-[0.26em] text-[#C5A880] block mb-2">
              [ 04 // SPATIAL 3D PREVIEW ]
            </span>
            <h2 className="font-serif-heading text-3xl sm:text-5xl tracking-tight text-white">
              See The Space Before It Exists.
            </h2>
            <p className="text-stone-400 text-xs sm:text-sm font-light mt-2 max-w-xl">
              Rotate the architectural volume in real-time. Test material interactions, daylight incidence, and monolithic circulation before civil excavation commences.
            </p>
          </div>

          {/* Interactive Controls Pill Bar */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 p-1 bg-[#1F1E1D] border border-white/10">
              <span className="text-[10px] font-mono-tech text-stone-400 px-2 uppercase tracking-wider">
                Material:
              </span>
              <button
                onClick={() => handleMaterialChange("travertine")}
                className={`px-3 py-1 text-xs uppercase tracking-wider transition-colors ${
                  materialTheme === "travertine"
                    ? "bg-[#C5A880] text-[#141414] font-semibold"
                    : "text-stone-400 hover:text-white"
                }`}
              >
                Travertine
              </button>
              <button
                onClick={() => handleMaterialChange("obsidian")}
                className={`px-3 py-1 text-xs uppercase tracking-wider transition-colors ${
                  materialTheme === "obsidian"
                    ? "bg-[#C5A880] text-[#141414] font-semibold"
                    : "text-stone-400 hover:text-white"
                }`}
              >
                Obsidian
              </button>
            </div>

            <div className="flex items-center gap-1.5 p-1 bg-[#1F1E1D] border border-white/10">
              <span className="text-[10px] font-mono-tech text-stone-400 px-2 uppercase tracking-wider">
                Lighting:
              </span>
              <button
                onClick={() => handleLightChange("golden")}
                className={`px-3 py-1 text-xs uppercase tracking-wider transition-colors ${
                  lightMood === "golden"
                    ? "bg-[#C5A880] text-[#141414] font-semibold"
                    : "text-stone-400 hover:text-white"
                }`}
              >
                Golden 2700K
              </button>
              <button
                onClick={() => handleLightChange("daylight")}
                className={`px-3 py-1 text-xs uppercase tracking-wider transition-colors ${
                  lightMood === "daylight"
                    ? "bg-[#C5A880] text-[#141414] font-semibold"
                    : "text-stone-400 hover:text-white"
                }`}
              >
                Daylight 5000K
              </button>
            </div>
          </div>
        </div>

        {/* 3D Canvas Box (Desktop) or Cinematic Parallax Fallback (Mobile) */}
        <div className="relative w-full h-[520px] sm:h-[580px] bg-[#1A1A1A] border border-white/10 overflow-hidden shadow-2xl">
          {!isMobile ? (
            <>
              {/* Three.js Canvas Container */}
              <div
                ref={mountRef}
                className="w-full h-full cursor-grab active:cursor-grabbing"
              />

              {/* Floating Interaction Instructions */}
              <div className="absolute bottom-6 left-6 flex items-center gap-3 bg-[#121212]/80 backdrop-blur-md px-4 py-2 border border-white/10 text-[11px] font-mono-tech text-stone-300 pointer-events-none">
                <RotateCw className="w-3.5 h-3.5 text-[#C5A880] animate-spin" />
                <span>CLICK & DRAG TO ORBIT • REAL-TIME 3D SPATIAL ENGINE</span>
              </div>

              <div className="absolute top-6 right-6 flex items-center gap-2 bg-[#121212]/80 backdrop-blur-md px-3 py-1.5 border border-white/10 text-[10px] font-mono-tech text-[#C5A880]">
                <Layers className="w-3.5 h-3.5" />
                <span>60 FPS • ACCELERATED</span>
              </div>
            </>
          ) : (
            /* Mobile High-Performance Cinematic Fallback */
            <div className="relative w-full h-full flex flex-col justify-between p-6 bg-cover bg-center"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80')`,
              }}
            >
              <div className="absolute inset-0 bg-[#121212]/70 backdrop-blur-[2px]" />
              <div className="relative z-10 flex justify-between items-center text-[10px] font-mono-tech uppercase tracking-widest text-[#C5A880]">
                <span>[ MOBILE 3D PERSPECTIVE ]</span>
                <span>RETINA VISUALIZATION</span>
              </div>
              <div className="relative z-10 space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#121212]/85 text-[#C5A880] text-xs font-mono-tech border border-white/10">
                  <Eye className="w-3.5 h-3.5" />
                  <span>3D BIM RENDERING PREVIEW</span>
                </div>
                <h3 className="font-serif-heading text-2xl text-white">
                  Millimeter-Accurate Spatial Prototyping
                </h3>
                <p className="text-stone-300 text-xs leading-relaxed max-w-sm">
                  Experience interactive 3D spatial orbit on desktop or book a virtual reality consultation with our principal architect.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

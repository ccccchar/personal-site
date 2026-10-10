"use client";

/* eslint-disable react/no-unknown-property */
import { useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree, Canvas } from "@react-three/fiber";
import { useFBO } from "@react-three/drei";

const NAV_BAR = "[data-nav-glass-bar]";
const MAIN_ID = "site-main";
/** 以导航中心放大背后的内容，字会稍大，左右仍从中心对称展开 */
const LENS = 1.14;

function fitPlane(mesh: THREE.Mesh, width: number, height: number) {
  mesh.scale.set(1, 1, 1);
  const geo = mesh.geometry as THREE.PlaneGeometry;
  const pw = geo.parameters?.width ?? 0;
  const ph = geo.parameters?.height ?? 0;
  if (Math.abs(pw - width) > 0.2 || Math.abs(ph - height) > 0.2) {
    mesh.geometry.dispose();
    mesh.geometry = new THREE.PlaneGeometry(
      Math.max(width, 0.01),
      Math.max(height, 0.01),
    );
  }
}

/** 整块玻璃带一点拱起。缩放必须保持 1，否则透射会只剩中间一条。 */
function lensGeometry(width: number, height: number) {
  const geo = new THREE.PlaneGeometry(
    Math.max(width, 0.01),
    Math.max(height, 0.01),
    80,
    32,
  );
  const pos = geo.attributes.position;
  const hw = Math.max(width / 2, 0.01);
  const hh = Math.max(height / 2, 0.01);
  const bulge = Math.min(height * 0.28, 0.32);
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i) / hw;
    const y = pos.getY(i) / hh;
    const dome = Math.max(0, 1 - x * x * 0.22 - y * y * 0.55);
    pos.setZ(i, dome * bulge);
  }
  geo.computeVertexNormals();
  return geo;
}

const LENS_REV = 3;

const refractionMaterial = new THREE.ShaderMaterial({
  uniforms: {
    buffer: { value: null },
    resolution: { value: new THREE.Vector2(1, 1) },
    strength: { value: 0.09 },
    aberration: { value: 0.014 },
  },
  vertexShader: `
    varying vec3 vNormal;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D buffer;
    uniform vec2 resolution;
    uniform float strength;
    uniform float aberration;
    varying vec3 vNormal;
    void main() {
      vec2 uv = gl_FragCoord.xy / resolution;
      vec2 base = clamp(uv + vNormal.xy * strength, 0.002, 0.998);
      vec4 center = texture2D(buffer, base);
      if (center.a < 0.04) discard;
      vec4 right = texture2D(buffer, clamp(base + vec2(aberration, 0.0), 0.002, 0.998));
      vec4 left = texture2D(buffer, clamp(base - vec2(aberration, 0.0), 0.002, 0.998));
      float r = right.a > 0.04 ? right.r : center.r;
      float b = left.a > 0.04 ? left.b : center.b;
      gl_FragColor = vec4(r, center.g, b, center.a);
    }
  `,
  toneMapped: false,
});

function fitLens(mesh: THREE.Mesh, width: number, height: number) {
  mesh.scale.set(1, 1, 1);
  const geo = mesh.geometry as THREE.PlaneGeometry;
  const pw = geo.parameters?.width ?? 0;
  const ph = geo.parameters?.height ?? 0;
  if (
    mesh.userData.lensRev !== LENS_REV ||
    Math.abs(pw - width) > 0.2 ||
    Math.abs(ph - height) > 0.2
  ) {
    mesh.userData.lensRev = LENS_REV;
    mesh.geometry.dispose();
    mesh.geometry = lensGeometry(width, height);
  }
}

/**
 * 玻璃层从进入页面就盖住导航，避免先看见正文再闪出玻璃。
 * 重叠条每帧跟随滚动。X 缩放保持 1，否则透射光线会被甩出画面。
 */
function LiveScene({ source }: { source: HTMLCanvasElement | null }) {
  const buffer = useFBO();
  const bgScene = useMemo(() => new THREE.Scene(), []);
  const glassRef = useRef<THREE.Mesh>(null);
  const { viewport, camera, gl } = useThree();

  const photo = useMemo(() => {
    const mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(1, 1),
      new THREE.MeshBasicMaterial({
        transparent: true,
        depthWrite: false,
        toneMapped: false,
      }),
    );
    mesh.visible = false;
    bgScene.add(mesh);
    return mesh;
  }, [bgScene]);

  const tex = useMemo(() => {
    if (!source) return null;
    const t = new THREE.CanvasTexture(source);
    t.colorSpace = THREE.SRGBColorSpace;
    t.wrapS = THREE.ClampToEdgeWrapping;
    t.wrapT = THREE.ClampToEdgeWrapping;
    t.repeat.set(1, 1);
    t.offset.set(0, 0);
    return t;
  }, [source]);

  useLayoutEffect(() => {
    const mat = photo.material as THREE.MeshBasicMaterial;
    mat.map = tex;
    mat.needsUpdate = true;
  }, [photo, tex]);

  useFrame(() => {
    const planeZ = 0;
    const view = viewport.getCurrentViewport(camera, [0, 0, planeZ]);
    const glass = glassRef.current;
    const headerEl = document.querySelector(NAV_BAR);
    const mainEl = document.getElementById(MAIN_ID);
    const header =
      headerEl instanceof HTMLElement ? headerEl.getBoundingClientRect() : null;
    const main = mainEl?.getBoundingClientRect() ?? null;
    const overlap = Boolean(
      header &&
        main &&
        main.bottom > header.top + 0.5 &&
        main.top < header.bottom - 0.5 &&
        main.right > header.left &&
        main.left < header.right,
    );
    const show = Boolean(tex && header && main && overlap);

    photo.visible = show;
    if (show && header && main) {
      const w = (main.width / header.width) * view.width;
      const h = (main.height / header.height) * view.height;
      const left =
        -view.width / 2 + ((main.left - header.left) / header.width) * view.width;
      const top =
        view.height / 2 - ((main.top - header.top) / header.height) * view.height;
      fitPlane(photo, w, h);
      photo.scale.set(LENS, LENS, 1);
      photo.position.set((left + w / 2) * LENS, (top - h / 2) * LENS, 0.02);
    }

    if (glass) {
      glass.visible = true;
      glass.position.set(0, 0, planeZ);
      fitLens(glass, view.width, view.height);
    }

    refractionMaterial.uniforms.buffer.value = buffer.texture;
    refractionMaterial.uniforms.resolution.value.set(
      gl.domElement.width,
      gl.domElement.height,
    );

    gl.setRenderTarget(buffer);
    gl.setClearColor(0x000000, 0);
    gl.clear();
    gl.render(bgScene, camera);
    gl.setRenderTarget(null);
    gl.setClearColor(0x000000, 0);
  });

  return (
    <mesh ref={glassRef} position={[0, 0, 0]} material={refractionMaterial}>
      <planeGeometry args={[1, 1]} />
    </mesh>
  );
}

/** 顶栏专用：整块长方形 WebGL 玻璃，与 /glass 对比区画布分离 */
export function NavRectGlassCanvas({
  source,
}: {
  source: HTMLCanvasElement | null;
}) {
  return (
    <Canvas
      className="block h-full w-full"
      style={{ width: "100%", height: "100%", display: "block" }}
      camera={{ position: [0, 0, 2.6], fov: 42 }}
      gl={{
        alpha: true,
        antialias: true,
        premultipliedAlpha: false,
        powerPreference: "high-performance",
      }}
      dpr={[1, 1.25]}
      frameloop="always"
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
      }}
    >
      <LiveScene source={source} />
    </Canvas>
  );
}

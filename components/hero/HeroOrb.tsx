"use client";
import { useRef, useEffect, useMemo, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

/* ─── GLSL ─────────────────────────────────────────────────────────────────── */

// Ashima Arts simplex noise (MIT license)
const NOISE_FN = `
vec3 _m289(vec3 x){return x-floor(x*(1./289.))*289.;}
vec4 _m289(vec4 x){return x-floor(x*(1./289.))*289.;}
vec4 _prm(vec4 x){return _m289(((x*34.)+10.)*x);}
vec4 _tis(vec4 r){return 1.79284291400159-.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1./6.,1./3.);const vec4 D=vec4(0.,.5,1.,2.);
  vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.-g;
  vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;vec3 x3=x0-D.yyy;
  i=_m289(i);
  vec4 p=_prm(_prm(_prm(i.z+vec4(0.,i1.z,i2.z,1.))+i.y+vec4(0.,i1.y,i2.y,1.))+i.x+vec4(0.,i1.x,i2.x,1.));
  float n_=.142857142857;vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.*x_);
  vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;vec4 h=1.-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.+1.;vec4 s1=floor(b1)*2.+1.;vec4 sh=-step(h,vec4(0.));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);
  vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=_tis(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.);
  m*=m;return 42.*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}`;

const VERT = `${NOISE_FN}
uniform float uTime;
varying vec3 vNorm;
varying vec3 vWorldPos;
varying float vDisp;
void main(){
  vNorm = normalize(normalMatrix * normal);
  // 3-octave organic displacement — surface breathes, not spins
  float d = snoise(position * 1.70 + uTime * 0.22) * 0.090
           + snoise(position * 3.50 - uTime * 0.17) * 0.045
           + snoise(position * 7.10 + uTime * 0.11) * 0.020;
  vDisp = d;
  vec3 disp = position + normal * d;
  vec4 wp = modelMatrix * vec4(disp, 1.0);
  vWorldPos = wp.xyz;
  gl_Position = projectionMatrix * viewMatrix * wp;
}`;

const FRAG = `
uniform float uTime;
varying vec3 vNorm;
varying vec3 vWorldPos;
varying float vDisp;
void main(){
  vec3 vd = normalize(cameraPosition - vWorldPos);
  float fr = pow(1.0 - clamp(dot(vNorm, vd), 0.0, 1.0), 2.5);
  // 4-stop Fresnel gradient: near-black core → orange → amber → cream white
  vec3 c0 = vec3(0.06, 0.02, 0.01);
  vec3 c1 = vec3(0.98, 0.45, 0.09);
  vec3 c2 = vec3(1.00, 0.72, 0.29);
  vec3 c3 = vec3(1.00, 0.97, 0.92);
  vec3 col;
  if(fr < .33)      col = mix(c0, c1, fr / .33);
  else if(fr < .66) col = mix(c1, c2, (fr - .33) / .33);
  else              col = mix(c2, c3, (fr - .66) / .34);
  // High-frequency shimmer traveling across the surface
  float sh = sin(uTime * 1.8 + vWorldPos.x * 5.0 + vWorldPos.y * 4.0) * 0.5 + 0.5;
  col += sh * 0.10 * vec3(1.0, 0.6, 0.2);
  // Displaced peaks catch extra light
  col += max(0.0, vDisp) * vec3(2.0, 1.2, 0.4) * 0.7;
  gl_FragColor = vec4(col, 0.55 + fr * 0.40);
}`;

/* ─── Shader Orb — organic Fresnel sphere ──────────────────────────────────── */
function ShaderOrb() {
  const mat = useMemo(() => new THREE.ShaderMaterial({
    vertexShader: VERT,
    fragmentShader: FRAG,
    uniforms: { uTime: { value: 0 } },
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.FrontSide,
  }), []);

  useFrame(({ clock }) => { mat.uniforms.uTime.value = clock.getElapsedTime(); });

  useEffect(() => () => { mat.dispose(); }, [mat]);

  return (
    <mesh material={mat}>
      <sphereGeometry args={[1.0, 128, 128]} />
    </mesh>
  );
}

/* ─── Neural Network — node graph in sphere shell ──────────────────────────── */
function NeuralNet({ prefersReduced }: { prefersReduced: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  const { nodeGeom, lineGeom } = useMemo(() => {
    const N = 140;
    const nodePos: number[] = [];
    const pts: THREE.Vector3[] = [];

    for (let i = 0; i < N; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      const r     = 1.38 + Math.random() * 0.52;
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      nodePos.push(x, y, z);
      pts.push(new THREE.Vector3(x, y, z));
    }

    // Sparse connections — max 3 per node keeps it clean
    const conns = new Array(N).fill(0);
    const linePos: number[] = [];
    for (let i = 0; i < N; i++) {
      for (let j = i + 1; j < N; j++) {
        if (conns[i] >= 3 || conns[j] >= 3) continue;
        if (pts[i].distanceTo(pts[j]) < 0.62) {
          linePos.push(pts[i].x, pts[i].y, pts[i].z, pts[j].x, pts[j].y, pts[j].z);
          conns[i]++;
          conns[j]++;
        }
      }
    }

    const ng = new THREE.BufferGeometry();
    ng.setAttribute("position", new THREE.BufferAttribute(new Float32Array(nodePos), 3));
    const lg = new THREE.BufferGeometry();
    lg.setAttribute("position", new THREE.BufferAttribute(new Float32Array(linePos), 3));
    return { nodeGeom: ng, lineGeom: lg };
  }, []);

  useEffect(() => () => { nodeGeom.dispose(); lineGeom.dispose(); }, [nodeGeom, lineGeom]);

  useFrame(({ clock }) => {
    if (!groupRef.current || prefersReduced) return;
    const t = clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.06;
    groupRef.current.rotation.x = Math.sin(t * 0.04) * 0.12;
  });

  const lineMat = useMemo(() => new THREE.LineBasicMaterial({
    color: "#fb923c",
    transparent: true,
    opacity: 0.18,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  }), []);

  const nodeMat = useMemo(() => new THREE.PointsMaterial({
    color: "#fdba74",
    size: 0.016,
    transparent: true,
    opacity: 0.75,
    sizeAttenuation: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  }), []);

  useEffect(() => () => { lineMat.dispose(); nodeMat.dispose(); }, [lineMat, nodeMat]);

  return (
    <group ref={groupRef}>
      <lineSegments geometry={lineGeom} material={lineMat} />
      <points geometry={nodeGeom} material={nodeMat} />
    </group>
  );
}

/* ─── Orbital Rings — 3 inclined particle rings ────────────────────────────── */
const RING_DEFS = [
  { tilt: 0,                  axisZ: 0,             radius: 1.52, color: "#f97316", speed:  0.40 },
  { tilt: Math.PI / 3,        axisZ: Math.PI / 5,   radius: 1.64, color: "#fb923c", speed: -0.30 },
  { tilt: -Math.PI * 0.22,    axisZ: Math.PI * 0.4, radius: 1.47, color: "#fbbf24", speed:  0.52 },
] as const;

function OrbitalRings({ prefersReduced }: { prefersReduced: boolean }) {
  const innerRefs = useRef<(THREE.Object3D | null)[]>([]);

  const geoms = useMemo(() => RING_DEFS.map(({ radius }) => {
    const N = 45;
    const pos = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      const a = (i / N) * Math.PI * 2;
      pos[i * 3]     = radius * Math.cos(a);
      pos[i * 3 + 1] = 0;
      pos[i * 3 + 2] = radius * Math.sin(a);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return g;
  }), []);

  useEffect(() => () => geoms.forEach(g => g.dispose()), [geoms]);

  useFrame(({ clock }) => {
    if (prefersReduced) return;
    const t = clock.getElapsedTime();
    RING_DEFS.forEach(({ speed }, i) => {
      const r = innerRefs.current[i];
      if (r) r.rotation.y = t * speed;
    });
  });

  return (
    <group>
      {RING_DEFS.map(({ tilt, axisZ, color }, i) => (
        <group key={i} rotation={[tilt, 0, axisZ]}>
          <points
            ref={(el) => { innerRefs.current[i] = el; }}
            geometry={geoms[i]}
          >
            <pointsMaterial
              color={color}
              size={0.028}
              transparent
              opacity={0.82}
              sizeAttenuation
              depthWrite={false}
              blending={THREE.AdditiveBlending}
            />
          </points>
        </group>
      ))}
    </group>
  );
}

/* ─── Video Core — texture plane inside sphere ──────────────────────────────── */
function VideoCore({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) {
  const planeRef = useRef<THREE.Mesh>(null);
  const [tex, setTex] = useState<THREE.VideoTexture | null>(null);
  const sp = useRef(0);

  useEffect(() => {
    const vid = document.createElement("video");
    vid.src         = "/hero/orb-feed.mp4";
    vid.loop        = true;
    vid.muted       = true;
    vid.playsInline = true;
    vid.autoplay    = true;
    vid.crossOrigin = "anonymous";

    const t = new THREE.VideoTexture(vid);
    t.colorSpace = THREE.SRGBColorSpace;
    t.minFilter  = THREE.LinearFilter;
    t.magFilter  = THREE.LinearFilter;

    const onCanPlay  = () => setTex(t);
    const onPause    = () => vid.play().catch(() => {});
    const onVisible  = () => {
      if (document.visibilityState === "visible") vid.play().catch(() => {});
    };

    vid.addEventListener("canplay", onCanPlay);
    vid.addEventListener("pause",   onPause);
    document.addEventListener("visibilitychange", onVisible);
    vid.play().catch(() => {});

    return () => {
      vid.removeEventListener("canplay", onCanPlay);
      vid.removeEventListener("pause",   onPause);
      document.removeEventListener("visibilitychange", onVisible);
      vid.pause();
      vid.src = "";
      t.dispose();
    };
  }, []);

  useFrame(() => {
    sp.current += (scrollProgress.current - sp.current) * 0.06;
    const ref = planeRef.current;
    if (!ref) return;
    ref.rotation.y = sp.current * 0.35;
    ref.rotation.x = sp.current * 0.10;
    ref.position.z = 0.01 + sp.current * 0.08;
    (ref.material as THREE.MeshBasicMaterial).opacity =
      tex ? Math.max(0.5, 0.95 - sp.current * 0.45) : 0;
  });

  return (
    <mesh ref={planeRef} position={[0, 0, 0.01]}>
      <planeGeometry args={[1.32, 1.32]} />
      <meshBasicMaterial
        map={tex ?? undefined}
        transparent
        opacity={tex ? 0.95 : 0}
        depthWrite={false}
        toneMapped={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

/* ─── Scene ─────────────────────────────────────────────────────────────────── */
function OrbScene({
  prefersReduced,
  scrollProgress,
}: {
  prefersReduced: boolean;
  scrollProgress: React.MutableRefObject<number>;
}) {
  const groupRef  = useRef<THREE.Group>(null);
  const mouse     = useRef({ x: 0, y: 0 });
  const sm        = useRef({ x: 0, y: 0 });
  const smScroll  = useRef(0);

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      mouse.current.x =  (e.clientX / window.innerWidth  - 0.5) * 2;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, []);

  useFrame(({ clock }, delta) => {
    const t = clock.getElapsedTime();
    sm.current.x     += (mouse.current.x - sm.current.x) * 0.04;
    sm.current.y     += (mouse.current.y - sm.current.y) * 0.04;
    smScroll.current += (scrollProgress.current - smScroll.current) * 0.06;

    const sp = smScroll.current;
    const entryT = Math.min(1, Math.max(0, (t - 0.4) / 1.8));
    const entryS = 0.75 + 0.25 * (1 - Math.pow(1 - entryT, 3));

    if (groupRef.current) {
      groupRef.current.scale.setScalar(entryS);
      if (!prefersReduced) {
        groupRef.current.rotation.y    += 0.022 * delta;
        groupRef.current.position.y    = Math.sin(t * 0.6) * 0.03 * (1 - sp);
        groupRef.current.rotation.x    += (sm.current.y * 0.10 - groupRef.current.rotation.x) * 0.06;
        groupRef.current.rotation.z    += (sm.current.x * 0.05 - groupRef.current.rotation.z) * 0.06;
      }
    }
  });

  return (
    <>
      <ambientLight intensity={0.15} />
      <pointLight position={[-2.5, -1, -2]} color="#fb923c" intensity={4.0} />
      <pointLight position={[2,    3,   2]} color="#fff8f0" intensity={0.8} />

      <group ref={groupRef}>
        {/* Outer translucent glass shell */}
        <mesh>
          <sphereGeometry args={[1.02, 64, 64]} />
          <meshPhysicalMaterial
            color="#fff3e0"
            roughness={0.05}
            metalness={0.0}
            clearcoat={1.0}
            clearcoatRoughness={0.06}
            transparent
            opacity={0.12}
            depthWrite={false}
          />
        </mesh>

        {/* Organic shader sphere — Fresnel iridescence */}
        <ShaderOrb />

        {/* Inner warm emissive core */}
        <mesh>
          <sphereGeometry args={[0.68, 48, 48]} />
          <meshStandardMaterial
            color="#431407"
            emissive="#ea580c"
            emissiveIntensity={1.1}
            transparent
            opacity={0.5}
            depthWrite={false}
            side={THREE.BackSide}
          />
        </mesh>

        {/* Video texture */}
        <VideoCore scrollProgress={scrollProgress} />

        {/* Neural network graph */}
        <NeuralNet prefersReduced={prefersReduced} />

        {/* Orbital energy rings */}
        <OrbitalRings prefersReduced={prefersReduced} />
      </group>

      {/* Luminous bloom — makes emissive elements truly glow */}
      <EffectComposer>
        <Bloom
          luminanceThreshold={0.15}
          luminanceSmoothing={0.9}
          intensity={1.6}
          mipmapBlur
        />
      </EffectComposer>
    </>
  );
}

/* ─── Export ─────────────────────────────────────────────────────────────────── */
export default function HeroOrb({
  prefersReduced = false,
  scrollProgress,
}: {
  prefersReduced?: boolean;
  scrollProgress: React.MutableRefObject<number>;
}) {
  return (
    <div className="w-full h-full" aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 3.6] as [number, number, number], fov: 40 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <OrbScene prefersReduced={prefersReduced} scrollProgress={scrollProgress} />
        </Suspense>
      </Canvas>
    </div>
  );
}

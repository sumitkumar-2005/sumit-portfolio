import { useRef, useEffect, useState, useCallback } from 'react';

interface Hero3DProps {
  className?: string;
}

export default function Hero3D({ className }: Hero3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const animationIdRef = useRef<number | null>(null);
  const isCleanedUp = useRef(false);

  const stopAnimation = useCallback(() => {
    if (animationIdRef.current !== null) {
      cancelAnimationFrame(animationIdRef.current);
      animationIdRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!mountRef.current) return;
    
    let renderer: any = null;
    let geometry: any = null;
    let material: any = null;
    const ringGeometries: any[] = [];
    const ringMaterials: any[] = [];
    let cleanupCalled = false;
    
    const initThree = async () => {
      if (isCleanedUp.current) return;
      
      try {
        const THREE = await import('three');
        
        if (isCleanedUp.current || !mountRef.current) return;
        
        const container = mountRef.current;
        const width = container.clientWidth;
        const height = container.clientHeight;

        if (width === 0 || height === 0) {
          setHasError(true);
          return;
        }

        const scene = new THREE.Scene();
        
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.z = 30;

        try {
          renderer = new THREE.WebGLRenderer({ 
            antialias: true, 
            alpha: true,
            powerPreference: 'high-performance',
            failIfMajorPerformanceCaveat: false
          });
        } catch (e) {
          setHasError(true);
          return;
        }
        
        if (!renderer || !renderer.domElement) {
          setHasError(true);
          return;
        }
        
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(0x000000, 0);
        container.appendChild(renderer.domElement);

        const particleCount = 2000;
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const sizes = new Float32Array(particleCount);

        const neonPink = new THREE.Color(0xff00c8);
        const neonCyan = new THREE.Color(0x00e5ff);
        const neonLime = new THREE.Color(0xa8ff00);
        const colorOptions = [neonPink, neonCyan, neonLime];

        for (let i = 0; i < particleCount; i++) {
          const i3 = i * 3;
          const radius = Math.random() * 40 + 10;
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.acos((Math.random() * 2) - 1);
          
          positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
          positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
          positions[i3 + 2] = radius * Math.cos(phi);

          const color = colorOptions[Math.floor(Math.random() * colorOptions.length)];
          colors[i3] = color.r;
          colors[i3 + 1] = color.g;
          colors[i3 + 2] = color.b;

          sizes[i] = Math.random() * 2 + 0.5;
        }

        geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        const vertexShader = `
          attribute float size;
          varying vec3 vColor;
          void main() {
            vColor = color;
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = size * (300.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `;

        const fragmentShader = `
          varying vec3 vColor;
          void main() {
            float dist = length(gl_PointCoord - vec2(0.5));
            if (dist > 0.5) discard;
            float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
            gl_FragColor = vec4(vColor, alpha * 0.8);
          }
        `;

        material = new THREE.ShaderMaterial({
          vertexShader,
          fragmentShader,
          transparent: true,
          vertexColors: true,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        });

        const particles = new THREE.Points(geometry, material);
        scene.add(particles);

        const ringCount = 3;
        const rings: any[] = [];
        const ringColors = [0xff00c8, 0x00e5ff, 0xa8ff00];
        
        for (let r = 0; r < ringCount; r++) {
          const ringGeometry = new THREE.BufferGeometry();
          const ringPoints: number[] = [];
          const segments = 128;
          const ringRadius = 15 + r * 8;
          
          for (let i = 0; i <= segments; i++) {
            const angle = (i / segments) * Math.PI * 2;
            ringPoints.push(
              Math.cos(angle) * ringRadius,
              Math.sin(angle) * ringRadius,
              0
            );
          }
          
          ringGeometry.setAttribute('position', new THREE.Float32BufferAttribute(ringPoints, 3));
          ringGeometries.push(ringGeometry);
          
          const ringMaterial = new THREE.LineBasicMaterial({
            color: ringColors[r],
            transparent: true,
            opacity: 0.3,
            linewidth: 1,
          });
          ringMaterials.push(ringMaterial);
          
          const ring = new THREE.Line(ringGeometry, ringMaterial);
          ring.rotation.x = Math.PI * 0.3 + r * 0.2;
          ring.rotation.y = r * 0.5;
          scene.add(ring);
          rings.push(ring);
        }

        const mouse = { x: 0, y: 0 };
        const targetRotation = { x: 0, y: 0 };

        const handleMouseMove = (event: MouseEvent) => {
          if (isCleanedUp.current) return;
          mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
          mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        };

        const handleTouchMove = (event: TouchEvent) => {
          if (isCleanedUp.current) return;
          if (event.touches.length > 0) {
            mouse.x = (event.touches[0].clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.touches[0].clientY / window.innerHeight) * 2 + 1;
          }
        };

        const handleResize = () => {
          if (isCleanedUp.current || !container || !renderer) return;
          const newWidth = container.clientWidth;
          const newHeight = container.clientHeight;
          if (newWidth === 0 || newHeight === 0) return;
          camera.aspect = newWidth / newHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(newWidth, newHeight);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('touchmove', handleTouchMove, { passive: true });
        window.addEventListener('resize', handleResize);

        const clock = new THREE.Clock();
        const originalPositions = positions.slice();

        const animate = () => {
          if (isCleanedUp.current || !renderer) return;
          
          animationIdRef.current = requestAnimationFrame(animate);
          const elapsed = clock.getElapsedTime();

          targetRotation.x = mouse.y * 0.3;
          targetRotation.y = mouse.x * 0.3;

          particles.rotation.x += (targetRotation.x - particles.rotation.x) * 0.02;
          particles.rotation.y += (targetRotation.y - particles.rotation.y) * 0.02;
          particles.rotation.z = elapsed * 0.05;

          rings.forEach((ring, i) => {
            ring.rotation.z = elapsed * 0.1 * (i % 2 === 0 ? 1 : -1);
            ring.rotation.x += (targetRotation.x * 0.5 - ring.rotation.x) * 0.01;
            ring.rotation.y += (targetRotation.y * 0.5 - ring.rotation.y) * 0.01;
          });

          const posAttr = geometry.attributes.position;
          
          for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            const x = originalPositions[i3];
            const y = originalPositions[i3 + 1];
            const z = originalPositions[i3 + 2];
            
            const wave = Math.sin(elapsed + i * 0.01) * 0.5;
            posAttr.setXYZ(i, x + wave, y + wave * 0.5, z);
          }
          posAttr.needsUpdate = true;

          renderer.render(scene, camera);
        };

        animate();
        setIsLoaded(true);

        return () => {
          if (cleanupCalled) return;
          cleanupCalled = true;
          isCleanedUp.current = true;
          
          stopAnimation();
          
          window.removeEventListener('mousemove', handleMouseMove);
          window.removeEventListener('touchmove', handleTouchMove);
          window.removeEventListener('resize', handleResize);
          
          scene.remove(particles);
          rings.forEach(ring => scene.remove(ring));
          
          if (geometry) geometry.dispose();
          if (material) material.dispose();
          
          ringGeometries.forEach(geom => geom && geom.dispose());
          ringMaterials.forEach(mat => mat && mat.dispose());
          
          if (renderer) {
            renderer.renderLists.dispose();
            renderer.dispose();
            
            try {
              const gl = renderer.getContext();
              if (gl) {
                const ext = gl.getExtension('WEBGL_lose_context');
                if (ext) ext.loseContext();
              }
            } catch (e) {
              // Ignore context loss errors
            }
            
            if (container && container.contains(renderer.domElement)) {
              container.removeChild(renderer.domElement);
            }
          }
        };
      } catch (e) {
        console.warn('Hero3D initialization failed:', e);
        setHasError(true);
        return undefined;
      }
    };

    isCleanedUp.current = false;
    let cleanup: (() => void) | undefined;
    
    initThree().then(cleanupFn => {
      cleanup = cleanupFn;
    });

    return () => {
      isCleanedUp.current = true;
      stopAnimation();
      if (cleanup) cleanup();
    };
  }, [stopAnimation]);

  if (hasError) {
    return (
      <div 
        className={`w-full h-full flex items-center justify-center ${className || ''}`}
        data-testid="hero-3d-fallback"
        aria-hidden="true"
      >
        <div className="relative w-64 h-64">
          <div className="absolute inset-0 rounded-full border-2 border-neon-pink/30 animate-pulse" />
          <div className="absolute inset-4 rounded-full border-2 border-neon-cyan/30 animate-pulse" style={{ animationDelay: '200ms' }} />
          <div className="absolute inset-8 rounded-full border-2 border-neon-lime/30 animate-pulse" style={{ animationDelay: '400ms' }} />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4 h-4 bg-neon-cyan rounded-full animate-ping" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={mountRef} 
      className={`w-full h-full ${className || ''}`}
      style={{ 
        opacity: isLoaded ? 1 : 0,
        transition: 'opacity 1s ease-out'
      }}
      data-testid="hero-3d-canvas"
      aria-hidden="true"
    />
  );
}

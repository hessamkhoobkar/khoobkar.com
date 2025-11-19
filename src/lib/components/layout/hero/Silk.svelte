<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import {
		Scene,
		WebGLRenderer,
		OrthographicCamera,
		PlaneGeometry,
		Mesh,
		ShaderMaterial,
		Color,
		Vector3
	} from 'three';

	export let speed: number = 5;
	export let scale: number = 1;
	export let color: string = '#7B7481';
	export let noiseIntensity: number = 1.5;
	export let rotation: number = 0;

	type NormalizedRGB = [number, number, number];

	const hexToNormalizedRGB = (hex: string): NormalizedRGB => {
		const clean = hex.replace('#', '');
		const r = parseInt(clean.slice(0, 2), 16) / 255;
		const g = parseInt(clean.slice(2, 4), 16) / 255;
		const b = parseInt(clean.slice(4, 6), 16) / 255;
		return [r, g, b];
	};

	const vertexShader = `
varying vec2 vUv;
varying vec3 vPosition;

void main() {
  vPosition = position;
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

	const fragmentShader = `
varying vec2 vUv;
varying vec3 vPosition;

uniform float uTime;
uniform vec3  uColor;
uniform float uSpeed;
uniform float uScale;
uniform float uRotation;
uniform float uNoiseIntensity;

const float e = 2.71828182845904523536;

float noise(vec2 texCoord) {
  float G = e;
  vec2  r = (G * sin(G * texCoord));
  return fract(r.x * r.y * (1.0 + texCoord.x));
}

vec2 rotateUvs(vec2 uv, float angle) {
  float c = cos(angle);
  float s = sin(angle);
  mat2  rot = mat2(c, -s, s, c);
  return rot * uv;
}

void main() {
  float rnd        = noise(gl_FragCoord.xy);
  vec2  uv         = rotateUvs(vUv * uScale, uRotation);
  vec2  tex        = uv * uScale;
  float tOffset    = uSpeed * uTime;

  tex.y += 0.03 * sin(8.0 * tex.x - tOffset);

  float pattern = 0.6 +
                  0.4 * sin(5.0 * (tex.x + tex.y +
                                   cos(3.0 * tex.x + 5.0 * tex.y) +
                                   0.02 * tOffset) +
                           sin(20.0 * (tex.x + tex.y - 0.1 * tOffset)));

  vec4 col = vec4(uColor, 1.0) * vec4(pattern) - rnd / 15.0 * uNoiseIntensity;
  col.a = 1.0;
  gl_FragColor = col;
}
`;

	let container: HTMLDivElement;
	let renderer: WebGLRenderer | null = null;
	let scene: Scene | null = null;
	let camera: OrthographicCamera | null = null;
	let mesh: Mesh | null = null;
	let animationFrameId: number | null = null;
	let lastTime: number | null = null;

	function getSize() {
		if (!container || typeof window === 'undefined') {
			return { width: 1, height: 1 };
		}
		const rect = container.getBoundingClientRect();
		return { width: Math.max(1, rect.width), height: Math.max(1, rect.height) };
	}

	function init() {
		if (!container || typeof window === 'undefined') return;
		const { width, height } = getSize();

		scene = new Scene();

		const halfW = width / 2;
		const halfH = height / 2;
		camera = new OrthographicCamera(-halfW, halfW, halfH, -halfH, 0.1, 10);
		camera.position.set(0, 0, 1);
		camera.lookAt(new Vector3(0, 0, 0));

		renderer = new WebGLRenderer({ antialias: true, alpha: true });
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		renderer.setSize(width, height, false);

		container.innerHTML = '';
		container.appendChild(renderer.domElement);

		const geometry = new PlaneGeometry(1, 1, 1, 1);
		const uniforms = {
			uSpeed: { value: speed },
			uScale: { value: scale },
			uNoiseIntensity: { value: noiseIntensity },
			uColor: { value: new Color(...hexToNormalizedRGB(color)) },
			uRotation: { value: rotation },
			uTime: { value: 0 }
		};

		const material = new ShaderMaterial({
			uniforms,
			vertexShader,
			fragmentShader,
			transparent: true
		});

		mesh = new Mesh(geometry, material);
		mesh.scale.set(width, height, 1);
		scene.add(mesh);
	}

	function resize() {
		if (!renderer || !camera || !mesh || !container || typeof window === 'undefined') return;
		const { width, height } = getSize();
		const halfW = width / 2;
		const halfH = height / 2;
		camera.left = -halfW;
		camera.right = halfW;
		camera.top = halfH;
		camera.bottom = -halfH;
		camera.updateProjectionMatrix();
		renderer.setSize(width, height, false);
		mesh.scale.set(width, height, 1);
	}

	function updateUniforms() {
		if (!mesh) return;
		const material = mesh.material as ShaderMaterial;
		(material.uniforms.uSpeed.value as number) = speed;
		(material.uniforms.uScale.value as number) = scale;
		(material.uniforms.uNoiseIntensity.value as number) = noiseIntensity;
		(material.uniforms.uColor.value as Color) = new Color(...hexToNormalizedRGB(color));
		(material.uniforms.uRotation.value as number) = rotation;
	}

	function animate(time: number) {
		if (!renderer || !scene || !camera || !mesh) return;
		const material = mesh.material as ShaderMaterial;
		const previous = lastTime;
		lastTime = time;
		const deltaSeconds = previous === null ? 0 : (time - previous) / 1000;
		(material.uniforms.uTime.value as number) =
			(material.uniforms.uTime.value as number) + 0.1 * deltaSeconds;
		renderer.render(scene, camera);
		animationFrameId = requestAnimationFrame(animate);
	}

	let resizeHandler: (() => void) | null = null;

	onMount(() => {
		init();
		updateUniforms();
		resize();
		animationFrameId = requestAnimationFrame(animate);
		resizeHandler = () => resize();
		window.addEventListener('resize', resizeHandler);
	});

	// React to prop changes explicitly (Svelte 5): reference props in the reactive statement
	$: (speed, scale, noiseIntensity, color, rotation, updateUniforms());

	onDestroy(() => {
		// Clean up event listener
		if (resizeHandler) {
			window.removeEventListener('resize', resizeHandler);
			resizeHandler = null;
		}

		// Clean up animation frame
		if (animationFrameId !== null) {
			cancelAnimationFrame(animationFrameId);
			animationFrameId = null;
		}

		// Clean up Three.js resources
		if (scene && mesh) {
			scene.remove(mesh);
			mesh.geometry.dispose();
			(mesh.material as ShaderMaterial).dispose();
		}
		if (renderer) {
			renderer.dispose();
		}

		// Nullify references
		scene = null;
		camera = null;
		mesh = null;
		renderer = null;
	});
</script>

<div bind:this={container} style="width: 100%; height: 100%;"></div>

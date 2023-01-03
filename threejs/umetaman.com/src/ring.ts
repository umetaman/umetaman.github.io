import * as THREE from "three";

const MAX_RESOLUTION_RING = 64;
const MIN_RESOLUTION_RING = 32;

export function createRing(innerRadius: number, outerRadius: number, thetaLength: number, baseColor: THREE.Color): THREE.Mesh {
    const t = THREE.MathUtils.clamp(outerRadius / 50, 0, 1);
    const resolution = THREE.MathUtils.lerp(MIN_RESOLUTION_RING, MAX_RESOLUTION_RING, t);
    const geometry = new THREE.RingGeometry(innerRadius, outerRadius, Math.floor(resolution), 1, 0, thetaLength);   
    const material = new THREE.MeshBasicMaterial({
        color: baseColor,
        side: THREE.DoubleSide
    });
    const mesh = new THREE.Mesh(geometry, material);
    return mesh;
}
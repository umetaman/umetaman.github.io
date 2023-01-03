import './style.css';
import * as THREE from "three";
import { createRing } from './ring';

const app = document.querySelector<HTMLDivElement>("#app");

if(!app){
  throw new Error("Failed to init.");
}

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, app.offsetWidth / app.offsetHeight, 0.1, 1000 );
camera.position.set(0, 1, 50);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setClearColor(0xffffff, 1.0);
renderer.setPixelRatio(window.devicePixelRatio);
app?.appendChild(renderer.domElement);

// ====

const rings: THREE.Mesh[] = [];

for (let i = 0; i < 15; i++) {
  const outer = 5 + Math.random() * 50;
  const inner = Math.max(4, outer - Math.random() * 10);
  const color = new THREE.Color();
  color.setHSL(1, 1, Math.random() * 0.5);
  
  const ring = createRing(inner, outer, 4 + Math.random() * 2.28, color);
  ring.rotation.set(90, 0, Math.random() * 360);
  ring.position.set(0, -25 + Math.random() * 50, 0)
  scene.add(ring);
  rings.push(ring);
}

window.addEventListener("message", (event) => {
  if(event.data.name === "y") {
    const newY: number = event.data.value as number;
    camera.position.setY(newY);
  }
})

renderer.setAnimationLoop(() => {
  if(app) {
    renderer.setSize(app.offsetWidth, app.offsetHeight);
    camera.aspect = app.offsetWidth / app.offsetHeight;
    camera.updateProjectionMatrix();
  }

  for(let i = 0; i < rings.length; i++) {
    const ring = rings[i];
    ring.rotateZ(0.01);
  }
  renderer.render(scene, camera);
})
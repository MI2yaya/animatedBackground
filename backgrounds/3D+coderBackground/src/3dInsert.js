import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

// Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75, window.innerWidth / window.innerHeight, 0.1, 1000
);
camera.position.z = 10;

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0); // transparent background
document.getElementById('three-container').appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

// Load font and create text
const loader = new FontLoader();
loader.load('/fonts/Nevera_Regular.typeface.json', (font) => {
  const geometry = new TextGeometry('M.P', {
    font: font,
    size: 2,         
    depth:1,       
    curveSegments: 12,

  });

  const material = new THREE.MeshBasicMaterial({ 
    color: 0x00ff00,
    polygonOffset: true,
    polygonOffsetFactor: 1, 
    polygonOffsetUnits: 1
  });

  const textMesh = new THREE.Mesh(geometry, material);
  geometry.center()
  scene.add(textMesh);

  let val = 0.001

  // Animate
  function animate() {
    requestAnimationFrame(animate);
    
    textMesh.rotation.y += val;
    textMesh.rotation.x += val;
    if (Math.abs(textMesh.rotation.y)>.8){val=-val}
    renderer.render(scene, camera);
  }
  animate();
});

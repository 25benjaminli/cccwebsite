import '../css/style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GreaterStencilFunc } from 'three';

const arr = [];
const arrs = []; // speed of turning

function addAdi() {
  const adiTexture = new THREE.TextureLoader().load('../adi.jpg');

  const adi = new THREE.Mesh(new THREE.BoxGeometry(10, 10, 10), new THREE.MeshBasicMaterial({ map: adiTexture }));

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  
  adi.position.set(x, y, z);
  scene.add(adi);
  arr.push(adi);
  arrs.add([THREE.MathUtils.randFloat(0.005, 0.011), THREE.MathUtils.randFloat(0.005, 0.011), THREE.MathUtils.randFloat(0.005, 0.011)]);

}


// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(0);
// camera.position.setX(-100);


renderer.render(scene, camera);

// Torus

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
const torus = new THREE.Mesh(geometry, material);
torus.position.x = 20;
torus.position.y = 5;
torus.position.z = 20;
scene.add(torus);

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Helpers

// const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50);
const axesHelper = new THREE.AxesHelper( 10 ); // default: x = red, y = green, z = blue
// axesHelper.setColors( 0xDA4442, 0x69CD5B, 0x695BFF) // x is red ish, y is green ish, z is blue ish 
scene.add(gridHelper, axesHelper)


const controls = new OrbitControls(camera, renderer.domElement);



function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xFFFF00 });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

// Background

const spaceTexture = new THREE.TextureLoader().load('../space.jpg');
scene.background = spaceTexture;

// Avatar

const adiTexture = new THREE.TextureLoader().load('../adi.jpg');

const adi = new THREE.Mesh(new THREE.BoxGeometry(10, 10, 10), new THREE.MeshBasicMaterial({ map: adiTexture }));

scene.add(adi);


const thonkImg = new THREE.TextureLoader().load('../thonkcloud.png')
const thonkCloud = new THREE.Mesh(new THREE.BoxGeometry(15, 10, 10), new THREE.MeshBasicMaterial({map: thonkImg}));

scene.add(thonkCloud)
// earth

const earthTexture = new THREE.TextureLoader().load('../earth.jpeg');
// const normalTexture = new THREE.TextureLoader().load('normal.jpg');

const earth = new THREE.Mesh(
  new THREE.SphereGeometry(6, 32, 32),
  new THREE.MeshStandardMaterial({
    map: earthTexture,
    // normalMap: normalTexture,
  })
);

scene.add(earth);

earth.position.z = 30;
earth.position.setX(-10);

adi.position.z = -10;
adi.position.x = 2;

thonkCloud.position.z = 60;
thonkCloud.position.x = -35;


// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  earth.rotation.x += 0.03;
  earth.rotation.y += 0.03;
  earth.rotation.z += 0.03;

  adi.rotation.y += 0.01;
  adi.rotation.z += 0.01;

  camera.position.z = t * -0.06;
  camera.position.x = t * -0.001;
  camera.rotation.y = t * -0.001;

  // thonkCloud.position.z = t * -0.03;
  // thonkCloud.position.x = t * -0.01;
  // thonkCloud.rotation.y = t * -0.03;
  
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop


var bool = false;
function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;
    
  adi.rotation.y += 0.01;
//   adi.rotation.z += 0.01;

  earth.rotation.y += 0.005;

  thonkCloud.rotation.x += 0.1;

  // controls.update();

  // arr.forEach((adi, i) => {
  //   adi.rotation.x += arrs[i][0];
  //   adi.rotation.y += arrs[i][1];
  //   adi.rotation.z += arrs[i][2]; 
  // });

  arr.forEach((adi) => {
    adi.rotation.y += 0.01;
  });

  renderer.render(scene, camera);
}

animate();


var button = document.getElementById("add-adi");

button.addEventListener('click', addAdi);

const velX = 0.5;
const velY = 0.3;
const velZ = 0.5;

document.addEventListener('keydown', event => {
  console.log(event);
  switch(event.code) {
    case "KeyW":
      camera.position.z -= velZ;
      console.log("w");
      break;
    case "KeyA":
      camera.position.x -= velX;
      console.log("a");
      break;
    case "KeyS":
      camera.position.z += velZ;
      console.log("s");
      break;
    case "KeyD":
      camera.position.x += velX;
      console.log("d");
      break;
    case "Space":
      camera.position.y += velY;
      break;
  }
})
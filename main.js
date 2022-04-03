// import './style.css';
// import * as THREE from 'three';
// import { GreaterStencilFunc } from 'three';
// import { OrbitControls } from "./orbitcontrols.js";

const arr = [];
const arrs = []; // speed of turning

const file_paths = [
  'images/adi.jpg',
  'images/thonkcloud.png',
  'images/depression.jpg',
  'images/moderate_happiness.jpg',
  'images/more_happiness.jpg',
  'images/oneaminsanity.jpg'
];


window.addEventListener('keydown', function(e) {
  if(e.keyCode == 32 && e.target == document.body) {
    e.preventDefault();
  }
});

function addAdi() {
  const adiTexture = new THREE.TextureLoader().load('adi.jpg');

  const adi = new THREE.Mesh(new THREE.BoxGeometry(10, 10, 10), new THREE.MeshBasicMaterial({ map: adiTexture }));

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  
  adi.position.set(x, y, z);
  scene.add(adi);
  arr.push(adi);
  arrs.add([THREE.MathUtils.randFloat(0.005, 0.011), THREE.MathUtils.randFloat(0.005, 0.011), THREE.MathUtils.randFloat(0.005, 0.011)]);

}

function addAdiPos(x, y, z, radian) {
  const adiTexture = new THREE.TextureLoader().load('thonkcloud.png');

  const adi = new THREE.Mesh(new THREE.BoxGeometry(10, 10, 10), new THREE.MeshBasicMaterial({ map: adiTexture }));

  const a = [x, y, z];
  
  adi.position.set(a[0], a[1], a[2]);
  
  setTimeout(() => {
    adi.rotation.y = -1 * radian;
  }, 1000);
  scene.add(adi);
}

function addPicPos(x, y, z, radian, url) {
  const texture = new THREE.TextureLoader().load(url);

  const img = new THREE.Mesh(new THREE.BoxGeometry(10, 10, 10), new THREE.MeshBasicMaterial({ map: texture }));

  const a = [x, y, z];
  
  img.position.set(a[0], a[1], a[2]);
  
  img.rotation.y = -1 * radian; // need to turn opposite the viewer's perspective

  scene.add(img);
}


// setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

// const helper = new THREE.CameraHelper( camera );
// scene.add( helper );

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);



renderer.render(scene, camera);

// // Torus

// const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
// const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
// const torus = new THREE.Mesh(geometry, material);
// torus.position.x = 20;
// torus.position.y = 5;
// torus.position.z = 20;
// scene.add(torus);

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


// const controls = new OrbitControls(camera, renderer.domElement);

function drawPath(prevx, prevy, prevz) {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0x00FF00 });
  const star = new THREE.Mesh(geometry, material);

  star.position.set(prevx, prevy, prevz);
  scene.add(star);
}


function drawPath2d(prevx, prevz) {
  const geometry = new THREE.SphereGeometry(2, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0x1F51FF });
  const star = new THREE.Mesh(geometry, material);

  star.position.set(prevx, 20, prevz);
  scene.add(star);
}



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

const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;

// Avatar

// const adiTexture = new THREE.TextureLoader().load('adi.jpg');

// const adi = new THREE.Mesh(new THREE.BoxGeometry(10, 10, 10), new THREE.MeshBasicMaterial({ map: adiTexture }));

// scene.add(adi);


// const thonkImg = new THREE.TextureLoader().load('thonkcloud.png')
// const thonkCloud = new THREE.Mesh(new THREE.BoxGeometry(15, 10, 10), new THREE.MeshBasicMaterial({map: thonkImg}));

// scene.add(thonkCloud)
// earth

const earthTexture = new THREE.TextureLoader().load('earth.jpeg');
// const normalTexture = new THREE.TextureLoader().load('normal.jpg');

const earth = new THREE.Mesh(
  new THREE.SphereGeometry(6, 32, 32),
  new THREE.MeshStandardMaterial({
    map: earthTexture,
    // normalMap: normalTexture,
  })
);

var max_count = file_paths.length;
function generateCircle(width, angle = 0, curr_count = 0) {
  console.log(curr_count);
  if (curr_count >= max_count) {
    return;
  }
  console.log("angle: " + angle);
  let x, z, r = width/2;
  x = r * Math.cos(angle * Math.PI/180);
  z = r * Math.sin(angle * Math.PI/180);
  console.log(`x: ${x}, z: ${z}`);
  addPicPos(x, 0, z, angle * Math.PI/180, file_paths[curr_count]);

  
  // drawPath2d(x, y);

  // angle * Math.PI/180 <-- this is the degree in which the camera should be facing.
  // angle to radians
  // camera.rotation.y = angle * Math.PI/180;

  if (angle + 30 < 360) {
    setTimeout(() => {
      generateCircle(width, angle + 30, curr_count + 1);
    }, 500);
  }
}

// scene.add(earth);



earth.position.x = -10;
earth.position.z = 25;


// thonkCloud.position.x = -20;
// thonkCloud.position.z = 65;



// camera.position.setZ(400);

// camera.rotation.x = 180;


generateCircle(100);
// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  // earth.rotation.x += 0.03;
  // earth.rotation.y += 0.03;
  // earth.rotation.z += 0.03;



  console.log("x: " + camera.position.x);
  console.log("y: " + camera.position.y);
  console.log("z: " + camera.position.z);
  // console.log("yrot: " + (camera.rotation.y * 360 / Math.PI));
  // drawPath(camera.position.x, camera.position.y, camera.position.z);
  console.log("camera rot: " + camera.rotation.y);
  // camera.position.z = t * -0.05;
  // camera.position.x = t * -0.002;
  camera.rotation.y = t * -0.0011; // rotation

  
  // thonkCloud.position.z = t * -0.03;
  // thonkCloud.position.x = t * -0.01;
  // thonkCloud.rotation.y = t * -0.03;
  
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

// camera.rotation.x -= 1.6;
// camera.rotation.z -= 2;
// camera.position.y = 75;
camera.rotation.y = 0;

var bool = false;

function animate() {
  requestAnimationFrame(animate);

  // torus.rotation.x += 0.01;
  // torus.rotation.y += 0.005;
  // torus.rotation.z += 0.01;
    
  // adi.rotation.y += 0.01;
//   adi.rotation.z += 0.01;

  earth.rotation.y += 0.005;

  // thonkCloud.rotation.x += 0.1;

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

const velX = 1;
const velY = 0.6;
const velZ = 1;

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
    case "KeyR":
      camera.rotation.x -= 1.6;
      camera.rotation.z -= 2;
  }
})

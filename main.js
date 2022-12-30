import * as THREE from "three";
import './style.css'
import './resize'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
// const camera = new THREE.OrthographicCamera( innerWidth / - 2, innerWidth / 2, innerHeight / 2, innerHeight / - 2, 1, 1000 );
// scene.add( camera );

const renderer = new THREE.WebGLRenderer({  canvas: document.querySelector('#main')});
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
scene.background = new THREE.Color( 0xFFE8DC );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
// renderer.setClearColor(new THREE.Color('#21282a'),1);
// const light = new THREE.AmbientLight({color:0xfffff},5);
// scene.add(light);

// const geometry = new THREE.BoxGeometry( 1, 1, 1 );
// const material = new THREE.MeshStandardMaterial( { color: 0x00ff00 } );
// const cube = new THREE.Mesh( geometry, material );
// scene.add( cube );

const pointLight = new THREE.PointLight(0xbf40BF);
pointLight.position.set(5, -28.5,5);

const pointLight2 = new THREE.PointLight(0x00ffff);
pointLight2.position.set(5, 5, 5);

scene.add(pointLight,pointLight2);




// const crystalGeo = new THREE.OctahedronGeometry(2,1);
const crystalTex = new THREE.MeshBasicMaterial({  color: 0xffffff,
  reflectivity:1,
  transparent: true,
  opacity: 0.7,
}  );
// const crystalMesh = new THREE.Mesh(crystalGeo, crystalTex);
// crystalMesh.position.set(8,2,1);
// scene.add(crystalMesh);

const textureLoader = new THREE.TextureLoader();
const normalTexture = textureLoader.load('/normal-map.jpeg');
const texturedMaterial = new THREE.MeshStandardMaterial( {
  color: 0xffffff,
  metalness: 0.7,
  roughness: 0.2,
  normalMap: normalTexture,
  emissive: 0x9152cc,
} );
const bigSphereGeometry = new THREE.SphereGeometry(4, 64, 64);
const bigSphere = new THREE.Mesh( bigSphereGeometry, texturedMaterial );
scene.add( bigSphere );

const createMeshWithRandomPosition = (geometry, material) => {
  const mesh = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(()=> THREE.MathUtils.randFloatSpread(170));
  mesh.position.set(x, y, z);


  scene.add(mesh);
}

Array(100).fill().map(() => createMeshWithRandomPosition(new THREE.TorusGeometry( 2, 1, 16 ), texturedMaterial));
Array(100).fill().map(() => createMeshWithRandomPosition(new THREE.BoxGeometry( 2, 1, 16, 100 ), crystalTex));
Array(100).fill().map(() => createMeshWithRandomPosition(new THREE.TorusKnotGeometry( 2, 1, 16 ), texturedMaterial));

const geometry = new THREE.SphereGeometry( 100, 100, 100 );

const wireframe = new THREE.WireframeGeometry( geometry );

const line = new THREE.LineSegments( wireframe );
line.material.depthTest = false;
line.material.opacity = 0.25;
line.material.transparent = true;

scene.add( line );


// const anim = new THREE.AnimationAction(
  
// )



// const moveCamera = () => {
//   const t = document.body.getBoundingClientRect().top;
//   camera.position.z = t * 0.008 + 20;
//   camera.position.y = t * 0.008;
//   camera.rotation.x = t * 0.00095;
// }

// document.body.onscroll = moveCamera;

/* particle geometry for the background

const particleGeo = new THREE.BufferGeometry();
const particleCount = 50000;

const parArray = new Float32Array(particleCount * 3 );

for (let i=0; i<particleCount;i++){
  parArray[i] = (Math.random() - 0.5) * (Math.random() * 5);
}
particleGeo.setAttribute('position', new THREE.BufferAttribute(parArray,3));

const particleMat = new THREE.PointsMaterial(
  {
    size:0.5,
    transparent:true,
    color:"blue",
  }
)


const particleMesh = new THREE.Points(particleGeo, particleMat);
scene.add(particleMesh);

*/
document.addEventListener('mousemove', animateBackground);

  let mouseX = 0;
  let mouseY = 0; 

function animateBackground(event) {
    mouseX = event.clientX;
    mouseY = event.clientY;
  
}

camera.position.z = 20;

const clock = new THREE.Clock()

function animate() {
  requestAnimationFrame( animate );

  const elapsedTime = clock.getElapsedTime();
  bigSphere.rotation.x = -mouseY * (elapsedTime * 0.00008);
  bigSphere.rotation.y = -mouseX * (elapsedTime * 0.00008);


  bigSphere.rotation.x += 0.01;
  bigSphere.rotation.y += 0.01;

  renderer.render( scene, camera );
};

animate();
import { ACESFilmicToneMapping, BufferGeometry, DirectionalLight, DoubleSide, Float32BufferAttribute, Line, LineBasicMaterial, Mesh, MeshBasicMaterial, MeshStandardMaterial, PerspectiveCamera, PointLight, Points, PointsMaterial, RepeatWrapping, RingGeometry, SRGBColorSpace, Scene, SphereGeometry, TextureLoader, Vector3, WebGLRenderer } from "three/src/Three.js";
import {OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { planetMesh, planetModel, planets, planetDescription, PlanetData } from "./planet_data";
import gsap from 'gsap';

//const Sun = 'models/monkey.glb';
const scene = new Scene();
const image = 'models/sun.png';
const planetsArr: planetMesh[] = [];

const camera = new PerspectiveCamera(75,innerWidth/innerHeight,0.1,10000);
camera.position.set(0, 800, 3000);
const originalCameraPos = new Vector3(0,800,3000);
camera.lookAt(new Vector3(0, 0, 0));


const directionalLight = new DirectionalLight(0xffffff, Math.PI); // White light, full intensity
directionalLight.position.set(0, 0, 1000).normalize();
scene.add(directionalLight);

const directionalLight2 = new DirectionalLight(0xffffff, Math.PI); // White light, full intensity
directionalLight2.position.set(0, 1000, 0).normalize();
scene.add(directionalLight2);

const directionalLight3 = new DirectionalLight(0xffffff, Math.PI); // White light, full intensity
directionalLight3.position.set(0, -1000, 0).normalize();
scene.add(directionalLight3);


const pointLight = new PointLight(0xffffff, 5000);
pointLight.position.set(0, 0, 0);
scene.add(pointLight);

const renderer = new WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.outputColorSpace = SRGBColorSpace;
renderer.toneMapping = ACESFilmicToneMapping;
document.body.appendChild(renderer.domElement);


window.addEventListener('resize',()=>{
  renderer.setSize(innerWidth,innerHeight);
  camera.aspect = innerWidth/innerHeight;
  camera.updateProjectionMatrix(); // this function will help camera to change it's properties as per screen size
})

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true


const sunTexture = new TextureLoader().load(image);
sunTexture.colorSpace = SRGBColorSpace
const sunMaterial = new MeshBasicMaterial({map: sunTexture});
const sunGeo = new SphereGeometry(10,1000,1000);
const sun = new Mesh(sunGeo,sunMaterial);
sun.position.set(0,0,0);
scene.add(sun);

const slider = document.getElementById("slider");

function createCards(planets: PlanetData[]) {
  planets.forEach((planet) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.classList.add(planet.name.toLowerCase()+"-color");
    card.innerHTML = `
      <h2>${planet.name}</h2>
      <p>${planet.description}</p>
      <ul>
      <li><p>Rotation Speed : ${planet.rotation_speed}</p></li>
      <li><p>Revolution Speed : ${planet.revolution_days}</p></li>
      <li><p>Days to Revolve : ${planet.revolution_days}</p></li>
      <li><p>Hours in a Day : ${planet.rotation_hours}</p></li>
      <li><p>Distance from Sun : ${planet.distance_from_sun}</p></li>
      </ul>
      <button class="visit-btn">To Visit ${planet.name} click here</button>
      <button class="reset-btn"> Reset Camera </button>`;
      
    slider?.appendChild(card);
    
    const visitButton = card.querySelector(".visit-btn");
    if (visitButton) {
      visitButton.addEventListener("click", () => visitPlanet(planet.name));
    }

    const resetButton = card.querySelector(".reset-btn");
    if (resetButton) {
      resetButton.addEventListener("click", () => resetCamera());
    }
  });
}

createCards(planetDescription);


let currentIndex = 0;

function updateSlider() {
  const cards = document.querySelectorAll('.card');
  cards.forEach((card) => {
    (card as HTMLElement).style.transform = `translateX(${(-currentIndex) * 100}%)`;
  });
}

document.getElementById("prev-button")?.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + planetDescription.length) % planetDescription.length;
  updateSlider();
});

document.getElementById("next-button")?.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % planetDescription.length;
  updateSlider();
});

// Initialize slider
updateSlider();

planets.forEach((planet: planetModel) => {
  // creating the planets
  const planetGeo = new SphereGeometry(planet.radius,1000,1000);
  const planetTexture = new TextureLoader().load('models/'+planet.texture);
  planetTexture.colorSpace = SRGBColorSpace;
  const planetMaterial = new MeshStandardMaterial({map: planetTexture});
  const planet_mesh = new Mesh(planetGeo,planetMaterial);
  planet_mesh.name = planet.name;
  planet_mesh.scale.set(planet.scale,planet.scale,planet.scale);
  planet_mesh.position.set(planet.orbitRadius,0,0);
  scene.add(planet_mesh)

  // creating orbits for each planet
  const pathRadius = planet.orbitRadius;
  const pathSegments = 100;
  const pathGeo = new BufferGeometry().setFromPoints(
    new Array(pathSegments + 1).fill(0).map((_,i) => {
      const theta = (i / pathSegments) * Math.PI * 2;
      return new Vector3(pathRadius * Math.cos(theta) , 0 , pathRadius * Math.sin(theta));
    })
  );
  const pathMaterial = new LineBasicMaterial({color: 0xffffff, transparent: true, opacity: 0.5});
  const pathMesh = new Line(pathGeo, pathMaterial);
  scene.add(pathMesh);

    // creating label for each planet
    const planet_label = document.createElement('div');
    planet_label.style.position = 'absolute';
    planet_label.style.color = 'white';
    planet_label.style.padding = '2px 5px';
    planet_label.style.background = 'transparent';
    planet_label.style.borderRadius = '3px';
    planet_label.innerHTML = planet.name;
    planet_label.style.fontSize = '10px'
    document.body.appendChild(planet_label);

  if(planet.name == "Saturn"){
    const ringGeo = new RingGeometry(10,14, 128);
    const uv = ringGeo.attributes.uv.array as Float32Array;
    for(let i=0;i<uv.length;i += 2){
      const x = uv[i] - 0.5;
      const y = uv[i+1] - 0.5;
      const angle = Math.atan2(y,x);
      const radius = Math.sqrt(x*x + y*y);
      uv[i] = (angle/(2* Math.PI)) + 0.5;
      uv[i+1] = radius;
    }
    ringGeo.attributes.uv.needsUpdate = true;
    ringGeo.computeVertexNormals();
    const ringTexture = new TextureLoader().load('models/saturn_ring.png');
    ringTexture.wrapS = ringTexture.wrapT = RepeatWrapping
    ringTexture.repeat.set(1,1);
    const ringMat = new MeshStandardMaterial({map: ringTexture, side: DoubleSide, transparent: true});
    const ring = new Mesh(ringGeo,ringMat);
    ring.position.copy(planet_mesh.position);
    ring.rotation.x = Math.PI/2;
    scene.add(ring);
    planetsArr.push({
      planet: planet_mesh, 
      orbitRadius: planet.orbitRadius, 
      label: planet_label, 
      orbitOffset: planet.orbitOffset, 
      rotationValue: planet.rotationValue,
      satelite: ring, 
    });
  }else{
    planetsArr.push({planet: planet_mesh, orbitRadius: planet.orbitRadius, label: planet_label , orbitOffset: planet.orbitOffset, rotationValue: planet.rotationValue});
  }
});

let rotate_angle = 0;
function revolvePlanet(){
  rotate_angle += 0.00001;
  planetsArr.forEach((planetObj: planetMesh) =>{
    planetObj.planet.position.x = planetObj.orbitRadius * Math.cos(rotate_angle + planetObj.orbitOffset);
    planetObj.planet.position.z = planetObj.orbitRadius * Math.sin(rotate_angle + planetObj.orbitOffset);
    planetObj.planet.position.y = 0;
    planetObj.planet.rotation.y += planetObj.rotationValue

    if(planetObj.satelite){
      planetObj.satelite.position.copy(planetObj.planet.position);
      planetObj.satelite.rotation.y += 0.0003;
    }

    const planet_vector = new Vector3(planetObj.planet.position.x, planetObj.planet.position.y , planetObj.planet.position.z);
    planet_vector.project(camera);
  
    const label_x = (planet_vector.x * 0.5 + 0.5) * window.innerWidth;
    const label_y = (-planet_vector.y * 0.5+ 0.5 ) * window.innerHeight;
  
    planetObj.label.style.left = `${label_x}px`;
    planetObj.label.style.top = `${label_y - 20}px`;
  });  
}

const starGom = new BufferGeometry();
const pointMat = new PointsMaterial({color:0xFFFFFF});

const starVertices   = [];
for(let i=0; i< 4000 ;i++){
  const x = (Math.random() - 0.5)*10000;
  const y = (Math.random() - 0.5)*10000;
  const z = (Math.random() - 0.5)*10000;
  starVertices.push(x,y,z);
} 

starGom.setAttribute('position',new Float32BufferAttribute(starVertices,3));
const stars = new Points(starGom,pointMat);
scene.add(stars);

let followPlanet : Mesh | null;

function visitPlanet(planetName: string) {
  const visit_planet = planets.find((p) => p.name === planetName);
  if (!visit_planet) return;
  
  const planetMesh = planetsArr.find((obj) => obj.planet.name === planetName)?.planet;
  if (planetMesh) {
    followPlanet = planetMesh;
    // Smooth camera transition to the planet
    const planetPosition = planetMesh.position;
    const tragetPosition = new Vector3(planetPosition.x + 0.5, planetPosition.y + 0.25, planetPosition.z + 0.5);
    gsap.to(camera.position, {
      x: tragetPosition.x,
      y: tragetPosition.y + 1, // Offset for better view
      z: tragetPosition.z + 2,
      duration: 2,
      onUpdate: () => camera.lookAt(tragetPosition),
      onComplete: () => {
        controls.target.set(tragetPosition.x,tragetPosition.y,tragetPosition.z);
        controls.update();
      },
    });

    // Stick camera to planet's revolution
    // function followPlanet() {
    //   camera.lookAt(planetMesh.position);
    //   requestAnimationFrame(followPlanet);
    // }
    // followPlanet();
  }
}

function resetCamera(){
  gsap.to(camera.position,{
    x: originalCameraPos.x,
    y: originalCameraPos.y,
    z: originalCameraPos.z,
    duration: 2,
    onComplete: ()=>{
      controls.target.set(0,0,0);
      controls.update();
    }
  })
}

function animate(){
  requestAnimationFrame(animate);

  renderer.render(scene,camera);
  stars.rotation.x += 0.0001
  sun.rotation.y += 0.0001
  revolvePlanet();
}


animate();
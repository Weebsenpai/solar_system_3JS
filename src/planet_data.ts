import { Mesh } from "three";

export interface planetModel {
    name: string;
    radius: number;
    texture: string;
    scale: number;
    orbitRadius: number;
    orbitOffset: number;
    rotationValue : number;
}

export interface planetMesh {
    planet: Mesh;
    orbitRadius: number;
    label: HTMLDivElement;
    orbitOffset : number;
    rotationValue: number;
    satelite?: Mesh;
}

export const planets: planetModel[] = [
    {
        name: "Mercury",
        radius: 0.3116,
        texture: "mercury.png",
        scale: 1,
        orbitRadius: 39,
        orbitOffset: 2,
        rotationValue: 0.001  
    },
    {
        name: "Venus",
        radius: 0.779,
        texture: "venus.png",
        scale: 1,
        orbitRadius: 72,
        orbitOffset: 3,
        rotationValue: 0.001
    },
    {
        name: "Earth",
        radius: 0.82,
        texture: "earth.png",
        scale: 1,
        orbitRadius: 100,
        orbitOffset: 1,
        rotationValue: 0.005
    },
    {
        name: "Mars",
        radius: 0.4346,
        texture: "mars.png",
        scale: 1,
        orbitRadius: 152,
        orbitOffset: 3,
        rotationValue: 0.001
    },
    {
        name: "Jupiter",
        radius: 9.02,
        texture: "jupiter.png",
        scale: 1,
        orbitRadius: 520,
        orbitOffset: 6,
        rotationValue: 0.005
    },
    {
        name: "Saturn",
        radius: 7.75,
        texture: "saturn.png",
        scale: 1,
        orbitRadius: 954,
        orbitOffset: 3,
        rotationValue: 0.005
    },
    {
        name: "Uranus",
        radius: 3.28,
        texture: "uranus.png",
        scale: 1,
        orbitRadius: 1922,
        orbitOffset: -2,
        rotationValue: 0.005
    },
    {
        name: "Neptune",
        radius: 3.2,
        texture: "neptune.png",
        scale: 1,
        orbitRadius: 3006,
        orbitOffset: 2,
        rotationValue: 0.005
    }
]

export interface PlanetInfo {
    name: string;
    description: string;
    rotationSpeed: number;
    revolutionSpeed: number;
    radius: number;
    daysToRevolve: number;
    hoursInDay: number;
    distanceFromSun: number;
  }


export interface PlanetData {
    name: string;
    description: string;
    rotation_speed: string; 
    revolution_speed: string; 
    revolution_days: string;
    rotation_hours: string; 
    distance_from_sun: string;
}

export const planetDescription: PlanetData[] = [
    {
        name: "Sun",
        description: "The central star of the Solar System, a massive ball of hot plasma generating energy through nuclear fusion.",
        rotation_speed: "7200 km/h",
        revolution_speed: "N/A (stationary in Solar System)",
        revolution_days: "N/A",
        rotation_hours: "609.12 hours (approx. 25 days at the equator)",
        distance_from_sun: "0 km"
    },
    {
      name: "Mercury",
      description: "The smallest planet and closest to the Sun, with a barren and rocky surface.",
      rotation_speed: "10.89 km/h",
      revolution_speed: "47.87 km/s",
      revolution_days: "88 days",
      rotation_hours: "1407.6 hours",
      distance_from_sun: "57.9 million km"
    },
    {
      name: "Venus",
      description: "A rocky planet with a thick atmosphere, known for its extreme greenhouse effect.",
      rotation_speed: "-6.52 km/h (retrograde)",
      revolution_speed: "35.02 km/s",
      revolution_days: "225 days",
      rotation_hours: "5832 hours",
      distance_from_sun: "108.2 million km"
    },
    {
      name: "Earth",
      description: "The only planet known to support life, with vast oceans and a protective atmosphere.",
      rotation_speed: "1670 km/h",
      revolution_speed: "29.78 km/s",
      revolution_days: "365.25 days",
      rotation_hours: "24 hours",
      distance_from_sun: "149.6 million km"
    },
    {
      name: "Mars",
      description: "Known as the Red Planet due to its iron oxide-rich surface, with potential signs of past water.",
      rotation_speed: "866 km/h",
      revolution_speed: "24.077 km/s",
      revolution_days: "687 days",
      rotation_hours: "24.6 hours",
      distance_from_sun: "227.9 million km"
    },
    {
      name: "Jupiter",
      description: "The largest planet, a gas giant with a Great Red Spot and dozens of moons.",
      rotation_speed: "45,583 km/h",
      revolution_speed: "13.07 km/s",
      revolution_days: "4333 days",
      rotation_hours: "9.9 hours",
      distance_from_sun: "778.5 million km"
    },
    {
      name: "Saturn",
      description: "A gas giant famous for its stunning ring system, composed of ice and rock.",
      rotation_speed: "36,840 km/h",
      revolution_speed: "9.69 km/s",
      revolution_days: "10,759 days",
      rotation_hours: "10.7 hours",
      distance_from_sun: "1.43 billion km"
    },
    {
      name: "Uranus",
      description: "An ice giant with a tilted axis, resulting in extreme seasonal changes.",
      rotation_speed: "-2.59 km/h (retrograde)",
      revolution_speed: "6.81 km/s",
      revolution_days: "30,687 days",
      rotation_hours: "17.2 hours",
      distance_from_sun: "2.87 billion km"
    },
    {
      name: "Neptune",
      description: "The farthest planet from the Sun, an ice giant with strong winds and faint rings.",
      rotation_speed: "9669 km/h",
      revolution_speed: "5.43 km/s",
      revolution_days: "60,190 days",
      rotation_hours: "16.1 hours",
      distance_from_sun: "4.5 billion km"
    }
  ];


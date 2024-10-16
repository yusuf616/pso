import { fitnessFunction } from "./fitnessFun";
import { pso } from "./pso";


// PSO Parameters
const bounds: [number, number][] = [[-10, 10], [-10, 10]];
const numParticles = 30;
const maxIterations = 100;

// Run PSO
const { bestPosition, bestValue } = pso(fitnessFunction, bounds, numParticles, maxIterations);

console.log(`Best Position: ${bestPosition}`);
console.log(`Best Value: ${bestValue}`);
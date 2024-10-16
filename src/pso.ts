class Particle {
    position: number[];
    velocity: number[];
    bestPosition: number[];
    bestValue: number;

    constructor(dimensions: number, bounds: [number, number][]) {
        this.position = Array.from({ length: dimensions }, (_, d) =>
            Math.random() * (bounds[d][1] - bounds[d][0]) + bounds[d][0]
        );
        this.velocity = Array.from({ length: dimensions }, () => Math.random() * 2 - 1);
        this.bestPosition = [...this.position];
        this.bestValue = Infinity;
    }
}

export function pso(
    fitnessFunction: (x: number[]) => number,
    bounds: [number, number][],
    numParticles: number,
    maxIterations: number
): { bestPosition: number[] | null; bestValue: number } {
    const dimensions = bounds.length;
    const particles: Particle[] = Array.from({ length: numParticles }, () => new Particle(dimensions, bounds));

    let gBestPosition: number[] | null = null;
    let gBestValue = Infinity;

    const w = 0.5; // Inertia weight
    const c1 = 1.5; // Cognitive coefficient
    const c2 = 1.5; // Social coefficient

    let iteration = 0;
    while (iteration < maxIterations) {
        particles.forEach(particle => {
            const fitnessValue = fitnessFunction(particle.position);

            // Update personal best
            if (fitnessValue < particle.bestValue) {
                particle.bestValue = fitnessValue;
                particle.bestPosition = [...particle.position];
            }

            // Update global best
            if (fitnessValue < gBestValue) {
                gBestValue = fitnessValue;
                gBestPosition = [...particle.bestPosition];
            }
        });

        particles.forEach(particle => {
            for (let d = 0; d < dimensions; d++) {
                const r1 = Math.random();
                const r2 = Math.random();
                particle.velocity[d] = (w * particle.velocity[d] +
                                        c1 * r1 * (particle.bestPosition[d] - particle.position[d]) +
                                        c2 * r2 * (gBestPosition[d] - particle.position[d]));

                // Update position
                particle.position[d] += particle.velocity[d];

                // Keep position within bounds
                if (particle.position[d] < bounds[d][0]) {
                    particle.position[d] = bounds[d][0];
                }
                if (particle.position[d] > bounds[d][1]) {
                    particle.position[d] = bounds[d][1];
                }
            }
        });

        iteration++;
    }

    return { bestPosition: gBestPosition, bestValue: gBestValue };
}

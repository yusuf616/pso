// Fitness function
export function fitnessFunction(x: number[]): number {
    return x.reduce((sum, xi) => sum + xi * xi, 0);
}
import { MatrixSolver } from './matrix-operations.js';

export class MeshAnalyzer {
    constructor() {
        this.meshes = [];
    }

    /**
     * Calculates mesh currents based on impedance matrix and voltage vector
     * @param {number} numMeshes - Number of meshes
     * @param {Array} components - List of components with location data {type, value, meshId: [1, 2], voltageSourceDir: 1/-1}
     */
    solve(numMeshes, components) {
        // Initialize Resistance Matrix (R) and Voltage Vector (V)
        let R = Array(numMeshes).fill().map(() => Array(numMeshes).fill(0));
        let V = Array(numMeshes).fill(0);

        components.forEach(comp => {
            const value = parseFloat(comp.value);
            
            if (comp.type === 'resistor') {
                // If resistor is shared between mesh i and j
                if (comp.meshes.length > 1) {
                    const i = comp.meshes[0] - 1;
                    const j = comp.meshes[1] - 1;
                    
                    // Add positive to diagonal
                    R[i][i] += value;
                    R[j][j] += value;
                    
                    // Subtract from off-diagonal (assuming standard opposing currents)
                    R[i][j] -= value;
                    R[j][i] -= value;
                } else {
                    // Only in one mesh
                    const i = comp.meshes[0] - 1;
                    R[i][i] += value;
                }
            } else if (comp.type === 'voltage_source') {
                // Voltage source logic: V = sum(IR) -> sum(V_rise) = sum(V_drop)
                // Standard form: [R][I] = [V_sources]
                // Convention: Sum(Voltage Rises) = Sum(Voltage Drops)
                
                if (comp.meshes.length > 1 && comp.directionsMap) {
                    // Shared voltage source between multiple meshes
                    // Each mesh can have different direction (rise or drop)
                    comp.meshes.forEach(meshId => {
                        const i = meshId - 1;
                        const direction = comp.directionsMap[meshId] || 'clockwise';
                        V[i] += (direction === 'clockwise' ? value : -value);
                    });
                } else {
                    // Non-shared voltage source (single mesh)
                    const i = comp.meshes[0] - 1;
                    const direction = comp.direction || 'clockwise';
                    V[i] += (direction === 'clockwise' ? value : -value);
                }
            }
        });

        try {
            const currents = MatrixSolver.solve(R, V);
            return { currents, matrix: R, vector: V };
        } catch (e) {
            throw e;
        }
    }
}

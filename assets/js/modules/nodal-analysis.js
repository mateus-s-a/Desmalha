import { MatrixSolver } from './matrix-operations.js';

export class NodalAnalyzer {
    /**
     * Solves for node voltages
     * @param {number} numNodes - Number of nodes (excluding ground)
     * @param {Array} components - Components list
     */
    solve(numNodes, components) {
        // Initialize Conductance Matrix (G) and Current Vector (I)
        let G = Array(numNodes).fill().map(() => Array(numNodes).fill(0));
        let I = Array(numNodes).fill(0);

        components.forEach(comp => {
            const value = parseFloat(comp.value);
            
            if (comp.type === 'resistor') {
                const conductance = 1 / value;
                const nodeA = comp.nodes[0]; // 0 is ground, 1..n are unknown nodes
                const nodeB = comp.nodes[1];

                // Node indices for matrix (0 to numNodes-1) -> input nodes are 1-based indices usually
                // Let's assume user enters 0 for GND, 1 for Node 1, etc.
                
                if (nodeA > 0) {
                    G[nodeA - 1][nodeA - 1] += conductance;
                    if (nodeB > 0) {
                        G[nodeA - 1][nodeB - 1] -= conductance;
                    }
                }
                
                if (nodeB > 0) {
                    G[nodeB - 1][nodeB - 1] += conductance;
                    if (nodeA > 0) {
                        G[nodeB - 1][nodeA - 1] -= conductance;
                    }
                }

            } else if (comp.type === 'current_source') {
                // Direction: 'entering' = current enters first node (positive), leaves second node (negative)
                // Direction: 'leaving' = current leaves first node (negative), enters second node (positive)
                const node1 = comp.nodes[0]; // First node
                const node2 = comp.nodes[1]; // Second node
                const direction = comp.direction || 'entering'; // Default to entering for backward compatibility
                
                if (direction === 'entering') {
                    // Current enters node1 (positive) and leaves node2 (negative)
                    if (node1 > 0) I[node1 - 1] += value;
                    if (node2 > 0) I[node2 - 1] -= value;
                } else {
                    // Current leaves node1 (negative) and enters node2 (positive)
                    if (node1 > 0) I[node1 - 1] -= value;
                    if (node2 > 0) I[node2 - 1] += value;
                }
            }
        });

        try {
            const voltages = MatrixSolver.solve(G, I);
            return { voltages, matrix: G, vector: I };
        } catch (e) {
            throw e;
        }
    }
}

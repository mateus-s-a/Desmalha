/**
 * Matrix Operations Module for solving linear systems.
 * Uses Gaussian Elimination.
 */

export class MatrixSolver {
    /**
     * Solves a system of linear equations Ax = B using Gaussian Elimination
     * @param {Array<Array<number>>} A - Coefficient matrix (n x n)
     * @param {Array<number>} B - Constant vector (n)
     * @returns {Array<number>} Solution vector x
     */
    static solve(A, B) {
        const n = A.length;
        // Create extended matrix [A|B]
        let matrix = A.map((row, i) => [...row, B[i]]);

        // Forward elimination
        for (let i = 0; i < n; i++) {
            // Find pivot
            let maxRow = i;
            for (let k = i + 1; k < n; k++) {
                if (Math.abs(matrix[k][i]) > Math.abs(matrix[maxRow][i])) {
                    maxRow = k;
                }
            }

            // Swap rows
            [matrix[i], matrix[maxRow]] = [matrix[maxRow], matrix[i]];

            // Check for singular matrix
            if (Math.abs(matrix[i][i]) < 1e-10) {
                throw new Error("Sistema singular ou mal condicionado (sem solução única).");
            }

            // Eliminate below
            for (let k = i + 1; k < n; k++) {
                const factor = matrix[k][i] / matrix[i][i];
                for (let j = i; j <= n; j++) {
                    matrix[k][j] -= factor * matrix[i][j];
                }
            }
        }

        // Backward substitution
        const x = new Array(n).fill(0);
        for (let i = n - 1; i >= 0; i--) {
            let sum = 0;
            for (let j = i + 1; j < n; j++) {
                sum += matrix[i][j] * x[j];
            }
            x[i] = (matrix[i][n] - sum) / matrix[i][i];
        }

        return x;
    }

    static printMatrix(M) {
        console.table(M);
    }
}

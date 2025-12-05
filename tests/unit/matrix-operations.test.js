// Unit tests for Matrix Operations Module
// Framework: Jest (npm install --save-dev jest)

import { MatrixSolver } from '../../assets/js/modules/matrix-operations.js';

describe('MatrixSolver', () => {
    describe('solve()', () => {
        test('resolves simple 2x2 system', () => {
            // System: 2x + y = 8, x + y = 5
            // Solution: x = 3, y = 2
            const A = [
                [2, 1],
                [1, 1]
            ];
            const B = [8, 5];
            
            const result = MatrixSolver.solve(A, B);
            
            expect(result[0]).toBeCloseTo(3, 4);
            expect(result[1]).toBeCloseTo(2, 4);
        });

        test('resolves 3x3 system', () => {
            // System: x + y + z = 6, 2x + 5y + z = 12, x + 2y + 3z = 11
            // Solution: x = 1, y = 1, z = 4
            const A = [
                [1, 1, 1],
                [2, 5, 1],
                [1, 2, 3]
            ];
            const B = [6, 12, 11];
            
            const result = MatrixSolver.solve(A, B);
            
            expect(result[0]).toBeCloseTo(1, 4);
            expect(result[1]).toBeCloseTo(1, 4);
            expect(result[2]).toBeCloseTo(4, 4);
        });

        test('throws error for singular matrix', () => {
            // Singular matrix: rows are linearly dependent
            const A = [
                [1, 2],
                [2, 4]  // This row is 2x the first row
            ];
            const B = [3, 6];
            
            expect(() => {
                MatrixSolver.solve(A, B);
            }).toThrow('Sistema singular ou mal condicionado');
        });

        test('handles identity matrix', () => {
            // Identity matrix: solution equals B
            const A = [
                [1, 0, 0],
                [0, 1, 0],
                [0, 0, 1]
            ];
            const B = [5, 7, 9];
            
            const result = MatrixSolver.solve(A, B);
            
            expect(result).toEqual(B);
        });
    });
});

// Run: npx jest tests/unit/matrix-operations.test.js

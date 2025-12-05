/**
 * Matrix Parser and Validator
 * Parses text input into matrix format [A|B]
 */

export class MatrixParser {
    /**
     * Parses text matrix into augmented matrix [A|B]
     * @param {string} text - Multi-line text with space/tab separated values
     * @returns {Object} { matrix: Array<Array>, vector: Array, size: number }
     */
    static parse(text) {
        // Remove empty lines and trim
        const lines = text.split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0);

        if (lines.length === 0) {
            throw new Error('Matriz vazia. Insira valores válidos.');
        }

        const rows = [];
        
        for (let i = 0; i < lines.length; i++) {
            // Split by whitespace (spaces or tabs)
            const values = lines[i].split(/\s+/)
                .map(v => v.trim())
                .filter(v => v.length > 0)
                .map(v => parseFloat(v));

            // Check for NaN
            if (values.some(v => isNaN(v))) {
                throw new Error(`Linha ${i + 1}: Contém valores inválidos. Use apenas números.`);
            }

            rows.push(values);
        }

        // Validate dimensions
        const numRows = rows.length;
        const numCols = rows[0].length;

        // Check if all rows have same number of columns
        for (let i = 1; i < numRows; i++) {
            if (rows[i].length !== numCols) {
                throw new Error(`Erro de dimensão: Linha ${i + 1} tem ${rows[i].length} colunas, esperado ${numCols}.`);
            }
        }

        // Validate augmented matrix format: n x (n+1)
        if (numCols !== numRows + 1) {
            throw new Error(`Formato inválido: Matriz ${numRows}x${numCols}. Esperado ${numRows}x${numRows + 1} (matriz aumentada [A|B]).`);
        }

        // Separate A and B
        const A = rows.map(row => row.slice(0, numRows));
        const B = rows.map(row => row[numRows]);

        return {
            matrix: A,
            vector: B,
            size: numRows
        };
    }

    /**
     * Validates if matrix is square and properly formatted
     * @param {Array<Array>} matrix 
     * @param {Array} vector 
     */
    static validate(matrix, vector) {
        const n = matrix.length;

        if (n === 0) {
            return { valid: false, message: 'Matriz vazia.' };
        }

        if (vector.length !== n) {
            return { valid: false, message: 'Vetor de constantes tem tamanho incompatível.' };
        }

        // Check square matrix
        for (let i = 0; i < n; i++) {
            if (matrix[i].length !== n) {
                return { valid: false, message: `Linha ${i + 1} não é quadrada.` };
            }
        }

        // Check for all zeros (singular)
        const hasNonZero = matrix.some(row => row.some(val => Math.abs(val) > 1e-10));
        if (!hasNonZero) {
            return { valid: false, message: 'Matriz contém apenas zeros.' };
        }

        return { valid: true };
    }

    /**
     * Formats matrix for display
     * @param {Array<Array>} matrix 
     * @param {Array} vector 
     */
    static format(matrix, vector) {
        let text = '';
        for (let i = 0; i < matrix.length; i++) {
            const row = matrix[i].map(v => v.toFixed(2).padStart(8)).join(' ');
            const constant = vector[i].toFixed(2).padStart(8);
            text += `${row}  ${constant}\n`;
        }
        return text;
    }

    /**
     * Creates example matrix for demonstration
     * @param {string} type - 'mesh' or 'nodal'
     */
    static getExample(type) {
        if (type === 'mesh') {
            return `50.00 0.00 0.00 -10.00 0.00 0.00  35.00
0.00 110.00 -45.00 0.00 -47.00 0.00 -25.00
0.00 -45.00 145.00 0.00 0.00 -100.00 -50.00
-10.00 0.00 0.00 22.00 -12.00 0.00 75.00
0.00 -47.00 0.00 -12.00 79.00 -20.00 90.00
0.00 0.00 -100.00 0.00 -20.00 135.00 0.00`;
        } else {
            return `0.10 -0.10 0.00 0.00 15.00
-0.10 0.26 -0.08 0.00 -5.00
0.00 -0.08 0.14 -0.01 -7.00
0.00 0.00 -0.01 0.08 4.00`;
        }
    }
}

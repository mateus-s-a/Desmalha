import { MatrixParser } from '../utils/matrix-parser.js';

export class MatrixInput {
    constructor(containerId, type) {
        this.container = document.getElementById(containerId);
        this.type = type; // 'mesh' or 'nodal'
    }

    render() {
        const placeholder = MatrixParser.getExample(this.type);
        const description = this.type === 'mesh' 
            ? 'Matriz de Resistências [R] e Vetor de Tensões [V]'
            : 'Matriz de Condutâncias [G] e Vetor de Correntes [I]';

        this.container.innerHTML = `
            <div class="matrix-input-form">
                <div class="form-group">
                    <label class="form-label">
                        <i class="fa-solid fa-table"></i> ${description}
                    </label>
                    <p style="font-size: 0.9em; color: #666; margin-bottom: 10px;">
                        Insira a matriz aumentada [A|B] onde cada linha representa uma equação.
                        Use espaços para separar os valores. A última coluna é o vetor de constantes.
                    </p>
                    <textarea 
                        id="matrix-text-input" 
                        class="form-control" 
                        rows="8" 
                        placeholder="${placeholder}"
                        style="font-family: 'Courier New', monospace; font-size: 0.9em;"
                    ></textarea>
                </div>
                
                <div class="buttons-row" style="margin-top: 15px; gap: 10px; display: flex; flex-wrap: wrap;">
                    <button class="btn btn-secondary" id="load-example">
                        <i class="fa-solid fa-lightbulb"></i> Exemplo
                    </button>
                    <button class="btn btn-danger" id="clear-matrix">
                        <i class="fa-solid fa-trash-can"></i> Limpar
                    </button>
                    <button class="btn btn-primary" id="solve-matrix-btn" style="margin-left: auto;">
                        <i class="fa-solid fa-calculator"></i> Calcular
                    </button>
                </div>
                
                <div id="matrix-preview" style="margin-top: 15px;"></div>
            </div>
        `;

        this.attachEvents();
    }

    attachEvents() {
        document.getElementById('load-example').onclick = () => this.loadExample();
        document.getElementById('clear-matrix').onclick = () => this.clearMatrix();
        
        // Real-time preview (optional)
        const textarea = document.getElementById('matrix-text-input');
        textarea.addEventListener('input', () => this.updatePreview());
    }

    loadExample() {
        const example = MatrixParser.getExample(this.type);
        document.getElementById('matrix-text-input').value = example;
        this.updatePreview();
    }

    clearMatrix() {
        document.getElementById('matrix-text-input').value = '';
        document.getElementById('matrix-preview').innerHTML = '';
    }

    updatePreview() {
        const text = document.getElementById('matrix-text-input').value;
        const preview = document.getElementById('matrix-preview');

        if (!text.trim()) {
            preview.innerHTML = '';
            return;
        }

        try {
            const { matrix, vector, size } = MatrixParser.parse(text);
            const validation = MatrixParser.validate(matrix, vector);

            if (validation.valid) {
                preview.innerHTML = `
                    <div style="background: #e0f1ff; padding: 10px; border-radius: 5px; border-left: 4px solid #1d7ad0;">
                        <small><i class="fa-solid fa-check-circle"></i> <strong>Matriz válida:</strong> 
                        Sistema ${size}x${size} detectado.</small>
                    </div>
                `;
            } else {
                preview.innerHTML = `
                    <div style="background: #ffe0e0; padding: 10px; border-radius: 5px; border-left: 4px solid #dc3545;">
                        <small><i class="fa-solid fa-exclamation-triangle"></i> <strong>Aviso:</strong> 
                        ${validation.message}</small>
                    </div>
                `;
            }
        } catch (error) {
            preview.innerHTML = `
                <div style="background: #fff3cd; padding: 10px; border-radius: 5px; border-left: 4px solid #daa21b;">
                    <small><i class="fa-solid fa-info-circle"></i> ${error.message}</small>
                </div>
            `;
        }
    }

    getData() {
        const text = document.getElementById('matrix-text-input').value;
        
        if (!text.trim()) {
            throw new Error('Por favor, insira uma matriz.');
        }

        const { matrix, vector, size } = MatrixParser.parse(text);
        const validation = MatrixParser.validate(matrix, vector);

        if (!validation.valid) {
            throw new Error(validation.message);
        }

        return { matrix, vector, size };
    }
}

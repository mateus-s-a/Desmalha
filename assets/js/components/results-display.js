export class ResultsDisplay {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
    }

    showResults(results, type) {
        const vectorName = type === 'mesh' ? 'Correntes de Malha' : 'Tensões Nodais';
        const unit = type === 'mesh' ? 'A' : 'V';
        const symbol = type === 'mesh' ? 'I' : 'V';

        let html = `
            <div class="card">
                <h3>Resultados</h3>
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                    <thead>
                        <tr style="background: #f8f9fa; border-bottom: 2px solid #91ade2;">
                            <th style="padding: 10px; text-align: left;">Variável</th>
                            <th style="padding: 10px; text-align: right;">Valor</th>
                        </tr>
                    </thead>
                    <tbody>
        `;

        const solution = results.currents || results.voltages; // vector
        
        solution.forEach((val, idx) => {
            html += `
                <tr style="border-bottom: 1px solid #eee;">
                    <td style="padding: 10px;">${symbol}<sub>${idx + 1}</sub></td>
                    <td style="padding: 10px; text-align: right; font-weight: bold; color: #1d7ad0;">
                        ${val.toFixed(4)} ${unit}
                    </td>
                </tr>
            `;
        });

        html += `</tbody></table>`;

        // Matrix Display (Optional Educational)
        html += `<h4>Matriz do Sistema</h4>
                 <div style="background: #eee; padding: 10px; border-radius: 5px; font-family: monospace; overflow-x: auto;">
                 [Matrix] x [Vector] = [Result]<br><br>`;
        
        const M = results.matrix;
        const V = results.vector;

        M.forEach((row, i) => {
            html += `| ${row.map(n => n.toFixed(2).padStart(6)).join(' ')} |   | ${symbol}${i+1} |   =   | ${V[i].toFixed(2).padStart(6)} |<br>`;
        });
        
        html += `</div></div>`;

        this.container.innerHTML = html;
    }

    showError(msg) {
        this.container.innerHTML = `<div class="card" style="border-top-color: #dc3545; color: #dc3545;">${msg}</div>`;
    }
}

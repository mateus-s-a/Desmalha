export class CircuitInput {
    constructor(containerId, type) {
        this.container = document.getElementById(containerId);
        this.type = type; // 'mesh' or 'nodal'
        this.components = [];
        this.count = 0;
    }

    render() {
        this.container.innerHTML = `
            <div class="circuit-form">
                <div class="form-group">
                    <label class="form-label">Número de ${this.type === 'mesh' ? 'Malhas' : 'Nós (sem o Terra)'}:</label>
                    <input type="number" id="system-size" class="form-control" min="2" max="10" value="2">
                </div>
                
                <div id="components-list"></div>
                
                <div class="buttons-row" style="margin-top: 15px; gap: 10px; display: flex; flex-wrap: wrap;">
                    <button class="btn btn-secondary" id="add-resistor"><i class="fa-solid fa-plus"></i> Resistor</button>
                    <button class="btn btn-secondary" id="add-source"><i class="fa-solid fa-plus"></i> Fonte</button>
                    <button class="btn btn-danger" id="clear-all"><i class="fa-solid fa-trash-can"></i> Limpar Tudo</button>
                    <button class="btn btn-primary" id="solve-btn" style="margin-left: auto;">Calcular</button>
                </div>
            </div>
        `;

        this.attachEvents();
    }

    attachEvents() {
        document.getElementById('add-resistor').onclick = () => this.addComponent('resistor');
        document.getElementById('add-source').onclick = () => this.addComponent(this.type === 'mesh' ? 'voltage_source' : 'current_source');
        document.getElementById('clear-all').onclick = () => this.clearComponents();
        
        // Solve event is handled by the main page script which calls getComponents()
    }

    clearComponents() {
        const list = document.getElementById('components-list');
        if (list) {
            list.innerHTML = '';
            this.count = 0;
        }
    }

    addComponent(type) {
        this.count++;
        const div = document.createElement('div');
        div.className = 'component-item card';
        div.style.padding = '10px';
        div.style.borderLeft = '4px solid #91ade2';
        div.setAttribute('data-type', type); // Store component type
        
        const locationLabel = this.type === 'mesh' ? 'Malhas conectadas (ex: 1,2)' : 'Nós conectados (0=GND, ex: 1,2)';
        const valueLabel = type === 'resistor' ? 'Resistência (Ω)' : (type === 'voltage_source' ? 'Tensão (V)' : 'Corrente (A)');

        div.innerHTML = `
            <div style="display: flex; gap: 10px; align-items: flex-end;">
                <div style="flex: 1;">
                    <label class="form-label"><small>${type === 'resistor' ? 'R' : 'Fonte'}</small></label>
                    <input type="number" class="form-control comp-value" placeholder="${valueLabel}">
                </div>
                <div style="flex: 1;">
                    <label class="form-label"><small>${locationLabel}</small></label>
                    <input type="text" class="form-control comp-loc" placeholder="1 ou 1,2">
                </div>
                <button class="btn btn-accent btn-sm remove-btn"><i class="fa-solid fa-trash"></i></button>
            </div>
            ${type === 'voltage_source' && this.type === 'mesh' ? `
            <div style="margin-top: 5px;">
                <small>Sentido na Malha Principal:</small>
                <select class="form-control comp-dir">
                    <option value="clockwise">Horário (Aumenta Tensão)</option>
                    <option value="counter">Anti-horário (Queda Tensão)</option>
                </select>
            </div>` : ''}
            ${type === 'current_source' && this.type === 'nodal' ? `
            <div style="margin-top: 5px;">
                <small>Direção da Corrente no Primeiro Nó:</small>
                <select class="form-control comp-dir">
                    <option value="entering">Entrando (Positiva)</option>
                    <option value="leaving">Saindo (Negativa)</option>
                </select>
            </div>` : ''}
        `;

        div.querySelector('.remove-btn').onclick = () => div.remove();
        document.getElementById('components-list').appendChild(div);
    }

    getData() {
        const size = parseInt(document.getElementById('system-size').value);
        const inputs = document.querySelectorAll('.component-item');
        const components = [];

        inputs.forEach(item => {
            const value = parseFloat(item.querySelector('.comp-value').value);
            const locRaw = item.querySelector('.comp-loc').value;
            const locs = locRaw.split(',').map(n => parseInt(n.trim()));
            
            // Get component type from data attribute
            const type = item.getAttribute('data-type');

            const compData = {
                type: type,
                value: value,
            };

            if (this.type === 'mesh') {
                compData.meshes = locs;
                if (type === 'voltage_source') {
                    const dirSelect = item.querySelector('.comp-dir');
                    if (dirSelect) {
                        compData.direction = dirSelect.value;
                    }
                }
            } else {
                compData.nodes = locs;
                if (type === 'current_source') {
                    const dirSelect = item.querySelector('.comp-dir');
                    if (dirSelect) {
                        compData.direction = dirSelect.value;
                    }
                }
            }

            components.push(compData);
        });

        return { size, components };
    }
}

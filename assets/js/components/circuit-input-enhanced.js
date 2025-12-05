/**
 * Enhanced Circuit Input Component v2.0
 * Features: 
 * - Hierarchical cards per mesh/node
 * - Color-coded components
 * - Checkbox for sharing between meshes/nodes
 * - Preserves input values during re-renders
 */

export class CircuitInputEnhanced {
    constructor(containerId, type) {
        this.container = document.getElementById(containerId);
        this.type = type; // 'mesh' or 'nodal'
        this.systemSize = 2;
        this.components = []; // Flat array of all components
        this.componentCounter = 0;
    }

    render() {
        const label = this.type === 'mesh' ? 'Malhas' : 'Nós (sem o Terra)';
        
        this.container.innerHTML = `
            <div class="circuit-form-enhanced">
                <div class="form-group">
                    <label class="form-label">
                        <i class="fa-solid fa-hashtag"></i> Número de ${label}:
                    </label>
                    <input 
                        type="number" 
                        id="system-size" 
                        class="form-control" 
                        min="2" 
                        max="10" 
                        value="${this.systemSize}"
                        style="max-width: 150px;"
                    >
                    <button class="btn btn-secondary" id="update-size-btn" style="margin-top: 10px;">
                        <i class="fa-solid fa-refresh"></i> Atualizar Estrutura
                    </button>
                </div>
                
                <hr style="margin: 20px 0; border-color: #e9ecef;">
                
                <div id="meshes-nodes-container">
                    <!-- Mesh/Node cards will be rendered here -->
                </div>
                
                <div class="buttons-row" style="margin-top: 20px; gap: 10px; display: flex; flex-wrap: wrap;">
                    <button class="btn btn-danger" id="clear-all">
                        <i class="fa-solid fa-trash-can"></i> Limpar Tudo
                    </button>
                    <button class="btn btn-primary" id="solve-btn" style="margin-left: auto;">
                        <i class="fa-solid fa-calculator"></i> Calcular
                    </button>
                </div>
            </div>
        `;

        this.attachEvents();
        this.renderMeshesNodes();
    }

    attachEvents() {
        document.getElementById('update-size-btn').onclick = () => this.updateSystemSize();
        document.getElementById('clear-all').onclick = () => this.clearComponents();
    }

    updateSystemSize() {
        const newSize = parseInt(document.getElementById('system-size').value);
        if (newSize < 2 || newSize > 10) {
            alert('Por favor, escolha um número entre 2 e 10.');
            return;
        }
        
        // Save current values before updating
        this.saveCurrentValues();
        
        // Confirm if components exist
        if (this.components.length > 0) {
            if (!confirm('Isso irá reorganizar os componentes. Continuar?')) {
                return;
            }
        }
        
        this.systemSize = newSize;
        this.renderMeshesNodes();
    }

    saveCurrentValues() {
        // Save all input values before re-render
        this.components.forEach(comp => {
            const valueInput = document.getElementById(`value-${comp.id}`);
            const sharedCheckbox = document.getElementById(`shared-${comp.id}`);
            
            if (valueInput) {
                comp.value = valueInput.value;
            }
            
            // Save directions per location for shared components
            if (comp.direction !== null) {
                if (comp.isShared && comp.sharedLocations.length > 0) {
                    // Save direction for each shared location
                    comp.sharedLocations.forEach(loc => {
                        const dirInput = document.getElementById(`dir-${comp.id}-loc-${loc}`);
                        if (dirInput) {
                            comp.directionsMap[loc] = dirInput.value;
                        }
                    });
                } else {
                    // Save single direction for non-shared components
                    const dirInput = document.getElementById(`dir-${comp.id}`);
                    if (dirInput) {
                        comp.direction = dirInput.value;
                        // Also update directionsMap for consistency
                        comp.directionsMap[comp.primaryLocation] = dirInput.value;
                    }
                }
            }
            
            if (sharedCheckbox) {
                comp.isShared = sharedCheckbox.checked;
                
                // Save selected locations
                if (comp.isShared) {
                    const selectedLocations = [];
                    
                    // Check Ground (Node 0) for Nodal Analysis
                    if (this.type !== 'mesh') {
                        const gndCheckbox = document.getElementById(`loc-${comp.id}-0`);
                        if (gndCheckbox && gndCheckbox.checked) {
                            selectedLocations.push(0);
                        }
                    }
                    
                    for (let i = 1; i <= this.systemSize; i++) {
                        const checkbox = document.getElementById(`loc-${comp.id}-${i}`);
                        if (checkbox && checkbox.checked) {
                            selectedLocations.push(i);
                        }
                    }
                    comp.sharedLocations = selectedLocations;
                }
            }
        });
    }

    renderMeshesNodes() {
        const container = document.getElementById('meshes-nodes-container');
        const label = this.type === 'mesh' ? 'Malha' : 'Nó';
        
        let html = '';
        
        // Render individual mesh/node cards
        for (let i = 1; i <= this.systemSize; i++) {
            const componentsInThis = this.getComponentsForLocation(i);
            const componentCount = componentsInThis.length;
            
            html += `
                <div class="mesh-node-container" data-location="${i}">
                    <div class="mesh-node-header">
                        <div class="mesh-node-title">
                            <i class="fa-solid fa-${this.type === 'mesh' ? 'border-all' : 'circle-nodes'}"></i>
                            ${label} ${i}
                            <span class="mesh-node-badge">${componentCount} componente${componentCount !== 1 ? 's' : ''}</span>
                        </div>
                        <div>
                            <button class="btn btn-secondary btn-sm add-component-btn" 
                                    data-location="${i}" 
                                    data-type="resistor"
                                    title="Adicionar Resistor">
                                <i class="fa-solid fa-plus"></i> Resistor
                            </button>
                            <button class="btn btn-secondary btn-sm add-component-btn" 
                                    data-location="${i}" 
                                    data-type="${this.type === 'mesh' ? 'voltage_source' : 'current_source'}"
                                    title="Adicionar Fonte">
                                <i class="fa-solid fa-plus"></i> Fonte
                            </button>
                        </div>
                    </div>
                    <div class="components-list" id="components-list-${i}">
                        ${componentCount === 0 ? '<div class="empty-state">Nenhum componente adicionado</div>' : ''}
                    </div>
                </div>
            `;
        }
        
        container.innerHTML = html;
        
        // Attach add component events
        document.querySelectorAll('.add-component-btn').forEach(btn => {
            btn.onclick = () => {
                const location = parseInt(btn.getAttribute('data-location'));
                const type = btn.getAttribute('data-type');
                this.addComponent(type, location);
            };
        });
        
        // Re-render existing components
        this.renderAllComponents();
    }

    getComponentsForLocation(location) {
        return this.components.filter(comp => {
            if (comp.isShared && comp.sharedLocations) {
                return comp.sharedLocations.includes(location);
            }
            return comp.primaryLocation === location;
        });
    }

    addComponent(type, primaryLocation) {
        // CRITICAL: Save existing values BEFORE adding new component
        if (this.components.length > 0) {
            this.saveCurrentValues();
        }
        
        this.componentCounter++;
        const id = `comp_${this.componentCounter}`;
        
        const defaultDirection = type === 'voltage_source' || type === 'current_source' ? 
                                 (this.type === 'mesh' ? 'clockwise' : 'entering') : null;
        
        const component = {
            id: id,
            type: type,
            value: '',
            primaryLocation: primaryLocation,
            isShared: false,
            sharedLocations: [],
            direction: defaultDirection, // Legacy: for non-shared components
            directionsMap: {} // New: {location: direction} for shared components
        };
        
        // Initialize directionsMap for primary location
        if (defaultDirection !== null) {
            component.directionsMap[primaryLocation] = defaultDirection;
        }
        
        this.components.push(component);
        
        // Save existing component values BEFORE re-render
        this.saveCurrentValues();
        this.renderMeshesNodes();
    }

    renderAllComponents() {
        for (let i = 1; i <= this.systemSize; i++) {
            const componentsArray = this.getComponentsForLocation(i);
            const listContainer = document.getElementById(`components-list-${i}`);
            
            if (listContainer) {
                if (componentsArray.length > 0) {
                    listContainer.innerHTML = componentsArray
                        .map(comp => this.renderComponentCard(comp, i))
                        .join('');
                    
                    // Attach events for each component
                    componentsArray.forEach(comp => {
                        this.attachComponentEvents(comp, i);
                    });
                } else {
                    listContainer.innerHTML = '<div class="empty-state">Nenhum componente adicionado</div>';
                }
            }
        }
    }

    attachComponentEvents(component, currentLocation) {
        // Remove button
        const removeBtn = document.getElementById(`remove-${component.id}-${currentLocation}`);
        if (removeBtn) {
            removeBtn.onclick = () => this.removeComponent(component.id);
        }

        // Value input - Save on change (real-time protection)
        const valueInput = document.getElementById(`value-${component.id}`);
        if (valueInput) {
            valueInput.oninput = (e) => {
                component.value = e.target.value;
            };
            valueInput.onblur = (e) => {
                component.value = e.target.value;
            };
        }

        // Direction select - Save on change
        if (component.direction !== null) {
            if (component.isShared) {
                // For shared components, attach event to location-specific select
                const dirInput = document.getElementById(`dir-${component.id}-loc-${currentLocation}`);
                if (dirInput) {
                    dirInput.onchange = (e) => {
                        component.directionsMap[currentLocation] = e.target.value;
                    };
                }
            } else {
                // For non-shared components, use standard select
                const dirInput = document.getElementById(`dir-${component.id}`);
                if (dirInput) {
                    dirInput.onchange = (e) => {
                        component.direction = e.target.value;
                        component.directionsMap[component.primaryLocation] = e.target.value;
                    };
                }
            }
        }

        // Shared checkbox
        const sharedCheckbox = document.getElementById(`shared-${component.id}`);
        if (sharedCheckbox) {
            sharedCheckbox.onchange = (e) => this.toggleShared(component.id, e.target.checked);
        }

        // Location checkboxes (if shared)
        if (component.isShared) {
            // Determine range: 1..N for mesh, 0..N for nodal
            const startLoc = this.type === 'mesh' ? 1 : 0;
            
            for (let i = startLoc; i <= this.systemSize; i++) {
                const locCheckbox = document.getElementById(`loc-${component.id}-${i}`);
                if (locCheckbox) {
                    locCheckbox.onchange = () => this.updateSharedLocations(component.id);
                }
            }
        }
    }

    toggleShared(componentId, isShared) {
        const component = this.components.find(c => c.id === componentId);
        if (!component) return;

        // Save current values first
        this.saveCurrentValues();
        
        component.isShared = isShared;
        
        if (isShared) {
            // Initialize with primary location selected
            component.sharedLocations = [component.primaryLocation];
        } else {
            component.sharedLocations = [];
        }
        
        // Re-render
        this.renderMeshesNodes();
    }

    updateSharedLocations(componentId) {
        const component = this.components.find(c => c.id === componentId);
        if (!component || !component.isShared) return;

        // Save current directions before updating locations
        this.saveCurrentValues();

        const selectedLocations = [];
        
        // Check Ground (Node 0) for Nodal Analysis
        if (this.type !== 'mesh') {
            const gndCheckbox = document.getElementById(`loc-${component.id}-0`);
            if (gndCheckbox && gndCheckbox.checked) {
                selectedLocations.push(0);
            }
        }

        for (let i = 1; i <= this.systemSize; i++) {
            const checkbox = document.getElementById(`loc-${component.id}-${i}`);
            if (checkbox && checkbox.checked) {
                selectedLocations.push(i);
            }
        }

        // Initialize directionsMap for new locations
        if (component.direction !== null) {
            selectedLocations.forEach(loc => {
                if (!component.directionsMap[loc]) {
                    // Initialize with default direction for new locations
                    component.directionsMap[loc] = this.type === 'mesh' ? 'clockwise' : 'entering';
                }
            });
        }

        component.sharedLocations = selectedLocations;
        
        // Update counts in headers without full re-render
        this.updateHeaderCounts();
    }

    updateHeaderCounts() {
        for (let i = 1; i <= this.systemSize; i++) {
            const count = this.getComponentsForLocation(i).length;
            const badge = document.querySelector(`[data-location="${i}"] .mesh-node-badge`);
            if (badge) {
                badge.textContent = `${count} componente${count !== 1 ? 's' : ''}`;
            }
        }
    }

    renderComponentCard(component, displayLocation) {
        const typeLabels = {
            'resistor': 'Resistor',
            'voltage_source': 'Fonte de Tensão',
            'current_source': 'Fonte de Corrente'
        };
        
        const typeIcons = {
            'resistor': 'fa-wave-square',
            'voltage_source': 'fa-bolt',
            'current_source': 'fa-arrow-right-arrow-left'
        };
        
        const typeColors = {
            'resistor': 'resistor',
            'voltage_source': 'voltage',
            'current_source': 'current'
        };
        
        const valueLabel = component.type === 'resistor' ? 'Resistência (Ω)' : 
                          (component.type === 'voltage_source' ? 'Tensão (V)' : 'Corrente (A)');
        
        const cardClass = `component-card-${typeColors[component.type]}`;
        const badgeClass = `badge-${typeColors[component.type]}`;
        
        // Shared indicator
        const sharedIndicator = component.isShared ? 
            `<span style="margin-left: 10px; color: #666;">
                <i class="fa-solid fa-link"></i> 
                ${component.sharedLocations.map(loc => loc === 0 ? 'GND' : loc).join(', ')}
            </span>` : '';
        
        return `
            <div class="component-item-enhanced ${cardClass}" data-id="${component.id}">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 10px;">
                    <div style="flex: 1;">
                        <div style="margin-bottom: 8px;">
                            <span class="component-type-badge ${badgeClass}">
                                <i class="fa-solid ${typeIcons[component.type]}"></i>
                                ${typeLabels[component.type]}
                            </span>
                            ${sharedIndicator}
                        </div>
                        
                        <div class="form-group" style="margin-bottom: 10px;">
                            <input 
                                type="number" 
                                class="form-control" 
                                id="value-${component.id}"
                                placeholder="${valueLabel}"
                                value="${component.value}"
                                style="font-weight: 600;"
                            >
                        </div>
                        
                        ${component.direction !== null ? `
                        <div class="form-group" style="margin-bottom: 10px;">
                            ${component.isShared ? `
                                <label style="font-size: 12px; color: #666; margin-bottom: 5px; display: block;">
                                    <i class="fa-solid fa-info-circle"></i> Direção nesta localização
                                </label>
                            ` : ''}
                            <select class="form-control" id="${component.isShared ? `dir-${component.id}-loc-${displayLocation}` : `dir-${component.id}`}">
                                ${component.type === 'voltage_source' ? `
                                    <option value="clockwise" ${(component.isShared ? component.directionsMap[displayLocation] : component.direction) === 'clockwise' ? 'selected' : ''}>
                                        Horário (Aumenta Tensão)
                                    </option>
                                    <option value="counter" ${(component.isShared ? component.directionsMap[displayLocation] : component.direction) === 'counter' ? 'selected' : ''}>
                                        Anti-horário (Queda Tensão)
                                    </option>
                                ` : `
                                    <option value="entering" ${(component.isShared ? component.directionsMap[displayLocation] : component.direction) === 'entering' ? 'selected' : ''}>
                                        Entrando (Positiva)
                                    </option>
                                    <option value="leaving" ${(component.isShared ? component.directionsMap[displayLocation] : component.direction) === 'leaving' ? 'selected' : ''}>
                                        Saindo (Negativa)
                                    </option>
                                `}
                            </select>
                        </div>
                        ` : ''}
                        
                        <div class="form-group" style="margin-bottom: 0;">
                            <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; user-select: none;">
                                <input 
                                    type="checkbox" 
                                    id="shared-${component.id}" 
                                    ${component.isShared ? 'checked' : ''}
                                    style="cursor: pointer;"
                                >
                                <span style="font-size: 0.9em; color: #666;">
                                    <i class="fa-solid fa-link"></i> 
                                    Compartilhar com outras ${this.type === 'mesh' ? 'malhas' : 'nós'}
                                </span>
                            </label>
                        </div>
                        
                        ${component.isShared ? `
                        <div style="margin-top: 10px; padding: 10px; background: #f8f9fa; border-radius: 5px;">
                            <small style="display: block; margin-bottom: 5px; font-weight: 600; color: #666;">
                                Selecione ${this.type === 'mesh' ? 'as malhas' : 'os nós'}:
                            </small>
                            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(80px, 1fr)); gap: 8px;">
                                ${
                                    (this.type === 'mesh' 
                                        ? Array.from({length: this.systemSize}, (_, i) => i + 1) 
                                        : [0, ...Array.from({length: this.systemSize}, (_, i) => i + 1)]
                                    ).map(loc => `
                                    <label style="display: flex; align-items: center; gap: 5px; cursor: pointer; font-size: 0.85em;">
                                        <input 
                                            type="checkbox" 
                                            id="loc-${component.id}-${loc}"
                                            ${component.sharedLocations.includes(loc) ? 'checked' : ''}
                                            style="cursor: pointer;"
                                        >
                                        <span>${loc === 0 ? 'Terra (GND)' : (this.type === 'mesh' ? 'Malha' : 'Nó') + ' ' + loc}</span>
                                    </label>
                                `).join('')}
                            </div>
                        </div>
                        ` : ''}
                    </div>
                    
                    <button class="btn btn-accent btn-sm" id="remove-${component.id}-${displayLocation}" title="Remover">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    }

    removeComponent(componentId) {
        // Save values before removing
        this.saveCurrentValues();
        
        this.components = this.components.filter(c => c.id !== componentId);
        
        // Re-render
        this.renderMeshesNodes();
    }

    clearComponents() {
        if (this.components.length === 0) {
            alert('Não há componentes para limpar.');
            return;
        }
        
        if (confirm('Tem certeza que deseja limpar todos os componentes?')) {
            this.components = [];
            this.componentCounter = 0;
            this.renderMeshesNodes();
        }
    }

    getData() {
        // Save current values before extracting
        this.saveCurrentValues();
        
        const size = this.systemSize;
        const components = [];
        
        // Process all components
        this.components.forEach(comp => {
            const value = parseFloat(comp.value);
            
            if (isNaN(value) || !comp.value) {
                return; // Skip empty/invalid components
            }
            
            const compData = {
                type: comp.type,
                value: value
            };
            
            if (this.type === 'mesh') {
                if (comp.isShared && comp.sharedLocations.length >= 2) {
                    // Shared component between multiple meshes
                    compData.meshes = comp.sharedLocations;
                } else {
                    // Single mesh component
                    compData.meshes = [comp.primaryLocation];
                }
                
                if (comp.type === 'voltage_source') {
                    if (comp.isShared && comp.sharedLocations.length >= 2) {
                        // Return directionsMap for shared voltage sources
                        compData.directionsMap = {};
                        comp.sharedLocations.forEach(loc => {
                            compData.directionsMap[loc] = comp.directionsMap[loc] || 'clockwise';
                        });
                    } else {
                        // Single direction for non-shared
                        compData.direction = comp.direction;
                    }
                }
            } else {
                // Nodal
                if (comp.isShared && comp.sharedLocations.length >= 2) {
                    // Shared between two nodes
                    compData.nodes = comp.sharedLocations.slice(0, 2); // Take first two
                } else {
                    // Single node component (connect to ground)
                    compData.nodes = [0, comp.primaryLocation];
                }
                
                if (comp.type === 'current_source') {
                    if (comp.isShared && comp.sharedLocations.length >= 2) {
                        // Return directionsMap for shared current sources
                        compData.directionsMap = {};
                        comp.sharedLocations.forEach(loc => {
                            compData.directionsMap[loc] = comp.directionsMap[loc] || 'entering';
                        });
                    } else {
                        // Single direction for non-shared
                        compData.direction = comp.direction;
                    }
                }
            }
            
            components.push(compData);
        });
        
        return { size, components };
    }

    /**
     * Serializa o estado atual para salvamento
     */
    serialize() {
        // Garante que temos os valores mais recentes do DOM
        this.saveCurrentValues();
        
        return {
            systemSize: this.systemSize,
            components: this.components,
            componentCounter: this.componentCounter
        };
    }

    /**
     * Restaura o estado a partir de dados salvos
     * @param {object} data - Dados recuperados do StateManager
     */
    deserialize(data) {
        if (!data || !data.systemSize) return;

        this.systemSize = data.systemSize;
        this.components = data.components || [];
        this.componentCounter = data.componentCounter || 0;

        // Atualiza o input de tamanho do sistema na UI
        const sizeInput = document.getElementById('system-size');
        if (sizeInput) {
            sizeInput.value = this.systemSize;
        }

        // Reconstrói a interface
        this.renderMeshesNodes();
        
        // Não precisamos chamar renderAllComponents aqui pois renderMeshesNodes
        // já chama renderAllComponents internamente no final?
        // Verificando: renderMeshesNodes apenas cria os containers.
        // Quem chama renderAllComponents normalmente é quem usa a classe, ou eventos.
        // Vamos forçar a renderização dos componentes.
        this.renderAllComponents();
    }
}

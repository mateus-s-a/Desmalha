/**
 * Mode Toggle Component
 * Switches between Component Input Mode and Matrix Input Mode
 */

export class ModeToggle {
    constructor(containerId, onModeChange) {
        this.container = document.getElementById(containerId);
        this.currentMode = 'components'; // 'components' or 'matrix'
        this.onModeChange = onModeChange;
    }

    render() {
        this.container.innerHTML = `
            <div class="mode-toggle-wrapper" style="margin-bottom: 20px;">
                <div class="card" style="padding: 15px; background: linear-gradient(135deg, #1d7ad0 0%, #91ade2 100%); color: white;">
                    <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 15px;">
                        <div>
                            <h3 style="color: white; margin: 0; font-size: 1.1em;">
                                <i class="fa-solid fa-toggle-on"></i> Modo de Entrada
                            </h3>
                            <p style="margin: 5px 0 0 0; font-size: 0.9em; opacity: 0.9;">
                                Escolha como deseja inserir os dados do circuito
                            </p>
                        </div>
                        <div class="toggle-buttons" style="display: flex; gap: 10px;">
                            <button 
                                class="btn btn-mode" 
                                id="mode-components" 
                                data-mode="components"
                                style="background: white; color: #1d7ad0; font-weight: bold; border: 2px solid white;"
                            >
                                <i class="fa-solid fa-puzzle-piece"></i> Componentes
                            </button>
                            <button 
                                class="btn btn-mode" 
                                id="mode-matrix" 
                                data-mode="matrix"
                                style="background: transparent; color: white; border: 2px solid white;"
                            >
                                <i class="fa-solid fa-table"></i> Matriz Direta
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.attachEvents();
        this.updateActiveButton();
    }

    attachEvents() {
        const buttons = document.querySelectorAll('.btn-mode');
        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                const mode = btn.getAttribute('data-mode');
                this.setMode(mode);
            });
        });
    }

    setMode(mode) {
        if (this.currentMode === mode) return;
        
        this.currentMode = mode;
        this.updateActiveButton();
        
        if (this.onModeChange) {
            this.onModeChange(mode);
        }
    }

    updateActiveButton() {
        const buttons = document.querySelectorAll('.btn-mode');
        buttons.forEach(btn => {
            const btnMode = btn.getAttribute('data-mode');
            if (btnMode === this.currentMode) {
                // Active style
                btn.style.background = 'white';
                btn.style.color = '#1d7ad0';
                btn.style.fontWeight = 'bold';
            } else {
                // Inactive style
                btn.style.background = 'transparent';
                btn.style.color = 'white';
                btn.style.fontWeight = 'normal';
            }
        });
    }

    getCurrentMode() {
        return this.currentMode;
    }
}

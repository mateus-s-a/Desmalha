export class GraphVisualizationComponent {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
    }
    render() {
        if(this.container) this.container.innerHTML = "<p>Visualização Gráfica (Em Breve)</p>";
    }
}

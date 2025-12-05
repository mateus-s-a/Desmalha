# Documentação Técnica - Desmalha

## Arquitetura do Projeto

### Visão Geral
O projeto Desmalha é uma aplicação web estática construída com arquitetura modular em JavaScript ES6+, seguindo princípios de separação de responsabilidades e escalabilidade.

## Estrutura de Módulos

### 1. Core Modules (`assets/js/modules/`)

#### `matrix-operations.js`
**Responsabilidade**: Resolver sistemas lineares usando Eliminação Gaussiana.

```javascript
class MatrixSolver {
    static solve(A, B) // Resolve Ax = B
    static printMatrix(M) // Debug helper
}
```

**Algoritmo**:
- Forward elimination com pivotamento parcial
- Backward substitution
- Detecção de matrizes singulares

#### `mesh-analysis.js`
**Responsabilidade**: Implementar a análise de malhas (LTK).

```javascript
class MeshAnalyzer {
    solve(numMeshes, components)
    // Retorna: { currents, matrix, vector }
}
```

**Lógica**:
- Constrói matriz de resistências [R]
- Constrói vetor de tensões [V]
- Resolve [R][I] = [V]

#### `nodal-analysis.js`
**Responsabilidade**: Implementar a análise nodal (LCK).

```javascript
class NodalAnalyzer {
    solve(numNodes, components)
    // Retorna: { voltages, matrix, vector }
}
```

**Lógica**:
- Constrói matriz de condutâncias [G]
- Constrói vetor de correntes [I]
- Resolve [G][V] = [I]
- **Suporte a direção de fontes de corrente** (v1.1):
  - `direction: 'entering'` → I positiva no primeiro nó
  - `direction: 'leaving'` → I negativa no primeiro nó

### 2. UI Components (`assets/js/components/`)

#### `circuit-input.js`
**Responsabilidade**: Gerenciar entrada de dados do usuário.

**Arquitetura Escalável**:
```javascript
class CircuitInput {
    constructor(containerId, type) // 'mesh' ou 'nodal'
    
    render() // Renderiza interface
    
    addComponent(type) // Adiciona resistor/fonte
    // Usa data-type attribute para tipagem robusta
    
    clearComponents() // Nova funcionalidade v1.1
    
    getData() // Extrai dados estruturados
    
    attachEvents() // Fácil adicionar novos botões
}
```

**Padrão para Adicionar Novos Botões**:
1. Adicionar HTML do botão em `render()`:
```javascript
<button class="btn btn-{style}" id="new-action">
    <i class="fa-solid fa-icon"></i> Texto
</button>
```

2. Registrar evento em `attachEvents()`:
```javascript
document.getElementById('new-action').onclick = () => this.newAction();
```

3. Implementar método:
```javascript
newAction() {
    // Lógica da nova funcionalidade
}
```

#### `results-display.js`
**Responsabilidade**: Exibir resultados formatados.

```javascript
class ResultsDisplay {
    showResults(results, type)
    showError(msg)
}
```

### 3. Utilities (`assets/js/utils/`)

#### `constants.js`
Definições globais e configurações.

#### `helpers.js`
Funções auxiliares reutilizáveis:
- `formatNumber()`: Formatação numérica
- `generateId()`: IDs únicos
- `loadTemplate()`: Carregamento dinâmico

#### `error-handler.js`
Gestão centralizada de erros.

## Fluxo de Dados

### Análise Nodal com Direção de Fonte

```
┌─────────────────────────────────────────────────────┐
│ 1. Usuário adiciona fonte de corrente 2A (1,2)     │
│    Direction: "entering"                            │
└──────────────────┬──────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────┐
│ 2. CircuitInput.getData() extrai:                  │
│    {                                                │
│      type: 'current_source',                       │
│      value: 2,                                     │
│      nodes: [1, 2],                                │
│      direction: 'entering'                         │
│    }                                               │
└──────────────────┬──────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────┐
│ 3. NodalAnalyzer.solve() processa:                 │
│    if (direction === 'entering') {                 │
│        I[node1-1] += value  // I[0] = +2          │
│        I[node2-1] -= value  // I[1] = -2          │
│    }                                               │
└──────────────────┬──────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────┐
│ 4. MatrixSolver.solve([G], [I]) calcula [V]       │
└──────────────────┬──────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────┐
│ 5. ResultsDisplay.showResults() exibe resultados   │
└─────────────────────────────────────────────────────┘
```

## Convenções de Código

### Nomenclatura
- **Classes**: PascalCase (`MeshAnalyzer`)
- **Métodos/Funções**: camelCase (`addComponent`)
- **Constantes**: UPPER_SNAKE_CASE (`COMPONENT_TYPES`)
- **Arquivos**: kebab-case (`circuit-input.js`)

### Estrutura de Componentes
```javascript
{
    type: 'resistor' | 'voltage_source' | 'current_source',
    value: number,
    nodes: [number, number],      // Para nodal
    meshes: [number] | [number, number],  // Para mesh
    direction?: 'entering' | 'leaving' | 'clockwise' | 'counter'
}
```

## Estilização (CSS)

### Classes de Botões Disponíveis
```css
.btn-primary   /* Azul principal - Ações principais */
.btn-secondary /* Azul suave - Ações secundárias */
.btn-accent    /* Dourado - Destaque/Remover */
.btn-danger    /* Vermelho - Ações destrutivas */
```

### Padrão para Novos Estilos
1. Definir variável em `:root` (style.css)
2. Criar classe de componente (components.css)
3. Adicionar responsividade (responsive.css)

## Extensibilidade

### Como Adicionar um Novo Método de Análise

1. **Criar módulo**: `assets/js/modules/new-analysis.js`
```javascript
export class NewAnalyzer {
    solve(params, components) {
        // Lógica de análise
        return { results, matrix, vector };
    }
}
```

2. **Criar página**: `pages/new-calculator.html`
```html
<script type="module">
    import { CircuitInput } from '../assets/js/components/circuit-input.js';
    import { NewAnalyzer } from '../assets/js/modules/new-analysis.js';
    // ...
</script>
```

3. **Atualizar navegação**: Adicionar link no navbar

### Como Adicionar Validação

Editar `assets/js/modules/circuit-validator.js`:
```javascript
static validateNewAnalysis(params, components) {
    // Lógica de validação
    return { valid: boolean, message: string };
}
```

## Testes (Estrutura Preparada)

```
tests/
├── unit/                    # Testes unitários
│   ├── mesh-analysis.test.js
│   ├── nodal-analysis.test.js
│   └── matrix-operations.test.js
└── integration/             # Testes de integração
    └── circuit-solver.test.js
```

**Framework sugerido**: Jest ou Mocha

## Performance

- **ES6 Modules**: Carregamento lazy e tree-shaking
- **CDN**: FontAwesome via CDN para cache global
- **No dependencies**: Lógica matemática nativa (sem Math.js pesado)

## Segurança

- **Frontend-only**: Sem exposição de backend
- **Input validation**: Previne NaN e valores inválidos
- **Singular matrix detection**: Evita crashes em sistemas mal condicionados

## Arquitetura do Modo Matriz (v1.2)

### Componentes Adicionados

#### `matrix-parser.js` (Utils)
**Responsabilidade**: Parser e validador de matrizes aumentadas.

```javascript
class MatrixParser {
    static parse(text) // String → {matrix, vector, size}
    static validate(matrix, vector) // Valida dimensões
    static format(matrix, vector) // Formata para display
    static getExample(type) // Retorna exemplo
}
```

**Validações:**
- Formato matriz aumentada [A|B] → n×(n+1)
- Detecção de valores não numéricos
- Validação de dimensões consistentes
- Detecção de matriz singular (zeros)

#### `matrix-input.js` (Component)
**Responsabilidade**: Interface de entrada de matriz.

```javascript
class MatrixInput {
    render() // Textarea + botões
    loadExample() // Carrega exemplo
    clearMatrix() // Limpa entrada
    updatePreview() // Preview em tempo real
    getData() // Retorna {matrix, vector, size}
}
```

**Features:**
- Preview com validação visual (cores)
- Botões: Exemplo, Limpar, Calcular
- Feedback instantâneo de erros

#### `mode-toggle.js` (Component)
**Responsabilidade**: Alternância entre modos.

```javascript
class ModeToggle {
    render() // Botões de toggle
    setMode(mode) // Altera modo
    getCurrentMode() // Retorna modo atual
}
```

**Design:**
- Gradiente visual atrativo
- Feedback de estado ativo/inativo
- Callback para mudança de modo

### Fluxo de Dados - Modo Matriz

```
┌─────────────────────────────────────────────────────┐
│ 1. Usuário insere matriz no textarea               │
│    50 0 0 35                                        │
│    0 110 -45 -25                                    │
└──────────────────┬──────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────┐
│ 2. MatrixParser.parse() processa:                  │
│    - Split por linhas e espaços                    │
│    - Convert to float                              │
│    - Separa [A] e [B]                              │
│    Output: {matrix: [[...]], vector: [...]}       │
└──────────────────┬──────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────┐
│ 3. MatrixParser.validate() verifica:               │
│    - Dimensões corretas (n × n+1)                  │
│    - Valores numéricos válidos                     │
│    - Matriz não-singular                           │
└──────────────────┬──────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────┐
│ 4. MatrixSolver.solve([A], [B])                    │
│    Resolução direta (bypass de analyzers)          │
└──────────────────┬──────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────┐
│ 5. ResultsDisplay.showResults()                    │
└─────────────────────────────────────────────────────┘
```

### Integração com Páginas

Ambas as calculadoras (mesh/nodal) agora suportam:

```javascript
// Variável de estado global
let currentMode = 'components'; // ou 'matrix'
let currentInput = null; // CircuitInput ou MatrixInput

// Função de alternância
function switchMode(mode) {
    if (mode === 'components') {
        currentInput = new CircuitInput(...);
        // Anexar evento solve-btn
    } else {
        currentInput = new MatrixInput(...);
        // Anexar evento solve-matrix-btn
    }
}

// Resolução baseada no modo
function solve() {
    if (currentMode === 'components') {
        // Usa MeshAnalyzer/NodalAnalyzer
    } else {
        // Usa MatrixSolver diretamente
    }
}
```

## Changelog

### v1.2 (Atual)
- ✅ Modo Matriz Direta (entrada de sistema linear)
- ✅ Parser inteligente com validação
- ✅ Toggle visual entre modos
- ✅ Preview em tempo real
- ✅ Exemplos pré-carregados

### v1.1
- ✅ Suporte a direção de fontes de corrente (Nodal)
- ✅ Botão "Limpar Tudo"
- ✅ Arquitetura escalável para novos botões
- ✅ Atributo `data-type` para tipagem robusta
- ✅ Manual do usuário completo

### v1.0
- ✅ Análise de Malhas funcional
- ✅ Análise Nodal funcional
- ✅ Interface responsiva
- ✅ Visualização de matrizes

## Roadmap Futuro

- [ ] Editor gráfico de circuitos (drag-and-drop)
- [ ] Exportar resultados para PDF/JSON
- [ ] Salvar/Carregar circuitos (localStorage)
- [ ] Suporte a componentes reativos (AC analysis)
- [ ] Visualização de grafos (Cytoscape.js)
- [ ] Temas escuro/claro
- [ ] Internacionalização (i18n)

---

&copy; 2025 Desmalha Project - Documentação Técnica

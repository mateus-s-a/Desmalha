# Guia Rápido de Desenvolvimento - Desmalha

## 🚀 Início Rápido (5 minutos)

### 1. Estrutura do Projeto
```
Desmalha/
├── index.html                    ← Página inicial
├── pages/                        ← Calculadoras
│   ├── mesh-calculator.html      ← Análise de Malhas
│   └── nodal-calculator.html     ← Análise Nodal
├── assets/
│   ├── css/                      ← Estilos
│   │   ├── style.css             ← Base
│   │   ├── components.css        ← Componentes UI
│   │   └── responsive.css        ← Mobile
│   └── js/
│       ├── app.js                ← Inicialização
│       ├── modules/              ← Lógica de negócio
│       │   ├── mesh-analysis.js
│       │   ├── nodal-analysis.js
│       │   └── matrix-operations.js
│       ├── components/           ← UI Components
│       │   ├── circuit-input.js  ← Entrada de dados
│       │   └── results-display.js← Resultados
│       └── utils/                ← Utilitários
└── docs/                         ← Você está aqui!
```

---

## 🎨 Paleta de Cores

```css
--primary-color: #1d7ad0;    /* Azul principal - Ações primárias */
--secondary-color: #91ade2;  /* Azul suave - Ações secundárias */
--bg-color: #e0f1ff;         /* Fundo claro */
--accent-color: #daa21b;     /* Dourado - Destaques */
```

**Classes de botões disponíveis:**
- `.btn-primary` - Azul (#1d7ad0) - Calcular, Confirmar
- `.btn-secondary` - Azul claro (#91ade2) - Adicionar componentes
- `.btn-accent` - Dourado (#daa21b) - Remover individual
- `.btn-danger` - Vermelho (#dc3545) - Limpar tudo, deletar

---

## 🔧 Casos de Uso Comuns

### Caso 1: Adicionar um Novo Botão

**Arquivo:** `assets/js/components/circuit-input.js`

```javascript
// 1. No método render(), adicione o HTML do botão:
<button class="btn btn-{estilo}" id="meu-botao">
    <i class="fa-solid fa-{icone}"></i> Texto
</button>

// 2. No método attachEvents(), registre o evento:
document.getElementById('meu-botao').onclick = () => this.minhaFuncao();

// 3. Implemente o método:
minhaFuncao() {
    // Sua lógica aqui
    console.log('Botão clicado!');
}
```

**Tempo estimado:** 3-5 minutos

---

### Caso 2: Adicionar um Novo Tipo de Componente

**Exemplo:** Adicionar "Indutor"

**Passo 1:** Atualizar constantes
```javascript
// assets/js/utils/constants.js
COMPONENT_TYPES: {
    RESISTOR: 'resistor',
    VOLTAGE_SOURCE: 'voltage_source',
    CURRENT_SOURCE: 'current_source',
    INDUTOR: 'indutor'  // ← Novo
}
```

**Passo 2:** Modificar `addComponent()`
```javascript
// assets/js/components/circuit-input.js
addComponent(type) {
    // ... código existente ...
    
    if (type === 'indutor') {
        // Lógica específica para indutor
        valueLabel = 'Indutância (H)';
    }
    
    div.setAttribute('data-type', type);
    // ... resto do código ...
}
```

**Passo 3:** Atualizar lógica de análise
```javascript
// assets/js/modules/mesh-analysis.js (ou nodal)
if (comp.type === 'indutor') {
    // Processar indutor
}
```

---

### Caso 3: Adicionar Validação

**Arquivo:** `assets/js/modules/circuit-validator.js`

```javascript
static validateNodalInput(size, components) {
    // Validação de tamanho
    if (size < 2) {
        return { valid: false, message: "Mínimo 2 nós." };
    }
    
    // Validação de componentes vazios
    if (components.length === 0) {
        return { valid: false, message: "Adicione componentes." };
    }
    
    // Validação customizada
    const hasGroundConnection = components.some(c => 
        c.nodes.includes(0)
    );
    if (!hasGroundConnection) {
        return { valid: false, message: "Conecte ao menos um nó ao terra (0)." };
    }
    
    return { valid: true };
}
```

**Uso na página:**
```javascript
// pages/nodal-calculator.html
import { CircuitValidator } from '../assets/js/modules/circuit-validator.js';

document.getElementById('solve-btn').addEventListener('click', () => {
    const data = input.getData();
    const validation = CircuitValidator.validateNodalInput(data.size, data.components);
    
    if (!validation.valid) {
        alert(validation.message);
        return;
    }
    
    // Prosseguir com cálculo...
});
```

---

### Caso 4: Salvar/Carregar Circuito

**Salvar (localStorage):**
```javascript
saveCircuit() {
    const data = this.getData();
    const circuitName = prompt('Nome do circuito:');
    if (circuitName) {
        const circuits = JSON.parse(localStorage.getItem('desmalha_circuits') || '{}');
        circuits[circuitName] = data;
        localStorage.setItem('desmalha_circuits', JSON.stringify(circuits));
        alert('Circuito salvo!');
    }
}
```

**Carregar:**
```javascript
loadCircuit() {
    const circuits = JSON.parse(localStorage.getItem('desmalha_circuits') || '{}');
    const names = Object.keys(circuits);
    
    if (names.length === 0) {
        alert('Nenhum circuito salvo.');
        return;
    }
    
    const selected = prompt(`Circuitos salvos:\n${names.join('\n')}\n\nDigite o nome:`);
    if (selected && circuits[selected]) {
        this.loadData(circuits[selected]);
    }
}

loadData(data) {
    document.getElementById('system-size').value = data.size;
    // Recriar componentes...
}
```

---

### Caso 5: Exportar Resultados para JSON

```javascript
exportResults(results, type) {
    const exportData = {
        type: type,
        timestamp: new Date().toISOString(),
        results: results.currents || results.voltages,
        matrix: results.matrix,
        vector: results.vector
    };
    
    const json = JSON.stringify(exportData, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `desmalha-${type}-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
}
```

---

## 🧪 Testar Localmente

### Opção 1: Servidor Python
```bash
python -m http.server 8000
# Abra: http://localhost:8000
```

### Opção 2: Servidor Node.js
```bash
npx http-server -p 8000
# Abra: http://localhost:8000
```

### Opção 3: Live Server (VS Code)
1. Instale extensão "Live Server"
2. Clique direito em `index.html`
3. Selecione "Open with Live Server"

---

## 🐛 Debugging

### Console do Navegador
```javascript
// Verificar se módulos carregaram
console.log('App initialized');

// Debug de matriz
import { MatrixSolver } from './matrix-operations.js';
MatrixSolver.printMatrix(matrix); // Imprime no console
```

### Validação de Entrada
```javascript
// Em circuit-input.js, adicione logs:
getData() {
    const data = { size, components };
    console.log('Circuit Data:', data);
    return data;
}
```

### Verificar Resultados
```javascript
// Em mesh-analysis.js ou nodal-analysis.js:
solve(num, comps) {
    console.log('Input:', { num, comps });
    const results = MatrixSolver.solve(G, I);
    console.log('Results:', results);
    return { voltages: results, matrix: G, vector: I };
}
```

---

## 📦 Checklist de Deploy

Antes de publicar:

- [ ] Testado em Chrome, Firefox, Safari
- [ ] Responsivo em mobile (DevTools)
- [ ] Console sem erros
- [ ] Todas as calculadoras funcionando
- [ ] Links de navegação corretos
- [ ] README.md atualizado
- [ ] CHANGELOG.md atualizado

---

## 🎯 Tarefas Rápidas (< 30 min)

### Fácil (5-10 min)
- [ ] Adicionar botão "Resetar Sistema" (limpa campo de tamanho)
- [ ] Mudar cor do tema
- [ ] Adicionar ícones diferentes
- [ ] Criar footer com links sociais

### Médio (15-30 min)
- [ ] Validação avançada de entrada
- [ ] Botão "Exportar JSON"
- [ ] Botão "Importar JSON"
- [ ] Modo escuro (toggle)

### Avançado (1-2 horas)
- [ ] Salvar em localStorage
- [ ] Histórico de cálculos
- [ ] Gráficos com Chart.js
- [ ] Tutorial interativo

---

## 💡 Dicas Profissionais

### Performance
- ✅ Use `const` e `let` ao invés de `var`
- ✅ Evite manipulação excessiva do DOM
- ✅ Cache seletores DOM frequentes

### Organização
- ✅ Um arquivo = Uma responsabilidade
- ✅ Funções pequenas (< 30 linhas)
- ✅ Comentários em lógica complexa

### Git
```bash
# Commits descritivos
git commit -m "feat: adicionar botão de exportação JSON"
git commit -m "fix: corrigir validação de nós"
git commit -m "docs: atualizar README com exemplos"
```

---

## 📞 Recursos Úteis

- [MDN Web Docs](https://developer.mozilla.org/) - Referência JavaScript
- [FontAwesome Icons](https://fontawesome.com/icons) - Ícones gratuitos
- [CSS-Tricks](https://css-tricks.com/) - Dicas de CSS
- [Can I Use](https://caniuse.com/) - Compatibilidade de browsers

---

## 🆘 Problemas Comuns

### Erro: "Cannot find module"
**Causa:** Caminho relativo incorreto em `import`
**Solução:** Verifique caminhos (../ para subir diretório)

### Erro: "CORS policy"
**Causa:** Tentando carregar arquivos locais sem servidor
**Solução:** Use um servidor local (Python, Node.js, etc.)

### Botão não funciona
**Causa:** Evento não registrado ou ID incorreto
**Solução:** Verifique se `getElementById` encontra o elemento

---

**Pronto para começar?** Abra `circuit-input.js` e comece a adicionar sua primeira funcionalidade! 🚀

&copy; 2025 Desmalha Project

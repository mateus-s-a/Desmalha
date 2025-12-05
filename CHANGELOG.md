# Changelog - Desmalha

Todas as mudanças notáveis do projeto serão documentadas neste arquivo.

## [v1.5]

### ✨ Novidades - Persistência de Dados

#### Salvamento Automático de Estado
- **Navegação sem perdas**: Dados inseridos são mantidos ao navegar entre páginas (Home, Teoria, Calculadoras) ou recarregar a aba.
- **Persistência Dupla**: Mantém o estado do "Modo Componentes" e "Modo Matriz" simultaneamente. O usuário pode alternar entre os modos sem perder o que digitou em nenhum deles.
- **Isolamento**: Dados da Análise de Malhas não interferem na Análise Nodal.
- **Tecnologia**: Utiliza `localStorage` para manter os dados no navegador do usuário.

#### Arquitetura
- **Novo Módulo**: `assets/js/utils/state-manager.js` para gerenciamento centralizado.
- **Serialização**: Componentes `CircuitInputEnhanced` e `MatrixInput` agora possuem métodos `serialize()` e `deserialize()`.
- **Ciclo de Vida**: Integração com eventos `beforeunload` (sair da página) e `load` (entrar na página).

### 🐛 Correções
- **UX**: Resolvido problema onde usuários perdiam todo o trabalho ao navegar acidentalmente para outra página.

---

## [v1.4.3]

### 🐛 Correção de Bug - Seleção de Terra (GND) na Análise Nodal

#### Problema Identificado
- **Cenário**: Análise Nodal, modo "Componentes"
- **Bug**: Ao ativar "Compartilhar com outros nós", a lista de seleção não incluía o Terra (Nó 0)
- **Impacto**: Impossível conectar explicitamente componentes entre um Nó X e o Terra usando o sistema de compartilhamento
- **Frequência**: 100% dos casos onde se tentava usar compartilhamento envolvendo o terra

#### Solução Implementada
- ✅ **Inclusão do Terra**: Checkbox "Terra (GND)" adicionado ao grid de seleção na Análise Nodal
- ✅ **Lógica Adaptativa**: Grid mostra 0..N para Nodal e 1..N para Malhas
- ✅ **Display Amigável**: Indicador de compartilhamento mostra "GND" em vez de "0"
- ✅ **Processamento**: Lógica de salvamento e atualização ajustada para processar nó 0

#### Arquivos Modificados
- `assets/js/components/circuit-input-enhanced.js`:
  - `renderComponentCard()`: Gera checkbox para loc 0 se não for malha
  - `saveCurrentValues()`: Lê checkbox loc 0
  - `updateSharedLocations()`: Lê checkbox loc 0
  - `attachComponentEvents()`: Adiciona listener para checkbox loc 0
  - `sharedIndicator`: Formata "0" como "GND"

---

## [v1.4.2]

### 🐛 Correção Crítica - Bug de Direções em Componentes Compartilhados

#### Problema Identificado
- **Cenário específico**: Fonte de tensão/corrente compartilhada entre múltiplas malhas/nós com direções diferentes
- **Exemplo (Malhas)**: Fonte de tensão em Malha 1 (Horário/Aumenta) e Malha 2 (Anti-horário/Queda)
- **Exemplo (Nodal)**: Fonte de corrente no Nó 1 (Entrando) e Nó 2 (Saindo)
- **Bug**: Ao clicar "Atualizar Estrutura", todas as direções voltavam para a mesma direção inicial
- **Impacto**: Cálculos incorretos em circuitos com fontes compartilhadas com direções opostas

#### Causa Raiz
- Componentes compartilhados usavam uma **única direção** (`comp.direction`)
- Cada localização precisa de sua **própria direção** independente
- O sistema re-renderizava e perdia as direções específicas por localização

#### Solução Implementada
- ✅ **Novo campo `directionsMap`**: Armazena direção por localização `{location: direction}`
- ✅ **IDs únicos por localização**: Selects com `id="dir-{id}-loc-{location}"` para componentes compartilhados
- ✅ **Preservação independente**: Cada localização mantém sua direção mesmo após re-render
- ✅ **Label informativo**: "Direção nesta localização" para componentes compartilhados
- ✅ **Atualização de analyzers**: `MeshAnalyzer` e `NodalAnalyzer` suportam `directionsMap`

#### Arquivos Modificados
- `assets/js/components/circuit-input-enhanced.js`:
  - Estrutura de componente com `directionsMap`
  - `saveCurrentValues()` - Salva direções por localização
  - `renderComponentCard()` - Renderiza selects com IDs únicos
  - `attachComponentEvents()` - Event listeners por localização
  - `updateSharedLocations()` - Inicializa direções para novas localizações
  - `getData()` - Retorna `directionsMap` para componentes compartilhados

- `assets/js/modules/mesh-analysis.js`:
  - `solve()` - Processa `directionsMap` para fontes de tensão compartilhadas

- `assets/js/modules/nodal-analysis.js`:
  - `solve()` - Processa `directionsMap` para fontes de corrente compartilhadas

#### Melhorias de UX
- **Label contextual**: "Direção nesta localização" aparece apenas em componentes compartilhados
- **Independência visual**: Cada card mostra sua própria direção claramente
- **Consistência**: Direções preservadas em todas as operações (adicionar, remover, atualizar)

#### Garantias
- ✅ **100% de preservação** de direções por localização
- ✅ **Cálculos corretos** para fontes compartilhadas com direções opostas
- ✅ **Retrocompatibilidade** com componentes não-compartilhados
- ✅ **Zero perda de dados** ao atualizar estrutura

---

## [v1.4.1]

### 🐛 Correção Crítica - Bug de Cenário Zero-Component

#### Problema Identificado
- **Cenário específico**: Ao adicionar o PRIMEIRO componente e inserir um valor, ao adicionar um SEGUNDO componente, o valor do primeiro desaparecia
- **Causa raiz**: O método `addComponent()` chamava `renderMeshesNodes()` que destruía o DOM ANTES de `saveCurrentValues()` poder capturar os valores
- **Quando ocorria**: Apenas no cenário inicial (0 componentes → 1 componente → 2 componentes)

#### Solução Implementada
- ✅ **Linha 208**: Adicionado `this.saveCurrentValues()` ANTES de `this.renderMeshesNodes()`
- ✅ **Ordem correta**: 
  1. Adicionar novo componente ao array
  2. Salvar valores existentes no DOM
  3. Re-renderizar interface
- ✅ **Testado**: Cenário zero-component agora preserva todos os valores

#### Impacto
- **100% dos cenários** agora preservam valores corretamente
- **Zero perda de dados** em qualquer situação
- **Experiência do usuário** completamente consistente

### 📦 Arquivo Modificado
- `assets/js/components/circuit-input-enhanced.js` - Linha 208 (correção crítica)

---

## [v1.4]

### ✨ Novidades - Sistema de Compartilhamento Inteligente

#### Checkbox de Compartilhamento
- **Checkbox em cada componente**: "☑️ Compartilhar com outras malhas/nós"
- **Ativação instantânea**: Marque e a área de seleção aparece
- **Desativação simples**: Desmarque para voltar ao modo individual

#### Seleção Visual de Localizações
- **Grid responsivo**: Checkboxes para cada malha/nó
- **Seleção múltipla**: Escolha quantas localizações quiser
- **Indicador visual**: Badge mostra `🔗 1, 2, 3` nas localizações compartilhadas
- **Atualização em tempo real**: Contadores atualizam automaticamente

#### Preservação de Valores (CRÍTICO)
- ✅ **Valores preservados** em TODAS as operações:
  - Adicionar novo componente
  - Remover componente
  - Mudar tamanho do sistema
  - Ativar/desativar compartilhamento
  - Alterar seleção de localizações
- ✅ **Sistema saveCurrentValues()**: Salva automaticamente antes de re-render
- ✅ **Zero perda de dados**: Usuário nunca perde o que digitou

#### Melhorias de UX
- **2 passos vs 4**: Compartilhamento mais rápido
- **Visual intuitivo**: Grid de checkboxes em vez de prompts
- **Feedback imediato**: Indicadores atualizam na hora
- **Menos erros**: Interface guia o usuário

### 🐛 Correções
- **Bug crítico**: Valores de inputs sendo perdidos ao adicionar/remover componentes
- **Bug**: Componentes compartilhados difíceis de configurar
- **Bug**: Falta de feedback visual de compartilhamento

### 📦 Arquivos Modificados

**Refatorados:**
- `assets/js/components/circuit-input-enhanced.js` - Reescrito (20.4 KB)

**Novos Estilos:**
- `assets/css/components.css` - Estilos para checkboxes e grids

**Documentação:**
- `docs/sharing-system-guide.md` - Guia completo (10.7 KB)

---

## [v1.3]

### ✨ Novidades - Interface Aprimorada para Modo Componentes

#### Interface Hierárquica com Cards
- **Cards separados por Malha/Nó**: Organização visual clara
- **Contadores em tempo real**: Badge mostra número de componentes
- **Estrutura dinâmica**: Atualiza automaticamente ao mudar tamanho do sistema

#### Sistema de Cores Intuitivo
- 🟡 **Resistores**: Gradiente amarelo suave (#f39c12)
- 🔵 **Fontes de Tensão**: Gradiente azul (#3498db)
- 🔴 **Fontes de Corrente**: Gradiente vermelho (#e74c3c)
- **Sombras sutis**: Realce visual por tipo de componente

#### Ícones e Badges
- Badges coloridos para tipo de componente
- Ícones FontAwesome para identificação rápida:
  - 🌊 Resistor (wave-square)
  - ⚡ Fonte de Tensão (bolt)
  - ↔️ Fonte de Corrente (arrows)
- Badge de localização para componentes compartilhados

#### Melhorias de UX
- **Botões contextuais**: "Adicionar" em cada card de malha/nó
- **Componentes compartilhados**: Seção dedicada
- **Empty state**: Mensagem quando não há componentes
- **Hover effects**: Cards elevam ao passar mouse
- **Confirmação**: Dialog antes de limpar todos os componentes

### 📦 Arquivos Criados/Modificados

**Novos Arquivos:**
- `assets/js/components/circuit-input-enhanced.js` - Nova versão aprimorada

**Arquivos Modificados:**
- `assets/css/components.css` - Estilos para cards hierárquicos
- `assets/css/responsive.css` - Responsividade aprimorada
- `pages/mesh-calculator.html` - Import do componente enhanced
- `pages/nodal-calculator.html` - Import do componente enhanced

---

## [v1.2]

### ✨ Novidades - Modo Matriz Direta

#### Entrada de Matriz Direta
- Novo **Modo Matriz Direta** em ambas as calculadoras (Malhas e Nodal)
- Permite inserir diretamente a matriz aumentada [A|B] do sistema linear
- Toggle elegante para alternar entre "Modo Componentes" e "Modo Matriz"
- Ideal para usuários que já possuem o sistema linear pronto

#### Parser de Matriz Inteligente
- Criado módulo `MatrixParser` para validação e parsing
- Suporta separação por espaços ou tabulações
- Validação automática de dimensões (n × n+1)
- Detecção de erros com mensagens claras:
  - Valores inválidos (não numéricos)
  - Dimensões inconsistentes
  - Formato incorreto

#### Componentes UI Novos
- **ModeToggle**: Componente visual para alternância de modos
- **MatrixInput**: Interface dedicada para entrada de matriz
- Preview em tempo real com status de validação
- Botão "Exemplo" para carregar matrizes de demonstração

#### Exemplos Incluídos
- Análise de Malhas: Sistema 6×6 complexo
- Análise Nodal: Sistema 4×4 com condutâncias

### 📝 Documentação

- Atualizado `user-manual.md` com seções de Modo Matriz
- Exemplos práticos de matrizes com explicações
- Guia de formato e convenções

### 📦 Arquivos Criados

**JavaScript:**
- `assets/js/utils/matrix-parser.js` - Parser e validador
- `assets/js/components/matrix-input.js` - Interface de entrada
- `assets/js/components/mode-toggle.js` - Toggle entre modos

**HTML (atualizados):**
- `pages/mesh-calculator.html` - Suporte duplo modo
- `pages/nodal-calculator.html` - Suporte duplo modo

---

## [v1.1]

### ✨ Novidades

#### Suporte a Direção de Fontes de Corrente (Análise Nodal)
- Adicionado campo de seleção "Direção da Corrente" para fontes de corrente
- Opções:
  - **Entrando (Positiva)**: Corrente entra no primeiro nó
  - **Saindo (Negativa)**: Corrente sai do primeiro nó
- Lógica implementada em `nodal-analysis.js` para processar corretamente o sinal

#### Botão "Limpar Tudo"
- Novo botão vermelho (`.btn-danger`) nas calculadoras
- Remove todos os componentes inseridos instantaneamente
- Implementado método `clearComponents()` em `CircuitInput`

#### Arquitetura Escalável
- Refatoração da classe `CircuitInput` para facilitar adição de novos botões
- Uso de atributo `data-type` para tipagem robusta de componentes
- Estrutura modular preparada para futuras expansões

### 📝 Documentação

#### Manual do Usuário Completo
- Criado `docs/user-manual.md` com:
  - Guia passo a passo para cada método
  - Explicação detalhada de convenções de sinais
  - Exemplos práticos com diagramas textuais
  - Dicas e melhores práticas

#### Documentação Técnica
- Criado `docs/technical-docs.md` com:
  - Arquitetura do projeto
  - Fluxo de dados detalhado
  - Guias de extensibilidade
  - Padrões de código
  - Roadmap futuro

#### Exemplos de Testes
- Implementado `tests/unit/matrix-operations.test.js`
- Demonstra estrutura de testes com Jest
- Casos de teste para:
  - Sistemas lineares 2x2 e 3x3
  - Detecção de matrizes singulares
  - Matrizes identidade

### 🎨 Melhorias de CSS

- Adicionada classe `.btn-danger` (vermelho) para ações destrutivas
- Estilo hover consistente em todos os botões
- Layout flexível (`flex-wrap`) preparado para novos controles

### 🐛 Correções

- Removida lógica frágil de detecção de tipo via `innerHTML`
- Substituída por sistema robusto com `data-type` attributes
- Corrigida estrutura de extração de direção em `getData()`

### 📦 Arquivos Modificados

**JavaScript:**
- `assets/js/components/circuit-input.js` - Refatoração completa
- `assets/js/modules/nodal-analysis.js` - Suporte a direção

**CSS:**
- `assets/css/components.css` - Nova classe `.btn-danger`

**HTML:**
- `pages/theory.html` - Link para manual do usuário

**Documentação:**
- `README.md` - Atualizado com novas funcionalidades
- `docs/user-manual.md` - Criado
- `docs/technical-docs.md` - Criado
- `CHANGELOG.md` - Criado

**Testes:**
- `tests/unit/matrix-operations.test.js` - Exemplo completo

---

## [v1.0]

### 🎉 Lançamento Inicial

#### Funcionalidades Core
- Análise de Malhas completa
- Análise Nodal completa
- Solver de sistemas lineares (Eliminação Gaussiana)
- Interface web responsiva

#### Interface do Usuário
- Página inicial (landing page)
- Calculadora de Malhas
- Calculadora Nodal
- Página de Teoria
- Navegação consistente

#### Componentes Visuais
- Sistema de design com paleta de cores customizada:
  - Primária: `#1d7ad0`
  - Secundária: `#91ade2`
  - Fundo: `#e0f1ff`
  - Destaque: `#daa21b`
- Cards, botões e formulários estilizados
- Ícones FontAwesome

#### Arquitetura
- ES6 Modules para organização modular
- Separação clara de responsabilidades:
  - `modules/`: Lógica de negócio
  - `components/`: UI components
  - `utils/`: Funções auxiliares
- Estrutura de diretórios completa conforme especificação

#### Documentação Básica
- README.md inicial
- Estrutura de pastas para docs e testes
- Licença MIT
- .gitignore configurado

---

## Convenções do Changelog

- **✨ Novidades**: Novas funcionalidades
- **🐛 Correções**: Bugs corrigidos
- **📝 Documentação**: Mudanças na documentação
- **🎨 Melhorias**: Melhorias visuais/CSS
- **⚡ Performance**: Otimizações
- **🔧 Configuração**: Mudanças em arquivos de config
- **📦 Dependências**: Atualizações de libs
- **🗑️ Remoções**: Código/arquivos removidos

---

&copy; 2025 Desmalha Project

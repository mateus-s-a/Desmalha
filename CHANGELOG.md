# Changelog - Desmalha

Todas as mudanças notáveis do projeto serão documentadas neste arquivo.

## [v1.2] - 2025-12-05

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

## [v1.1] - 2025-12-05

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

## [v1.0] - 2025-12-05

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

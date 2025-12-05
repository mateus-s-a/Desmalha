# Changelog - Desmalha

Todas as mudanças notáveis do projeto serão documentadas neste arquivo.

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

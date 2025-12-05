# Desmalha - Calculadora de Circuitos Elétricos

Bem-vindo ao **Desmalha**, uma ferramenta web estática para análise de circuitos elétricos DC utilizando os métodos de **Análise de Malhas** e **Análise Nodal**.

## 🚀 Funcionalidades

- **Análise de Malhas**: Cálculo de correntes de malha em circuitos planares com suporte a direção de fontes de tensão.
- **Análise Nodal**: Cálculo de tensões nodais com suporte a direção de fontes de corrente (entrando/saindo).
- **🆕 Dois Modos de Entrada Flexíveis**:
  - **Modo Componentes**: Interface intuitiva para adicionar componentes individuais
  - **Modo Matriz Direta**: Insira diretamente a matriz do sistema linear [A|B] para resolução rápida
- **Toggle Inteligente**: Alterne entre modos de entrada com um clique
- **Controles de Direção**: Configure a polaridade/direção das fontes para análise precisa.
- **Botão "Limpar Tudo"**: Remove rapidamente todos os componentes inseridos.
- **Validação em Tempo Real**: Parser inteligente valida formato e dimensões da matriz
- **Visualização de Matrizes**: Exibe a matriz do sistema linear gerado para fins educacionais.
- **Design Responsivo**: Interface moderna adaptada para computadores e dispositivos móveis.
- **Arquitetura Escalável**: Estrutura modular pronta para adicionar novos botões e funcionalidades.
- **✅ Preservação de Valores (v1.4.1)**: 100% de preservação de dados em TODOS os cenários, incluindo o cenário inicial (zero-component).
- **✅ Direções Independentes (v1.4.2)**: Componentes compartilhados suportam direções diferentes em cada localização (ex: fonte de tensão aumenta em uma malha e cai em outra).

## 📂 Estrutura de Diretórios

O projeto segue estritamente a estrutura organizada definida em `estrutura de diretórios.md`:

```
Desmalha/
├── index.html              # Página Inicial
├── assets/                 # Recursos estáticos
│   ├── css/                # Estilos (Paleta: #1d7ad0, #91ade2, #e0f1ff)
│   ├── js/                 # Lógica da aplicação (Modules, Components, Utils)
│   ├── img/                # Imagens
│   └── libs/               # Bibliotecas (Bootstrap/Math.js via CDN em produção)
├── pages/                  # Páginas funcionais (Calculadoras, Teoria)
├── templates/              # Modelos HTML
├── data/                   # Dados JSON
├── docs/                   # Documentação
└── tests/                  # Testes
```

## 🛠️ Tecnologias Utilizadas

- **HTML5 & CSS3**: Estrutura semântica e estilização moderna.
- **JavaScript (ES6+)**: Lógica modular sem frameworks pesados.
- **FontAwesome**: Ícones vetoriais.
- **Math.js / Algoritmo Próprio**: Resolução de sistemas lineares via Eliminação Gaussiana implementada nativamente em `matrix-operations.js`.

## 🎨 Paleta de Cores

- **Primária**: `#1d7ad0` (Azul Desmalha)
- **Secundária**: `#91ade2` (Azul Suave)
- **Fundo**: `#e0f1ff` (Azul Pálido)
- **Destaque**: `#daa21b` (Dourado/Aviso)

## 📖 Como Usar

1. Abra o arquivo `index.html` em seu navegador.
2. Navegue até a calculadora desejada (Malhas ou Nodal).
3. **Escolha o modo de entrada** usando o toggle no topo da página:

### 🧩 Modo Componentes
4. Defina o tamanho do sistema (número de malhas ou nós).
5. Adicione os componentes, especificando seus valores e conexões:
   - Para **Malhas**: 
     - Indique quais malhas o componente toca (ex: `1` para malha 1, ou `1,2` para compartilhado).
     - Para fontes de tensão, escolha a direção (horário/anti-horário) na malha principal.
   - Para **Nós**: 
     - Indique os nós de conexão (ex: `0,1` conecta terra ao nó 1, ou `1,2` entre nós).
     - Para fontes de corrente, escolha se a corrente está **entrando** (positiva) ou **saindo** (negativa) do primeiro nó.
6. Use o botão **"Limpar Tudo"** para resetar todos os componentes inseridos.
7. Clique em **Calcular** para ver as correntes ou tensões resultantes.

### 📊 Modo Matriz Direta
4. Insira a matriz aumentada [A|B] no campo de texto:
   - Para **Malhas**: [R|V] onde R = resistências, V = tensões
   - Para **Nodal**: [G|I] onde G = condutâncias, I = correntes
5. Separe os valores por espaços ou tabulações
6. Use o botão **"Exemplo"** para carregar uma matriz de demonstração
7. O sistema valida automaticamente o formato (matriz n×(n+1))
8. Clique em **Calcular** para resolver o sistema

## ⚠️ Notas de Desenvolvimento

- O projeto foi desenvolvido como um site estático (Frontend-only).
- Bibliotecas externas grandes foram referenciadas via CDN para otimização.
- A lógica de resolução matemática é executada inteiramente no navegador do cliente.

## 📋 Funcionalidades Implementadas (v1.4)

### ✅ Core Features
- [x] Análise de Malhas funcional
- [x] Análise Nodal funcional
- [x] Resolução de sistemas lineares (Eliminação Gaussiana)
- [x] Interface responsiva e moderna

### ✅ Modos de Entrada
- [x] **Modo Componentes** (v1.4 - NOVO Sistema de Compartilhamento):
  - Interface hierárquica com cards por malha/nó
  - Sistema de cores intuitivo (amarelo=resistor, azul=tensão, vermelho=corrente)
  - **☑️ Checkbox de compartilhamento** em cada componente
  - **Seleção visual** de múltiplas malhas/nós
  - **Preservação automática** de valores (zero perda de dados)
  - Badges e ícones para identificação rápida
  - Contadores em tempo real
  - Botões contextuais por malha/nó
- [x] **Modo Matriz Direta** (v1.2): 
  - Entrada de sistema linear [A|B] já montado
  - Parser inteligente com validação em tempo real
  - Exemplos pré-carregados
- [x] Toggle visual entre modos com um clique

### ✅ Controles de Direção
- [x] Fontes de Tensão: Direção horária/anti-horária (Malhas)
- [x] Fontes de Corrente: Entrando/Saindo do nó (Nodal)

### ✅ Usabilidade
- [x] Botão "Limpar Tudo" para reset rápido
- [x] Botões de remoção individual por componente
- [x] Visualização educacional de matrizes
- [x] Feedback visual de validação (verde/amarelo/vermelho)
- [x] Preview em tempo real (modo matriz)

### ✅ Arquitetura Escalável
- [x] Sistema modular com ES6 Modules
- [x] Tipagem robusta com `data-type` attributes
- [x] Estrutura preparada para novos botões e funcionalidades
- [x] Parser extensível para diferentes formatos
- [x] Documentação técnica completa

### ✅ Documentação
- [x] README.md com guia de uso
- [x] Manual do Usuário detalhado (com seção Modo Matriz)
- [x] Documentação Técnica com padrões de código
- [x] Guia de Exemplos de Matrizes com casos práticos
- [x] Exemplos de testes unitários

## 📚 Documentação Adicional

- [Manual do Usuário](docs/user-manual.md) - Guia completo com exemplos práticos
- [Documentação Técnica](docs/technical-docs.md) - Arquitetura e padrões de desenvolvimento
- [Página de Teoria](pages/theory.html) - Fundamentos teóricos de circuitos

## 🔮 Próximos Passos Sugeridos

1. Implementar sistema de salvamento de circuitos (localStorage)
2. Adicionar editor gráfico de circuitos (drag-and-drop)
3. Exportar resultados para PDF
4. Adicionar mais exemplos práticos
5. Implementar testes automatizados (Jest)

---
&copy; 2025 Desmalha Project. Distribuído sob a licença MIT.

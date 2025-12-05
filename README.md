# Desmalha - Calculadora de Circuitos Elétricos

> Uma ferramenta web estática para análise de circuitos elétricos CC (Corrente Contínua) utilizando os métodos de **Análise de Malhas** e **Análise Nodal**.

<br>

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

<br>

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

<br>

## 🛠️ Tecnologias Utilizadas

- **HTML5 & CSS3**: Estrutura semântica e estilização moderna.
- **JavaScript (ES6+)**: Lógica modular sem frameworks pesados.
- **FontAwesome**: Ícones vetoriais.
- **Math.js / Algoritmo Próprio**: Resolução de sistemas lineares via Eliminação Gaussiana implementada nativamente em `matrix-operations.js`.

<br>

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

<br>

## ⚠️ Notas de Desenvolvimento

- O projeto foi desenvolvido como um site estático (Frontend-only).
- Bibliotecas externas grandes foram referenciadas via CDN para otimização.
- A lógica de resolução matemática é executada inteiramente no navegador do cliente.

<br>

## 📚 Documentação Adicional

- [Manual do Usuário](docs/user-manual.md) - Guia completo com exemplos práticos
- [Documentação Técnica](docs/technical-docs.md) - Arquitetura e padrões de desenvolvimento
- [Página de Teoria](pages/theory.html) - Fundamentos teóricos de circuitos

<br>

---

&copy; 2025 Desmalha Project. Distribuído sob a licença MIT.

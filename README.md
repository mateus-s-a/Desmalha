# Desmalha - Calculadora de Análise de Malhas

Sistema web frontend para resolução automatizada de circuitos elétricos utilizando o método de Análise de Malhas. O projeto visa facilitar a resolução de circuitos planares através da aplicação sistemática das Leis de Kirchhoff (LKC) e Lei de Ohm, gerando sistemas de equações lineares e resolvendo-os matricialmente.

## Visão Geral do Projeto

A **Desmalha** é uma aplicação web educacional e prática que permite aos usuários:

- Inserir dados de circuitos elétricos (resistências, fontes de tensão/corrente, número de malhas)
- Calcular automaticamente as correntes de malha usando o método sistemático
- Visualizar resultados formatados com unidades adequadas
- Compreender o processo de resolução através de interface intuitiva

## Objetivos

- **Educacional**: Demonstrar o método de Análise de Malhas de forma interativa
- **Prático**: Facilitar cálculos rápidos e precisos de circuitos planares
- **Acessível**: Interface limpa e responsiva para uso em diferentes dispositivos
- **Moderno**: Aplicação das melhores práticas de desenvolvimento web 2025

## Tecnologias Utilizadas

| Área | Tecnologia | Versão | Justificativa |
|------|------------|--------|---------------|
| **Frontend** | React + TypeScript | 18.x / TS 5.9 | Componentização, tipagem forte e código escalável |
| **Build Tool** | Vite | 7.2.2 | Build extremamente rápido e HMR otimizado |
| **Estilo/UI** | TailwindCSS | 4.0 | Design responsivo ágil com CSS-first approach |
| **Estado** | Zustand ou Context API | Latest | Gerenciamento de estado simples e performático |
| **Matemática** | math.js | Latest | Resolução de sistemas lineares e operações matriciais |
| **Controle de Versão** | Git + GitHub | - | Colaboração e versionamento confiável |
| **Testes** | Vitest | Latest | Testes unitários rápidos compatíveis com Vite |
| **Hospedagem** | GitHub Pages | - | Deploy simples e gratuito |

## Estrutura do Projeto

```text
Desmalha/
│
├── public/
│ ├── index.html
│ └── favicon.ico
│
├── src/
│ ├── assets/
│ │ └── logo.svg
│ │
│ ├── components/
│ │ ├── Navbar.tsx
│ │ ├── FormularioEntradaCircuito.tsx
│ │ ├── TabelaResultadosMalha.tsx
│ │ └── Rodape.tsx
│ │
│ ├── logic/
│ │ └── analiseMalha.ts
│ │
│ ├── pages/
│ │ └── Inicio.tsx
│ │
│ ├── styles/
│ │ └── globals.css
│ │
│ ├── tests/
│ │ └── analiseMalha.test.ts
│ │
│ ├── App.tsx
│ ├── main.tsx
│ └── vite-env.d.ts
│
├── .gitignore
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
└── README.md
```


## Começando

### Pré-requisitos

- Node.js >= 18.x
- npm ou yarn
- Git

### Instalação

#### 1. Clonar o repositório

```bash
$ git clone https://github.com/mateus-s-a/Desmalha.git
$ cd Desmalha
````

#### 2. Criar projeto com Vite

```bash
$ npm create vite@latest . -- --template react-ts
```

#### 3. Instalar dependências

```bash
$ npm install
```

#### 4. Instalar TailwindCSS v4

```bash
$ npm install -D tailwindcss@next @tailwindcss/vite@next
```

#### 5. Instalar bibliotecas adicionais

```bash
$ npm install mathjs zustand
```

#### 6. Instalar ferramentas de teste

```bash
$ npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom
```

### Executar Localmente

#### Modo desenvolvimento

```bash
$ npm run dev
Executar testes
```

```bash
$ npm run test
Build para produção
```

```bash
$ npm run build
Preview da build
```

```bash
$ npm run preview
```

---

## Fundamentos Teóricos

### Análise de Malhas

A Análise de Malhas é um método sistemático para análise de circuitos elétricos que se baseia na **Lei de Kirchhoff das Tensões (LKT)**:

> A soma algébrica das tensões em qualquer malha fechada é igual a zero.

**Passos do Método:**

1. Identificar malhas independentes no circuito
2. Atribuir corrente de malha para cada malha (sentido horário)
3. Aplicar **LKT** em cada malha
4. Resolver o sistema de equações lineares resultante
5. Obter as correntes de malha

**Equação Geral:**

Para um circuito com $ n $ malhas:

$$R \cdot I = V$$

Onde:
- $R$ = matriz de resistências
- $I$ = vetor de correntes de malha
- $V$ = vetor de fontes de tensão

<br>

---

<br>

> continua...
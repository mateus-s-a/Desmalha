# Desmalha - Calculadora de Análise de Malhas

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![React](https://img.shields.io/badge/react-19.2.0-blue.svg)
![TypeScript](https://img.shields.io/badge/typescript-5.9.3-blue.svg)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-4.0.0-blue.svg)
![Vite](https://img.shields.io/badge/vite-7.2.2-blue.svg)
![math.js](https://img.shields.io/badge/math.js-15.1.0-blue.svg)
![Zustand](https://img.shields.io/badge/zustand-5.0.8-blue.svg)
![Git](https://img.shields.io/badge/git-2.40.1-blue.svg)
![GitHub](https://img.shields.io/badge/github-2.40.1-blue.svg)

> Sistema web frontend para resolução automatizada de circuitos elétricos utilizando o método de Análise de Malhas. O projeto visa facilitar a resolução de circuitos planares através da aplicação sistemática das Leis de Kirchhoff (LKC) e Lei de Ohm, gerando sistemas de equações lineares e resolvendo-os matricialmente.

</div>

---

## Índice
- [Desmalha - Calculadora de Análise de Malhas](#desmalha---calculadora-de-análise-de-malhas)
  - [Índice](#índice)
  - [Visão Geral do Projeto](#visão-geral-do-projeto)
  - [Objetivos](#objetivos)
  - [Funcionalidades](#funcionalidades)
  - [Tecnologias Utilizadas](#tecnologias-utilizadas)
  - [Estrutura do Projeto](#estrutura-do-projeto)
  - [Começando](#começando)
    - [Pré-requisitos](#pré-requisitos)
    - [Instalação](#instalação)
      - [1. Clonar o repositório](#1-clonar-o-repositório)
      - [2. Criar projeto com Vite (se não existir)](#2-criar-projeto-com-vite-se-não-existir)
      - [3. Instalar dependências](#3-instalar-dependências)
    - [Executar Localmente](#executar-localmente)
  - [Fundamentos Teóricos](#fundamentos-teóricos)
    - [Análise de Malhas](#análise-de-malhas)

## Visão Geral do Projeto

A **Desmalha** é uma aplicação web educacional e prática que permite aos usuários:

- Inserir dados de circuitos elétricos (resistências, fontes de tensão/corrente, número de malhas)
- Calcular automaticamente as correntes de malha usando o método sistemático
- Visualizar resultados formatados com unidades adequadas
- Compreender o processo de resolução através de interface intuitiva

## Objetivos

- **Educacional**: Demonstrar o método de Análise de Malhas de forma interativa
- **Prático**: Facilitar cálculos rápidos e precisos de **circuitos** planares
- **Acessível**: Interface limpa e responsiva para uso em diferentes dispositivos
- **Moderno**: Aplicação das melhores práticas de desenvolvimento web 2025

<br>

## Funcionalidades

- **Cálculo Automático:** Resolução instantânea de sistemas lineares de equações
- **Interface Intuitiva:** Facilidade de uso e compreensão do processo
- **Validação em Tempo Real:** Feedback imediato dos valores inseridos
- **Resultados Detalhados:** Exibição das correntes de malha com unidades e precisão
- **Design Moderno:** Interface limpa e responsiva para uso em diferentes dispositivos
- **Totalmente Responsivo:** Interface responsiva para uso em diferentes dispositivos
- **Tratamento de Erros:** Feedback claro e específico para diferentes situações de erro

<br>

## Tecnologias Utilizadas

| Área | Tecnologia | Versão | Justificativa |
|------|------------|--------|---------------|
| **Frontend** | React + TypeScript | `18.x` / `TS 5.9` | Componentização, tipagem forte e código escalável |
| **Build Tool** | Vite | `7.2.2` | Build extremamente rápido e HMR otimizado |
| **Estilo/UI** | TailwindCSS | `4.0` | Design responsivo ágil com CSS-first approach |
| **Estado** | Zustand ou Context API | `Latest` | Gerenciamento de estado simples e performático |
| **Matemática** | math.js | `Latest` | Resolução de sistemas lineares e operações matriciais |
| **Controle de Versão** | Git + GitHub | - | Colaboração e versionamento confiável |
| **Testes** | Vitest | `Latest` | Testes unitários rápidos compatíveis com Vite |
| **Hospedagem** | GitHub Pages | - | Deploy simples e gratuito |

<br>

## Estrutura do Projeto

```text
Desmalha/
|
├── docs/
│ ├── plano-desenvolvimento-desmalha-v3.md
│ ├── fluxo-uso-sistema.md
│ └── wireframe-descricao.md
|
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

- Node.js (recomendado: 18.x)
- npm ou yarn (recomendado: npm)
- Git

<br>

### Instalação

#### 1. Clonar o repositório

```bash
$ git clone https://github.com/mateus-s-a/Desmalha.git
$ cd Desmalha
````

#### 2. Criar projeto com Vite (se não existir)

```bash
$ npm create vite@latest . -- --template react-ts
```

#### 3. Instalar dependências

```bash
$ npm install
```

<br>

### Executar Localmente

Modo **desenvolvimento**

```bash
$ npm run dev
```

Executar **testes**:

```bash
$ npm run test
```

Build para **produção**:

```bash
$ npm run build
```

Preview da **build**:

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

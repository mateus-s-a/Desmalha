# 🔌 Desmalha - Calculadora de Análise de Malhas

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)
![Licença](https://img.shields.io/badge/licença-MIT-blue)
![React](https://img.shields.io/badge/React-19.2-61dafb?logo=react)
![Vite](https://img.shields.io/badge/Vite-7.2-646cff?logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0-38bdf8?logo=tailwindcss)

## 📚 Sobre o Projeto

Sistema web frontend para **resolução automatizada de circuitos elétricos** utilizando o método de **Análise de Malhas**. O projeto visa facilitar a resolução de circuitos planares através da aplicação sistemática das **Leis de Kirchhoff (LKC)** e **Lei de Ohm**, gerando sistemas de equações lineares e resolvendo-os matricialmente.

### 🎯 Objetivos

- Proporcionar uma interface intuitiva para inserção de circuitos elétricos
- Calcular automaticamente as correntes de malha utilizando métodos matriciais
- Exibir resultados detalhados com passos intermediários da resolução
- Auxiliar estudantes de Engenharia Elétrica/Eletrônica no aprendizado de Análise de Circuitos

## 🛠️ Tecnologias Utilizadas

| Área | Tecnologia | Versão | Justificativa |
|------|------------|--------|---------------|
| **Frontend** | React | 19.2 | Biblioteca moderna com React Compiler para otimização automática |
| **Linguagem** | TypeScript | 5.9 | Tipagem estática para maior segurança e manutenção |
| **Build Tool** | Vite | 7.2 | Build ultrarrrápido e HMR eficiente |
| **Estilização** | TailwindCSS | 4.0 | Utility-first CSS com nova engine CSS-first |
| **Cálculos** | math.js | Última | Biblioteca especializada em operações matriciais e resolução de sistemas |
| **Testes** | Vitest | Última | Framework de testes rápido integrado ao Vite |
| **Estado** | Zustand | Última | Gerenciamento de estado leve e performativo |
| **Deploy** | GitHub Pages | - | Hospedagem estática gratuita |

## 📝 Funcionalidades Planejadas

### Fase 1 - Planejamento e Design ✅
- [x] Definição do escopo do projeto
- [x] README inicial
- [ ] Wireframe da interface
- [ ] Estrutura de pastas do projeto

### Fase 2 - Implementação da Interface
- [ ] Componente de entrada de dados do circuito
- [ ] Formulário para resistores e fontes
- [ ] Componente de visualização de resultados
- [ ] Design responsivo com TailwindCSS v4

### Fase 3 - Lógica de Cálculo
- [ ] Módulo `analiseMalha.ts` para montar matriz de impedâncias
- [ ] Algoritmo de resolução de sistemas lineares (math.js)
- [ ] Validação de entradas e tratamento de erros
- [ ] Exibição de passos intermediários

### Fase 4 - Testes e Deploy
- [ ] Testes unitários com Vitest
- [ ] Testes de integração dos componentes
- [ ] Documentação completa do código
- [ ] Deploy no GitHub Pages

## 🚀 Como Executar Localmente

### Pré-requisitos

- Node.js 18+ instalado
- npm ou yarn
- Git

### Instalação

```bash
# Clonar o repositório
git clone https://github.com/mateus-s-a/Desmalha.git
cd Desmalha

# Instalar dependências
npm install

# Executar em modo de desenvolvimento
npm run dev
```

O projeto estará disponível em `http://localhost:5173/`

### Comandos Disponíveis

```bash
npm run dev          # Inicia servidor de desenvolvimento
npm run build        # Gera build de produção
npm run preview      # Visualiza build de produção localmente
npm run test         # Executa testes unitários
npm run test:ui      # Executa testes com interface gráfica
```

## 📚 Fundamentos Teóricos

### Análise de Malhas (Mesh Analysis)

A **Análise de Malhas** é um método sistemático para determinar correntes em circuitos elétricos planares. O método:

1. Identifica malhas independentes no circuito
2. Aplica a Lei de Kirchhoff das Tensões (LKT) em cada malha
3. Monta um sistema de equações lineares
4. Resolve o sistema usando métodos matriciais (Cramer, Gauss, etc.)

### Equações Básicas

**Lei de Ohm**: V = R × I

**Lei de Kirchhoff das Tensões (LKT)**: ∑V = 0 (em uma malha fechada)

**Sistema Matricial**: [R] × [I] = [V]

Onde:
- [R] = Matriz de resistências/impedâncias
- [I] = Vetor de correntes de malha (incógnitas)
- [V] = Vetor de tensões das fontes

## 📁 Estrutura do Projeto

```
Desmalha/
├── src/
│   ├── components/        # Componentes React reutilizáveis
│   │   ├── InputCircuito.tsx
│   │   ├── ResultadoAnalise.tsx
│   │   └── PassosCalculo.tsx
│   ├── logic/             # Lógica de negócio
│   │   ├── analiseMalha.ts   # Algoritmo principal
│   │   └── validacao.ts      # Validação de dados
│   ├── pages/             # Páginas da aplicação
│   │   └── Home.tsx
│   ├── styles/            # Arquivos de estilo
│   │   └── globals.css
│   ├── tests/             # Testes unitários
│   ├── assets/            # Imagens e recursos estáticos
│   ├── App.tsx
│   └── main.tsx
├── docs/                  # Documentação do projeto
├── public/                # Arquivos públicos estáticos
├── index.html
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

## 🤝 Contribuindo

Contribuições são bem-vindas! Este é um projeto acadêmico desenvolvido por estudantes de Engenharia da Computação.

### Como Contribuir

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## ✍️ Autores

- **Equipe de Desenvolvimento** - Estudantes de Engenharia da Computação
- Projeto Acadêmico - Disciplina de Circuitos Elétricos

## 📚 Referências

- Nilsson, J. W., & Riedel, S. A. (2014). *Circuitos Elétricos*. Pearson.
- Alexander, C. K., & Sadiku, M. N. O. (2013). *Fundamentos de Circuitos Elétricos*. McGraw-Hill.
- [Documentação React 19](https://react.dev)
- [Documentação Vite 7](https://vite.dev)
- [Documentação TailwindCSS v4](https://tailwindcss.com)
- [Documentação math.js](https://mathjs.org)

---

**Desenvolvido com ❤️ por estudantes de Engenharia da Computação**

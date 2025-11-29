# Fluxo de Uso do Sistema - Desmalha

## Visão Geral

Este documento descreve o fluxo completo de interação do usuário com a calculadora de Análise de Malhas.

## Fluxo Principal

### 1. Acesso à Aplicação
- Usuário acessa a URL do projeto (`localhost` em dev ou GitHub Pages em produção)
- Sistema exibe a página inicial com interface limpa e intuitiva

### 2. Entrada de Dados do Circuito

**Informações necessárias:**
- Número de malhas ($n$): quantidade de malhas independentes no circuito
- Matriz de resistências ($R$): matriz $n \times n$ com resistências em Ohms
  - Diagonal principal: soma das resistências na malha $i$
  - Elementos fora da diagonal: resistências compartilhadas (negativas)
- Vetor de tensões ($V$): vetor $n \times 1$ com fontes de tensão em Volts

**Interface:**
- Campo numérico para definir número de malhas (`1-10`)
- Grid dinâmico gerado automaticamente para matriz $R$
- Inputs para vetor de tensões $V$
- Validação em tempo real dos valores inseridos

### 3. Processamento

**Ao clicar em "Calcular":**
1. Sistema valida todos os campos
2. Monta a equação matricial: $R \cdot I = V$
3. Resolve o sistema linear usando `math.js`
4. Calcula as correntes de malha ($I$)

### 4. Exibição de Resultados

**Formato de saída:**
- Tabela formatada com as correntes de malha
- Valores em Ampères ($A$) com precisão de 3 casas decimais
- Indicação clara de cada malha ($I_{1}{, } I_{2}{, } I_{3}{, } \cdots$)
- Opção de limpar e recalcular

### 5. Ações Disponíveis

- **Novo cálculo:** Limpa campos e permite nova entrada
- **Exportar resultados:** (futuro) Salvar em PDF/PNG
- **Ver exemplo:** (futuro) Carrega circuito de exemplo

## Fluxo de Erro

### Validações
- Número de malhas inválido → Mensagem de erro
- Campos vazios → Destaque dos campos obrigatórios
- Matriz não inversível (sistema sem solução) → Alerta ao usuário
- Valores não numéricos → Feedback visual imediato

## Navegação

```text
[Página Inicial]
│
├─> [Formulário de Entrada]
│ │
│ ├─> Validação OK → [Cálculo] → [Resultados]
│ │
│ └─> Validação ERRO → [Mensagem de Erro]
│
└─> [Rodapé com informações]
```

## Considerações de UX

- Interface responsiva (mobile-first)
- Feedback visual imediato nas ações
- Mensagens de erro claras e acionáveis
- Design minimalista focado na tarefa
- Acessibilidade (contraste, tamanho de fonte, labels)

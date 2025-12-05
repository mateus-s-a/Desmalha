# Manual do Usuário - Desmalha

## Introdução

O **Desmalha** é uma ferramenta web para análise de circuitos elétricos DC que implementa dois métodos clássicos:
- **Análise de Malhas** (Mesh Analysis)
- **Análise Nodal** (Nodal Analysis)

## Análise de Malhas

### O que é?
A Análise de Malhas calcula as correntes que circulam em cada malha (loop fechado) do circuito usando a Lei das Tensões de Kirchhoff (LTK).

### Como usar:

1. **Defina o número de malhas** do seu circuito (mínimo 2).

2. **Adicione Resistores**:
   - Digite o valor da resistência em Ohms (Ω).
   - Se o resistor pertence a uma única malha, digite apenas o número (ex: `1`).
   - Se o resistor é compartilhado entre duas malhas, digite ambas separadas por vírgula (ex: `1,2`).

3. **Adicione Fontes de Tensão**:
   - Digite o valor da tensão em Volts (V).
   - Indique em qual(is) malha(s) ela está presente.
   - **Importante**: Escolha a direção:
     - **Horário (Aumenta Tensão)**: Se a corrente de malha passa pela fonte do terminal negativo para o positivo.
     - **Anti-horário (Queda Tensão)**: Se a corrente de malha passa pela fonte do terminal positivo para o negativo.

4. Clique em **Calcular** para obter as correntes de malha.

### Convenção de Sinais:
- Correntes de malha são assumidas no sentido **horário** por padrão.
- Uma fonte de tensão aumenta a tensão se a corrente entra pelo terminal negativo e sai pelo positivo.

---

## Análise Nodal

### O que é?
A Análise Nodal calcula a tensão em cada nó do circuito em relação ao nó de referência (terra/ground) usando a Lei das Correntes de Kirchhoff (LCK).

### Como usar:

1. **Defina o número de nós** (excluindo o terra/ground).

2. **Adicione Resistores**:
   - Digite o valor da resistência em Ohms (Ω).
   - Conecte entre dois nós usando a notação `nó1,nó2`.
   - Use `0` para representar o terra (ex: `0,1` conecta o terra ao nó 1).

3. **Adicione Fontes de Corrente**:
   - Digite o valor da corrente em Amperes (A).
   - Conecte entre dois nós (ex: `1,2`).
   - **Importante**: Escolha a direção em relação ao **primeiro nó**:
     - **Entrando (Positiva)**: A corrente entra no primeiro nó (contribui positivamente).
     - **Saindo (Negativa)**: A corrente sai do primeiro nó (contribui negativamente).

4. Clique em **Calcular** para obter as tensões nodais.

### Convenção de Sinais:
- **Corrente entrando em um nó** = Positiva no vetor de correntes.
- **Corrente saindo de um nó** = Negativa no vetor de correntes.
- O nó `0` é sempre o terra (referência, V = 0V).

---

## Exemplo Prático - Análise Nodal

Considere uma fonte de corrente de **2A** conectada entre os nós **1** e **2**:

### Caso 1: Corrente entrando no nó 1
- Configuração: Nós `1,2` com direção **"Entrando"**
- Significado: A corrente de 2A **entra** no nó 1 e **sai** do nó 2
- Matriz resultante: `I[0] = +2`, `I[1] = -2`

### Caso 2: Corrente saindo do nó 1
- Configuração: Nós `1,2` com direção **"Saindo"**
- Significado: A corrente de 2A **sai** do nó 1 e **entra** no nó 2
- Matriz resultante: `I[0] = -2`, `I[1] = +2`

---

## Botões e Controles

### Botões Principais:
- **+ Resistor**: Adiciona um novo resistor ao circuito.
- **+ Fonte**: Adiciona uma nova fonte (Tensão para Malhas, Corrente para Nodal).
- **Limpar Tudo**: Remove todos os componentes inseridos de uma vez.
- **Calcular**: Resolve o sistema e exibe os resultados.

### Ícone de Lixeira:
Cada componente possui um botão de lixeira (🗑️) para removê-lo individualmente.

---

## Interpretação dos Resultados

Após clicar em **Calcular**, você verá:

1. **Tabela de Resultados**:
   - Para Malhas: Correntes I₁, I₂, I₃... em Amperes
   - Para Nodal: Tensões V₁, V₂, V₃... em Volts

2. **Matriz do Sistema**:
   - Visualização educacional mostrando:
     - Matriz de coeficientes (Resistências/Condutâncias)
     - Vetor de incógnitas
     - Vetor de fontes

---

## Dicas e Melhores Práticas

✅ **Sempre identifique corretamente**:
- No método de Malhas: As malhas devem ser loops fechados e independentes.
- No método Nodal: O nó terra (0) deve estar presente no circuito.

✅ **Teste com circuitos simples** primeiro para validar os resultados.

✅ **Atenção à direção das fontes**: A escolha incorreta resulta em sinais invertidos.

⚠️ **Circuitos mal condicionados**: Se o sistema não tiver solução única, uma mensagem de erro será exibida.

---

## Limitações Atuais

- Suporta apenas circuitos **DC** (corrente contínua).
- Não suporta componentes reativos (capacitores, indutores).
- Fontes de tensão não são suportadas na Análise Nodal (use superposição ou transformação de fontes).
- Fontes de corrente não são suportadas na Análise de Malhas.

---

## Suporte

Para dúvidas, consulte:
- [Documentação Técnica](technical-docs.md)
- [Referência da API](api-reference.md)
- [Página de Teoria](../pages/theory.html)

---

&copy; 2025 Desmalha Project

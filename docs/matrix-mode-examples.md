# Guia de Exemplos - Modo Matriz Direta

## 📊 Visão Geral

O **Modo Matriz Direta** permite que você insira diretamente o sistema linear já montado, pulando a etapa de construção do circuito componente por componente. Isso é especialmente útil quando:

- Você já tem a matriz de um livro texto ou exercício
- Quer validar cálculos manuais rapidamente
- Está trabalhando com sistemas grandes e complexos
- Precisa resolver múltiplos sistemas similares

---

## 🔌 Análise de Malhas - Exemplos

### Formato da Matriz

Para análise de malhas, insira a matriz aumentada **[R|V]**:
- **[R]** = Matriz de resistências (Ω)
- **[V]** = Vetor de tensões (V)

### Exemplo 1: Sistema Simples 2×2

**Circuito:**
- 2 malhas
- R1 = 10Ω (malha 1), R2 = 20Ω (malha 2), R3 = 15Ω (compartilhado)
- V1 = 12V (malha 1), V2 = 8V (malha 2)

**Matriz [R|V]:**
```
25.00 -15.00 12.00
-15.00 35.00 8.00
```

**Explicação:**
- R[0][0] = R1 + R3 = 10 + 15 = 25Ω
- R[0][1] = -R3 = -15Ω (resistor compartilhado)
- R[1][0] = -R3 = -15Ω
- R[1][1] = R2 + R3 = 20 + 15 = 35Ω
- V[0] = 12V
- V[1] = 8V

**Resultado Esperado:**
- I₁ ≈ 0.84 A
- I₂ ≈ 0.59 A

---

### Exemplo 2: Sistema Médio 4×4

**Matriz [R|V]:**
```
100.00 -50.00 0.00 0.00 20.00
-50.00 150.00 -30.00 0.00 15.00
0.00 -30.00 80.00 -20.00 10.00
0.00 0.00 -20.00 70.00 5.00
```

**Características:**
- Sistema 4×4 (4 malhas)
- Resistores compartilhados entre malhas adjacentes
- Fonte de tensão em cada malha

---

### Exemplo 3: Sistema Complexo 6×6

**Matriz [R|V] (Exemplo do Sistema):**
```
50.00 0.00 0.00 -10.00 0.00 0.00  35.00
0.00 110.00 -45.00 0.00 -47.00 0.00 -25.00
0.00 -45.00 145.00 0.00 0.00 -100.00 -50.00
-10.00 0.00 0.00 22.00 -12.00 0.00 75.00
0.00 -47.00 0.00 -12.00 79.00 -20.00 90.00
0.00 0.00 -100.00 0.00 -20.00 135.00 0.00
```

**Características:**
- Sistema 6×6 (6 malhas)
- Matriz esparsa (muitos zeros)
- Resistores conectando malhas não adjacentes

---

## ⚡ Análise Nodal - Exemplos

### Formato da Matriz

Para análise nodal, insira a matriz aumentada **[G|I]**:
- **[G]** = Matriz de condutâncias (S = Siemens = 1/Ω)
- **[I]** = Vetor de correntes (A)

### Exemplo 1: Sistema Simples 2×2

**Circuito:**
- 2 nós (+ terra)
- R1 = 10Ω entre nó 1 e terra
- R2 = 5Ω entre nó 1 e nó 2
- R3 = 20Ω entre nó 2 e terra
- I1 = 2A entrando no nó 1

**Cálculo de Condutâncias:**
- G1 = 1/R1 = 1/10 = 0.10 S
- G2 = 1/R2 = 1/5 = 0.20 S
- G3 = 1/R3 = 1/20 = 0.05 S

**Matriz [G|I]:**
```
0.30 -0.20 2.00
-0.20 0.25 0.00
```

**Explicação:**
- G[0][0] = G1 + G2 = 0.10 + 0.20 = 0.30 S
- G[0][1] = -G2 = -0.20 S
- G[1][0] = -G2 = -0.20 S
- G[1][1] = G2 + G3 = 0.20 + 0.05 = 0.25 S
- I[0] = 2.00 A (corrente entra no nó 1)
- I[1] = 0.00 A (nenhuma fonte no nó 2)

**Resultado Esperado:**
- V₁ ≈ 10.0 V
- V₂ ≈ 8.0 V

---

### Exemplo 2: Sistema Médio 4×4

**Matriz [G|I]:**
```
0.10 -0.10 0.00 0.00 15.00
-0.10 0.26 -0.08 0.00 -5.00
0.00 -0.08 0.14 -0.01 -7.00
0.00 0.00 -0.01 0.08 4.00
```

**Características:**
- Sistema 4×4 (4 nós)
- Múltiplas fontes de corrente
- Resistores conectando nós adjacentes

---

### Exemplo 3: Sistema com Alta Condutância

**Matriz [G|I]:**
```
1.50 -0.50 0.00 3.00
-0.50 2.00 -1.00 -2.00
0.00 -1.00 1.20 1.50
```

**Características:**
- Sistema 3×3 (3 nós)
- Resistências baixas (condutâncias altas)
- Ideal para circuitos de baixa impedância

---

## 🎓 Dicas para Montagem Manual

### Análise de Malhas - Regras

1. **Diagonal Principal:** Soma de todas as resistências na malha
   ```
   R[i][i] = ΣR_na_malha_i
   ```

2. **Fora da Diagonal:** Resistência compartilhada (negativa)
   ```
   R[i][j] = -R_compartilhada_entre_i_e_j
   ```

3. **Vetor de Tensões:** Soma algébrica das fontes
   ```
   V[i] = Σ(fontes_que_aumentam) - Σ(fontes_que_diminuem)
   ```

### Análise Nodal - Regras

1. **Diagonal Principal:** Soma de todas as condutâncias conectadas ao nó
   ```
   G[i][i] = ΣG_conectadas_ao_nó_i
   ```

2. **Fora da Diagonal:** Condutância entre nós (negativa)
   ```
   G[i][j] = -G_entre_nó_i_e_nó_j
   ```

3. **Vetor de Correntes:** Soma algébrica (entradas positivas, saídas negativas)
   ```
   I[i] = Σ(correntes_entrando) - Σ(correntes_saindo)
   ```

---

## ⚠️ Erros Comuns

### ❌ Formato Incorreto
```
# ERRADO: Matriz não aumentada (falta vetor B)
10 -5
-5 15
```
**Correção:** Adicione a última coluna (vetor de constantes)

### ❌ Dimensões Inconsistentes
```
# ERRADO: Linha 2 tem menos colunas
10 -5 0 12
-5 15 8
```
**Correção:** Todas as linhas devem ter o mesmo número de colunas

### ❌ Valores Não Numéricos
```
# ERRADO: Contém texto
10 -5 12
-5 15 abc
```
**Correção:** Use apenas números (decimais com ponto: 12.5)

---

## 🔍 Validação Automática

O sistema verifica automaticamente:

✅ **Formato válido** (n × n+1)  
✅ **Valores numéricos**  
✅ **Dimensões consistentes**  
✅ **Matriz não singular**

Feedback visual em tempo real:
- 🟢 **Verde:** Matriz válida, pronta para calcular
- 🟡 **Amarelo:** Aviso de formato
- 🔴 **Vermelho:** Erro crítico

---

## 💡 Casos de Uso Avançados

### 1. Validação de Cálculo Manual
Você resolveu um exercício manualmente? Insira a matriz e compare os resultados.

### 2. Análise Paramétrica
Teste rapidamente diferentes valores de resistências sem reconstruir o circuito.

### 3. Sistemas de Livros Didáticos
Muitos livros fornecem diretamente a matriz. Copie e cole!

### 4. Exportação de Software
Se você usou um software de simulação, pode exportar a matriz e validar aqui.

---

## 📚 Recursos Adicionais

- [Manual do Usuário](user-manual.md) - Guia completo
- [Documentação Técnica](technical-docs.md) - Arquitetura interna
- [Teoria](../pages/theory.html) - Fundamentos matemáticos

---

**Dica Final:** Use o botão "Exemplo" nas calculadoras para carregar automaticamente uma matriz de demonstração e ver o formato correto! 🎯

&copy; 2025 Desmalha Project

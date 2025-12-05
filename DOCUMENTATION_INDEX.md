# 📚 Índice de Documentação - Desmalha

> Guia completo de toda a documentação do projeto

---

## 🎯 Para Começar

### Iniciantes
1. **[QUICK_OVERVIEW.md](QUICK_OVERVIEW.md)** ⚡
   - Visão geral em 5 minutos
   - O que é o Desmalha
   - Como usar rapidamente

2. **[README.md](README.md)** 📖
   - Documentação principal
   - Funcionalidades completas
   - Guia de uso passo a passo
   - Como fazer deploy

---

## 👨‍🎓 Para Usuários

### Manuais e Guias

3. **[docs/user-manual.md](docs/user-manual.md)** 📘
   - Manual do usuário completo
   - Análise de Malhas detalhada
   - Análise Nodal detalhada
   - Convenções de sinais
   - Modo Componentes
   - Modo Matriz Direta
   - Exemplos práticos
   - Troubleshooting

4. **[docs/matrix-mode-examples.md](docs/matrix-mode-examples.md)** 📊
   - Exemplos de matrizes prontas
   - Análise de Malhas: 3 exemplos
   - Análise Nodal: 3 exemplos
   - Regras de montagem manual
   - Erros comuns e correções
   - Casos de uso avançados

### Teoria

5. **[pages/theory.html](pages/theory.html)** 🎓
   - Fundamentos teóricos
   - Lei de Kirchhoff (LTK e LCK)
   - Passo a passo dos métodos
   - Link para manual completo

---

## 👨‍💻 Para Desenvolvedores

### Guias de Desenvolvimento

6. **[docs/quick-start-guide.md](docs/quick-start-guide.md)** 🚀
   - Guia rápido para devs (< 5 min)
   - Estrutura do projeto
   - Paleta de cores
   - Casos de uso comuns:
     - Adicionar novo botão
     - Adicionar novo componente
     - Adicionar validação
     - Salvar/Carregar circuito
     - Exportar resultados
   - Debugging
   - Checklist de deploy
   - Tarefas rápidas

7. **[docs/technical-docs.md](docs/technical-docs.md)** 🔧
   - Arquitetura completa do projeto
   - Estrutura de módulos detalhada
   - Fluxo de dados (diagramas)
   - Convenções de código
   - Padrão para extensibilidade
   - Arquitetura do Modo Matriz (v1.2)
   - Performance e segurança
   - Changelog técnico
   - Roadmap futuro

### API e Referências

8. **[docs/api-reference.md](docs/api-reference.md)** 📋
   - (Em construção)
   - Referência de APIs internas

---

## 📁 Estrutura de Arquivos

### Raiz do Projeto
```
Desmalha/
├── index.html                        # Página principal
├── LICENSE                           # Licença MIT
├── .gitignore                        # Git ignore
│
├── README.md                         # Doc principal
├── QUICK_OVERVIEW.md                 # Visão rápida
├── DOCUMENTATION_INDEX.md            # Este arquivo
│
├── CHANGELOG.md                      # Histórico
├── VERSION_SUMMARY.md                # Resumo versões
├── IMPLEMENTATION_SUMMARY.md         # Impl v1.1
├── MATRIX_MODE_IMPLEMENTATION.md     # Impl v1.2
├── UI_ENHANCEMENT_SUMMARY.md         # Impl v1.3
├── SHARING_SYSTEM_IMPLEMENTATION.md  # Impl v1.4
├── BUG_FIX_v1.4.1.md                 # Bug fix v1.4.1 (zero-component)
├── BUG_FIX_v1.4.2_DIRECTIONS.md      # Bug fix v1.4.2 (direções compartilhadas)
├── VALIDATION_CHECKLIST_v1.4.1.md    # Validação v1.4.1
├── EXECUTIVE_SUMMARY_v1.4.1.md       # Resumo executivo v1.4.1
└── RELEASE_NOTES_v1.4.1.md           # Notas de lançamento v1.4.1
```

### Diretórios
```
📁 assets/          → Recursos (CSS, JS, imgs)
📁 pages/           → Calculadoras HTML
📁 docs/            → Documentação detalhada
📁 data/            → Dados exemplo
📁 templates/       → Templates HTML
📁 tests/           → Testes unitários
```

---

**Dica:** Use Ctrl+F para buscar termos específicos nos documentos! 🔍

&copy; 2025 Desmalha Project - Documentação Completa

# ATIVIDADE PRÁTICA — TESTES UNITÁRIOS COM VITEST

Projeto desenvolvido para validar o cadastro de clientes (nome, e-mail e idade) utilizando **Node.js** e testes automatizados com **Vitest**.

---

## 📁 Estrutura do Projeto

```text
cadastro-vitest/
├── src/
│   └── cadastro.js          # Função de cadastro com as validações
├── tests/
│   └── cadastro.test.js     # 8 testes automatizados
├── package.json             # Dependências e scripts
├── package-lock.json
└── README.md                # Respostas e documentação
```

---

## 🚀 Como Executar

1. **Instalar dependências:**
   ```bash
   npm install
   ```

2. **Executar os testes:**
   ```bash
   npm test
   ```

3. **Executar em modo observação (Watch):**
   ```bash
   npm run test:watch
   ```

---

## 📝 Respostas das Perguntas

### 🔹 Etapa 3 — Anatomia dos Testes

- **(a) O que faz `describe()`?**  
  Serve para agrupar testes relacionados em um mesmo bloco ou categoria (ex: `"Testes de cadastro de usuários"`), organizando a exibição dos resultados.

- **(b) Qual a função de `it()`?**  
  Define um caso de teste individual. Ele descreve o comportamento esperado e executa a função a ser testada.

- **(c) O que verifica `expect().toBe()`?**  
  O `expect()` recebe o resultado retornado pela função e o `.toBe()` compara se esse resultado é exatamente igual ao valor esperado.

---

### 🔹 Etapa 5 — Investigação da Falha (Regressão)

Ao alterar temporariamente a idade mínima de 18 para 16 anos no código:

1. **Qual teste falhou?**  
   O Teste 4: `deve retornar erro quando o usuário for menor de 18 anos` (cenário do Pedro, 16 anos).
2. **Qual valor era esperado?**  
   `"Erro: usuário menor de idade"`
3. **Qual valor foi recebido?**  
   `"Usuário cadastrado com sucesso"`
4. **Por que esse erro é uma regressão?**  
   Regressão é quando uma alteração no código quebra algo que já estava funcionando corretamente. Como o sistema deve aceitar apenas maiores de 18, mudar a regra fez um menor ser aprovado. O teste automatizado serviu de alerta imediato antes que esse erro fosse para produção.

---

### 🔹 Etapa 6 — Desafio: E-mail Incompleto

- **O problema:** A validação inicial apenas checava se havia `@`. Ao testar `usuario@`, o sistema aceitava indevidamente.
- **A solução:** Foi adicionada uma regra exigindo que após o `@` exista um domínio com ponto (por exemplo: `email.com`). Com isso, o teste com `usuario@` passou a retornar corretamente `"Erro: email inválido"`.

---

### 🔹 Etapa 8 — Reflexão

1. **O que é teste unitário?**  
   É o teste da menor parte isolada do sistema (como uma única função), verificando se ela devolve o resultado correto para diferentes entradas.

2. **Por que usar Vitest neste projeto?**  
   Porque é muito rápido, moderno, funciona direto com `import/export` (ES Modules) sem configurações difíceis e possui modo de observação em tempo real.

3. **Qual a diferença entre teste positivo e negativo? Dê um exemplo de cada.**  
   - **Teste Positivo (caminho feliz):** Testa o sistema com dados válidos.  
     *Exemplo:* Enviar `"Maria"`, `"maria@email.com"`, `25` e receber `"Usuário cadastrado com sucesso"`.  
   - **Teste Negativo:** Testa o comportamento com dados inválidos para ver se o erro é tratado.  
     *Exemplo:* Enviar nome vazio `""` e receber `"Erro: nome obrigatório"`.

4. **Por que testar entradas inválidas?**  
   Para garantir que o sistema não trave e não salve dados incorretos ou incompletos no banco de dados.

5. **Como testes automatizados ajudam a encontrar regressões?**  
   Eles rodam em poucos segundos. Toda vez que você altera o código, pode executá-los para ter certeza de que nenhuma regra antiga foi quebrada.

6. **O que pode acontecer ao alterar uma regra sem executar testes?**  
   Podemos introduzir erros e falhas no sistema sem perceber, gerando retrabalho e problemas para os usuários finais.

7. **Qual a diferença entre testar a função isolada e testar a interface com banco de dados?**  
   - **Função isolada (unitário):** Roda na memória do computador, é super rápido e não depende de nada externo.  
   - **Com banco de dados (integração):** É mais lento, depende de conexão de rede, cria dados reais e exige limpeza do banco após o teste.

---

## 🧪 Resumo dos 8 Testes

| # | Cenário | Tipo | Entrada | Retorno Esperado | Resultado |
|---|---|---|---|---|:---:|
| 1 | Usuário válido | Positivo | `"Maria"`, `"maria@email.com"`, `25` | `"Usuário cadastrado com sucesso"` | ✅ Passou |
| 2 | Nome vazio | Negativo | `""`, `"maria@email.com"`, `25` | `"Erro: nome obrigatório"` | ✅ Passou |
| 3 | E-mail sem @ | Negativo | `"Carlos"`, `"emailinvalido"`, `30` | `"Erro: email inválido"` | ✅ Passou |
| 4 | Menor de 18 anos | Negativo | `"Pedro"`, `"pedro@email.com"`, `16` | `"Erro: usuário menor de idade"` | ✅ Passou |
| 5 | Nome só com espaços | Negativo | `"   "`, `"ana@email.com"`, `22` | `"Erro: nome obrigatório"` | ✅ Passou |
| 6 | Idade exata de 18 anos | Positivo | `"Ana"`, `"ana@email.com"`, `18` | `"Usuário cadastrado com sucesso"` | ✅ Passou |
| 7 | E-mail vazio | Negativo | `"João"`, `""`, `28` | `"Erro: email inválido"` | ✅ Passou |
| 8 | E-mail sem domínio (Desafio) | Negativo | `"Lucas"`, `"usuario@"`, `21` | `"Erro: email inválido"` | ✅ Passou |

---

## 📷 Resultado da Execução dos Testes

```text
 ✓ tests/cadastro.test.js (8 tests) 2ms

 Test Files  1 passed (1)
      Tests  8 passed (8)
   Duration  250ms
```

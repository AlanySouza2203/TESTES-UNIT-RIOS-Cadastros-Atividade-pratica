# ATIVIDADE PRÁTICA — TESTES UNITÁRIOS COM VITEST

Este projeto implementa uma função de validação de cadastro de clientes em Node.js 24 utilizando o framework de testes [Vitest](https://vitest.dev/).

---

## 📁 Estrutura do Projeto

```text
cadastro-vitest/
├── src/
│   └── cadastro.js          # Implementação das regras de negócio
├── tests/
│   └── cadastro.test.js     # Suíte com os 8 testes unitários
├── package.json             # Configurações do projeto e scripts de teste
├── package-lock.json        # Árvore de dependências resolvida
└── README.md                # Documentação completa e respostas das etapas
```

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
- **Node.js**: v24.x ou superior
- **npm**: v11.x ou superior

### Instalação das dependências
Na raiz do projeto (`cadastro-vitest`), execute:
```bash
npm install
```

### Comandos de Teste

- **Executar todos os testes uma única vez:**
  ```bash
  npm test
  ```
  *(Equivalente a `vitest run`)*

- **Executar testes em modo observação (Watch Mode):**
  ```bash
  npm run test:watch
  ```
  *(Equivalente a `vitest`, observa alterações nos arquivos e reexecuta automaticamente)*

---

## 📝 Respostas das Perguntas

---

### 🔹 Etapa 3 — Anatomia dos Testes no Vitest

#### (a) O que faz `describe()`?
> **Documentação Vitest:** [`describe(name, factoryFn)`](https://vitest.dev/api/#describe)

O `describe()` é uma função utilizada para **agrupar testes relacionados** em blocos ou suítes lógicas. Ele organiza a estrutura do relatório no terminal, melhora a legibilidade do código e permite aplicar configurações específicas de ciclo de vida (como `beforeEach`, `afterEach`) exclusivas para aquele conjunto de testes. No projeto, agrupamos todos os cenários sob `"Testes de cadastro de usuários"`.

#### (b) Qual a função de `it()`?
> **Documentação Vitest:** [`it(name, fn)`](https://vitest.dev/api/#it) / [`test(name, fn)`](https://vitest.dev/api/#test)

O `it()` (ou `test()`, que é um apelido/alias idêntico no Vitest) define um **caso de teste individual** (um cenário de teste). Ele recebe como primeiro argumento uma string descritiva que narra o comportamento esperado (ex.: `"deve cadastrar um usuário válido"`) e como segundo argumento uma função que executa a ação e valida as expectativas.

#### (c) O que verifica `expect().toBe()`?
> **Documentação Vitest:** [`expect(value)`](https://vitest.dev/api/expect.html) e [`.toBe(expected)`](https://vitest.dev/api/expect.html#tobe)

- O `expect(resultado)` encapsula o valor real retornado pela execução do código e fornece métodos de asserção (*matchers*).
- O matcher `.toBe(esperado)` realiza uma verificação de **igualdade estrita** utilizando internamente o operador `Object.is()`. Ele compara se o valor recebido é exatamente igual ao valor esperado em valor e tipo primitivo (ou a mesma referência de memória no caso de objetos).

---

### 🔹 Etapa 5 — Investigação da Falha Proposital (Regressão)

Nesta etapa, a validação de idade mínima foi alterada propositalmente de `idade < 18` para `idade < 16`.

#### 1. Qual teste falhou?
O **Teste 4**:
`it("deve retornar erro quando o usuário for menor de 18 anos")` com os dados `Pedro / pedro@email.com / 16`.

#### 2. Qual valor era esperado?
```text
"Erro: usuário menor de idade"
```

#### 3. Qual valor foi recebido?
```text
"Usuário cadastrado com sucesso"
```

#### 4. Por que esse erro é uma regressão?
Uma **regressão** ocorre quando uma alteração ou refatoração no código introduz uma falha em uma funcionalidade que anteriormente já funcionava e estava aprovada conforme os requisitos. No caso, a regra de negócio do sistema exige maioridade (18 anos). Ao mudar o limite para 16, um usuário de 16 anos foi indevidamente aceito pelo sistema, violando um comportamento já estabelecido e previamente coberto por testes. O teste automatizado agiu como uma rede de segurança, detectando a regressão imediatamente antes de ir para produção.

---

### 🔹 Etapa 6 — Desafio: E-mail Incompleto

#### Cenário de Falha Inicial:
A implementação inicial verificava apenas `!email.includes("@")`. Ao criar o teste com `Lucas`, `usuario@` e `21`, o Vitest acusou falha porque a string continha o caractere `@`, fazendo a validação passar e retornar `"Usuário cadastrado com sucesso"`, quando o esperado era `"Erro: email inválido"`.

#### Solução Implementada em `src/cadastro.js`:
Foi adicionada a verificação para exigir a presença de um domínio com ponto após o `@`:
```javascript
const partesEmail = email.split("@");
// Exige exatamente um '@' e que a parte do domínio contenha ponto não terminal
if (partesEmail.length !== 2) {
  return "Erro: email inválido";
}

const dominio = partesEmail[1];
if (!dominio.includes(".") || dominio.startsWith(".") || dominio.endsWith(".")) {
  return "Erro: email inválido";
}
```
Após o ajuste, o 8º teste passou com sucesso juntamente com os outros 7 testes.

---

### 🔹 Etapa 8 — Reflexão Teórica

#### 1. O que é teste unitário?
Um **teste unitário** é uma técnica de teste automatizado focada em validar a menor unidade testável de um software de forma isolada (geralmente uma função, método ou classe). O objetivo é garantir que essa unidade processe as entradas e retorne os resultados corretos de acordo com suas regras de negócio, sem depender de elementos externos (como rede, banco de dados ou UI).

#### 2. Por que usar Vitest neste projeto?
O **Vitest** é um dos frameworks de testes mais modernos e velozes do ecossistema JavaScript/TypeScript. Seus principais benefícios neste projeto incluem:
- **Suporte nativo a ES Modules (`import/export`)**: não exige transpiladores complexos como Babel.
- **Velocidade extrema**: construído sobre o Vite e esbuild, executa testes em milissegundos com inicialização instantânea.
- **Watch Mode inteligente**: monitora apenas os arquivos modificados e seus respectivos testes.
- **API compatível com Jest**: sintaxe familiar (`describe`, `it`, `expect`), facilitando o aprendizado e a adoção.
- **Zero configuração inicial**: funciona perfeitamente logo após a instalação com `vitest run`.

#### 3. Qual a diferença entre teste positivo e negativo? Dê um exemplo de cada.
- **Teste Positivo (Happy Path / Caminho Feliz):** Testa o comportamento do sistema quando os dados fornecidos são válidos e cumprem todos os requisitos esperados.
  - *Exemplo:* Cadastro com `"Maria"`, `"maria@email.com"`, `25` $\rightarrow$ Retorna `"Usuário cadastrado com sucesso"`.
- **Teste Negativo:** Testa a resiliência e o tratamento de erros do sistema ao receber dados inválidos, incompletos ou fora do padrão esperado.
  - *Exemplo:* Cadastro com `""`, `"maria@email.com"`, `25` $\rightarrow$ Retorna `"Erro: nome obrigatório"`.

#### 4. Por que testar entradas inválidas?
Testar entradas inválidas é fundamental para:
- Evitar que dados corrompidos ou inconsistentes cheguem à camada de persistência (banco de dados).
- Garantir que o sistema responda de maneira graciosa com mensagens de erro claras, em vez de disparar exceções não tratadas (*crashes*).
- Aumentar a segurança da aplicação contra vulnerabilidades e abusos de formulário.

#### 5. Como testes automatizados ajudam a encontrar regressões?
Como os testes são automatizados e rápidos, eles podem ser executados a cada pequena alteração de código ou em pipelines de CI/CD (Integração Contínua). Se uma nova funcionalidade ou refatoração quebrar inadvertidamente um comportamento pré-existente, a suíte de testes falhará imediatamente, apontando o arquivo, a linha e o motivo exato da quebra antes que o bug alcance o cliente final.

#### 6. O que pode acontecer ao alterar uma regra sem executar testes?
Sem testes, o desenvolvedor precisa confiar em checagens manuais ou suposições. Alterar uma regra pode:
- Gerar **efeitos colaterais inesperados** em outros pontos do sistema que dependem daquele comportamento.
- Permitir que bugs críticos cheguem ao ambiente de produção.
- Causar prejuízos financeiros, perda de integridade de dados e retrabalho para a equipe de desenvolvimento.

#### 7. Qual a diferença entre testar a função isolada e testar a interface com banco de dados?
- **Teste de Função Isolada (Teste Unitário):**
  - Rápido (executa em poucos milissegundos).
  - Executa puramente na memória (CPU/RAM).
  - Deterministico: para uma dada entrada, a saída é sempre a mesma.
  - Não possui dependências externas ou efeitos colaterais.
- **Teste de Interface com Banco de Dados (Teste de Integração):**
  - Mais lento (envolve I/O de disco, conexões de rede e transações).
  - Exige ambiente configurado (banco de dados em execução, migrações, dados de semente (*seed*)).
  - Requer limpeza e restauração de estado antes e depois de cada teste para evitar contaminação entre cenários.

---

## 📊 Evidências de Execução dos Testes

### 1. Evidência do Teste Reprovado (Etapa 5 — Regressão da Idade < 16)
```text
> cadastro-vitest@1.0.0 test
> vitest run

 RUN  v5.0.5 C:/Users/alany57429326/.gemini/antigravity/scratch/cadastro-vitest

 ❯ tests/cadastro.test.js (7 tests | 1 failed) 6ms
   ❯ Testes de cadastro de usuários (7)
     ✓ deve cadastrar um usuário válido 1ms
     ✓ deve retornar erro quando o nome for vazio 0ms
     ✓ deve retornar erro quando o e-mail não tiver @ 0ms
     × deve retornar erro quando o usuário for menor de 18 anos 4ms
     ✓ deve retornar erro quando o nome contiver apenas espaços 0ms
     ✓ deve permitir o cadastro de usuário com exatamente 18 anos 0ms
     ✓ deve retornar erro quando o e-mail for vazio 0ms

⎯⎯⎯⎯⎯⎯⎯ Failed Tests 1 ⎯⎯⎯⎯⎯⎯⎯

 FAIL  tests/cadastro.test.js > Testes de cadastro de usuários > deve retornar erro quando o usuário for menor de 18 anos
AssertionError: expected 'Usuário cadastrado com sucesso' to be 'Erro: usuário menor de idade' // Object.is equality

Expected: "Erro: usuário menor de idade"
Received: "Usuário cadastrado com sucesso"

 ❯ tests/cadastro.test.js:26:23
     24|   it("deve retornar erro quando o usuário for menor de 18 anos", () =>…
     25|     const resultado = cadastrarUsuario("Pedro", "pedro@email.com", 16);
     26|     expect(resultado).toBe("Erro: usuário menor de idade");
       |                       ^
     27|   });
     28|

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯

 Test Files  1 failed (1)
      Tests  1 failed | 6 passed (7)
   Start at  20:31:43
   Duration  318ms
```

### 2. Evidência dos 8 Testes Aprovados (Etapa 6 — Final com Desafio)
```text
> cadastro-vitest@1.0.0 test
> vitest run

 RUN  v5.0.5 C:/Users/alany57429326/.gemini/antigravity/scratch/cadastro-vitest

 ✓ tests/cadastro.test.js (8 tests) 2ms

 Test Files  1 passed (1)
      Tests  8 passed (8)
   Start at  20:32:28
   Duration  254ms (transform 52%, import 34%, worker 9%, tests 5%)
```

---

## 📌 Tabela Resumo dos 8 Testes Implementados

| # | Cenário de Teste | Tipo | Parâmetros de Entrada (`nome`, `email`, `idade`) | Retorno Esperado | Status |
|---|---|---|---|---|:---:|
| 1 | Usuário válido | Positivo | `"Maria"`, `"maria@email.com"`, `25` | `"Usuário cadastrado com sucesso"` | ✅ Passou |
| 2 | Nome vazio | Negativo | `""`, `"maria@email.com"`, `25` | `"Erro: nome obrigatório"` | ✅ Passou |
| 3 | E-mail sem @ | Negativo | `"Carlos"`, `"emailinvalido"`, `30` | `"Erro: email inválido"` | ✅ Passou |
| 4 | Menor de 18 anos | Negativo | `"Pedro"`, `"pedro@email.com"`, `16` | `"Erro: usuário menor de idade"` | ✅ Passou |
| 5 | Nome só com espaços | Negativo | `"   "`, `"ana@email.com"`, `22` | `"Erro: nome obrigatório"` | ✅ Passou |
| 6 | Idade limítrofe (18 anos) | Positivo | `"Ana"`, `"ana@email.com"`, `18` | `"Usuário cadastrado com sucesso"` | ✅ Passou |
| 7 | E-mail vazio | Negativo | `"João"`, `""`, `28` | `"Erro: email inválido"` | ✅ Passou |
| 8 | E-mail sem domínio após @ (Desafio) | Negativo | `"Lucas"`, `"usuario@"`, `21` | `"Erro: email inválido"` | ✅ Passou |


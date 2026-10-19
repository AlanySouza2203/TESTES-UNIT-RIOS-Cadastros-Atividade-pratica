import { describe, it, expect } from "vitest";
import { cadastrarUsuario } from "../src/cadastro.js";

describe("Testes de cadastro de usuários", () => {
  // Teste 1: Usuário válido
  it("deve cadastrar um usuário válido", () => {
    const resultado = cadastrarUsuario("Maria", "maria@email.com", 25);
    expect(resultado).toBe("Usuário cadastrado com sucesso");
  });

  // Teste 2: Nome vazio
  it("deve retornar erro quando o nome for vazio", () => {
    const resultado = cadastrarUsuario("", "maria@email.com", 25);
    expect(resultado).toBe("Erro: nome obrigatório");
  });

  // Teste 3: E-mail inválido
  it("deve retornar erro quando o e-mail não tiver @", () => {
    const resultado = cadastrarUsuario("Carlos", "emailinvalido", 30);
    expect(resultado).toBe("Erro: email inválido");
  });

  // Teste 4: Menor de idade
  it("deve retornar erro quando o usuário for menor de 18 anos", () => {
    const resultado = cadastrarUsuario("Pedro", "pedro@email.com", 16);
    expect(resultado).toBe("Erro: usuário menor de idade");
  });

  // Teste 5: Só espaços no nome
  it("deve retornar erro quando o nome contiver apenas espaços", () => {
    const resultado = cadastrarUsuario("   ", "ana@email.com", 22);
    expect(resultado).toBe("Erro: nome obrigatório");
  });

  // Teste 6: Idade exatamente 18
  it("deve permitir o cadastro de usuário com exatamente 18 anos", () => {
    const resultado = cadastrarUsuario("Ana", "ana@email.com", 18);
    expect(resultado).toBe("Usuário cadastrado com sucesso");
  });

  // Teste 7: E-mail vazio
  it("deve retornar erro quando o e-mail for vazio", () => {
    const resultado = cadastrarUsuario("João", "", 28);
    expect(resultado).toBe("Erro: email inválido");
  });

  // Teste 8 (Desafio): E-mail incompleto sem domínio válido após o @
  it("deve retornar erro quando o e-mail não tiver domínio com ponto após o @", () => {
    const resultado = cadastrarUsuario("Lucas", "usuario@", 21);
    expect(resultado).toBe("Erro: email inválido");
  });
});

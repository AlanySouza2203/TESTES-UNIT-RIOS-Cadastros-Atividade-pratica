export function cadastrarUsuario(nome, email, idade) {
  // 1. Nome vazio ou composto somente de espaços
  if (!nome || typeof nome !== "string" || nome.trim() === "") {
    return "Erro: nome obrigatório";
  }

  // 2. E-mail vazio, sem @ ou sem domínio válido com ponto após o @ (Desafio Etapa 6)
  if (!email || typeof email !== "string" || !email.includes("@")) {
    return "Erro: email inválido";
  }

  const partesEmail = email.split("@");
  // Exige exatamente um '@' e que a parte do domínio contenha ponto
  if (partesEmail.length !== 2) {
    return "Erro: email inválido";
  }

  const dominio = partesEmail[1];
  if (!dominio.includes(".") || dominio.startsWith(".") || dominio.endsWith(".")) {
    return "Erro: email inválido";
  }

  // 3. Idade menor que 18
  if (idade < 18) {
    return "Erro: usuário menor de idade";
  }

  // 4. Dados aceitos
  return "Usuário cadastrado com sucesso";
}


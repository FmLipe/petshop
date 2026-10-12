// Funções que conversam com a API do petshop (veja o projeto petshop-api).
//
// Usamos o "fetch", que já vem pronto no navegador — não precisa instalar
// nenhuma biblioteca extra para fazer requisições HTTP.
//
// Graças ao proxy configurado em vite.config.js, "/api/servicos" é
// redirecionado automaticamente para http://localhost:3001/api/servicos.

const BASE_URL = '/api/servicos';

// Busca a lista de todos os Servicos cadastrados.
export async function listarServicos() {
  const resposta = await fetch(BASE_URL);
  if (!resposta.ok) {
    throw new Error('Não foi possível carregar os servicos.');
  }
  return resposta.json();
}

// Busca um único servicos pelo id_servicos (usado na página de edição).
export async function buscarServicos(id) {
  const resposta = await fetch(`${BASE_URL}/${id}`);
  if (!resposta.ok) {
    throw new Error('Servicos não encontrado.');
  }
  return resposta.json();
}

// Cria um novo Servicos. "dados" é um objeto com os campos do formulário.
export async function criarCliente(dados) {
  const resposta = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados),
  });
  if (!resposta.ok) {
    throw new Error('Não foi possível cadastrar o Servicos.');
  }
  return resposta.json();
}

// Atualiza um Servicos já existente, identificado pelo id_Servicos.
export async function atualizarCliente(id, dados) {
  const resposta = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados),
  });
  if (!resposta.ok) {
    throw new Error('Não foi possível atualizar o Servicos.');
  }
  return resposta.json();
}

// Remove um Servicos pelo id_Servicos.
export async function removerServicos(id) {
  const resposta = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
  if (!resposta.ok) {
    throw new Error('Não foi possível remover o Servicos.');
  }
}

// ---------------------------------------------------------------------
// PONTO DE EXERCÍCIO
// ---------------------------------------------------------------------
// Para o cadastro de "serviços oferecidos", crie um arquivo parecido,
// por exemplo "src/api/servicos.js", copiando estas mesmas cinco
// funções e trocando BASE_URL para '/api/servicos'.
// ---------------------------------------------------------------------

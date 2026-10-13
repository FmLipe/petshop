const BASE_URL = '/api/servicos';

// Busca a lista de todos os serviços cadastrados
export async function listarServicos() {
  const resposta = await fetch(BASE_URL);
  if (!resposta.ok) {
    throw new Error('Não foi possível carregar os serviços.');
  }
  return resposta.json();
}

// Busca um único serviço pelo ID (usado na edição)
export async function buscarServico(id) {
  const resposta = await fetch(`${BASE_URL}/${id}`);
  if (!resposta.ok) {
    throw new Error('Serviço não encontrado.');
  }
  return resposta.json();
}

// Cria um novo serviço
export async function criarServico(dados) {
  const resposta = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados),
  });
  if (!resposta.ok) {
    throw new Error('Não foi possível cadastrar o serviço.');
  }
  return resposta.json();
}

// Atualiza um serviço existente
export async function atualizarServico(id, dados) {
  const resposta = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados),
  });
  if (!resposta.ok) {
    throw new Error('Não foi possível atualizar o serviço.');
  }
  return resposta.json();
}

// Remove um serviço pelo ID
export async function removerServico(id) {
  const resposta = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!resposta.ok) {
    throw new Error('Não foi possível remover o serviço.');
  }
}
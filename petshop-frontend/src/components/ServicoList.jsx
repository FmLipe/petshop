import { Link } from 'react-router-dom';

// Tabela com os clientes cadastrados e os botões de editar/remover.
// "table-responsive" faz a tabela rolar na horizontal em telas pequenas,
// em vez de quebrar o layout.
function ServicoList({ servicos= [], aoRemover }) {
  if (!servicos || servicos.length === 0) {
    return <p>Nenhum serviço cadastrado ainda.</p>;
  }

  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover align-middle">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Preço (R$)</th>
            <th>Duração (min)</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {servicos.map((servico) => (
            <tr key={servico.id_servico}>
              <td>{servico.nome}</td>
              <td>{servico.descricao}</td>
              <td>{Number(servico.preco).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                })}
                </td>
              <td>{servico.duracao_minutos ? `${servico.duracao_minutos} min` : "-"}</td>
              <td className="text-nowrap">
                <Link
                  to={`/servicos/${servico.id_servico}/editar`}
                  className="btn btn-sm btn-outline-primary me-2"
                >
                  Editar
                </Link>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => aoRemover(servico.id_servico)}
                >
                  Remover
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ServicoList;

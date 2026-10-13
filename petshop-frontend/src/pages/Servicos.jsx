import { Link } from 'react-router-dom';

function Servicos() {
  return (
    <div className="container py-4">
      <Link to="/" className="btn btn-link text-decoration-none mb-3 p-0">
        ← Voltar
      </Link>
      <h1 className="mb-4">🐾 Serviços</h1>
      <p className="lead">
        Selecione uma opção para gerir os serviços do petshop:
      </p>

      <div className="d-flex gap-3 mt-4">
        <Link to="/servicos/lista" className="btn btn-primary">
          Listar Serviços
        </Link>
        <Link to="/servicos/novo" className="btn btn-success">
          Cadastrar Novo Serviço
        </Link>
      </div>
    </div>
  );
}

export default Servicos;
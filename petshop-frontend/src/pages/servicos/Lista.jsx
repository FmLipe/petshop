import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { listarServicos, removerServico } from '../../api/servicos';
import ServicoList from '../../components/ServicoList';

function ServicosLista() {
  const [servicos, setServicos] = useState([]);
  //Mostra um indicador visual enquanto o fetch está rodando    
  const [carregando, setCarregando] = useState(true);
  //Caso a requisição falhe, mostra mensagem de erro
  const [erro, setErro] = useState(null);

  //função que vai buscar os serviços na lista da API
  async function carregar() {
    try {
      setCarregando(true);
      setErro(null);
      const dados = await listarServicos();
      setServicos(dados);
    } catch (err) {
      setErro(err.message);
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregar();
  }, []);

  //Confirmar a remoção de um serviço
  async function handleRemover(id) {
    const confirmou = window.confirm('Tem certeza de que deseja remover este serviço?');
    if (!confirmou) return;

    try {
      await removerServico(id);
      setServicos((anteriores) => anteriores.filter((s) => s.id_servico !== id));
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    //Os botões que a gente vai clicar, etc.
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Serviços</h1>
        <Link to="/servicos/novo" className="btn btn-primary">
          Novo Serviço
        </Link>
      </div>

      {carregando && <p>Carregando serviços...</p>}
      {erro && <div className="alert alert-danger">{erro}</div>}

      {!carregando && !erro && (
        <ServicoList servicos={servicos} aoRemover={handleRemover} />
      )}
    </div>
  );
}

export default ServicosLista;
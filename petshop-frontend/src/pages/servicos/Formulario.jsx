import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { buscarServico, criarServico, atualizarServico } from '../../api/servicos';
import ServicoForm from '../../components/ServicoForm';

function ServicosFormulario() {
  const { id } = useParams();
  const navigate = useNavigate();
  const modoEdicao = Boolean(id);

  const [valoresIniciais, setValoresIniciais] = useState(null);
  const [carregando, setCarregando] = useState(modoEdicao);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    if (!modoEdicao) return;

    async function carregarServico() {
      try {
        setCarregando(true);
        const dados = await buscarServico(id);
        setValoresIniciais(dados);
      } catch (err) {
        setErro(err.message);
      } finally {
        setCarregando(false);
      }
    }

    carregarServico();
  }, [id, modoEdicao]);

  async function handleSalvar(dados) {
    try {
      if (modoEdicao) {
        await atualizarServico(id, dados);
      } else {
        await criarServico(dados);
      }
      navigate('/servicos');
    } catch (err) {
      alert(err.message);
    }
  }

  function handleCancelar() {
    navigate('/servicos');
  }

  if (carregando) {
    return <p>Carregando dados do serviço...</p>;
  }

  if (erro) {
    return <div className="alert alert-danger">{erro}</div>;
  }

  return (
    <div>
      <h1 className="mb-4">{modoEdicao ? 'Editar Serviço' : 'Novo Serviço'}</h1>
      <ServicoForm
        valoresIniciais={valoresIniciais}
        modoEdicao={modoEdicao}
        aoSalvar={handleSalvar}
        aoCancelar={handleCancelar}
      />
    </div>
  );
}

export default ServicosFormulario;
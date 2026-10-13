import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

// Valores padrão para os campos que a página de criação não informa.
const VALORES_PADRAO = {
  nome: '',
  descricao: '',
  preco: '',
  duracao_minutos: '',
};

// Formulário de cadastro/edição de clientes, usando a biblioteca
// react-hook-form para cuidar do estado dos campos e das validações,
// e classes do Bootstrap para o layout (grid, form-control, etc.).
//
// Esse componente não sabe se está criando ou editando: quem decide isso
// é a página que o usa (veja src/pages/clientes/Formulario.jsx), passando
// os valores iniciais e o que fazer ao salvar/cancelar.
function ServicoForm({ valoresIniciais, modoEdicao, aoSalvar, aoCancelar }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { ...VALORES_PADRAO, ...valoresIniciais } });

  // Se os valores iniciais chegarem depois (ex.: enquanto a página busca o
  // cliente na API), atualizamos o formulário assim que eles ficarem prontos.
  useEffect(() => {
    reset({ ...VALORES_PADRAO, ...valoresIniciais });
  }, [valoresIniciais, reset]);

  return (
    <form className="card" onSubmit={handleSubmit(aoSalvar)}>
      <div className="card-body">
        <div className="row g-3">
          <div className="col-md-6">
            <label htmlFor="nome" className="form-label">
              Nome do servico
            </label>
            <input
              id="nome"
              className={`form-control ${errors.nome ? 'is-invalid' : ''}`}
              {...register('nome', { required: 'Informe o nome.' })}
            />
            {errors.nome && <div className="invalid-feedback">{errors.nome.message}</div>}
          </div>

          <div className="col-md-6">
            <label htmlFor="preco" className="form-label">
              Preco (R$)
            </label>
            <input
              id="preco"
              type = "number"
              step = "0.01"
              min = "0"
              placeholder="0.00"
              className={`form-control ${errors.preco ? 'is-invalid' : ''}`}
              {...register('preco', { 
                required: 'Informe o preço.', 
                valueAsNumber: true,
                min: { value: 0, message: 'O valor não pode ser negativo.' }
            })}
            />
            {errors.preco && (
              <div className="invalid-feedback">{errors.preco.message}</div>
            )}
          </div>

          <div className="col-md-3">
            <label html For="duracao_minutos" className="form-label">
              Duração (minutos)
            </label>
            <input
            id = "duraçao_minutos"
            type = "number"
            min = "1"
            placeholder='Ex.: 30'
            className="form-control"
            {...register('duracao_minutos', {
                setValueAs: (v) => (v === '' ? null : Number(v)),        
            })}
            />
          </div>

          <div className="col-md-12">
            <label htmlFor="descricao" className="form-label">
              Descricao
            </label>
            <textarea
              id="descricao"
              rows = "3"
              placeholder="Mais detalhes do serviço."
              className= "form-control"
              {...register('descricao')}
            />
            </div>
          </div>


        <div className="mt-4 d-flex gap-2">
          <button type="submit" className="btn btn-success" disabled={isSubmitting}>
            {modoEdicao ? 'Salvar alterações' : 'Cadastrar'}
          </button>
          <button type="button" className="btn btn-outline-secondary" onClick={aoCancelar}>
            Cancelar
          </button>
        </div>
      </div>
    </form>
  );
}

export default ServicoForm;

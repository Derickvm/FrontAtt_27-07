import { useForm } from "react-hook-form";
import { api } from "../config_axios";
import { useState } from "react";
import { Helmet } from "react-helmet";

const Cadastrar_prestador = () => {
  const { register, handleSubmit, reset } = useForm();
  const [aviso, setAviso] = useState("");

  const salvar = async (campos) => {
    try {
      // Cadastrar o prestador primeiro
      const responsePrestador = await api.post("prestador", {
        prestador_nome: campos.prestador_nome,
        prestador_cnpj: campos.prestador_cnpj,
        prestador_cpf: campos.prestador_cpf,
        prestador_razao_social: campos.prestador_razao_social,
        prestador_email: campos.prestador_email,
        prestador_senha: campos.prestador_senha,
      });

      setAviso("Prestador e telefone cadastrados com sucesso!");
      reset();
    } catch (error) {
      setAviso("Erro ao cadastrar prestador e telefone!");
    }

      const prestador_id = responsePrestador.data.prestador_id; // Supondo que a resposta do servidor inclui o ID do prestador
      console.log(prestador_id);

      // Cadastrar o telefone do prestador
      await api.post("telefone", {
        prestador: {
          prestador_id: prestador_id
        },
        telefone_numero: campos.telefone_numero,
      });

      
  };

  return (
    <>
      <Helmet>
        <title>Cadastro de Prestadores</title>
      </Helmet>
      <div className="container p-5 bg-light text-dark rounded" style={{ borderColor: "#851d86", borderWidth: "20px", borderStyle: "solid" }}>
        <div className="container p-5 bg-light text-dark rounded">
          <h4 className="fst-italic mb-3">Preencha os campos para se cadastrar</h4>
          <form onSubmit={handleSubmit(salvar)}>
            <div className="row">
              <div className="col">
                <label htmlFor="prestador_nome">Nome:</label>
                <input
                  type="text"
                  className="form-control"
                  id="prestador_nome"
                  required
                  autoFocus
                  {...register("prestador_nome")}
                />
              </div>
              <div className="col">
                <label htmlFor="prestador_cnpj">CNPJ:</label>
                <input
                  type="text"
                  className="form-control"
                  id="prestador_cnpj"
                  {...register("prestador_cnpj")}
                />
              </div>
              <div className="col">
                <label htmlFor="prestador_cpf">CPF:</label>
                <input
                  type="text"
                  className="form-control"
                  id="prestador_cpf"
                  required
                  {...register("prestador_cpf")}
                />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <label htmlFor="telefone_numero">Telefone:</label>
                <input
                  type="text"
                  className="form-control"
                  id="telefone_numero"
                  required
                  {...register("telefone_numero")}
                />
              </div>
              <div className="col">
                <label htmlFor="prestador_email">Email:</label>
                <input
                  type="email"
                  className="form-control"
                  id="prestador_email"
                  required
                  {...register("prestador_email")}
                />
              </div>
              <div className="col">
                <label htmlFor="prestador_razao_social">Razão Social:</label>
                <input
                  type="text"
                  className="form-control"
                  id="prestador_razao_social"
                  {...register("prestador_razao_social")}
                />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <label htmlFor="prestador_senha">Senha:</label>
                <input
                  type="password"
                  className="form-control"
                  id="prestador_senha"
                  required
                  {...register("prestador_senha")}
                />
              </div>
            </div>
            <input
              type="submit"
              className="btn btn-primary mt-3"
              value="Cadastrar"
            />
            <input
              type="reset"
              className="btn btn-danger mt-3 ms-3"
              value="Cancelar"
            />
          </form>
          <div className="alert mt-3">{aviso}</div>
        </div>
      </div>
    </>
  );
};

export default Cadastrar_prestador;

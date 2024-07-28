import { useForm } from "react-hook-form";
import { api } from "../config_axios";
import { useState } from "react";
import { Helmet } from "react-helmet";

const Cadastrar_Usuario = () => {
  const { register, handleSubmit, reset } = useForm();
  const [aviso, setAviso] = useState("");

  const salvar = async (campos) => {
    try {
      // Cadastrar o usuário primeiro
      const responseUsuario = await api.post("usuario", {
        usuario_nome: campos.usuario_nome,
        usuario_cpf: campos.usuario_cpf,
        usuario_email: campos.usuario_email,
        usuario_data_nascimento: campos.usuario_data_nascimento,
        usuario_senha: campos.usuario_senha,
      });

      setAviso("Usuário e telefone cadastrados com sucesso!");
      reset();
    } catch (error) {
      setAviso("Erro ao cadastrar usuário e telefone!");
    }

      const usuario_id = responseUsuario.data.usuario_id; // Supondo que a resposta do servidor inclui o ID do usuário
      console.log(usuario_id);

      // Cadastrar o telefone do usuario_id
      await api.post("telefone", {
        usuario: {
          usuario: usuario_id,
        },
        telefone_numero: campos.telefone_numero,
      });

      
  };

  return (
    <>
      <Helmet>
        <title>Cadastro de Usuário</title>
      </Helmet>
      <div className="container p-5 bg-light text-dark rounded" style={{ borderColor: "#851d86", borderWidth: "20px", borderStyle: "solid" }}>
        <div className="container p-5 bg-light text-dark rounded">
          <h4 className="fst-italic mb-3">Preencha os campos para se cadastrar</h4>
          <form onSubmit={handleSubmit(salvar)}>
            <div className="form-group">
              <label htmlFor="usuario_nome">Nome:</label>
              <input
                type="text"
                className="form-control"
                id="usuario_nome"
                required
                autoFocus
                {...register("usuario_nome")}
              />
            </div>
            <div className="form-group">
              <label htmlFor="usuario_cpf">CPF:</label>
              <input
                type="text"
                className="form-control"
                id="usuario_cpf"
                required
                autoFocus
                {...register("usuario_cpf")}
              />
            </div>
            <div className="form-group">
              <label htmlFor="telefone_numero">Telefone:</label>
              <input
                type="text"
                className="form-control"
                id="telefone_numero"
                required
                autoFocus
                {...register("telefone_numero")}
              />
            </div>
            <div className="form-group mt-2">
              <label htmlFor="usuario_email">Email:</label>
              <input
                type="email"
                className="form-control"
                id="usuario_email"
                required
                {...register("usuario_email")}
              />
            </div>
            <div className="form-group mt-2">
              <label htmlFor="usuario_data_nascimento">Data de Nascimento:</label>
              <input
                type="date"
                className="form-control"
                id="usuario_data_nascimento"
                required
                {...register("usuario_data_nascimento")}
              />
            </div>
            <div className="form-group mt-2">
              <label htmlFor="usuario_senha">Senha:</label>
              <input
                type="password"
                className="form-control"
                id="usuario_senha"
                required
                {...register("usuario_senha")}
              />
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

export default Cadastrar_Usuario;

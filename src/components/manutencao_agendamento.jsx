import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { api } from "../config_axios";
import ItemLista from "./ItemLista";  

const ManutencaoAgendamento = () => {
    const { register, handleSubmit, reset } = useForm();
    const [agendamento, setAgendamento] = useState([]);

    const obterLista = async () => {
        try {
            const lista = await api.get("agendamento");
            setAgendamento(Array.isArray(lista.data) ? lista.data : []);
        } catch (error) {
            alert(`Erro: Não foi possível obter os dados: ${error}`);
        }
    };

    useEffect(() => {
        obterLista();
    }, []);

    const filtrarLista = async (campos) => {
        try {
            const lista = await api.get(`agendamento/filtro/${campos.palavra}`);
            lista.data.length
                ? setAgendamento(Array.isArray(lista.data) ? lista.data : [])
                : alert("Não há Agendamento cadastrado com a palavra chave pesquisada");
        } catch (error) {
            alert(`Erro: Não foi possível obter os dados: ${error}`);
        }
    };

    const excluir = async (agendamento_id) => {
        if (!window.confirm(`Confirma a exclusão do agendamento${agendamento_id}?`)) {
            return;
        }
        try {
            await api.delete(`agendamento/${agendamento_id}`);
            setAgendamento(agendamento.filter(agendamento => agendamento.agendamento_id !== agendamento_id));
        } catch (error) {
            alert(`Erro: Não foi possível excluir o agendamento ${agendamento_id}: ${error}`);
        }
    };

    const alterar = async (agendamento_id) => {
        const novoStatus = prompt(`Digite o novo status do agendamento ${agendamento_id}`);
        if (!novoStatus) {
            alert('Digite um status válido!');
            return;
        }
        try {
            await api.put(`agendamento/${agendamento_id}`, { status: novoStatus });
            const agendamentoAtualizado = agendamento.map(ag => 
                ag.agendamento_id === agendamento_id ? { ...ag, agendamento_status: novoStatus } : ag
            );
            setAgendamento(agendamentoAtualizado);
        } catch (error) {
            alert(`Erro: Não foi possível alterar o agendamento ${agendamento_id}: ${error}`);
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-7">
                    <h4 className="fst-italic mt-3">Alteração de agendamento</h4>
                </div>
                <div className="col-sm-5">
                    <form onSubmit={handleSubmit(filtrarLista)}>
                        <div className="input-group mt-3">
                            <input type="text" className="form-control" placeholder="Titulo" required {...register("palavra")} />
                            <input type="submit" className="btn btn-primary" value="Pesquisar" />
                            <input type="button" className="btn btn-danger" value="Todos" onClick={() => { reset({ palavra: "" }); obterLista(); }} />
                        </div>
                    </form>
                </div>
            </div>

            <table className="table table-striped mt-3">
                <thead>
                    <tr>
                        <th>Cód.</th>
                        <th>Data</th>
                        <th>Hora</th>
                        <th>Status</th>
                        <th>Nome do Servico</th>
                        <th>Nome do Prestador</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(agendamento) && agendamento.map((agendamento) => (
                        <ItemLista
                            key={agendamento.agendamento_id}
                            id={agendamento.agendamento_id}
                            data={agendamento.agendamento_data}
                            hora={agendamento.agendamento_hora}
                            status={agendamento.agendamento_status}
                            nome_servico={agendamento.agendamento_servico_id}
                            nome_prestador={agendamento.agendamento_usuario_id}
                            excluirClick={() => excluir(agendamento.agendamento_id)}
                            alterarClick={() => alterar(agendamento.agendamento_id)}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManutencaoAgendamento;

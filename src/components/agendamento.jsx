import { useForm } from "react-hook-form";
import { api } from "../config_axios"; // Importa a instância de axios configurada
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Helmet } from "react-helmet";

const Agendamento = () => {
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
    const [aviso, setAviso] = useState("");
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState("00:00");
    const [servico, setServico] = useState([]);
    const [prestador, setPrestador] = useState([]);
    const [selectedServicoNome, setSelectedServicoNome] = useState(""); // Corrigido para seguir a convenção camelCase

    useEffect(() => {
        // Função para buscar serviços
        const fetchServico = async () => {
            try {
                const response = await api.get('http://localhost:8080/servicos');
                setServico(response.data); // Atualiza o estado com os serviços recebidos
            } catch (error) {
                console.error("Erro ao buscar serviços:", error.response ? error.response.data : error.message);
                setAviso('Erro ao buscar serviços. Tente novamente mais tarde.'); // Atualiza o estado com a mensagem de erro
            }
        };

        fetchServico();
    }, []);

    const buscarPrestadorPorNomeServico = async (servico_nome) => {
        if (!servico_nome) return;

        try {
            const response = await api.get(`http://localhost:8080/prestador?servico_nome=${servico_nome}`); // Corrigido o endpoint          
            setPrestador(response.data);
            console.log(response.data);
        } catch (error) {
            console.error("Erro ao buscar prestador por nome do serviço:", error.response ? error.response.data : error.message);
            setAviso('Erro ao buscar prestador. Tente novamente mais tarde.');
        }
    };

    const handleServicoChange = (event) => {
        const servico_id = parseInt(event.target.value, 10);
        const servicoEncontrado = servico.find(s => s.servico_id === servico_id);

        if (servicoEncontrado) {
            const servico_nome = servicoEncontrado.servico_nome;
            setSelectedServicoNome(servico_nome);
            buscarPrestadorPorNomeServico(servico_nome);
        } else {
            setSelectedServicoNome("");
            setPrestador([]);
        }
    };

    const salvar = async (campos) => {
        // Verifica se todos os campos obrigatórios estão presentes
        if (!watch("servico_id") || !watch("prestador_id") || !selectedDate || !selectedTime) {
            setAviso("Preencha todos os campos obrigatórios.");
            return;
        }
    
        try {
            const camposCompletos = {
                ...campos,
                agendamento_data: selectedDate ? selectedDate.toISOString().split('T')[0] : "",
                agendamento_hora: selectedTime,
                servico: { servico_id: watch("servico_id") },
                prestador: { prestador_id: watch("prestador_id") }
            };
    
            console.log("Dados a serem enviados:", camposCompletos); // Log dos dados enviados
    
            await api.post('http://localhost:8080/agendamento', camposCompletos);
            setAviso("Agendamento realizado com sucesso!");
            reset();
            setSelectedDate(null);
            setSelectedTime("00:00");
            setPrestador([]);
        } catch (error) {
            console.error("Erro ao realizar agendamento:", error.response ? error.response.data : error.message);
            setAviso(`Erro ao realizar agendamento! ${error.response ? error.response.data : error.message}`);
        }
    };

    return (
        <>
            <Helmet>
                <title>Agendamento</title>
            </Helmet>
            <div className="container p-5 bg-light text-dark rounded" style={{ borderColor: "#851d86", borderWidth: "20px", borderStyle: "solid" }}>
                <div className="container p-5 bg-light text-dark rounded">
                    <h4 className="fst-italic mb-3">Agendamento</h4>
                    <form onSubmit={handleSubmit(salvar)}>
                        <div className="input-group mb-3">
                            <input
                                className="form-control"
                                type="search"
                                placeholder="Serviços"
                                aria-label="Serviços"
                                {...register("servico_nome")}
                            />
                            <button
                                className="btn btn-outline-success"
                                type="button"
                                onClick={() => buscarPrestadorPorNomeServico(watch("servico_nome"))}
                            >
                                Pesquisar
                            </button>
                        </div>
                        {errors.servico_nome && <div className="alert alert-danger">{errors.servico_nome.message}</div>}
                        <select
                            className="form-select"
                            aria-label="Default select example"
                            {...register("servico_id", { required: "Selecione um serviço" })}
                            defaultValue=""
                            onChange={handleServicoChange}
                        >
                            <option value="" disabled>Selecione um serviço</option>
                            {servico.map(s => (
                                <option key={s.servico_id} value={s.servico_id}>{s.servico_nome}</option>
                            ))}
                        </select>
                        {errors.servico_id && <div className="alert alert-danger">{errors.servico_id.message}</div>}
                        <br />
                        <select
                            className="form-select"
                            aria-label="Prestador"
                            {...register("prestador_id", { required: "Selecione um prestador" })}
                            defaultValue=""
                            disabled={!selectedServicoNome}
                        >
                            <option value="" disabled>Selecione um prestador</option>
                            {prestador.map(p => (
                                <option key={p.prestador_id} value={p.prestador_id}>{p.prestador_nome}</option>
                            ))}
                        </select>
                        {errors.prestador_id && <div className="alert alert-danger">{errors.prestador_id.message}</div>}
                        <br />
                        <div>
                            <label>Escolha a data que você deseja agendar o Serviço:</label>
                            <br />
                            <DatePicker
                                selected={selectedDate}
                                onChange={(date) => setSelectedDate(date)}
                                dateFormat="dd/MM/yyyy"
                                className="form-control"
                                minDate={new Date()} // Define a data mínima para hoje
                                placeholderText="Escolha a data"
                            />
                        </div>
                        <br />
                        <h6>Selecione um horário:</h6>
                        <div className="input-group mb-3">
                            <input
                                type="time"
                                className="form-control"
                                value={selectedTime}
                                onChange={(e) => setSelectedTime(e.target.value)}
                            />
                        </div>
                        <br />
                        <button type="submit" className="btn btn-primary">Agendar</button>
                    </form>
                    <div className="alert mt-3">{aviso}</div>
                </div>
            </div>
        </>
    );
};

export default Agendamento;

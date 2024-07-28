import "../css/ItemLista.css";
//const ItemLista = (props) => { 
//nocódigo abaixo fiz a desestruturação de props
const ItemLista = ({
    id,
    data,
    hora,
    status,
    nome_servico,
    nome_prestador,
    excluirClick,
    alterarClick}) => {
    return (
        <tr>
            <td>{id}</td>
            <td>{data}</td>
            <td>{hora}</td>
            <td>{status}</td>
            <td>{nome_servico}</td>
            <td>{nome_prestador}</td>
            <td className="text-center">
                <i className="exclui text-danger fw-bold" title="Excluir" onClick={excluirClick}>&#10008;</i>
                <i className="altera text-sucess fw-bold ms-2" title="Alterar" onClick={alterarClick}>&#36;</i>
            </td>
        </tr>
    );
};

export default ItemLista;
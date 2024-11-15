import { useEffect, useState } from "react";
import Button from "../../components/Button";
import { Card } from "react-bootstrap";
import { FiEdit2, FiTrash2 } from "react-icons/fi"
import { BsArrowDown } from "react-icons/bs"
import './style.css'
import CardCliente from "./clienteCard";

type Cliente = {
    id: number;
    nome: string;
    nomeSocial: string;
    email: null;
    endereco: {
        id: number;
        estado: string;
        cidade: string;
        bairro: string;
        rua: string;
        numero: number;
        codigoPostal: string;
        informacoesAdicionais: string;
        links: [];
    };
    telefones: [
        {
            id: number;
            numero: number;
            ddd: number;
            links: [];
        }
    ];
    links: [
        {
            rel: string;
            href: string;
        }
    ];
};

export default function ListaClientes() {
    const [clientes, setClientes] = useState<Cliente[]>([])
    const [showDetalhes, setShowDetalhaes] = useState<boolean>(false)

    const fetchClientes = async () => {
        try {
            const response = await fetch('http://localhost:32831/cliente/clientes');
            if (!response) {
                console.error('Error fetching data:');
                setClientes([]);
                return;
            }
            const getClientes = await response.json();
            setClientes(getClientes);
        } catch (error: any) {
            console.error('Fetch error:', error.message);
            setClientes([])
        }
    }

    useEffect(() => {
        fetchClientes()
    }, [])

    const handleExcluir =  async(id: number) => {
        try {
            const response = await fetch('http://localhost:32831/cliente/excluir', {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: id,
                }),
              });

            if (response){
                alert('Cliente excluido com sucesso')
            } else {
                alert('Erro ao excluir o cliente')
            }
            fetchClientes()
        } catch (error) {
            console.error('Erro na requisição:', error)
        }
    }

    return(
        <>
            {clientes.length > 0 ? (
                <>
                    <h3>Clientes</h3>
                    <Button rota={'/cliente/cadastrar'} texto={'Casdastrar'} />
                    {clientes.map((c: Cliente) => (
                        <CardCliente id={c.id} nome={c.nome} nomeSocial={c.nomeSocial} email={c.email} endereco={{
                            id: c.endereco.id,
                            estado: c.endereco.estado,
                            cidade: c.endereco.cidade,
                            bairro: c.endereco.bairro,
                            rua: c.endereco.rua,
                            numero: c.endereco.numero,
                            codigoPostal: c.endereco.codigoPostal,
                            informacoesAdicionais: c.endereco.informacoesAdicionais,
                            links: []
                        }} 
                        telefones={c.telefones.map((t) => ({
                            id: t.id,
                            numero: t.numero,
                            ddd: t.ddd,
                            links: t.links,
                        }))} 
                        links={[]} 
                        handleExcluir={() => handleExcluir(c.id)} />
                    ))}
                </>
            ) : (
                <>
                    <h3>Sem clientes cadastrados</h3>
                    <Button rota={'/cliente/cadastrar'} texto={'Cadastrar'}/>
                </>
            )}
        </>
    )
}

import { useState } from "react";
import { Card } from "react-bootstrap";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";
import './style.css';

type Cliente = {
  id: number;
  nome: string;
  nomeSocial: string;
  email: string | null;
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
  telefones: {
    id: number;
    numero: number;
    ddd: number;
    links: [];
  }[];
  links: {
    rel: string;
    href: string;
  }[];
  handleExcluir: (id: number) => void;
};

export default function CardCliente(props: Cliente) {
  const [showDetalhes, setShowDetalhes] = useState(false);

  return (
    <Card>
      <Card.Body className="card-body">
        <div className="coluna-nome">
          <strong>Nome: </strong>
          <span>{props.nome}</span>
        </div>
        <div className="coluna-telefone">
          <strong>Telefone: </strong>
          {props.telefones.map((t) => (
            <span key={t.id}>
              ({t.ddd}) {t.numero}
            </span>
          ))}
        </div>
        <div className="icons">
          {showDetalhes ? (
            <a href="#">
                <BsArrowUp onClick={() => setShowDetalhes(!showDetalhes)} />
            </a>
          ) : (
            <a href="#">
                <BsArrowDown onClick={() => setShowDetalhes(!showDetalhes)} />
            </a>
          )}
          <a href={`/cliente/editar/${props.id}`}>
            <FiEdit2 className="icon" />
          </a>
          <a href="#">
            <FiTrash2
              onClick={() => props.handleExcluir(props.id)}
              color="red"
              className="icon"
            />
          </a>
        </div>
      </Card.Body>
      {showDetalhes && (
        <>
            <Card.Body>
          <div>
            <strong>Nome social: </strong>
            <span>{props.nomeSocial}</span>
          </div>
          <div>
            <strong>Endereço: </strong>
            <span>{props.endereco.rua}, {props.endereco.numero}, {props.endereco.bairro}, {props.endereco.cidade} - {props.endereco.estado}, {props.endereco.codigoPostal}</span>
          </div>
        </Card.Body>
        <Card.Body>
        <div>
          <strong>Informações: </strong>
          <span>{props.endereco.informacoesAdicionais}</span>
        </div>
      </Card.Body>
        </>
      )}
    </Card>
  );
}

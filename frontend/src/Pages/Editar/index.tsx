import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';

interface Endereco {
  estado: string;
  cidade: string;
  bairro: string;
  rua: string;
  numero: string;
  codigoPostal: string;
  informacoesAdicionais?: string;
}

interface Telefone {
  numero: string;
  ddd: string;
}

interface FormData {
  nome: string;
  nomeSocial: string;
  email: string;
  endereco: Endereco;
  telefones: Telefone[];
}

interface Cliente {
    nome: string;
    nomeSocial?: string;
    email: string;
    endereco: {
        estado: string;
        cidade: string;
        bairro: string;
        rua: string;
        numero: string;
        codigoPostal: string;
        informacoesAdicionais?: string;
    };
    telefones: Array<{ numero: string; ddd: string }>;
}

const EditarCliente: React.FC = () => {
    const navigate = useNavigate()
    const [cliente, setCliente] = useState<any>(null)

  const [formData, setFormData] = useState<FormData>({
    nome: '',
    nomeSocial: '',
    email: '',
    endereco: {
      estado: '',
      cidade: '',
      bairro: '',
      rua: '',
      numero: '',
      codigoPostal: '',
      informacoesAdicionais: '',
    },
    telefones: [
      {
        numero: '',
        ddd: '',
      },
    ],
  });

    useEffect(() => {
        const fetchCliente = async () => {
            const pathSegments = window.location.pathname.split('/');
            const id = pathSegments[pathSegments.length - 1];

            try {
                const response = await fetch(`http://localhost:32831/cliente/${+id}`);
                if (!response) {
                    throw new Error('Erro ao buscar cliente');
                }
                const clienteData = await response.json();
                setFormData(clienteData)
            } catch (error) {
                console.error('Erro na requisição:', error);
            }
        };

        fetchCliente();
    }, []);

    const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof Cliente | keyof Cliente['endereco'],
    nestedField?: keyof Cliente['endereco']
    ) => {
    if (nestedField) {
        setFormData((prevState) => ({
            ...prevState,
            endereco: {
                ...prevState.endereco,
                [nestedField]: e.target.value,
            },
        }));
    } else {
        setFormData((prevState) => ({
            ...prevState,
            [field as keyof Cliente]: e.target.value,
        }));
    }
    };

  const handleTelefoneChange = (e: React.ChangeEvent<HTMLInputElement>, index: number, field: keyof Telefone) => {
    const updatedTelefones = [...formData.telefones];
    updatedTelefones[index][field] = e.target.value;
    setFormData((prevState) => ({
      ...prevState,
      telefones: updatedTelefones,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:32831/cliente/atualizar', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response) {
        console.log('Cliente atualizado com sucesso');
        alert('Cliente atualizado com sucesso');
        navigate('/cliente/lista')
      } else {
        console.error('Erro ao cadastrar cliente:');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  }

  return (
    <>
      <h3 className="text-center mb-4">Cadastro</h3>
      <form onSubmit={handleSubmit}>
        {/* Nome */}
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            id="nome"
            value={formData.nome}
            onChange={(e) => handleInputChange(e, 'nome')}
            placeholder="Digite seu nome completo"
            required
          />
        </div>

        {/* Nome Social */}
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            id="nomeSocial"
            value={formData.nomeSocial}
            onChange={(e) => handleInputChange(e, 'nomeSocial')}
            placeholder="Digite seu nome social"
          />
        </div>

        {/* Email */}
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            id="email"
            value={formData.email}
            onChange={(e) => handleInputChange(e, 'email')}
            placeholder="Digite seu email"
            required
          />
        </div>

        {/* Endereço */}
        <h4 className="mt-4">Endereço</h4>
        <div className="row">
          <div className="col-md-6 mb-3">
            <input
              type="text"
              className="form-control"
              id="estado"
              value={formData.endereco.estado}
              onChange={(e) => handleInputChange(e, 'endereco', 'estado')}
              placeholder="Digite seu estado"
            />
          </div>
          <div className="col-md-6 mb-3">
            <input
              type="text"
              className="form-control"
              id="cidade"
              value={formData.endereco.cidade}
              onChange={(e) => handleInputChange(e, 'endereco', 'cidade')}
              placeholder="Digite sua cidade"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <input
              type="text"
              className="form-control"
              id="bairro"
              value={formData.endereco.bairro}
              onChange={(e) => handleInputChange(e, 'endereco', 'bairro')}
              placeholder="Digite seu bairro"
            />
          </div>
          <div className="col-md-6 mb-3">
            <input
              type="text"
              className="form-control"
              id="rua"
              value={formData.endereco.rua}
              onChange={(e) => handleInputChange(e, 'endereco', 'rua')}
              placeholder="Digite sua rua"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 mb-3">
            <input
              type="text"
              className="form-control"
              id="numero"
              value={formData.endereco.numero}
              onChange={(e) => handleInputChange(e, 'endereco', 'numero')}
              placeholder="Número da casa/apartamento"
            />
          </div>
          <div className="col-md-4 mb-3">
            <input
              type="text"
              className="form-control"
              id="codigoPostal"
              value={formData.endereco.codigoPostal}
              onChange={(e) => handleInputChange(e, 'endereco', 'codigoPostal')}
              placeholder="CEP"
            />
          </div>
          <div className="col-md-4 mb-3">
            <textarea
              className="form-control"
              id="informacoesAdicionais"
              value={formData.endereco.informacoesAdicionais}
              onChange={(e) => handleInputChange(e, 'endereco', 'informacoesAdicionais')}
              rows={3}
            ></textarea>
          </div>
        </div>

        {/* Telefone */}
        <h4 className="mt-4">Telefone</h4>
        {formData.telefones.map((telefone, index) => (
          <div className="row" key={index}>
            <div className="col-md-4 mb-3">
              <input
                type="text"
                className="form-control"
                id={`ddd-${index}`}
                value={telefone.ddd}
                onChange={(e) => handleTelefoneChange(e, index, 'ddd')}
                placeholder="DDD"
              />
            </div>
            <div className="col-md-8 mb-3">
              <input
                type="text"
                className="form-control"
                id={`numero-${index}`}
                value={telefone.numero}
                onChange={(e) => handleTelefoneChange(e, index, 'numero')}
                placeholder="Número do telefone"
              />
            </div>
          </div>
        ))}

        {/* Botão de Enviar */}
        <Button type="submit" className="btn" variant="outline-dark">Editar</Button>
      </form>
    </>
  );
};

export default EditarCliente

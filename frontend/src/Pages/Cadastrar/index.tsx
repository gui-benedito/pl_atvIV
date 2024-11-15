import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

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

const CadastroForm: React.FC = () => {
  const navigate = useNavigate()
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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof FormData | keyof Endereco,
    nestedField?: keyof Endereco
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
        [field as keyof FormData]: e.target.value,
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
      const response = await fetch('http://localhost:32831/cliente/cadastrar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response) {
        console.log('Cadastro realizado com sucesso');
        alert('Cadastro realizado com sucesso');
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
            placeholder="Nome completo"
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
            placeholder="Nome social"
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
            placeholder="Email"
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
              placeholder="Estado"
            />
          </div>
          <div className="col-md-6 mb-3">
            <input
              type="text"
              className="form-control"
              id="cidade"
              value={formData.endereco.cidade}
              onChange={(e) => handleInputChange(e, 'endereco', 'cidade')}
              placeholder="Cidade"
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
              placeholder="Bairro"
            />
          </div>
          <div className="col-md-6 mb-3">
            <input
              type="text"
              className="form-control"
              id="rua"
              value={formData.endereco.rua}
              onChange={(e) => handleInputChange(e, 'endereco', 'rua')}
              placeholder="Rua"
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
              placeholder='informações adicionais'
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
        <Button type="submit" className="btn" variant="outline-dark">Cadastrar</Button>
      </form>
    </>
  );
};

export default CadastroForm;

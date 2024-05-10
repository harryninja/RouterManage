import React, { useState } from 'react';

interface FormClienteProps {
  isOpen: boolean;
  onClose: () => void;
  type: string;
  onSubmit: (data: any) => void;
}

const FormCliente: React.FC<FormClienteProps> = ({ isOpen, onClose, type }) => {
  const [nome, setNome] = useState('');
  const [tipo, setTipo] = useState('');
  const [cpfCnpj, setCpfCnpj] = useState('');
  const [dataNascimento, setDataNascimento] = useState<Date | null>(null);
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [cep, setCep] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [ativo, setAtivo] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (nome && tipo && cpfCnpj && dataNascimento && rua && numero && cep && bairro && cidade && ativo) {
      const data = {
        nome,
        tipo,
        cpfCnpj,
        dataNascimento,
        rua,
        numero,
        cep,
        bairro,
        cidade,
        ativo,
      };

      onSubmit(data);

    } else {
      alert('Por favor, preencha todos os campos obrigatórios.');
    }
  };

  const onSubmit = async (data: any) => {
    const url = data.id && data.id !== "0" ? `http://localhost:3001/clientes/${data.id}` : 'http://localhost:3001/clientes';
    const method = data.id && data.id !== "0" ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Erro ao enviar dados');
      }

      const result = await response.json();
      console.log('Dados enviados com sucesso:', result);
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Clientes</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-white shadow rounded-lg p-4">
            <label htmlFor="nome">Nome:</label>
            <input
              type="text"
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
            <label htmlFor="tipo">Tipo:</label>
            <input
              type="text"
              id="tipo"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
            <label htmlFor="cpfCnpj">CPF/CNPJ:</label>
            <input
              type="text"
              id="cpfCnpj"
              value={cpfCnpj}
              onChange={(e) => setCpfCnpj(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
            <label htmlFor="dataNascimento">Data de Nascimento:</label>
            <input
              type="date"
              id="dataNascimento"
              value={dataNascimento ? dataNascimento.toISOString().split('T')[0] : ''}
              onChange={(e) => {
                const date = new Date(e.target.value);
                if (!isNaN(date.getTime())) {
                  setDataNascimento(date);
                } else {
                  setDataNascimento(null);
                }
              }}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
            <label htmlFor="rua">Rua:</label>
            <input
              type="text"
              id="rua"
              value={rua}
              onChange={(e) => setRua(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
            <label htmlFor="numero">Número:</label>
            <input
              type="text"
              id="numero"
              value={numero}
              onChange={(e) => setNumero(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
            <label htmlFor="cep">CEP:</label>
            <input
              type="text"
              id="cep"
              value={cep}
              onChange={(e) => setCep(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
            <label htmlFor="bairro">Bairro:</label>
            <input
              type="text"
              id="bairro"
              value={bairro}
              onChange={(e) => setBairro(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
            <label htmlFor="cidade">Cidade:</label>
            <input
              type="text"
              id="cidade"
              value={cidade}
              onChange={(e) => setCidade(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
            <label htmlFor="ativo" className="block text-gray-700 text-sm font-bold mb-2">Ativo:</label>
            <select
              id="ativo"
              value={ativo ? 'Sim' : 'Não'}
              onChange={(e) => setAtivo(e.target.value === 'Sim')}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Selecione</option>
              <option value="Sim">Sim</option>
              <option value="Não">Não</option>
            </select>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Criar Cliente
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormCliente;
import React, { useState, useEffect } from 'react';

interface Cliente {
  id: string;
  nome: string;
}

interface FormRoteadorProps {
  isOpen: boolean;
  onClose: () => void;
  type: string;
  onSubmit: (data: any) => void;
}

const FormRoteador: React.FC<FormRoteadorProps> = ({ isOpen, onClose, type }) => {
  const [enderecoIp, setEnderecoIp] = useState('');
  const [enderecoIpv6, setEnderecoIpv6] = useState('');
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [ativo, setAtivo] = useState(false);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [clientesSelecionados, setClientesSelecionados] = useState<string[]>([]);


  useEffect(() => {
    fetch('http://localhost:3001/clientes')
      .then(response => response.json())
      .then(data => setClientes(data))
      .catch(error => console.error('Erro ao buscar clientes:', error));
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    if (form.checkValidity()) {
      const data = {
        enderecoIp: enderecoIp,
        enderecoIpv6: enderecoIpv6,
        marca: marca,
        modelo: modelo,
        ativo: ativo,
        clientes: clientesSelecionados,
      };

      onSubmit(data);

    } else {
      alert('Por favor, preencha todos os campos obrigatórios.');
    }
  };

  const onSubmit = async (data: any) => {
    console.log(data);
    const url = data.id && data.id !== "0" ? `http://localhost:3001/roteadores/${data.id}` : 'http://localhost:3001/roteadores';
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
      <h2 className="text-2xl font-bold mb-4">Roteadores</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-white shadow rounded-lg p-4">
            <label htmlFor="enderecoIp">Endereço IP:</label>
            <input
              type="text"
              id="enderecoIp"
              value={enderecoIp}
              onChange={(e) => setEnderecoIp(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
            <label htmlFor="enderecoIpv6">Endereço IPv6:</label>
            <input
              type="text"
              id="enderecoIpv6"
              value={enderecoIpv6}
              onChange={(e) => setEnderecoIpv6(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
            <label htmlFor="marca">Marca:</label>
            <input
              type="text"
              id="marca"
              value={marca}
              onChange={(e) => setMarca(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
            <label htmlFor="modelo">Modelo:</label>
            <input
              type="text"
              id="modelo"
              value={modelo}
              onChange={(e) => setModelo(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
            <label htmlFor="clientes">Clientes:</label>
            <select
              id="clientes"
              multiple
              value={clientesSelecionados}
              onChange={(e) => setClientesSelecionados(Array.from(e.target.selectedOptions, option => option.value))}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              {clientes.map(cliente => (
                <option key={cliente.id} value={cliente.id}>{cliente.nome}</option>
              ))}
            </select>
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
              Criar Roteador
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormRoteador;
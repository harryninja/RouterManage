import React, { useEffect, useState } from 'react';
import FormCliente from '../FormCliente/FormCliente';
import { Roteador } from '@prisma/client';
import FormUpdateCliente from '../FormCliente/FormUpdateCliente';

interface Cliente {
  id: number;
  nome: string;
  tipo: string;
  cpfCnpj: string;
  dataNascimento: Date;
  rua: string;
  numero: string;
  cep: string;
  bairro: string;
  cidade: string;
  dataCadastro: Date;
  ativo: boolean;
  roteadores: Roteador[];
}

const GridClientes = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);

  const handleSubmit = async (data: any) => {
    console.log(data);
    const url = data.id ? `http://localhost:3001/clientes/${data.id}` : 'http://localhost:3001/clientes';
    const method = data.id ? 'PUT' : 'POST';

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

      fetchClientes();

    } catch (error) {
      console.error('Erro ao enviar dados:', error);
    } finally {
      handleCloseModal();
    }
  };

  const fetchClientes = async () => {
    try {
      const response = await fetch('http://localhost:3001/clientes');
      const data = await response.json();
      setClientes(data);
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const [selectedCliente, setSelectedCliente] = useState<Cliente | null>(null);

  const handleEditCliente = (cliente: Cliente) => {
    setSelectedCliente(cliente);
    console.log(cliente);
    setIsUpdateOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = async (id: number) => {
    try {
      await fetch(`http://localhost:3001/clientes/${id}`, {
        method: 'DELETE',
      });
      const updatedClientes = clientes.filter(cliente => cliente.id !== id);
      setClientes(updatedClientes);
    } catch (error) {
      console.error('Erro ao excluir cliente:', error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Clientes</h2>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleOpenModal}>Adicionar Cliente</button>
      <div className="grid grid-cols-1 gap-4">
        {clientes.map((cliente, index) => (
          <div key={cliente.id} className="bg-white shadow rounded-lg p-4">
            <p>Nome: {cliente.nome}</p>
            <p>Tipo: {cliente.tipo}</p>
            <p>CPF/CNPJ: {cliente.cpfCnpj}</p>
            <p>Data de Nascimento: {cliente.dataNascimento.toString()}</p>
            <p>Rua: {cliente.rua}</p>
            <p>Número: {cliente.numero}</p>
            <p>CEP: {cliente.cep}</p>
            <p>Bairro: {cliente.bairro}</p>
            <p>Cidade: {cliente.cidade}</p>
            <p>Data de Cadastro: {cliente.dataCadastro.toString()}</p>
            <p>Ativo: {cliente.ativo ? 'Sim' : 'Não'}</p>
            <button onClick={() => handleDelete(cliente.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2">
              Excluir
            </button>
            <button onClick={() => handleEditCliente(cliente)} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mt-2 ml-2">
              Editar
            </button>
          </div>
        ))}
      </div>
      {isModalOpen && <FormCliente isOpen={true} onClose={handleCloseModal} type="cliente" onSubmit={handleSubmit} />}
      {isUpdateOpen && selectedCliente && (
        <FormUpdateCliente
          isOpen={true}
          onClose={handleCloseModal}
          cliente={selectedCliente}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default GridClientes;
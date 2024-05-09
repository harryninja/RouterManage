import React, { useEffect, useState } from 'react';
import FormRoteador from '../FormRoteador/FormRoteador';
import { Cliente } from '@prisma/client';
import FormUpdateRoteador from '../FormRoteador/FormUpdateRoteador';

interface Roteador {
  id: number;
  enderecoIp: string;
  enderecoIpv6: string | null;
  marca: string;
  modelo: string;
  ativo: boolean;
  clientes: Cliente[];
}

const GridRoteadores = () => {
  const [roteadores, setRoteadores] = useState<Roteador[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3001/roteadores')
      .then(response => response.json())
      .then(data => setRoteadores(data))
      .catch(error => console.error('Erro ao buscar roteadores:', error));
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const [selectedRoteador, setSelectedRoteador] = useState<Roteador | null>(null);

  const handleEditRoteador = (roteador: Roteador) => {
    setSelectedRoteador(roteador);
    setIsUpdateOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (data: any) => {
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
    } finally {
      handleCloseModal();
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await fetch(`http://localhost:3001/roteadores/${id}`, {
        method: 'DELETE',
      });

      const updatedRoteadores = roteadores.filter(roteador => roteador.id !== id);
      setRoteadores(updatedRoteadores);
    } catch (error) {
      console.error('Erro ao excluir roteador:', error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Roteadores</h2>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleOpenModal}>Adicionar Roteador</button>
      <div className="grid grid-cols-1 gap-4">
        {roteadores.map((roteador, index) => (
          <div key={roteador.id} className="bg-white shadow rounded-lg p-4">
            <p>Endereço IP: {roteador.enderecoIp}</p>
            <p>Endereço IPv6: {roteador.enderecoIpv6 || 'N/A'}</p>
            <p>Marca: {roteador.marca}</p>
            <p>Modelo: {roteador.modelo}</p>
            <p>Ativo: {roteador.ativo ? 'Sim' : 'Não'}</p>
            <button onClick={() => handleDelete(roteador.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2">
              Excluir
            </button>
            <button onClick={() => handleEditRoteador(roteador)} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mt-2 ml-2">
              Editar
            </button>
          </div>
        ))}
      </div>
      {isModalOpen && <FormRoteador isOpen={true} onClose={handleCloseModal} type="roteador" onSubmit={handleSubmit} />}
      {isUpdateOpen && selectedRoteador && (
        <FormUpdateRoteador
          isOpen={true}
          onClose={handleCloseModal}
          roteador={selectedRoteador}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default GridRoteadores;
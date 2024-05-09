import { Roteador } from '@prisma/client';
import React, { useState } from 'react';

interface FormUpdateRoteadorProps {
    isOpen: boolean;
    onClose: () => void;
    roteador: Roteador;
    onSubmit: (data: any) => void;
}

const FormUpdateRoteador: React.FC<FormUpdateRoteadorProps> = ({ isOpen, onClose, roteador, onSubmit }) => {
    const [enderecoIp, setEnderecoIp] = useState(roteador.enderecoIp);
    const [enderecoIpv6, setEnderecoIpv6] = useState(roteador.enderecoIpv6 || '');
    const [marca, setMarca] = useState(roteador.marca);
    const [modelo, setModelo] = useState(roteador.modelo);
    const [ativo, setAtivo] = useState(roteador.ativo);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onSubmit({ enderecoIp, enderecoIpv6, marca, modelo, ativo });
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Editar Roteador</h2>
            <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-4">
                <div className="grid grid-cols-1 gap-4">
                    <div>
                        <label htmlFor="enderecoIp" className="block text-gray-700 text-sm font-bold mb-2">Endereço IP:</label>
                        <input
                            type="text"
                            id="enderecoIp"
                            value={enderecoIp}
                            onChange={e => setEnderecoIp(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="enderecoIpv6" className="block text-gray-700 text-sm font-bold mb-2">Endereço IPv6:</label>
                        <input
                            type="text"
                            id="enderecoIpv6"
                            value={enderecoIpv6}
                            onChange={e => setEnderecoIpv6(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div>
                        <label htmlFor="marca" className="block text-gray-700 text-sm font-bold mb-2">Marca:</label>
                        <input
                            type="text"
                            id="marca"
                            value={marca}
                            onChange={e => setMarca(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div>
                        <label htmlFor="modelo" className="block text-gray-700 text-sm font-bold mb-2">Modelo:</label>
                        <input
                            type="text"
                            id="modelo"
                            value={modelo}
                            onChange={e => setModelo(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div>
                        <label htmlFor="ativo" className="block text-gray-700 text-sm font-bold mb-2">Ativo:</label>
                        <select
                            id="ativo"
                            value={ativo ? 'Sim' : 'Não'}
                            onChange={e => setAtivo(e.target.value === 'Sim')}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        >
                            <option value="Sim">Sim</option>
                            <option value="Não">Não</option>
                        </select>
                    </div>
                </div>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4">
                    Salvar
                </button>
            </form>
        </div>
    );
};

export default FormUpdateRoteador;
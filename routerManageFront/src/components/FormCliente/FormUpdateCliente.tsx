import { Cliente } from '@prisma/client';
import React, { useState } from 'react';

interface FormUpdateClienteProps {
    isOpen: boolean;
    onClose: () => void;
    cliente: Cliente;
    onSubmit: (data: any) => void;
}

const FormUpdateCliente: React.FC<FormUpdateClienteProps> = ({ isOpen, onClose, cliente, onSubmit }) => {
    const [nome, setNome] = useState(cliente.nome);
    const [tipo, setTipo] = useState(cliente.tipo);
    const [cpfCnpj, setCpfCnpj] = useState(cliente.cpfCnpj);
    const [dataNascimento, setDataNascimento] = useState<Date | null>(cliente.dataNascimento ? new Date(cliente.dataNascimento) : null);
    const [rua, setRua] = useState(cliente.rua);
    const [numero, setNumero] = useState(cliente.numero);
    const [cep, setCep] = useState(cliente.cep);
    const [bairro, setBairro] = useState(cliente.bairro);
    const [cidade, setCidade] = useState(cliente.cidade);
    const [dataCadastro, setDataCadastro] = useState(cliente.dataCadastro);
    const [ativo, setAtivo] = useState(cliente.ativo);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onSubmit({ nome, tipo, cpfCnpj, dataNascimento, rua, numero, cep, bairro, cidade, dataCadastro, ativo });
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Editar Cliente</h2>
            <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-4">
                <div className="grid grid-cols-1 gap-4">
                    <div>
                        <label htmlFor="nome" className="block text-gray-700 text-sm font-bold mb-2">Nome:</label>
                        <input
                            type="text"
                            id="nome"
                            value={nome}
                            onChange={e => setNome(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="tipo" className="block text-gray-700 text-sm font-bold mb-2">Tipo:</label>
                        <input
                            type="text"
                            id="tipo"
                            value={tipo}
                            onChange={e => setTipo(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="cpfCnpj" className="block text-gray-700 text-sm font-bold mb-2">CPF/CNPJ:</label>
                        <input
                            type="text"
                            id="cpfCnpj"
                            value={cpfCnpj}
                            onChange={e => setCpfCnpj(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="dataNascimento" className="block text-gray-700 text-sm font-bold mb-2">Data de Nascimento:</label>
                        <input
                            type="date"
                            id="dataNascimento"
                            value={dataNascimento ? dataNascimento.toISOString().split('T')[0] : ''}
                            onChange={e => setDataNascimento(new Date(e.target.value))}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="rua" className="block text-gray-700 text-sm font-bold mb-2">Rua:</label>
                        <input
                            type="text"
                            id="rua"
                            value={rua}
                            onChange={e => setRua(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="numero" className="block text-gray-700 text-sm font-bold mb-2">Número:</label>
                        <input
                            type="text"
                            id="numero"
                            value={numero}
                            onChange={e => setNumero(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="cep" className="block text-gray-700 text-sm font-bold mb-2">CEP:</label>
                        <input
                            type="text"
                            id="cep"
                            value={cep}
                            onChange={e => setCep(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="bairro" className="block text-gray-700 text-sm font-bold mb-2">Bairro:</label>
                        <input
                            type="text"
                            id="bairro"
                            value={bairro}
                            onChange={e => setBairro(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="cidade" className="block text-gray-700 text-sm font-bold mb-2">Cidade:</label>
                        <input
                            type="text"
                            id="cidade"
                            value={cidade}
                            onChange={e => setCidade(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="ativo" className="block text-gray-700 text-sm font-bold mb-2">Ativo:</label>
                        <select
                            id="ativo"
                            value={ativo ? 'true' : 'false'}
                            onChange={e => setAtivo(e.target.value === 'true')}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        >
                            <option value="">Selecione</option>
                            <option value="true">Sim</option>
                            <option value="false">Não</option>
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

export default FormUpdateCliente;
import { Request, Response } from 'express';
import { ClienteService } from '../services/clienteService';

export class ClienteController {
 async create(request: Request, response: Response) {
    const { nome, tipo, cpfCnpj, dataNascimento, rua, numero, cep, bairro, cidade, ativo } = request.body;
    const clienteService = new ClienteService();
    const cliente = await clienteService.create({ nome, tipo, cpfCnpj, dataNascimento, rua, numero, cep, bairro, cidade, ativo });
    return response.json(cliente);
 }

 async update(request: Request, response: Response) {
   const { id } = request.params;
   const { nome, tipo, cpfCnpj, dataNascimento, rua, numero, cep, bairro, cidade, ativo } = request.body;
   const clienteService = new ClienteService();
   const cliente = await clienteService.update(id, { nome, tipo, cpfCnpj, dataNascimento, rua, numero, cep, bairro, cidade, ativo });
   return response.json(cliente);
}

async delete(request: Request, response: Response) {
   const { id } = request.params;
   const clienteService = new ClienteService();
   await clienteService.delete(id);
   return response.json({ message: 'Cliente deletado com sucesso' });
}

async findAll(request: Request, response: Response) {
   const clienteService = new ClienteService();
   const clientes = await clienteService.findAll();
   return response.json(clientes);
}

async findOne(request: Request, response: Response) {
   const { id } = request.params;
   const clienteService = new ClienteService();
   const cliente = await clienteService.findOne(id);
   return response.json(cliente);
}
}

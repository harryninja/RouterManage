import { Request, Response } from 'express';
import { RoteadorService } from '../services/roteadorService';

export class RoteadorController {
 async create(request: Request, response: Response) {
    const { enderecoIp, enderecoIpv6, marca, modelo, ativo, clientes } = request.body;
    const roteadorService = new RoteadorService();
    const roteador = await roteadorService.create({ enderecoIp, enderecoIpv6, marca, modelo, ativo, clientes });
    return response.json(roteador);
 }

 async update(request: Request, response: Response) {
   const { id } = request.params;
   const { enderecoIp, enderecoIpv6, marca, modelo, ativo, clientes } = request.body;
   const roteadorService = new RoteadorService();
   const roteador = await roteadorService.update(id, { enderecoIp, enderecoIpv6, marca, modelo, ativo, clientes });
   return response.json(roteador);
}

async delete(request: Request, response: Response) {
   const { id } = request.params;
   const roteadorService = new RoteadorService();
   await roteadorService.delete(id);
   return response.json({ message: 'Roteador deletado com sucesso' });
}

async findAll(request: Request, response: Response) {
   const roteadorService = new RoteadorService();
   const roteadores = await roteadorService.findAll();
   return response.json(roteadores);
}

async findOne(request: Request, response: Response) {
   const { id } = request.params;
   const roteadorService = new RoteadorService();
   const roteador = await roteadorService.findOne(id);
   return response.json(roteador);
}
}

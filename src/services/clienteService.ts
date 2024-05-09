import { PrismaClient } from '@prisma/client';
import client from '../elasticSearchClient';

const prisma = new PrismaClient();

export class ClienteService {
 async create(data: any) {
    const cliente = await prisma.cliente.create({
      data,
    });
    await this.syncWithElasticsearch(cliente);
    return cliente;
 }

 async update(id: string, data: any) {
  const cliente = await prisma.cliente.update({
    where: { id: parseInt(id) },
    data,
  });
  await this.syncWithElasticsearch(cliente);
  return cliente;
}

async delete(id: string) {
  const cliente = await prisma.cliente.delete({
    where: { id: parseInt(id) },
  });

  await client.delete({
    index: 'clientes',
    type: 'cliente',
    id: cliente.id.toString(),
  });
  return cliente;
}

async findAll() {
  const clientes = await prisma.cliente.findMany();
  return clientes;
}

async findOne(id: string) {
  const cliente = await prisma.cliente.findUnique({
    where: { id: parseInt(id) },
  });
  return cliente;
}

 private async syncWithElasticsearch(cliente: any) {
  await client.index({
    index: 'clientes',
    type: 'cliente',
    id: cliente.id.toString(),
    body: cliente
  });
}
}



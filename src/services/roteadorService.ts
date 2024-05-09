import { PrismaClient } from '@prisma/client';
import client from '../elasticSearchClient';

const prisma = new PrismaClient();

export class RoteadorService {
  async create(data: any) {
    const clientesData = data.clientes && data.clientes.length > 0? {
      connect: data.clientes.map((clienteId: string) => ({ id: parseInt(clienteId) }))
    } : undefined;

    const roteador = await prisma.roteador.create({
      data: {
       ...data,
        clientes: clientesData,
      },
    });

    await this.syncWithElasticsearch(roteador);
    return roteador;
  }

 async update(id: string, data: any) {
  const roteador = await prisma.roteador.update({
    where: { id: parseInt(id) },
    data,
  });
  await this.syncWithElasticsearch(roteador);
  return roteador;
}

async delete(id: string) {
  const roteador = await prisma.roteador.delete({
    where: { id: parseInt(id) },
  });

  await client.delete({
    index: 'roteadores',
    type: 'roteador',
    id: roteador.id.toString(),
  });
  return roteador;
}

async findAll() {
  const roteadores = await prisma.roteador.findMany();
  return roteadores;
}

async findOne(id: string) {
  const roteador = await prisma.roteador.findUnique({
    where: { id: parseInt(id) },
  });
  return roteador;
}

 private async syncWithElasticsearch(roteador: any) {
  await client.index({
    index: 'roteadores',
    type: 'roteador',
    id: roteador.id.toString(),
    body: roteador
  });
}
}

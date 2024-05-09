export class RoteadorService {
    async create(data: any) {
       return {
         id: '1',
         enderecoIp: data.enderecoIp,
         enderecoIpv6: data.enderecoIpv6,
         marca: data.marca,
         modelo: data.modelo,
         ativo: data.ativo,
         clientes: data.clientes,
       };
    }
   }
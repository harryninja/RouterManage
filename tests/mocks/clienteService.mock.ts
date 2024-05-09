export class ClienteService {
    async create(data: any) {
       return {
         id: '1',
         nome: data.nome,
         tipo: data.tipo,
         cpfCnpj: data.cpfCnpj,
         dataNasc: data.dataNasc,
         rua: data.rua,
         numero: data.numero,
         cep: data.cep,
         bairro: data.bairro,
         cidade: data.cidade,
         ativo: data.ativo,
       };
    }
   }
import { Request, Response } from 'express';
import { ClienteController } from '../src/controllers/clienteController';
import { ClienteService } from '../src/services/clienteService'

jest.mock('../src/services/clienteService', () => {
 return {
    ClienteService: jest.fn().mockImplementation(() => {
      return {
        create: jest.fn().mockResolvedValue({
          id: '1',
          nome: 'João Silva',
          tipo: 'Pessoa Física',
          cpfCnpj: '123.456.789-00',
          dataNasc: '1990-01-01',
          rua: 'Rua Exemplo',
          numero: '123',
          cep: '12345-678',
          bairro: 'Bairro Exemplo',
          cidade: 'Cidade Exemplo',
          ativo: true,
        }),
      };
    }),
 };
});

describe('ClienteController', () => {
 let controller: ClienteController;
 let mockRequest: Partial<Request>;
 let mockResponse: Partial<Response>;

 beforeEach(() => {
    controller = new ClienteController();
    mockRequest = {
      body: {
        nome: 'João Silva',
        tipo: 'Pessoa Física',
        cpfCnpj: '123.456.789-00',
        dataNasc: '1990-01-01',
        rua: 'Rua Exemplo',
        numero: '123',
        cep: '12345-678',
        bairro: 'Bairro Exemplo',
        cidade: 'Cidade Exemplo',
        ativo: true,
      },
    };
    mockResponse = {
      json: jest.fn().mockReturnThis(),
    };
 });

 it('should create a cliente and return it', async () => {
    await controller.create(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.json).toHaveBeenCalledWith({
      id: '1',
      nome: 'João Silva',
      tipo: 'Pessoa Física',
      cpfCnpj: '123.456.789-00',
      dataNasc: '1990-01-01',
      rua: 'Rua Exemplo',
      numero: '123',
      cep: '12345-678',
      bairro: 'Bairro Exemplo',
      cidade: 'Cidade Exemplo',
      ativo: true,
    });
 });
});
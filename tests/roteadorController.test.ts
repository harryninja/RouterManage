import { Request, Response } from 'express';
import { RoteadorController } from '../src/controllers/roteadorController';
import { RoteadorService } from '../src/services/roteadorService';

jest.mock('../src/services/roteadorService', () => {
 return {
    RoteadorService: jest.fn().mockImplementation(() => {
      return {
        create: jest.fn().mockResolvedValue({
          id: '1',
          enderecoIp: '192.168.1.1',
          enderecoIpv6: '2001:0db8:85a3:0000:0000:8a2e:0370:7334',
          marca: 'Cisco',
          modelo: 'RV340',
          ativo: true,
          clientes: ['1', '2'],
        }),
      };
    }),
 };
});

describe('RoteadorController', () => {
 let controller: RoteadorController;
 let mockRequest: Partial<Request>;
 let mockResponse: Partial<Response>;

 beforeEach(() => {
    controller = new RoteadorController();
    mockRequest = {
      body: {
        enderecoIp: '192.168.1.1',
        enderecoIpv6: '2001:0db8:85a3:0000:0000:8a2e:0370:7334',
        marca: 'Cisco',
        modelo: 'RV340',
        ativo: true,
        clientes: ['1', '2'],
      },
    };
    mockResponse = {
      json: jest.fn().mockReturnThis(),
    };
 });

 it('should create a roteador and return it', async () => {
    await controller.create(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.json).toHaveBeenCalledWith({
      id: '1',
      enderecoIp: '192.168.1.1',
      enderecoIpv6: '2001:0db8:85a3:0000:0000:8a2e:0370:7334',
      marca: 'Cisco',
      modelo: 'RV340',
      ativo: true,
      clientes: ['1', '2'],
    });
 });
});
import { Router } from 'express';
import { ClienteController } from '../controllers/clienteController';

const clienteRoutes = Router();
const clienteController = new ClienteController();

clienteRoutes.post('/', clienteController.create);
clienteRoutes.put('/:id', clienteController.update);
clienteRoutes.delete('/:id', clienteController.delete);
clienteRoutes.get('/', clienteController.findAll);
clienteRoutes.get('/:id', clienteController.findOne);

export { clienteRoutes };
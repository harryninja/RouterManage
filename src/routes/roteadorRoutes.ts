import { Router } from 'express';
import { RoteadorController } from '../controllers/roteadorController';

const roteadorRoutes = Router();
const roteadorController = new RoteadorController();

roteadorRoutes.post('/', roteadorController.create);
roteadorRoutes.put('/:id', roteadorController.update);
roteadorRoutes.delete('/:id', roteadorController.delete);
roteadorRoutes.get('/', roteadorController.findAll);
roteadorRoutes.get('/:id', roteadorController.findOne);

export { roteadorRoutes };
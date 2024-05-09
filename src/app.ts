import express from 'express';
import cors from 'cors';
import { clienteRoutes } from './routes/clienteRoutes';
import { roteadorRoutes } from './routes/roteadorRoutes';
import { elasticsearchRoutes } from './elasticSearchRoutes';

const app = express();
app.use(cors());

app.use(express.json());

app.use('/clientes', clienteRoutes);
app.use('/roteadores', roteadorRoutes);
app.use('/elasticsearch', elasticsearchRoutes);

app.listen(process.env.SERVER_PORT, () => console.log('Server is running on port ' + process.env.SERVER_PORT));

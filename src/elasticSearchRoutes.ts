import { Router } from 'express';
import client from './elasticSearchClient';

const elasticsearchRoutes = Router();

elasticsearchRoutes.get('/clientes/search', async (req, res) => {
 const { query } = req.query;
 const result = await client.search({
    index: 'clientes',
    body: {
      query: {
        match: { nome: query }
      }
    }
 });
 res.json(result.hits.hits);
});

elasticsearchRoutes.get('/roteadores/search', async (req, res) => {
    const { query } = req.query;
    const result = await client.search({
       index: 'roteasdores',
       body: {
         query: {
           match: { nome: query }
         }
       }
    });
    res.json(result.hits.hits);
   });

export { elasticsearchRoutes };

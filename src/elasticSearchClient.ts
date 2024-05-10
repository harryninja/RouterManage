import { Client } from 'elasticsearch';

const client = new Client({
  host: 'https://localhost:9243',
  log: 'trace'
});

export default client;
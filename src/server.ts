import express from 'express';
import cors from 'cors';
import { router } from './routes';
const server = express();

//Configura o servidor para aceitar requisição
server.use(cors());
//Configura o servidor para aceitar requisição
server.use(express.json());
//Configurando as rotas do servidor
server.use(router);

//exporta o servidor
export {server};
import { Request, Response } from "express";
import { Cliente } from "../model/Cliente";

interface ClienteDTO {
    nome: string,
    cpf: string,
    telefone: string
}

/**
 * Classe Controller para gerenciar as requisições relacionadas ao objeto Cliente.
 * Esta classe herda da classe Cliente e contém métodos responsáveis por lidar
 * com requisições HTTP.
 */
class ClienteController extends Cliente{

      /**
     * Método estático responsável por listar todos os clientes.
     * Este método faz uma chamada assíncrona ao método `listarCliente` da classe Cliente,
     * retornando uma lista de clientes no formato JSON.
     *
     * @param {Request} req - O objeto da requisição HTTP.
     * @param {Response} res - O objeto da resposta HTTP.
     * 
     * @returns {Promise<void>} Retorna uma promessa que envia a lista de clientes
     * ao cliente em caso de sucesso, ou uma mensagem de erro em caso de falha.
     */
    static async todos(req: Request, res: Response) {
        try {
            // Chama o método herdado de listar todos os clientes
            const listaDeClientes =  await Cliente.listagemClientes();

            // Responde com o status 200 e a lista de clientes em formato JSON
            res.status(200).json(listaDeClientes)
        } catch (error) {
             // Exibe erro no console e responde com status 400 e uma mensagem de erro
            console.log(`Erro ao acessar método herdado ${error}`);
            res.status(400).json("Erro ao recuperaras informações de clientes");
        }
    }

     /**
    * Método controller para cadastrar um novo cliente.
    * 
    * Esta função recebe uma requisição HTTP contendo os dados de um cliente no corpo da requisição
    * e tenta cadastrar este cliente no banco de dados utilizando a função `cadastroCliente`. Caso o cadastro 
    * seja bem-sucedido, retorna uma resposta HTTP 200 com uma mensagem de sucesso. Caso contrário, retorna
    * uma resposta HTTP 400 com uma mensagem de erro.
    * 
    * @param {Request} req - Objeto de requisição HTTP, contendo o corpo com os dados do cliente no formato `ClienteDTO`.
    * @param {Response} res - Objeto de resposta HTTP usado para retornar o status e a mensagem ao cliente.
    * @returns {Promise<Response>} - Retorna uma resposta HTTP com o status 200 em caso de sucesso, ou 400 em caso de erro.
    * 
    * @throws {Error} - Se ocorrer um erro durante o processo de cadastro, uma mensagem é exibida no console e uma 
    *                   resposta HTTP 400 com uma mensagem de erro é enviada ao cliente.
    */
     static async novo(req: Request, res: Response): Promise<Response> {
        try {
            // recuperando informações do corpo da requisição e colocando em um objeto da interface ClienteDTO
            const clienteRecebido: ClienteDTO = req.body;

            // instanciando um objeto do tipo cliente com as informações recebidas
            const novoCliente = new Cliente(clienteRecebido.nome, 
                                        clienteRecebido.cpf, 
                                        clienteRecebido.telefone 
                                        );

            // Chama a função de cadastro passando o objeto como parâmetro
            const repostaClasse = await Cliente.cadastroCliente(novoCliente);

            // verifica a resposta da função
            if(repostaClasse) {
                // retornar uma mensagem de sucesso
                return res.status(200).json({ mensagem: "Cliente cadastrado com sucesso!" });
            } else {
                // retorno uma mensagem de erro
                return res.status(400).json({ mensagem: "Erro ao cadastra o cliente. Entre em contato com o administrador do sistema."})
            }
            
        } catch (error) {
            // lança uma mensagem de erro no console
            console.log(`Erro ao cadastrar um cliente. ${error}`);

            // retorna uma mensagem de erro há quem chamou a mensagem
            return res.status(400).json({ mensagem: "Não foi possível cadastrar o cliente. Entre em contato com o administrador do sistema." });
        }
    }
}

export default ClienteController;
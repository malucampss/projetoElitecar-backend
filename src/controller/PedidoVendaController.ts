import { Request, Response } from "express";
import { PedidoVenda } from "../model/PedidoVenda";

interface PedidoVendaDTO {
    idCarro: number,
    idCliente: number,
    dataPedido: Date,
    valorPedido: number
}

/**
 * Classe Controller para gerenciar as requisições relacionadas ao objeto PedidoVenda.
 * Esta classe herda da classe PedidoVenda e contém métodos responsáveis por lidar
 * com requisições HTTP.
 */
class PedidoVendaController extends PedidoVenda {

    /**
    * Método estático responsável por listar todos os pedidos de venda.
    * Este método faz uma chamada assíncrona ao método `listarPedidoVenda` da classe PedidoVenda,
    * retornando uma lista de pedidos de venda no formato JSON.
    *
    * @param {Request} req - O objeto da requisição HTTP.
    * @param {Response} res - O objeto da resposta HTTP.
    * 
    * @returns {Promise<void>} Retorna uma promessa que envia a lista de pedidos de venda
    * ao cliente em caso de sucesso, ou uma mensagem de erro em caso de falha.
    */
    static async todos(req: Request, res: Response) {
        try {
            // Chama o método herdado para listar todos os pedidos de venda
            const listaDePedidoVenda = await PedidoVenda.listarPedidoVenda();

            // Responde com o status 200 e a lista de pedidos de venda em formato JSON
            res.status(200).json(listaDePedidoVenda)
        } catch (error) {
            // Exibe erro no console e responde com status 400 e uma mensagem de erro
            console.log(`Erro ao acessar método herdado ${error}`);
            res.status(400).json("Erro ao recuperar as informações de pedidos venda");
        }
    }

    /**
   * Método controller para cadastrar um novo pedidoVenda.
   * 
   * Esta função recebe uma requisição HTTP contendo os dados de um pedidoVenda no corpo da requisição
   * e tenta cadastrar este pedido de venda no banco de dados utilizando a função `cadastroPedidoVenda`. Caso o cadastro 
   * seja bem-sucedido, retorna uma resposta HTTP 200 com uma mensagem de sucesso. Caso contrário, retorna
   * uma resposta HTTP 400 com uma mensagem de erro.
   * 
   * @param {Request} req - Objeto de requisição HTTP, contendo o corpo com os dados do cliente no formato `PedidoVendaDTO`.
   * @param {Response} res - Objeto de resposta HTTP usado para retornar o status e a mensagem ao cliente.
   * @returns {Promise<Response>} - Retorna uma resposta HTTP com o status 200 em caso de sucesso, ou 400 em caso de erro.
   * 
   * @throws {Error} - Se ocorrer um erro durante o processo de cadastro, uma mensagem é exibida no console e uma 
   *                   resposta HTTP 400 com uma mensagem de erro é enviada ao cliente.
   */
    static async novo(req: Request, res: Response): Promise<Response> {
        try {
            // recuperando informações do corpo da requisição e colocando em um objeto da interface CarroDTO
            const pedidoVendaRecebido: PedidoVendaDTO = req.body;

            // instanciando um objeto do tipo carro com as informações recebidas
            const novoPedidoVenda = new PedidoVenda(
                pedidoVendaRecebido.idCarro,
                pedidoVendaRecebido.idCliente,
                pedidoVendaRecebido.dataPedido,
                pedidoVendaRecebido.valorPedido
            );

            // Chama a função de cadastro passando o objeto como parâmetro
            const respostaClasse = await PedidoVenda.cadastroPedidoVenda(novoPedidoVenda);

            // verifica a resposta da função
            if (respostaClasse) {
                // retornar uma mensagem de sucesso
                return res.status(200).json({ mensagem: "Pedido de Venda cadastrado com sucesso!" });
            } else {
                // retorno uma mensagem de erro
                return res.status(400).json({ mensagem: "Erro ao cadastrar o pedido de venda. Entre em contato com o administrador do sistema." })
            }

        } catch (error) {
            // lança uma mensagem de erro no console
            console.log(`Erro ao cadastrar um pedido de venda. ${error}`);

            // retorna uma mensagem de erro há quem chamou a mensagem
            return res.status(400).json({ mensagem: "Não foi possível cadastra o pedido de venda. Entre em contato com o administrador do sistema." });
        }
    }
}

export default PedidoVendaController;
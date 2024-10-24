import { Request, Response } from "express";
import { PedidoVenda } from "../model/PedidoVenda";

interface PedidoVendaDTO {
    idCliente: number,
    idCarro: number,
    dataPedido: Date,
    valorPedido: number
}

/**
 * A classe `PedidoVendaController` estende a classe `PedidoVenda` e é responsável por controlar as requisições relacionadas aos pedidos de venda.
 * 
 * - Como um controlador dentro de uma API REST, esta classe gerencia as operações relacionadas ao recurso "pedido de venda".
 * - Herdando de `PedidoVenda`, ela pode acessar os métodos e propriedades da classe base.
 */
class PedidoVendaController extends PedidoVenda {

    /**
     * Lista todos os pedidos de venda.
     * @param req Objeto de requisição HTTP.
     * @param res Objeto de resposta HTTP.
     * @returns Lista de pedidos de venda em formato JSON com status 200 em caso de sucesso.
     * @throws Retorna um status 400 com uma mensagem de erro caso ocorra uma falha ao acessar a listagem de pedidos de venda.
     */
    static async todos(req: Request, res: Response) {
        try {
            const listaPedidos = await PedidoVenda.listagemPedidos();

            return res.status(200).json(listaPedidos);
        } catch (error) {
            console.log('Erro ao acessar listagem de carros');
            return res.status(400).json({ mensagem: "Não foi possível acessar a listagem de carros" });
        }
    }

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
            const repostaClasse = await PedidoVenda.cadastroPedido(novoPedidoVenda);

            // verifica a resposta da função
            if (repostaClasse) {
                // retornar uma mensagem de sucesso
                return res.status(200).json({ mensagem: "PedidoVenda cadastrado com sucesso!" });
            } else {
                // retorno uma mensagem de erro
                return res.status(400).json({ mensagem: "Erro ao cadastra o PedidoVenda. Entre em contato com o administrador do sistema." })
            }

        } catch (error) {
            // lança uma mensagem de erro no console
            console.log(`Erro ao cadastrar um carro. ${error}`);

            // retorna uma mensagem de erro há quem chamou a mensagem
            return res.status(400).json({ mensagem: "Não foi possível cadastrar o carro. Entre em contato com o administrador do sistema." });
        }
    }
}

export default PedidoVendaController;
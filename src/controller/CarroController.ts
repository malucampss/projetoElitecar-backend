import { Request, Response } from "express";
import { Carro } from "../model/Carro";

interface CarroDTO {
    marca: string,
    modelo: string,
    ano: number,
    cor: string
}

/**
 * Classe Controller para gerenciar as requisições relacionadas ao objeto Carro.
 * Esta classe herda da classe Carro e contém métodos responsáveis por lidar
 * com requisições HTTP.
 */
class CarroController extends Carro{

    /**
     * Método estático responsável por listar todos os carros.
     * Este método faz uma chamada assíncrona ao método `listarCarro` da classe Carro,
     * retornando uma lista de carros no formato JSON.
     *
     * @param {Request} req - O objeto da requisição HTTP.
     * @param {Response} res - O objeto da resposta HTTP.
     * 
     * @returns {Promise<void>} Retorna uma promessa que envia a lista de carros
     * ao cliente em caso de sucesso, ou uma mensagem de erro em caso de falha.
     */
    static async todos(req: Request, res: Response) {
        try {
            // Chama o método herdado de listar todos os carros
            const listaDeCarros =  await Carro.listarCarro();
            // Responde com o status 200 e a lista de carros em formato JSON
            res.status(200).json(listaDeCarros)
        } catch (error) {
            console.log(`Erro ao acessar método herdado ${error}`);
             // Exibe erro no console e responde com status 400 e uma mensagem de erro
            res.status(400).json("Erro ao recuperaras informações de carros");
        }
    }

    /**
    * Método controller para cadastrar um novo carro.
    * 
    * Esta função recebe uma requisição HTTP contendo os dados de um carro no corpo da requisição
    * e tenta cadastrar este carro no banco de dados utilizando a função `cadastroCarro`. Caso o cadastro 
    * seja bem-sucedido, retorna uma resposta HTTP 200 com uma mensagem de sucesso. Caso contrário, retorna
    * uma resposta HTTP 400 com uma mensagem de erro.
    * 
    * @param {Request} req - Objeto de requisição HTTP, contendo o corpo com os dados do carro no formato `CarroDTO`.
    * @param {Response} res - Objeto de resposta HTTP usado para retornar o status e a mensagem ao cliente.
    * @returns {Promise<Response>} - Retorna uma resposta HTTP com o status 200 em caso de sucesso, ou 400 em caso de erro.
    * 
    * @throws {Error} - Se ocorrer um erro durante o processo de cadastro, uma mensagem é exibida no console e uma 
    *                   resposta HTTP 400 com uma mensagem de erro é enviada ao cliente.
    */
    static async novo(req: Request, res: Response): Promise<Response> {
        try {
            // recuperando informações do corpo da requisição e colocando em um objeto da interface CarroDTO
            const carroRecebido: CarroDTO = req.body;

            // instanciando um objeto do tipo carro com as informações recebidas
            const novoCarro = new Carro(carroRecebido.marca, 
                                        carroRecebido.modelo, 
                                        carroRecebido.ano, 
                                        carroRecebido.cor);

            // Chama a função de cadastro passando o objeto como parâmetro
            const repostaClasse = await Carro.cadastroCarro(novoCarro);

            // verifica a resposta da função
            if(repostaClasse) {
                // retornar uma mensagem de sucesso
                return res.status(200).json({ mensagem: "Carro cadastrado com sucesso!" });
            } else {
                // retorno uma mensagem de erro
                return res.status(400).json({ mensagem: "Erro ao cadastra o carro. Entre em contato com o administrador do sistema."})
            }
            
        } catch (error) {
            // lança uma mensagem de erro no console
            console.log(`Erro ao cadastrar um carro. ${error}`);

            // retorna uma mensagem de erro há quem chamou a mensagem
            return res.status(400).json({ mensagem: "Não foi possível cadastrar o carro. Entre em contato com o administrador do sistema." });
        }
    }
}

export default CarroController;
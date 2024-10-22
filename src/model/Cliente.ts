/**
 * Classe que representa um cliente.
 */

import { DatabaseModel } from "./DatabaseModel";

const database =  new DatabaseModel().pool;


export class Cliente {

    /* Atributos */
    /* Identificador do cliente */
    private idCliente: number = 0;
    /* nome do cliente */
    private nome: string;
    /* cpf do cliente */
    private cpf: string;
    /* telefone do cliente */
    private telefone: string;
    
    /**
     * Construtor da classe Cliente
     * 
     * @param nome Nome do ccliente
     * @param cpf Cpf do cliente
     * @param telefone Telefone do cliente
     
     */
    constructor(
        nome: string,
        cpf: string,
        telefone: string
    ) {
        this.nome = nome;
        this.cpf = cpf;
        this.telefone = telefone;
    }

    /* Métodos get e set */
    /**
     * Recupera o identificador do cliente
     * @returns o identificador do cliente
     */
    public getIdCliente(): number {
        return this.idCliente;
    }

    /**
     * Atribui um valor ao identificador do cliente
     * @param idCliente novo identificado do cliente
     */
    public setIdCliente(idCliente: number): void {
        this.idCliente = idCliente;
    }

    /**
     * Retorna o nome do cliente.
     *
     * @returns {string} o nome do cliente.
     */
    public getNome(): string {
        return this.nome;
    }

    /**
     * Define o nome do cliente.
     * 
     * @param nome - O nome do cliente a ser definida.
     */
    public setNome(nome: string): void {
        this.nome = nome;
    }

    /**
     * Retorna o cpf do cliente.
     *
     * @returns {string} O cpf do cliente.
     */
    public getCpf(): string {
        return this.cpf;
    }

    /**
     * Define o cpf do cliente.
     *
     * @param cpf - O cpf do cliente do carro.
     */
    public setCpf(cpf: string): void {
        this.cpf = cpf;
    }


    /**
     * Retorna a telefone do clente.
     *
     * @returns {string} O telefone do cliente.
     */
    public getTelefone(): string {
        return this.telefone;
    }

    /**
     * Define o telefone do cliente.
     * 
     * @param telefone - O novo telefone do cliente.
     */
    public setTelefone(telefone: string): void {
        this.telefone = telefone;
    }


    //METODO PARA ACESSAR O BANCO DE DADOS
    //CRUD CREAT - READ - UPDATE - DELETE
    
    /**
    * Método estático responsável por listar todos os clientes do banco de dados.
    * Este método faz uma consulta no banco de dados, cria objetos `Cliente` para 
    * cada linha retornada e os adiciona a uma lista, que é retornada ao final.
    * 
    * @returns {Promise<Array<Cliente> | null>} Retorna uma lista de objetos `Cliente` 
    * em caso de sucesso, ou `null` em caso de erro.
    */
    static async listarCliente(): Promise<Array<Cliente> | null> {
        //criando lista vazia para armazenar os clientes
        let listaDeCliente: Array<Cliente> = [];

        try {
            //QUERY PARA CONSULTA NO BANCO DE DADOS
            const querySelectCliente = `SELECT * FROM cliente;`;

            //EXECUTA A QUERY NO BANCO DE DADOS
            const respostaBD = await database.query(querySelectCliente);

            //PERCORRE CADA RESULTADO RETORNADO PELO BANCO DE DADOS
            //CLIENTE É O APELIDO QUE DEMOS PARA CADA LINHA RETPRNADO DO BANCO DE DADOS

            //CRIANDO OBJETO CLIENTE
            respostaBD.rows.forEach((cliente) => {
                let novaCliente = new Cliente(
                    cliente.nome,
                    cliente.cpf,
                    cliente.telefone
                );
                // adicionando o ID ao objeto
                novaCliente.setIdCliente(cliente.id_cliente);

                //adicionando o cliente na lista
                listaDeCliente.push(novaCliente);
            });

            return listaDeCliente;

        } catch (error) {
            console.log(`Erro ao acessar o modelo : ${error}`);
            return null;
        }
    }

    /**
     * Realiza o cadastro de um cliente no banco de dados.
     * 
     * Esta função recebe um objeto do tipo `Cliente` e insere seus dados (nome, cpf e telefone)
     * na tabela `cliente` do banco de dados. O método retorna um valor booleano indicando se o cadastro 
     * foi realizado com sucesso.
     * 
     * @param {Cliente} cliente - Objeto contendo os dados do cliente que será cadastrado. O objeto `Cliente`
     *                        deve conter os métodos `getNome()`, `getCpf()` e `getTelefone()`
     *                        que retornam os respectivos valores do cliente.
     * @returns {Promise<boolean>} - Retorna `true` se o cliente foi cadastrado com sucesso e `false` caso contrário.
     *                               Em caso de erro durante o processo, a função trata o erro e retorna `false`.
     * 
     * @throws {Error} - Se ocorrer algum erro durante a execução do cadastro, uma mensagem de erro é exibida
     *                   no console junto com os detalhes do erro.
     */
    static async cadastroCliente(cliente: Cliente): Promise<boolean> {
        try {
            // query para fazer insert de um cliente no banco de dados
            const queryInsertCliente = `INSERT INTO cliente (nome, cpf, telefone)
                                        VALUES
                                        ('${cliente.getNome()}', 
                                        '${cliente.getCpf()}', 
                                        '${cliente.getTelefone()}') 
                                        RETURNING id_cliente;`;

            // executa a query no banco e armazena a resposta
            const respostaBD = await database.query(queryInsertCliente);

            // verifica se a quantidade de linhas modificadas é diferente de 0
            if (respostaBD.rowCount != 0) {
                console.log(`Cliente cadastrado com sucesso! ID do cliente: ${respostaBD.rows[0].id_cliente}`);
                // true significa que o cadastro foi feito
                return true;
            }
            // false significa que o cadastro NÃO foi feito.
            return false;

            // tratando o erro
        } catch (error) {
            // imprime outra mensagem junto com o erro
            console.log('Erro ao cadastrar o cliente. Verifique os logs para mais detalhes.');
            // imprime o erro no console
            console.log(error);
            // retorno um valor falso
            return false;
        }
    }
}


    
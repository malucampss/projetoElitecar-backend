import { DatabaseModel } from "./DatebaseModel";

const database =  new DatabaseModel().pool;

/**
 * Classe que representa um carro.
 */
export class Carro {

    /* Atributos */
    /* Identificador do carro */
    private idCarro: number = 0;
    /* marca do carro */
    private marca: string;
    /* modelo do carro */
    private modelo: string;
    /* ano de fabrição do carro */
    private ano: number;
    /* cor do carro */
    private cor: string;

    /**
     * Construtor da classe Carro
     * 
     * @param marca Marca do carro
     * @param modelo Modelo do carro
     * @param ano Ano de fabricação do carro
     * @param cor Cor do carro
     */
    constructor(
        marca: string,
        modelo: string,
        ano: number,
        cor: string
    ) {
        this.marca = marca;
        this.modelo = modelo;
        this.ano = ano;
        this.cor = cor;
    }

    /* Métodos get e set */
    /**
     * Recupera o identificador do carro
     * @returns o identificador do carro
     */
    public getIdCarro(): number {
        return this.idCarro;
    }

    /**
     * Atribui um valor ao identificador do carro
     * @param idCarro novo identificado do carro
     */
    public setIdCarro(idCarro: number): void {
        this.idCarro = idCarro;
    }

    /**
     * Retorna a marca do carro.
     *
     * @returns {string} A marca do carro.
     */
    public getMarca(): string {
        return this.marca;
    }

    /**
     * Define a marca do carro.
     * 
     * @param marca - A marca do carro a ser definida.
     */
    public setMarca(marca: string): void {
        this.marca = marca;
    }

    /**
     * Retorna o modelo do carro.
     *
     * @returns {string} O modelo do carro.
     */
    public getModelo(): string {
        return this.modelo;
    }

    /**
     * Define o modelo do carro.
     *
     * @param modelo - O nome do modelo do carro.
     */
    public setModelo(modelo: string): void {
        this.modelo = modelo;
    }

    /**
     * Retorna o ano do carro.
     *
     * @returns O ano do carro.
     */
    public getAno(): number {
        return this.ano;
    }

    /**
     * Define o ano do carro.
     * 
     * @param ano - O ano a ser definido para o carro.
     */
    public setAno(ano: number): void {
        this.ano = ano;
    }

    /**
     * Retorna a cor do carro.
     *
     * @returns {string} A cor do carro.
     */
    public getCor(): string {
        return this.cor;
    }

    /**
     * Define a cor do carro.
     * 
     * @param cor - A nova cor do carro.
     */
    public setCor(cor: string): void {
        this.cor = cor;
    }

    //METODO PARA ACESSAR O BANCO DE DADOS
    //CRUD CREAT - READ - UPDATE - DELETE
    
    /**
    * Método estático responsável por listar todos os carros do banco de dados.
    * Este método faz uma consulta no banco de dados, cria objetos `Carro` para cada 
    * linha retornada e os adiciona a uma lista, que é retornada ao final.
    * 
    * @returns {Promise<Array<Carro> | null>} Retorna uma lista de objetos `Carro` 
    * em caso de sucesso, ou `null` em caso de erro.
    */
    static async listarCarro(): Promise<Array<Carro> | null> {
        //criando lista vazia para armazenar os carros
        let listaDeCarros: Array<Carro> = [];

        try {
            //QUERY PARA CONSULTA NO BANCO DE DADOS
            const querySelectCarro = `SELECT * FROM carro;`;

            //EXECUTA A QUERY NO BANCO DE DADOS
            const respostaBD = await database.query(querySelectCarro);

            //PERCORRE CADA RESULTADO RETORNADO PELO BANCO DE DADOS
            //CARRO É O APELIDO QUE DEMOS PARA CADA LINHA RETPRNADO DO BANCO DE DADOS

            //CRIANDO OBJETO CARRO
            respostaBD.rows.forEach((carro) => {
                let novaCarro = new Carro(
                    carro.marca,
                    carro.modelo,
                    carro.ano,
                    carro.cor
                );
                // adicionando o ID ao objeto
                novaCarro.setIdCarro(carro.id_carro);

                //adicionando o carro na lista
                listaDeCarros.push(novaCarro);
            });

            return listaDeCarros;

        } catch (error) {
            console.log(`Erro ao acessar o modelo : ${error}`);
            return null;
        }
    }

     /**
     * Realiza o cadastro de um carro no banco de dados.
     * 
     * Esta função recebe um objeto do tipo `Carro` e insere seus dados (marca, modelo, ano e cor)
     * na tabela `carro` do banco de dados. O método retorna um valor booleano indicando se o cadastro 
     * foi realizado com sucesso.
     * 
     * @param {Carro} carro - Objeto contendo os dados do carro que será cadastrado. O objeto `Carro`
     *                        deve conter os métodos `getMarca()`, `getModelo()`, `getAno()` e `getCor()`
     *                        que retornam os respectivos valores do carro.
     * @returns {Promise<boolean>} - Retorna `true` se o carro foi cadastrado com sucesso e `false` caso contrário.
     *                               Em caso de erro durante o processo, a função trata o erro e retorna `false`.
     * 
     * @throws {Error} - Se ocorrer algum erro durante a execução do cadastro, uma mensagem de erro é exibida
     *                   no console junto com os detalhes do erro.
     */
     static async cadastroCarro(carro: Carro): Promise<boolean> {
        try {
            // query para fazer insert de um carro no banco de dados
            const queryInsertCarro = `INSERT INTO carro (marca, modelo, ano, cor)
                                        VALUES
                                        ('${carro.getMarca()}', 
                                        '${carro.getModelo()}', 
                                        ${carro.getAno()}, 
                                        '${carro.getCor()}')
                                        RETURNING id_carro;`;

            // executa a query no banco e armazena a resposta
            const respostaBD = await database.query(queryInsertCarro);

            // verifica se a quantidade de linhas modificadas é diferente de 0
            if (respostaBD.rowCount != 0) {
                console.log(`Carro cadastrado com sucesso! ID do carro: ${respostaBD.rows[0].id_carro}`);
                // true significa que o cadastro foi feito
                return true;
            }
            // false significa que o cadastro NÃO foi feito.
            return false;

            // tratando o erro
        } catch (error) {
            // imprime outra mensagem junto com o erro
            console.log('Erro ao cadastrar o carro. Verifique os logs para mais detalhes.');
            // imprime o erro no console
            console.log(error);
            // retorno um valor falso
            return false;
        }
    }
}
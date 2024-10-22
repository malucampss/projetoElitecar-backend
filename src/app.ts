import { server } from "./server";
import { DatabaseModel } from "./model/DatabaseModel";

//definindo a porta do servidor 
const port: number = 3333;

new DatabaseModel().testeConexao().then((resdb) =>{
    if(resdb){
        console.log("Conexão com o banco de dados realizado com sucesso!");
        //iniciando o servidor
        server.listen(port, () => {
             console.log(`Servidor iniciado no endereço http://localhost:${port}`);
});

    }else {
        console.log("Erro ao conectar com o banco de dados");
    }
});
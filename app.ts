import {server} from './server';
import {DatabaseModel} from './modelDatebaseModel';

const port; number = 3333;

DatabaseModel().testeConexao().then((resbd) => {
    if(resbd){
         server.listen(port, () => {
            console.log(`Servidor rodando em http://localhost:${port}`);
         })
    } else {
        console.log(`Não foi possivel conectar ao banco de dados`);
    }
    

}
)
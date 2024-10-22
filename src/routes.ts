import { Request, Response, Router} from "express";
import CarroController from "./controller/CarroController";
import ClienteController from "./controller/ClienteController";
import PedidoVenda from  "./controller/PedidoVendaController";
import PedidoVendaController from "./controller/PedidoVendaController";

//Cria um roteador

const router = Router();



//Criando uma rota principal para a aplicação
router.get("/", (req: Request, res: Response ) => {
    res.json({ mensagem: "Olá, mundo"});
});

router.get("/carro", CarroController.todos);
router.post("/novo/carro", CarroController.novo);


router.get("/cliente", ClienteController.todos);
router.post("/novo/cliente", ClienteController.novo);


router.get("/PedidoVenda", PedidoVendaController.todos);
router.post("/novo/pedido", PedidoVendaController.novo);

//exportando as rotas
export { router };
import { Router } from "express";
import Estacao from "./EstacaoRouter"
import Parametros from "./ParametrosRouter";

const router = Router();

router.use('/estacao', Estacao);
router.use('/parametro', Parametros)

export default router;
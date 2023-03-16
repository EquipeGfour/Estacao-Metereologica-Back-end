import { Router } from "express";
import Estacao from "./EstacaoRouter"

const router = Router();

router.use('/estacao', Estacao);

export default router;
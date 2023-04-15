import db from "../config/db";
import { Request, Response } from "express";
import Medida from "../models/Medida";
import { log } from "console";

class MedidaController{
    public async buscarMedidas (req:Request, res: Response){
        try{

        }catch(error){
            console.log(error);
            res.status(500).json({message: error});            
        }
    };

    public async buscarMedidasPorId(req: Request, res: Response){
        try{

        }catch(error){
            console.log(error);
            res.status(500).json({message: error});            
        }
    };

    public async cadastrarMedidas(req: Request, res: Response){
        try{

        }catch(error){
            console.log(error);
            res.status(500).json({message: error});            
        }
    };

    public async editarMedidas(req:Request, res: Response){
        try{

        }catch(error){
            console.log(error);
            res.status(500).json({message: error});            
        }
    };

    public async excluirMedidas(req: Request, res: Response){
        try{

        }catch(error){
            console.log(error);
            res.status(500).json({message: error});            
        }
    }
}

export default MedidaController
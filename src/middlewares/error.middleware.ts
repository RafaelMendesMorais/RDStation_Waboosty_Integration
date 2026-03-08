import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger"

export function errorMiddleware(err: Error, req: Request, res: Response, next: NextFunction) {



    logger.error("Erro não tratado", err)

    return res.status(500).json({
        message: "Internal Server Error"
    })
}

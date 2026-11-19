import axios from "axios";
import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export function errorMiddleware(err: unknown, req: Request, res: Response, next: NextFunction) {
    if (res.headersSent) return next(err);

    if (err instanceof ZodError) {
        return res.status(422).json({
            message: "Erro de validação",
            errors: err.issues.map(issue => ({
                field: issue.path.join("."),
                message: issue.message
            }))
        });
    }

    if (axios.isAxiosError(err)) {
        const timeout = err.code === "ECONNABORTED" || err.code === "ETIMEDOUT";
        console.error("Falha na integração", req.path, err.response?.status ?? err.code);
        return res.status(timeout ? 504 : 502).json({
            message: timeout ? "Tempo de resposta da integração excedido" : "Falha na integração externa"
        });
    }

    if (err instanceof Error && "type" in err) {
        if (err.type === "entity.parse.failed") return res.status(400).json({ message: "JSON inválido" });
        if (err.type === "entity.too.large") return res.status(413).json({ message: "Corpo da requisição muito grande" });
    }

    console.error("Falha interna ao processar webhook", req.path);
    return res.status(500).json({ message: "Internal Server Error" });
}

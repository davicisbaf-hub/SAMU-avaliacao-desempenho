import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
import { env } from "../../config/env.ts";

export function autenticar(req: Request, res: Response, next: NextFunction) {
  // Try Authorization header first, then cookie
  const headerToken = req.headers.authorization?.split(" ")[1];
  const cookieToken = (req as any).cookies?.token;
  const token = headerToken || cookieToken;

  if (!token) {
    return res.status(401).json({ erro: "Token não fornecido" });
  }

  try {
    const payload = jwt.verify(token, env.jwtSecret);
    (req as any).usuario = payload;
    next();
  } catch {
    return res.status(401).json({ erro: "Token inválido ou expirado" });
  }
}
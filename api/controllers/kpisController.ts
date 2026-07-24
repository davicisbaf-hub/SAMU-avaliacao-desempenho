import type { Request, Response } from "express";
import pool from "../pool";

export async function avaliacoesPorCategoria(req: Request, res: Response) {
  try {
    const { base } = req.query as { base?: string | string[] };
    const bases: string[] = Array.isArray(base)
      ? base
      : base
        ? base.split(",").map((value) => value.trim()).filter(Boolean)
        : [];
    const params: string[] = [];
    const whereClause = bases.length ? `AND avaliado.base = ANY($1)` : "";
    if (bases.length) params.push(bases);

    const { rows } = await pool.query(`
      SELECT
        ca.categoria,
        a.tipo_avaliacao,
        COUNT(DISTINCT a.id) as total_avaliacoes,
        COUNT(DISTINCT a.avaliado_id) as profissionais_avaliados,
        ROUND(
          SUM(
            CAST(a.resultado->ca.criterio->>'nota' AS INT) *
            CAST(a.resultado->ca.criterio->>'peso' AS INT)
          ) /
          NULLIF(SUM(CAST(a.resultado->ca.criterio->>'peso' AS INT)), 0)
        ::NUMERIC, 2) as media_ponderada,
        MAX(CAST(a.resultado->ca.criterio->>'nota' AS INT)) as nota_maxima,
        MIN(CAST(a.resultado->ca.criterio->>'nota' AS INT)) as nota_minima,
        SUM(CAST(a.resultado->ca.criterio->>'peso' AS INT)) as soma_pesos
      FROM avaliacoes a
      JOIN criterios_avaliacao ca ON a.tipo_avaliacao = ca.tipo AND ca.ativo = true
      JOIN usuarios avaliado ON avaliado.id = a.avaliado_id
      WHERE a.resultado->ca.criterio->>'nota' IS NOT NULL
      ${whereClause}
      GROUP BY ca.categoria, a.tipo_avaliacao, ca.tipo
      ORDER BY a.tipo_avaliacao, ca.categoria
    `, params);

    res.json(rows);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ erro: error.message });
  }
}

export async function avaliacoesPorProfissional(req: Request, res: Response) {
  try {
    const { base } = req.query as { base?: string | string[] };
    const bases: string[] = Array.isArray(base)
      ? base
      : base
        ? base.split(",").map((value) => value.trim()).filter(Boolean)
        : [];
    const params: string[] = [];
    const whereClause = bases.length ? `AND avaliado.base = ANY($1)` : "";
    if (bases.length) params.push(bases);

    const { rows } = await pool.query(`
      SELECT
        avaliado.nome,
        avaliado.funcao,
        COUNT(*) as total_avaliacoes,
        a.tipo_avaliacao,
        ROUND(AVG(
          (SELECT AVG(CAST(value->>'nota' AS INT))
           FROM jsonb_each(a.resultado))
        )::NUMERIC, 2) as media_geral
      FROM avaliacoes a
      JOIN usuarios avaliado ON avaliado.id = a.avaliado_id
      WHERE 1=1
      ${whereClause}
      GROUP BY avaliado.id, avaliado.nome, avaliado.funcao, a.tipo_avaliacao
      ORDER BY a.tipo_avaliacao, avaliado.funcao
    `, params);
    res.json(rows);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ erro: error.message });
  }
}
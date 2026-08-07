import pg from "pg";
import { env } from "../config/env.ts";


const pool = new pg.Pool({
  host: env.db.host || "192.168.1.10",
  port: env.db.port,
  user: env.db.user,
  password: env.db.password,
  database: env.db.name,
  options: `-c search_path=${env.db.schema}`,
});

export default pool;
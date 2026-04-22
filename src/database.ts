import { Pool } from "pg"

export const db = new Pool({
  user: Bun.env.DB_USER,
  password: Bun.env.DB_PASSWORD,
  host: Bun.env.DB_HOST,
  port: Number(Bun.env.DB_PORT),
  database: Bun.env.DB_NAME || "database"
})
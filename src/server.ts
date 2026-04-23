import { Hono } from "hono"
import { db } from "./database"

const app = new Hono()

app.get("/", async c => {
  const res = await db.query("SELECT * FROM quran")

  return c.json({ 
    count: res.rowCount 
  })
})

app.get("/surah/:no", async c => {
  const surahNo = c.req.param("no")
  const res = await db.query("SELECT * FROM quran WHERE surah_no = $1", [surahNo])

  return c.json(res.rows)
})

export default app
/**
 * Helper file to insert the Quran dataset
 * into a Postgres database automatically.
 * 
 * You can use this if you wish to manually host
 * the data rather than using a public API.
 */

import { Client } from "pg"
import { inferSchema, initParser } from "udsv"

import config from "./config.json"
import { sys } from "typescript"

type Item = {
  surah_no: number
  surah_name_en: string
  surah_name_ar: string
  surah_name_roman: string
  ayah_no_surah: number
  ayah_no_quran: number
  ayah_ar: string
  ayah_en: string
  ruko_no: number
  juz_no: number
  manzil_no: number
  hizb_quarter: number
  total_ayah_surah: number
  total_ayah_quran: number
  place_of_revelation: string
  sajah_ayah: boolean
  sajdah_no: string,
  no_of_word_ayah: number
  list_of_words: string[]
}

async function main() {
  const pg = new Client({
    user: config.DB_USER,
    password: config.DB_PASSWORD,
    host: config.DB_HOST,
    port: config.DB_PORT,
  })

  await pg.connect()

  console.log("Connected to", pg.host)
  pg.query(await Bun.file("./table.sql").text())
  console.log("Created table \"quran\"")

  const q = await pg.query("SELECT * FROM quran")

  if ((q.rowCount ?? 0) > 0) {
    console.log("Table already has data, exiting (found", q.rowCount, "items)")
    sys.exit(0)
  } else {
    console.log("Table is empty -- proceeding")
  }

  console.log("Importing CSV data")

  const file = Bun.file("./quran-dataset.csv")
  const contents = await file.text()

  const schema = inferSchema(contents)
  const reader = initParser(schema)

  const data = reader.typedObjs(contents) as Item[]

  console.log("Loaded", data.length, "items")
  console.log("Importing into database")

  const startImportTime = Date.now()

  for (const item of data) {
    await pg.query(`
      INSERT INTO quran (
        surah_no,
        surah_name_en,
        surah_name_ar,
        surah_name_roman,
        ayah_no_surah,
        ayah_no_quran,
        ayah_ar,
        ayah_en,
        total_ayah_surah,
        total_ayah_quran,
        place_of_revelation
      )
      VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11
      )
    `, [
        item.surah_no, 
        item.surah_name_en, 
        item.surah_name_ar, 
        item.surah_name_roman, 
        item.ayah_no_surah, 
        item.ayah_no_quran, 
        item.ayah_ar, 
        item.ayah_en, 
        item.total_ayah_surah, 
        item.total_ayah_quran, 
        item.place_of_revelation
      ]
    )
  }
  
  const finishTime = Date.now()
  console.log("Imported items, took", finishTime - startImportTime, "ms")

  sys.exit(0)
}

await main()
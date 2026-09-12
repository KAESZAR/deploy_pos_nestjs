require("dotenv").config({ path: ".env.local" })
require("dotenv").config()

const { Client } = require("pg")

async function main() {
    const adminDb = process.env.DATABASE_NAME === "postgres" ? "postgres" : "postgres"
    const targetDb = process.env.DATABASE_NAME || "posnest"

    const client = new Client({
        host: process.env.DATABASE_HOST || "127.0.0.1",
        port: parseInt(process.env.DATABASE_PORT || "5432", 10),
        user: process.env.DATABASE_USER || "postgres",
        password: process.env.DATABASE_PASS,
        database: adminDb,
        ssl: process.env.DATABASE_HOST !== '127.0.0.1'
            ? { rejectUnauthorized: false }
            : false,
    })

    if (!process.env.DATABASE_PASS) {
        console.error("DATABASE_PASS is missing. Copy .env.local.example to .env.local and set your postgres password.")
        process.exit(1)
    }

    await client.connect()

    const exists = await client.query("SELECT 1 FROM pg_database WHERE datname = $1", [targetDb])
    if (exists.rowCount === 0) {
        await client.query(`CREATE DATABASE "${targetDb}"`)
        console.log(`Database "${targetDb}" created.`)
    } else {
        console.log(`Database "${targetDb}" already exists.`)
    }

    await client.end()
    console.log("Local database is ready.")
}

main().catch((err) => {
    console.error("Setup failed:", err.message)
    process.exit(1)
})

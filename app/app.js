import dotenv from "dotenv"
import express from "express"
import {fileURLToPath} from "url"
import {dirname, join} from "path"
import connect_db from "./schemas/database.js"
import routes from "./routes/logRoutes.js"

const app = express()
dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

app.use(express.static(join(__dirname, "public")))
app.use(express.json())
app.use("/", routes)

app.listen(process.env.PORT, () => {
  connect_db(process.env.MONGO_NODE_URL)
  console.log("Servidor online.")
})

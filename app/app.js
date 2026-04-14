import dotenv from "dotenv"
import express from "express"
import path from "path"
import cors from "cors"
import connect_db from "./schemas/database.js"
import routes from "./routes/logRoutes.js"

const app = express()
const __dirname = path.dirname(new URL(import.meta.url).pathname)

dotenv.config({ path: path.resolve(__dirname + "/../.env") })
console.log(__dirname + ".env")

app.use(express.json())
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}))
app.use(express.urlencoded({ extended: true }))
app.use("/", routes)

app.listen(process.env.PORT, () => {
  connect_db(process.env.MONGO_NODE_URL)
  console.log("API is running.")
})

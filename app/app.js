import dotenv from "dotenv"
import path from "path"
import express from "express"
import cors from "cors"
import connect_db from "./schemas/database.js"
import routes from "./routes/logRoutes.js"

const app = express()
const __dirname = path.dirname(new URL(import.meta.url).pathname)

dotenv.config(__dirname + "../.env")

app.use(express.json())
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}))
app.use(express.urlencoded({ extended: true }))
app.use("/", routes)
app.use(express.static(path.join(__dirname, "public")))

app.listen(process.env.PORT, () => {
  connect_db(process.env.MONGO_NODE_URL)
  console.log("API is running.")
})

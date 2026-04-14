import dotenv from "dotenv"
import express from "express"
import cors from "cors"
import connect_db from "./schemas/database.js"
import routes from "./routes/logRoutes.js"

const app = express()
dotenv.config()

app.use(express.json())
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}))
app.use(express.urlencoded({ extended: true }))
app.use("/", routes)

app.listen(process.env.PORT, () => {
  connect_db(process.env.MONGO_NODE_URL)
  console.log("API is running.")
})

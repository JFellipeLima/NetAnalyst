import dotenv from "dotenv"
import express from "express"
import connect_db from "./schemas/database.js"
import routes from "./routes/logRoutes.js"

const app = express()
dotenv.config()

app.use(express.json())
app.use("/", routes)

app.listen(process.env.PORT, () => {
  connect_db(process.env.MONGO_NODE_URL)
  console.log("Servidor online.")
})

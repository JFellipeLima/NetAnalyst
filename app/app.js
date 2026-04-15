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
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type', 
      'Authorization',
       'DNT', 
       'User-Agent', 
       'X-Requested-With', 
       'If-Modified-Since',
        'Cache-Control', 
        'Range',
      'Access-Control-Allow-Origin'
    ],
    credentials: true
}));

app.use(express.urlencoded({ extended: true }))
app.use("/", routes)

app.listen(process.env.PORT, () => {
  connect_db(process.env.MONGO_NODE_URL)
  console.log("API is running.")
})

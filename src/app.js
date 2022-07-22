import express from "express"
import cors from "cors"
import useRoutes from "./routes/index.js"

const app = express()
app.use(express.json(), cors())
useRoutes(app)

export default app
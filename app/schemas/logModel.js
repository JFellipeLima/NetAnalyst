import { model, Schema } from "mongoose"

const logSchema = new Schema({
  domain: { type: String, required: true, index: true },
  status_code: { type: Number, required: true },
  date: { type: Date, required: true, index: true },
  latency_ms: { type: Number, required: true },
  method: { type: String, required: true }
}, {
  strict: false
})

export default model("log", logSchema, "logs")

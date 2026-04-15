import { model, Schema } from "mongoose"

const logSchema = new Schema({
  domain: { type: String, required: true, index: true },
  status_code: { type: Number, required: true },
  date: { type: Date, required: true},
  latency_ms: { type: Number, required: true },
  method: { type: String, required: true }
}, {
  strict: false
})
logSchema.index({ date: 1}, { expireAfterSeconds: 10800}) // add expire functionalyti

export default model("log", logSchema, "logs")

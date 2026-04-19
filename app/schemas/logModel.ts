import { model, Schema } from "mongoose"

export interface logInterface {
  domain: string,
  status_code: number,
  date: Date,
  latency_ms: number,
  method: string
}
const logSchema = new Schema<logInterface>({
  domain: { type: String, required: true, index: true },
  status_code: { type: Number, required: true },
  date: { type: Date, default: Date.now(), required: true},
  latency_ms: { type: Number, required: true },
  method: { type: String, required: true }
}, {
  strict: false
})
logSchema.index({ date: 1}, { expireAfterSeconds: 10800}) // add expire functionalyti

export const logModel = model<logInterface>("log", logSchema, "logs")

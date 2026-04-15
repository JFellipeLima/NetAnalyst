import { model, Schema } from "mongoose"

const incidentType = new Schema({
  status_code: { type: Number, required: true },
  date: { type: Date, required: true }
})

const graphicModel = new Schema({
  domain_name: { type: String, required: true}, 
  max_latency: { type: Number, required: true },
  min_latency: { type: Number, required: true },
  avg_latency: { type: Number, required: true },
  incidents: { type: [incidentType], default: [] },
  status: { type: String, required: true },
  date: { type: Date, required: true, default: Date.now}
})

graphicModel.index({ date: 1}, { expireAfterSeconds: 2592000}) // add expire functionality

export default model("analytic", graphicModel, "analytics")

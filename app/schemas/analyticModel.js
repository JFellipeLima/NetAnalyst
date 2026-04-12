import { model, Schema } from "mongoose"

const incidentType = new Schema({
  status_code: { type: Number, required: true },
  date: { type: Date, required: true }
})

const graphicModel = new Schema({
  domain_name: { type: String, required: true, index: true },
  max_latency: { type: Number, required: true },
  min_latency: { type: Number, required: true },
  avg_latency: { type: Number, required: true },
  incidents: { type: [incidentType], default: [] },
  status: { type: String, required: true },
  date: { type: Date, required: true, default: Date.now, index: true }
})

export default model("analystic", graphicModel, "analystics")

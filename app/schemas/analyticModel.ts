import { model, Schema } from "mongoose"

interface incidentsInterface {
  status_code: number,
  date: Date
}
export interface analyticInterface {
  domain_name: string,
  max_latency: number,
  avg_latency: number,
  min_latency: number
  incidents: incidentsInterface[],
  status: string,
  date: Date

}
const incidentType = new Schema<incidentsInterface>({
  status_code: { type: Number, required: true },
  date: { type: Date, required: true }
})

const graphicModel = new Schema<analyticInterface>({
  domain_name: { type: String, required: true}, 
  max_latency: { type: Number, required: true },
  min_latency: { type: Number, required: true },
  avg_latency: { type: Number, required: true },
  incidents: { type: [incidentType], default: [] },
  status: { type: String, required: true },
  date: { type: Date, required: true, default: Date.now}
})

graphicModel.index({ date: 1}, { expireAfterSeconds: 2592000}) // add expire functionality

export const analyticModel = model<analyticInterface>("analytic", graphicModel, "analytics")

import log from "../schemas/logModel.js"
import analytic from "../schemas/analyticModel.js"

async function getLogs(req, res) {
  try {
    const logData = await log.find({}).limit(100)
    return res.status(200).json(logData)
  } catch (err) {
    res.status(500).json({ message: "Internal server error" })
  }
}

async function getAnalytics(req, res) {
  try {
    const analyticData = await analytic.find({}).limit(100)
    res.status(200).json(analyticData)
  } catch (err) {
    res.status(500).json({ message: "Internal server error" })
  }
}

export { getLogs, getAnalytics }

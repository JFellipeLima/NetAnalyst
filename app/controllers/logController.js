import log from "../schemas/logModel.js"
import analytic from "../schemas/analyticModel.js"
async function getDomains(req, res) {
  try {
    let domains = await analytic.find({}).distinct("domain_name")
    res.status(200).json(domains)
  } catch (err) {
    res.status(500).json({ message: "Internal server error" })
  }
}
async function getLogs(req, res) {
  if (req.body["domain_name"] == 'All') {
    let logs = await log.find({}).limit(20000)
    res.status(200).json(logs)
  } else {
    try {
      const domainName = "https://" + req.body["domain_name"]
      let logs = await log.find({ domain_name: domainName }).limit(100)
      res.status(200).json(logs)
    } catch (err) {
      res.status(500).json({ message: "Internal server error" })
    }
  }
}
async function getAnalytics(req, res) {
  try {
    if (req.body["domain_name"] == 'All') {
      let analytics = await analytic.find({}).limit(100)
      res.status(200).json(analytics)
    } else {
      const domainName = "https://" + req.body["domain_name"]
      let analytics = await analytic.find({ domain_name: domainName }).limit(100)
      res.status(200).json(analytics)
    }
  } catch (err) {
    res.status(500).json({ message: "Internal server error" })
  }
}

export { getLogs, getAnalytics, getDomains }

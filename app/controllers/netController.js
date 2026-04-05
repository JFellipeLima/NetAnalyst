import log from "../schemas/logsSchema.js" 

async function getLogs (req,res) {
  try {
    const data = await log.find({})
    return res.status(200).json(data)
    } catch (err) {
      console.log(err)
    }
  }

export default getLogs

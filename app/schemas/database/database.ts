import mongoose from "mongoose"

async function connect(URI) {
  try {
    mongoose.connect(URI)
    console.log("Database connected")
  }
  catch (err) {
    console.log(err)
  }
}
export default connect

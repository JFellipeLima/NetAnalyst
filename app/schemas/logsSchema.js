import { model, Schema} from "mongoose"

const logSchema = new Schema({
  domain: {type: String, required: true},
  status_code :{type: Number, required: true},
  date: {type: Date,required: true}
}, {
  strict: false
})

export default model("log", logSchema, "logs")

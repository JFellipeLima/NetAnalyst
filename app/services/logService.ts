import { logModel, type logInterface } from "../schemas/logModel"

export default class logService {
    static async getLog(domainName: string): Promise<logInterface[]> {
        if (domainName == "All") {
            return await logModel.find({})
        .limit(100)
    } else {
        return await logModel.find({
            domain: domainName
        })
    }}
    static async getDomains(): Promise<String[]>{
        const DOMAINS = process.env.DOMAINS
        
        return DOMAINS.split(",")
}}

import { type logInterface } from "../schemas/logModel"
import prisma from "../lib/prisma"

export default class logService {
    static async getLog(domainName: number): Promise<logInterface[]> {
        if (domainName == 0) {
            return await prisma.logs.findMany()
    } else {
        return await prisma.logs.findMany({
            where: {
                domain_id: domainName
            }
        })
    }}
    static async getDomains(): Promise<String[]>{
        const DOMAINS = process.env.DOMAINS

        return DOMAINS.split(",")
}}

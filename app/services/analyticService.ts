/*import { type analyticInterface } from "../schemas/analyticModel"
import prisma from "../lib/prisma"

export class analyticService {
    static async getAnalytic(domainName: string): Promise<analyticInterface[]> {
        if (domainName == "All") {
            return await prisma.find({})
            .limit(100)
        } else {
            return await prisma.users.find({
                domain_name: domainName
            })
        }
    }
}*/
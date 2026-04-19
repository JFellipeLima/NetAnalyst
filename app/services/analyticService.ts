import { type analyticInterface, analyticModel } from "../schemas/analyticModel"

export class analyticService {
    static async getAnalytic(domainName: string): Promise<analyticInterface[]> {
        if (domainName == "All") {
            return await analyticModel.find({})
            .limit(100)
        } else {
            return await analyticModel.find({
                domain_name: domainName
            })
        }
    }
}
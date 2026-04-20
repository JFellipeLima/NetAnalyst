import { Schema, model } from "mongoose"
interface iDomains {
    domain: string
}

export interface iUser {
    _id?: string,
    name: string,
    email: string,
    passkey: String,
    createdAt: Date,
    domainsUser: iDomains[]
}

const domainsModel = new Schema<iDomains>({
    domain: String
})
const UserModel = new Schema<iUser>({
    name: {type: String, required: true},
    email: {type: String, required: true},
    passkey: {type: String, required: true},
    createdAt: {type: Date, default: Date.now(), required: true},
    domainsUser: {type: [domainsModel], default: []}
})

export const User = model("user", UserModel, "users")

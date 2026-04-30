interface iDomains {
    domain: string
}

export interface iUser {
    id: number,
    name: string,
    email: string,
    passkey: string,
    active: boolean,
    created_at: Date,
    //domainsUser: iDomains[]
}

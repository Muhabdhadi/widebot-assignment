export interface UserInterface {
    id: number,
    name: string,
    username: string,
    email: string,
    address: Address,
    phone: string,
    website: string,
    company: Company
}

interface Company {
    name: string,
    catchPhrase: string,
    bs: string
}

interface Address {
    street: string,
    suite: string,
    city: string,
    zipcode: string,
    geo: {
        lat: string,
        lng: string
    }
}

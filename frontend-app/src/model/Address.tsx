export default class Address {
    street: string = ''
    number: string = ''
    city: string = ''
    state: string = ''

    constructor(address: any) {
        if (address) {
            this.street = address.street
            this.number = address.number
            this.city = address.city
            this.state = address.state
        }
    }

    getFullAddress = () => {
        return `${this.street} ${this.number} ${this.city} ${this.state}`
    }
}
export default class Address {
    street = ''
    number = ''
    city = ''
    state = ''

    constructor(address?: Address) {
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
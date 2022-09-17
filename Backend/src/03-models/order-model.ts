class OrderModel {
    id: number
    price: number
    orderDate: Date
    customerName: string

    //copy constructor 
    constructor(order: OrderModel) {
        this.id = order.id
        this.price = order.price
        this.orderDate = order.orderDate
        this.customerName = order.customerName

    }
}

export default OrderModel





import { OkPacket } from "mysql";
import dal from "../04-dal/dal";
import ErrorModel from "../03-models/error-model";
import OnlineOrderModel from "../03-models/online-order-model";


//We want to get ONLY the orders in the last day.
async function getAllOrdersLastDay(): Promise<OnlineOrderModel[]> {
    const sql = `SELECT * FROM orders WHERE orderDate BETWEEN  (CURDATE() - INTERVAL 1 DAY) AND (CURDATE())`
    const lastDayOrders = await dal.execute(sql)
    if (lastDayOrders.length === 0) throw new ErrorModel(200, 'No orders in the last day')  // If there were no orders then not an error but 200 Ok and display a message. Another option is to return status 204 no content
    return lastDayOrders
}

//Add new order
async function addOrder(order: OnlineOrderModel): Promise<OnlineOrderModel> {
    //Validation -if new order does not pass joi validation throw new Error (to the controller which then gets passed to errors-handler middleware)
    const errors = order.validatePost()
    if (errors) throw new ErrorModel(400, errors)

    const sql = `INSERT INTO orders VALUES(DEFAULT,?,?,?,?,?)`  //prevent sql injection
    const info: OkPacket = await dal.execute(sql, [order.price, order.orderDate, order.customerName, order.deliveryAddress, order.phone])

    //Give order the auto incremented order id
    order.id = info.insertId
    return order
}

export default {
    getAllOrdersLastDay,
    addOrder
}
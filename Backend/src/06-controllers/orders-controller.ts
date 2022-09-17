import express, { NextFunction, Request, Response } from 'express'
import OnlineOrderModel from '../03-models/online-order-model'
import ordersLogic from '../05-logic/orders-logic'

const router = express.Router()

// http://localhost:3001/api/orders/
router.get('/orders', async (request: Request, response: Response, next: NextFunction) => {

  try {
    //Logic
    const orders = await ordersLogic.getAllOrdersLastDay()

    //Success
    response.json(orders)

  } catch (err: any) {
    //All errors from business logic will end up here as well and go straight to my last middleware in app.ts
    next(err)
  }
})


// http://localhost:3001/api/orders/
router.post('/orders', async (request: Request, response: Response, next: NextFunction) => {

  try {

    const order = new OnlineOrderModel(request.body)  //making an instance out of OrderModel with raw data from front
    const addedOrder = await ordersLogic.addOrder(order)
    response.status(201).json(addedOrder)

  } catch (err: any) {
    next(err)
  }
})



export default router 
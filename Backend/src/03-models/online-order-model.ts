import Joi from 'joi';
import OrderModel from './order-model';


class OnlineOrderModel extends OrderModel {

    deliveryAddress: string
    phone: string

    //copy constructor - turning object literal into instance of this class so I can use all methods. 
    constructor(order: OnlineOrderModel) {
        super(order)
        this.deliveryAddress = order.deliveryAddress
        this.phone = order.phone
    }

    //private because I only want this class to use it and static because I only want it to be made once for all instances  
    private static postValidationSchema = Joi.object({
        id: Joi.forbidden(),
        price: Joi.number().required().min(0).max(100000),
        orderDate: Joi.date().iso().greater(new Date()).required(),
        customerName: Joi.string().required().min(2).max(30),
        deliveryAddress: Joi.string().required().min(2).max(100),
        phone: Joi.string().required().min(5).max(15)
    })


    validatePost(): string {
        const result = OnlineOrderModel.postValidationSchema.validate(this, { abortEarly: false })
        return result.error?.message
    }
}

export default OnlineOrderModel




import express from 'express';
import Order from "../models/Orders.js";
const router = express.Router();

router.post('/orderData', async (req, res) => {
    let { order_data, order_date, email } = req.body;

    if (!order_data || !order_date || !email) {
        return res.status(400).json({ error: "Missing required fields: order_data, order_date, or email" });
    }

    order_data.splice(0, 0, { Order_date: order_date });
    console.log("1231242343242354", email);

    try {
        let eId = await Order.findOne({ 'email': email });
        console.log(eId);

        if (eId === null) {
            await Order.create({
                email: email,
                order_data: [order_data]
            });
            res.json({ success: true });
        } else {
            await Order.findOneAndUpdate(
                { email: email },
                { $push: { order_data: order_data } }
            );
            res.json({ success: true });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error", error.message);
    }
});

router.post('/myorders', async (req, res) => {

try {
    let mydata = await Order.findOne({'email':req.body.email});
    res.json({orderData:mydata});
}
catch (error) {
    console.log(error);
}

})

export default router;

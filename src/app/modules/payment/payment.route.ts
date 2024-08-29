import { Router } from "express";
import { PaymentController } from "./payment.controller";

const router = Router();

// router.post("/create-payment-intent", async (req, res) => {
//   const { amount } = req.body;

//   try {
//     const paymentIntent = await PaymentService.createPaymentIntent(amount);
//     res.send({ clientSecret: paymentIntent.client_secret });
//   } catch (error) {
//     res.status(400).send({ error: error.message });
//   }
// });

router.post("/create-payment-intent", PaymentController.createPaymentIntent);

export const PaymentRoutes = router;

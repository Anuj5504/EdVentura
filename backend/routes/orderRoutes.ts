import express from "express";
const orderRouter = express.Router();
import { createOrder } from "../controllers/orderController";
import { isAuthenticated } from "../middleware/auth";


orderRouter.post("/create-order",isAuthenticated , createOrder);


export default orderRouter;
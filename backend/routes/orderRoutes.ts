import express from "express";
const orderRouter = express.Router();
import { createOrder, getAllOrders } from "../controllers/orderController";
import { authorizedRoles, isAuthenticated } from "../middleware/auth";


orderRouter.post("/create-order",isAuthenticated , createOrder);

orderRouter.get("/get-all-order",isAuthenticated,authorizedRoles("admin") , getAllOrders);


export default orderRouter;
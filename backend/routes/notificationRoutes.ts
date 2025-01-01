import express from "express";
const notificationRouter = express.Router();
import { getNotifications, updateNotificationStatus } from "../controllers/notificationController";   
import { authorizedRoles, isAuthenticated } from "../middleware/auth";

notificationRouter.get("/get-all-notifications",isAuthenticated,authorizedRoles("admin"),getNotifications);

notificationRouter.put("/update-notification/:id",isAuthenticated,authorizedRoles("admin"),updateNotificationStatus);

export default notificationRouter;
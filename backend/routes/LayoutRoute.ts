import express from "express";
import { authorizedRoles, isAuthenticated } from "../middleware/auth";
import { createLayout, editLayout, getLayoutByType } from "../controllers/layoutController";
const LayoutRouter=express.Router();

LayoutRouter.post("/create-layout",isAuthenticated,authorizedRoles("admin"),createLayout);

LayoutRouter.put("/edit-layout",isAuthenticated,authorizedRoles("admin"),editLayout);

LayoutRouter.get("/get-layout",getLayoutByType);

export default LayoutRouter;
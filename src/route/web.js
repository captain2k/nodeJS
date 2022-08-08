import express from "express";
import {
  homeController,
  detailController,
  createUserController,
  deleteUserController,
  getDetailUserController,
  updateUserController,
} from "../controller/homeController";

let router = express.Router();

export function initWebRoute(app) {
  router.get("/", homeController);

  router.get("/details/:userId", detailController);

  router.post("/create-user", createUserController);

  router.post("/delete-user/:userId", deleteUserController);

  router.get("/get-user-detail/:userId", getDetailUserController);

  router.post("/edit-user/:userId", updateUserController);

  return app.use("/", router);
}

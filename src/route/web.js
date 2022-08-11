import path from "path";
import express from "express";
import multer from "multer";
import appRoot from "app-root-path";
import {
  homeController,
  detailController,
  createUserController,
  deleteUserController,
  getDetailUserController,
  updateUserController,
  uploadController,
  uploadPageController,
} from "../controller/homeController";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, appRoot + "/src/public/image/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

let router = express.Router();

export function initWebRoute(app) {
  router.get("/", homeController);

  router.get("/details/:userId", detailController);

  router.post("/create-user", createUserController);

  router.post("/delete-user/:userId", deleteUserController);

  router.get("/get-user-detail/:userId", getDetailUserController);

  router.post("/edit-user/:userId", updateUserController);

  router.get("/uploadPage", uploadPageController);

  router.post("/upload/pic", upload.array("avatar"), uploadController);

  return app.use("/", router);
}

import express from "express";
import { getAllUserApi,createUserApi, editUserApi,deleteUser } from "../controller/ApiController";

let router = express.Router()

export function initApiRoute(app) {
    // Routes
    router.get('/users', getAllUserApi)

    router.post('/create-user', createUserApi)

    router.put('/edit-user/:userId', editUserApi)

    router.delete('/delete-user/:userId', deleteUser)

    return app.use('/api/v1', router)
}
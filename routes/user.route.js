const express = require("express");
const { addUser, getAllUser } = require("../controllers/user.controller");
const userRouter = express.Router();

userRouter.route('/add').post(addUser)
userRouter.route('/all').get(getAllUser)

module.exports = userRouter
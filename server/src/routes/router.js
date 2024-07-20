const usersController = require('../controllers/UsersController')
const ordersController = require("../controllers/OrdersController")
const menuController = require("../controllers/MenuController")

const router = require("express").Router();

const authOnly = require("../middleware/authOnly")

const userRouter = require("express").Router();
const adminRouter = require("express").Router();
const ordersRouter = require("express").Router();
const menuRouter = require("express").Router();

ordersRouter.get("/getAll", ordersController.getAll)
ordersRouter.get("/getOne/:id", ordersController.getOne)
ordersRouter.post("/create", ordersController.create)
ordersRouter.put("/update", ordersController.update)

userRouter.post("/register", usersController.register)
userRouter.post("/login", usersController.login)

userRouter.post("/hello", [authOnly], usersController.getHello);

menuRouter.get("/getAll", menuController.getAll)

router.use("/orders", ordersRouter)
router.use("/user", userRouter)
router.use("/admin", adminRouter)
router.use("/menu", menuRouter)

module.exports = router;
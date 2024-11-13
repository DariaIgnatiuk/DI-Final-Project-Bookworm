const { Router } = require("express");
const userController = require("../controllers/userController.js");
const { verifyToken } = require("../middlewares/verifyToken.js");

const router = Router();

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.delete("/logout", userController.logoutUser);
router.get("/auth", verifyToken, userController.verifyAuth);

module.exports = router;

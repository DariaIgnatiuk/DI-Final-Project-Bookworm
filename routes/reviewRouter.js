const { Router } = require("express");
const reviewController = require("../controllers/reviewController.js");

const router = Router();

router.post("/add", reviewController.addReview);
router.get("/all/:user_id", reviewController.getAllReviewsById);
router.get("/:id", reviewController.getReviewById);
router.delete("/remove/:id", reviewController.removeReview);
router.put("/edit/:id", reviewController.editReview);

module.exports = router;

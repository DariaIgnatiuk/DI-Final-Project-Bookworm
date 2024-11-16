const reviewModel = require("../models/reviewModel.js");

module.exports = {
  addReview: async (req, res) => {
    const {
      user_id,
      book_id,
      summary,
      thoughts,
      quotes,
      favorite_character,
      why_favorite_character,
      favorite_scene,
      why_favorite_scene,
      rating_hearts,
      rating_fire,
      rating_tears,
    } = req.body;
    try {
      const review = await reviewModel.addReview(
        user_id,
        book_id,
        summary,
        thoughts,
        quotes,
        favorite_character,
        why_favorite_character,
        favorite_scene,
        why_favorite_scene,
        rating_hearts,
        rating_fire,
        rating_tears
      );
      res.status(201).json({
        message: `Your review was saved successfully!`,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "internal server error" });
    }
  },
  getAllReviewsById: async (req, res) => {
    const user_id = req.params.user_id;
    try {
      const reviews = await reviewModel.getAllReviewsByUserId(user_id);
      res.status(201).json(reviews);
    } catch (error) {
      console.log(error);
    }
  },
  getReviewById: async (req, res) => {
    const id = req.params.id;
    try {
      const review = await reviewModel.geReviewsById(id);
      res.status(201).json(review);
    } catch (error) {
      console.log(error);
    }
  },
  removeReview: async (req, res) => {
    const id = Number(req.params.id);
    try {
      await reviewModel.removeReview(id);
      res.status(200).json(`Review was removed successfully!`);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "internal server error" });
    }
  },
  editReview: async (req, res) => {
    const {
      summary,
      thoughts,
      quotes,
      favorite_character,
      why_favorite_character,
      favorite_scene,
      why_favorite_scene,
      rating_hearts,
      rating_fire,
      rating_tears
    } = req.body;
    const id = req.params.id;
    try {
      const review = await reviewModel.editReview(
        id,
        summary,
        thoughts,
        quotes,
        favorite_character,
        why_favorite_character,
        favorite_scene,
        why_favorite_scene,
        rating_hearts,
        rating_fire,
        rating_tears
      );
      res
        .status(201)
        .json({ message: `Changes were saved successfully!`, review: review });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "internal server error" });
    }
  },
};

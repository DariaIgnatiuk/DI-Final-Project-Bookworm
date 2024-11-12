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
        recommend,
        rating_hearts, 
        rating_fire, 
        rating_tears    
     } = req.body;
    try {
      const review = await reviewModel.addReview(
        user_id, book_id, summary, thoughts, quotes, favorite_character, why_favorite_character, 
        favorite_scene, why_favorite_scene, recommend,rating_hearts, rating_fire, rating_tears);
      res.status(201).json({
        message: `Your review was saved successfully!`,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "internal server error" });
    }
  },


};
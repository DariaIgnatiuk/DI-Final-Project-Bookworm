const { db } = require("../config/db.js");

module.exports = {
    addReview: async ( user_id, book_id, summary, thoughts, quotes, favorite_character, why_favorite_character, 
      favorite_scene, why_favorite_scene, recommend,rating_hearts, rating_fire, rating_tears) => {
    const trx = await db.transaction();
    try {

      const [review] = await trx("reviews").insert(
        {
          user_id, book_id, summary, thoughts, quotes, favorite_character, why_favorite_character, 
          favorite_scene, why_favorite_scene, recommend,rating_hearts, rating_fire, rating_tears
        },
        ["id"]
      );
      await trx.commit();
      return review;
    } catch (error) {
      await trx.rollback();
      console.log(error);
      throw error;
    }
  },
};
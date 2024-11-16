const { db } = require("../config/db.js");

module.exports = {
  addReview: async (
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
  ) => {
    const trx = await db.transaction();
    try {
      const [review] = await trx("reviews").insert(
        {
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
  getAllReviewsByUserId: async (user_id) => {
    try {
      const review = await db("reviews")
        .select(
          "reviews.id",
          "books.title",
          "books.authors",
          "books.score",
          "books.image"
        )
        .join("books", "books.id", "reviews.book_id")
        .where({ "reviews.user_id": user_id });
      return review;
    } catch (error) {
      throw error;
    }
  },
  geReviewsById: async (id) => {
    try {
      const reviews = await db("reviews")
        .select(
          "reviews.id",
          "books.title",
          "books.authors",
          "books.score",
          "books.image",
          "reviews.summary",
          "reviews.thoughts",
          "reviews.quotes",
          "reviews.favorite_character",
          "reviews.why_favorite_character",
          "reviews.favorite_scene",
          "reviews.why_favorite_scene",
          "reviews.rating_hearts",
          "reviews.rating_fire",
          "reviews.rating_tears",
        "reviews.book_id"
        )
        .join("books", "books.id", "reviews.book_id")
        .where({ "reviews.id": id });
      return reviews;
    } catch (error) {
      throw error;
    }
  },
  removeReview: async (id) => {
    console.log(id)
    const trx = await db.transaction();
    try {
      await trx("reviews").where({ id: id }).del();
      await trx.commit();
      return { message: "Review was removed successfully" };
    } catch (error) {
      await trx.rollback();
      console.log(error);
      throw error;
    }
  },
  editReview: async (
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
  ) => {
    const trx = await db.transaction();
    try {
      const updatedReview = await trx("reviews").where({ id: id }).update(
        {
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
        },

        ["*"]
      );
      await trx.commit();
      return updatedReview;
    } catch (error) {
      await trx.rollback();
      console.log(error);
      throw error;
    }
  },
};

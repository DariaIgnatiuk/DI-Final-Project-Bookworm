const { db } = require("../config/db.js");
const bcrypt = require("bcrypt");

module.exports = {
  createUser: async (
    first_name,
    family_name,
    username,
    password,
    email,
    date_of_birth
  ) => {
    const trx = await db.transaction();
    try {
      /** hash password */
      const hashPassword = await bcrypt.hash(password + "", 10);

      const [user] = await trx("users").insert(
        {
          first_name,
          family_name,
          username,
          email: email.toLowerCase(),
          password: hashPassword,
          date_of_birth,
        },
        ["id", "first_name", "family_name", "username", "email"]
      );

      await trx.commit();

      return user;
    } catch (error) {
      await trx.rollback();
      console.log(error);
      throw error;
    }
  },
  getUserByUsername: async (username) => {
    try {
      const user = await db("users")
        .select(
          "id",
          "first_name",
          "family_name",
          "username",
          "email",
          "password"
        )
        .where({ username: username })
        .first();
      return user;
    } catch (error) {
      throw error;
    }
  },
};

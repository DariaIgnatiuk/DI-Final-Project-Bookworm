const userModel = require("../models/userModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  registerUser: async (req, res) => {
    const {
      first_name,
      family_name,
      username,
      password,
      email,
      date_of_birth,
    } = req.body;

    try {
      const user = await userModel.createUser(
        first_name,
        family_name,
        username,
        password,
        email,
        date_of_birth
      );
      res.status(201).json({
        message: `Congratulations, ${first_name} ${family_name}! You registered successfully!`,
        user,
      });
    } catch (error) {
      console.log(error);
      if (
        error.code === "23505" &&
        error.detail === `Key (email)=(${email}) already exists.`
      ) {
        return res
          .status(400)
          .json({ message: `Email "${email}" already exists` });
      }
      if (
        error.code === "23505" &&
        error.detail === `Key (username)=(${username}) already exists.`
      ) {
        return res
          .status(400)
          .json({ message: `Username "${username}" already exists` });
      }
      res.status(500).json({ message: "internal server error" });
    }
  },
  loginUser: async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await userModel.getUserByUsername(username);
      if (!user) {
        return res
          .status(404)
          .json({ message: `User '${username}' wasn't found. Try again!` });
      }
      const passwordMatch = await bcrypt.compare(password + "", user.password);
      if (!passwordMatch) {
        return res.status(404).json({ message: "Wrong password. Try again!" });
      }

      /** generate token */
      const accessToken = jwt.sign(
        { userid: user.id, email: user.email },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1d" }
      );

      /** set token in httpOnly cookie */
      res.cookie("token", accessToken, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      res.json({
        message: `${user.first_name} ${user.family_name}, welcome to Bookworm!`,
        user: {
          id: user.id,
          email: user.email,
          first_name: user.first_name,
          family_name: user.family_name,
          username: user.username,
        },
        token: accessToken,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "internal server error" });
    }
  },
  logoutUser: (req, res) => {
    res.clearCookie("token");
    req.cookies.token = null;
    delete req.cookies.token;
    delete req.headers["x-access-token"];
    res.sendStatus(200);
  },
  verifyAuth: (req, res) => {
    const { id, email } = req.userinfo;
    /** generate token */
    const accessToken = jwt.sign(
      { userid: id, email: email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    /** set token in httpOnly cookie */
    res.cookie("token", accessToken, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    res.json({
      message: "Verify Auth",
      user: { userid: id, email: email },
      token: accessToken,
    });
  },
};

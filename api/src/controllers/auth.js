import User from "../models/user.js";
import CustomError from "../helpers/customError.js";
import generateAuthToken from "../helpers/jwtHelper.js";

export const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // Check if the username or email already exists
    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });
    if (existingUser) {
      // Username or email already exists
      throw new CustomError("Username or email already exists", 400);
    }

    // If not, create a new user
    const newUser = new User({ username, email, password });
    const user = await newUser.save();

    const token = await generateAuthToken(newUser);
    // Set the token in the browser cookie
    return res.json({ message: "Successfully registered", user, token });
  } catch (error) {
    next(error);
  }
};

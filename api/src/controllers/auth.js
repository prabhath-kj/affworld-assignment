import User from "../models/user.js";
import CustomError from "../helpers/customError.js";
import generateAuthToken from "../helpers/jwtHelper.js";
import Token from "../models/token.js";
import sendMail from "../services/mailService.js";
import uuid4 from "uuid4";

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

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      throw new CustomError("Invalid credentials", 401);
    }

    const token = await generateAuthToken(user);

    // Set the token in the browser cookie
    return res.json({ message: "Successfully logged in", user, token });
  } catch (error) {
    next(error);
  }
};

export const googleLogin = async (req, res, next) => {
  try {
    // If the user is not authenticated, return an error
    const { username, email, password } = req.body;

    if (!req.body) {
      throw new CustomError("Invalid Google token", 401);
    }

    // Check if the user with the given Google ID already exists
    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      if (await existingUser.comparePassword(password)) {
        // User with the provided Google ID already exists, mark as logged in
        const token = await generateAuthToken(existingUser);
        return res.json({
          message: "Successfully logged in with Google",
          user: existingUser,
          token,
        });
      }
      throw new Error("Invalid Google token", 401);
    }

    // If the user doesn't exist, create a new user
    const newUser = new User({
      username: username || "GoogleUser",
      email,
      password,
    });

    const user = await newUser.save();
    const token = await generateAuthToken(user);

    res.json({
      message: "Successfully registered and logged in with Google",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const generateOtp = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
      throw new CustomError("You are new,please signup first", 400);
    }

    const generateOTP = uuid4();

    const newToken = new Token({
      userId: user?._id,
      token: generateOTP,
    });

    await newToken.save();

    sendMail(email, "Reset Paassword", generateOTP);

    res.status(200).json({ message: "Otp successfully sended" });
  } catch (error) {
    next(error);
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { otp, password, email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      throw new CustomError("No users found", 404);
    }

    const token = await Token.findOne({ userId: user._id });

    if (token && token.token === otp) {
      await User.findByIdAndUpdate(
        user._id,
        { password: password },
        { new: true }
      );

      await Token.findByIdAndDelete(token._id);

      return res.status(200).json({ message: "Password reset successful" });
    } else {
      throw new CustomError("Invalid OTP", 404);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

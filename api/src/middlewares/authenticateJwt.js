import jwt from "jsonwebtoken";
import User from "../models/user.js"

const authenticateJWT = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.SEC_KEY);
    const user = await User.findOne({ _id: decoded._id });

    if (!user) {
      throw new Error();
    }
    req.user = user;
    next();
  } catch (error) {
    next(error)
  }
};
export default authenticateJWT
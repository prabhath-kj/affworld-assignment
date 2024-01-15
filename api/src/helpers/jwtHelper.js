import jwt from "jsonwebtoken";

const generateAuthToken = async (user) => {
  const token = jwt.sign({ _id: user._id.toString() }, process.env.SEC_KEY);
  return token;
};

export default generateAuthToken

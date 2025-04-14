import jwt from "jsonwebtoken";

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "1h" }
  );
};
export default generateToken;

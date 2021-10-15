import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

export function createToken(user) {
  return jwt.sign({ id: user._id, email: user.email }, "secretpasswordnotrevealedtoanyone", {
    algorithm: "HS256",
    expiresIn: "1h",
  });
}

export function decodeToken(token) {
  var userInfo = {};
  try {
    var decoded = jwt.verify(token, "secretpasswordnotrevealedtoanyone");
    userInfo.userId = decoded.id;
    userInfo.email = decoded.email;
  } catch (e) {}

  return userInfo;
}

export async function validate(decoded, request) {
  const user = await User.findOne({ _id: decoded.id });
  if (!user) {
    return { isValid: false };
  } else {
    return { isValid: true };
  }
}

export function getUserIdFromRequest(request) {
  var userId = null;
  try {
    const authorization = request.headers.authorization;
    var token = authorization.split(" ")[1];
    var decodedToken = jwt.verify(token, "secretpasswordnotrevealedtoanyone");
    userId = decodedToken.id;
  } catch (e) {
    userId = null;
  }
  return userId;
}

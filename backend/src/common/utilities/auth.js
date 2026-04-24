import crypto from "crypto";
import jwt from "jsonwebtoken";

const ACCESS_TOKEN_EXPIRES_IN = "15m";
const REFRESH_TOKEN_EXPIRES_IN = "7d";
const PASSWORD_ITERATIONS = 120000;
const PASSWORD_KEY_LENGTH = 64;
const PASSWORD_DIGEST = "sha512";

export const generateAccessToken = (payload) =>
  jwt.sign(
    { ...payload, type: "access" },
    process.env.JWT_SECRET,
    { expiresIn: ACCESS_TOKEN_EXPIRES_IN }
  );

export const generateRefreshToken = (payload) =>
  jwt.sign(
    { ...payload, type: "refresh" },
    process.env.JWT_SECRET,
    { expiresIn: REFRESH_TOKEN_EXPIRES_IN }
  );

export const generateToken = (userId) => generateAccessToken({ id: userId });

export const hashPassword = (password, salt = crypto.randomBytes(16).toString("hex")) => {
  const derivedKey = crypto
    .pbkdf2Sync(password, salt, PASSWORD_ITERATIONS, PASSWORD_KEY_LENGTH, PASSWORD_DIGEST)
    .toString("hex");

  return `pbkdf2$${PASSWORD_ITERATIONS}$${salt}$${derivedKey}`;
};

export const verifyPassword = (password, storedHash) => {
  if (typeof storedHash !== "string" || !storedHash.startsWith("pbkdf2$")) {
    return false;
  }

  const [, iterationsText, salt, key] = storedHash.split("$");
  const iterations = Number(iterationsText);

  if (!Number.isFinite(iterations) || !salt || !key) {
    return false;
  }

  const derivedKey = crypto
    .pbkdf2Sync(password, salt, iterations, key.length / 2, PASSWORD_DIGEST)
    .toString("hex");

  return crypto.timingSafeEqual(Buffer.from(derivedKey, "hex"), Buffer.from(key, "hex"));
};

export const hashRefreshToken = (token) =>
  crypto.createHash("sha256").update(token).digest("hex");

export const decodeToken = (token) => jwt.decode(token);

export const verifyAccessOrRefreshToken = (token) =>
  jwt.verify(token, process.env.JWT_SECRET);

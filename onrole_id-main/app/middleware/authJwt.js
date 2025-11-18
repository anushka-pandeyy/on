const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const pool = require("../config/db.config.js");

// VERIFY TOKEN
const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }

    req.userId = decoded.id; // This is UUID
    next();
  });
};

// CHECK ADMIN ROLE
const isAdmin = async (req, res, next) => {
  try {
    const result = await pool.query(
      "SELECT role FROM info WHERE id = $1",
      [req.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).send({ message: "User not found!" });
    }

    if (result.rows[0].role === "admin") {
      return next();
    }

    return res.status(403).send({
      message: "Require Admin Role!"
    });
  } catch (err) {
    return res.status(500).send({ message: "Error checking admin role" });
  }
};

// CHECK MODERATOR ROLE (optional)
const isModerator = async (req, res, next) => {
  try {
    const result = await pool.query(
      "SELECT role FROM info WHERE id = $1",
      [req.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).send({ message: "User not found!" });
    }

    if (result.rows[0].role === "moderator") {
      return next();
    }

    return res.status(403).send({
      message: "Require Moderator Role!"
    });
  } catch (err) {
    return res.status(500).send({ message: "Error checking moderator role" });
  }
};

// MODERATOR OR ADMIN
const isModeratorOrAdmin = async (req, res, next) => {
  try {
    const result = await pool.query(
      "SELECT role FROM info WHERE id = $1",
      [req.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).send({ message: "User not found!" });
    }

    const userRole = result.rows[0].role;

    if (userRole === "moderator" || userRole === "admin") {
      return next();
    }

    return res.status(403).send({
      message: "Require Moderator or Admin Role!"
    });
  } catch (err) {
    return res.status(500).send({ message: "Error checking role" });
  }
};

module.exports = {
  verifyToken,
  isAdmin,
  isModerator,
  isModeratorOrAdmin
};

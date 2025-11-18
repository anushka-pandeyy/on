const pool = require("../config/db.js");
const config = require("../config/auth.config.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// --------------------- SIGNUP ---------------------
exports.signup = async (req, res) => {
  try {
    const { username, email, password, first_name, last_name, role } = req.body;

    // Hash password
    const hashedPassword = bcrypt.hashSync(password, 8);

    // INSERT into info table
    const result = await pool.query(
      `INSERT INTO info 
        (first_name, last_name, username, email, password_hash, role)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id`,
      [first_name, last_name, username, email, hashedPassword, role || "user"]
    );

    return res.status(201).send({
      message: "User registered successfully!",
      userId: result.rows[0].id
    });

  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: "Signup failed!" });
  }
};

// --------------------- SIGNIN ---------------------
exports.signin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Fetch user
    const result = await pool.query(
      "SELECT * FROM info WHERE username = $1",
      [username]
    );

    if (result.rows.length === 0) {
      return res.status(404).send({ message: "User Not found." });
    }

    const user = result.rows[0];

    // Check password
    const passwordIsValid = bcrypt.compareSync(password, user.password_hash);

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!"
      });
    }

    // Create token
    const token = jwt.sign(
      { id: user.id },
      config.secret,
      {
        algorithm: 'HS256',
        allowInsecureKeySizes: true,
        expiresIn: 86400 // 24 hours
      }
    );

    // Send response
    return res.status(200).send({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      accessToken: token
    });

  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: "Signin failed!" });
  }
};

const pool = require("../config/db.js");

// CHECK DUPLICATE USERNAME OR EMAIL
const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    const { username, email } = req.body;

    // Username check
    const usernameCheck = await pool.query(
      "SELECT * FROM info WHERE username = $1",
      [username]
    );

    if (usernameCheck.rows.length > 0) {
      return res.status(400).send({
        message: "Failed! Username is already in use!"
      });
    }

    // Email check
    const emailCheck = await pool.query(
      "SELECT * FROM info WHERE email = $1",
      [email]
    );

    if (emailCheck.rows.length > 0) {
      return res.status(400).send({
        message: "Failed! Email is already in use!"
      });
    }

    next();

  } catch (err) {
    console.log(err);
    return res.status(500).send({
      message: "Error checking user"
    });
  }
};

// CHECK IF ROLES EXIST (OPTIONAL)
const checkRolesExisted = (req, res, next) => {
  const ROLES = ["user", "admin"]; // or jo tumhare system me hoga

  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        return res.status(400).send({
          message: "Failed! Role does not exist = " + req.body.roles[i]
        });
      }
    }
  }

  next();
};

module.exports = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted
};

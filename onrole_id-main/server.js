const express = require("express");
const cors = require("cors");

const app = express();


var corsOptions = {
  origin: ["http://localhost:8081", "http://localhost:3000"]
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// database
const db = require("./app/models");
const Role = db.role;

// Ensure Sequelize models (roles) are synced
db.sequelize.sync({ alter: true }).then(() => {
  console.log('Sequelize models synced');
  initial();
});

// ensure raw-SQL tables exist (info)
const { init } = require('./dbInit');
init();

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

async function initial() {
  try {
    await Role.findOrCreate({
      where: { id: 1 },
      defaults: { name: "user" },
    });

    await Role.findOrCreate({
      where: { id: 2 },
      defaults: { name: "moderator" },
    });

    await Role.findOrCreate({
      where: { id: 3 },
      defaults: { name: "admin" },
    });

    console.log("✅ Roles initialized successfully!");
  } catch (err) {
    console.error("❌ Error initializing roles:", err);
  }
}

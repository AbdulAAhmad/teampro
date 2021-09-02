const cors = require("cors");
const express = require("express");
const { success, error } = require("consola");
const { connect } = require("mongoose");
const passport = require("passport");

const { DB, PORT } = require("./config");

const app = express();

app.use(cors());
app.use(express.json());
app.use(passport.initialize());

require("./middlewares/passport")(passport);

app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));

const startApp = async () => {
  try {
    await connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    success({
      message: `Successfully connected to the database`,
      badge: true,
    });

    app.listen(PORT, () =>
      success({ message: `Server started on PORT ${PORT}`, badge: true })
    );
  } catch (err) {
    error({
      message: `Unable to connect with Database \n ${err}`,
      badge: true,
    });
    startApp();
  }
};

startApp();

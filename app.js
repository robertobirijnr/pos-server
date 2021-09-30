const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");
const app = express();
require("dotenv").config();

// middlerwares
app.use(morgan("dev"));
app.use(express.urlencoded({extended: true})); 
app.use(express.json());
app.use(cookieParser());
app.use(expressValidator());

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((con) => {
    //   console.log(con.connection)
    console.log("connection successful");
  });

const userRoute = require("./routes/admin");
const categoryRoute = require("./routes/categories");

app.use("/api", userRoute);
app.use("/api", categoryRoute);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`App runing on port ${port}`);
});

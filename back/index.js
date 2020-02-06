const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");

const db = require("./models");
const userAPIRouter = require("./routes/user");

const prod = process.env.NODE_ENV === "production";

dotenv.config();
const app = express();
db.sequelize.sync();

if (prod) {
} else {
  app.use(morgan("dev"));
  app.use(cors());
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("heumbird 백엔드 정상 동작!");
});

app.use("/api/user", userAPIRouter);

app.listen(prod ? process.env.PORT : 3060, () => {
  console.log(`server is running on ${prod ? process.env.PORT : 3060}`);
});

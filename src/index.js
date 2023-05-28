const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const port = 8080 || process.env.PORT;
const mongoose = require("mongoose");
const url =
  "mongodb+srv://aliusman:aliusman@cluster0.x84kl.mongodb.net/nannyApp?retryWrites=true&w=majority";

mongoose.set("strictQuery", true);

mongoose.connect(url).then(console.log("db connected"));
app.use(express.json());
app.use(
  cors({
    origin: "*",
    allowedHeaders: "Content-Type",
  })
);
app.get("/", (req, res) => {
  res.send("its Working !");
});

app.use("/static", express.static(path.join(__dirname , "../public")));
app.use("/api/nanny", require("./routes/NannyAuthRoutes"));
app.use("/api/employee", require("./routes/EmployeeAuthRoutes"));

app.listen(port, () => {
  console.log("Index.js Working!!");
});

const route = require("express").Router();
const EmpSchema = require("../models/EmployeeAuth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const upload = require("../configs/storageSetting");

route.post("/", upload.array("documents"), async (req, res) => {
  try {
    const files = req.files.map((file)=>{
        return file.path.replace("public","static")
    })
    const requestData = { ...req.body };
    requestData.documents  = files;
    const findNanny = await EmpSchema.findOne({ email: requestData.email });
    if (!findNanny) {
      const newPassword = await bcrypt.hash(requestData.password, 10);
      if (newPassword) {
        requestData.password = newPassword;
        const data = await EmpSchema.create(requestData);
        if (data) {
          const token = jwt.sign(
            { name: data.first_name, id: data._id },
            "NannayAppUserAuthJsonWebToken",
            { expiresIn: 86400000 }
          );
          res.status(200).send({ msg: "Registered Successfully", token, data });
        } else {
          res.status(400).send({ msg: "Ops! Somthing Went Wrong." });
        }
      }
    } else {
      res.status(400).send({ msg: "User already exist!" });
    }
  } catch (err) {
    console.log("err", err);
    res.status(500).send(err);
  }
});

route.post("/login", async (req, res) => {
  try {
    const findNanny = await EmpSchema.findOne({ email: req.body.email });
    if (findNanny) {
      const comparePassowrd = await bcrypt.compare(
        req.body.password,
        findNanny.password
      );
      if (comparePassowrd) {
        const token = jwt.sign(
          { name: findNanny.first_name, id: findNanny._id },
          "NannayAppUserAuthJsonWebToken",
          { expiresIn: 86400000 }
        );
        res.status(200).send({ msg: "Login Successfully", token });
      } else {
        res.status(400).send({msg:"Invalid Credentials"});
      }
    } else {
      res.status(400).send({msg:"Invalid Credentials"});
    }
  } catch (err) {
    console.log("err", err);
    res.status(500).send(err);
  }
});

module.exports = route;

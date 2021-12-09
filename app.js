const express = require("express");
const ejs = require("ejs");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

const account1 = {
  username: "zqr",
  password: "123456",
};

const account2 = {
  username: "glq",
  password: "654321",
};

const account3 = {
  username: "xx",
  password: "qwerty",
};

const account4 = {
  username: "stt",
  password: "qazxsw",
};

const accounts = [account1, account2, account3, account4];

app.get("/", function (req, res) {
  res.render("login", {
    signAlert: "",
  });
});

app.post("/", function (req, res) {
  const loginUser = req.body.username;
  const loginPin = req.body.password;

  currentUser = accounts.find((acc) => acc.username === loginUser);
  console.log(currentUser);
  if (currentUser && currentUser.password === loginPin) {
    res.render("index");
  } else {
    res.render("login", {
      signAlert: "提示:用户名或密码错误",
    });
  }
});

app.get("/index", function (req, res) {
  res.render("index");
});

app.get("/demo", function (req, res) {
  res.render("demo");
});

app.listen(3000, function () {
  console.log("Server has started successfully!");
});

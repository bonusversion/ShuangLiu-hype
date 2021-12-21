const express = require("express");
const ejs = require("ejs");
const { use } = require("express/lib/application");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

let sec = 0;

const Account = function (user, username, password) {
  this.user = user;
  this.username = username;
  this.password = password;
};

const zqRu = new Account("曾倩茹", "zqr", "123456");
const glQin = new Account("耿丽琴", "glq", "654321");
const xXue = new Account("肖雪", "xx", "qwerty");
const stTing = new Account("邵婷婷", "stt", "qazxsw");
const pyChuan = new Account("蒲豫川", "puyuchuan", "qazxsw");

const accounts = [zqRu, glQin, xXue, stTing, pyChuan];

app.get("/", function (req, res) {
  let time = 0;

  res.render("login", {
    signAlert: "",
  });

  app.post("/", function (req, res) {
    const loginUser = req.body.username;
    const loginPin = req.body.password;

    currentUser = accounts.find((acc) => acc.username === loginUser);
    currentUserName = currentUser.user.slice(1);
    console.log(currentUser);
    if (currentUser && currentUser.password === loginPin) {
      res.render("index", {
        user: currentUserName,
        time: 0,
      });
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

  app.get("/affair", function (req, res) {
    res.render("affair", {
      user: currentUserName,
      time: time,
    });
  });

  app.get("/page", function (req, res) {
    res.render("page", {
      user: currentUserName,
      time: time,
    });
  });

  app.get("/doc1", function (req, res) {
    res.render("doc1");
  });

  app.get("/doc2", function (req, res) {
    res.render("doc2");
  });

  app.get("/workbench", function (req, res) {
    res.render("workbench", {
      user: currentUserName,
      time: time,
    });
  });
});

app.listen(3000, function () {
  console.log("Server has started successfully!");
});

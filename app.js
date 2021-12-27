const express = require("express");
const ejs = require("ejs");
const { use } = require("express/lib/application");
const { set } = require("express/lib/response");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

// require
const mongoose = require("mongoose");
// connect
mongoose.connect("mongodb://localhost:27017/hypeDB", { useNewUrlParser: true });
// Schema
const accountSchema = new mongoose.Schema({
  user: String,
  username: String,
  password: String,
  logCounts: Number,
  totalTime: Number,
});

const Account = mongoose.model("Account", accountSchema);

// class Account {
//   _logCounts = 0;
//   totalTime = 0;
//   constructor(user, username, password) {
//     this.user = user;
//     this.username = username;
//     this.password = password;
//   }
//   calcTotalTime() {
//     this.totalTime++;
//   }
//   get calcLogTime() {
//     return this._logCounts++;
//   }
// }

const zqRu = new Account({
  user: "曾倩茹",
  username: "zqr",
  password: "123456",
  logCounts: 0,
  totalTime: 0,
});

const glQin = new Account({
  user: "耿丽琴",
  username: "glq",
  password: "654321",
  logCounts: 0,
  totalTime: 0,
});

const xXue = new Account({
  user: "肖雪",
  username: "xx",
  password: "xiaoxue",
  logCounts: 0,
  totalTime: 0,
});

const stTing = new Account({
  user: "邵婷婷",
  username: "stt",
  password: "shaotingting",
  logCounts: 0,
  totalTime: 0,
});

const pyChuan = new Account({
  user: "蒲豫川",
  username: "pyc",
  password: "puyuchuan",
  logCounts: 0,
  totalTime: 0,
});

// Account.insertMany([stTing, pyChuan, xXue], function (err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Successfully saved all the accounts to hypeDB");
//   }
// });

let curAcc;
let timer;

const renderTime = function (sec) {
  const day = parseInt(sec / 60 / 60 / 24);
  const hour = parseInt((sec % (60 * 60 * 24)) / 60 / 60);
  const min = parseInt((sec % (60 * 60)) / 60);
  const second = sec % 60;
  const expected = `${day}天${hour}小时${min}分${second}秒`;
  return expected;
};

app.get("/", function (req, res) {
  res.render("login", {
    signAlert: "",
  });

  app.post("/", function (req, res) {
    const loginUser = req.body.username;
    const loginPin = req.body.password;
    let sec = 0;

    Account.findOne(
      { username: loginUser, password: loginPin },
      function (err, acc) {
        if (err) {
          console.log(err);
        }
        if (!acc) {
          res.render("login", {
            signAlert: "提示:用户名或密码错误",
          });
        }
        if (acc) {
          let accTotalTime = acc.totalTime;
          if (timer) clearInterval(timer);
          timer = setInterval(function () {
            sec++;

            Account.updateOne(
              { username: loginUser, password: loginPin },
              { totalTime: accTotalTime + sec },
              function (err) {
                if (err) {
                  console.log(err);
                }
              }
            );
          }, 1000);

          if (acc) {
            curAcc = acc;
            let curCount = acc.logCounts;
            Account.updateOne(
              { username: loginUser, password: loginPin },
              { logCounts: curCount + 1 },
              function (err) {
                if (err) {
                  console.log(err);
                }
              }
            );
            res.render("index", {
              user: acc.user.slice(1),
              logTotalTime: renderTime(acc.totalTime),
              logCounts: acc.logCounts + 1,
            });
          }
        }
      }
    );
  });

  app.get("/index", function (req, res) {
    res.render("index", {
      user: curAcc.user.slice(1),
      logTotalTime: renderTime(curAcc.totalTime),
      logCounts: curAcc.logCounts + 1,
    });
  });

  app.get("/demo", function (req, res) {
    res.render("demo");
  });

  app.get("/affair", function (req, res) {
    res.render("affair", {
      user: curAcc.user.slice(1),
      logTotalTime: renderTime(curAcc.totalTime),
      logCounts: curAcc.logCounts + 1,
    });
  });

  app.get("/page", function (req, res) {
    res.render("page", {
      user: curAcc.user.slice(1),
      logTotalTime: renderTime(curAcc.totalTime),
      logCounts: curAcc.logCounts + 1,
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

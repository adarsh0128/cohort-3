const express = require("express");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "mainhijantahu";

const app = express();

app.use(express.json());

function generateToken() {
  let options = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
  ];

  let token = "";
  for (let i = 0; i < 32; i++) {
    // use a simple function here
    token += options[Math.floor(Math.random() * options.length)];
  }
  return token;
}

const users = [];

app.post("/signup", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // console.log(user);

  users.push({
    username: username,
    password: password,
  });

  // console.log(user);

  res.send({
    message: "You have signed up",
  });
});

app.post("/signin", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const user = users.find(
    (user) => user.username === username && user.password === password
  );

  if (user) {
    const token = jwt.sign({ username: user.username }, JWT_SECRET);

    user.token = token;
    res.send({ token });
    console.log(user);
  } else {
    res.status(403).send({ message: "Invalid username or password" });
  }
});

app.get("/me", (req, res) => {
  const token = req.headers.token;
  const userDetails = jwt.verify(token, JWT_SECRET);
  const username = userDetails.username;
  const user = users.find((user) => user.username === username);

  if (user) {
    res.send({ username: user.username });
  } else {
    res.status(401).send({
      message: "unauthorized",
    });
  }
});

app.listen(3000);

const express = require("express"),
  app = express(),
  passport = require("passport"),
  port = process.env.PORT || 80,
  cors = require("cors"),
  cookie = require("cookie");

const bcrypt = require("bcrypt");
const e = require("express");

const db = require("./database.js");
let users = db.users;
let cart = db.cart;

require("./passport.js");

const router = require("express").Router(),
  jwt = require("jsonwebtoken");

app.use("/api", router);
router.use(cors({ origin: "http://localhost:3000", credentials: true }));
// router.use(cors())
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.post("/login", (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    console.log("Login: ", req.body, user, err, info);
    if (err) return next(err);
    if (user) {
      const token = jwt.sign(user, db.SECRET, {
        expiresIn: "7d",
      });
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          maxAge: 60 * 60,
          sameSite: "strict",
          path: "/",
        })
      );
      res.statusCode = 200;
      return res.json({ user, token });
    } else return res.status(422).json(info);
  })(req, res, next);
});

router.get("/logout", (req, res) => {
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: -1,
      sameSite: "strict",
      path: "/",
    })
  );
  res.statusCode = 200;
  return res.json({ message: "Logout successful" });
});

/* GET user profile. */
router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    res.send(req.user);
  }
);

router.post("/register", async (req, res) => {
  try {
    const SALT_ROUND = 10;
    const { username, email, password, name, telephone } = req.body;
    if (!username || !email || !password || !name || !telephone)
      return res.json({ message: "Cannot register with empty string" });
    if (db.checkExistingUser(username) !== db.NOT_FOUND)
      return res.json({ message: "Duplicated user" });

    let id = users.users.length
      ? users.users[users.users.length - 1].id + 1
      : 1;
    hash = await bcrypt.hash(password, SALT_ROUND);
    users.users.push({ id, username, password: hash, email, name, telephone });
    res.status(200).json({ message: "Register success" });
  } catch {
    res.status(422).json({ message: "Cannot register" });
  }
});

router.get("/cart", (req, res) => {
  try {
    console.log(req.headers.search);
    let carts = cart.cart.filter((item) => item.userid == req.headers.search);
    console.log(carts);
    res.status(200).json({ message: "Get cart success", data: carts });
  } catch {
    res.status(422).json({ message: "Cannot get cart" });
  }
});

router.get("/deleteProduct", async (req, res) => {
  try {
    console.log("userid", req.headers.userid);
    console.log("productName", req.headers.productname);
    let inx = cart.cart.findIndex((item) => item.userid === req.headers.userid);
    console.log("inx", inx);
    if (inx !== -1) {
      let idx = await cart.cart[inx].products.findIndex(
        (item) => item.productName == req.headers.productname
      );
      console.log("idx", idx);
      // delete cart.cart[inx].products[idx];
      cart.cart[inx].products.splice(idx, 1);
    }
    console.log("inx", inx);
    res.status(200).json({ message: "Delete success" });
  } catch {
    res.status(422).json({ message: "Cannot delete" });
  }
});

router.post("/addtocart", async (req, res) => {
  try {
    const { userid, productName, quantity, price } = req.body;
    if (db.checkExistingUidCart(userid) === db.NOT_FOUND) {
      let id = cart.cart.length ? cart.cart[cart.cart.length - 1].id + 1 : 1;
      console.log("1");
      let products = [
        {
          productName: productName,
          quantity: quantity,
          price: price,
        },
      ];
      cart.cart.push({ id, userid, products });
    } else {
      console.log("2");
      let productObject = {
        productName: productName,
        quantity: quantity,
        price: price,
      };
      cart.cart.map(async (item) => {
        if (item.userid === userid) {
          let isExisting = await item.products.filter(
            (pd) => pd.productName == productName
          );
          console.log("isExisting", isExisting[0]);
          if (isExisting[0] === undefined) {
            console.log("3");
            item.products.push(productObject);
          } else {
            console.log("4");
            item.products.map((pd) => {
              if (pd.productName === productName) {
                pd.quantity = pd.quantity + quantity;
              }
            });
          }
        }
      });
    }
    res.status(200).json({ message: "Add to cart success" });
  } catch {
    res.status(422).json({ message: "Cannot add to cart" });
  }
});

router.get("/alluser", (req, res) => res.json(db.users.users));

router.get("/", (req, res, next) => {
  res.send("Respond without authentication");
});

// Error Handler
app.use((err, req, res, next) => {
  let statusCode = err.status || 500;
  res.status(statusCode);
  res.json({
    error: {
      status: statusCode,
      message: err.message,
    },
  });
});

// Start Server
app.listen(port, () => console.log(`Server is running on port ${port}`));

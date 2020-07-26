
  const jwt = require("jsonwebtoken");

  //Middleware(next) nos permite dar paso al siguiente proceso.
  let autenticate = (req, res, next) => {
      let token = req.headers.authorization || null;

      jwt.verify(token, process.env.KEY_JWT, (err, decode) => {
          console.log(token)
          if (err) {
              return res.status(400).json({
                person: err,
                  msg: "Invalid token",
              });
          } else {
              req.decode = decode;

              let token = jwt.sign({ person: decode.person }, process.env.KEY_JWT, {
                  algorithm: "HS256",
                  expiresIn: 300,
              });

              req.token = token;

              next();
          }
      });
  };

  module.exports = {
    autenticate
  }
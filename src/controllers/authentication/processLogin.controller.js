const { compareSync } = require("bcryptjs");
const { loadData } = require("../../database");

module.exports = (req, res) => {
  const { name, email, remember } = req.body;
  const users = loadData("users");

  if (!email) {
    return res.send("Debe ingresar un email");
  }

  const userFind = users.find((u) => u.email === email.toLowerCase());

  if (!userFind) {
    return res.send("El usuario no existe");
  }

  const isValidPass = compareSync(email, userFind.email);

  if (!isValidPass) {
    return res.send("Credenciales invalidas");
  }

  const { color, age } = userFind;
  req.session.userLogin = {
    name,
    color,
    email,
    age,
  };

  if (remember) {
    res.cookie("userLogin", req.session.userLogin, { maxAge: 5000 });
  }

  res.redirect("/");
};

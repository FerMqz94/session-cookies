const { loadData, saveData } = require("../../database");
const { validationResult } = require("express-validator");

module.exports = (req, res) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    const { name,  email } = req.body;
    const users = loadData("users");

    const newUser = {
      id: !users.length ? 1 : users[users.length - 1].id + 1,
      name: name?.trim(),
      color: color?.trim(),
      email: email?.trim(),
      age: age?.trim(),
    };

    users.push(newUser);

    saveData(users, "users");

    res.redirect("/autenticacion/registro");
    return;
  }

  res.render("/autenticacion/registro", {
    old: req.body,
    errors: errors.mapped(),
  });
};
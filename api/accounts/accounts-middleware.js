const account = require("./accounts-model");

const checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  // Note: you can either write "manual" validation logic
  // or use the Yup library (not currently installed)
  const body = req.body;
  if (!body.name || !body.budget) {
    res.status(400).json({ message: "name and budget are required" });
  } else if ((body.name.length <= 3) & (body.name.length >= 100)) {
    res
      .status(400)
      .json({ message: "name of account must be between 3 and 100" });
  } else if (isNaN(body.budget)) {
    res.status(400).json({ message: "budget of account must be a number" });
  } else if (Math.sign(body.budget) === -1 || body.budget >= 1000000) {
    res
      .status(400)
      .json({ message: "budget of account is too large or too small" });
  } else {
    next();
  }
};

const checkAccountNameUnique = (req, res, next) => {
  // DO YOUR MAGIC
};

const checkAccountId = (req, res, next) => {
  // DO YOUR MAGIC
  const { id } = req.params;
  account.getById(id).then((account) => {
    if (!account) {
      res.status(404).json({ message: "account not found" });
      // console.log({ message: "not working" });
    } else {
      next();
    }
  });
};
module.exports = {
  checkAccountPayload,
  checkAccountNameUnique,
  checkAccountId,
};

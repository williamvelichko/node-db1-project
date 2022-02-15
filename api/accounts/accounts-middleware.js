const account = require("./accounts-model");
const db = require("../../data/db-config");

const checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  // Note: you can either write "manual" validation logic
  // or use the Yup library (not currently installed)
  const body = req.body;
  if (!body.name || !body.budget) {
    res.status(400).json({ message: "name and budget are required" });
  } else if (body.name.trim().length < 3 || body.name.trim().length > 100) {
    res
      .status(400)
      .json({ message: "name of account must be between 3 and 100" });
  } else if (typeof body.budget !== "number" || isNaN(body.budget)) {
    res.status(400).json({ message: "budget of account must be a number" });
  } else if (body.budget < 0 || body.budget > 1000000) {
    res
      .status(400)
      .json({ message: "budget of account is too large or too small" });
  } else {
    req.account = body;
    next();
  }
};

const checkAccountNameUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const existing = await db("accounts")
      .where("name", req.body.name.trim())
      .first();
    if (existing) {
      next({ status: 400, message: "that name is taken" });
    } else {
      next();
    }
  } catch (e) {
    next(e);
  }
};

const checkAccountId = (req, res, next) => {
  // DO YOUR MAGIC
  const { id } = req.params;
  account.getById(id).then((account) => {
    if (!account) {
      res.status(404).json({ message: "account not found" });
      // console.log({ message: "not working" });
    } else {
      req.account = account;
      next();
    }
  });
};
module.exports = {
  checkAccountPayload,
  checkAccountNameUnique,
  checkAccountId,
};

const router = require("express").Router();
const model = require("./accounts-model");
const {
  checkAccountId,
  checkAccountPayload,
  checkAccountNameUnique,
} = require("./accounts-middleware");

router.get("/", (req, res, next) => {
  // DO YOUR MAGIC
  model
    .getAll()
    .then((accounts) => {
      res.status(200).json(accounts);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.get("/:id", checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
  //const { id } = req.params;
  model
    .getById(req.params.id)
    .then((account) => {
      res.status(200).json(account);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.post("/", checkAccountPayload, (req, res, next) => {
  // DO YOUR MAGIC
  const { name, budget } = req.body;
  model
    .create({ name, budget })
    .then((newAccount) => {
      res.status(201).json(newAccount);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.put("/:id", checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
  const { id } = req.params;
  const { budget, name } = req.body;
  model
    .updateById(id, { budget, name })
    .then((updated) => {
      res.status(200).json(updated);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.delete("/:id", (req, res, next) => {
  // DO YOUR MAGIC
});

router.use((err, req, res, next) => {
  // eslint-disable-line
  // DO YOUR MAGIC
});

module.exports = router;

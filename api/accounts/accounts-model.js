const db = require("../../data/db-config");

const getAll = () => {
  // DO YOUR MAGIC
  return db("accounts");
  // console.log("working");
};

const getById = (id) => {
  // DO YOUR MAGIC

  return db("accounts").where({ id: id }).first();
};

const create = async (account) => {
  // DO YOUR MAGIC
  let result = await db("accounts").insert({
    budget: account.budget,
    name: account.name,
  });

  return result;
};

const updateById = (id, account) => {
  // DO YOUR MAGIC
};

const deleteById = (id) => {
  // DO YOUR MAGIC
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};

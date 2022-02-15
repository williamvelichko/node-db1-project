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

const create = async ({ budget, name }) => {
  // DO YOUR MAGIC
  let [id] = await db("accounts").insert({
    budget: budget,
    name: name,
  });

  return { name, budget, id: id };
};

const updateById = async (id, { budget, name }) => {
  // DO YOUR MAGIC
  let result = await db("accounts").where({ id }).update({
    budget: budget,
    name: name,
  });
  return { name, budget, id: id };
};

const deleteById = async (id) => {
  // DO YOUR MAGIC
  let result = await getById(id);
  await db("accounts").where({ id: id }).del();
  return result;
};

const getAccountByName = ({ name }) => {
  //console.log(name);
  return db("accounts").where({ name: name }).first();
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
  getAccountByName,
};

const pagarProducto = async (req, res) => {
  console.log(req.body);
  res.status(200).send("Ok");
};
module.exports = { pagarProducto };

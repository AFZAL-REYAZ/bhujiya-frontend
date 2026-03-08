const Product = require("../../models/Product");

async function listProducts(req, res) {
  try {
    const products = await Product.find()
      .sort({ createdAt: -1 })
      .lean();

    return res.json(products);
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

module.exports = listProducts;

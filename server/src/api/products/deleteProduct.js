const fs = require("fs");
const path = require("path");
const Product = require("../../models/Product");

async function deleteProduct(req, res) {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found." });
    }

    if (product.image && product.image.startsWith("/uploads/")) {
      const fullPath = path.join(process.cwd(), product.image.replace(/^\//, ""));
      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
      }
    }

    return res.json({ success: true, message: "Product deleted." });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

module.exports = deleteProduct;

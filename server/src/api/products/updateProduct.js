const fs = require("fs");
const path = require("path");
const Product = require("../../models/Product");

async function updateProduct(req, res) {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found." });
    }

    const payload = req.body || {};

    if (payload.name !== undefined) product.name = String(payload.name).trim();
    if (payload.price !== undefined) {
      const parsedPrice = Number(payload.price);
      if (Number.isNaN(parsedPrice)) {
        return res.status(400).json({ success: false, message: "Invalid price value." });
      }
      product.price = parsedPrice;
    }

    if (payload.qty !== undefined) {
      const parsedQty = Number(payload.qty);
      if (Number.isNaN(parsedQty)) {
        return res.status(400).json({ success: false, message: "Invalid quantity value." });
      }
      product.qty = parsedQty;
    }

    if (payload.description !== undefined) {
      product.description = String(payload.description).trim();
    }

    if (payload.category !== undefined) {
      product.category = String(payload.category || "Spicy Namkeen").trim();
    }

    if (payload.showOnPage !== undefined) {
      product.showOnPage = payload.showOnPage === "b2b" ? "b2b" : "home";
    }

    if (payload.weight !== undefined) {
      product.weight = String(payload.weight || "100 g").trim();
    }

    if (payload.brand !== undefined) {
      product.brand = String(payload.brand || "jaldichips").trim();
    }

    if (payload.shelfLife !== undefined) {
      product.shelfLife = String(payload.shelfLife || "4 Months").toLowerCase().includes("5")
        ? "5 Months"
        : "4 Months";
    }

    if (payload.ingredients !== undefined) {
      product.ingredients = String(payload.ingredients || "G9 Banana + Rice Oil + flavour - salty").trim();
    }

    if (req.file) {
      if (product.image && product.image.startsWith("/uploads/")) {
        const existingPath = path.join(process.cwd(), product.image.replace(/^\//, ""));
        if (fs.existsSync(existingPath)) {
          fs.unlinkSync(existingPath);
        }
      }
      product.image = `/uploads/products/${req.file.filename}`;
    }

    await product.save();
    return res.json({ success: true, product });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

module.exports = updateProduct;

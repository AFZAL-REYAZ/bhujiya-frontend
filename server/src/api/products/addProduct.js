const fs = require("fs");
const path = require("path");
const multer = require("multer");
const Product = require("../../models/Product");

const uploadDir = path.join(process.cwd(), "uploads", "products");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname || "").toLowerCase();
    const safeExt = ext || ".jpg";
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${safeExt}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});

const uploadSingleImage = upload.single("image");

async function addProduct(req, res) {
  try {
    const { name, price, qty, description, category } = req.body || {};

    if (!name || !price || !qty || !description) {
      return res.status(400).json({ success: false, message: "All required fields are missing." });
    }

    const parsedPrice = Number(price);
    const parsedQty = Number(qty);

    if (Number.isNaN(parsedPrice) || Number.isNaN(parsedQty)) {
      return res.status(400).json({ success: false, message: "Price and quantity must be valid numbers." });
    }

    const imagePath = req.file ? `/uploads/products/${req.file.filename}` : "";

    const product = await Product.create({
      name: String(name).trim(),
      price: parsedPrice,
      qty: parsedQty,
      description: String(description).trim(),
      category: String(category || "Spicy Namkeen").trim(),
      image: imagePath,
    });

    return res.status(201).json({ success: true, product });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

module.exports = { addProduct, uploadSingleImage };

const express = require("express");

const { auth, allowRoles } = require("../../middlewares/auth");
const listProducts = require("../../api/products/listProducts");
const { addProduct, uploadSingleImage } = require("../../api/products/addProduct");
const deleteProduct = require("../../api/products/deleteProduct");
const updateProduct = require("../../api/products/updateProduct");

const router = express.Router();

const isDev = process.env.NODE_ENV !== "production";
const adminOpenAccess = process.env.ADMIN_OPEN_ACCESS === "true" || isDev;

router.get("/", listProducts);

if (adminOpenAccess) {
  router.post("/add", uploadSingleImage, addProduct);
  router.put("/:id", uploadSingleImage, updateProduct);
  router.delete("/:id", deleteProduct);
} else {
  router.post("/add", auth, allowRoles("admin"), uploadSingleImage, addProduct);
  router.put("/:id", auth, allowRoles("admin"), uploadSingleImage, updateProduct);
  router.delete("/:id", auth, allowRoles("admin"), deleteProduct);
}

module.exports = router;

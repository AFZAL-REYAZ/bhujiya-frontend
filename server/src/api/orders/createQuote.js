const Consumer = require("../../models/Consumer");
const Order = require("../../models/Order");
const User = require("../../models/User");

const ALLOWED_SOURCES = new Set([
  "featured",
  "b2b",
  "product",
  "bestseller",
  "home",
  "other",
]);

async function createQuote(req, res) {
  try {
    const payload = req.body || {};
    const customer = payload.customer || {};
    const company = payload.company || {};

    const name = String(customer.name || payload.name || "").trim();
    const phone = String(customer.phone || payload.phone || "").trim();
    const emailRaw = String(customer.email || payload.email || "").trim();
    const email = emailRaw ? emailRaw.toLowerCase() : "";

    if (!name || !phone) {
      return res.status(400).json({
        success: false,
        message: "Customer name and phone are required.",
      });
    }

    const sourceInput = String(payload.source || "other").trim().toLowerCase();
    const source = ALLOWED_SOURCES.has(sourceInput) ? sourceInput : "other";

    const sourceLabel = String(payload.sourceLabel || "").trim();
    const requestedQty = String(payload.quantity || payload.requestedQty || "").trim();
    const message = String(payload.message || "").trim();

    const product = payload.product
      ? {
          id: payload.product.id || payload.product.productId,
          title: payload.product.title || payload.product.name,
          price: payload.product.price,
          quantity: payload.product.quantity || payload.product.qty,
          unit: payload.product.unit,
          image: payload.product.image,
        }
      : undefined;

    let linkedUser = null;
    if (email) {
      linkedUser = await User.findOne({ email }).select("_id");
    }

    let consumer = await Consumer.findOne({
      $or: [
        { phone },
        ...(email ? [{ email }] : []),
      ],
    });

    if (!consumer) {
      consumer = await Consumer.create({
        name,
        phone,
        email: email || undefined,
        companyName: company.name || payload.companyName || undefined,
        gstNumber: company.gstNumber || payload.gstNumber || undefined,
        user: linkedUser ? linkedUser._id : undefined,
      });
    } else {
      const updates = {};
      if (!consumer.name && name) updates.name = name;
      if (!consumer.email && email) updates.email = email;
      if (!consumer.companyName && (company.name || payload.companyName)) {
        updates.companyName = company.name || payload.companyName;
      }
      if (!consumer.gstNumber && (company.gstNumber || payload.gstNumber)) {
        updates.gstNumber = company.gstNumber || payload.gstNumber;
      }
      if (!consumer.user && linkedUser) updates.user = linkedUser._id;

      if (Object.keys(updates).length > 0) {
        await Consumer.findByIdAndUpdate(consumer._id, updates);
      }
    }

    const order = await Order.create({
      consumer: consumer._id,
      source,
      sourceLabel,
      kind: "quote",
      product,
      requestedQty,
      message,
      meta: {
        page: payload.page || "",
        section: payload.section || "",
        userAgent: req.headers["user-agent"] || "",
      },
    });

    return res.status(201).json({ success: true, order });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

module.exports = createQuote;

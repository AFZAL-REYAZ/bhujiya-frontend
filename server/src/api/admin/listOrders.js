const Order = require("../../models/Order");

let cachedOrders = null;
let cacheExpiresAt = 0;

async function listOrders(req, res) {
  try {
    const limit = Math.min(parseInt(req.query.limit || "200", 10), 500);
    const filter = {};

    if (req.query.source) {
      filter.source = req.query.source;
    }

    const canUseCache = !req.query.source && limit <= 200;
    if (canUseCache && cachedOrders && Date.now() < cacheExpiresAt) {
      return res.json({ success: true, orders: cachedOrders, cached: true });
    }

    const orders = await Order.find(filter)
      .select("consumer source sourceLabel product requestedQty message createdAt")
      .sort({ createdAt: -1 })
      .limit(limit)
      .populate("consumer", "name phone email companyName gstNumber")
      .lean();

    if (canUseCache) {
      cachedOrders = orders;
      cacheExpiresAt = Date.now() + 10000;
    }

    return res.json({ success: true, orders });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

module.exports = listOrders;

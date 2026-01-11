const Order = require("../models/Order");
const Product = require("../models/Product");

/**
 * @desc    Create new order
 * @route   POST /api/orders
 * @access  Authenticated (Customer)
 */
exports.createOrder = async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (!orderItems || orderItems.length === 0) {
    return res.status(400).json({ message: "No order items" });
  }

  // Check stock & decrement
  for (const item of orderItems) {
    const product = await Product.findById(item.product);

    if (!product || !product.isActive) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.stock < item.quantity) {
      return res.status(400).json({
        message: `Not enough stock for ${product.name}`,
      });
    }

    product.stock -= item.quantity;
    await product.save();
  }

  const order = await Order.create({
    user: req.user._id,
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  });

  res.status(201).json(order);
};

/**
 * @desc    Get logged-in user's orders
 * @route   GET /api/orders/my-orders
 * @access  Authenticated
 */
exports.getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({
    createdAt: -1,
  });

  res.json(orders);
};

/**
 * @desc    Get order by ID
 * @route   GET /api/orders/:id
 * @access  Authenticated (Owner or Admin)
 */
exports.getOrderById = async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate("user", "name email")
    .populate("orderItems.product", "name");

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  if (
    order.user._id.toString() !== req.user._id.toString() &&
    req.user.role !== "admin"
  ) {
    return res.status(403).json({ message: "Access denied" });
  }

  res.json(order);
};

/**
 * @desc    Get all orders
 * @route   GET /api/orders
 * @access  Admin
 */
exports.getAllOrders = async (req, res) => {
  const orders = await Order.find()
    .populate("user", "name email")
    .sort({ createdAt: -1 });

  res.json(orders);
};

/**
 * @desc    Update order status
 * @route   PUT /api/orders/:id/status
 * @access  Admin
 */
exports.updateOrderStatus = async (req, res) => {
  const { status } = req.body;

  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  order.status = status;

  if (status === "paid") {
    order.isPaid = true;
    order.paidAt = Date.now();
  }

  if (status === "delivered") {
    order.deliveredAt = Date.now();
  }

  const updatedOrder = await order.save();
  res.json(updatedOrder);
};

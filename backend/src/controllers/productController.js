const Product = require("../models/Product");

/**
 * @desc    Get all products (public)
 * @route   GET /api/products
 * @access  Public
 */
exports.getProducts = async (req, res) => {
  const { keyword, category, minPrice, maxPrice } = req.query;

  const filter = { isActive: true };

  if (keyword) {
    filter.name = { $regex: keyword, $options: "i" };
  }

  if (category) {
    filter.category = category;
  }

  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }

  const products = await Product.find(filter).sort({ createdAt: -1 });
  res.json(products);
};

/**
 * @desc    Get single product
 * @route   GET /api/products/:id
 * @access  Public
 */
exports.getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product || !product.isActive) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json(product);
};

/**
 * @desc    Create product
 * @route   POST /api/products
 * @access  Admin
 */
exports.createProduct = async (req, res) => {
  const {
    name,
    description,
    price,
    category,
    brand,
    stock,
    images,
  } = req.body;

  const product = await Product.create({
    name,
    description,
    price,
    category,
    brand,
    stock,
    images,
  });

  res.status(201).json(product);
};

/**
 * @desc    Update product
 * @route   PUT /api/products/:id
 * @access  Admin
 */
exports.updateProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  Object.assign(product, req.body);
  const updatedProduct = await product.save();

  res.json(updatedProduct);
};

/**
 * @desc    Delete product (soft delete)
 * @route   DELETE /api/products/:id
 * @access  Admin
 */
exports.deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  product.isActive = false;
  await product.save();

  res.json({ message: "Product removed" });
};
